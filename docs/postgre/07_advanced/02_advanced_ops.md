---
sidebar_position: 2
title: "7-2. 高度なDB機能"
---

# 7-2. 高度なDB機能

## パーティショニング

1つのテーブルを**物理的に複数の子テーブルに分割**する機能です。
数千万〜数億行を超えるような大規模テーブルで、クエリ性能や管理性を向上させます。

### 宣言的パーティショニングの種類

| 種類 | 分割の基準 | 向いているケース |
| :--- | :--- | :--- |
| `RANGE` | 範囲（日付・数値など） | 時系列ログ・売上履歴 |
| `LIST` | 値のリスト | 地域・ステータス区分 |
| `HASH` | ハッシュ値 | 均等分散させたいとき |

### RANGE パーティショニング

```sql
-- 親テーブルの作成（実データは格納しない）
CREATE TABLE access_logs (
    log_id     BIGSERIAL,
    user_id    INTEGER,
    accessed_at TIMESTAMPTZ NOT NULL,
    path       TEXT
) PARTITION BY RANGE (accessed_at);

-- 子テーブル（パーティション）を月ごとに作成
CREATE TABLE access_logs_2024_01
    PARTITION OF access_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE access_logs_2024_02
    PARTITION OF access_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
```

```sql
-- INSERTは親テーブルに対して行う（自動で正しい子に振り分けられる）
INSERT INTO access_logs (user_id, accessed_at, path)
VALUES (1, '2024-01-15 10:30:00+09', '/home');

-- SELECTも親テーブルに対して行う（パーティションプルーニングで効率化）
SELECT * FROM access_logs
WHERE accessed_at >= '2024-01-01' AND accessed_at < '2024-02-01';
-- → 内部的に access_logs_2024_01 だけを検索する
```

:::tip 古いデータの削除が高速
通常の `DELETE` は行ごとに処理しますが、パーティショニングでは古い子テーブルを `DROP` するだけで
瞬時に大量データを削除できます。
```sql
DROP TABLE access_logs_2024_01;
```
:::

### LIST パーティショニング

```sql
CREATE TABLE orders (
    order_id  BIGSERIAL,
    region    TEXT NOT NULL,
    amount    NUMERIC
) PARTITION BY LIST (region);

CREATE TABLE orders_east  PARTITION OF orders FOR VALUES IN ('東京', '千葉', '神奈川');
CREATE TABLE orders_west  PARTITION OF orders FOR VALUES IN ('大阪', '京都', '兵庫');
CREATE TABLE orders_other PARTITION OF orders DEFAULT;  -- どれにも当てはまらない行
```

---

## マテリアライズドビュー

通常のビューは実行のたびにクエリが走りますが、マテリアライズドビューは**クエリ結果をテーブルとして物理的に保存**します。
集計や複雑なJOINの結果をキャッシュしておき、参照を高速化するのに使います。

```sql
-- マテリアライズドビューの作成
CREATE MATERIALIZED VIEW dept_summary AS
SELECT
    d.dept_name,
    COUNT(e.emp_id)     AS headcount,
    AVG(e.salary)       AS avg_salary,
    MAX(e.salary)       AS max_salary
FROM departments AS d
LEFT JOIN employees AS e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name;

-- 通常のテーブルと同じように参照できる（高速）
SELECT * FROM dept_summary;

-- 元テーブルのデータが変わっても自動更新されないため、手動でリフレッシュする
REFRESH MATERIALIZED VIEW dept_summary;

-- リフレッシュ中も参照をブロックしない（インデックスが必要）
REFRESH MATERIALIZED VIEW CONCURRENTLY dept_summary;
```

:::note 通常ビューとの使い分け
- **通常ビュー**: データが常に最新である必要がある場合
- **マテリアライズドビュー**: 多少古くてもよく、参照パフォーマンスを優先する場合（夜間バッチ更新など）
:::

---

## 高度なインデックス

### 部分インデックス（Partial Index）

`WHERE` 条件に一致する行だけにインデックスを張ります。
インデックスのサイズを削減し、更新コストを下げながら必要な検索を高速化します。

```sql
-- 未処理（status = 'pending'）の行だけにインデックスを張る
-- 処理済みレコードが大半を占めても、インデックスは小さいまま
CREATE INDEX idx_jobs_pending
    ON jobs (created_at)
    WHERE status = 'pending';

-- このクエリでインデックスが使われる
SELECT * FROM jobs WHERE status = 'pending' ORDER BY created_at;
```

### 関数インデックス（Expression Index）

列の値に関数を適用した結果にインデックスを張ります。

```sql
-- 大文字・小文字を無視した検索を高速化
CREATE INDEX idx_emp_lower_name ON employees (LOWER(emp_name));

-- このクエリでインデックスが使われる
SELECT * FROM employees WHERE LOWER(emp_name) = 'tanaka taro';
```

### 複合インデックスの列順

複合インデックスは**左端の列から順に**使われます。

```sql
CREATE INDEX idx_emp_dept_salary ON employees (dept_id, salary);

-- インデックスが使われる
SELECT * FROM employees WHERE dept_id = 1;
SELECT * FROM employees WHERE dept_id = 1 AND salary > 400000;

-- インデックスが使われない（左端の dept_id を指定していない）
SELECT * FROM employees WHERE salary > 400000;
```

---

## GENERATED列（計算列）

他の列の値から自動的に計算・格納される列です。
アプリケーション側で計算してから保存する手間がなくなり、整合性が保証されます。

```sql
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    price        NUMERIC(10,2) NOT NULL,
    tax_rate     NUMERIC(4,3)  NOT NULL DEFAULT 0.1,
    price_with_tax NUMERIC(10,2)
        GENERATED ALWAYS AS (price * (1 + tax_rate)) STORED
    -- STORED: 計算結果を物理的に保存する
);

INSERT INTO products (price) VALUES (1000);

SELECT price, tax_rate, price_with_tax FROM products;
-- → 1000 | 0.100 | 1100.00
```

`GENERATED ALWAYS AS` で定義した列は直接 `INSERT` / `UPDATE` できません。

---

## クエリ実行計画の確認（EXPLAIN）

インデックスが期待どおり使われているかや、遅いクエリの原因を調査するには `EXPLAIN` を使います。

```sql
-- 実行計画のみ表示（実際には実行しない）
EXPLAIN
SELECT * FROM employees WHERE dept_id = 1;

-- 実際に実行して、実測時間も表示する
EXPLAIN ANALYZE
SELECT * FROM employees WHERE dept_id = 1;
```

注目する主なキーワード：

| キーワード | 意味 |
| :--- | :--- |
| `Seq Scan` | テーブル全件スキャン（インデックス未使用） |
| `Index Scan` | インデックスを使った検索 |
| `Index Only Scan` | インデックスだけで完結（最速） |
| `Hash Join` / `Nested Loop` | テーブル結合の方式 |
| `cost=` | 推定コスト（小さいほど良い） |
| `rows=` | 推定取得行数 |

:::tip インデックスが使われないケース
- 対象行が全体の数十%を超える場合（全件スキャンの方が速い）
- `WHERE UPPER(emp_name) = ...` のように列に関数を適用している（関数インデックスが必要）
- 暗黙の型変換が発生している（型を一致させる）
:::
