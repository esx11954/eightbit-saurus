---
sidebar_position: 3
title: "高度な操作演習3: 運用・統計"
---

# 高度な操作演習3: 運用・統計

対応章: [7章 高度な操作](../../07_advanced/01_overview.md)

---

## 問題1 システムカタログの活用

以下の情報をシステムカタログから取得するSQL文を書いてください。

1. 現在のデータベースに存在する全テーブルの一覧（スキーマ名・テーブル名）
2. `employees` テーブルの全列の名前・データ型・NULL許可の情報
3. `employees` テーブルに貼られているインデックスの一覧
4. 現在ログインしているロールの名前と属性

```sql
-- 使用するシステムカタログ・ビューのヒント
-- pg_tables, information_schema.columns, pg_indexes, pg_roles, current_user
```

---

## 問題2 VACUUM と ANALYZE

1. `VACUUM ANALYZE employees;` を実行し、どのような処理が行われるか説明する
2. `pg_stat_user_tables` ビューを使って、以下の情報を確認する

   ```sql
   SELECT
       relname,
       n_live_tup,      -- 生きている行数
       n_dead_tup,      -- 不要行数（VACUUM対象）
       last_vacuum,     -- 最後のVACUUM日時
       last_analyze     -- 最後のANALYZE日時
   FROM pg_stat_user_tables
   WHERE relname = 'employees';
   ```

3. `n_dead_tup` が増える操作は何か。また、なぜVACUUMが必要なのかを説明する

---

## 問題3 ロック状況の確認

以下の手順でロック状況を確認してください。

1. セッションAで以下を実行する（COMMITはまだしない）

   ```sql
   BEGIN;
   SELECT * FROM employees WHERE emp_id = 1 FOR UPDATE;
   ```

2. セッションBで以下を実行する（ブロックされることを確認）

   ```sql
   SELECT * FROM employees WHERE emp_id = 1 FOR UPDATE;
   ```

3. 第3のセッションから `pg_locks` と `pg_stat_activity` を結合して、どのプロセスがロック待ちになっているかを確認するSQLを書いて実行する

4. セッションAでCOMMITしてセッションBがブロック解除されることを確認する

---

## 問題4 バックアップと復元（概念）

以下の各コマンドについて、用途・取得する情報の範囲・特徴を説明してください（実行は任意）。

| コマンド | 説明してほしい内容 |
| :--- | :--- |
| `pg_dump` | 特定のデータベースのバックアップ |
| `pg_dumpall` | クラスタ全体のバックアップ |
| `pg_restore` | バックアップからの復元 |
| `\copy` | テーブル単位のCSVエクスポート |

また、以下の質問に答えてください：
- `pg_dump` で取得したファイルを `psql` コマンドで復元する手順を書く
- バックアップを定期実行する際に考慮すべき点を2つ挙げる

---

[ヒント](../hints.md#高度な操作演習3)
