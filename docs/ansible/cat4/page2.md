# Roleの概念理解

## 1. Roleとは

**Role（ロール）** は、Playbookを機能単位に分割・整理するための仕組みです。  
これまで1つのPlaybookファイルにすべて書いていた内容を、決まったディレクトリ構造に分けて管理します。

```
これまでのPlaybook:
  webserver.yml ─ タスク・変数・テンプレート・ハンドラがすべて1ファイルに混在

Roleを使うと:
  roles/
    nginx/          ← 「nginxをセットアップする」という機能のまとまり
      tasks/
      vars/
      templates/
      handlers/
```

## 2. Roleのディレクトリ構造

Roleには決まったディレクトリ構造があります。Ansibleはこの構造を自動的に認識します。

```
roles/
└── <Role名>/
    ├── tasks/
    │   └── main.yml       ← タスクの定義（必須）
    ├── vars/
    │   └── main.yml       ← Role内で使う変数
    ├── defaults/
    │   └── main.yml       ← デフォルト変数（上書き可能な変数）
    ├── templates/
    │   └── *.j2           ← Jinja2テンプレート
    ├── files/
    │   └── *              ← 静的ファイル
    ├── handlers/
    │   └── main.yml       ← ハンドラ
    └── meta/
        └── main.yml       ← Roleのメタ情報・依存関係
```

各ディレクトリに `main.yml` を置くと、Ansibleが自動的に読み込みます。

| ディレクトリ | 役割 | 必須 |
|-------------|------|------|
| `tasks/` | 実行するタスクの定義 | ◎ |
| `vars/` | Role内の変数（優先度高め） | △ |
| `defaults/` | デフォルト変数（優先度低め・外から上書きしやすい） | △ |
| `templates/` | Jinja2テンプレートファイル | △ |
| `files/` | `copy` モジュール用の静的ファイル | △ |
| `handlers/` | `notify` で呼び出されるハンドラ | △ |
| `meta/` | 依存するRoleの指定など | △ |

## 3. varsとdefaultsの違い

Roleには変数を定義できる場所が2つあります。

| | `vars/main.yml` | `defaults/main.yml` |
|---|---|---|
| **優先度** | 高い | 低い |
| **用途** | Roleの内部ロジックに紐づく変数 | 利用者が自由に上書きしてほしい変数 |
| **例** | 内部パス・固定値 | ポート番号・パッケージ名 |

```yaml
# defaults/main.yml（外から上書きしやすい変数）
http_port: 80
package_name: nginx

# vars/main.yml（Role内で固定して使う変数）
nginx_config_dir: /etc/nginx/conf.d
nginx_log_dir: /var/log/nginx
```

## 4. Roleを使うメリット

### 再利用性

一度作ったRoleを、複数のPlaybookやプロジェクトで使い回せます。

```yaml
# site.yml
---
- name: Webサーバの構築
  hosts: web
  roles:
    - nginx        ← Roleを指定するだけ

- name: DBサーバの構築
  hosts: db
  roles:
    - mysql        ← 別のRoleも簡単に組み合わせられる
```

### 可読性・保守性

タスクが増えても、機能ごとにファイルが分かれているため見通しがよくなります。

```
【Roleなし】
webserver.yml（300行）
  → どこに何が書いてあるか探しにくい

【Roleあり】
roles/nginx/tasks/main.yml（50行）
roles/nginx/handlers/main.yml（10行）
roles/nginx/templates/nginx.conf.j2
  → 目的ごとにファイルが分かれていて管理しやすい
```

### チーム開発

Role単位で担当を分けることができます。

```
Aさん → roles/nginx/ を担当
Bさん → roles/mysql/ を担当
Cさん → roles/users/ を担当
```

## 5. Ansible Galaxyとの連携

**Ansible Galaxy** はコミュニティが作成したRoleを公開・共有するプラットフォームです。  
自分でゼロから作らなくても、既存の高品質なRoleをすぐに使えます。

```bash
# Galaxyからroleをインストール
ansible-galaxy role install geerlingguy.nginx

# インストール済みroleの確認
ansible-galaxy role list
```

インストールしたRoleはPlaybookからそのまま呼び出せます。

```yaml
---
- name: nginxのセットアップ
  hosts: web
  roles:
    - geerlingguy.nginx
```

:::tip
本番環境での利用時は、Roleのバージョンを固定して使うことを推奨します。  
`requirements.yml` にバージョンを記載して管理するのが一般的です。
:::

## 演習

1. 以下のディレクトリ構造を手動で作成してください
   ```
   roles/nginx/tasks/main.yml
   roles/nginx/handlers/main.yml
   roles/nginx/defaults/main.yml
   roles/nginx/templates/
   ```
2. `defaults/main.yml` に `http_port: 80` と `package_name: nginx` を定義してください
3. `vars/main.yml` と `defaults/main.yml` の優先度の違いを調べ、どちらが上書きされやすいか確認してください
