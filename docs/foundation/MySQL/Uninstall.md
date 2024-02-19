---
sidebar_position: 2
---

## インストーラの起動




コマンドプロンプトを立ち上げ、 `mysql --version` を実行し、  
インストールされているMySQLのバージョンを確認して下さい  

![install](./img/uninstall_mysql/uninstall1.png)





Windows上で `MySQL` と検索し、**MySQL-8.x.x-winx64.msi** を起動します  
(**8.x.x**の箇所は上記で確認したものと同じバージョンであることを確認して下さい)

![install](./img/uninstall_mysql/installer.png)






もしインストーラが見つからない場合は以下のリンクから該当バージョンのインストーラをダウンロードし、それを実行しましょう  

[公式ダウンロードページ](https://dev.mysql.com/downloads/mysql/)


![install](./img/uninstall_mysql/uninstall2.png)





インストーラを実行すると以下の画面が表示されるので、  
``Next`` をクリックして次の画面に進みます


![install](./img/uninstall_mysql/uninstall4.png)





``Remove`` をクリック


![install](./img/uninstall_mysql/uninstall5.png)





``Remove`` をクリック  


![install](./img/uninstall_mysql/uninstall6.png)





削除処理が開始されますが、別画面として以下の画面が立ち上がるので  
**Remove the data directory** にチェックが入っていることを確認して`Next` をクリック  



![install](./img/uninstall_mysql/uninstall7.png)





``Execute`` をクリック  


![install](./img/uninstall_mysql/uninstall8.png)





しばらくすると以下の様に表示が変わるので、  
`Finish` をクリック


![install](./img/uninstall_mysql/uninstall9.png)





以下の画面が表示されたら`Finish` をクリック


![install](./img/uninstall_mysql/uninstall10.png)





以上でMySQLのアンインストールは完了です！