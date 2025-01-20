# itemsテーブル

mypdbにローカル管理ユーザで接続し、以下のクエリを実行して下さい。

:::tip
mypdbには以下のコマンドを使用して接続しましょう

```
# Linuxプロンプトから接続する場合
$ sqlplus mypdb_admin/mypdb_admin@mypdb 
```

```SQL
-- SQLプロンプトから接続する場合
SQL> conn mypdb_admin/mypdb_admin@mypdb 
```

:::


```SQL
CREATE TABLE items (
    item_id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(32),
    type VARCHAR2(32)
);

DECLARE
  v_item_id VARCHAR2(10);
  v_name VARCHAR2(32);
  v_type VARCHAR2(32);
BEGIN

  FOR i IN 1..27999 LOOP
    -- item_idを生成 (例: A0001, B0002, ...)
    v_item_id := CASE 
                   WHEN MOD(i, 3) = 1 THEN 'A'
                   WHEN MOD(i, 3) = 2 THEN 'B'
                   ELSE 'C'
                 END || LPAD(TO_CHAR(i), 4, '0');
    v_name := '商品_' || i;
    v_type := 'カテゴリ_' || i;

    BEGIN
      INSERT INTO items (item_id, name, type) 
      VALUES (v_item_id, v_name, v_type);
    EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('重複するitem_id: ' || v_item_id);
        -- エラー処理 (例: ログ出力、別の値で再試行など)
    END;
  END LOOP;
END;
/
commit;

```
