# ordersテーブル

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
CREATE TABLE orders (
    order_id NUMBER(4) PRIMARY KEY,
    name VARCHAR2(32),
    num NUMBER(4)
);

commit;

```
