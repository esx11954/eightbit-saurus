---
sidebar_position: 4
title: "DCL演習"
---

# DCL演習

対応章: [3章 DCL](../03_dcl/01_overview.md)

:::info 解答用紙のダウンロード
<a href="./files/02_dcl.txt" download>📄 02_dcl.txt</a> をダウンロードし、このページを見ながらテキストエディタで解答を記入してください。
:::

---

## 問題1 ロールの作成

以下の仕様でロールを作成してください。

1. ログインできないロール `app_readonly` を作成する
2. パスワード `pass123` でログインできるユーザー `alice` を作成する
3. パスワード `pass456` でログインできるユーザー `bob` を作成する（同時接続数上限: 3）

---

## 問題2 権限の付与

以下の権限を付与してください。

1. `alice` に `public` スキーマへの `USAGE` 権限を付与する
2. `alice` に `employees` テーブルへの `SELECT`・`INSERT` 権限を付与する
3. `bob` を `app_readonly` グループに追加する
4. `app_readonly` に `public` スキーマ内の全テーブルへの `SELECT` 権限を付与する

---

## 問題3 権限の確認と取り消し

1. `\dp employees` を実行し、現在 `employees` テーブルに設定されている権限を確認する
2. `alice` から `INSERT` 権限を取り消す
3. 権限取り消し後、再度 `\dp employees` で変更を確認する

---

## 問題4 読み取り専用ユーザーの設定

新しく入社したアルバイトスタッフ用に、以下の要件を満たす設定を行ってください。

- ログインできるユーザー `part_timer` を作成する
- `departments` テーブルの `SELECT` のみ許可する
- `employees` テーブルには一切アクセスできないようにする
- 今後 `departments` テーブルに変更があっても権限設定を変える必要がないようにする

設定後、`part_timer` として接続した場合に以下のクエリがどう動作するか答えてください。

```sql
SELECT * FROM departments;  -- ?
SELECT * FROM employees;    -- ?
INSERT INTO departments (dept_name) VALUES ('テスト部');  -- ?
```

---

## 問題5 ロールの設計

以下の業務要件を満たすロール設計を考え、必要なSQL文を書いてください。

**要件:**
- 開発チーム（複数人）は全テーブルの読み書きができる
- 営業チーム（複数人）は `employees`・`departments` の参照のみ
- 管理部（特定の1人）だけが給与情報（`salary` 列）を参照できる
- 将来、チームメンバーが増えてもSQLの変更が最小限になるようにする

---

[ヒント](./hints.md#dcl演習)
