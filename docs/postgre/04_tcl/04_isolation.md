---
sidebar_position: 4
title: "4-4. 分離レベル"
---

# 4-4. 分離レベル

## 分離レベルとは

複数のトランザクションが同時に動いているとき、**他のトランザクションの変更をどの程度見えるようにするか**を定義したものです。
分離レベルを上げるほど整合性は高まりますが、同時実行性（スループット）は下がります。

---

## 同時実行時に起こる問題

分離レベルを理解するために、まず発生しうる問題を整理します。

| 問題 | 内容 |
| :--- | :--- |
| **ダーティリード** | 他トランザクションの未コミットデータを読んでしまう |
| **ノンリピータブルリード** | 同一トランザクション内で同じ行を2回読むと、別トランザクションのCOMMITにより値が変わっている |
| **ファントムリード** | 同一トランザクション内で同じ条件で検索すると、行数が変わっている |

---

## 分離レベルの種類

SQL標準で定義された4段階の分離レベルと、各問題への対応を示します。

| 分離レベル | ダーティリード | ノンリピータブルリード | ファントムリード |
| :--- | :---: | :---: | :---: |
| READ UNCOMMITTED | 発生しうる | 発生しうる | 発生しうる |
| **READ COMMITTED**（デフォルト） | 防止 | 発生しうる | 発生しうる |
| REPEATABLE READ | 防止 | 防止 | 発生しうる※ |
| SERIALIZABLE | 防止 | 防止 | 防止 |

※ PostgreSQLの `REPEATABLE READ` はファントムリードも防止します（SQL標準より強い保証）。

:::note PostgreSQLには READ UNCOMMITTED がない
`SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED` と指定しても、
PostgreSQLは内部的に `READ COMMITTED` として動作します。
:::

---

## READ COMMITTED（デフォルト）

COMMITされたデータのみ読み取れます。最も使われる分離レベルです。

```sql
-- セッションA
BEGIN;
UPDATE employees SET salary = 999999 WHERE emp_id = 1;
-- まだ COMMIT していない

-- セッションB（同時実行）
BEGIN;
SELECT salary FROM employees WHERE emp_id = 1;
-- → 変更前の値が返る（未コミットは見えない）
COMMIT;

-- セッションA
COMMIT;

-- セッションB（再度検索）
SELECT salary FROM employees WHERE emp_id = 1;
-- → 999999 が返る（COMMITされたので見える）
```

---

## REPEATABLE READ

トランザクション開始時点のスナップショットで一貫して読み取ります。
途中で他のトランザクションがCOMMITしても、見えるデータは変わりません。

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;

SELECT salary FROM employees WHERE emp_id = 1;
-- → 500000

-- この間に別セッションが salary を 999999 に UPDATE して COMMIT

SELECT salary FROM employees WHERE emp_id = 1;
-- → 500000（スナップショット時点の値のまま）

COMMIT;
```

---

## SERIALIZABLE

すべてのトランザクションを直列実行したのと同等の結果を保証する、最も強い分離レベルです。
整合性は最高ですが、競合検出により `ROLLBACK` が発生しやすくなるためリトライ処理が必要です。

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- ...
COMMIT;
```

---

## 分離レベルの設定方法

```sql
-- セッション単位で変更
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- トランザクション単位で変更（BEGIN直後に指定）
BEGIN;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- ...
COMMIT;
```

---

## まとめ：どの分離レベルを使うべきか

| ユースケース | 推奨レベル |
| :--- | :--- |
| 一般的なWebアプリのCRUD操作 | READ COMMITTED（デフォルトのまま） |
| 集計・レポートなど一貫した読み取りが必要 | REPEATABLE READ |
| 残高管理・在庫管理など厳密な整合性が必要 | SERIALIZABLE |

通常は **READ COMMITTED のまま使い、必要な箇所だけ `FOR UPDATE` でロックを取得する**設計が実用的です。

## 演習問題

この章の内容を実際に手を動かして確認しましょう。

→ [TCL演習](../exercises/03_tcl.md)
