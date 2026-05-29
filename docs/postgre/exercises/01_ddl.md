---
sidebar_position: 3
title: "DDL演習"
---

# DDL演習

対応章: [2章 DDL](../02_ddl/01_overview.md)

:::info 解答用紙のダウンロード
[📄 01_ddl.txt](./files/01_ddl.txt) をダウンロードし、このページを見ながらテキストエディタで解答を記入してください。
:::

---

## 問題1 テーブルの作成

以下の仕様で `products`（商品）テーブルを作成してください。

| 列名 | 型 | 制約 |
| :--- | :--- | :--- |
| `product_id` | 整数・自動連番 | 主キー |
| `product_name` | 可変長文字列（100文字） | NOT NULL |
| `price` | 整数 | NOT NULL、0以上 |
| `category` | 可変長文字列（50文字） | — |
| `created_at` | タイムゾーンあり日時 | デフォルト: 現在時刻 |

---

## 問題2 データ型の選択

以下の各データに適切なPostgreSQLのデータ型を答えてください。

1. 商品の税込価格（小数点以下2桁まで、最大9999999.99）
2. ユーザーのメールアドレス（最大255文字）
3. フラグ（有効/無効）
4. ブログ記事の本文（長さ制限なし）
5. 注文の確定日時（日本時間で管理）

---

## 問題3 制約の追加

問題1で作成した `products` テーブルに、以下の変更を加えてください。

1. `category` 列に `'食品'`・`'電化製品'`・`'衣類'`・`'その他'` のみ許可するチェック制約を追加する
2. `product_name` に一意制約を追加する
3. `stock` 列（整数、デフォルト0）を追加する

---

## 問題4 ALTER TABLE

既存の `employees` テーブルに対して、以下の変更をそれぞれ実行してください。

1. `email` 列（可変長文字列100文字）を追加する
2. `salary` 列のデフォルト値を `300000` に設定する
3. `hired_at` 列の列名を `join_date` に変更する
4. `email` 列に NOT NULL 制約を追加する（追加前に既存行の `email` を適当な値で埋めてから実行）

---

## 問題5 インデックスの設計

以下のクエリを高速化するために、適切なインデックスを作成してください。
それぞれどの列にどのようなインデックスを張るべきか、理由も述べてください。

```sql
-- クエリA: 部署IDで社員を絞り込む
SELECT * FROM employees WHERE dept_id = 1;

-- クエリB: 大文字小文字を無視して社員名を検索する
SELECT * FROM employees WHERE LOWER(emp_name) = 'tanaka taro';

-- クエリC: 未処理のジョブを古い順に取得する（jobsテーブル: status列, created_at列）
SELECT * FROM jobs WHERE status = 'pending' ORDER BY created_at LIMIT 10;
```

---

## 問題6 ビューの作成

`employees` と `departments` を結合して、以下の列を持つビュー `emp_detail_view` を作成してください。

- `emp_id`
- `emp_name`
- `dept_name`（部署名。部署未設定の場合は `'未所属'` と表示）
- `salary`
- `annual_salary`（salary × 12）

作成後、このビューから年収600万以上の社員を抽出するSQLも書いてください。

---

[ヒント](./hints.md#ddl演習)
