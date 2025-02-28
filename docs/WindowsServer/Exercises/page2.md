---
sidebar_position: 2
---

# 演習2 ネットワーク管理コマンド

各演習のコマンドを実行した結果をスクリーンショットし  
演習が完了したら、講師へ提出しましょう  
結果が画面に収まらない場合は、結果の冒頭をスクリーンショットしましょう  

## net user

### 演習2-1. ローカルのユーザアカウントの確認

```batch title="ローカルユーザアカウントの一覧を表示"
net user
```

### 演習2-2. ユーザアカウントを作成する

```batch title="ローカルユーザアカウントを作成する"
net user localuser1 Password@12345
```

```batch title="ドメインコントローラー上に、ユーザアカウントを作成する"
net user dcuser1 Password@12345 /DOMAIN
```

:::tip
ドメインに参加しているクライアント上でも、ドメイン管理者として `net user` コマンドを実行することで  
DC(ドメインコントローラー)上のユーザアカウントを管理することができます  
:::

## net config

### 演習2-3. サーバの構成情報を表示する

コマンドを実行するPCがファイル共有サーバとして構成されている場合に、構成情報を確認することができます  

```batch title="サーバの構成情報を表示する"
net config server
```

### 演習2-4. クライアントの構成情報を表示する

コマンドを実行するPCがネットワーク上でクライアントとして構成されている場合に、構成情報を確認することができます  

ドメインに参加している場合は、ドメインの情報も含まれます  

```batch title="サーバの構成情報を表示する"
net config workstation
```

## net time

ネットワーク上で標準となる時刻情報を配信しているサーバを `NTPサーバ` と呼びます  
クライアントは自身の時刻情報を、NTPサーバの時刻情報と同期することができます  

ActiveDirectoryサーバは通常、構築時にNTPサーバとしても構築されます  
これによりドメインに参加したクライアントは、定期的に時刻情報の同期が実施されます  

### 演習2-5. NTPサーバ(タイムサーバ)と時刻を同期する

```batch title="設定されているNTPサーバと時刻情報を同期する"
net time
```

## netstat

### 演習2-6. ポートを使っているプログラムの一覧を表示する

```batch title="ポート使っている全プログラムのIPアドレス、ポート番号、プロセスIDを表示"
netstat -ano
```

### 演習2-7. プロセスIDの情報を知る

```batch title="起動しているプロセスの一覧を表示"
tasklist
```

### 演習2-8. タスクを終了させる

#### 事前に以下コマンドを実行しましょう

```batch title="電卓を起動する"
notepad
```

タスクを終了(キル)するには、プロセスIDが必要です  
`tasklist` コマンドの実行結果から「notepad.exe」(起動したメモ帳のプロセス名)のプロセスIDを探し、タスクを終了をします  

```batch title="電卓のタスクを終了する"
taskkill /pid (notepad.exeのプロセスID) /t
```
