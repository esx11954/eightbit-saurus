---
sidebar_position: 22
title: "補足資料"
---

# 補足資料

演習中によく使うコマンドや関数の早見表です。

---

## psqlメタコマンド早見表

| コマンド | 説明 |
| :--- | :--- |
| `\l` | データベース一覧 |
| `\c データベース名` | データベースに接続 |
| `\dt` | テーブル一覧 |
| `\d テーブル名` | テーブル定義の確認 |
| `\di` | インデックス一覧 |
| `\dv` | ビュー一覧 |
| `\df` | 関数一覧 |
| `\du` | ロール一覧 |
| `\dp テーブル名` | テーブルの権限一覧 |
| `\dn` | スキーマ一覧 |
| `\timing` | クエリ実行時間の表示ON/OFF |
| `\x` | 結果の縦表示ON/OFF |
| `\i ファイルパス` | SQLファイルの実行 |
| `\q` | psqlの終了 |

---

## よく使う組み込み関数

### 文字列関数

| 関数 | 説明 | 例 |
| :--- | :--- | :--- |
| `LENGTH(str)` | 文字列の長さ | `LENGTH('abc')` → 3 |
| `UPPER(str)` | 大文字化 | `UPPER('abc')` → `'ABC'` |
| `LOWER(str)` | 小文字化 | `LOWER('ABC')` → `'abc'` |
| `TRIM(str)` | 前後の空白除去 | `TRIM('  abc  ')` → `'abc'` |
| `SUBSTRING(str, start, len)` | 部分文字列 | `SUBSTRING('abcdef', 2, 3)` → `'bcd'` |
| `REPLACE(str, from, to)` | 文字列置換 | `REPLACE('abc', 'b', 'X')` → `'aXc'` |
| `CONCAT(str1, str2, ...)` | 文字列結合 | `CONCAT('a', 'b')` → `'ab'` |
| `str1 \|\| str2` | 文字列結合（演算子） | `'a' \|\| 'b'` → `'ab'` |
| `SPLIT_PART(str, delim, n)` | 区切り文字でn番目を取得 | `SPLIT_PART('a,b,c', ',', 2)` → `'b'` |

### 数値関数

| 関数 | 説明 | 例 |
| :--- | :--- | :--- |
| `ROUND(n, d)` | 四捨五入（d桁） | `ROUND(3.456, 1)` → 3.5 |
| `CEIL(n)` | 切り上げ | `CEIL(3.1)` → 4 |
| `FLOOR(n)` | 切り下げ | `FLOOR(3.9)` → 3 |
| `TRUNC(n, d)` | 切り捨て（d桁） | `TRUNC(3.456, 1)` → 3.4 |
| `ABS(n)` | 絶対値 | `ABS(-5)` → 5 |
| `MOD(n, m)` | 余り | `MOD(10, 3)` → 1 |
| `POWER(n, e)` | べき乗 | `POWER(2, 10)` → 1024 |

### 日付・時刻関数

| 関数 | 説明 | 例 |
| :--- | :--- | :--- |
| `NOW()` | 現在の日時（TZ付き） | `2024-01-15 10:30:00+09` |
| `CURRENT_DATE` | 現在の日付 | `2024-01-15` |
| `CURRENT_TIME` | 現在の時刻 | `10:30:00+09` |
| `EXTRACT(field FROM d)` | 日時の一部を取得 | `EXTRACT(YEAR FROM NOW())` → 2024 |
| `DATE_TRUNC('month', d)` | 指定単位で切り捨て | `DATE_TRUNC('month', '2024-01-15')` → `2024-01-01` |
| `AGE(d1, d2)` | 2つの日時の差 | `AGE('2024-01-01', '2020-04-01')` → `3 years 8 mons 31 days` |
| `d + INTERVAL 'n unit'` | 日時の加算 | `NOW() + INTERVAL '1 month'` |

### NULL関連関数

| 関数 | 説明 | 例 |
| :--- | :--- | :--- |
| `COALESCE(v1, v2, ...)` | 最初のNULL以外の値 | `COALESCE(NULL, 0)` → 0 |
| `NULLIF(v1, v2)` | v1=v2のときNULLを返す | `NULLIF(0, 0)` → NULL |
| `IS NULL` | NULLかどうか | `dept_id IS NULL` |
| `IS NOT NULL` | NULLでないかどうか | `dept_id IS NOT NULL` |

---

## 型変換

```sql
-- キャスト演算子（::）
SELECT '123'::INTEGER;          -- 文字列 → 整数
SELECT 3.14::TEXT;              -- 数値 → 文字列
SELECT '2024-01-01'::DATE;      -- 文字列 → 日付

-- CAST関数
SELECT CAST('123' AS INTEGER);
```

---

## generate_series（連番生成）

テスト用の大量データ生成によく使います。

```sql
-- 1〜10の連番
SELECT * FROM generate_series(1, 10);

-- 日付の連番（2024年の全日付）
SELECT * FROM generate_series(
    '2024-01-01'::DATE,
    '2024-12-31'::DATE,
    INTERVAL '1 day'
);

-- 大量データの挿入
INSERT INTO employees (emp_name, dept_id, salary, hired_at)
SELECT
    '社員_' || i,
    (i % 3) + 1,
    300000 + (i % 200) * 1000,
    '2020-01-01'::DATE + (i % 365)
FROM generate_series(1, 1000) AS i;
```

---

## トランザクションのベストプラクティス

```sql
-- パターン1: 基本形
BEGIN;
-- ... 処理 ...
COMMIT;  -- または ROLLBACK;

-- パターン2: エラーが起きたら自動でROLLBACK（PL/pgSQL）
DO $$
BEGIN
    -- ... 処理 ...
EXCEPTION
    WHEN OTHERS THEN
        RAISE;  -- エラーを再発生（暗黙的にROLLBACK）
END;
$$ LANGUAGE plpgsql;
```

---

## EXPLAIN ANALYZEの読み方

```
Seq Scan on employees  (cost=0.00..1.07 rows=7 width=72) (actual time=0.015..0.019 rows=7 loops=1)
│                       ├─推定コスト（起動..合計）  ├─推定行数          ├─実際の時間（ms）  ├─実際の行数
│                       └─推定コスト              └─推定幅(bytes)
└─スキャン方式とテーブル名

Planning Time: 0.1 ms    ← クエリ解析・プラン作成時間
Execution Time: 0.1 ms   ← 実際の実行時間
```

**注目ポイント:**
- `rows=` の推定と `actual rows=` の実際値が大きくかけ離れている → 統計情報が古い（`ANALYZE` を実行）
- `Seq Scan` になっている → インデックスがない or クエリプランナーがインデックスを使わない判断をした
- `loops=` が大きい → ネストループJOINが繰り返されている（結合方法の見直しが必要かも）
