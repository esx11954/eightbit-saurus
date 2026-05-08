---
sidebar_position: 3
title: "3-3. 各種文法"
---

# 3-3. DCLの各種文法

## CREATE ROLE / CREATE USER

```sql
-- ログインできないロール（グループ用）
CREATE ROLE app_readonly;

-- ログインできるロール（ユーザー用）
CREATE ROLE alice WITH LOGIN PASSWORD 'password123';

-- CREATE USER は CREATE ROLE ... WITH LOGIN の別名
CREATE USER bob WITH PASSWORD 'pass456';
```

`CREATE USER` は `CREATE ROLE ... WITH LOGIN` の糖衣構文です。どちらを使っても構いません。

---

## GRANT — 権限の付与

### テーブルへの権限

```sql
-- 特定テーブルに SELECT 権限を付与
GRANT SELECT ON employees TO alice;

-- 複数の権限を一度に付与
GRANT SELECT, INSERT, UPDATE ON employees TO alice;

-- スキーマ内のすべてのテーブルに付与
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
```

### スキーマへの権限

テーブルへのアクセスには、先にスキーマへの `USAGE` 権限が必要です。

```sql
GRANT USAGE ON SCHEMA public TO alice;
```

### データベースへの権限

```sql
-- データベースへの接続を許可
GRANT CONNECT ON DATABASE mydb TO alice;
```

### ロールへの所属

```sql
-- alice を app_readonly グループに追加
GRANT app_readonly TO alice;
```

---

## REVOKE — 権限の取り消し

```sql
-- 特定権限を取り消す
REVOKE DELETE ON employees FROM alice;

-- すべての権限を取り消す
REVOKE ALL PRIVILEGES ON employees FROM alice;

-- ロールのメンバーシップを解除
REVOKE app_readonly FROM alice;
```

---

## ALTER ROLE — ロールの変更

```sql
-- パスワードの変更
ALTER ROLE alice WITH PASSWORD 'newpass';

-- 接続上限の変更
ALTER ROLE alice CONNECTION LIMIT 5;

-- スーパーユーザー権限の付与・剥奪
ALTER ROLE alice SUPERUSER;
ALTER ROLE alice NOSUPERUSER;
```

---

## DROP ROLE — ロールの削除

```sql
-- ロールを削除
DROP ROLE alice;

-- 存在する場合のみ削除
DROP ROLE IF EXISTS alice;
```

:::caution 削除前にオブジェクトの所有権を移す
ロールがオブジェクトを所有している場合、削除前に所有権を別ロールへ移す必要があります。
```sql
-- alice が所有するオブジェクトを postgres に移譲
REASSIGN OWNED BY alice TO postgres;

-- alice が所有・権限を持つオブジェクトをすべて削除
DROP OWNED BY alice;

DROP ROLE alice;
```
:::

---

## 権限の確認

```sql
-- テーブルの権限一覧
\dp employees

-- 現在のロールを確認
SELECT current_user, session_user;
```

---

## 実践例：読み取り専用ユーザーの作成

実際の運用でよく使うパターンです。

```sql
-- 1. 読み取り専用グループを作成
CREATE ROLE readonly_group NOLOGIN;

-- 2. スキーマとテーブルへのアクセスを付与
GRANT USAGE ON SCHEMA public TO readonly_group;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_group;

-- 3. 今後作成されるテーブルにも自動で適用
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO readonly_group;

-- 4. ユーザーを作成してグループに追加
CREATE USER report_user WITH PASSWORD 'secret';
GRANT readonly_group TO report_user;
```

`ALTER DEFAULT PRIVILEGES` を使うと、**今後追加されるテーブルにも自動で権限が付与**されるため、
テーブルを追加するたびに `GRANT` を実行し忘れるミスを防げます。

---

## 演習問題

この章の内容を実際に手を動かして確認しましょう。

→ [DCL演習](../exercises/02_dcl.md)
