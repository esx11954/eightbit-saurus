# 変数の基礎

## 1. 変数を使う理由

cat2で作成したPlaybookは、値がすべて直書き（ハードコード）されていました。

```yaml
# 値が直書きされている例
- name: nginxをインストールする
  package:
    name: nginx      ← 直書き
    state: present
```

これでは環境（dev / prod）や用途が変わるたびにPlaybook自体を書き換える必要があります。  
**変数** を使うことで、Playbookの構造はそのままに、値だけを差し替えられるようになります。

```
変数なし: 環境ごとにPlaybookをコピー・修正 → 管理が煩雑
変数あり: Playbookは1つ、変数ファイルだけ環境別に用意 → スッキリ
```

## 2. vars（インラインの変数定義）

Playbook内に直接変数を定義する方法です。小規模・シンプルな場合に使います。

### 書き方

```yaml
---
- name: 変数のサンプル
  hosts: web
  become: true
  vars:
    package_name: nginx
    http_port: 8080

  tasks:
    - name: パッケージをインストールする
      package:
        name: "{{ package_name }}"
        state: present
```

| 項目 | 説明 |
|------|------|
| `vars:` | 変数を定義するセクション |
| `変数名: 値` | 変数名と値をセットで定義 |
| `"{{ 変数名 }}"` | 変数を参照する書き方（Jinja2記法） |

:::tip
変数を参照する `{{ }}` は、文字列の中で使うときは必ず `"` で囲みます。  
値全体が `{{ }}` だけの場合は省略可能ですが、混在する場合は必須です。

```yaml
name: "{{ package_name }}"        # OK
name: "install {{ package_name }} now"  # OK（文字列の一部）
name: {{ package_name }}           # NG（引用符なし）
```
:::

## 3. Inventory変数

インベントリファイルでホスト・グループごとに変数を定義できます。

### host_vars（ホスト別変数）

特定のホストにのみ適用される変数を定義します。

```
~/ansible-practice/
├── inventory
├── host_vars/
│   ├── node1.yml    ← node1専用の変数
│   └── node2.yml    ← node2専用の変数
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

### group_vars（グループ別変数）

グループ全体に適用される変数を定義します。

```
~/ansible-practice/
├── inventory
├── group_vars/
│   └── web.yml    ← webグループ全体の変数
```

`group_vars/web.yml`

```yaml
package_name: nginx
document_root: /usr/share/nginx/html
```

### 変数の優先順位

同じ変数名が複数箇所で定義されている場合、優先度の高い方が有効になります。

```
低 ←─────────────────────────────────────────────── 高

group_vars < host_vars < vars（Playbook内） < コマンドライン引数
```

## 4. 変数を使ったPlaybookの例

`group_vars/web.yml` と `host_vars/` を組み合わせた例です。

`group_vars/web.yml`

```yaml
package_name: nginx
```

`host_vars/node1.yml`

```yaml
http_port: 8081
```

`host_vars/node2.yml`

```yaml
http_port: 8082
```

`webserver.yml`

```yaml
---
- name: Webサーバのセットアップ
  hosts: web
  become: true

  tasks:
    - name: パッケージをインストールする
      package:
        name: "{{ package_name }}"
        state: present

    - name: ポート番号を確認する
      debug:
        msg: "{{ inventory_hostname }} のポートは {{ http_port }} です"
```

実行すると、ノードごとに異なる変数が適用されます。

```
TASK [ポート番号を確認する] ***************************************
ok: [node1] => {
    "msg": "node1 のポートは 8081 です"
}
ok: [node2] => {
    "msg": "node2 のポートは 8082 です"
}
```

:::tip
`inventory_hostname` はAnsibleが自動的に用意する **マジック変数** のひとつで、  
現在処理中のホスト名が格納されています。定義しなくてもすぐ使えます。
:::

## 演習

1. `vars` を使ってパッケージ名を変数化し、nginxをインストールするPlaybookを作成してください
2. `group_vars/web.yml` を作成し、`package_name` を定義してPlaybookから参照してください
3. `host_vars/node1.yml` と `host_vars/node2.yml` にそれぞれ異なる `http_port` を定義し、`debug` モジュールで各ノードのポート番号を表示してください
