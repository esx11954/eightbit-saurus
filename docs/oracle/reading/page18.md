---
sidebar_position: 18
---

# トランザクション

## トランザクションとは

**トランザクション**とは、データベースに対する一連の操作をひとまとまりとして扱う仕組みです。  
「全て成功」か「全て失敗（元に戻す）」のどちらかになることを保証します。

銀行の送金を例に考えると、「口座Aから引き落とす」「口座Bへ入金する」という2つの操作は、  
どちらか一方だけ成功することがあってはなりません。このような処理をトランザクションで管理します。

---

## ACID特性

トランザクションが保証すべき4つの性質を **ACID特性** と呼びます。

| 特性 | 名称 | 説明 |
|---|---|---|
| A | 原子性（Atomicity） | 一連の操作は全て実行されるか、全て実行されないかのどちらかになる |
| C | 一貫性（Consistency） | トランザクションの前後でデータの整合性が保たれる |
| I | 独立性（Isolation） | 複数のトランザクションが同時実行されても互いに影響しない |
| D | 永続性（Durability） | コミットされたデータは障害が発生しても失われない |

---

## COMMIT：変更の確定

`COMMIT` を実行すると、それまでのDML操作（INSERT / UPDATE / DELETE）が**確定**され、  
他のユーザからも変更後のデータが見えるようになります。

```sql
-- ID=1の残高を500減らす
UPDATE account SET total = total - 500 WHERE id = 1;

-- ID=2の残高を500増やす
UPDATE account SET total = total + 500 WHERE id = 2;

-- 変更を確定する
COMMIT;
```

---

## ROLLBACK：変更の取り消し

`ROLLBACK` を実行すると、最後の `COMMIT` 以降に行ったDML操作が**全て取り消され**、  
データが元の状態に戻ります。

```sql
-- 誤った金額で更新してしまった場合
UPDATE account SET total = 0 WHERE id = 1;

-- COMMITする前であれば取り消せる
ROLLBACK;
```

:::caution
`COMMIT` 後は `ROLLBACK` で取り消すことができません。  
DML操作の内容を確認してから `COMMIT` する習慣をつけましょう。
:::

---

## SAVEPOINT：途中の保存

`SAVEPOINT` を使用すると、トランザクション内に**中間ポイント**を設定できます。  
`ROLLBACK TO セーブポイント名` で、そのポイントまで部分的に取り消すことができます。

```sql
-- 最初の更新
UPDATE account SET total = total - 500 WHERE id = 1;

-- セーブポイントを設定
SAVEPOINT sp1;

-- 2つ目の更新
UPDATE account SET total = total + 500 WHERE id = 2;

-- セーブポイントまで取り消す（1つ目の更新は残る）
ROLLBACK TO sp1;

-- 1つ目の更新のみをコミットする
COMMIT;
```

---

## ロック

トランザクションの独立性を保つため、OracleDBはDML操作を行うと対象行に**ロック**をかけます。  
ロックがかかった行は、他のトランザクションが変更できなくなります。

```
セッション1                          セッション2
    |                                    |
UPDATE account SET total=0 WHERE id=1;  |
    |（ロック取得）                       |
    |                   UPDATE account SET total=0 WHERE id=1;
    |                                    |（待機中...）
COMMIT;                                  |
    |（ロック解放）                       |
    |                                    |（実行再開）
```

:::tip
長時間 `COMMIT` または `ROLLBACK` を行わないと、他のセッションが待ち続ける原因になります。  
DML操作後は速やかにトランザクションを終了させましょう。
:::

---

## DDLの自動コミット

OracleDBでは `CREATE` / `DROP` / `ALTER` などの**DDL文を実行すると自動的にCOMMITが発行**されます。  
これにより、DDL実行前のDML操作も一緒にコミットされる点に注意が必要です。

```sql
UPDATE account SET total = 0 WHERE id = 1;

-- この時点でUPDATEも一緒にCOMMITされる
CREATE TABLE test_table (id NUMBER);

-- ROLLBACKしてもUPDATEは取り消せない
ROLLBACK;
```

:::caution
意図しないコミットを防ぐため、DDLの実行前後にトランザクションの状態を意識しましょう。
:::
