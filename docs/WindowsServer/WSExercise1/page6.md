---
sidebar_position: 6
---

# 課題5 DNSとIIS

## 前提
1. 以下の仮想マシン(WindowsServer)を用意してください
 - [課題1](../page1) で作成したAD用のWindowsServer(以下、ADサーバ)

2. ​上記サーバへ以下のソフトウェアをインストールしてください
   - [.NET Core ホスティング バンドル](https://learn.microsoft.com/ja-jp/aspnet/core/host-and-deploy/iis/hosting-bundle)

:::tip
`.NET Core ホスティング バンドル` はIIS上で **ASP.NET Core** で開発されたWebアプリケーションを動作させる *ランタイム* です  
インストールに関して不明点がある場合は、講師へ連絡しましょう
:::

-----

## 課題5-1
ADサーバへ以下のようにDNSを構成し、IISでWebページを公開してください 
公開されたWebページは、**ADサーバ** と **クライアントPC** で閲覧できるよう設定しましょう   
​
また、必要に応じてファイアーウォールの設定を変更してください

### DNS

#### 新規 Aレコード

| 項目     | 設定値            |
| ------ | -------------- |
| ドメイン   | webapp.local   |
| サブドメイン | www            |
| IPアドレス | ＜ADサーバのIPアドレス＞ |


### Webページ

| 項目   | 設定値              |
| ---- | ---------------- |
| サイト名 | WebApp           |
| ホスト名 | www.webapp.local |
| 資材   | ＜[こちら](../file/WebSampleProject.zip) を指定＞        |
| ポート  | 80             |