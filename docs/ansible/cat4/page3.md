# Role構築演習

## 1. 演習の目標

cat2・cat3で作成したWebサーバ構築のPlaybookを **Role** として再構成します。  
完成後は複数ホストへの適用もRoleを呼び出すだけで行えるようにします。

### 完成形のディレクトリ構成

```
~/ansible-practice/
├── site.yml                    ← メインのPlaybook
├── inventory
├── group_vars/
│   └── web.yml
├── host_vars/
│   ├── node1.yml
│   └── node2.yml
└── roles/
    └── nginx/
        ├── tasks/
        │   └── main.yml        ← タスクの定義
        ├── handlers/
        │   └── main.yml        ← ハンドラの定義
        ├── defaults/
        │   └── main.yml        ← デフォルト変数
        └── templates/
            └── nginx.conf.j2   ← 設定ファイルテンプレート
```

## 2. Roleの作成

### ディレクトリの作成

```bash
mkdir -p ~/ansible-practice/roles/nginx/{tasks,handlers,defaults,templates}
```

### defaults/main.yml（デフォルト変数）

```yaml
http_port: 80
package_name: nginx
document_root: /usr/share/nginx/html
```

### templates/nginx.conf.j2

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

:::tip
`{{ 変数名 | default('値') }}` はJinja2のフィルタ機能です。  
変数が未定義の場合に使うデフォルト値を指定できます。
:::

### tasks/main.yml（タスク定義）

```yaml
---
- name: "{{ package_name }} をインストールする"
  package:
    name: "{{ package_name }}"
    state: present

- name: 設定ファイルをテンプレートから生成する
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/custom.conf
    owner: root
    group: root
    mode: '0644'
  notify: nginx を再起動する

- name: firewalldでポートを開放する
  firewalld:
    port: "{{ http_port }}/tcp"
    permanent: true
    state: enabled
    immediate: true

- name: "{{ package_name }} を起動して自動起動を有効にする"
  service:
    name: "{{ package_name }}"
    state: started
    enabled: true
```

:::tip
Roleの `tasks/main.yml` 内では `templates/` のファイルを参照するとき、  
`src` にファイル名だけ書けばAnsibleが自動的に `templates/` ディレクトリを探します。
:::

### handlers/main.yml（ハンドラ定義）

```yaml
---
- name: nginx を再起動する
  service:
    name: nginx
    state: restarted
```

## 3. メインPlaybookの作成

RoleをPlaybookから呼び出します。

`site.yml`

```yaml
---
- name: Webサーバの構築
  hosts: web
  become: true
  roles:
    - nginx
```

Roleを使うことで、Playbookがシンプルになります。  
タスクの詳細はRole内にカプセル化されています。

## 4. 変数ファイルの用意

`group_vars/web.yml`

```yaml
# webグループ共通の変数（特になし）
```

`host_vars/node1.yml`

```yaml
http_port: 8081
server_name: node1.example.com
```

`host_vars/node2.yml`

```yaml
http_port: 8082
server_name: node2.example.com
```

## 5. Playbookの実行

```bash
cd ~/ansible-practice
ansible-playbook -i inventory site.yml
```

node1・node2それぞれに異なる設定が適用されます。

```
PLAY [Webサーバの構築] *******************************************

TASK [Gathering Facts] *******************************************
ok: [node1]
ok: [node2]

TASK [nginx : nginxをインストールする] *******************************
changed: [node1]
changed: [node2]

TASK [nginx : 設定ファイルをテンプレートから生成する] *********************
changed: [node1]
changed: [node2]

TASK [nginx : firewalldでポートを開放する] ****************************
changed: [node1]
changed: [node2]

TASK [nginx : nginxを起動して自動起動を有効にする] ************************
changed: [node1]
changed: [node2]

RUNNING HANDLER [nginx : nginx を再起動する] **************************
changed: [node1]
changed: [node2]

PLAY RECAP *******************************************************
node1 : ok=6  changed=5  unreachable=0  failed=0
node2 : ok=6  changed=5  unreachable=0  failed=0
```

タスク名の先頭に `nginx :` が付くのはRoleが提供するタスクであることを示しています。

## 6. 複数Roleの組み合わせ

実際の現場ではWebサーバ・DBサーバなど複数のRoleを組み合わせて使います。

`site.yml`（複数Role適用の例）

```yaml
---
- name: Webサーバの構築
  hosts: web
  become: true
  roles:
    - common      ← 全サーバ共通の設定（ユーザー作成など）
    - nginx       ← WebサーバRole

- name: DBサーバの構築
  hosts: db
  become: true
  roles:
    - common      ← 同じRoleを使い回せる
    - mysql       ← DBサーバRole
```

| Role | 役割 |
|------|------|
| `common` | 全サーバ共通（ユーザー・パッケージなど） |
| `nginx` | Webサーバの設定 |
| `mysql` | DBサーバの設定 |

## 演習

1. `roles/nginx/` のディレクトリ構造を作成し、各ファイルを配置してください
2. `site.yml` からRoleを呼び出し、node1・node2に対してPlaybookを実行してください
3. `host_vars` の `http_port` を変更して再実行し、設定ファイルが更新されnginxが再起動されることを確認してください
4. `common` Roleを新たに作成し、`alice` / `bob` の2ユーザーを作成するタスクを定義してください。`site.yml` で `nginx` Roleより先に適用してください
