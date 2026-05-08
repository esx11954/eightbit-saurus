---
sidebar_position: 3
title: "7-3. PL/pgSQL"
---

# 7-3. PL/pgSQL

## PL/pgSQLとは

PL/pgSQL（Procedural Language for PostgreSQL）は、PostgreSQL上で動く**手続き型プログラミング言語**です。
変数・条件分岐・ループ・例外処理などを使い、SQLだけでは表現しにくい複雑なロジックをデータベース内に実装できます。

| 用途 | 説明 |
| :--- | :--- |
| **関数（Function）** | 値を返す処理のまとまり。SELECTの中で呼び出せる |
| **プロシージャ（Procedure）** | 値を返さない処理のまとまり。トランザクション制御も可能 |
| **トリガー関数** | INSERT/UPDATE/DELETE に連動して自動実行される処理 |

---

## 基本構文

```sql
DO $$
DECLARE
    変数名 型 := 初期値;
BEGIN
    -- 処理
END;
$$ LANGUAGE plpgsql;
```

`DO` は無名ブロック（使い捨ての実行）です。関数化せずに動作確認したいときに便利です。

```sql
-- 簡単な例：メッセージを出力する
DO $$
BEGIN
    RAISE NOTICE '開始します';
    RAISE NOTICE '現在時刻: %', NOW();
END;
$$ LANGUAGE plpgsql;
```

`RAISE NOTICE` はコンソールにメッセージを出力します（デバッグ用途）。

---

## 変数と型

```sql
DO $$
DECLARE
    emp_count  INTEGER;
    avg_sal    NUMERIC(10,2);
    emp_rec    employees%ROWTYPE;    -- テーブルの行型
    dept_name  departments.dept_name%TYPE;  -- 特定列の型
BEGIN
    SELECT COUNT(*) INTO emp_count FROM employees;
    SELECT AVG(salary) INTO avg_sal FROM employees;

    RAISE NOTICE '社員数: %, 平均給与: %', emp_count, avg_sal;
END;
$$ LANGUAGE plpgsql;
```

`%ROWTYPE` でテーブルの行構造をそのまま変数の型として使えます。
`%TYPE` で特定の列と同じ型を使えます。テーブル定義が変わっても追従するため、ハードコードより安全です。

---

## 制御構文

### IF文

```sql
DO $$
DECLARE
    sal NUMERIC := 480000;
    grade TEXT;
BEGIN
    IF sal >= 500000 THEN
        grade := 'S';
    ELSIF sal >= 450000 THEN
        grade := 'A';
    ELSIF sal >= 400000 THEN
        grade := 'B';
    ELSE
        grade := 'C';
    END IF;

    RAISE NOTICE 'グレード: %', grade;
END;
$$ LANGUAGE plpgsql;
```

### LOOPとEXIT

```sql
DO $$
DECLARE
    i INTEGER := 1;
BEGIN
    LOOP
        RAISE NOTICE 'i = %', i;
        i := i + 1;
        EXIT WHEN i > 5;  -- 終了条件
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

### FOR ループ（整数範囲）

```sql
DO $$
BEGIN
    FOR i IN 1..5 LOOP
        RAISE NOTICE 'i = %', i;
    END LOOP;

    -- 逆順
    FOR i IN REVERSE 5..1 LOOP
        RAISE NOTICE 'i = %', i;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

### FOR ループ（クエリ結果）

```sql
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT emp_name, salary FROM employees ORDER BY salary DESC LIMIT 3
    LOOP
        RAISE NOTICE '氏名: %, 給与: %', rec.emp_name, rec.salary;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

### WHILE ループ

```sql
DO $$
DECLARE
    n INTEGER := 1;
BEGIN
    WHILE n <= 5 LOOP
        RAISE NOTICE 'n = %', n;
        n := n + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

---

## 関数（Function）

### スカラー値を返す関数

```sql
CREATE OR REPLACE FUNCTION get_annual_salary(emp_id_in INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    monthly NUMERIC;
BEGIN
    SELECT salary INTO monthly
    FROM employees
    WHERE emp_id = emp_id_in;

    IF NOT FOUND THEN
        RAISE EXCEPTION '社員ID % が見つかりません', emp_id_in;
    END IF;

    RETURN monthly * 12;
END;
$$ LANGUAGE plpgsql;

-- 呼び出し
SELECT emp_name, get_annual_salary(emp_id) AS 年収
FROM employees;
```

`NOT FOUND` は直前の `SELECT INTO` が0行だったときに `TRUE` になる特殊変数です。

### テーブルを返す関数（RETURNS TABLE）

```sql
CREATE OR REPLACE FUNCTION get_dept_employees(dept_id_in INTEGER)
RETURNS TABLE (
    emp_id   INTEGER,
    emp_name VARCHAR,
    salary   NUMERIC
) AS $$
BEGIN
    RETURN QUERY
        SELECT e.emp_id, e.emp_name, e.salary
        FROM employees AS e
        WHERE e.dept_id = dept_id_in
        ORDER BY e.salary DESC;
END;
$$ LANGUAGE plpgsql;

-- 呼び出し（テーブルのように使える）
SELECT * FROM get_dept_employees(1);
```

### 関数の削除

```sql
DROP FUNCTION get_annual_salary(INTEGER);
DROP FUNCTION IF EXISTS get_dept_employees(INTEGER);
```

---

## プロシージャ（Procedure）

PostgreSQL 11以降で使えます。`CALL` で呼び出し、関数と違い `COMMIT` / `ROLLBACK` をブロック内で実行できます。

```sql
CREATE OR REPLACE PROCEDURE transfer_salary(
    from_emp_id INTEGER,
    to_emp_id   INTEGER,
    amount      NUMERIC
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE employees SET salary = salary - amount WHERE emp_id = from_emp_id;
    UPDATE employees SET salary = salary + amount WHERE emp_id = to_emp_id;

    -- 負の給与になったら取り消す
    IF (SELECT salary FROM employees WHERE emp_id = from_emp_id) < 0 THEN
        RAISE EXCEPTION '給与が不足しています';
    END IF;

    COMMIT;
END;
$$;

-- 呼び出し
CALL transfer_salary(1, 2, 50000);
```

---

## トリガー（Trigger）

テーブルへの `INSERT` / `UPDATE` / `DELETE` に連動して、**自動的に実行される処理**を定義します。
更新日時の自動セット・変更履歴の記録などに使います。

### 実装の2ステップ

**① トリガー関数を作る**（`RETURNS TRIGGER` を返す特別な関数）

```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();  -- 新しい行の updated_at を現在時刻に上書き
    RETURN NEW;               -- 変更後の行を返す（これがテーブルに保存される）
END;
$$ LANGUAGE plpgsql;
```

**② テーブルにトリガーを紐付ける**

```sql
-- employees テーブルに updated_at 列を追加
ALTER TABLE employees ADD COLUMN updated_at TIMESTAMPTZ;

-- UPDATE の直前にトリガー関数を実行
CREATE TRIGGER trg_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
```

```sql
-- 動作確認
UPDATE employees SET salary = 510000 WHERE emp_id = 1;
SELECT emp_id, salary, updated_at FROM employees WHERE emp_id = 1;
-- → updated_at が自動でセットされている
```

### 変更履歴テーブルへの記録

```sql
-- 履歴テーブル
CREATE TABLE salary_history (
    history_id  SERIAL PRIMARY KEY,
    emp_id      INTEGER,
    old_salary  NUMERIC,
    new_salary  NUMERIC,
    changed_at  TIMESTAMPTZ DEFAULT NOW()
);

-- トリガー関数
CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    -- 給与が変わったときだけ記録
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO salary_history (emp_id, old_salary, new_salary)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーを紐付け
CREATE TRIGGER trg_salary_history
    AFTER UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION log_salary_change();
```

### トリガーの特殊変数

| 変数 | 内容 |
| :--- | :--- |
| `NEW` | INSERT/UPDATE 後の新しい行 |
| `OLD` | UPDATE/DELETE 前の古い行 |
| `TG_OP` | 実行操作の種類（`'INSERT'` / `'UPDATE'` / `'DELETE'`） |
| `TG_TABLE_NAME` | トリガーが設定されたテーブル名 |

### トリガーの削除

```sql
DROP TRIGGER trg_salary_history ON employees;
DROP FUNCTION log_salary_change();
```

---

## 例外処理

```sql
DO $$
BEGIN
    -- エラーが発生しうる処理
    INSERT INTO employees (emp_name, hired_at) VALUES ('テスト', NOW());

EXCEPTION
    WHEN not_null_violation THEN
        RAISE NOTICE 'NOT NULL 制約違反が発生しました';
    WHEN foreign_key_violation THEN
        RAISE NOTICE '外部キー制約違反が発生しました';
    WHEN OTHERS THEN
        RAISE NOTICE '予期しないエラー: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
```

`SQLERRM` はエラーメッセージ文字列、`SQLSTATE` はエラーコードを保持する特殊変数です。

:::tip PL/pgSQLを使うべきタイミング
- アプリ → DB の往復が多い処理をまとめてDB内で完結させたい
- トリガーで自動化したい（更新日時・履歴・整合性チェック）
- 複数テーブルをまたぐ複雑なバッチ処理

一方、シンプルなCRUDはアプリ側で書いたほうがテストしやすく保守性も高いため、
**複雑さとのトレードオフ**を意識して使い所を判断してください。
:::

---

## 演習問題

この章の内容を実際に手を動かして確認しましょう。

→ [高度な操作演習1: 制約・インデックス](../exercises/06_advanced/01_constraints.md)
→ [高度な操作演習2: パーティショニング](../exercises/06_advanced/02_partitions.md)
→ [高度な操作演習3: 運用・統計](../exercises/06_advanced/03_contrib.md)
→ [高度な操作演習4: PL/pgSQL](../exercises/06_advanced/04_plpgsql.md)
