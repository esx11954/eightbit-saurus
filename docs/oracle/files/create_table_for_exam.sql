-- 部署情報テーブル (departments)
CREATE SEQUENCE seq_department_id
  START WITH 10
  INCREMENT BY 10
  NOCACHE;

CREATE TABLE departments (
    department_id NUMBER PRIMARY KEY,
    department_name VARCHAR2(50) NOT NULL
);

/*
department_id: 部署ID（主キー）
department_name: 部署名
*/

-- 資格マスタテーブル
CREATE SEQUENCE seq_qualification_id
  START WITH 1
  INCREMENT BY 1
  NOCACHE;

CREATE TABLE qualifications (
    qualification_id NUMBER PRIMARY KEY,
    qualification_name VARCHAR2(100) NOT NULL,
    description CLOB,
    certification_body VARCHAR2(100),
    created_at DATE DEFAULT SYSDATE,
    updated_at DATE
);
/*
qualification_id: 資格ID（主キー）
qualification_name: 資格名
description: 資格の説明
certification_body: 認定機関
created_at: 作成日時
updated_at: 更新日時
*/

-- 従業員情報テーブル (employees)
CREATE SEQUENCE seq_employee_id
  START WITH 1000
  INCREMENT BY 1
  NOCACHE;

CREATE TABLE employees (
    employee_id NUMBER PRIMARY KEY,
    employee_name VARCHAR2(50) NOT NULL,
    department_id NUMBER,
    position VARCHAR2(30),
    hire_date DATE,
    salary NUMBER,
    manager_id NUMBER,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);
/*
employee_id: 従業員ID（主キー）
employee_name: 従業員名
department_id: 部署ID（外部キー）
position: 職位
hire_date: 入社日
salary: 給与
manager_id: 上司の従業員ID（自己参照）
*/

-- 資格取得履歴テーブル (employee_qualifications)
CREATE SEQUENCE seq_employee_qualification_id
  START WITH 1
  INCREMENT BY 1
  NOCACHE;

CREATE TABLE employee_qualifications (
    employee_qualification_id NUMBER PRIMARY KEY,
    employee_id NUMBER NOT NULL,
    qualification_id NUMBER NOT NULL,
    acquire_date DATE,
    expire_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (qualification_id) REFERENCES qualifications(qualification_id)
);
/*
employee_qualification_id: 資格取得履歴ID（主キー）
employee_id: 従業員ID（外部キー）
qualification_id: 資格ID（外部キー）
acquire_date: 取得日
expire_date: 有効期限
*/

-- 評価情報テーブル (evaluations)
CREATE SEQUENCE seq_evaluation_id
  START WITH 1
  INCREMENT BY 1
  NOCACHE;

CREATE TABLE evaluations (
    evaluation_id NUMBER PRIMARY KEY,
    employee_id NUMBER,
    evaluation_date DATE,
    evaluation_score NUMBER,
    evaluator_id NUMBER,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (evaluator_id) REFERENCES employees(employee_id)
);

/*
evaluation_id: 評価ID（主キー）
employee_id: 評価対象の従業員ID（外部キー）
evaluation_date: 評価日
evaluation_score: 評価スコア
evaluator_id: 評価者の従業員ID（外部キー）
*/

