---
sidebar_position: 16
---

# SQL基礎2 - 集計・関数・NULL

---

## 集計関数

複数の行をまとめて1つの値として集計する関数です。  
`SELECT` 句または `HAVING` 句の中で使用します。

| 関数 | 意味 |
|---|---|
| `COUNT(*)` | 行数を返す（NULL含む） |
| `COUNT(列名)` | 列の値がNULLでない行数を返す |
| `SUM(列名)` | 合計値を返す |
| `AVG(列名)` | 平均値を返す |
| `MAX(列名)` | 最大値を返す |
| `MIN(列名)` | 最小値を返す |

```sql
-- 従業員の総数を取得する
SELECT COUNT(*) FROM emp;
```

| COUNT(*) |
|---|
| 6 |

```sql
-- 給与の合計・平均・最大・最小を取得する
SELECT SUM(sal), AVG(sal), MAX(sal), MIN(sal) FROM emp;
```

| SUM(SAL) | AVG(SAL) | MAX(SAL) | MIN(SAL) |
|---|---|---|---|
| 4170 | 695 | 900 | 510 |

:::caution
`AVG` や `SUM` はNULLを無視して計算します。  
NULLを0として扱いたい場合は `NVL` 関数（後述）を使用しましょう。
:::

---

## GROUP BY：グループ集計

特定の列でデータをグループ化し、グループごとに集計します。

```sql
-- 職種ごとの従業員数と平均給与を取得する
SELECT job, COUNT(*) AS "人数", AVG(sal) AS "平均給与"
FROM emp
GROUP BY job;
```

| JOB | 人数 | 平均給与 |
|---|---|---|
| 営業 | 1 | 720 |
| 総務 | 3 | 610 |
| 技術 | 2 | 810 |

:::caution
`SELECT` 句に集計関数以外の列を記述する場合は、その列を必ず `GROUP BY` にも指定する必要があります。

```sql
-- エラーになる例（job が GROUP BY にない）
SELECT job, ename, COUNT(*) FROM emp GROUP BY job;
```
:::

---

## HAVING：グループへの条件指定

`GROUP BY` でグループ化した結果に対して条件を絞り込む場合は `HAVING` を使用します。  
`WHERE` は集計前の行に対する条件、`HAVING` は集計後のグループに対する条件です。

```sql
-- 平均給与が700以上の職種のみ取得する
SELECT job, AVG(sal) AS "平均給与"
FROM emp
GROUP BY job
HAVING AVG(sal) >= 700;
```

| JOB | 平均給与 |
|---|---|
| 営業 | 720 |
| 技術 | 810 |

---

## SELECT文の実行順序

SQLの句は記述順ではなく以下の順序で評価されます。  
条件を書く位置（WHERE / HAVING）を判断する際の参考にしましょう。

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

---

## NULLの扱い

NULLは「値が存在しない・不明」であることを表します。  
NULLを含む演算の結果は常にNULLになります。

```sql
-- NULLを含む演算はNULLになる
SELECT NULL + 100 FROM dual;  -- 結果: NULL
```

### NVL関数：NULLを別の値に置換する

```sql
NVL(列名, NULLのときに返す値)
```

```sql
-- telnoがNULLの場合は「未登録」として表示する
SELECT deptno, dname, NVL(telno, '未登録') AS "電話番号"
FROM dept;
```

| DEPTNO | DNAME | 電話番号 |
|---|---|---|
| 2 | 流通部 | 0312345678 |
| 1 | 金融部 | 0312345679 |
| 3 | 公共部 | 0312345670 |
| 4 | 特別部 | 未登録 |

### NVL2関数：NULLかどうかで返す値を変える

```sql
NVL2(列名, NULLでないときの値, NULLのときの値)
```

```sql
SELECT deptno, NVL2(telno, '登録済み', '未登録') AS "電話番号状況"
FROM dept;
```

---

## 単一行関数

1行に対して1つの結果を返す関数です。主なものを以下にまとめます。

### 数値関数

| 関数 | 説明 | 例 |
|---|---|---|
| `ROUND(n, 桁)` | 指定桁で四捨五入 | `ROUND(695.5, 0)` → `696` |
| `TRUNC(n, 桁)` | 指定桁で切り捨て | `TRUNC(695.9, 0)` → `695` |
| `MOD(n, m)` | nをmで割った余り | `MOD(10, 3)` → `1` |

```sql
-- 平均給与を小数点以下で四捨五入する
SELECT ROUND(AVG(sal), 0) AS "平均給与" FROM emp;
```

### 文字列関数

| 関数 | 説明 | 例 |
|---|---|---|
| `SUBSTR(文字列, 開始位置, 文字数)` | 文字列を切り出す | `SUBSTR('山田花子', 1, 2)` → `山田` |
| `LENGTH(文字列)` | 文字数を返す | `LENGTH('山田花子')` → `4` |
| `UPPER(文字列)` | 大文字に変換 | `UPPER('abc')` → `ABC` |
| `LOWER(文字列)` | 小文字に変換 | `LOWER('ABC')` → `abc` |
| `TRIM(文字列)` | 前後の空白を除去 | `TRIM(' abc ')` → `abc` |

```sql
-- 氏名の最初の2文字を取得する
SELECT empno, SUBSTR(ename, 1, 2) AS "姓" FROM emp;
```

### CASE式：条件によって返す値を変える

`CASE` 式を使用することで、条件に応じた値を返すことができます。

```sql
SELECT empno, ename, sal,
    CASE
        WHEN sal >= 800 THEN 'A'
        WHEN sal >= 650 THEN 'B'
        ELSE 'C'
    END AS "給与ランク"
FROM emp;
```

| EMPNO | ENAME | SAL | 給与ランク |
|---|---|---|---|
| 1001 | 本山三郎 | 720 | B |
| 1002 | 中村次郎 | 720 | B |
| 1003 | 山田花子 | 600 | C |
| 1004 | 三田海子 | 720 | B |
| 1005 | 山本太郎 | 900 | A |
| 1006 | 山田一太 | 510 | C |
