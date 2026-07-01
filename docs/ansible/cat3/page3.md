# Template演習

## 1. テンプレートとは

**テンプレート（Template）** は、変数を埋め込める設定ファイルのひな形です。  
cat2では `copy` モジュールで固定の設定ファイルを配置しました。  
`template` モジュールを使うと、変数の値を展開した状態でファイルを配置できます。

```
copy モジュール:
  固定のファイルをそのままコピー → 環境ごとにファイルを用意する必要がある

template モジュール:
  変数を展開してからコピー → 1つのテンプレートで複数環境に対応できる
```

## 2. Jinja2の基礎

Ansibleのテンプレートは **Jinja2** というテンプレートエンジンを使います。  
テンプレートファイルの拡張子は慣習的に `.j2` を使います。

### 変数の展開

```
{{ 変数名 }}
```

```jinja2
server_name: {{ server_name }}
listen: {{ http_port }}
```

### 条件分岐

```jinja2
{% if env == "prod" %}
log_level = warn
{% else %}
log_level = debug
{% endif %}
```

### ループ

```jinja2
{% for user in users %}
- {{ user }}
{% endfor %}
```

### コメント

```jinja2
{# これはJinja2のコメントです。出力ファイルには含まれません #}
```

## 3. templateモジュールの使い方

| 項目 | `copy` モジュール | `template` モジュール |
|------|-------------------|-----------------------|
| **ファイル形式** | そのままコピー | Jinja2を展開してからコピー |
| **変数の使用** | 不可 | 可能 |
| **テンプレート置き場** | `files/` | `templates/` |
| **拡張子** | 任意 | 慣習的に `.j2` |

```yaml
- name: 設定ファイルをテンプレートから生成する
  template:
    src: templates/nginx.conf.j2
    dest: /etc/nginx/conf.d/custom.conf
    owner: root
    group: root
    mode: '0644'
```

## 4. 設定ファイルの自動生成

nginxの設定ファイルをテンプレート化します。

### ディレクトリ構成

```
~/ansible-practice/
├── inventory
├── group_vars/
│   └── web.yml
├── host_vars/
│   ├── node1.yml
│   └── node2.yml
├── templates/
│   └── nginx.conf.j2    ← テンプレートファイル
└── webserver.yml
```

### 変数ファイルの用意

`group_vars/web.yml`

```yaml
document_root: /usr/share/nginx/html
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

### テンプレートファイルの作成

`templates/nginx.conf.j2`

```jinja2
{# nginx 設定ファイル - Ansibleで自動生成 #}
server {
    listen       {{ http_port }};
    server_name  {{ server_name }};

    access_log  /var/log/nginx/access.log;
    error_log   /var/log/nginx/error.log;

    location / {
        root   {{ document_root }};
        index  index.html index.htm;
    }
}
```

### Playbookの作成

`webserver.yml`

```yaml
---
- name: テンプレートを使ったWebサーバ構築
  hosts: web
  become: true

  tasks:
    - name: nginxをインストールする
      package:
        name: nginx
        state: present

    - name: 設定ファイルをテンプレートから生成する
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/conf.d/custom.conf
        owner: root
        group: root
        mode: '0644'
      notify: nginx を再起動する

    - name: nginxを起動して自動起動を有効にする
      service:
        name: nginx
        state: started
        enabled: true

  handlers:
    - name: nginx を再起動する
      service:
        name: nginx
        state: restarted
```

### handlerとは

`notify` と `handlers` を組み合わせることで、設定ファイルが変更されたときだけサービスを再起動できます。

```
設定ファイルに変更あり（changed）→ notify発火 → handler実行（再起動）
設定ファイルに変更なし（ok）    → notify発火せず → 再起動しない
```

| 項目 | 説明 |
|------|------|
| `notify` | タスクが `changed` になったとき、指定したhandlerを呼び出す |
| `handlers` | `notify` で呼び出されたときだけ実行されるタスク群 |

## 5. 環境差分の吸収

テンプレートの条件分岐を使い、dev・prod で設定内容を変えます。

`group_vars/web.yml` に環境変数を追加

```yaml
env: dev
```

`templates/nginx.conf.j2`（条件分岐あり）

```jinja2
server {
    listen       {{ http_port }};
    server_name  {{ server_name }};

{% if env == "prod" %}
    access_log  /var/log/nginx/access.log  main;
    error_log   /var/log/nginx/error.log   warn;
{% else %}
    access_log  /var/log/nginx/access.log  combined;
    error_log   /var/log/nginx/error.log   debug;
{% endif %}

    location / {
        root   {{ document_root }};
        index  index.html index.htm;
    }
}
```

`env: dev` のときに生成されるファイル

```nginx
server {
    listen       8081;
    server_name  node1.example.com;

    access_log  /var/log/nginx/access.log  combined;
    error_log   /var/log/nginx/error.log   debug;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

## 演習

1. `templates/nginx.conf.j2` を作成し、`http_port` と `server_name` を変数化してください
2. `host_vars/node1.yml` と `host_vars/node2.yml` に異なる値を設定し、それぞれ異なる設定ファイルが生成されることを確認してください
3. `handlers` を使い、設定ファイルが変更されたときだけnginxが再起動されることを確認してください
4. テンプレートに条件分岐を追加し、`env` 変数の値によってログレベルが切り替わることを確認してください
