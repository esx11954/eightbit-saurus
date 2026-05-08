---
sidebar_position: 3
title: "2-3. 各種文法"
---

# 2-3. DDLの各種文法

## CREATE TABLE

テーブルを作成します。列ごとにデータ型と制約を指定します。

```sql
CREATE TABLE employees (
    emp_id   SERIAL        PRIMARY KEY,
    emp_name VARCHAR(50)   NOT NULL,
    dept_id  INTEGER       REFERENCES departments(dept_id),
    salary   NUMERIC(10,2) DEFAULT 0,
    hired_at DATE          NOT NULL
);
```

### よく使うデータ型

| 型 | 説明 | 使用例 |
| :--- | :--- | :--- |
| `SMALLINT` / `INTEGER` / `BIGINT` | 整数（2/4/8バイト） | ID、カウント |
| `NUMERIC(p,s)` | 任意精度の小数（p:総桁数, s:小数点以下桁数） | 金額、税率 |
| `REAL` / `DOUBLE PRECISION` | 浮動小数点数 | 科学的な計算 |
| `VARCHAR(n)` | 可変長文字列（最大n文字） | 名前、メール |
| `TEXT` | 長さ制限なしの文字列 | 本文、メモ |
| `BOOLEAN` | 真偽値（`TRUE` / `FALSE`） | フラグ |
| `DATE` | 日付（YYYY-MM-DD） | 誕生日、入社日 |
| `TIMESTAMP` | 日時（タイムゾーンなし） | 作成日時 |
| `TIMESTAMPTZ` | 日時（タイムゾーンあり） | 国際対応の日時 |
| `SERIAL` | 自動連番整数（`INTEGER` + `SEQUENCE`の糖衣構文） | 主キー |

---

## 制約

テーブルに保存するデータのルールを定義します。

### 列制約（インライン指定）

```sql
CREATE TABLE products (
    product_id   SERIAL        PRIMARY KEY,           -- 主キー
    product_name VARCHAR(100)  NOT NULL,               -- NULL禁止
    price        INTEGER       NOT NULL DEFAULT 0,     -- NULL禁止 + デフォルト値
    category     VARCHAR(50)   CHECK (category IN ('食品', '電化製品', '衣類')), -- 値の制限
    code         VARCHAR(20)   UNIQUE                  -- 重複禁止
);
```

### テーブル制約（別途指定）

複数列にまたがる制約や、制約に名前を付けたい場合に使います。

```sql
CREATE TABLE order_items (
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL CHECK (quantity > 0),
    -- 複合主キー
    PRIMARY KEY (order_id, product_id),
    -- 外部キー制約に名前を付ける
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 外部キーのオプション

参照先レコードが削除・更新されたときの動作を指定できます。

```sql
FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    ON DELETE SET NULL   -- 親が削除されたらNULLにする
    ON UPDATE CASCADE    -- 親のIDが変わったら自動で追従する
```

| オプション | 動作 |
| :--- | :--- |
| `NO ACTION`（デフォルト） | 参照されていると削除・更新を拒否する |
| `CASCADE` | 親に追従して削除・更新する |
| `SET NULL` | NULLをセットする |
| `SET DEFAULT` | デフォルト値をセットする |

---

## ALTER TABLE

既存テーブルの定義を変更します。

```sql
-- 列の追加
ALTER TABLE employees ADD COLUMN email VARCHAR(100);

-- 列の削除
ALTER TABLE employees DROP COLUMN email;

-- 列名の変更
ALTER TABLE employees RENAME COLUMN emp_name TO name;

-- データ型の変更
ALTER TABLE employees ALTER COLUMN salary TYPE BIGINT;

-- デフォルト値の設定・削除
ALTER TABLE employees ALTER COLUMN salary SET DEFAULT 300000;
ALTER TABLE employees ALTER COLUMN salary DROP DEFAULT;

-- NOT NULL制約の追加・削除
ALTER TABLE employees ALTER COLUMN email SET NOT NULL;
ALTER TABLE employees ALTER COLUMN email DROP NOT NULL;

-- 制約の追加
ALTER TABLE employees ADD CONSTRAINT uq_email UNIQUE (email);

-- 制約の削除
ALTER TABLE employees DROP CONSTRAINT uq_email;

-- テーブル名の変更
ALTER TABLE employees RENAME TO staff;
```

---

## DROP TABLE / TRUNCATE

```sql
-- テーブルを削除（構造ごと削除）
DROP TABLE employees;

-- 他テーブルから参照されていても強制削除
DROP TABLE departments CASCADE;

-- 存在する場合のみ削除（エラーを出さない）
DROP TABLE IF EXISTS tmp_work;

-- テーブルのデータを全削除（構造は残る）
-- DELETE より高速だがトランザクションで取り消せない
TRUNCATE TABLE logs;
```

---

## シーケンス

連番を生成するオブジェクトです。`SERIAL` 型の内部でも使われています。

```sql
-- シーケンスの作成
CREATE SEQUENCE emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE;

-- 次の値を取得
SELECT nextval('emp_id_seq');

-- 現在の値を確認（nextvalを一度呼んだ後）
SELECT currval('emp_id_seq');

-- シーケンスをリセット
ALTER SEQUENCE emp_id_seq RESTART WITH 1;
```

:::note SERIALとSEQUENCEの関係
`SERIAL` は以下の省略記法です。
```sql
-- この2つは同等
emp_id SERIAL PRIMARY KEY

emp_id INTEGER PRIMARY KEY DEFAULT nextval('employees_emp_id_seq')
```
:::

---

## インデックス

検索を高速化するための索引構造です。PK・UNIQUE制約には自動で作成されます。

```sql
-- 基本的なインデックスの作成
CREATE INDEX idx_emp_dept ON employees(dept_id);

-- 複合インデックス（複数列）
CREATE INDEX idx_name_dept ON employees(emp_name, dept_id);

-- ユニークインデックス
CREATE UNIQUE INDEX idx_uq_email ON employees(email);

-- インデックスの削除
DROP INDEX idx_emp_dept;

-- インデックス一覧の確認
\di
```

:::tip インデックスを付けるべき列
- `WHERE` 句で頻繁に使う列
- `JOIN` の結合キーになる列（外部キー等）
- `ORDER BY` で頻繁に使う列

反対に、更新頻度が高い列や値の種類が少ない列（性別など）はインデックスの効果が薄いです。
:::

---

## ビュー

SELECTクエリに名前を付けて、仮想テーブルとして扱えるようにしたものです。

```sql
-- ビューの作成
CREATE VIEW emp_dept_view AS
    SELECT e.emp_id, e.emp_name, d.dept_name
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id;

-- ビューの利用（テーブルと同じように使える）
SELECT * FROM emp_dept_view WHERE dept_name = '開発部';

-- ビューの再定義
CREATE OR REPLACE VIEW emp_dept_view AS
    SELECT e.emp_id, e.emp_name, e.salary, d.dept_name
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id;

-- ビューの削除
DROP VIEW emp_dept_view;
```

:::note ビューを使う理由
- 複雑なSQLを毎回書かなくて済む
- アクセス制御（特定の列だけを公開する）
- テーブル構造の変更をアプリケーション側に隠蔽する
:::

---

## 演習問題

この章の内容を実際に手を動かして確認しましょう。

→ [DDL演習](../exercises/01_ddl.md)
