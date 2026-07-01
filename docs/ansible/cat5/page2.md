# 実行制御演習

## 1. tags（部分実行）

Playbookが大きくなると、毎回すべてのタスクを実行するのは非効率です。  
`tags` を使うと、特定のタスクだけを選んで実行できます。

### タスクへのtags付与

```yaml
---
- name: Webサーバの構築
  hosts: web
  become: true

  tasks:
    - name: nginxをインストールする
      package:
        name: nginx
        state: present
      tags:
        - install
        - nginx

    - name: 設定ファイルを配置する
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/conf.d/custom.conf
      tags:
        - config
        - nginx

    - name: firewalldでポートを開放する
      firewalld:
        port: "{{ http_port }}/tcp"
        permanent: true
        state: enabled
        immediate: true
      tags:
        - firewall

    - name: nginxを起動する
      service:
        name: nginx
        state: started
        enabled: true
      tags:
        - service
        - nginx
```

### tagsを指定して実行

```bash
# configタグのタスクだけ実行
ansible-playbook -i inventory site.yml --tags config

# 複数のタグを指定
ansible-playbook -i inventory site.yml --tags "install,config"

# 特定のタグを除外して実行
ansible-playbook -i inventory site.yml --skip-tags firewall
```

### Roleにtagsを付与する

Role全体にtagsを付けることもできます。

```yaml
---
- name: Webサーバの構築
  hosts: web
  become: true
  roles:
    - role: nginx
      tags: nginx
    - role: mysql
      tags: mysql
```

```bash
# nginxのRoleだけ実行
ansible-playbook -i inventory site.yml --tags nginx
```

### 特殊なtags

| タグ名 | 説明 |
|--------|------|
| `always` | `--tags` で他のタグを指定しても常に実行される |
| `never` | `--tags never` で明示的に指定しないと実行されない |

```yaml
- name: デバッグ情報を表示する
  debug:
    var: ansible_facts
  tags: never   ← 通常実行では除外、--tags never で実行可能
```

## 2. limit（対象ホストの制御）

`--limit` を使うと、インベントリの一部のホストだけを対象に実行できます。

### 特定ホストに限定する

```bash
# node1だけに実行
ansible-playbook -i inventory site.yml --limit node1

# node1とnode2に実行
ansible-playbook -i inventory site.yml --limit "node1,node2"
```

### パターンで指定する

```bash
# "web"グループのうち名前が"node1"のみ
ansible-playbook -i inventory site.yml --limit "web:&node1"

# webグループからnode2を除外
ansible-playbook -i inventory site.yml --limit "web:!node2"
```

### tagsとlimitの組み合わせ

```bash
# node1のconfigタスクだけ実行
ansible-playbook -i inventory site.yml --limit node1 --tags config
```

段階的にリリースしたいときや、特定ノードだけ再設定したいときに便利です。

## 3. 並列実行の制御

Ansibleはデフォルトで複数ホストに対して並列（同時）実行します。

### forks（並列数の設定）

デフォルトの並列数は **5** です。`ansible.cfg` または実行時オプションで変更できます。

`ansible.cfg`

```ini
[defaults]
forks = 10
```

```bash
# 実行時に並列数を指定
ansible-playbook -i inventory site.yml -f 10
```

### serial（段階的なリリース）

`serial` を使うと、一度に処理するホスト数を制限できます。  
本番環境での安全なローリングアップデートに使います。

```yaml
---
- name: 段階的なWebサーバ更新
  hosts: web
  become: true
  serial: 1        ← 1台ずつ順番に処理する

  tasks:
    - name: nginxを更新する
      package:
        name: nginx
        state: latest

    - name: nginxを再起動する
      service:
        name: nginx
        state: restarted
```

| serialの指定方法 | 動作 |
|-----------------|------|
| `serial: 1` | 1台ずつ順番に処理 |
| `serial: 2` | 2台ずつ処理 |
| `serial: "30%"` | 全体の30%ずつ処理 |
| `serial: [1, 2, 5]` | 最初1台、次2台、以降5台ずつ |

```
[例] 10台のサーバに serial: "30%" を指定した場合

1回目: 3台を処理
2回目: 3台を処理
3回目: 3台を処理
4回目: 1台を処理（残り）
```

:::tip
本番環境のサービス更新では `serial` を使い、  
一部のサーバで問題が起きた場合に全体に影響が広がらないようにします。
:::

## 演習

1. Playbookの各タスクに `install` / `config` / `service` のtagsを付与し、`--tags config` で設定ファイルタスクだけ実行してください
2. `--limit node1` でnode1だけを対象に実行し、node2には変更が加わらないことを確認してください
3. `--limit` と `--tags` を組み合わせ、node1の設定ファイルタスクだけを実行してください
4. `serial: 1` を指定してPlaybookを実行し、node1の処理が完了してからnode2が処理されることをRECAP出力で確認してください
