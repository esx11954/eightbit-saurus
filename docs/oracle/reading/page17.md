---
sidebar_position: 17
---

# SQL基礎3 - 副問合せ・結合

---

## 副問合せ（サブクエリ）

SQL文の中に別のSELECT文を埋め込んだものを**副問合せ（サブクエリ）**と呼びます。  
`WHERE` 句や `FROM` 句などで使用できます。

### WHERE句でのサブクエリ

```sql
-- 山本太郎と同じ部署に所属する従業員を取得する
SELECT empno, ename, deptno
FROM emp
WHERE deptno = (
    SELECT deptno FROM emp WHERE ename = '山本太郎'
);
```

| EMPNO | ENAME | DEPTNO |
|---|---|---|
| 1003 | 山田花子 | 1 |
| 1005 | 山本太郎 | 1 |
| 1006 | 山田一太 | 1 |

サブクエリが複数行を返す場合は `=` ではなく `IN` を使用します。

```sql
-- 給与が600以上の従業員が所属する部署名を取得する
SELECT deptno, dname
FROM dept
WHERE deptno IN (
    SELECT deptno FROM emp WHERE sal >= 600
);
```

### FROM句でのサブクエリ（インラインビュー）

`FROM` 句にサブクエリを記述することで、一時的なテーブルとして扱うことができます。

```sql
-- 部署ごとの平均給与を求め、さらに平均給与が700以上のものを取得する
SELECT deptno, avg_sal
FROM (
    SELECT deptno, AVG(sal) AS avg_sal
    FROM emp
    GROUP BY deptno
)
WHERE avg_sal >= 700;
```

---

## テーブルの結合

複数のテーブルを関連する列をキーにして横に連結することを**結合**と呼びます。

### INNER JOIN（内部結合）

両方のテーブルに一致する行のみを取得します。

```sql
SELECT e.empno, e.ename, d.dname
FROM emp e
INNER JOIN dept d ON e.deptno = d.deptno;
```

| EMPNO | ENAME | DNAME |
|---|---|---|
| 1001 | 本山三郎 | 流通部 |
| 1002 | 中村次郎 | 流通部 |
| 1003 | 山田花子 | 金融部 |
| 1004 | 三田海子 | 公共部 |
| 1005 | 山本太郎 | 金融部 |
| 1006 | 山田一太 | 金融部 |

:::tip
テーブル名の後ろに `e` や `d` のように別名（テーブルエイリアス）を付けると、列の参照を短く書けます。
:::

### LEFT OUTER JOIN（左外部結合）

左テーブルの全行を取得し、右テーブルに一致する行がない場合はNULLで補完します。

```sql
-- empに一致するdeptnがないdept行も含めて取得する
SELECT d.deptno, d.dname, e.ename
FROM dept d
LEFT OUTER JOIN emp e ON d.deptno = e.deptno;
```

| DEPTNO | DNAME | ENAME |
|---|---|---|
| 2 | 流通部 | 本山三郎 |
| 2 | 流通部 | 中村次郎 |
| 1 | 金融部 | 山田花子 |
| 1 | 金融部 | 山本太郎 |
| 1 | 金融部 | 山田一太 |
| 3 | 公共部 | 三田海子 |
| 4 | 特別部 | NULL |

`特別部` は emp テーブルに対応する従業員がいないため、`ename` が NULL になります。

### RIGHT OUTER JOIN（右外部結合）

右テーブルの全行を取得し、左テーブルに一致する行がない場合はNULLで補完します。  
LEFT OUTER JOIN と左右を入れ替えた動作になります。

```sql
SELECT d.deptno, d.dname, e.ename
FROM emp e
RIGHT OUTER JOIN dept d ON e.deptno = d.deptno;
```

---

## Oracle固有の構文

### 外部結合の (+) 演算子

OracleDBには標準SQL（OUTER JOIN）とは異なる、独自の外部結合の記法があります。  
`(+)` を結合条件の**NULLで補完したい側**に付けます。

```sql
-- LEFT OUTER JOIN と同じ結果になる（Oracle固有記法）
SELECT d.deptno, d.dname, e.ename
FROM dept d, emp e
WHERE d.deptno = e.deptno(+);
```

:::caution
`(+)` 記法はOracle固有のため、他のRDBMSでは動作しません。  
現在はANSI標準の `OUTER JOIN` 記法が推奨されています。
:::

### ROWNUM：取得行数の制限

OracleDBでは `ROWNUM` という疑似列を使用して、取得行数を制限できます。  
標準SQLの `LIMIT` 句に相当するOracle固有の機能です。

```sql
-- 給与上位3名を取得する
SELECT empno, ename, sal
FROM (
    SELECT empno, ename, sal FROM emp ORDER BY sal DESC
)
WHERE ROWNUM <= 3;
```

| EMPNO | ENAME | SAL |
|---|---|---|
| 1005 | 山本太郎 | 900 |
| 1001 | 本山三郎 | 720 |
| 1002 | 中村次郎 | 720 |

:::caution
`ROWNUM` はORDER BYの前に採番されるため、ソート後の結果に対して制限をかけるには**インラインビューと組み合わせる**必要があります。

```sql
-- 意図しない結果になる例（ORDER BYの前にROWNUMが採番される）
SELECT empno, ename, sal FROM emp WHERE ROWNUM <= 3 ORDER BY sal DESC;
```
:::

:::tip
Oracle 12c以降では、標準SQLに近い `FETCH FIRST` 構文も使用できます。

```sql
SELECT empno, ename, sal
FROM emp
ORDER BY sal DESC
FETCH FIRST 3 ROWS ONLY;
```
:::

### DUAL表

`DUAL` はOracleが提供する1行1列のダミーテーブルです。  
特定のテーブルを参照せずに式や関数の結果を確認したいときに使用します。

```sql
-- 現在日時を取得する
SELECT SYSDATE FROM dual;

-- 計算結果を確認する
SELECT 100 * 1.08 FROM dual;
```
