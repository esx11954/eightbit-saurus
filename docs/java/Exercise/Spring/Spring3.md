---
sidebar_position: 3
---

# Spring 課題3




<details>
  <summary>環境構築</summary>
  <div>
    <details>
        <summary>データベース作成</summary>
        <div>



#### 1. 以下のリンクからpython**3.x系**をインストールして下さい  
[python 公式](https://www.python.org/)



#### 2. python がインストールされていることを確認して下さい  
コマンドプロンプトを開き、`python -V`を実行し、  
以下のような表示が出力されることを確認

```
C:\Users>python -V
Python 3.11.4
```

***※バージョン部分は異なる場合があります***



#### 3. 以下のリンクからリポジトリをzipで任意のフォルダにダウンロードして下さい
[bookdb-py](https://github.com/esx11954/bookdb-py)

ダウンロード後上記リンクの**readme.md**を参照し、  
ユーザの設定及び必要モジュールのインストールを行い、  
ローカル環境にデータベースを作成して下さい
        </div>
    </details>

    <details>
        <summary>プロジェクトインポート</summary>
        <div>

#### 1. 課題用リポジトリリソースをダウンロード  
以下のリンクから課題用リポジトリリソースをzipでダウンロードして下さい 
 
[課題用リソース](https://github.com/esx11954/books/archive/refs/heads/booksExam.zip)



#### 2. Eclipseにインストール 
ダウンロードしたzipを展開後、  
Eclipseから展開したフォルダ内のプロジェクトをインポートして下さい 
![import](./img/eclipse-import1.png)



#### 3. 動作確認 
インポートが完了したらプロジェクトを実行し、  
以下の画面が表示されることを確認して下さい
![login](./img/login.png)

        </div>
    </details>


    <details>
        <summary>ログイン</summary>
        <div>

このプロジェクトは書籍管理を目的としたシステムです
管理者はこのシステムにサインインし、各種機能を利用すると想定します  

以下の認証情報でログインし、履歴一覧ページが表示されることを確認して下さい  
ログインできない場合はDBが正常に作成されていない可能性があります  

#### 認証情報  

| メールアドレス | eightbit@eightbit.co.jp |
|---|---|
| **パスワード** | **eightbit** |

        </div>
    </details>



  </div>
</details>

    <details>
        <summary>課題概要</summary>
        <div>

このシステムには以下3つの一覧画面が用意されており、  
それぞれが詳細ページ及び更新用モーダルを持ちます  
書籍、ユーザ一覧画面は新規登録画面が用意されています  

- **履歴一覧画面**
    - 履歴詳細画面
        - データ更新用モーダル



- **書籍一覧画面**
    - 新規書籍登録画面
    - 書籍詳細画面
        - データ更新用モーダル
        - 書籍貸出手続き画面



- **ユーザ一覧画面**
    - 新規ユーザ登録画面
    - ユーザ詳細画面
        - データ更新用モーダル



インポートしたプロジェクトの**serviceパッケージ内のファイル**を修正(機能を実装)することでシステムが正常に動作するようになります  

修正対象ファイルは以下の3つです  
- <em>/books/src/main/java/com/eightbit/books/service/UserService.java</em>
- <em>/books/src/main/java/com/eightbit/books/service/BookService.java</em>
- <em>/books/src/main/java/com/eightbit/books/service/HistoryService.java</em>



### ポイント
---
例えば検索機能を実装する場合、  
検索ボタンをクリックしたタイミングで  
1. どのコントローラのどのメソッドにリクエストが飛ぶか
2. そのメソッドは引数として何をどのような型で受け取るか
3. そのメソッド内ではどのような処理が行われるか(serviceクラスのどのメソッドが呼ばれるか)
4. サービスクラスのメソッドは引数として何をどのような型で受け取るか
5. サービスクラスのメソッドは最終的な戻り値として何を返却すればいいのか
6. DBから何のデータを問い合わせる必要があるのか
7. DBに問い合わせる際、どのメソッドを使用するか  
8. 戻り値が必要ない場合は何をもって処理終了とするか  

等を考える必要があります  
ユーザ視点の画面の動き、修正対象メソッドの前後の処理の繋がりを意識しましょう  
また、余裕があればModelオブジェクトの持つデータがThymeleafでどのようにパースされるかを確認しましょう

        </div>
    </details>