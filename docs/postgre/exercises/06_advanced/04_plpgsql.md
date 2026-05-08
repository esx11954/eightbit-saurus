---
sidebar_position: 4
title: "高度な操作演習4: PL/pgSQL"
---

# 高度な操作演習4: PL/pgSQL

対応章: [7章 PL/pgSQL](../../07_advanced/03_plpgsql.md)

---

## 問題1 無名ブロック

以下の処理を無名ブロック（`DO $$...$$`）で実装してください。

1. 変数 `n` に 1〜100 の合計を計算して `RAISE NOTICE` で表示する
2. `employees` テーブルから給与の最高額・最低額・平均額を取得し、まとめて表示する

---

## 問題2 関数の作成

以下の関数を作成してください。

**関数1: `get_dept_headcount(dept_id_in INTEGER) RETURNS INTEGER`**
- 指定した部署の社員数を返す
- 存在しない部署IDの場合は例外を発生させる（`RAISE EXCEPTION`）

**関数2: `get_salary_grade(salary_in NUMERIC) RETURNS TEXT`**
- 以下の基準でグレード文字列を返す
  - 50万以上 → `'S'`
  - 45万以上 → `'A'`
  - 40万以上 → `'B'`
  - それ未満 → `'C'`

作成後、以下のクエリで動作確認してください。

```sql
SELECT emp_name, salary, get_salary_grade(salary) AS grade
FROM employees;
```

---

## 問題3 テーブルを返す関数

以下の関数を作成してください。

**関数: `get_top_earners(n INTEGER) RETURNS TABLE`**
- 給与上位N名の `emp_name`・`dept_name`・`salary` を返す
- `employees` と `departments` を結合して `dept_name` も含める
- 部署未設定の場合は `'未所属'` と表示する

```sql
-- 呼び出し例
SELECT * FROM get_top_earners(3);
```

---

## 問題4 トリガーの実装

`employees` テーブルに `updated_at TIMESTAMPTZ` 列を追加し、
UPDATE時に自動で現在時刻がセットされるトリガーを実装してください。

1. `updated_at` 列を追加する
2. トリガー関数 `set_updated_at()` を作成する
3. `BEFORE UPDATE` トリガーを `employees` テーブルに設定する
4. 動作確認（`UPDATE` 前後で `updated_at` が変わることを確認）

---

## 問題5 変更履歴トリガー

社員の給与変更履歴を記録する仕組みを実装してください。

1. 以下の構造の `salary_history` テーブルを作成する

   | 列名 | 型 |
   | :--- | :--- |
   | `history_id` | SERIAL PRIMARY KEY |
   | `emp_id` | INTEGER |
   | `old_salary` | NUMERIC |
   | `new_salary` | NUMERIC |
   | `changed_at` | TIMESTAMPTZ DEFAULT NOW() |
   | `changed_by` | TEXT（`current_user` を使って記録） |

2. `employees` の `salary` が変更されたときだけ記録するトリガー関数を作成する
3. トリガーを設定する
4. 動作確認（複数回UPDATEして、`salary_history` に記録されることを確認）

---

## 問題6 例外処理を含む関数

以下の仕様でプロシージャ `bulk_salary_update` を作成してください。

**仕様:**
- 部署IDと昇給率を引数として受け取る
- 指定部署の全社員の給与を昇給率分アップする
- 昇給後の給与が1,000,000円を超える社員がいる場合は例外を発生させてROLLBACKする
- 正常終了した場合は更新した社員数を `RAISE NOTICE` で表示する

```sql
-- 呼び出し例
CALL bulk_salary_update(1, 0.1);   -- 開発部を10%アップ
CALL bulk_salary_update(1, 5.0);   -- 開発部を500%アップ（例外が発生するはず）
```

---

[ヒント](../hints.md#plpgsql演習)
