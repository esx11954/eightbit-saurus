# 制御構文演習

## 1. when（条件分岐）

`when` を使うと、条件が満たされたときだけタスクを実行できます。

### 基本構文

```yaml
- name: タスク名
  モジュール名:
    引数: 値
  when: 条件式
```

### OSの種類で処理を分岐する

`ansible_os_family` はGathering Factsで収集されるマジック変数です。  
OSの種類によってパッケージ管理コマンドが異なる場合に使います。

```yaml
---
- name: OS別パッケージインストール
  hosts: web
  become: true

  tasks:
    - name: nginxをインストールする（RedHat系）
      package:
        name: nginx
        state: present
      when: ansible_os_family == "RedHat"

    - name: nginxをインストールする（Debian系）
      package:
        name: nginx
        state: present
      when: ansible_os_family == "Debian"
```

### 複数条件の組み合わせ

```yaml
# AND条件（両方満たす場合に実行）
when:
  - ansible_os_family == "RedHat"
  - ansible_memtotal_mb >= 1024

# OR条件
when: ansible_os_family == "RedHat" or ansible_os_family == "Debian"

# 否定
when: ansible_os_family != "Windows"
```

## 2. loop（繰り返し処理）

同じ処理を複数の対象に繰り返すとき、`loop` を使うとタスクをまとめられます。

### loopなし（繰り返し書く場合）

```yaml
tasks:
  - name: userAを作成する
    user:
      name: userA
      state: present

  - name: userBを作成する
    user:
      name: userB
      state: present

  - name: userCを作成する
    user:
      name: userC
      state: present
```

### loopあり（スッキリまとめる）

```yaml
tasks:
  - name: ユーザーを作成する
    user:
      name: "{{ item }}"
      state: present
    loop:
      - userA
      - userB
      - userC
```

`item` はループの各要素が自動的にセットされる変数です。

### ディクショナリのloop

複数の値をセットで扱いたい場合はディクショナリ（辞書型）を使います。

```yaml
tasks:
  - name: パッケージをインストールする
    package:
      name: "{{ item.name }}"
      state: "{{ item.state }}"
    loop:
      - { name: nginx,   state: present }
      - { name: vim,     state: present }
      - { name: httpd,   state: absent  }
```

### loopでユーザーとグループをまとめて作成する

```yaml
tasks:
  - name: ユーザーを作成する
    user:
      name: "{{ item.name }}"
      group: "{{ item.group }}"
      state: present
    loop:
      - { name: alice, group: wheel }
      - { name: bob,   group: users }
      - { name: carol, group: users }
```

## 3. register（実行結果の取得）

`register` を使うと、タスクの実行結果を変数に保存して後続のタスクで使えます。

### 基本構文

```yaml
- name: コマンドを実行する
  command: cat /etc/os-release
  register: os_info

- name: 結果を表示する
  debug:
    var: os_info.stdout
```

`register` で保存した変数に含まれる主なキー

| キー | 内容 |
|------|------|
| `stdout` | 標準出力の内容 |
| `stderr` | 標準エラー出力の内容 |
| `rc` | リターンコード（0が正常） |
| `changed` | 変更があったか（true/false） |
| `failed` | 失敗したか（true/false） |

### register と when を組み合わせる

コマンドの実行結果によって次の処理を分岐させます。

```yaml
tasks:
  - name: nginxのステータスを確認する
    command: systemctl is-active nginx
    register: nginx_status
    ignore_errors: true

  - name: nginxが停止していたら起動する
    service:
      name: nginx
      state: started
    when: nginx_status.rc != 0
```

### register の活用例（インストール済み確認）

```yaml
tasks:
  - name: gitがインストール済みか確認する
    command: which git
    register: git_check
    ignore_errors: true

  - name: gitをインストールする（未インストールの場合のみ）
    package:
      name: git
      state: present
    when: git_check.rc != 0

  - name: 確認結果を表示する
    debug:
      msg: "git はすでにインストールされています: {{ git_check.stdout }}"
    when: git_check.rc == 0
```

## 4. 組み合わせの例

`loop` + `register` + `when` を組み合わせた実践的なPlaybookです。

```yaml
---
- name: 複数サービスの状態確認と起動
  hosts: web
  become: true

  tasks:
    - name: サービスの状態を確認する
      command: systemctl is-active "{{ item }}"
      register: service_status
      loop:
        - nginx
        - firewalld
      ignore_errors: true

    - name: 停止しているサービスを起動する
      service:
        name: "{{ item.item }}"
        state: started
      loop: "{{ service_status.results }}"
      when: item.rc != 0
```

:::tip
`loop` + `register` の結果は `.results` というリストに格納されます。  
各要素には元のループ変数が `item.item` として保持されています。
:::

## 演習

1. `ansible_os_family` を使い、RedHat系には `vim-enhanced`、Debian系には `vim` をインストールするPlaybookを作成してください
2. `loop` を使って `alice` / `bob` / `carol` の3ユーザーをまとめて作成してください
3. `register` でnginxの起動状態を取得し、停止中の場合だけ起動するPlaybookを作成してください
4. `loop` + `register` を組み合わせ、複数パッケージのインストール結果を `debug` で表示してください
