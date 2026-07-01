# 環境構築演習

想定する演習環境は以下の通りです。

| 役割 | ホスト名 | OS | 備考 |
|------|----------|-----|------|
| 管理ノード | control | Rocky Linux 9 | Ansibleをインストールする |
| 被管理ノード | node1 | Rocky Linux 9 | エージェント不要 |
| 被管理ノード | node2 | Rocky Linux 9 | エージェント不要 |

<details>
    <summary>1. Ansibleインストール</summary>
    <div>

## EPELリポジトリの有効化

Ansibleは **EPEL（Extra Packages for Enterprise Linux）** リポジトリから提供されています。  
まず管理ノード（control）にSSHログインし、EPELを有効化します。

```bash
sudo dnf install -y epel-release
```

## Ansibleのインストール

```bash
sudo dnf install -y ansible
```

## バージョン確認

```bash
ansible --version
```

以下のように表示されれば正常にインストールされています。

```
ansible [core 2.15.x]
  config file = /etc/ansible/ansible.cfg
  ...
  python version = 3.x.x
```

:::tip
Ansibleは**管理ノードにのみ**インストールします。  
被管理ノード（node1, node2）にはインストール不要です。
:::

    </div>
</details>

<details>
    <summary>2. SSH鍵認証の設定</summary>
    <div>

## なぜSSH鍵認証が必要か

AnsibleはSSHを使って被管理ノードに接続します。  
毎回パスワードを入力するのは手動操作と変わらないため、**パスワードなしで接続できるSSH鍵認証**を設定します。

```
管理ノード                    被管理ノード
  │                               │
  │  SSH接続（パスワードなし）      │
  │ ──────────────────────────── ▶ │
  │   秘密鍵で認証                  │
  │                               │
```

## 鍵ペアの生成（管理ノードで実行）

```bash
ssh-keygen -t ed25519 -C "ansible"
```

オプション・入力の確認が表示されますが、すべてEnterで進めます。

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):  ← Enter
Enter passphrase (empty for no passphrase):                         ← Enter
Enter same passphrase again:                                        ← Enter
```

`~/.ssh/` に以下の2ファイルが生成されます。

| ファイル | 説明 |
|----------|------|
| `id_ed25519` | **秘密鍵**（管理ノードで保管。外部に漏らさない） |
| `id_ed25519.pub` | **公開鍵**（被管理ノードに配布する） |

## 公開鍵を被管理ノードへコピー

`ssh-copy-id` コマンドを使い、各被管理ノードに公開鍵を配布します。

```bash
ssh-copy-id user@node1
ssh-copy-id user@node2
```

パスワードを求められたら、各ノードのパスワードを入力します（この操作は最初の1回だけ）。

## 接続確認

鍵認証でパスワードなしにログインできることを確認します。

```bash
ssh user@node1
ssh user@node2
```

パスワードを聞かれずにログインできれば設定完了です。

:::danger
秘密鍵（`id_ed25519`）は外部に漏洩しないよう注意してください。  
公開鍵（`.pub`ファイル）のみを被管理ノードに配布します。
:::

    </div>
</details>

<details>
    <summary>3. インベントリファイルの作成</summary>
    <div>

## インベントリとは

**インベントリ（Inventory）** は、Ansibleが管理するノードの一覧を定義するファイルです。  
どのサーバに対して操作を行うか、Ansibleはインベントリを参照して判断します。

## インベントリファイルの作成

任意のディレクトリに作業用フォルダを作成し、インベントリファイルを作成します。

```bash
mkdir ~/ansible-practice
cd ~/ansible-practice
```

`inventory` というファイルを以下の内容で作成します。

```ini
[web]
node1 ansible_host=192.168.1.101
node2 ansible_host=192.168.1.102

[web:vars]
ansible_user=user
```

| 項目 | 説明 |
|------|------|
| `[web]` | グループ名。任意の名前を付けられる |
| `ansible_host` | 接続先IPアドレスまたはホスト名 |
| `ansible_user` | SSH接続に使用するユーザー名 |

:::tip
IPアドレスは自分の環境に合わせて変更してください。
:::

    </div>
</details>

<details>
    <summary>4. 疎通確認（ping モジュール）</summary>
    <div>

## Ad-hocコマンドとは

Playbookを使わず、コマンドラインから直接Ansibleモジュールを実行する方法を **Ad-hocコマンド** といいます。  
簡単な疎通確認や一時的な操作に使います。

## pingモジュールで疎通確認

以下のコマンドを実行し、管理ノードから被管理ノードに正常に接続できるか確認します。

```bash
ansible -i inventory web -m ping
```

| オプション | 説明 |
|------------|------|
| `-i inventory` | 使用するインベントリファイルを指定 |
| `web` | 対象グループ名 |
| `-m ping` | 使用するモジュール名 |

## 実行結果の確認

以下のように表示されれば接続成功です。

```
node1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
node2 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

:::tip
Ansibleの `ping` モジュールはネットワークのpingコマンドとは異なります。  
SSH接続とPython実行環境の確認を行うAnsible専用のモジュールです。
:::

## よくあるエラーと対処法

| エラーメッセージ | 原因 | 対処法 |
|-----------------|------|--------|
| `UNREACHABLE` | SSH接続できない | IPアドレスの確認・SSH鍵認証の再設定 |
| `Permission denied` | SSH鍵が正しく配布されていない | `ssh-copy-id` を再実行 |
| `python3 not found` | 被管理ノードにPythonが未インストール | `sudo dnf install -y python3` を実行 |

    </div>
</details>

## 演習

1. 管理ノードにAnsibleをインストールし、バージョンを確認してください
2. 管理ノードでSSH鍵ペアを生成し、node1・node2に公開鍵を配布してください
3. インベントリファイルを作成し、`ping` モジュールで両ノードへの疎通確認を行ってください
4. node1のみを対象にpingを実行するにはどうすればよいか確認してください（ヒント：グループ名の部分を変える）
