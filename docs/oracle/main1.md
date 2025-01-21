---
sidebar_position: 2
---

# OracleDB 指示書 1

## 予備知識  

OracleDBを学習する上で必要となる事前知識を以下にまとめています。  
- [RDBMS(Relational DataBase Management System)とは](./reading/page1.md)
- [OracleDatabaseについて](./reading/page2.md)
- [OracleDBの歴史と進化](./reading/page10.md)


## 研修環境(OS)について

本研修では、LinuxOSを使用します。    
以下のページを参考にしてLinuxOSの環境構築を行って下さい。

- [環境構築手順](./manual/page1.md)

## Linux演習

LinuxOSの操作方法を学習します。  
環境構築が完了したらハンズオン形式で演習を行うので、講師までお声がけをお願いします。  

:::tip
### Linuxリファレンス
- [SSH接続手順](./manual/page2.md)
- [Linuxとは](./reading/page6.md)
- [Linux上におけるDB操作](./reading/page7.md)
:::

## 研修環境(DB)について

本研修では、Virtualbox上に構築したLinuxOS上に、OracleDatabase 19cをインストールして使用します。  
以下のファイル内「手順」シートを参考にしてOracleDBの環境構築を行って下さい。

- [環境構築手順](./files/alma_oracle_dev_cs.xlsx)

## PDB及びユーザ作成
研修で使用するプラガブルDB(以降PDB)とユーザを作成します。  
作業する上で必要な概念を以下の記事にまとめていますので、先に参照しましょう。

- [OracleDBの基本アーキテクチャ](./reading/page3.md)
- [マルチテナントアーキテクチャとコンテナDB](./reading/page4.md)

その後以下のページを参照して作業を進めて下さい。

- [研修用PDB及びユーザ作成手順](./manual/page3.md)

:::caution
## サーバを再起動した場合

環境構築完了後、使用している仮想マシンを再起動した場合、  
以下の流れを踏まないと特定PDBでの作業はできません。  
一連の流れとして記憶しておきましょう。

--- 

1. **oracleユーザでログインする**  
環境構築時、Oracleサービスで使用する各環境変数は `/home/oracle/scripts/setEnv.sh` に定義しています。  
Linux上におけるoracleユーザのログインをトリガーとして、 `/home/oracle/.bash_profile` が実行されます。  
環境構築時には `/home/oracle/scripts/setEnv.sh` を `/home/oracle/.bash_profile` に登録しました。  
これによりログイン時に必要な環境変数が読み込まれるという仕組みです。

---

2. **sqlplusコマンドを使用してCDBに接続する**  
```bash
$ sqlplus / as sysdba
```

---

3. **STARTUPコマンドでCDBを起動する**  
```sql
SQL> STARTUP
```

---

4. **PDBを起動する**  
```sql
SQL> ALTER PLUGGABLE DATABASE all OPEN;
/*
上記コマンドでは全てのPDBを一斉起動していますが、
「all」の箇所を特定PDB名に変更することで対象PDBのみを起動することもできます。
*/
```

※以下のクエリを実行することで特定PDBの自動起動が有効になります。

```sql
SQL> ALTER PLUGGABLE DATABASE PDB名 SAVE STATE;
```

---

5. **PDBに接続する**  
上記が完了すると特定のPDBへの接続が可能です。
```sql
-- SQLプロンプトから接続する場合
SQL> conn ユーザ名/パスワード@PDB名
```
```bash
# Linuxプロンプトから接続する場合
$ sqlplus ユーザ名/パスワード@PDB名
```

:::



