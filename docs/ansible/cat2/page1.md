# Ad-hocコマンド演習

## 1. Ad-hocコマンドとは

**Ad-hocコマンド** は、Playbookを作成せずにコマンドラインから直接Ansibleモジュールを実行する方法です。  
「今すぐ1回だけ実行したい」という場面に適しています。

| | Ad-hocコマンド | Playbook |
|---|---|---|
| **用途** | 一時的な操作・確認 | 繰り返し実行する自動化 |
| **記述** | コマンドラインに1行 | YAMLファイルに記述 |
| **再利用** | しにくい | しやすい |

## 2. 基本構文

```bash
ansible -i <インベントリ> <対象> -m <モジュール名> -a "<引数>"
```

| オプション | 説明 |
|------------|------|
| `-i` | インベントリファイルのパスを指定 |
| 対象 | グループ名・ホスト名・`all`（全台） |
| `-m` | 使用するモジュール名 |
| `-a` | モジュールに渡す引数 |
| `-b` | sudo権限（become）で実行 |

## 3. 主要モジュールの操作

### package モジュール（パッケージ管理）

サーバへのパッケージインストール・削除を行います。

```bash
# パッケージのインストール
ansible -i inventory web -m package -a "name=httpd state=present" -b

# パッケージの削除
ansible -i inventory web -m package -a "name=httpd state=absent" -b
```

| 引数 | 値 | 説明 |
|------|-----|------|
| `name` | パッケージ名 | 対象のパッケージ |
| `state` | `present` | インストール済みの状態にする |
| `state` | `absent` | アンインストール済みの状態にする |
| `state` | `latest` | 最新バージョンにする |

### service モジュール（サービス管理）

サービスの起動・停止・自動起動設定を行います。

```bash
# サービスの起動
ansible -i inventory web -m service -a "name=httpd state=started" -b

# サービスの停止
ansible -i inventory web -m service -a "name=httpd state=stopped" -b

# 自動起動の有効化
ansible -i inventory web -m service -a "name=httpd enabled=true" -b
```

| 引数 | 値 | 説明 |
|------|-----|------|
| `name` | サービス名 | 対象のサービス |
| `state` | `started` | 起動状態にする |
| `state` | `stopped` | 停止状態にする |
| `state` | `restarted` | 再起動する |
| `enabled` | `true` / `false` | OS起動時の自動起動設定 |

### user モジュール（ユーザー管理）

ユーザーの作成・削除を行います。

```bash
# ユーザーの作成
ansible -i inventory web -m user -a "name=ansible_user state=present" -b

# ユーザーの削除
ansible -i inventory web -m user -a "name=ansible_user state=absent" -b

# グループ指定してユーザー作成
ansible -i inventory web -m user -a "name=deploy_user group=wheel state=present" -b
```

## 4. 手動操作との違い

以下の例で、手動操作とAnsibleの違いを確認します。  
「node1 と node2 の両方にnginxをインストールして起動する」というケースです。

**手動操作の場合（SSH接続→コマンド実行を繰り返す）**

```bash
# node1に接続
ssh user@node1
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
exit

# node2に接続
ssh user@node2
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
exit
```

**Ansibleの場合（管理ノードから1コマンド）**

```bash
ansible -i inventory web -m package -a "name=nginx state=present" -b
ansible -i inventory web -m service -a "name=nginx state=started enabled=true" -b
```

| 観点 | 手動操作 | Ansible |
|------|----------|---------|
| **台数が増えた場合** | SSHログインを繰り返す | コマンドは変わらない |
| **実行ミスのリスク** | 高い（手入力） | 低い（コマンド固定） |
| **並列実行** | できない | 自動で並列実行 |
| **冪等性** | 保証されない | モジュールが保証 |

## 演習

1. `package` モジュールを使ってnode1・node2に `vim` をインストールしてください
2. `service` モジュールを使ってnode1・node2で `firewalld` を起動し、自動起動を有効にしてください
3. `user` モジュールを使ってnode1・node2に `testuser` というユーザーを作成してください
4. 作成した `testuser` を削除してください
