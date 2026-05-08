---
sidebar_position: 1
title: "高度な操作演習1: 制約・インデックス"
---

# 高度な操作演習1: 制約・インデックス

対応章: [7章 高度な操作](../../07_advanced/01_overview.md)

---

## 問題1 複合主キーと外部キー

注文明細テーブル `order_items` を以下の仕様で作成してください。

| 列名 | 型 | 制約 |
| :--- | :--- | :--- |
| `order_id` | INTEGER | — |
| `product_id` | INTEGER | — |
| `quantity` | INTEGER | NOT NULL、1以上 |
| `unit_price` | NUMERIC(10,2) | NOT NULL |

- `order_id` と `product_id` の組み合わせを複合主キーとする
- `fk_op_product` という名前で `product_id` → `products(product_id)` の外部キー制約を付ける

---

## 問題2 インデックスの効果確認

1. `employees` テーブルに大量データ（1万件）を挿入するSQL文を生成して実行する
   （`generate_series` 関数を使う）

   ```sql
   INSERT INTO employees (emp_name, dept_id, salary, hired_at)
   SELECT
       '社員_' || i,
       (i % 3) + 1,
       300000 + (i % 300) * 1000,
       '2020-01-01'::date + (i % 1000)
   FROM generate_series(1, 10000) AS i;
   ```

2. `dept_id` でのフィルタリングについて、インデックスなし・ありの実行計画を `EXPLAIN ANALYZE` で比較する
3. インデックスを作成し、`Seq Scan` が `Index Scan` に変わることを確認する

---

## 問題3 部分インデックス

`jobs` テーブルを作成し、部分インデックスを実装してください。

```sql
CREATE TABLE jobs (
    job_id     SERIAL PRIMARY KEY,
    title      TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'pending',  -- 'pending'/'running'/'done'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ダミーデータを挿入（pending:100件, done:10000件）
INSERT INTO jobs (title, status)
SELECT '処理_' || i, 'done' FROM generate_series(1, 10000) AS i;
INSERT INTO jobs (title, status)
SELECT '処理_' || i, 'pending' FROM generate_series(1, 100) AS i;
```

1. `status = 'pending'` かつ `created_at` 順のインデックスを部分インデックスで作成する
2. `EXPLAIN ANALYZE` で確認し、通常のインデックスと何が違うか述べる

---

## 問題4 GENERATED列

以下の仕様で `products` テーブルを拡張してください。

- `price_with_tax` 列を `GENERATED ALWAYS AS` で追加する
  （税率10%の税込価格を自動計算、小数点以下切り捨て）
- 商品を1件INSERTして、`price_with_tax` が自動計算されることを確認する
- `price_with_tax` に直接値を入れようとするとどうなるか確認する

---

## 問題5 EXPLAINの読み取り

以下のクエリを `EXPLAIN ANALYZE` で実行し、結果を読み解いてください。

```sql
SELECT e.emp_name, d.dept_name, e.salary
FROM employees AS e
JOIN departments AS d ON e.dept_id = d.dept_id
WHERE e.salary > 450000
ORDER BY e.salary DESC;
```

1. どのJOIN方式が使われているか
2. `Seq Scan` と `Index Scan` のどちらが使われているか
3. 推定行数（`rows=`）と実際の行数（`actual rows=`）はどうか
4. 全体の実行時間はどれくらいか

---

[ヒント](../hints.md#高度な操作演習1)
