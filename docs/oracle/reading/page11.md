---
sidebar_position: 12
---

# 標準SQLとOracle SQLの違い

## はじめに

SQLはデータベースを操作するための標準的な言語として広く使用されています。  
しかし、実際には各データベース製品で独自の拡張や仕様の違いがあります。  
この章では、標準SQLとOracle SQLの主な違いについて学び、実務での注意点を理解していきます。

## 1. 基本的な違い

### データ型の違い

標準SQL | Oracle SQL | 説明
---------|----------|---------
INTEGER | NUMBER | 整数値を扱う型
DECIMAL | NUMBER | 小数を扱う型
VARCHAR | VARCHAR2 | 可変長文字列型
DATETIME | DATE | 日付時刻型

**注意点**
- Oracleでは、VARCHARよりもVARCHAR2の使用が推奨されています
- DATEはタイムゾーン情報を持たない点に注意が必要です
- NUMBERは整数も小数も扱える柔軟な型です

### NULLの扱い

標準SQLでは「IS NULL」 「IS NOT NULL」を使用しますが、Oracleではこれに加えて「NVL関数」が頻繁に使用されます。

```sql
-- 標準SQL
COALESCE(column_name, 'default_value')

-- Oracle SQL
NVL(column_name, 'default_value')
```

## 2. 日付・時刻の処理

### 日付形式

標準SQLでは日付リテラルの形式が厳密に定められていますが、Oracleでは様々な形式をサポートしています。

```sql
-- 標準SQL
DATE '2024-01-16'

-- Oracle SQL
DATE '2024-01-16'
TO_DATE('2024/01/16', 'YYYY/MM/DD')
TO_DATE('16-01-2024', 'DD-MM-YYYY')
```

### 日付の演算

```sql
-- 標準SQL
DATE '2024-01-16' + INTERVAL '1' DAY

-- Oracle SQL
DATE '2024-01-16' + 1
ADD_MONTHS(DATE '2024-01-16', 1)
```

## 3. ページネーション処理

### 検索結果の制限

標準SQLとOracleでは検索結果を制限する方法が異なります。

```sql
-- 標準SQL
SELECT column_name
FROM table_name
LIMIT 10 OFFSET 20

-- Oracle SQL（12c未満）
SELECT column_name
FROM (
    SELECT a.*, ROWNUM rnum
    FROM (
        SELECT column_name
        FROM table_name
        ORDER BY column_name
    ) a
    WHERE ROWNUM <= 30
)
WHERE rnum > 20

-- Oracle SQL（12c以降）
SELECT column_name
FROM table_name
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY
```

## 4. 外部結合の記述方法

### 古い記法と新しい記法

```sql
-- 標準SQL（新しい記法）
SELECT e.employee_name, d.department_name
FROM employees e
LEFT OUTER JOIN departments d
ON e.department_id = d.department_id

-- Oracle SQL（古い記法、非推奨）
SELECT e.employee_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id (+)
```

**注意点**
- 古い記法（(+)演算子）は非推奨です
- 標準SQLの記法（LEFT OUTER JOIN等）の使用を推奨します

## 5. シーケンス処理

### 自動採番の実装

```sql
-- 標準SQL
CREATE SEQUENCE sequence_name
START WITH 1
INCREMENT BY 1;

-- 次の値の取得（標準SQL）
NEXT VALUE FOR sequence_name

-- Oracle SQL
CREATE SEQUENCE sequence_name
START WITH 1
INCREMENT BY 1;

-- 次の値の取得（Oracle）
sequence_name.NEXTVAL
```

## 6. Oracle特有の便利な機能

### DECODE関数
条件分岐を簡潔に記述できるOracle独自の関数です。

```sql
-- Oracle SQL
SELECT DECODE(column_name,
    'A', 'Value is A',
    'B', 'Value is B',
    'Other value') as result
FROM table_name;

-- 標準SQL（CASE式）
SELECT CASE column_name
    WHEN 'A' THEN 'Value is A'
    WHEN 'B' THEN 'Value is B'
    ELSE 'Other value'
END as result
FROM table_name;
```

### DUAL表
単一の値を取得する際に使用する特殊な表です。

```sql
-- Oracle SQL
SELECT SYSDATE FROM DUAL;

-- 標準SQL
SELECT CURRENT_DATE;
```

## 7. 実務での注意点

### 移植性を考慮したコーディング

1. 標準SQLを基本とする
- できるだけ標準SQLの記法を使用
- Oracle固有の機能は必要な場合のみ使用

2. 代替手段の確認
- Oracle固有の機能を使用する場合は、標準SQLでの代替手段を確認
- 必要に応じてコメントで代替手段を記録

3. データ型の選択
- 可能な限り標準的なデータ型を選択
- Oracle固有のデータ型使用時は理由を明確に

### パフォーマンスへの配慮

1. インデックスの活用
- 標準SQLとOracleで実行計画が異なる可能性
- 必要に応じてヒントを使用

2. 結合方法の選択
- NESTEDループ、HASH結合、MERGE結合の特性を理解
- データ量に応じた適切な結合方法の選択

## まとめ

1. Oracle SQLは標準SQLの機能を包含しつつ、独自の拡張機能を提供しています。

2. 実務では以下の点に注意が必要です：
   - 移植性を考慮したSQL作成
   - Oracle固有機能の適切な使用
   - パフォーマンスへの配慮

3. 今後の学習ポイント：
   - 標準SQLの基本をしっかり理解する
   - Oracle固有の便利な機能を適材適所で活用する
   - 実行計画を意識したSQL作成を心がける