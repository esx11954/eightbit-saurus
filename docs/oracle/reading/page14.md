---
sidebar_position: 14
---

# SQL概要

## SQLとは

**SQL（Structured Query Language）** は、リレーショナルデータベース（RDBMS）に対してデータの操作や定義を行うための言語です。  
OracleDBを含む多くのRDBMSで利用されており、データの取得・挿入・更新・削除といった操作を記述するために使用します。

---

## SQLの分類

SQLは目的に応じて以下の4種類に分類されます。

| 分類 | 正式名称 | 主なコマンド | 概要 |
|---|---|---|---|
| DDL | Data Definition Language | CREATE / ALTER / DROP | テーブルなどのオブジェクトを定義・変更・削除する |
| DML | Data Manipulation Language | SELECT / INSERT / UPDATE / DELETE | テーブル内のデータを操作する |
| DCL | Data Control Language | GRANT / REVOKE | ユーザへのアクセス権限を付与・取り消しする |
| TCL | Transaction Control Language | COMMIT / ROLLBACK | トランザクションの確定・取り消しを行う |

---

## SELECT文の基本構文

データを取得するには `SELECT` 文を使用します。基本的な構文は以下の通りです。

```sql
SELECT 列名1, 列名2, ...
FROM テーブル名
WHERE 条件式
ORDER BY 列名 [ASC | DESC];
```

- `SELECT` ：取得したい列を指定する
- `FROM` ：対象のテーブルを指定する
- `WHERE` ：取得するデータの条件を指定する（省略可）
- `ORDER BY` ：結果の並び順を指定する（省略可）

### 全列を取得する

列名の代わりに `*` を使用すると全列を取得できます。

```sql
SELECT * FROM emp;
```

実行結果イメージ：

| EMPNO | ENAME | JOB | SAL | AGE | DEPTNO |
|---|---|---|---|---|---|
| 1001 | 本山三郎 | 営業 | 720 | 34 | 2 |
| 1002 | 中村次郎 | 総務 | 720 | 29 | 2 |
| 1003 | 山田花子 | 総務 | 600 | 31 | 1 |
| ... | ... | ... | ... | ... | ... |

---

## 列の指定

取得したい列のみを指定することで、必要な情報だけを抽出できます。

```sql
SELECT empno, ename, sal FROM emp;
```

---

## WHERE句による条件抽出

`WHERE` 句を使用することで、条件に一致する行のみを取得できます。

```sql
-- 給与が700以上の従業員を取得する
SELECT empno, ename, sal FROM emp WHERE sal >= 700;
```

| EMPNO | ENAME | SAL |
|---|---|---|
| 1001 | 本山三郎 | 720 |
| 1002 | 中村次郎 | 720 |
| 1004 | 三田海子 | 720 |
| 1005 | 山本太郎 | 900 |

---

## ORDER BY句による並び替え

`ORDER BY` 句を使用することで、取得結果を特定の列で並び替えられます。

- `ASC` ：昇順（小さい順）※省略時はデフォルトで昇順
- `DESC` ：降順（大きい順）

```sql
-- 給与を降順で並び替えて取得する
SELECT empno, ename, sal FROM emp ORDER BY sal DESC;
```

| EMPNO | ENAME | SAL |
|---|---|---|
| 1005 | 山本太郎 | 900 |
| 1001 | 本山三郎 | 720 |
| 1002 | 中村次郎 | 720 |
| 1004 | 三田海子 | 720 |
| 1003 | 山田花子 | 600 |
| 1006 | 山田一太 | 510 |

---

## DISTINCTによる重複排除

`DISTINCT` を使用することで、重複する値を除外して取得できます。

```sql
-- 存在する職種の種類を取得する（重複なし）
SELECT DISTINCT job FROM emp;
```

| JOB |
|---|
| 営業 |
| 総務 |
| 技術 |

---

## 列に別名を付ける（AS句）

`AS` を使用すると、取得結果の列に別名を付けることができます。  
レポートや帳票の出力など、表示名を変えたいときに便利です。

```sql
SELECT ename AS "氏名", sal AS "給与" FROM emp;
```

| 氏名 | 給与 |
|---|---|
| 本山三郎 | 720 |
| 中村次郎 | 720 |
| ... | ... |

---

## SQL*Plusでの実行方法

OracleDB環境では `sqlplus` コマンドを経由してSQLを実行します。  
SQL文を入力後、末尾にセミコロン `;` を付けてEnterキーを押すと実行されます。

```sql
SQL> SELECT * FROM emp;
```

:::tip
複数行にわたるSQL文は、最終行に `;` を付けて実行します。

```sql
SQL> SELECT empno, ename, sal
  2  FROM emp
  3  WHERE sal >= 700;
```
:::

:::caution
SQL文は大文字・小文字を区別しません。ただし文字列データの比較は区別されます。

```sql
-- 以下は同じ結果になる
SELECT * FROM emp;
select * from emp;
```
:::
