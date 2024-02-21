以下のプロジェクトをワークスペースにインポートしてください

| 項目名 | 値 |
| --- | --- |
| 動的webプロジェクト名 | beans |
|||
| パッケージ名 | servlet |
| サーブレット名(URLマッピング) | BeansServlet.java(/ BeansServlet) |
| | AddMenuServlet.java(/ AddMenuServlet) |
| | DeleteMenuServlet.java(/ DeleteMenuServlet) |
| メソッド・スタブ |・継承された抽象メソッド ・doGet() ・doPost() |
|||
| パッケージ名 | bean |
| javaファイル | FoodBean.java |
|||
| パッケージ名 | filter |
| javaファイル | EncodeFilter.java |
|||
| パッケージ名 | initialize |
| javaファイル | CreateMenu.java |
|||
| JSPファイル名 | beansTop.jsp |
| | edit.jsp |
|||
| CSSファイル | bean.css |
| 画像ファイル | menu.jpg |
| jarファイル | jstl-api-1.2.jar |
| | jstl-impl-1.2.jar |

![web](./Image/Image42.png)

既存プロジェクトをインポートし  
赤い四角で囲われたファイルを編集します

ファイルは作成済みなので必要箇所を追記してください

実行時の画像

起動時(BeanServlet.java)

![web](./Image/Image43.png)

ラーメンの【変更】ボタンを押下

![web](./Image/Image44.png)

編集画面で値段を700から800に変更して【確定】ボタン押下

![web](./Image/Image45.png)

編集画面で全て空白にして【確定】ボタン押下

![web](./Image/Image46.png)

編集画面で【削除】ボタンを押下

![web](./Image/Image47.png)

【メニューを追加する】ボタンを押下

![web](./Image/Image48.png)

入力画面で全て空欄のまま【確定ボタン】を押下

![web](./Image/Image49.png)

入力画面で適当に値を入力して【確定ボタン】を押下

![web](./Image/Image50.png)

【メニューを初期化する】ボタンを押下

![web](./Image/Image51.png)

画像のように各ファイルを編集してください

BeanServlet.java(doPost)

![web](./Image/Image52.png)


AddMenuServlet.java(doPost)

![web](./Image/Image53.png)

DeleteMenuServlet.java(doGet)

![web](./Image/Image54.png)

CreateMunu.java(createMenuList)

![web](./Image/Image55.png)

beansTop.jsp

![web](./Image/Image56.png)

edit.jsp

![web](./Image/Image57.png)
