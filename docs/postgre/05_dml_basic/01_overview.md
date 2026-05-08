---
sidebar_position: 1
title: "5-1. 概要"
---

# 5-1. DMLの概要

## DMLとは

DML（Data Manipulation Language）は、テーブルに格納された**データを操作**するための言語です。
DDLが「入れ物を作る」言語だとすると、DMLは「入れ物の中身を操作する」言語です。

| コマンド | 役割 | 対応するCRUD |
| :--- | :--- | :--- |
| `SELECT` | データを検索・取得する | **R**ead |
| `INSERT` | データを追加する | **C**reate |
| `UPDATE` | データを変更する | **U**pdate |
| `DELETE` | データを削除する | **D**elete |

---

## 本章で使うテーブルとデータ

本章以降のサンプルは、以下のテーブルと初期データを前提とします。
まだ作成していない場合は先に実行しておきましょう。

```sql
-- 部署テーブル
CREATE TABLE departments (
    dept_id   SERIAL       PRIMARY KEY,
    dept_name VARCHAR(50)  NOT NULL
);

-- 社員テーブル
CREATE TABLE employees (
    emp_id    SERIAL        PRIMARY KEY,
    emp_name  VARCHAR(50)   NOT NULL,
    dept_id   INTEGER       REFERENCES departments(dept_id),
    salary    NUMERIC(10,2) NOT NULL DEFAULT 0,
    hired_at  DATE          NOT NULL
);

-- プロジェクトテーブル
CREATE TABLE projects (
    proj_id     SERIAL       PRIMARY KEY,
    proj_name   VARCHAR(100) NOT NULL,
    lead_emp_id INTEGER      REFERENCES employees(emp_id),
    budget      NUMERIC(12,2),
    started_at  DATE
);
```

```sql
-- 初期データ
INSERT INTO departments (dept_name) VALUES
    ('開発部'),
    ('営業部'),
    ('人事部'),
    ('経理部'),
    ('マーケティング部');

INSERT INTO employees (emp_name, dept_id, salary, hired_at) VALUES
    ('田中 太郎',   1, 550000, '2017-04-01'),
    ('鈴木 花子',   1, 480000, '2019-07-01'),
    ('佐藤 一郎',   2, 420000, '2018-01-15'),
    ('高橋 美咲',   2, 390000, '2021-04-01'),
    ('山田 健一',   3, 510000, '2015-10-01'),
    ('中村 さくら', 1, 620000, '2014-04-01'),
    ('小林 雄介',NULL, 350000, '2023-09-01'),
    ('加藤 誠',     1, 440000, '2020-04-01'),
    ('吉田 優子',   2, 460000, '2019-10-01'),
    ('山口 拓也',   4, 530000, '2016-07-01'),
    ('松本 あおい', 1, 380000, '2022-04-01'),
    ('井上 剛',     2, 480000, '2018-06-01'),
    ('木村 理恵',   3, 440000, '2020-01-01'),
    ('林 大輔',     4, 490000, '2017-09-01'),
    ('清水 奈緒',   5, 410000, '2021-07-01'),
    ('山崎 健太',   1, 700000, '2012-04-01'),
    ('池田 さやか', 2, 350000, '2023-04-01'),
    ('橋本 浩二',   3, 580000, '2015-01-01'),
    ('石川 麻衣',   4, 460000, '2019-04-01'),
    ('前田 涼太',   5, 430000, '2022-10-01');

INSERT INTO projects (proj_name, lead_emp_id, budget, started_at) VALUES
    ('新機能開発',       1,  5000000, '2024-01-10'),
    ('顧客管理刷新',     3,  3000000, '2024-03-01'),
    ('社内システム改善', 5,  1500000, '2024-06-01'),
    ('ECサイト構築',     9,  8000000, '2023-10-01'),
    ('採用ブランディング',13, 2000000, '2024-04-01'),
    ('新規事業調査',   NULL, 1000000, '2024-09-01');
```

---

## SELECT文の全体構造

SELECT文には多くの句があります。**記述する順序**と**実行される順序**が異なる点を把握しておきましょう。

### 記述順序

```sql
SELECT   列名
FROM     テーブル名
WHERE    絞り込み条件
GROUP BY グループ化する列
HAVING   グループ化後の絞り込み条件
ORDER BY 並び替え条件
LIMIT    取得件数
OFFSET   スキップ件数;
```

### 実行順序（内部処理の順番）

```
① FROM      対象テーブルを決める
② WHERE     行を絞り込む
③ GROUP BY  グループ化する
④ HAVING    グループを絞り込む
⑤ SELECT    列を取り出す・計算する
⑥ ORDER BY  並び替える
⑦ LIMIT     件数を制限する
```

:::note なぜ実行順序が大事か？
`WHERE` 句では `SELECT` で付けた列の別名（エイリアス）が使えません。
`SELECT` より `WHERE` が先に実行されるためです。別名を使いたい場合は `HAVING` や `ORDER BY` で使います。
:::
