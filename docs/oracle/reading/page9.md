---
sidebar_position: 8
---

# リスナー

## はじめに

これまでの章で、データベースの基本的な仕組みや操作方法について学んできました。  
この章ではクライアントからデータベースに接続するために必要不可欠な「リスナー」について理解を深めていきます。

## 9-1. リスナーの基本概念

### リスナーとは

リスナーは、クライアントからのデータベース接続要求を受け付け、適切なデータベースに振り分ける役割を持つプログラムです。

例えば、銀行のATMを利用する場合を考えてみましょう。  
ATMの前には行員が立っていてお客様の要望を聞き、適切な窓口に案内することがあります。  
リスナーは、このような案内係の役割を果たします。

### リスナーの役割

1. 接続要求の受付：
クライアントからの接続要求を待ち受けます。

2. サービス名の解決：
クライアントが指定したサービス名から、適切なデータベースを特定します。

3. 接続の確立：
クライアントとデータベースの間の接続を確立します。

## 9-2. リスナーの設定と管理

### リスナーの設定ファイル

リスナーの設定は、listener.oraというファイルで管理されています。

```
# listener.oraの基本的な設定例
LISTENER =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
  )

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = orcl)
      (ORACLE_HOME = /u01/app/oracle/product/19.3.0/dbhome_1)
      (SID_NAME = orcl)
    )
  )
```

この設定ファイルで重要な要素：

- PROTOCOL：通信プロトコル（通常はTCP）
- HOST：リスナーが動作するサーバーのホスト名
- PORT：接続を待ち受けるポート番号
- SID_NAME：データベースの識別子

### リスナーの基本操作

リスナーの操作には、lsnrctlコマンドを使用します：

```bash
# リスナーの起動
lsnrctl start

# リスナーの状態確認
lsnrctl status

# リスナーの停止
lsnrctl stop
```

## 9-3. リスナーの動作の仕組み

### 接続の確立手順

1. クライアントからの接続要求：
```sql
sqlplus scott/tiger@orcl
```

2. リスナーの処理：
- サービス名（orcl）の確認
- データベースインスタンスの特定
- 接続情報のクライアントへの返送

3. 直接接続の確立：
- クライアントとデータベースの間で直接の通信経路を確立

### 動的サービス登録

Oracle Databaseは起動時に自動的にリスナーに登録を行います。  
この機能により、手動での設定なしでもサービスが利用可能になります。

## 9-4. リスナーの使用例

### 基本的な使用例

#### 1. データベースへの接続確認

```bash
# リスナーの状態確認
$ lsnrctl status

LSNRCTL> status
Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521)))
STATUS of the LISTENER
------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 19.3.0.0.0
Start Date                15-JAN-2025 10:00:00
Uptime                    0 days 2 hr. 5 min. 22 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Listener Parameter File   /u01/app/oracle/product/19.3.0/dbhome_1/network/admin/listener.ora
Listener Log File         /u01/app/oracle/diag/tnslsnr/localhost/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=localhost)(PORT=1521)))
Services Summary...
Service "orcl" has 1 instance(s).
  Instance "orcl", status READY, has 1 handler(s) for this service...
```

#### 2. 新しいサービスの追加

```bash
# listener.oraファイルの編集
$ vi $ORACLE_HOME/network/admin/listener.ora

# 設定の再読み込み
$ lsnrctl reload
```

### トラブルシューティングの例

#### 1. 接続エラーの確認

よくあるエラーと対処方法：

```
ORA-12541: TNS:リスナーがありません
→ リスナーが起動していない可能性があります
対処：lsnrctl startでリスナーを起動

ORA-12514: TNS:リスナーが要求されたサービスを認識していません
→ サービス名が間違っているか、データベースが起動していない可能性があります
対処：リスナーのステータス確認とデータベースの起動状態を確認
```

#### 2. ログの確認

```bash
# リスナーログの確認
$ cd $ORACLE_BASE/diag/tnslsnr/$HOSTNAME/listener/trace
$ tail -f listener.log
```

## 9-5. リスナーのセキュリティ

### セキュリティ設定

リスナーのセキュリティ設定は重要です：

1. リスナーパスワードの設定
```bash
LSNRCTL> set password
Password: 
The command completed successfully
```

2. 管理制限の設定
```bash
LSNRCTL> set admin_restrictions on
The command completed successfully
```

### 推奨されるセキュリティ対策

1. デフォルトポートの変更
2. ホストベースのアクセス制限
3. ログの定期的な確認
4. 不要なサービスの無効化

## まとめ

リスナーは、クライアントとデータベースを結ぶ重要な役割を果たします。  
その基本的な仕組みと操作方法を理解することは、データベース管理者にとって必須のスキルとなります。

