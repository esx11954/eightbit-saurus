---
sidebar_position: 2
title: "5-2. CRUD操作"
---

# 5-2. CRUD操作

## INSERT — データの追加

### 基本構文

```sql
-- 1行挿入（列名を明示する書き方）
INSERT INTO employees (emp_name, dept_id, salary, hired_at)
VALUES ('新田 健太', 1, 400000, '2024-04-01');

-- 全列に値を入れる場合は列名を省略できる（非推奨）
-- 列の順序変更やスキーマ変更で壊れやすいため、列名は常に書くこと
INSERT INTO employees
VALUES (DEFAULT, '新田 健太', 1, 400000, '2024-04-01');
```

### 複数行を一度に挿入

```sql
INSERT INTO departments (dept_name) VALUES
    ('法務部'),
    ('経理部'),
    ('マーケティング部');
```

1回のSQL文でまとめて挿入するほうが、1件ずつ挿入するより**大幅に高速**です。

### SELECT結果から挿入

別テーブルのデータをそのまま挿入できます。

```sql
-- バックアップテーブルに現在のデータを丸ごとコピー
INSERT INTO employees_backup
SELECT * FROM employees;

-- 条件を付けて一部だけコピー
INSERT INTO employees_backup
SELECT * FROM employees WHERE dept_id = 1;
```

### RETURNING句

INSERT後に挿入されたデータを取得できます。
SERIALで自動採番されたIDを知りたい場合などに便利です。

```sql
INSERT INTO employees (emp_name, dept_id, salary, hired_at)
VALUES ('木村 あおい', 2, 390000, '2024-07-01')
RETURNING emp_id, emp_name;
-- → 挿入された行の emp_id と emp_name が返る
```

### ON CONFLICT — 重複時の処理

一意制約（PRIMARY KEY・UNIQUE）に違反した場合の動作を指定できます。

```sql
-- 重複した場合は何もしない（エラーにしない）
INSERT INTO departments (dept_id, dept_name)
VALUES (1, '開発部')
ON CONFLICT DO NOTHING;

-- 重複した場合は更新する（UPSERT）
INSERT INTO departments (dept_id, dept_name)
VALUES (1, '開発一部')
ON CONFLICT (dept_id) DO UPDATE
    SET dept_name = EXCLUDED.dept_name;
-- EXCLUDED は挿入しようとした値を参照するキーワード
```

---

## SELECT — データの検索

### 基本構文

```sql
-- 全列・全行を取得
SELECT * FROM employees;

-- 特定の列だけ取得
SELECT emp_id, emp_name, salary FROM employees;
```

:::caution SELECT * は本番環境では避ける
`SELECT *` は列の追加・削除・順序変更の影響を受けやすく、余分なデータを取得してパフォーマンスが低下することがあります。
アプリケーションコードでは必要な列を明示しましょう。
:::

### 列の別名（エイリアス）

```sql
SELECT
    emp_id   AS "社員ID",
    emp_name AS "氏名",
    salary   AS "月給"
FROM employees;
```

`AS` は省略可能ですが、可読性のために付けることを推奨します。

### 計算列・文字列連結

```sql
-- 給与に1.1を掛けて年収を計算
SELECT
    emp_name,
    salary * 12 AS annual_salary
FROM employees;

-- 文字列連結（|| 演算子）
SELECT emp_name || ' さん' AS greeting FROM employees;
```

### DISTINCT — 重複排除

```sql
-- 社員が属する部署IDの重複なし一覧
SELECT DISTINCT dept_id FROM employees;

-- 複数列の組み合わせで重複排除
SELECT DISTINCT dept_id, hired_at FROM employees;
```

---

## UPDATE — データの変更

### 基本構文

```sql
UPDATE employees
SET salary = 550000
WHERE emp_id = 1;
```

### 複数列を同時に更新

```sql
UPDATE employees
SET salary  = 480000,
    dept_id = 2
WHERE emp_id = 4;
```

### 計算式による更新

```sql
-- 全員の給与を5%アップ
UPDATE employees
SET salary = salary * 1.05;

-- 特定部署だけ
UPDATE employees
SET salary = salary * 1.1
WHERE dept_id = 1;
```

### RETURNING句

UPDATE後に変更後の値を確認できます。

```sql
UPDATE employees
SET salary = salary * 1.1
WHERE dept_id = 1
RETURNING emp_id, emp_name, salary;
```

:::danger WHERE句を忘れると全件更新される
```sql
-- NG: WHERE を書き忘れると全社員の給与が変わる
UPDATE employees SET salary = 0;

-- 本番環境では必ず WHERE の絞り込み条件を確認してから実行すること
```

不安なときは先に `SELECT` で対象行を確認してから `UPDATE` を実行する習慣をつけましょう。
:::

### 別テーブルの値を参照して更新（FROM句）

```sql
-- projects テーブルの lead_emp_id に一致する社員の給与を上げる
UPDATE employees
SET salary = salary * 1.2
FROM projects
WHERE employees.emp_id = projects.lead_emp_id;
```

---

## DELETE — データの削除

### 基本構文

```sql
DELETE FROM employees WHERE emp_id = 7;
```

### 条件に一致する複数行を削除

```sql
-- 2023年以降に入社した社員を削除
DELETE FROM employees WHERE hired_at >= '2023-01-01';
```

### RETURNING句

```sql
DELETE FROM employees
WHERE dept_id IS NULL
RETURNING emp_id, emp_name;
-- 削除した行の情報が返る
```

:::danger WHERE句を忘れると全件削除される
```sql
-- NG: 全行削除される（DDL の TRUNCATE と同じ結果になる）
DELETE FROM employees;
```

UPDATE と同様に、必ず先に `SELECT` で削除対象を確認してから実行してください。
:::

### DELETEとTRUNCATEの違い

| 項目 | DELETE | TRUNCATE |
| :--- | :--- | :--- |
| WHERE条件 | 指定できる | 指定できない（全件削除のみ） |
| トランザクション | ROLLBACKできる | ROLLBACKできる（PostgreSQLのみ） |
| 速度 | 低速（行ごとに処理） | 高速（ページごとに削除） |
| トリガー | 発火する | 発火しない |
| シーケンス | リセットされない | `RESTART IDENTITY` でリセット可能 |

```sql
-- テーブルのデータを全削除してシーケンスもリセット
TRUNCATE TABLE employees RESTART IDENTITY;

-- 参照先テーブルも含めて削除
TRUNCATE TABLE departments CASCADE;
```
