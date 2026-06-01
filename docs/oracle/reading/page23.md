---
sidebar_position: 23
---

# ユーザ管理

## OracleDBのユーザの種類

OracleDBのマルチテナント構成（CDB / PDB）では、ユーザは作成するコンテナによって2種類に分類されます。

| 種類 | 作成場所 | 特徴 |
|---|---|---|
| 共通ユーザ | CDB | 全PDBに共通して存在する。ユーザ名は `C##` で始まる必要がある |
| ローカルユーザ | PDB | 特定のPDBのみに存在する。研修では主にこちらを使用する |

---

## ユーザの作成

```sql
CREATE USER ユーザ名 IDENTIFIED BY パスワード
    DEFAULT TABLESPACE 表領域名
    QUOTA 容量 ON 表領域名;
```

```sql
-- mypdb上でローカルユーザを作成する（mypdbに接続した状態で実行）
CREATE USER sample_user IDENTIFIED BY sample_pass
    DEFAULT TABLESPACE users
    QUOTA UNLIMITED ON users;
```

| オプション | 説明 |
|---|---|
| `DEFAULT TABLESPACE` | データを格納する既定の表領域 |
| `QUOTA` | 表領域の使用容量上限（`UNLIMITED` で無制限） |

---

## ユーザの変更・削除

```sql
-- パスワードを変更する
ALTER USER sample_user IDENTIFIED BY new_pass;

-- ユーザを削除する（所有オブジェクトも一緒に削除）
DROP USER sample_user CASCADE;
```

:::caution
`CASCADE` を付けないと、そのユーザが所有するテーブルなどが残っている場合にエラーになります。  
通常は `CASCADE` を付けて削除します。
:::

---

## 権限

OracleDBの権限は**システム権限**と**オブジェクト権限**の2種類に分類されます。

### システム権限

データベース全体に関わる操作を許可する権限です。

| 権限 | 説明 |
|---|---|
| `CREATE SESSION` | DBへの接続を許可する |
| `CREATE TABLE` | テーブルの作成を許可する |
| `CREATE VIEW` | ビューの作成を許可する |
| `CREATE SEQUENCE` | シーケンスの作成を許可する |
| `CREATE USER` | ユーザの作成を許可する |
| `DROP ANY TABLE` | 任意のテーブルの削除を許可する |

作成したばかりのユーザは権限を持たないため、最低でも `CREATE SESSION` を付与しないと接続できません。

### オブジェクト権限

特定のテーブル・ビューなど個別のオブジェクトに対する操作を許可する権限です。

| 権限 | 対象 | 説明 |
|---|---|---|
| `SELECT` | テーブル・ビュー | 参照を許可する |
| `INSERT` | テーブル・ビュー | 挿入を許可する |
| `UPDATE` | テーブル・ビュー | 更新を許可する |
| `DELETE` | テーブル・ビュー | 削除を許可する |
| `EXECUTE` | プロシージャ・関数 | 実行を許可する |

---

## GRANT：権限の付与

```sql
-- システム権限を付与する
GRANT 権限名 TO ユーザ名;

-- オブジェクト権限を付与する
GRANT 権限名 ON オブジェクト名 TO ユーザ名;
```

```sql
-- 接続権限とテーブル作成権限を付与する
GRANT CREATE SESSION, CREATE TABLE TO sample_user;

-- empテーブルの参照権限を付与する
GRANT SELECT ON emp TO sample_user;

-- empテーブルの参照・更新権限をまとめて付与する
GRANT SELECT, UPDATE ON emp TO sample_user;
```

`WITH GRANT OPTION` を付けると、付与されたユーザがさらに他のユーザへ同じ権限を付与できます。

```sql
GRANT SELECT ON emp TO sample_user WITH GRANT OPTION;
```

---

## REVOKE：権限の取り消し

```sql
-- システム権限を取り消す
REVOKE 権限名 FROM ユーザ名;

-- オブジェクト権限を取り消す
REVOKE 権限名 ON オブジェクト名 FROM ユーザ名;
```

```sql
REVOKE CREATE TABLE FROM sample_user;
REVOKE SELECT ON emp FROM sample_user;
```

---

## ロール

複数の権限をまとめて管理する仕組みです。  
ユーザごとに権限を個別付与する手間を省き、管理をシンプルにします。

```sql
-- ロールを作成する
CREATE ROLE role_viewer;

-- ロールに権限を付与する
GRANT SELECT ON emp TO role_viewer;
GRANT SELECT ON dept TO role_viewer;

-- ユーザにロールを付与する
GRANT role_viewer TO sample_user;
```

### Oracleが提供する主な定義済みロール

| ロール | 説明 |
|---|---|
| `CONNECT` | 接続に必要な基本的な権限（`CREATE SESSION` 等） |
| `RESOURCE` | テーブル・シーケンス・プロシージャ等の作成権限 |
| `DBA` | ほぼ全ての権限を持つ管理者ロール |

```sql
-- 研修用ユーザへの典型的な権限付与例
GRANT CONNECT, RESOURCE TO sample_user;
```

:::caution
`DBA` ロールは非常に強力な権限です。  
不必要なユーザへの付与は避けましょう。
:::

---

## 権限・ロールの確認

```sql
-- 自分に付与されているシステム権限を確認する
SELECT privilege FROM user_sys_privs;

-- 自分に付与されているロールを確認する
SELECT granted_role FROM user_role_privs;

-- 自分が持つオブジェクト権限を確認する
SELECT grantor, table_name, privilege FROM user_tab_privs;
```
