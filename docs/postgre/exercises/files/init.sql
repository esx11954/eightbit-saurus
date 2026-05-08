-- PostgreSQL 研修用 初期化スクリプト

-- 1. テーブルの削除（既に存在する場合）
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- 2. 部署テーブルの作成
CREATE TABLE departments (
    dept_id   SERIAL        PRIMARY KEY,
    dept_name VARCHAR(50)   NOT NULL
);

-- 3. 社員テーブルの作成
CREATE TABLE employees (
    emp_id    SERIAL        PRIMARY KEY,
    emp_name  VARCHAR(50)   NOT NULL,
    dept_id   INTEGER       REFERENCES departments(dept_id),
    salary    NUMERIC(10,2) NOT NULL DEFAULT 0,
    hired_at  DATE          NOT NULL
);

-- 4. プロジェクトテーブルの作成
CREATE TABLE projects (
    proj_id      SERIAL        PRIMARY KEY,
    proj_name    VARCHAR(100)  NOT NULL,
    lead_emp_id  INTEGER       REFERENCES employees(emp_id),
    budget       NUMERIC(12,2),
    started_at   DATE
);

-- 5. インデックスの作成
CREATE INDEX idx_employees_dept_id      ON employees(dept_id);
CREATE INDEX idx_projects_lead_emp_id   ON projects(lead_emp_id);

SELECT 'Database schema initialized successfully.' AS message;
