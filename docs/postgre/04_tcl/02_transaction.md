---
sidebar_position: 2
title: "4-2. トランザクション操作"
---

# 4-2. トランザクション操作

## 基本的な流れ

トランザクションは `BEGIN` で開始し、`COMMIT` または `ROLLBACK` で終了します。

```sql
BEGIN;

UPDATE accounts SET balance = balance - 10000 WHERE id = 1;
UPDATE accounts SET balance = balance + 10000 WHERE id = 2;

COMMIT;  -- 両方成功したので確定
```

途中でエラーが発生した場合や、操作をなかったことにしたい場合は `ROLLBACK` します。

```sql
BEGIN;

UPDATE accounts SET balance = balance - 10000 WHERE id = 1;
-- ここで何かエラーが発生...

ROLLBACK;  -- すべての変更を取り消し
```

---

## SAVEPOINT

`SAVEPOINT` は、トランザクション内に**部分的な取り消しポイント**を設定する仕組みです。
トランザクション全体を `ROLLBACK` せずに、途中の特定の地点まで戻ることができます。

| コマンド | 説明 |
| :--- | :--- |
| `SAVEPOINT 名前` | 現在の地点にセーブポイントを作成する |
| `ROLLBACK TO SAVEPOINT 名前` | 指定したセーブポイントまで変更を取り消す |
| `RELEASE SAVEPOINT 名前` | セーブポイントを解放する（以後その名前は使えなくなる） |

### 使用例

```sql
BEGIN;

INSERT INTO departments (dept_name) VALUES ('開発部');  -- 操作1

SAVEPOINT sp1;  -- ここにセーブポイントを設定

INSERT INTO departments (dept_name) VALUES ('テスト部');  -- 操作2

ROLLBACK TO SAVEPOINT sp1;  -- 操作2だけ取り消す（操作1は残る）

COMMIT;  -- 操作1（開発部の追加）だけ確定される
```

### 複数のSAVEPOINT

複数のセーブポイントを組み合わせることで、複雑なトランザクション制御ができます。

```sql
BEGIN;

UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1;  -- 全員5%アップ

SAVEPOINT before_exception;

UPDATE employees SET salary = salary * 1.20 WHERE emp_id = 1;  -- 田中さんだけ誤って20%アップ

-- ミスに気づいたので田中さんの分だけ戻す
ROLLBACK TO SAVEPOINT before_exception;

UPDATE employees SET salary = salary * 1.10 WHERE emp_id = 1;  -- 正しく10%アップ

COMMIT;  -- 全員5%アップ + 田中さんは10%アップで確定
```

---

## エラー発生時の挙動

トランザクション内でエラーが発生すると、プロンプトが `=#` から `!#` に変わります。
この状態ではSQLの実行がすべて拒否されるため、`ROLLBACK` で正常な状態に戻す必要があります。

```sql
BEGIN;

INSERT INTO employees (emp_id, emp_name) VALUES (1, '山田');  -- 重複エラー発生
-- ERROR: duplicate key value violates unique constraint

-- !# 状態になる。以降のSQLは実行できない
SELECT * FROM employees;  -- エラー: current transaction is aborted

ROLLBACK;  -- これで =# に戻る
```

`SAVEPOINT` を使えば、エラーが起きた箇所だけ取り消してトランザクションを継続できます。

```sql
BEGIN;

INSERT INTO departments (dept_name) VALUES ('開発部');

SAVEPOINT sp1;

INSERT INTO employees (emp_id, emp_name) VALUES (1, '山田');  -- 重複エラー
-- ERROR: duplicate key value violates unique constraint

ROLLBACK TO SAVEPOINT sp1;  -- !# → * に戻る（トランザクション継続）

-- 別の操作を続行できる
INSERT INTO employees (emp_id, emp_name) VALUES (99, '鈴木');

COMMIT;
```

---

## DDLとトランザクション

PostgreSQLでは `CREATE TABLE` や `ALTER TABLE` などのDDLもトランザクションで制御できます。
誤ったスキーマ変更も `ROLLBACK` で取り消せるため、変更作業を安全に行えます。

```sql
BEGIN;

ALTER TABLE employees ADD COLUMN phone VARCHAR(20);
-- 追加後に確認してから判断する

-- 問題なければ
COMMIT;

-- やっぱりやめたい場合
-- ROLLBACK;
```

:::caution 他のRDBMSとの違い
OracleやMySQLではDDLを実行すると自動的にCOMMITされますが、PostgreSQLではトランザクション内でROLLBACKできます。
他のDBから移行した場合は注意してください。
:::
