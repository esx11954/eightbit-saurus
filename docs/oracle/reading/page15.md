---
sidebar_position: 15
---

# SQL基礎1 - 条件抽出

`WHERE` 句で使用できる演算子を習得することで、必要なデータを柔軟に絞り込むことができます。

---

## 比較演算子

数値や文字列、日付を比較する際に使用します。

| 演算子 | 意味 |
|---|---|
| `=` | 等しい |
| `<>` または `!=` | 等しくない |
| `<` | より小さい |
| `>` | より大きい |
| `<=` | 以下 |
| `>=` | 以上 |

```sql
-- 年齢が30以上の従業員を取得する
SELECT empno, ename, age FROM emp WHERE age >= 30;
```

| EMPNO | ENAME | AGE |
|---|---|---|
| 1001 | 本山三郎 | 34 |
| 1003 | 山田花子 | 31 |
| 1004 | 三田海子 | 58 |
| 1005 | 山本太郎 | 36 |

```sql
-- 職種が「総務」以外の従業員を取得する
SELECT empno, ename, job FROM emp WHERE job <> '総務';
```

| EMPNO | ENAME | JOB |
|---|---|---|
| 1001 | 本山三郎 | 営業 |
| 1004 | 三田海子 | 技術 |
| 1005 | 山本太郎 | 技術 |

---

## BETWEEN：範囲指定

`BETWEEN 下限値 AND 上限値` の形式で、指定した範囲内の値を抽出します。  
下限・上限の値も範囲に**含まれます**。

```sql
-- 給与が600以上720以下の従業員を取得する
SELECT empno, ename, sal FROM emp WHERE sal BETWEEN 600 AND 720;
```

| EMPNO | ENAME | SAL |
|---|---|---|
| 1001 | 本山三郎 | 720 |
| 1002 | 中村次郎 | 720 |
| 1003 | 山田花子 | 600 |
| 1004 | 三田海子 | 720 |

:::tip
`NOT BETWEEN` を使用すると範囲外を抽出できます。

```sql
SELECT empno, ename, sal FROM emp WHERE sal NOT BETWEEN 600 AND 720;
```
:::

---

## IN：リスト指定

`IN (値1, 値2, ...)` の形式で、リスト内のいずれかに一致する値を抽出します。

```sql
-- 部署番号が1または3の従業員を取得する
SELECT empno, ename, deptno FROM emp WHERE deptno IN (1, 3);
```

| EMPNO | ENAME | DEPTNO |
|---|---|---|
| 1003 | 山田花子 | 1 |
| 1005 | 山本太郎 | 1 |
| 1006 | 山田一太 | 1 |
| 1004 | 三田海子 | 3 |

:::tip
`NOT IN` を使用するとリスト外を抽出できます。

```sql
SELECT empno, ename, deptno FROM emp WHERE deptno NOT IN (1, 3);
```
:::

---

## LIKE：パターン一致

文字列の部分一致検索に使用します。  
ワイルドカードとして以下の2種類を使用できます。

| ワイルドカード | 意味 |
|---|---|
| `%` | 0文字以上の任意の文字列 |
| `_` | 任意の1文字 |

```sql
-- 氏名が「山」から始まる従業員を取得する
SELECT empno, ename FROM emp WHERE ename LIKE '山%';
```

| EMPNO | ENAME |
|---|---|
| 1003 | 山田花子 |
| 1005 | 山本太郎 |
| 1006 | 山田一太 |

```sql
-- 氏名の2文字目が「田」の従業員を取得する
SELECT empno, ename FROM emp WHERE ename LIKE '_田%';
```

| EMPNO | ENAME |
|---|---|
| 1003 | 山田花子 |
| 1006 | 山田一太 |

:::tip
`NOT LIKE` を使用するとパターンに一致しない行を抽出できます。
:::

---

## IS NULL / IS NOT NULL：NULL判定

列の値が `NULL`（未入力・不明）かどうかを判定します。  
NULLは `=` では比較できないため、必ず `IS NULL` または `IS NOT NULL` を使用します。

```sql
-- telnoがNULLの部署を取得する
SELECT deptno, dname FROM dept WHERE telno IS NULL;
```

```sql
-- telnoが登録されている部署を取得する
SELECT deptno, dname FROM dept WHERE telno IS NOT NULL;
```

:::caution
`WHERE telno = NULL` はNULLを正しく判定できません。必ず `IS NULL` を使用しましょう。
:::

---

## 論理演算子：AND / OR / NOT

複数の条件を組み合わせる際に使用します。

| 演算子 | 意味 |
|---|---|
| `AND` | 両方の条件を満たす場合に抽出 |
| `OR` | どちらか一方の条件を満たす場合に抽出 |
| `NOT` | 条件を否定する |

```sql
-- 職種が「総務」かつ給与が600以上の従業員を取得する
SELECT empno, ename, job, sal FROM emp WHERE job = '総務' AND sal >= 600;
```

| EMPNO | ENAME | JOB | SAL |
|---|---|---|---|
| 1002 | 中村次郎 | 総務 | 720 |
| 1003 | 山田花子 | 総務 | 600 |

```sql
-- 職種が「営業」または「技術」の従業員を取得する
SELECT empno, ename, job FROM emp WHERE job = '営業' OR job = '技術';
```

| EMPNO | ENAME | JOB |
|---|---|---|
| 1001 | 本山三郎 | 営業 |
| 1004 | 三田海子 | 技術 |
| 1005 | 山本太郎 | 技術 |

:::caution
### AND と OR の優先順位

`AND` は `OR` より優先して評価されます。意図した条件になるよう、必要に応じて `()` で明示的にグループ化しましょう。

```sql
-- 意図しない結果になる例
WHERE job = '営業' OR job = '技術' AND sal >= 700
-- 上記は以下と同じ意味になる
WHERE job = '営業' OR (job = '技術' AND sal >= 700)

-- 意図した条件に修正する例
WHERE (job = '営業' OR job = '技術') AND sal >= 700
```
:::
