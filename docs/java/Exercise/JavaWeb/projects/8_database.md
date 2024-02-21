以下のプロジェクトをワークスペースにインポートしてください

| 項目名 | 値 |
| --- | --- |
| 動的webプロジェクト名 | database |
|||
| パッケージ名 | controller |
| サーブレット名 | DBServlet.java |
| URLマッピング | /DBServlet |
| メソッド・スタブ | ・継承された抽象メソッド ・doGet() ・oPost() |
|||
| パッケージ名 | dao |
| javaファイル | Dao.java |
|||
| パッケージ名 | dto |
| javaファイル | MessageDto.java |
|||
| パッケージ名 | filter |
| javaファイル | ReqFil.java |
| | ResFil.java |
|||
| パッケージ名 | service |
| javaファイル名 | DBAccess.java(インターフェース) |
| | Delete.java ← DBAccess.javaを実装 |
| | Insert.java ← DBAccess.javaを実装 |
| | Select.java ← DBAccess.javaを実装 |
|||
| JSPファイル名 | db.jsp |
|||
| CSSファイル | style.css |
| 画像ファイル | delete_icon_hover.png |
| | delete_icon.png |
| | user_icon.png |
| jarファイル | jstl-api-1.2.jar |
| | jstl-impl-1.2.jar |

![web](./Image/Image58.png)

既存プロジェクトをインポートし  
赤い四角で囲われたファイルを編集します

ファイルは作成済みなので必要箇所を追記してください

※JDBCドライバを使用するため以下の設定を行ってください

![web](./Image/Image59.png)

【Run】タブをクリック

![web](./Image/Image60.png)

【Run Configurations...】をクリック

![web](./Image/Image61.png)

【Classpath】タブをクリック

![web](./Image/Image62.png)

【User Entries】をクリック

![web](./Image/Image63.png)

【Ad External JARs...】をクリック

![web](./Image/Image64.png)

上記のjarファイルを選択して【開く】ボタン押下

![web](./Image/Image65.png)

右下の【Run】ボタンをクリック...終わり

次に、データベースの設定をします

database_sql.txtの中身をコピーし、MySQL Command Clientにペーストしましょう  
その後、useコマンドでjavawebに移動し、select文で全件抽出します  
以下のようになればOKです

![web](./Image/Image66.png)
![web](./Image/Image02.png)
実行時の画像

起動時(DBServlet.java)

![web](./Image/Image67.png)

入力欄に何も入れず、又は100文字以上入力して【POST】ボタン押下

![web](./Image/Image68.png)

ゴミ箱ボタンを押下

![web](./Image/Image69.png)

『テスト』と入力して【POST】ボタン押下

![web](./Image/Image70.png)

画像のように各ファイルを編集してください

DBServlet.java

![web](./Image/Image71.png)

Dao.java①

![web](./Image/Image72.png)

Dao.java②

![web](./Image/Image73.png)

Select.java

![web](./Image/Image74.png)

Insert.java

![web](./Image/Image75.png)

Delete.java

![web](./Image/Image76.png)

db.jsp

![web](./Image/Image77.png)
