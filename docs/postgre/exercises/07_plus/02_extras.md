---
sidebar_position: 2
title: "総合演習2: 発展課題"
---

# 総合演習2: 発展課題

余裕のある方向けの発展問題です。答えを一つに絞らず、複数のアプローチを試してみましょう。

---

## 問題1 クエリのリファクタリング

以下のクエリは動作しますが、可読性・保守性・パフォーマンスの面で改善できます。
問題点を指摘し、改善版を書いてください。

```sql
SELECT * FROM employees WHERE emp_id IN (
    SELECT emp_id FROM employees WHERE salary > (
        SELECT AVG(salary) FROM employees WHERE dept_id IN (
            SELECT dept_id FROM departments WHERE dept_name IN ('開発部', '営業部')
        )
    ) AND dept_id IN (
        SELECT dept_id FROM departments WHERE dept_name IN ('開発部', '営業部')
    )
);
```

---

## 問題2 パフォーマンスチューニング

以下のクエリが遅い原因を調査し、改善してください（`EXPLAIN ANALYZE` を活用）。

```sql
-- 社員名の一部で検索（前方一致）
SELECT * FROM employees WHERE emp_name LIKE '田%';

-- 入社年で集計
SELECT EXTRACT(YEAR FROM hired_at), COUNT(*)
FROM employees
GROUP BY EXTRACT(YEAR FROM hired_at);
```

それぞれについて：
1. `EXPLAIN ANALYZE` の結果を確認して遅い原因を特定する
2. 適切なインデックスを作成する
3. インデックス作成後に再度 `EXPLAIN ANALYZE` して改善を確認する

---

## 問題3 再帰CTEで組織ツリー

以下の組織テーブルを作成して、組織の階層構造を再帰CTEで表示してください。

```sql
CREATE TABLE org (
    emp_id     INTEGER PRIMARY KEY,
    emp_name   VARCHAR(50),
    manager_id INTEGER REFERENCES org(emp_id)
);

INSERT INTO org VALUES
    (1, '社長', NULL),
    (2, '開発部長', 1),
    (3, '営業部長', 1),
    (4, '開発リーダー', 2),
    (5, '開発メンバーA', 4),
    (6, '開発メンバーB', 4),
    (7, '営業メンバーC', 3);
```

出力例：
```
社長
  開発部長
    開発リーダー
      開発メンバーA
      開発メンバーB
  営業部長
    営業メンバーC
```

---

## 問題4 ウィンドウ関数の応用

以下をすべて1つのクエリで実装してください。

**出力したい内容:**
- 全社員について、入社日順に並べる
- 入社日の累積人数（その時点までの累積入社人数）
- 直前に入社した人との給与差
- 自分の部署内での給与順位
- 全社員中の給与パーセンタイル（例: 上位20%なら80.0と表示）

---

## 問題5 トランザクション設計

以下のビジネスロジックをトランザクションとPL/pgSQLで実装してください。

**仕様: 社員の異動処理**
1. 社員の部署を変更する
2. 異動履歴テーブル（`dept_transfers`）に記録する（from_dept_id, to_dept_id, transferred_at）
3. 異動後の部署の平均給与と比べ、当該社員の給与が平均の70%未満の場合は、自動的に平均の70%まで昇給させる
4. 上記の昇給が発生した場合は `salary_history` にも記録する

すべての処理が成功した場合のみCOMMITし、1つでも失敗したらROLLBACKするようにしてください。

---

[ヒント](../hints.md#総合演習2)
