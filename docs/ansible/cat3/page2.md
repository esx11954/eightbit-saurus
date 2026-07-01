# 変数演習

## 1. 環境別設定（dev / prod）

実際の現場では、開発環境と本番環境で設定値が異なるケースが多くあります。  
Ansibleの変数機能を使って、同じPlaybookをdev・prod両方で使い回す構成を作ります。

### ディレクトリ構成

```
~/ansible-practice/
├── inventory_dev       ← 開発環境用インベントリ
├── inventory_prod      ← 本番環境用インベントリ
├── group_vars/
│   ├── web_dev.yml     ← 開発環境の変数
│   └── web_prod.yml    ← 本番環境の変数
└── webserver.yml
```

### インベントリファイル（環境別）

`inventory_dev`

```ini
[web_dev]
node1 ansible_host=192.168.1.101
node2 ansible_host=192.168.1.102

[web_dev:vars]
ansible_user=user
```

`inventory_prod`

```ini
[web_prod]
node1 ansible_host=10.0.1.101
node2 ansible_host=10.0.1.102

[web_prod:vars]
ansible_user=deploy
```

### 環境別の変数ファイル

`group_vars/web_dev.yml`

```yaml
http_port: 8080
document_root: /usr/share/nginx/html/dev
log_level: debug
```

`group_vars/web_prod.yml`

```yaml
http_port: 80
document_root: /usr/share/nginx/html
log_level: warn
```

### 実行方法

インベントリを切り替えるだけで、同じPlaybookがdev・prod両方に対応します。

```bash
# 開発環境に適用
ansible-playbook -i inventory_dev webserver.yml

# 本番環境に適用
ansible-playbook -i inventory_prod webserver.yml
```

| 設定項目 | dev | prod |
|---------|-----|------|
| ポート | 8080 | 80 |
| ドキュメントルート | `.../dev` | デフォルト |
| ログレベル | debug | warn |

## 2. ポート番号の変数化

ポート番号を変数化し、環境によって切り替わるPlaybookを作ります。

`webserver.yml`

```yaml
---
- name: Webサーバのセットアップ
  hosts: web_dev
  become: true

  tasks:
    - name: nginxをインストールする
      package:
        name: nginx
        state: present

    - name: firewalldでポートを開放する
      firewalld:
        port: "{{ http_port }}/tcp"
        permanent: true
        state: enabled
        immediate: true

    - name: nginxを起動する
      service:
        name: nginx
        state: started
        enabled: true

    - name: 適用されたポートを表示する
      debug:
        msg: "{{ inventory_hostname }} : ポート {{ http_port }} で起動しました"
```

## 3. 外部変数ファイルの利用

`group_vars` / `host_vars` 以外にも、`vars_files` を使って任意の変数ファイルを読み込めます。

### vars_filesの使い方

`vars/common.yml`（変数ファイル）

```yaml
package_name: nginx
admin_user: ansible_admin
retry_count: 3
```

`webserver.yml`

```yaml
---
- name: 外部変数ファイルを使ったPlaybook
  hosts: web
  become: true
  vars_files:
    - vars/common.yml

  tasks:
    - name: "{{ package_name }} をインストールする"
      package:
        name: "{{ package_name }}"
        state: present

    - name: 管理ユーザーを作成する
      user:
        name: "{{ admin_user }}"
        state: present
```

### vars_files vs group_vars の使い分け

| | `vars_files` | `group_vars` |
|---|---|---|
| **読み込み** | Playbook内で明示的に指定 | 自動で読み込まれる |
| **用途** | 特定のPlaybookだけで使う変数 | グループ共通の変数 |
| **管理** | ファイルパスを自由に決められる | ディレクトリ名がグループ名と一致 |

## 4. コマンドラインから変数を渡す（extra-vars）

実行時に `-e` オプションで変数を上書きできます。最も優先度が高い方法です。

```bash
# ポート番号を実行時に指定
ansible-playbook -i inventory webserver.yml -e "http_port=9090"

# 複数の変数を指定
ansible-playbook -i inventory webserver.yml -e "http_port=9090 package_name=httpd"
```

テストや一時的な値の変更に便利です。

:::tip
`-e` で渡した変数は `vars` や `group_vars` より優先されます。  
本番環境での誤実行を防ぐため、CI/CDでの利用時は特に注意しましょう。
:::

## 演習

1. `inventory_dev` と `inventory_prod` を作成し、それぞれ異なるIPアドレスを設定してください
2. `group_vars/web_dev.yml` と `group_vars/web_prod.yml` に異なる `http_port` を定義してください
3. `debug` モジュールを使い、dev・prod それぞれで適用されたポート番号が表示されることを確認してください
4. `-e` オプションでポート番号を上書きして実行し、変数の優先順位を確認してください
