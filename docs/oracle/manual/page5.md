# 課題用サンプルデータ

exampdbにローカル管理ユーザで接続し、以下のクエリを実行して下さい。

:::tip
exampdbには以下のコマンドを使用して接続しましょう

```
# Linuxプロンプトから接続する場合
$ sqlplus exampdb_admin/exampdb_admin@exampdb 
```

```SQL
-- SQLプロンプトから接続する場合
SQL> conn exampdb_admin/exampdb_admin@exampdb 
```

:::

以下のリンクからファイルをダウンロードし、`Ctrl` + `a` で全選択してコピーし、  
teratermに貼り付けてください。


- [課題用SQLファイル1](../files/create_table_for_exam.sql)  
テーブルを5つ作成するクエリです。  
実行することで以下のテーブルが作成されます。  
    |テーブル名|説明|
    |---|---|
    |departments|部署情報のマスタテーブル|
    |qualifications|資格情報のマスタテーブル|
    |employees|従業員情報が格納されているテーブル|
    |employee_qualifications|従業員の資格取得情報が格納されているテーブル|
    |evaluations|従業員に対する評価情報が格納されているテーブル|


- [課題用SQLファイル2](../files/insert_query_for_exam.sql)  
各テーブルにサンプルデータを挿入するクエリです。  
実行中にエラーが発生した場合は講師までお声がけ下さい。