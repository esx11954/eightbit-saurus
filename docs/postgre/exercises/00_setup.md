---
sidebar_position: 1
title: "演習環境の構築"
---

# 演習環境の構築

演習を始める前に、データベースと初期データを準備します。

---

## ステップ1. 演習用ファイルの準備

以下のリンクから演習用ファイルをダウンロードし、適切なフォルダ（例: `C:\temp\pg-training`）に解凍してください。

- [📥 演習用データ一式 (zip)](./files/training_data.zip)
- [📄 初期化用SQL (init.sql)](./files/init.sql)
- [📂 CSV: 部署データ (departments.csv)](./files/departments.csv)
- [📂 CSV: 社員データ (employees.csv)](./files/employees.csv)
- [📂 CSV: プロジェクトデータ (projects.csv)](./files/projects.csv)

---

## ステップ2. データベースへの接続

psql またはpgAdmin で PostgreSQL に接続し、演習用データベースを作成します。

```sql
-- 演習用データベースを作成
CREATE DATABASE pg_training;

-- psql の場合は接続先を切り替える
\c pg_training
```

---

## ステップ3. テーブルの作成

`init.sql` を参考に、3つのテーブルを作成してください。
主キー（PK）と外部キー（FK）の関係を正しく定義することがポイントです。

```sql
-- 参照される側（親テーブル）を先に作成すること

-- 1. 部署テーブル
CREATE TABLE departments ( ... );

-- 2. 社員テーブル（departments を参照）
CREATE TABLE employees ( ... );

-- 3. プロジェクトテーブル（employees を参照）
CREATE TABLE projects ( ... );
```

:::tip テーブルの作成順序
外部キー制約があるため、**参照される側（親）→参照する側（子）** の順に作成する必要があります。
`departments` → `employees` → `projects` の順で作成してください。
:::

---

## ステップ4. データのインポート

各テーブルに対応するCSVファイルをインポートします。

```sql
-- psql の場合（\copy はクライアント側のファイルを読む）
\copy departments FROM 'C:\temp\pg-training\departments.csv' WITH CSV HEADER;
\copy employees  FROM 'C:\temp\pg-training\employees.csv'   WITH CSV HEADER;
\copy projects   FROM 'C:\temp\pg-training\projects.csv'    WITH CSV HEADER;
```

pgAdmin の場合は、テーブルを右クリック → Import/Export Data から取り込めます（Delimiter: `,`、Header: Yes）。

---

## ステップ5. インポートの確認

以下のSQLで件数を確認してください。

```sql
SELECT COUNT(*) FROM departments; -- 5件
SELECT COUNT(*) FROM employees;   -- 20件（dept_id が NULL の社員1名を含む）
SELECT COUNT(*) FROM projects;    -- 6件（lead_emp_id が NULL のプロジェクト1件を含む）
```

:::tip エラーが出たら？
- **外部キー制約エラー**: 親テーブルを先にインポートしましたか？
- **型のエラー**: CSVのデータ型とテーブルの列型は一致していますか？
- **文字化け**: CSVのエンコーディングをUTF-8に変換してから取り込んでみてください。
:::
