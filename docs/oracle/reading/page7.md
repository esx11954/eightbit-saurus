---
sidebar_position: 7
---

# Linux上におけるDB操作

## はじめに

前章では、Linuxの基本的な概念と操作方法について学びました。  
この章では、実際にLinux上でOracleデータベースを操作する方法について見ていきます。  
日常的な運用管理で必要となる基本的な操作から、よく使用される管理コマンドまでを理解しましょう。

## 7-1. 環境設定

### 環境変数の設定

Linux上でOracleデータベースを操作するためには、まず適切な環境設定が必要です。  
これは主に環境変数と呼ばれる設定を通じて行います。

一般的な環境設定の手順は以下のようになります：

```bash
# oracleユーザーのホームディレクトリに移動
cd /home/oracle

# 環境設定ファイルを確認
cat .bash_profile

# 主な環境変数の例
ORACLE_HOME=/u01/app/oracle/product/19.3.0/dbhome_1
ORACLE_SID=orcl
PATH=$ORACLE_HOME/bin:$PATH
```

ここでの重要な環境変数について説明します：

ORACLE_HOME：
Oracleソフトウェアがインストールされているディレクトリを指定します。  
データベースの実行ファイルや設定ファイルはこのディレクトリ以下に配置されています。

ORACLE_SID：
操作対象となるデータベースインスタンスの名前を指定します。  
複数のデータベースが存在する環境では、この設定を切り替えることで操作対象を変更できます。

PATH：
Oracleのコマンドを実行するために必要なディレクトリを指定します。

## 7-2. データベースの起動と停止

### 基本的な起動手順

データベースの起動は、段階的に行われます。  
各段階で確認すべきポイントについて見ていきましょう。

```sql
-- SQLPlusを起動
sqlplus / as sysdba

-- データベースの状態確認
SQL> SELECT status FROM v$instance;

-- 通常の起動手順
SQL> STARTUP
```

起動時の各段階：

1. NOMOUNT状態：
パラメータファイルを読み込み、インスタンスを起動します。  
この段階では制御ファイルはまだ読み込まれていません。

2. MOUNT状態：
制御ファイルを読み込み、データベースの構成を認識します。  
この段階でリカバリが必要かどうかを確認できます。

3. OPEN状態：
全てのデータファイルとREDOログファイルをオープンし、ユーザーからのアクセスを受け付ける状態になります。

### 安全な停止手順

データベースの停止も、データの整合性を保つために適切な手順で行う必要があります。

```sql
-- 新規接続の受付を停止
SQL> ALTER SYSTEM ENABLE RESTRICTED SESSION;

-- 現在のセッションを確認
SQL> SELECT username, status FROM v$session WHERE type = 'USER';

-- データベースを停止
SQL> SHUTDOWN IMMEDIATE
```

停止時の注意点：

1. 実行中のトランザクション：
SHUTDOWN IMMEDIATEを使用すると、実行中のトランザクションはロールバックされます。  
より丁寧な停止が必要な場合は、SHUTDOWN NORMALを使用します。

2. 接続ユーザーの確認：
重要な処理を実行しているユーザーがいないことを確認してから停止することが推奨されます。

## 7-3. 日常的な管理操作

### ストレージ管理

データファイルの管理は、日常的な運用で重要な作業の一つです。

容量の確認：
```sql
-- 表領域の使用状況を確認
SQL> SELECT tablespace_name, 
            bytes/1024/1024 "Size (MB)",
            maxbytes/1024/1024 "Max Size (MB)"
     FROM dba_data_files;

-- 空き容量の確認
SQL> SELECT tablespace_name,
            bytes/1024/1024 "Free Space (MB)"
     FROM dba_free_space;
```

### プロセス管理

Linuxのプロセス管理コマンドを使用して、データベースの状態を監視します。

```bash
# Oracleプロセスの確認
ps -ef | grep ora_

# リスナープロセスの確認
ps -ef | grep tnslsnr
```

## 7-4. パフォーマンス監視

### システムの状態確認

データベースのパフォーマンスは、システムリソースの使用状況と密接に関連しています。

```bash
# システム全体の負荷確認
top

# メモリ使用状況の確認
free -m

# ディスクI/Oの確認
iostat -x
```

### アラートログの監視

データベースの重要なイベントは、アラートログに記録されます。

```bash
# アラートログの確認
cd $ORACLE_BASE/diag/rdbms/$ORACLE_SID/$ORACLE_SID/trace
tail -f alert_$ORACLE_SID.log
```

## まとめ

この章では、Linux上でのOracleデータベースの基本的な操作方法について学びました。  
これらの操作は、日常的な運用管理の基礎となります。