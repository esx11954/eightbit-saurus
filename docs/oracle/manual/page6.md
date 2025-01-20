# accountテーブル

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
CREATE SEQUENCE account_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE account (
    ID NUMBER(4) PRIMARY KEY,
    TOTAL NUMBER(10)
);

INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 1000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 2000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 3000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 4000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 5000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 6000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 7000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 8000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 9000);
INSERT INTO account (ID, TOTAL) VALUES (account_seq.NEXTVAL, 10000);
commit;

```
