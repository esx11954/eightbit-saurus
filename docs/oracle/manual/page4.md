# SQL基礎1必要情報

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
CREATE TABLE emp ( 
    empno NUMBER(4),
    ename VARCHAR2(4 CHAR),
    job VARCHAR2(2 CHAR),
    sal NUMBER(6),
    age NUMBER(3),
    deptno NUMBER(4)
);

CREATE TABLE dept (
    deptno NUMBER(4),
    dname VARCHAR2(3 CHAR),
    telno VARCHAR2(10)
);

INSERT INTO emp VALUES(1001, '本山三郎', '営業', 720, 34, 2);
INSERT INTO emp VALUES(1002, '中村次郎', '総務', 720, 29, 2);
INSERT INTO emp VALUES(1003, '山田花子', '総務', 600, 31, 1);
INSERT INTO emp VALUES(1004  '三田海子', '技術', 720, 58, 3);
INSERT INTO emp VALUES(1005, '山本太郎', '技術', 900, 36, 1);
INSERT INTO emp VALUES(1006, '山田一太', '総務', 510, 22, 1);
INSERT INTO dept VALUES(2, '流通部', '0312345678');
INSERT INTO dept VALUES(1, '金融部', '0312345679');
INSERT INTO dept VALUES(3, '公共部', '0312345670');
INSERT INTO dept VALUES(4, '特別部', '0312345677');

commit;

```
