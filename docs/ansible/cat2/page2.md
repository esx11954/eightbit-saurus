# Playbook基礎

## 1. Playbookとは

**Playbook** はAnsibleの自動化手順をYAML形式で記述したファイルです。  
Ad-hocコマンドと異なり、複数の操作を順番に定義してファイルに保存できるため、繰り返し実行・再利用が可能です。

```
Playbook = 「何を」「どのサーバに」「どの順番で」行うかを記したレシピ
```

## 2. YAML記法の基礎

PlaybookはYAML（YAML Ain't Markup Language）形式で記述します。  
最低限必要な記法を確認します。

### インデント

YAMLはインデント（字下げ）で階層構造を表します。**スペース2つ**が一般的です。  
タブ文字は使用不可です。

```yaml
# 正しい例（スペース2つ）
parent:
  child: value

# 誤った例（タブ文字）
parent:
	child: value  # エラーになる
```

### リスト

ハイフン（`-`）でリスト要素を表します。

```yaml
fruits:
  - apple
  - banana
  - cherry
```

### マッピング（キーと値）

コロン（`:`）でキーと値を区切ります。

```yaml
name: nginx
state: present
port: 80
```

### コメント

`#` 以降はコメントとして扱われます。

```yaml
# これはコメントです
name: nginx  # インラインコメントも可能
```

## 3. Playbookの構造

Playbookは以下の構造で記述します。

```yaml
---
- name: Playbookの説明
  hosts: 対象グループ
  become: true

  tasks:
    - name: タスクの説明
      モジュール名:
        引数1: 値1
        引数2: 値2

    - name: 次のタスク
      モジュール名:
        引数: 値
```

| キー | 説明 |
|------|------|
| `---` | YAMLファイルの開始を示す（省略可だが慣習的に書く） |
| `name` | Playbook・タスクの説明（任意の文字列） |
| `hosts` | 対象ホスト・グループ名（インベントリと対応） |
| `become` | `true` にするとsudo権限で実行 |
| `tasks` | 実行するタスクの一覧 |

## 4. はじめてのPlaybook

nginxをインストールして起動するPlaybookを作成します。

`~/ansible-practice/nginx.yml` を以下の内容で作成します。

```yaml
---
- name: nginxのセットアップ
  hosts: web
  become: true

  tasks:
    - name: nginxをインストールする
      package:
        name: nginx
        state: present

    - name: nginxを起動して自動起動を有効にする
      service:
        name: nginx
        state: started
        enabled: true
```

## 5. Playbookの実行

`ansible-playbook` コマンドでPlaybookを実行します。

```bash
ansible-playbook -i inventory nginx.yml
```

正常に実行されると以下のような出力が表示されます。

```
PLAY [nginxのセットアップ] ***************************************

TASK [Gathering Facts] *******************************************
ok: [node1]
ok: [node2]

TASK [nginxをインストールする] *************************************
changed: [node1]
changed: [node2]

TASK [nginxを起動して自動起動を有効にする] *****************************
changed: [node1]
changed: [node2]

PLAY RECAP *******************************************************
node1 : ok=3  changed=2  unreachable=0  failed=0
node2 : ok=3  changed=2  unreachable=0  failed=0
```

### 実行結果のステータス

| ステータス | 色 | 意味 |
|-----------|-----|------|
| `ok` | 緑 | 変更不要（すでに望ましい状態） |
| `changed` | 黄 | 変更を行った |
| `failed` | 赤 | エラーが発生した |
| `unreachable` | 赤 | ホストに接続できなかった |

## 6. 冪等性とは

**冪等性（べきとうせい）** とは、「何度実行しても結果が同じになる」という性質です。  
Ansibleのモジュールは冪等性を持つように設計されています。

### 確認してみる

nginxが既にインストール・起動済みの状態で、もう一度同じPlaybookを実行します。

```bash
ansible-playbook -i inventory nginx.yml
```

```
TASK [nginxをインストールする] *************************************
ok: [node1]    ← changed ではなく ok になる
ok: [node2]

TASK [nginxを起動して自動起動を有効にする] *****************************
ok: [node1]    ← すでに起動済みなので変更なし
ok: [node2]
```

| 実行回数 | 結果 |
|---------|------|
| 1回目 | `changed`（変更あり） |
| 2回目以降 | `ok`（変更なし） |

冪等性のおかげで、Playbookを繰り返し実行しても安全です。

:::tip
冪等性は自動化において非常に重要な概念です。  
「すでに適用済みかどうか」をチェックせずに何度でも安全に実行できるため、  
定期実行や障害復旧時の再適用が容易になります。
:::

## 演習

1. `httpd`（Apache）をインストールして起動するPlaybookを作成・実行してください
2. 同じPlaybookを2回実行し、2回目の出力が `ok` になることを確認してください
3. Playbookに `firewalld` でHTTPポートを開放するタスクを追加してください（モジュール名: `firewalld`）
