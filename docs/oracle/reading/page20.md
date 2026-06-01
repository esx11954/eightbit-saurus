---
sidebar_position: 20
---

# ビュー

## ビューとは

**ビュー**とは、SELECT文を元に定義した仮想的なテーブルです。  
実データを持たず、参照するたびに元のSELECT文が実行されます。

よく使うクエリに名前を付けて保存しておくイメージです。  
複雑なJOINや条件をビューとして定義しておくことで、呼び出し側のSQLをシンプルに保てます。

---

## ビューの作成

```sql
CREATE VIEW ビュー名 AS
SELECT文;
```

```sql
-- emp と dept を結合した従業員情報ビューを作成する
CREATE VIEW v_emp_dept AS
SELECT e.empno, e.ename, e.job, e.sal, d.dname
FROM emp e
INNER JOIN dept d ON e.deptno = d.deptno;
```

作成後はテーブルと同じように参照できます。

```sql
SELECT * FROM v_emp_dept;
```

| EMPNO | ENAME | JOB | SAL | DNAME |
|---|---|---|---|---|
| 1001 | 本山三郎 | 営業 | 720 | 流通部 |
| 1002 | 中村次郎 | 総務 | 720 | 流通部 |
| 1003 | 山田花子 | 総務 | 600 | 金融部 |
| 1004 | 三田海子 | 技術 | 720 | 公共部 |
| 1005 | 山本太郎 | 技術 | 900 | 金融部 |
| 1006 | 山田一太 | 総務 | 510 | 金融部 |

ビューに対してもWHERE句などを使った絞り込みが可能です。

```sql
SELECT * FROM v_emp_dept WHERE job = '総務';
```

---

## ビューの確認

作成済みのビューはデータディクショナリビューで確認できます。

```sql
-- 自分が作成したビューの一覧を確認する
SELECT view_name, text FROM user_views;
```

---

## ビューの削除

```sql
DROP VIEW ビュー名;
```

```sql
DROP VIEW v_emp_dept;
```

---

## ビューの主なメリット

| メリット | 説明 |
|---|---|
| クエリの簡略化 | 複雑なJOINや集計を毎回書かずに済む |
| セキュリティ | 特定の列・行だけを公開し、元テーブルへのアクセスを制限できる |
| 保守性の向上 | ロジックをビューに集約することで変更箇所を一箇所にまとめられる |

---

## ビューへのDML操作

条件を満たす場合、ビューに対してINSERT / UPDATE / DELETEを実行することができます。  
ビューへの変更は元テーブルに反映されます。

```sql
-- ビューを通じて給与を更新する
UPDATE v_emp_dept SET sal = 800 WHERE empno = 1003;
```

ただし、以下のようなビューはDML操作ができません。

| DML不可となる条件 |
|---|
| GROUP BY / HAVING / DISTINCT を含む |
| 集計関数（SUM / COUNT等）を含む |
| 複数テーブルのJOINを含む |
| 擬似列（ROWNUM等）を含む |

---

## WITH CHECK OPTION

`WITH CHECK OPTION` を付けると、ビューの定義条件を満たさないDML操作を禁止できます。

```sql
-- 給与が700以上の従業員のみを対象とするビュー
CREATE VIEW v_high_sal AS
SELECT empno, ename, sal FROM emp WHERE sal >= 700
WITH CHECK OPTION;
```

```sql
-- salを600に下げようとするとエラーになる（条件sal >= 700を満たさないため）
UPDATE v_high_sal SET sal = 600 WHERE empno = 1001;
```

---

## OR REPLACE：ビューの再作成

既存のビューを定義ごと上書きしたい場合は `OR REPLACE` を使用します。  
一度 `DROP` してから `CREATE` し直す手間を省けます。

```sql
CREATE OR REPLACE VIEW v_emp_dept AS
SELECT e.empno, e.ename, e.job, e.sal, e.age, d.dname
FROM emp e
INNER JOIN dept d ON e.deptno = d.deptno;
```
