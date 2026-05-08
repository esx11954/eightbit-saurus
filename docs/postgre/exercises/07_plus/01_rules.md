---
sidebar_position: 1
title: "総合演習1: 総合設計"
---

# 総合演習1: 総合設計

これまでの全範囲を組み合わせた総合問題です。

---

## シナリオ

社内の人事システムをPostgreSQLで構築します。
既存の `employees`・`departments`・`projects` テーブルに加え、以下の要件を満たすシステムを設計・実装してください。

---

## 問題1 スキーマ拡張

以下のテーブルを追加してください。

**`evaluations`（評価テーブル）**

| 列名 | 型 | 制約 |
| :--- | :--- | :--- |
| `eval_id` | SERIAL | PK |
| `emp_id` | INTEGER | FK → employees |
| `eval_year` | INTEGER | NOT NULL |
| `score` | INTEGER | 1〜5のみ許可 |
| `comment` | TEXT | — |
| `evaluated_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `evaluated_by` | INTEGER | FK → employees |

- 同一社員・同一年の評価は1件だけ（複合ユニーク制約）

---

## 問題2 アクセス制御

以下のロール設計を実装してください。

| ロール | 権限 |
| :--- | :--- |
| `hr_staff` | 全テーブルの読み取り + `evaluations` への書き込み |
| `manager` | 全テーブルの読み取りのみ |
| `developer` | `employees`・`departments`・`projects` の読み取りのみ |

---

## 問題3 分析クエリ

以下の集計クエリをすべて1つのSQLで実装してください（CTEを活用する）。

**出力形式:**

| dept_name | headcount | avg_salary | avg_score | top_earner |
| :--- | :--- | :--- | :--- | :--- |
| 開発部 | 3 | 490000 | 4.2 | 中村 さくら |
| ... | ... | ... | ... | ... |

- `avg_score`: 部署内の平均評価スコア（評価なしの場合はNULL）
- `top_earner`: 部署内で最も給与が高い社員名

---

## 問題4 自動化

以下を自動化するトリガーを実装してください。

1. 社員が削除されるとき（`DELETE`）、削除情報を `deleted_employees` テーブルに記録する
   - `emp_id`・`emp_name`・`salary`・`deleted_at`・`deleted_by`（`current_user`）
2. プロジェクトのリーダーに設定された社員の給与が300,000円未満の場合、挿入をブロックしてエラーを返す

---

[ヒント](../hints.md#総合演習1)
