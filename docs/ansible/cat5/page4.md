# 総合演習

## 1. 演習の概要

これまで学習した内容をすべて組み合わせ、**複数台構成のサーバ自動構築** を行います。

### 構築する環境

```
┌──────────────────────────────────────────────┐
│                  管理ノード                    │
│              Ansible実行環境                   │
└─────────────────┬────────────────────────────┘
                  │ SSH
       ┌──────────┼──────────┐
       ▼          ▼          ▼
  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │  node1  │ │  node2  │ │  node3  │
  │  (web)  │ │  (web)  │ │  (db)   │
  └─────────┘ └─────────┘ └─────────┘
```

| ホスト | グループ | 構築内容 |
|--------|---------|---------|
| node1 | web | nginx・ユーザー作成・Firewall設定 |
| node2 | web | nginx・ユーザー作成・Firewall設定 |
| node3 | db | MySQL・ユーザー作成・Firewall設定 |

### 最終的なディレクトリ構成

```
~/ansible-practice/
├── site.yml
├── inventory
├── ansible.cfg
├── group_vars/
│   ├── web.yml
│   ├── db.yml
│   └── all_vault.yml       ← Vaultで暗号化
├── host_vars/
│   ├── node1.yml
│   ├── node2.yml
│   └── node3.yml
└── roles/
    ├── common/
    │   └── tasks/
    │       └── main.yml
    ├── nginx/
    │   ├── tasks/main.yml
    │   ├── handlers/main.yml
    │   ├── defaults/main.yml
    │   └── templates/nginx.conf.j2
    └── mysql/
        ├── tasks/main.yml
        ├── handlers/main.yml
        └── defaults/main.yml
```

## 2. 各ファイルの作成

### ansible.cfg

```ini
[defaults]
forks = 5
host_key_checking = False
```

### インベントリ

`inventory`

```ini
[web]
node1 ansible_host=192.168.1.101
node2 ansible_host=192.168.1.102

[db]
node3 ansible_host=192.168.1.103

[all:vars]
ansible_user=user
```

### 変数ファイル

`group_vars/web.yml`

```yaml
http_port: 80
document_root: /usr/share/nginx/html
```

`group_vars/db.yml`

```yaml
mysql_port: 3306
mysql_bind_address: 127.0.0.1
```

`group_vars/all_vault.yml`（暗号化対象）

```yaml
vault_admin_password: "Admin@Pass123"
vault_mysql_root_password: "MySQL@Root456"
```

```bash
ansible-vault encrypt group_vars/all_vault.yml
```

`host_vars/node1.yml`

```yaml
server_name: node1.example.com
```

`host_vars/node2.yml`

```yaml
server_name: node2.example.com
```

## 3. Roleの作成

### common Role（全サーバ共通）

`roles/common/tasks/main.yml`

```yaml
---
- name: 管理者ユーザーを作成する
  user:
    name: "{{ item }}"
    groups: wheel
    state: present
  loop:
    - admin
    - deploy
  tags: users

- name: sudoersにwheelグループを追加する
  lineinfile:
    path: /etc/sudoers
    line: '%wheel ALL=(ALL) NOPASSWD: ALL'
    validate: 'visudo -cf %s'
  tags: users

- name: firewalldを起動して自動起動を有効にする
  service:
    name: firewalld
    state: started
    enabled: true
  tags: firewall
```

### nginx Role

`roles/nginx/defaults/main.yml`

```yaml
http_port: 80
package_name: nginx
document_root: /usr/share/nginx/html
```

`roles/nginx/templates/nginx.conf.j2`

```jinja2
server {
    listen       {{ http_port }};
    server_name  {{ server_name | default('_') }};

    access_log  /var/log/nginx/access.log;
    error_log   /var/log/nginx/error.log;

    location / {
        root   {{ document_root }};
        index  index.html index.htm;
    }
}
```

`roles/nginx/tasks/main.yml`

```yaml
---
- name: nginxをインストールする
  package:
    name: "{{ package_name }}"
    state: present
  tags: install

- name: 設定ファイルを配置する
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/custom.conf
    mode: '0644'
  notify: nginx を再起動する
  tags: config

- name: firewalldでHTTPポートを開放する
  firewalld:
    port: "{{ http_port }}/tcp"
    permanent: true
    state: enabled
    immediate: true
  tags: firewall

- name: nginxを起動して自動起動を有効にする
  service:
    name: "{{ package_name }}"
    state: started
    enabled: true
  tags: service
```

`roles/nginx/handlers/main.yml`

```yaml
---
- name: nginx を再起動する
  service:
    name: nginx
    state: restarted
```

### mysql Role

`roles/mysql/defaults/main.yml`

```yaml
mysql_port: 3306
mysql_package: mysql-server
```

`roles/mysql/tasks/main.yml`

```yaml
---
- name: MySQLをインストールする
  package:
    name: "{{ mysql_package }}"
    state: present
  tags: install

- name: MySQLを起動して自動起動を有効にする
  service:
    name: mysqld
    state: started
    enabled: true
  tags: service

- name: firewalldでMySQLポートをローカルのみ許可する
  firewalld:
    port: "{{ mysql_port }}/tcp"
    permanent: true
    state: enabled
    immediate: true
    zone: internal
  tags: firewall
```

## 4. メインPlaybookの作成

`site.yml`

```yaml
---
- name: 全サーバの共通設定
  hosts: all
  become: true
  roles:
    - role: common
      tags: common

- name: Webサーバの構築
  hosts: web
  become: true
  roles:
    - role: nginx
      tags: nginx

- name: DBサーバの構築
  hosts: db
  become: true
  roles:
    - role: mysql
      tags: mysql
```

## 5. 段階的な実行と確認

### 構文チェック

```bash
ansible-playbook -i inventory site.yml --syntax-check
```

### ドライラン（実際には変更しない）

```bash
ansible-playbook -i inventory site.yml --check
```

### 段階的な本番実行

```bash
# 1. 共通設定だけ先に適用
ansible-playbook -i inventory site.yml --tags common --ask-vault-pass

# 2. Webサーバの構築（node1だけ先に試す）
ansible-playbook -i inventory site.yml --tags nginx --limit node1 --ask-vault-pass

# 3. 問題なければnode2にも適用
ansible-playbook -i inventory site.yml --tags nginx --limit node2 --ask-vault-pass

# 4. DBサーバの構築
ansible-playbook -i inventory site.yml --tags mysql --ask-vault-pass
```

### サービス起動確認

```bash
# Webサーバの確認
ansible -i inventory web -m uri -a "url=http://localhost:80" -b

# MySQLの確認
ansible -i inventory db -m command -a "systemctl is-active mysqld" -b

# ユーザーの確認
ansible -i inventory all -m command -a "id admin" -b
```

## 6. 学習全体のまとめ

| Chapter | 学んだ内容 |
|---------|-----------|
| **cat1** | 構成管理の基礎・Ansibleの概要・環境構築・SSH鍵認証・インベントリ |
| **cat2** | Ad-hocコマンド・Playbook基礎・YAML・冪等性・Webサーバ自動構築 |
| **cat3** | 変数（vars・host_vars・group_vars）・環境別設定・Jinja2テンプレート |
| **cat4** | when・loop・register・Roleの概念・Role構築・複数Role組み合わせ |
| **cat5** | Vault・tags・limit・並列実行・エラーハンドリング・総合演習 |

## 演習

1. 上記の全ファイルを作成し、`--syntax-check` で構文エラーがないことを確認してください
2. `--check` オプションでドライランを実行し、何が変更されるか確認してください
3. `--tags common --limit node1` でcommon Roleをnode1にのみ適用し、ユーザーが作成されたことを確認してください
4. すべてのRoleを全台に適用し、Webサーバ・DBサーバのサービスが正常に起動していることを確認してください
5. node1の `http_port` を変更して再実行し、設定ファイルの更新とnginxの再起動が行われることを確認してください
