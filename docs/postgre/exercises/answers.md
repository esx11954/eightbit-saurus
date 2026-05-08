---
sidebar_position: 21
title: "解答集"
draft: true
---

# 解答集

:::caution 解答を見る前に
まず自分でSQLを書いてみましょう。詰まったときは先に[ヒント集](./hints.md)を参照してください。
:::

---

## DDL演習

### 問題1

```sql
CREATE TABLE products (
    product_id   SERIAL        PRIMARY KEY,
    product_name VARCHAR(100)  NOT NULL,
    price        INTEGER       NOT NULL CHECK (price >= 0),
    category     VARCHAR(50),
    created_at   TIMESTAMPTZ   DEFAULT NOW()
);
```

### 問題2

1. `NUMERIC(9,2)`
2. `VARCHAR(255)`
3. `BOOLEAN`
4. `TEXT`
5. `TIMESTAMPTZ`

### 問題3

```sql
ALTER TABLE products
    ADD CONSTRAINT chk_category
    CHECK (category IN ('食品', '電化製品', '衣類', 'その他'));

ALTER TABLE products
    ADD CONSTRAINT uq_product_name UNIQUE (product_name);

ALTER TABLE products
    ADD COLUMN stock INTEGER NOT NULL DEFAULT 0;
```

### 問題4

```sql
ALTER TABLE employees ADD COLUMN email VARCHAR(100);
ALTER TABLE employees ALTER COLUMN salary SET DEFAULT 300000;
ALTER TABLE employees RENAME COLUMN hired_at TO join_date;

-- NOT NULL追加前に既存行を埋める
UPDATE employees SET email = emp_id || '@example.com' WHERE email IS NULL;
ALTER TABLE employees ALTER COLUMN email SET NOT NULL;
```

### 問題5

```sql
-- クエリA
CREATE INDEX idx_emp_dept_id ON employees (dept_id);

-- クエリB（関数インデックス）
CREATE INDEX idx_emp_lower_name ON employees (LOWER(emp_name));

-- クエリC（部分インデックス）
CREATE INDEX idx_jobs_pending ON jobs (created_at)
    WHERE status = 'pending';
```

### 問題6

```sql
CREATE VIEW emp_detail_view AS
SELECT
    e.emp_id,
    e.emp_name,
    COALESCE(d.dept_name, '未所属') AS dept_name,
    e.salary,
    e.salary * 12 AS annual_salary
FROM employees AS e
LEFT JOIN departments AS d ON e.dept_id = d.dept_id;

-- 年収600万以上の社員を抽出
SELECT * FROM emp_detail_view WHERE annual_salary >= 6000000;
```

---

## DCL演習

### 問題1

```sql
CREATE ROLE app_readonly NOLOGIN;
CREATE USER alice WITH PASSWORD 'pass123';
CREATE USER bob WITH PASSWORD 'pass456' CONNECTION LIMIT 3;
```

### 問題2

```sql
GRANT USAGE ON SCHEMA public TO alice;
GRANT SELECT, INSERT ON employees TO alice;
GRANT app_readonly TO bob;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
```

### 問題3

```sql
\dp employees

REVOKE INSERT ON employees FROM alice;

\dp employees
```

### 問題4

```sql
CREATE USER part_timer WITH PASSWORD 'partpass';
GRANT USAGE ON SCHEMA public TO part_timer;
GRANT SELECT ON departments TO part_timer;
-- employees への権限は付与しない

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO part_timer;
-- ただし departments のみに適用したい場合は DEFAULT PRIVILEGES は使わず手動管理
```

動作：
- `SELECT * FROM departments;` → 成功
- `SELECT * FROM employees;` → **エラー**（権限なし）
- `INSERT INTO departments ...;` → **エラー**（INSERT権限なし）

### 問題5

```sql
-- グループロールを作成
CREATE ROLE dev_team NOLOGIN;
CREATE ROLE sales_team NOLOGIN;
CREATE ROLE hr_manager NOLOGIN;

-- 権限付与
GRANT USAGE ON SCHEMA public TO dev_team, sales_team, hr_manager;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dev_team;
GRANT SELECT ON employees, departments TO sales_team;

-- hr_manager にだけ salary 列を含む参照を許可（列レベル権限）
GRANT SELECT ON employees TO hr_manager;
-- ※PostgreSQLの列レベル権限を使う場合:
-- GRANT SELECT (emp_id, emp_name, dept_id, hired_at, salary) ON employees TO hr_manager;

-- メンバーの追加例（将来増えてもここだけ変更）
GRANT dev_team TO alice;
GRANT sales_team TO bob;
```

---

## TCL演習

### 問題1

- **Q1**: 見える（同一セッション内ではCOMMIT前でも変更が反映されている）
- **Q2**: 見えない（READ COMMITTEDでは未COMMITのデータは他セッションから見えない）
- **Q3**: 見えない（ROLLBACKで挿入が取り消されたため）

### 問題2

```sql
BEGIN;
UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1;
SAVEPOINT sp_all_5pct;

-- 田中 太郎（emp_id=1）だけ10%アップに変更しようとして誤って20%にしてしまった
UPDATE employees SET salary = salary * (1.20 / 1.05) WHERE emp_id = 1;
-- → 間違えた！

ROLLBACK TO SAVEPOINT sp_all_5pct;
-- 開発部全員が5%アップの状態に戻る

-- 田中 太郎だけを5%→10%に（既に5%アップ済みなので、さらに (1.10/1.05) 倍）
UPDATE employees SET salary = salary * (1.10 / 1.05) WHERE emp_id = 1;

COMMIT;
```

### 問題3

**結果**: デッドロックが発生します。
- セッションAが emp_id=1 をロック → セッションBが emp_id=2 をロック
- セッションAが emp_id=2 を待つ → セッションBが emp_id=1 を待つ → 膠着

PostgreSQLが自動検出して、一方のセッションを `ERROR: deadlock detected` でロールバックします。

**修正案**: 両セッションで `emp_id` の昇順にUPDATEする。

```sql
-- セッションA・B共通の順序（昇順）
BEGIN;
UPDATE employees SET salary = salary + ? WHERE emp_id = 1;
UPDATE employees SET salary = salary + ? WHERE emp_id = 2;
COMMIT;
```

### 問題4

| 分離レベル | ステップ3の結果 | 理由 |
| :--- | :--- | :--- |
| READ COMMITTED | **600000** | COMMITされたデータを常に読むため、セッションBのCOMMIT後は新しい値が見える |
| REPEATABLE READ | **500000** | トランザクション開始時点のスナップショットを使い続けるため変わらない |

### 問題5

```sql
BEGIN;

SELECT stock FROM inventory
WHERE product_id = 5
FOR UPDATE;

-- アプリ側またはPL/pgSQLで在庫チェック
-- stock > 0 なら:
UPDATE inventory SET stock = stock - 1 WHERE product_id = 5;

COMMIT;
```

PL/pgSQLで実装する場合：

```sql
DO $$
DECLARE
    current_stock INTEGER;
BEGIN
    SELECT stock INTO current_stock
    FROM inventory
    WHERE product_id = 5
    FOR UPDATE;

    IF current_stock <= 0 THEN
        RAISE EXCEPTION '在庫がありません';
    END IF;

    UPDATE inventory SET stock = stock - 1 WHERE product_id = 5;
    COMMIT;
END;
$$;
```

---

## DML基礎演習

### 問題1

```sql
INSERT INTO employees (emp_name, dept_id, salary, hired_at) VALUES
    ('伊藤 誠', 2, 410000, '2024-04-01'),
    ('渡辺 奈々', 1, 470000, '2024-07-01');

INSERT INTO departments (dept_name) VALUES
    ('法務部'),
    ('経理部');
```

### 問題2

```sql
-- 1
SELECT emp_name, salary FROM employees;

-- 2
SELECT * FROM employees WHERE salary >= 450000 ORDER BY salary DESC;

-- 3
SELECT * FROM employees
WHERE hired_at >= '2020-01-01'
ORDER BY hired_at
LIMIT 5;

-- 4
SELECT * FROM employees WHERE dept_id IS NULL;

-- 5
SELECT emp_name, salary, salary * 12 AS annual_salary FROM employees;
```

### 問題3

```sql
-- 1
SELECT * FROM employees WHERE salary BETWEEN 400000 AND 500000;

-- 2
SELECT * FROM employees WHERE dept_id IN (1, 2);

-- 3
SELECT * FROM employees WHERE emp_name LIKE '%田%';

-- 4
SELECT * FROM employees
WHERE salary >= 450000 AND hired_at >= '2020-01-01';

-- 5
SELECT * FROM employees
WHERE dept_id IS NOT NULL AND dept_id <> 1;
```

### 問題4

```sql
-- 1
UPDATE employees
SET dept_id = 3, salary = 400000
WHERE emp_id = 7;

-- 2（先にSELECTで確認）
SELECT * FROM employees WHERE hired_at >= '2024-01-01';
UPDATE employees
SET salary = salary * 1.1
WHERE hired_at >= '2024-01-01';

-- 3
DELETE FROM employees WHERE emp_name = '伊藤 誠';
```

### 問題5

```sql
-- 1
SELECT COUNT(*) AS 人数, AVG(salary) AS 平均, MAX(salary) AS 最高, MIN(salary) AS 最低
FROM employees;

-- 2
SELECT dept_id, COUNT(*) AS 人数, AVG(salary) AS 平均給与
FROM employees
WHERE dept_id IS NOT NULL
GROUP BY dept_id;

-- 3
SELECT dept_id, COUNT(*) AS 人数
FROM employees
WHERE dept_id IS NOT NULL
GROUP BY dept_id
HAVING COUNT(*) >= 2;

-- 4
SELECT
    EXTRACT(YEAR FROM hired_at) AS 入社年,
    COUNT(*) AS 人数,
    AVG(salary) AS 平均給与
FROM employees
GROUP BY EXTRACT(YEAR FROM hired_at)
ORDER BY 入社年;
```

### 問題6

```sql
-- 1
SELECT
    emp_name,
    salary,
    CASE
        WHEN salary >= 500000 THEN 'S'
        WHEN salary >= 450000 THEN 'A'
        WHEN salary >= 400000 THEN 'B'
        ELSE 'C'
    END AS grade
FROM employees;

-- 2
SELECT
    dept_id,
    COUNT(*) FILTER (WHERE salary >= 500000) AS 高給与人数,
    COUNT(*) AS 総人数
FROM employees
WHERE dept_id IS NOT NULL
GROUP BY dept_id;
```

### 問題7

```sql
INSERT INTO departments (dept_id, dept_name)
VALUES (1, '開発一部')
ON CONFLICT (dept_id) DO UPDATE
    SET dept_name = EXCLUDED.dept_name;

SELECT * FROM departments WHERE dept_id = 1;
```

---

## DML応用演習

### 問題1

```sql
SELECT e.emp_name, d.dept_name, e.salary
FROM employees AS e
JOIN departments AS d ON e.dept_id = d.dept_id
ORDER BY e.emp_id;
```

### 問題2

```sql
SELECT
    e.emp_name,
    COALESCE(d.dept_name, '未所属') AS dept_name,
    e.salary
FROM employees AS e
LEFT JOIN departments AS d ON e.dept_id = d.dept_id
ORDER BY e.emp_id;
```

### 問題3

```sql
SELECT
    e.emp_name,
    COALESCE(d.dept_name, '未所属') AS dept_name,
    p.proj_name
FROM employees AS e
LEFT JOIN departments AS d ON e.dept_id = d.dept_id
LEFT JOIN projects AS p ON e.emp_id = p.lead_emp_id
ORDER BY e.emp_id;
```

### 問題4

```sql
SELECT
    d.dept_name,
    COUNT(DISTINCT e.emp_id)   AS 社員数,
    AVG(e.salary)              AS 平均給与,
    COUNT(DISTINCT p.proj_id)  AS プロジェクト数
FROM departments AS d
LEFT JOIN employees AS e ON d.dept_id = e.dept_id
LEFT JOIN projects AS p ON e.emp_id = p.lead_emp_id
GROUP BY d.dept_id, d.dept_name
ORDER BY d.dept_id;
```

### 問題5

```sql
SELECT a.emp_name AS 社員A, b.emp_name AS 社員B
FROM employees AS a
JOIN employees AS b
    ON a.dept_id = b.dept_id
    AND a.emp_id < b.emp_id
WHERE a.dept_id IS NOT NULL
ORDER BY a.emp_id, b.emp_id;
```

### 問題6

```sql
SELECT emp_name, dept_id, salary FROM employees WHERE dept_id = 1
UNION
SELECT emp_name, dept_id, salary FROM employees WHERE salary >= 480000
ORDER BY emp_name;
```

### 問題7

```sql
SELECT emp_id, emp_name FROM employees
EXCEPT
SELECT e.emp_id, e.emp_name
FROM employees AS e
JOIN projects AS p ON e.emp_id = p.lead_emp_id;
```

### 問題8

```sql
SELECT
    emp_name,
    salary,
    (SELECT AVG(salary) FROM employees)                AS 全体平均,
    salary - (SELECT AVG(salary) FROM employees)       AS 差額
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;
```

### 問題9

```sql
-- EXISTS
SELECT emp_name
FROM employees AS e
WHERE EXISTS (
    SELECT 1 FROM projects AS p WHERE p.lead_emp_id = e.emp_id
);

-- NOT EXISTS
SELECT emp_name
FROM employees AS e
WHERE NOT EXISTS (
    SELECT 1 FROM projects AS p WHERE p.lead_emp_id = e.emp_id
);
```

### 問題10

```sql
SELECT
    e.emp_name,
    e.dept_id,
    e.salary,
    (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) AS 部署平均
FROM employees AS e
WHERE e.salary > (
    SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id
)
ORDER BY e.dept_id, e.salary DESC;
```

### 問題11

```sql
SELECT e.emp_name, e.dept_id, e.salary
FROM employees AS e
JOIN (
    SELECT dept_id, MAX(salary) AS max_salary
    FROM employees
    WHERE dept_id IS NOT NULL
    GROUP BY dept_id
) AS dept_max
    ON e.dept_id = dept_max.dept_id
    AND e.salary = dept_max.max_salary
ORDER BY e.dept_id;
```

### 問題12

```sql
WITH dept_stats AS (
    SELECT
        dept_id,
        AVG(salary)  AS avg_salary
    FROM employees
    WHERE dept_id IS NOT NULL
    GROUP BY dept_id
),
dept_report AS (
    SELECT
        d.dept_name,
        ROUND(ds.avg_salary) AS avg_salary
    FROM dept_stats AS ds
    JOIN departments AS d ON ds.dept_id = d.dept_id
)
SELECT * FROM dept_report
ORDER BY avg_salary DESC;
```

### 問題13

```sql
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n * 2 FROM seq WHERE n < 512
)
SELECT n FROM seq;
```

### 問題14

```sql
SELECT
    emp_name,
    salary,
    RANK()       OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees
ORDER BY salary DESC;
```

### 問題15

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

### 問題16

```sql
SELECT
    emp_name,
    hired_at,
    salary,
    SUM(salary)  OVER (ORDER BY hired_at)               AS running_total,
    LAG(salary)  OVER (ORDER BY hired_at)               AS prev_salary,
    salary - LAG(salary) OVER (ORDER BY hired_at)       AS salary_diff
FROM employees
ORDER BY hired_at;
```

---

## PL/pgSQL演習

### 問題1

```sql
-- 1〜100の合計
DO $$
DECLARE
    total INTEGER := 0;
BEGIN
    FOR i IN 1..100 LOOP
        total := total + i;
    END LOOP;
    RAISE NOTICE '1〜100の合計: %', total;
END;
$$ LANGUAGE plpgsql;

-- 給与統計
DO $$
DECLARE
    max_sal NUMERIC;
    min_sal NUMERIC;
    avg_sal NUMERIC;
BEGIN
    SELECT MAX(salary), MIN(salary), AVG(salary)
    INTO max_sal, min_sal, avg_sal
    FROM employees;

    RAISE NOTICE '最高: %, 最低: %, 平均: %', max_sal, min_sal, ROUND(avg_sal);
END;
$$ LANGUAGE plpgsql;
```

### 問題2

```sql
CREATE OR REPLACE FUNCTION get_dept_headcount(dept_id_in INTEGER)
RETURNS INTEGER AS $$
DECLARE
    cnt INTEGER;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM departments WHERE dept_id = dept_id_in) THEN
        RAISE EXCEPTION '部署ID % は存在しません', dept_id_in;
    END IF;

    SELECT COUNT(*) INTO cnt FROM employees WHERE dept_id = dept_id_in;
    RETURN cnt;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_salary_grade(salary_in NUMERIC)
RETURNS TEXT AS $$
BEGIN
    RETURN CASE
        WHEN salary_in >= 500000 THEN 'S'
        WHEN salary_in >= 450000 THEN 'A'
        WHEN salary_in >= 400000 THEN 'B'
        ELSE 'C'
    END;
END;
$$ LANGUAGE plpgsql;
```

### 問題3

```sql
CREATE OR REPLACE FUNCTION get_top_earners(n INTEGER)
RETURNS TABLE (
    emp_name  VARCHAR,
    dept_name TEXT,
    salary    NUMERIC
) AS $$
BEGIN
    RETURN QUERY
        SELECT
            e.emp_name,
            COALESCE(d.dept_name, '未所属')::TEXT,
            e.salary
        FROM employees AS e
        LEFT JOIN departments AS d ON e.dept_id = d.dept_id
        ORDER BY e.salary DESC
        LIMIT n;
END;
$$ LANGUAGE plpgsql;
```

### 問題4

```sql
ALTER TABLE employees ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 動作確認
UPDATE employees SET salary = 510000 WHERE emp_id = 1;
SELECT emp_id, salary, updated_at FROM employees WHERE emp_id = 1;
```

### 問題5

```sql
CREATE TABLE IF NOT EXISTS salary_history (
    history_id  SERIAL PRIMARY KEY,
    emp_id      INTEGER,
    old_salary  NUMERIC,
    new_salary  NUMERIC,
    changed_at  TIMESTAMPTZ DEFAULT NOW(),
    changed_by  TEXT
);

CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO salary_history (emp_id, old_salary, new_salary, changed_by)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary, current_user);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_salary_history
    AFTER UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION log_salary_change();
```

### 問題6

```sql
CREATE OR REPLACE PROCEDURE bulk_salary_update(
    dept_id_in  INTEGER,
    raise_rate  NUMERIC
)
LANGUAGE plpgsql AS $$
DECLARE
    updated_count INTEGER;
    max_salary    NUMERIC;
BEGIN
    UPDATE employees
    SET salary = salary * (1 + raise_rate)
    WHERE dept_id = dept_id_in;

    GET DIAGNOSTICS updated_count = ROW_COUNT;

    SELECT MAX(salary) INTO max_salary
    FROM employees
    WHERE dept_id = dept_id_in;

    IF max_salary > 1000000 THEN
        RAISE EXCEPTION '昇給後の給与が上限（1,000,000円）を超える社員がいます。最高給与: %', max_salary;
    END IF;

    RAISE NOTICE '% 名の給与を更新しました', updated_count;
    COMMIT;
END;
$$;
```
