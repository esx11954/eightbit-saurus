---
sidebar_position: 6
title: "6-6. ウィンドウ関数"
---

# 6-6. ウィンドウ関数

## ウィンドウ関数とは

`GROUP BY` によるグループ集計は、グループ内を1行に集約します。
一方、ウィンドウ関数は**各行を保持したまま集計値や順位を付与**できます。

```sql
-- GROUP BY：グループが1行に集約される
SELECT dept_id, AVG(salary) FROM employees GROUP BY dept_id;

-- ウィンドウ関数：各行を保持しつつ、部署ごとの平均を付与
SELECT
    emp_name,
    dept_id,
    salary,
    AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg
FROM employees;
```

| emp_name | dept_id | salary | dept_avg |
| --- | --- | --- | --- |
| 田中 太郎 | 1 | 500000 | 490000 |
| 鈴木 花子 | 1 | 450000 | 490000 |
| 中村 さくら | 1 | 520000 | 490000 |
| 佐藤 一郎 | 2 | 420000 | 400000 |
| ... | ... | ... | ... |

---

## OVER句の構文

```sql
関数名() OVER (
    [PARTITION BY 列名]   -- グループ化（省略すると全行が1つのウィンドウ）
    [ORDER BY 列名]        -- ウィンドウ内の並び順
    [ROWS/RANGE ...]       -- フレームの範囲（高度な使い方）
)
```

---

## 順位付け関数

### ROW_NUMBER — 連続した行番号

```sql
-- 部署ごとに給与の高い順で行番号を付ける
SELECT
    emp_name,
    dept_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS row_num
FROM employees
WHERE dept_id IS NOT NULL;
```

同じ値でも異なる番号が付きます。

### RANK — 同順位あり（次の番号はスキップ）

```sql
SELECT
    emp_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
```

| emp_name | salary | rank |
| --- | --- | --- |
| 中村 さくら | 520000 | 1 |
| 田中 太郎 | 500000 | 2 |
| 山田 健一 | 460000 | 3 |
| 鈴木 花子 | 450000 | 4 |
| ... | ... | ... |

同率の場合、次の番号がスキップされます（例：1位が2人いれば次は3位）。

### DENSE_RANK — 同順位あり（番号はスキップしない）

```sql
SELECT
    emp_name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
```

同率の場合でも番号が連続します（例：1位が2人いれば次は2位）。

---

## 集計ウィンドウ関数

`SUM` や `AVG` を `OVER` と組み合わせると、グループ合計・累計などを計算できます。

```sql
-- 部署ごとの合計給与・全社員中の構成比
SELECT
    emp_name,
    dept_id,
    salary,
    SUM(salary) OVER (PARTITION BY dept_id)      AS dept_total,
    ROUND(salary * 100.0
        / SUM(salary) OVER (PARTITION BY dept_id), 1) AS pct_in_dept
FROM employees
WHERE dept_id IS NOT NULL
ORDER BY dept_id, salary DESC;
```

### 累積合計（累計）

`ORDER BY` を指定することで、行ごとの**累積値**を計算できます。

```sql
-- 入社日の古い順に、給与の累積合計を計算
SELECT
    emp_name,
    hired_at,
    salary,
    SUM(salary) OVER (ORDER BY hired_at) AS running_total
FROM employees
ORDER BY hired_at;
```

---

## LAG / LEAD — 前後の行を参照する

### LAG — 前の行の値を取得

```sql
-- 入社日順で並べ、前の社員との給与差を計算
SELECT
    emp_name,
    hired_at,
    salary,
    LAG(salary) OVER (ORDER BY hired_at)               AS prev_salary,
    salary - LAG(salary) OVER (ORDER BY hired_at)      AS salary_diff
FROM employees
ORDER BY hired_at;
```

### LEAD — 次の行の値を取得

```sql
SELECT
    emp_name,
    hired_at,
    salary,
    LEAD(salary) OVER (ORDER BY hired_at) AS next_salary
FROM employees
ORDER BY hired_at;
```

`LAG(列, n, デフォルト値)` のように、n行前・デフォルト値を指定できます。

---

## FIRST_VALUE / LAST_VALUE / NTH_VALUE

ウィンドウ内の特定の行の値を取得します。

```sql
-- 各社員の給与と、その部署内で最高給与の社員名を並べる
SELECT
    emp_name,
    dept_id,
    salary,
    FIRST_VALUE(emp_name) OVER (
        PARTITION BY dept_id
        ORDER BY salary DESC
    ) AS top_earner
FROM employees
WHERE dept_id IS NOT NULL;
```

---

## NTILE — バケット分割

行をn等分したグループ番号を付与します。

```sql
-- 全社員を給与順に4分位に分類
SELECT
    emp_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
```

---

## ウィンドウ関数を使った実践的なパターン

### 部署ごとに給与トップ2の社員を抽出

```sql
WITH ranked AS (
    SELECT
        emp_name,
        dept_id,
        salary,
        RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
    FROM employees
    WHERE dept_id IS NOT NULL
)
SELECT emp_name, dept_id, salary
FROM ranked
WHERE rnk <= 2
ORDER BY dept_id, rnk;
```

`GROUP BY` では実現が難しいこのような「グループ内トップN」抽出が、ウィンドウ関数と CTEを組み合わせると簡潔に書けます。

---

## 主なウィンドウ関数まとめ

| 関数 | 用途 |
| :--- | :--- |
| `ROW_NUMBER()` | 連続した行番号（重複なし） |
| `RANK()` | 順位（同率あり・番号スキップ） |
| `DENSE_RANK()` | 順位（同率あり・番号連続） |
| `NTILE(n)` | n等分のバケット番号 |
| `LAG(列, n)` | n行前の値 |
| `LEAD(列, n)` | n行後の値 |
| `FIRST_VALUE(列)` | ウィンドウ先頭行の値 |
| `LAST_VALUE(列)` | ウィンドウ末尾行の値 |
| `SUM / AVG / COUNT / MAX / MIN` | 集計（`OVER`と組み合わせて） |

---

## 演習問題

この章の内容を実際に手を動かして確認しましょう。

→ [DML応用演習](../exercises/05_dml_advanced.md)
