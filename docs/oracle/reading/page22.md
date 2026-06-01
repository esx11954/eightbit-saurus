---
sidebar_position: 22
---

# シーケンス

## シーケンスとは

**シーケンス**とは、一意な連番を自動生成するためのオブジェクトです。  
テーブルの主キーに連番を割り当てる用途でよく使用されます。

OracleDBではシーケンスはテーブルとは独立したオブジェクトとして管理されます。  
複数のテーブルから同じシーケンスを共有することも可能です。

---

## シーケンスの作成

```sql
CREATE SEQUENCE シーケンス名
    START WITH 開始値
    INCREMENT BY 増分値
    MAXVALUE 最大値
    MINVALUE 最小値
    CYCLE | NOCYCLE
    CACHE キャッシュ数 | NOCACHE;
```

| オプション | 説明 | デフォルト |
|---|---|---|
| `START WITH` | 最初に生成する値 | 1 |
| `INCREMENT BY` | 増分（負の値で減少も可） | 1 |
| `MAXVALUE` | 最大値 | 10^27 |
| `MINVALUE` | 最小値 | 1 |
| `CYCLE` | 最大値到達後に最小値へ戻る | NOCYCLE |
| `CACHE` | メモリにキャッシュする値の数（高速化） | 20 |

```sql
-- order_id用のシーケンスを作成する（1から1ずつ増加）
CREATE SEQUENCE order_seq
    START WITH 1
    INCREMENT BY 1
    NOCYCLE;
```

---

## シーケンスの使用

シーケンスは以下の2つの疑似列でアクセスします。

| 疑似列 | 説明 |
|---|---|
| `シーケンス名.NEXTVAL` | 次の値を取得する（値が進む） |
| `シーケンス名.CURRVAL` | 現在の値を取得する（値は進まない） |

```sql
-- シーケンスを使ってordersにデータを挿入する
INSERT INTO orders (order_id, name, num) VALUES (order_seq.NEXTVAL, '商品A', 3);
INSERT INTO orders (order_id, name, num) VALUES (order_seq.NEXTVAL, '商品B', 1);
INSERT INTO orders (order_id, name, num) VALUES (order_seq.NEXTVAL, '商品C', 5);

COMMIT;

SELECT * FROM orders;
```

| ORDER_ID | NAME | NUM |
|---|---|---|
| 1 | 商品A | 3 |
| 2 | 商品B | 1 |
| 3 | 商品C | 5 |

```sql
-- 現在の値を確認する（NEXTVALを1度以上呼び出した後に使用可能）
SELECT order_seq.CURRVAL FROM dual;
```

:::caution
`CURRVAL` は同一セッション内で `NEXTVAL` を少なくとも1回呼び出した後でないと参照できません。
:::

---

## シーケンスの確認

作成済みのシーケンスはデータディクショナリビューで確認できます。

```sql
SELECT sequence_name, min_value, max_value, increment_by, last_number
FROM user_sequences;
```

---

## シーケンスの変更

`ALTER SEQUENCE` で既存のシーケンスの設定を変更できます。  
ただし `START WITH` は変更できません。

```sql
-- 増分値を10に変更する
ALTER SEQUENCE order_seq INCREMENT BY 10;
```

---

## シーケンスの削除

```sql
DROP SEQUENCE order_seq;
```

---

## シーケンスの注意点

### 番号の欠番が発生する

以下のような場合に取得した番号が使われず、欠番が発生することがあります。

- `NEXTVAL` を取得した後にROLLBACKした場合
- `CACHE` オプションでキャッシュした値がDBの再起動時に失われた場合

```sql
-- NEXTVALを取得後にROLLBACKしても番号は戻らない
INSERT INTO orders VALUES (order_seq.NEXTVAL, '商品D', 2);
ROLLBACK;
-- 次のNEXTVALは欠番の次の値になる
```

:::tip
シーケンスの欠番はOracleの仕様です。  
主キーの連番に「抜け」が生じても動作上の問題はありません。  
業務上で連番が必須の場合は別途管理する仕組みが必要です。
:::

### 複数セッションでの並列実行

シーケンスは複数のセッションが同時にアクセスしても一意な値を返します。  
INSERT処理を並列で実行する際に主キーの重複を気にする必要がありません。
