# 研修用PDB及びユーザ作成


## PDB作成
---
Linuxプロンプトから、以下のコマンドでsqlplusにログインします。
```
$ sqlplus / as sysdba
```

以下を順番に実行し、PDBを作成して下さい。

:::info
PDBシードをテンプレートとした**mypdb**という名称のPDBを作成しています。  
ローカル管理ユーザとして、以下のユーザも同時に作成しています。  
- ユーザ名：mypdb_admin  
- パスワード：mypdb_admin
:::

```SQL
SQL> alter session set container=PDB$SEED   -- PDB$SEEDに接続
SQL> select file_name from dba_data_files;    -- PDBシードのデータファイルパス確認
    /*
    出力例 ↓
    /u02/oradata/CDB1/pdbseed/system01.dbf
    /u02/oradata/CDB1/pdbseed/sysaux01.dbf
    /u02/oradata/CDB1/pdbseed/undotbs01.dbf
    */
SQL> conn / as sysdba   -- CDBに接続
SQL> !mkdir /u02/oradata/CDB1/mypdb -- 新たに作成するmypdbのデータディレクトリ作成
-- PDB作成
SQL> create pluggable database mypdb admin user mypdb_admin identified by mypdb_admin ROLES=(DBA)
    file_name_convert = (
        '/u02/oradata/CDB1/pdbseed/', 
        '/u02/oradata/CDB1/mypdb/'
    );

```


## 作成したPDBをOPEN状態に移行
---
作成した直後のPDBはMOUNTED状態で管理者以外は接続できません。  
一般ユーザーに接続を許可するにはOPEN状態に移行する必要があります。  
ALTER PLUGGABLE DATABASE 文を実行します。

まずは以下のクエリで作成したPDBの状態を確認しましょう。
```SQL
SQL> SELECT CON_ID, NAME, OPEN_MODE FROM V$PDBS;
```

以下のクエリでmypdbをOPEN状態に移行します。
```SQL
SQL> alter pluggable database mypdb open;
```

上記が完了したら、再度PDBの状態を確認して `OPEN_MODE` 列の値が  
`READ WRITE` に変更されていることを確認しましょう。


## ローカル管理ユーザによる接続
---
PDBの操作を実施する場合は、CDB操作に使用する**共通ユーザー**ではなく、  
先ほど作成した**ローカル管理ユーザ**を使用します。

そのために準備が必要なため、以下の手順を実施して下さい。


linuxプロンプトに戻り、tnsnames.oraファイルを作成

```SQL
SQL> exit;
```

リスナー経由で接続するために必要な `tnsnames.ora` を作成します。  
リスナーについての詳しい説明は以下の記事を参照して下さい。

- [リスナー](../reading/page9.md)

```
$ vi /u01/app/oracle/product/19.0.0/dbhome_1/network/admin/tnsnames.ora
```
以下を追記し、保存します。
```
MYPDB=
    (DESCRIPTION =
        (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
            (CONNECT_DATA =
                (SERVICE_NAME = mypdb)
        )
    )
```

上記が完了したらリスナーを起動します。
```
$ lsnrctl start
```

起動が完了したら、念の為以下のコマンドで起動確認しましょう。
```
$ lsnrctl status | grep pdb
```

上記が完了したら以下のコマンドで作成したPDBに、ローカル管理ユーザで接続してみましょう。
```
$ sqlplus mypdb_admin/mypdb_admin@mypdb 
```
