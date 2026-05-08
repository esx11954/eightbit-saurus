---
sidebar_position: 2
title: "6-2. JOIN（結合）"
---

# 6-2. JOIN（結合）

## JOINとは

2つ以上のテーブルを**共通のキー列で横につなぎ合わせる**操作です。
「社員名」と「部署名」のように、別テーブルに分かれたデータを1つの結果として取り出せます。

---

## INNER JOIN — 内部結合

両テーブルで**結合条件が一致する行だけ**を返します。最もよく使うJOINです。

```sql
SELECT
    e.emp_id,
    e.emp_name,
    d.dept_name
FROM employees AS e
INNER JOIN departments AS d ON e.dept_id = d.dept_id;
```

| emp_id | emp_name | dept_name |
| --- | --- | --- |
| 1 | 田中 太郎 | 開発部 |
| 2 | 鈴木 花子 | 開発部 |
| 3 | 佐藤 一郎 | 営業部 |
| ... | ... | ... |

`dept_id` が NULL の「小林 雄介」は結合条件が一致しないため、**結果に含まれません**。

:::tip テーブルの別名（エイリアス）
`AS e` でテーブルに短い名前を付けると、列の参照が `employees.emp_name` → `e.emp_name` と簡潔になります。
複数テーブルを扱うときは必ず付ける習慣にしましょう。
:::

---

## LEFT OUTER JOIN — 左外部結合

**左テーブルのすべての行**を返します。右テーブルに一致する行がない場合は、右側がNULLで埋まります。

```sql
SELECT
    e.emp_id,
    e.emp_name,
    d.dept_name
FROM employees AS e
LEFT JOIN departments AS d ON e.dept_id = d.dept_id;
```

| emp_id | emp_name | dept_name |
| --- | --- | --- |
| 1 | 田中 太郎 | 開発部 |
| ... | ... | ... |
| 7 | 小林 雄介 | **NULL** |

`LEFT JOIN` は `LEFT OUTER JOIN` の省略形です。どちらも同じ意味です。

### 典型的な用途：「〜に紐付いていない行」を探す

```sql
-- どの部署にも属していない社員を探す
SELECT e.emp_id, e.emp_name
FROM employees AS e
LEFT JOIN departments AS d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
```

---

## RIGHT OUTER JOIN — 右外部結合

**右テーブルのすべての行**を返します。左テーブルに一致する行がない場合、左側がNULLになります。

```sql
-- 社員がいない部署も含めて表示
SELECT
    d.dept_name,
    e.emp_name
FROM employees AS e
RIGHT JOIN departments AS d ON e.dept_id = d.dept_id;
```

`RIGHT JOIN` は `LEFT JOIN` と向きを入れ替えるだけなので、テーブルの順序を入れ替えて `LEFT JOIN` で書き直せます。
実務では**LEFT JOIN に統一**することで読みやすくなります。

---

## FULL OUTER JOIN — 完全外部結合

**両テーブルのすべての行**を返します。片方に一致しない場合はNULLで埋まります。

```sql
-- 社員側・部署側どちらの取りこぼしもなく全件表示
SELECT
    e.emp_name,
    d.dept_name
FROM employees AS e
FULL OUTER JOIN departments AS d ON e.dept_id = d.dept_id;
```

データ突合・整合性チェックなどで活用します。

---

## CROSS JOIN — 直積結合

条件なしで**すべての行同士を掛け合わせる**結合です。m行 × n行 = m×n行になります。

```sql
-- 3部署 × 7社員 = 21行
SELECT d.dept_name, e.emp_name
FROM departments AS d
CROSS JOIN employees AS e;
```

意図せず使うと膨大な件数になるため注意が必要ですが、カレンダーや組み合わせ一覧の生成に使います。

---

## 自己結合（SELF JOIN）

同じテーブルを2つの別名で扱い、**同テーブル内の行同士を結合**します。

```sql
-- 同じ部署の社員同士をペアにする
SELECT
    a.emp_name AS 社員A,
    b.emp_name AS 社員B
FROM employees AS a
JOIN employees AS b
    ON a.dept_id = b.dept_id
    AND a.emp_id < b.emp_id  -- 重複ペアを除外
ORDER BY a.emp_id;
```

---

## 3テーブル以上の結合

JOINは何個でも連鎖できます。

```sql
-- 社員名・部署名・担当プロジェクト名を一覧表示
SELECT
    e.emp_name,
    d.dept_name,
    p.proj_name
FROM employees AS e
JOIN departments AS d ON e.dept_id  = d.dept_id
LEFT JOIN projects AS p ON e.emp_id = p.lead_emp_id
ORDER BY e.emp_id;
```

LEFT JOINを使うことで、プロジェクトのリーダーでない社員もNULLとして結果に含められます。

---

## JOIN時の注意点

### 結合条件の誤りによる行の爆発

結合条件が曖昧だったり間違えると、意図せず大量の行が生成されます。

```sql
-- NG: 結合条件なし（CROSS JOIN と同じになる）
SELECT * FROM employees, departments;

-- OK: 明示的に ON 条件を書く
SELECT * FROM employees JOIN departments ON employees.dept_id = departments.dept_id;
```

### 同名列の曖昧さ

複数テーブルに同じ列名がある場合は、テーブル名（または別名）を付けて参照します。

```sql
-- NG: dept_id がどちらのテーブルか不明でエラーになる
SELECT dept_id FROM employees JOIN departments ON employees.dept_id = departments.dept_id;

-- OK
SELECT e.dept_id FROM employees AS e JOIN departments AS d ON e.dept_id = d.dept_id;
```

### JOINの種類まとめ

| 種類 | 結果に含まれる行 |
| :--- | :--- |
| `INNER JOIN` | 両テーブルで結合条件が一致する行のみ |
| `LEFT JOIN` | 左テーブルの全行 + 右テーブルは一致行（なければ NULL） |
| `RIGHT JOIN` | 右テーブルの全行 + 左テーブルは一致行（なければ NULL） |
| `FULL OUTER JOIN` | 両テーブルの全行（不一致側は NULL） |
| `CROSS JOIN` | 両テーブルの全組み合わせ（件数が爆発するため注意） |
