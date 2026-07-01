# エラーハンドリング演習

## 1. Ansibleのデフォルトエラー動作

Ansibleはデフォルトで、あるホストでタスクが失敗（`failed`）すると、  
そのホストに対する以降のタスクをすべて中断します。

```
node1: Task1 → Task2 → Task3（失敗）→ Task4以降はスキップ
node2: Task1 → Task2 → Task3 → Task4（通常通り継続）
```

この動作をカスタマイズするのがエラーハンドリングです。

## 2. ignore_errors（エラーを無視して続行）

`ignore_errors: true` を付けると、タスクが失敗しても次のタスクに進みます。

```yaml
tasks:
  - name: サービスの状態を確認する
    command: systemctl status nginx
    ignore_errors: true

  - name: 次のタスクは実行される
    debug:
      msg: "前のタスクが失敗しても実行されます"
```

### 使いどころ

```yaml
tasks:
  - name: 古い設定ファイルを削除する（存在しなくてもOK）
    file:
      path: /etc/nginx/conf.d/old.conf
      state: absent
    ignore_errors: true

  - name: 新しい設定ファイルを配置する
    template:
      src: templates/nginx.conf.j2
      dest: /etc/nginx/conf.d/custom.conf
```

:::tip
`ignore_errors` は「失敗を想定内として扱う」場合に使います。  
すべてのタスクに付けるのは避け、本当に無視してよい場合に限定しましょう。
:::

## 3. failed_when（失敗条件のカスタマイズ）

`failed_when` を使うと、「どの条件のときに失敗とみなすか」を自分で定義できます。

### デフォルト動作との比較

```yaml
# デフォルト: コマンドのリターンコードが非0なら失敗
- name: プロセスを確認する
  command: pgrep nginx
  register: result

# failed_when: 独自の条件で失敗を判定
- name: プロセスを確認する
  command: pgrep nginx
  register: result
  failed_when: result.rc != 0 and result.rc != 1
```

### 出力内容で失敗を判定する

```yaml
- name: ディスク使用率を確認する
  command: df -h /
  register: disk_info

- name: ディスク使用率が90%以上なら失敗とする
  command: df / --output=pcent
  register: disk_percent
  failed_when: "'9' in disk_percent.stdout or '100' in disk_percent.stdout"
```

### registerとの組み合わせ

```yaml
tasks:
  - name: サービスの状態を取得する
    command: systemctl is-active nginx
    register: nginx_status
    failed_when: false    ← 常に失敗しない（ignore_errorsの代替）

  - name: サービスが停止中ならエラーにする
    fail:
      msg: "nginxが起動していません！"
    when: nginx_status.stdout != "active"
```

`fail` モジュールを使うと、任意のタイミングでPlaybookを明示的に失敗させられます。

## 4. debugモジュールの活用

`debug` モジュールはトラブルシューティングに欠かせないモジュールです。

### 変数の中身を確認する

```yaml
- name: 変数の内容を表示する
  debug:
    var: ansible_os_family

- name: registerした結果を表示する
  command: cat /etc/os-release
  register: os_info

- name: コマンド結果を表示する
  debug:
    var: os_info.stdout_lines
```

### メッセージを表示する

```yaml
- name: ホスト情報を表示する
  debug:
    msg: "{{ inventory_hostname }} のIPアドレス: {{ ansible_default_ipv4.address }}"
```

### verbosityで表示レベルを制御する

```yaml
- name: 詳細なデバッグ情報（-vv以上のときだけ表示）
  debug:
    var: hostvars
    verbosity: 2
```

```bash
# 通常実行（verbosity: 2 のdebugは非表示）
ansible-playbook -i inventory site.yml

# -vv 付きで実行（verbosity: 2 のdebugが表示される）
ansible-playbook -i inventory site.yml -vv
```

### verbosityオプション一覧

| オプション | 詳細度 |
|-----------|--------|
| なし | 通常の出力 |
| `-v` | タスク結果の詳細 |
| `-vv` | 設定ファイルの読み込み情報 |
| `-vvv` | SSH接続の詳細 |
| `-vvvv` | 接続プラグインのデバッグ情報 |

## 5. block / rescue / always（try-catch構文）

複数タスクをまとめてエラーハンドリングするには `block` を使います。  
プログラミングの try-catch-finally に相当します。

```yaml
tasks:
  - block:
      - name: nginxをインストールする
        package:
          name: nginx
          state: present

      - name: 設定ファイルを配置する
        template:
          src: templates/nginx.conf.j2
          dest: /etc/nginx/conf.d/custom.conf

      - name: nginxを起動する
        service:
          name: nginx
          state: started

    rescue:
      - name: エラーが発生した場合の通知
        debug:
          msg: "セットアップ中にエラーが発生しました: {{ ansible_failed_task.name }}"

    always:
      - name: 常に実行される後処理
        debug:
          msg: "セットアップ処理が完了しました（成否に関わらず）"
```

| セクション | 実行タイミング |
|-----------|----------------|
| `block` | 通常のタスク群 |
| `rescue` | `block` 内でエラーが発生した場合 |
| `always` | 成功・失敗に関わらず常に実行 |

## 演習

1. `ignore_errors: true` を付けて、存在しないファイルの削除を試み、次のタスクが継続して実行されることを確認してください
2. `failed_when` を使い、コマンドの出力に特定の文字列が含まれる場合だけ失敗とみなすPlaybookを作成してください
3. `debug` モジュールで `ansible_default_ipv4.address` と `ansible_memtotal_mb` を表示してください
4. `block` / `rescue` / `always` を使い、タスクが失敗した場合にエラーメッセージが出力されるPlaybookを作成してください
