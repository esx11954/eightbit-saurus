# teamテーブル

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
CREATE SEQUENCE team_seq START WITH 10 INCREMENT BY 10;

CREATE TABLE team (
    TNO NUMBER(4) PRIMARY KEY,
    TNAME VARCHAR2(32),
    LOC VARCHAR2(32)
);

INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Blue Sharks', 'Miami');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Red Dragons', 'Seoul');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Silver Hawks', 'London');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Golden Eagles', 'New York');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Black Panthers', 'Berlin');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'White Wolves', 'Moscow');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Green Giants', 'Tokyo');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Purple Tigers', 'Paris');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Orange Lions', 'Rome');
INSERT INTO team (TNO, TNAME, LOC) VALUES (team_seq.NEXTVAL, 'Brown Bears', 'Sydney');

commit;

```
