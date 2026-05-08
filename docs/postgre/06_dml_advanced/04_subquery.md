---
sidebar_position: 4
title: "6-4. サブクエリ"
---

# 6-4. サブクエリ

## サブクエリとは

`SELECT` 文の中に別の `SELECT` 文を埋め込んだものです。
内側のクエリ（サブクエリ）の結果を、外側のクエリが利用します。

サブクエリは書く位置によって3種類に分類されます。

| 種類 | 書く位置 | 返す値 |
| :--- | :--- | :--- |
| スカラーサブクエリ | `SELECT` 句・`WHERE` 句 | 1行1列の単一値 |
| テーブルサブクエリ | `FROM` 句 | 複数行・複数列（仮想テーブル） |
| 述語サブクエリ | `WHERE` 句 | `IN` / `EXISTS` で使う集合 |

---

## スカラーサブクエリ

**1行1列の単一値**を返すサブクエリです。列の値や比較値として使います。

```sql
-- 全社員の平均給与より高い給与の社員を抽出
SELECT emp_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

```sql
-- SELECT句に書いて、各行に全社員平均を並べる
SELECT
    emp_name,
    salary,
    (SELECT AVG(salary) FROM employees) AS 全体平均
FROM employees;
```

:::caution スカラーサブクエリは必ず1行1列を返すこと
2行以上または2列以上を返すとエラーになります。
`AVG` `MAX` `MIN` `COUNT` などの集計関数で1行に絞るか、`LIMIT 1` を使います。
:::

---

## テーブルサブクエリ（導出テーブル）

`FROM` 句にサブクエリを書き、**仮想的なテーブル**として扱います。

```sql
-- 部署ごとの平均給与を先に計算し、その結果に条件を付ける
SELECT dept_id, avg_salary
FROM (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
) AS dept_avg
WHERE avg_salary >= 450000;
```

`GROUP BY` の結果に `WHERE` を使えないため（`HAVING` を使うべき場面ですが）、
サブクエリで一段ラップすることで柔軟な絞り込みが可能になります。

必ず**別名（エイリアス）**を付ける必要があります。

---

## 述語サブクエリ（IN / NOT IN）

`WHERE` 句でサブクエリの返す**集合との一致を判定**します。

```sql
-- プロジェクトリーダーである社員の一覧
SELECT emp_name
FROM employees
WHERE emp_id IN (
    SELECT lead_emp_id FROM projects WHERE lead_emp_id IS NOT NULL
);

-- プロジェクトリーダーでない社員の一覧
SELECT emp_name
FROM employees
WHERE emp_id NOT IN (
    SELECT lead_emp_id FROM projects WHERE lead_emp_id IS NOT NULL
);
```

:::danger NOT IN と NULL の罠
サブクエリの結果に `NULL` が1件でも含まれると、`NOT IN` は**常に空の結果**を返します。

```sql
-- lead_emp_id に NULL が含まれると誤動作する
WHERE emp_id NOT IN (SELECT lead_emp_id FROM projects)

-- 安全な書き方：IS NOT NULL で除外するか、NOT EXISTS を使う
WHERE emp_id NOT IN (SELECT lead_emp_id FROM projects WHERE lead_emp_id IS NOT NULL)
```

`NOT EXISTS` の方が NULL に対して安全なため、実務では `NOT EXISTS` が好まれます。
:::

---

## EXISTS / NOT EXISTS

サブクエリが**1行でも結果を返すか**だけを判定します（返す値は何でもよい）。
相関サブクエリと組み合わせて使うのが一般的です。

```sql
-- プロジェクトを担当している社員
SELECT emp_name
FROM employees AS e
WHERE EXISTS (
    SELECT 1
    FROM projects AS p
    WHERE p.lead_emp_id = e.emp_id  -- 外側クエリの e を参照（相関）
);

-- プロジェクトを担当していない社員
SELECT emp_name
FROM employees AS e
WHERE NOT EXISTS (
    SELECT 1
    FROM projects AS p
    WHERE p.lead_emp_id = e.emp_id
);
```

`SELECT 1` は「何でも返せばいい」という慣用表現です。`SELECT *` でも動作しますが `SELECT 1` が一般的です。

---

## 相関サブクエリ

サブクエリの中で**外側クエリの列を参照する**サブクエリです。
外側クエリの行ごとにサブクエリが実行されます。

```sql
-- 自分の部署の平均給与より高い給与の社員を抽出
SELECT emp_name, salary, dept_id
FROM employees AS e
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id = e.dept_id  -- 外側の dept_id を参照
);
```

外側の行ごとにサブクエリが実行されるため、件数が多いと**パフォーマンスが低下**しやすい点に注意が必要です。
JOINやウィンドウ関数で書き換えられないか検討しましょう。

---

## ALL / ANY（SOME）

サブクエリが返す集合全体との比較に使います。

```sql
-- すべての部署の平均給与より高い社員（最も高い平均給与を超える）
SELECT emp_name, salary
FROM employees
WHERE salary > ALL (
    SELECT AVG(salary) FROM employees GROUP BY dept_id
);

-- いずれかの部署の平均給与より高い社員
SELECT emp_name, salary
FROM employees
WHERE salary > ANY (
    SELECT AVG(salary) FROM employees GROUP BY dept_id
);
```

| 演算子 | 意味 |
| :--- | :--- |
| `> ALL (...)` | サブクエリの最大値より大きい |
| `< ALL (...)` | サブクエリの最小値より小さい |
| `> ANY (...)` | サブクエリの最小値より大きい |
| `= ANY (...)` | `IN (...)` と同じ意味 |

---

## サブクエリ vs JOIN — どちらを使うべきか

同じ結果を得るのに、サブクエリとJOINの両方で書けるケースがあります。

```sql
-- サブクエリで書く
SELECT emp_name
FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE dept_name = '開発部');

-- JOINで書く
SELECT e.emp_name
FROM employees AS e
JOIN departments AS d ON e.dept_id = d.dept_id
WHERE d.dept_name = '開発部';
```

| 観点 | サブクエリ | JOIN |
| :--- | :--- | :--- |
| 読みやすさ | 条件が明確で意図が伝わりやすい | 結合関係が一目でわかる |
| パフォーマンス | 現代のクエリプランナーはほぼ同等に最適化する | 複数列を取得する場合は有利なことが多い |
| 使い分け | 「存在確認」「単一値の取得」 | 「結合先の列も取得したい」 |

`EXISTS` による存在確認はサブクエリが自然であり、`JOIN` で代替すると重複行が発生する可能性があるため注意が必要です。
