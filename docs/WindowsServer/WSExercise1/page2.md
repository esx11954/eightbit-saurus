---
sidebar_position: 2
---

# 課題2 ADの管理

[課題1](./page1) で作成したWindowsServerを使い、以下の課題を実施してください  
課題が完了したら、完了したことがわかる簡単なスクリーンショットを講師へ提出しましょう  

## 課題2-1
ActiveDirectory環境へオブジェクトの追加と変更を実施します  
[こちら](../file/XX_ActiveDirectoryサーバ_環境定義書_課題2-1.xlsx) のファイルで赤字で記載されている項目を、表記通りに追加および変更してください  

## 課題2-2
以下の新たにサイトを作成してください  

| サイト名 | IPアドレス    | サブネットマスク | 
| -------- | ------------- | ---------------- | 
| Tokyo    | 192.168.100.0 | 255.255.255.0    | 
| Osaka    | 192.168.200.0 | 255.255.255.192  | 

## 課題2-3
ユーザを [こちら](../file/kadai2-3_template.csv) のCSVファイルを利用して一括登録します  
サンプルを参考にして、ユーザ情報をCSVへ記載し一括登録操作を実施してください  

### サンプル

- ドメイン名: eightbit.local
- OU: tokyo
- ユーザの属性: 通常のユーザ(512)

```title="サンプル"
DN,objectClass,displayName,userAccountControl,sn,givenName,userPrincipalName,sAMAccountName
"CN=test1,OU=tokyo,DC=eightbit,DC=local",user,テスト1,512,テスト,データ1,test_1,test_1
"CN=test2,OU=tokyo,DC=eightbit,DC=local",user,テスト2,512,テスト,データ2,test_2,test_2
"CN=test3,OU=tokyo,DC=eightbit,DC=local",user,テスト3,512,テスト,データ3,test_3,test_3
```

| DN                                     | objectClass | displayName | userAccountControl | sn　　  | givenName | userPrincipalName | sAMAccountName |
|----------------------------------------|-------------|-------------|--------------------|-----|-----------|-------------------|----------------|
| CN=test1,OU=tokyo,DC=eightbit,DC=local | user        | テスト1        | 512                | テスト | データ1      | test_1            | test_1         |
| CN=test2,OU=tokyo,DC=eightbit,DC=local | user        | テスト2        | 512                | テスト | データ2      | test_2            | test_2         |
| CN=test3,OU=tokyo,DC=eightbit,DC=local | user        | テスト3        | 512                | テスト | データ3      | test_3            | test_3         |

:::tip
**DN項目** の`DC`はドメイン名を `.` (ドット)区切りで複数記載します  
今回の場合、ドメイン名は `eightbit.local` なので  
DCを2つに分けて `eightbit` および `local` と記載します
```title="DC"
DC=eightbit,DC=local
```
:::

### ユーザ情報
ユーザ情報には存在しないOUが指定されています  
予め作成しておきましょう  
また、ログオン名は全バージョンを通して共通とします  

- #### ドメイン名
    各自指定したドメイン名

- #### 登録するユーザ

    | 名前                   | 表示名                 | 性             | 名      | ログオン名 | OU         | ユーザの属性  | 
    | ---------------------- | ---------------------- | -------------- | ------- | ---------- | ---------- | ------------- | 
    | オペレーション ユーザ6 | オペレーション ユーザ6 | オペレーション | ユーザ6 | opsuser6   | Operations | 通常のユーザ  | 
    | オペレーション ユーザ7 | オペレーション ユーザ7 | オペレーション | ユーザ7 | opsuser7   | Operations | 通常のユーザ  | 
    | オペレーション ユーザ8 | オペレーション ユーザ8 | オペレーション | ユーザ8 | opsuser8   | Operations | 通常のユーザ  | 
    | オペレーション ユーザ9 | オペレーション ユーザ9 | オペレーション | ユーザ9 | opsuser9   | Operations | 通常のユーザ  | 
    | HR ユーザ6             | HR ユーザ6             | HR             | ユーザ6 | hruser6    | HR         | 通常のユーザ  | 
    | HR ユーザ7             | HR ユーザ7             | HR             | ユーザ7 | hruser7    | HR         | 通常のユーザ  | 
    | HR ユーザ8             | HR ユーザ8             | HR             | ユーザ8 | hruser8    | HR         | 通常のユーザ  | 
    | HR ユーザ9             | HR ユーザ9             | HR             | ユーザ9 | hruser9    | HR         | 通常のユーザ  | 
    | 開発 管理者            | 開発 管理者            | 開発           | 管理者  | dev_admin  | Developer  | 管理者(66048) | 
    | 開発 ユーザ1           | 開発 ユーザ1           | 開発           | ユーザ1 | devuser1   | Developer  | 通常のユーザ  | 
    | 開発 ユーザ2           | 開発 ユーザ2           | 開発           | ユーザ2 | devuser2   | Developer  | 通常のユーザ  | 
    | 開発 ユーザ3           | 開発 ユーザ3           | 開発           | ユーザ3 | devuser3   | Developer  | 通常のユーザ  | 
    | 開発 ユーザ4           | 開発 ユーザ4           | 開発           | ユーザ4 | devuser4   | Developer  | 通常のユーザ  | 
    | 開発 ユーザ5           | 開発 ユーザ5           | 開発           | ユーザ5 | devuser5   | Developer  | 通常のユーザ  | 
    | 総務 管理者            | 総務 管理者            | 総務           | 管理者  | aff_admin  | Affairs    | 管理者(66048) | 
    | 総務 ユーザ1           | 総務 ユーザ1           | 総務           | ユーザ1 | affuser1   | Affairs    | 通常のユーザ  | 
    | 総務 ユーザ2           | 総務 ユーザ2           | 総務           | ユーザ2 | affuser2   | Affairs    | 通常のユーザ  | 

:::caution

`サーバー側のエラー "パスワードを更新できませんでした。新しいパスワードとして指定された値は、パスワードの長さ、複雑さ、または履歴に関するドメインの要件を満たしていません。"`

インポートコマンド実行時に上記エラーが発生する場合は  
以下のコマンドを `PowerShell` で実行して、再度インポートコマンドを実行してください  
分からない場合は講師へ連絡しましょう  

```
Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 0 -Identity <ドメイン名>
Set-ADDefaultDomainPasswordPolicy -ComplexityEnabled $false -Identity <ドメイン名>
```

`<ドメイン名>`は、各自が指定した **ドメイン名** へ置き換えましょう
:::

## 課題2-4
以下のユーザを **コマンド** を利用して追加してください  

| ユーザ名     | グループ | OU      | パスワード   | 
| ------------ | -------- | ------- | ------------ | 
| mente_admin1 | Users    | -       | M3nt34dmin@1 | 
| mente_admin2 | Users    | -       | M3nt34dmin@2 | 
| finuser6     | -        | Finance | P@ssw0rdd_   | 
