---
sidebar_position: 5
title: "TCL演習"
---

# TCL演習

対応章: [4章 TCL](../04_tcl/01_overview.md)

:::info 解答用紙のダウンロード
[📄 03_tcl.txt](./files/03_tcl.txt) をダウンロードし、このページを見ながらテキストエディタで解答を記入してください。
:::

---

## 問題1 COMMIT / ROLLBACK

以下の操作を順番に実行し、各ステップ後にデータがどうなっているか答えてください。

```sql
-- ステップ1
BEGIN;
INSERT INTO departments (dept_name) VALUES ('テスト部');
SELECT * FROM departments;  -- Q1: この時点で見える？

-- ステップ2（別のセッションで実行）
SELECT * FROM departments;  -- Q2: 別セッションには見える？

-- ステップ3
ROLLBACK;
SELECT * FROM departments;  -- Q3: 元のセッションで見える？
```

Q1〜Q3 それぞれの結果を答えてください。

---

## 問題2 SAVEPOINTの活用

以下のシナリオをSAVEPOINTを使って実装してください。

**シナリオ:**
1. 開発部（dept_id=1）の全社員の給与を5%アップする
2. 社員ID=1（田中 太郎）だけ10%アップに変更しようとしたが、誤って20%アップしてしまった
3. 田中 太郎の給与だけを5%アップに戻し、他の社員はそのまま確定する

---

## 問題3 デッドロックの再現と対処

2つのセッション（A・B）で以下の操作を並行して実行するとどうなるか答えてください。
また、デッドロックを防ぐための修正案も示してください。

```sql
-- セッションA
BEGIN;
UPDATE employees SET salary = salary + 10000 WHERE emp_id = 1;
-- （少し待つ）
UPDATE employees SET salary = salary + 10000 WHERE emp_id = 2;
COMMIT;

-- セッションB（Aとほぼ同時に開始）
BEGIN;
UPDATE employees SET salary = salary + 5000 WHERE emp_id = 2;
-- （少し待つ）
UPDATE employees SET salary = salary + 5000 WHERE emp_id = 1;
COMMIT;
```

---

## 問題4 分離レベルの挙動確認

READ COMMITTED（デフォルト）と REPEATABLE READ で、以下のシナリオの挙動の違いを答えてください。

**シナリオ:**
1. セッションAでトランザクションを開始し、`SELECT salary FROM employees WHERE emp_id = 1` を実行（結果: 500000）
2. セッションBで `UPDATE employees SET salary = 600000 WHERE emp_id = 1` を実行してCOMMITする
3. セッションAで再度 `SELECT salary FROM employees WHERE emp_id = 1` を実行する

| 分離レベル | ステップ3の結果 | 理由 |
| :--- | :--- | :--- |
| READ COMMITTED | ? | ? |
| REPEATABLE READ | ? | ? |

---

## 問題5 FOR UPDATE の活用

在庫管理システムで、以下のような「在庫の二重引き落とし」を防ぐSQL文を書いてください。

**要件:**
- `inventory` テーブル（`product_id`, `stock`）がある
- 在庫が1以上あれば、在庫を1減らして注文を確定する
- 複数のセッションが同時に同じ商品に対してこの処理を実行しても、在庫がマイナスにならないようにする

---

[ヒント](./hints.md#tcl演習)
