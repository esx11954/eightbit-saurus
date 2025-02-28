---
sidebar_position: 3
---

# OracleDB 指示書 2

## SQL概要
---
環境構築が完了したら、DBに問い合わせをするためのSQL概要について学習します。  
教科書 p.62 ~ p.76を読みましょう。  
途中に出てくるクエリは同じように手元で実行して下さい。  

:::caution
教科書の内容は、mypdbにローカル管理ユーザで接続して作業しましょう。
:::

## SQL基礎1
---
DBに問い合わせをする際に必要不可欠となる、特定のデータ(行)を抽出するための様々な方法を学習します。  
教科書 p.87 ~ p.98を読みましょう。  
実行するために必要な情報は以下を参照して下さい。

- [SQL基礎1必要情報](./manual/page4.md)

上記が完了したら、以下の課題に着手しましょう。

<details>
    <summary>課題</summary>
    <div>

### 課題1
課題で使用するPDBを作成するため、以下のページを参考に環境を作りましょう。

- [研修用PDB及びユーザ作成](./manual/page3.md)  

#### PDB要件  

|PDB名|ローカル管理ユーザ名|パスワード|データディレクトリパス|
|---|---|---|---|
|exampdb|exampdb_admin|exampdb_admin|/u02/oradata/CDB1/exampdb/|


課題用DB作成が完了したら、  
ローカル管理ユーザでexampdbに接続し、サンプルデータを挿入しましょう。

[課題用サンプルデータ](./manual/page5.md)


その後以下の課題に着手して下さい。

- [SQL課題1](./files/課題1.sql)

:::note
ファイルをダウンロードしたらテキストエディタ等で開き、  
問題文の下に作成したクエリを記載して下さい。  
全て完了したら講師にファイルを送って下さい。
:::
</div>
</details>

## SQL基礎2
---
抽出するデータの集計や加工、NULLの扱いについて学習します。  
教科書 p.99 ~ p.118を読みましょう。  

## 標準SQLとOracleSQL
---
ここまで基本的なSQLを学習してきましたが、多くのRDBMS規格で使用可能な標準SQL、OracleDBでしか使用できないOracleSQLが存在します。  
もちろんOracleDBにおいても多くの標準SQLをサポートしていますが、独自のSQLの使用方法を習得することで業務の幅が広がります。  
読み物として以下のページを参照しましょう。

- [標準SQLとOracleSQL](./reading/page11.md)

## SQL基礎3
---
より高度な抽出で用いられる、副問合せや結合について学習します。  
教科書 p.119 ~ p.133を読みましょう。  

上記が完了したら、以下の課題に着手しましょう。

<details>
    <summary>課題</summary>
    <div>
### 課題2
以下の課題に着手して下さい。

- [SQL課題2](./files/課題2.sql)

:::note
ファイルをダウンロードしたらテキストエディタ等で開き、  
問題文の下に作成したクエリを記載して下さい。  
全て完了したら講師にファイルを送って下さい。
:::
</div>
</details>