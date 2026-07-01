# Playbook作成演習

## 1. 演習の目標

この演習では、**nginx** を使ったWebサーバの自動構築Playbookを作成します。  
以下の手順を一連のPlaybookで自動化することを目標とします。

```
① nginxのインストール
② 設定ファイルの配置（ポート番号を変更）
③ firewalldでポートを開放
④ nginxの起動・自動起動設定
⑤ ブラウザからアクセス確認
```

## 2. ディレクトリ構成

以下の構成でファイルを用意します。

```
~/ansible-practice/
├── inventory
├── webserver.yml        ← メインのPlaybook
└── files/
    └── nginx.conf       ← 配置する設定ファイル
```

```bash
mkdir -p ~/ansible-practice/files
```

## 3. nginx設定ファイルの作成

`~/ansible-practice/files/nginx.conf` を以下の内容で作成します。

```nginx
server {
    listen       8080;
    server_name  _;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

:::tip
デフォルトの80番ポートではなく **8080番ポート** を使用することで、  
設定変更が正しく反映されているかを確認しやすくなります。
:::

## 4. Playbookの作成

`~/ansible-practice/webserver.yml` を以下の内容で作成します。

```yaml
---
- name: Webサーバ（nginx）の自動構築
  hosts: web
  become: true

  tasks:
    - name: nginxをインストールする
      package:
        name: nginx
        state: present

    - name: nginx設定ファイルを配置する
      copy:
        src: files/nginx.conf
        dest: /etc/nginx/conf.d/custom.conf
        owner: root
        group: root
        mode: '0644'

    - name: firewalldで8080番ポートを開放する
      firewalld:
        port: 8080/tcp
        permanent: true
        state: enabled
        immediate: true

    - name: nginxを起動して自動起動を有効にする
      service:
        name: nginx
        state: started
        enabled: true
```

### 使用モジュールの説明

| モジュール | 役割 |
|------------|------|
| `package` | パッケージのインストール |
| `copy` | ファイルをローカルから被管理ノードへコピー |
| `firewalld` | ファイアウォールのポート制御 |
| `service` | サービスの起動・自動起動設定 |

### `copy` モジュールの引数

| 引数 | 説明 |
|------|------|
| `src` | コピー元のファイルパス（管理ノード側） |
| `dest` | コピー先のパス（被管理ノード側） |
| `owner` | ファイルの所有者 |
| `group` | ファイルのグループ |
| `mode` | パーミッション |

## 5. Playbookの実行

```bash
cd ~/ansible-practice
ansible-playbook -i inventory webserver.yml
```

正常に完了すると以下のような出力になります。

```
PLAY [Webサーバ（nginx）の自動構築] **********************************

TASK [Gathering Facts] *******************************************
ok: [node1]
ok: [node2]

TASK [nginxをインストールする] *************************************
changed: [node1]
changed: [node2]

TASK [nginx設定ファイルを配置する] ***********************************
changed: [node1]
changed: [node2]

TASK [firewalldで8080番ポートを開放する] *****************************
changed: [node1]
changed: [node2]

TASK [nginxを起動して自動起動を有効にする] *****************************
changed: [node1]
changed: [node2]

PLAY RECAP *******************************************************
node1 : ok=5  changed=4  unreachable=0  failed=0
node2 : ok=5  changed=4  unreachable=0  failed=0
```

## 6. サービス起動確認

### Playbook実行後の確認コマンド

被管理ノードで直接確認する方法と、Ansibleのモジュールで確認する方法があります。

**Ad-hocコマンドで確認**

```bash
# サービスの状態確認
ansible -i inventory web -m service -a "name=nginx" -b

# curlでHTTPアクセス確認
ansible -i inventory web -m uri -a "url=http://localhost:8080" -b
```

**被管理ノードに直接SSHして確認**

```bash
ssh user@node1
curl http://localhost:8080
```

以下のようなHTMLが返ってくれば成功です。

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

### よくあるエラーと対処法

| 状況 | 原因 | 対処法 |
|------|------|--------|
| `failed` で設定ファイルコピーに失敗 | `files/` ディレクトリが存在しない | `mkdir -p files` で作成 |
| nginxが起動しない | 設定ファイルの構文エラー | `nginx -t` で文法チェック |
| curlで接続できない | firewalldの設定反映漏れ | `immediate: true` の確認 |

## 演習

1. 上記のPlaybookを作成・実行し、node1・node2でnginxが8080番ポートで動作することを確認してください
2. nginxのウェルカムページ（`/usr/share/nginx/html/index.html`）を書き換えるタスクを `copy` モジュールで追加してください
3. Playbookを2回実行し、2回目は全タスクが `ok` になることを確認してください
