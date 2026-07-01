# Vault演習

## 1. Ansible Vaultとは

Playbookや変数ファイルにはパスワード・APIキー・秘密鍵などの機密情報を含む場合があります。  
これらをそのままファイルに書くとGitリポジトリへの誤コミットなどでの情報漏洩リスクがあります。

**Ansible Vault** は、ファイルや変数を暗号化して安全に管理するための機能です。

```
【Vaultなし】
group_vars/web.yml:
  db_password: mysecretpassword123  ← 平文で丸見え

【Vaultあり】
group_vars/web.yml:
  db_password: !vault |
    $ANSIBLE_VAULT;1.1;AES256
    62386439636...（暗号化された文字列）
```

## 2. ファイルの暗号化

### ファイル全体を暗号化する

```bash
ansible-vault encrypt group_vars/secret.yml
```

パスワードの入力を求められます。

```
New Vault password:           ← 暗号化パスワードを入力
Confirm New Vault password:   ← 確認のため再入力
Encryption successful
```

暗号化後のファイルはこのような形式になります。

```
$ANSIBLE_VAULT;1.1;AES256
62386439636132396438623839623265326162316535613839376130323937393562
...
```

### 暗号化ファイルの内容を確認する

```bash
ansible-vault view group_vars/secret.yml
```

### 暗号化ファイルを編集する

```bash
ansible-vault edit group_vars/secret.yml
```

パスワードを入力するとエディタが起動し、復号された状態で編集できます。

### 暗号化を解除する

```bash
ansible-vault decrypt group_vars/secret.yml
```

## 3. 変数の安全な管理

機密情報だけを別ファイルに分離し、そのファイルだけ暗号化するのが一般的なパターンです。

### ディレクトリ構成

```
~/ansible-practice/
├── group_vars/
│   ├── web.yml          ← 通常の変数（暗号化不要）
│   └── web_vault.yml    ← 機密情報のみ（暗号化する）
└── site.yml
```

### 通常の変数ファイル（平文）

`group_vars/web.yml`

```yaml
package_name: nginx
http_port: 80
db_host: db.example.com
db_name: myapp_production
db_user: appuser
db_password: "{{ vault_db_password }}"  ← Vault変数を参照
```

### 機密情報のファイル（暗号化対象）

`group_vars/web_vault.yml`（暗号化前）

```yaml
vault_db_password: mysecretpassword123
vault_api_key: sk-xxxxxxxxxxxxxxxxxxxx
```

このファイルを暗号化します。

```bash
ansible-vault encrypt group_vars/web_vault.yml
```

Vaultで定義した変数は `vault_` プレフィックスを付けるのが慣習です。  
平文ファイルから `"{{ vault_変数名 }}"` で参照することで、どの値が機密情報かひと目でわかります。

## 4. Vault付きのPlaybook実行

Vaultで暗号化されたファイルを含むPlaybookを実行するには、復号パスワードを渡す必要があります。

### パスワードをインタラクティブに入力する

```bash
ansible-playbook -i inventory site.yml --ask-vault-pass
```

実行時にパスワードの入力を求められます。

```
Vault password:
```

### パスワードファイルを使う（CI/CD向け）

```bash
# パスワードをファイルに保存（パーミッションを制限する）
echo "mysecretvaultpass" > ~/.vault_pass
chmod 600 ~/.vault_pass

# パスワードファイルを指定して実行
ansible-playbook -i inventory site.yml --vault-password-file ~/.vault_pass
```

:::danger
`~/.vault_pass` はGitに絶対コミットしないでください。  
`.gitignore` に追加して管理します。

```
# .gitignore
.vault_pass
*.vault_pass
```
:::

## 5. 個別変数の暗号化（ansible-vault encrypt_string）

ファイル全体ではなく、特定の変数値だけを暗号化することもできます。

```bash
ansible-vault encrypt_string 'mysecretpassword123' --name 'db_password'
```

出力された暗号化文字列をそのまま変数ファイルに貼り付けます。

```yaml
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  62386439636132396438623839623265326162316535613839376130323937393562...
```

## 演習

1. `group_vars/web_vault.yml` を作成し、`vault_db_password: password123` を定義してください。そのファイルを `ansible-vault encrypt` で暗号化してください
2. `group_vars/web.yml` に `db_password: "{{ vault_db_password }}"` を定義し、`debug` モジュールで値が展開されることを確認してください
3. `--ask-vault-pass` を付けずに実行した場合にどうなるか確認してください
4. `ansible-vault encrypt_string` を使って特定の文字列を暗号化し、変数ファイルに直接貼り付けてください
