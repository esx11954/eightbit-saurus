# JDBC

## 1. はじめに  

この研修では、Javaアプリケーションからデータベースを操作するための標準的なAPIであるJDBC（Java Database Connectivity）について、その基本から実践的な使い方までを学習します。  
Java 17環境でMySQLデータベースと連携し、IDE（Eclipseなど）を使用せずコマンドラインから操作する方法に焦点を当てて解説します。  

## 2. JDBCとは  

JDBCは、Javaプログラムからデータベースへ接続し、SQL（Structured Query Language）を実行するためのAPI（Application Programming Interface）です。  
これにより、Javaアプリケーションは特定のデータベースシステムに依存せず、標準的な方法でデータ操作を行えるようになります。  

### 2.1. JDBCの役割  

*   **データベース接続の抽象化**: データベースの種類（MySQL, PostgreSQL, Oracleなど）が異なっても、Javaアプリケーション側は同じJDBC APIを使って操作できます。  
*   **データ操作の標準化**: SQL文の実行、結果の取得など、データベース操作の基本的な流れがJDBCによって標準化されています。  

### 2.2. JDBCドライバとは  

JDBCドライバは、各データベースベンダー（MySQL、Oracleなど）が提供する、JDBC APIの実装です。  Javaアプリケーションが特定のデータベースと通信するためには、そのデータベースに対応するJDBCドライバが必要です。  
JDBCドライバは通常、`.jar`ファイルとして提供されます。  

## 3. JDBCの主要コンポーネント  

JDBCを使ったデータベース操作では、いくつかの重要なインターフェースやクラスが登場します。  
これらはデータベース接続からデータ取得までの一連のプロセスを管理します。  

| コンポーネント | 型       | 役割                                                                                                   |
| :------------- | :------- | :----------------------------------------------------------------------------------------------------- |
| `DriverManager` | クラス   | JDBCドライバのロードと管理を行い、データベースへの`Connection`オブジェクトを取得する起点となります。 |
| `Connection`   | インターフェース | 確立されたデータベースとのセッション（接続）を表します。  SQL文の作成やトランザクション管理を行います。 |
| `Statement`    | インターフェース | 静的なSQL文（パラメータを含まない固定のSQL）を実行するためのオブジェクトです。                       |
| `PreparedStatement` | インターフェース | プレースホルダ`?`を使用して動的なSQL文（パラメータ化されたSQL）を実行するためのオブジェクトです。  SQLインジェクション攻撃対策にも有効です。 |
| `ResultSet`    | インターフェース | `SELECT`文の実行結果（クエリ結果セット）を保持し、その結果からデータを取得するために使用されます。 |
| `SQLException` | クラス   | JDBC操作中に発生する可能性のあるデータベース関連のエラーを表す例外クラスです。                       |

### 3.1. `Statement` と `PreparedStatement` の比較  

SQL文の実行には主に`Statement`と`PreparedStatement`の2種類があります。  `PreparedStatement`の利用が強く推奨されます。  

| 特徴           | `Statement`                                 | `PreparedStatement`                                     |
| :------------- | :------------------------------------------ | :------------------------------------------------------ |
| **SQLの形式**  | SQL文全体を文字列として渡す。               | パラメータ部分を`?`で置き換えたSQLテンプレートを使用。  |
| **安全性**     | SQLインジェクション攻撃のリスクが高い。     | プレースホルダにより、SQLインジェクション対策になる。   |
| **パフォーマンス** | 同じSQLを複数回実行する場合、毎回コンパイルが必要なため非効率。 | 一度プリコンパイルされ、パラメータだけを差し替えるため効率的。 |
| **可読性**     | パラメータが多いとSQL文字列が複雑になりやすい。 | パラメータ設定が明確で、可読性が高い。                  |

## 4. MySQLとの連携準備  

JavaアプリケーションからMySQLデータベースを操作するために、以下の準備が必要です。  

### 4.1. MySQL Community Serverのインストール  

MySQLがインストールされていない場合は、まずMySQL Community Serverをダウンロードしてインストールしてください。  
インストールの際に、ルートユーザーのパスワードを設定します。  

*   **ダウンロード**: [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/) から適切なバージョンを選択してください。  
*   **インストール後の確認**: コマンドプロンプトやターミナルで以下のコマンドを実行し、MySQLサーバーに接続できることを確認します。  
    ```bash
    mysql -u root -p
    # パスワードを入力
    ```
    `mysql>` プロンプトが表示されれば成功です。  終了するには `exit;` と入力します。  

### 4.2. データベースとテーブルの作成  

JDBCで操作するデータベースとテーブルを作成します。  
ここでは例として、`jdbc_sample_db`というデータベースと、`users`というテーブルを作成します。  

1.  MySQLサーバーに接続します。  
    ```bash
    mysql -u root -p
    ```

2.  データベースを作成します。  
    ```sql
    CREATE DATABASE jdbc_sample_db;  
    ```

3.  作成したデータベースを使用します。  
    ```sql
    USE jdbc_sample_db;  
    ```

4.  `users`テーブルを作成します。  
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT
    );  
    ```

5.  テストデータをいくつか挿入しておきます。  
    ```sql
    INSERT INTO users (name, age) VALUES ('Alice', 30);  
    INSERT INTO users (name, age) VALUES ('Bob', 24);  
    INSERT INTO users (name, age) VALUES ('Charlie', 35);  
    ```

6.  データが挿入されたことを確認します。  
    ```sql
    SELECT * FROM users;  
    ```
    確認後、`exit;`でMySQLを終了します。  

### 4.3. MySQL Connector/J（JDBCドライバ）のダウンロードと配置  

MySQL Connector/Jは、MySQLデータベース用のJDBCドライバです。  
これをJavaプロジェクトに含める必要があります。  

1.  **ダウンロード**: [MySQL Connector/J Downloads](https://dev.mysql.com/downloads/connector/j/) から、プラットフォーム非依存の`.zip`または`.tar.gz`ファイルをダウンロードします。  
2.  **展開**: ダウンロードしたファイルを展開します。  展開されたディレクトリ内に、`mysql-connector-j-x.x.x.jar`のような名前のファイルがあります（`x.x.x`はバージョン番号）。  
3.  **配置**: この`.jar`ファイルを、Javaプロジェクトのルートディレクトリに`lib`などの名前でディレクトリを作成し、その中に配置することをお勧めします。  
    ```
    your_jdbc_project/
    ├── src/
    │   └── JdbcExample.java
    └── lib/
        └── mysql-connector-j-x.x.x.jar  
    ```

## 5. JDBCを使ったデータベース操作の基本手順  

JDBCを使ってデータベースを操作する際の基本的な流れは以下のステップに従います。  

### ステップ1: JDBCドライバのロード（オプション）  

Java 6以降では、JDBC 4.0の仕様により、`DriverManager.getConnection()`が自動的に適切なドライバを検出してロードするため、明示的に`Class.forName()`を呼び出す必要はありません。  
しかし、古いバージョンとの互換性や、どのドライバを使用しているかを明示するために記述されることもあります。  

```java
// Java 6以降では通常不要だが、記述しても問題ない
Class.forName("com.mysql.cj.jdbc.Driver");  
```
`com.mysql.cj.jdbc.Driver`はMySQL Connector/Jの新しいドライバクラス名です。  
古いバージョンでは`com.mysql.jdbc.Driver`が使われていました。  

### ステップ2: データベースへの接続  

`DriverManager.getConnection()`メソッドを使用してデータベースへの接続を確立し、`Connection`オブジェクトを取得します。  

```java
String url = "jdbc:mysql://localhost:3306/jdbc_sample_db";  
String user = "root";  
String password = "your_mysql_password"; // MySQLのrootパスワード  

Connection connection = DriverManager.getConnection(url, user, password);  
```
*   **JDBC URLのフォーマット**: `jdbc:サブプロトコル:サブ名://ホスト名:ポート番号/データベース名`  
    *   `jdbc:mysql://`はMySQL用のJDBCドライバを使用することを示します。  
    *   `localhost:3306`はデータベースサーバーのアドレスとポート番号です（デフォルト）。  
    *   `jdbc_sample_db`は接続するデータベース名です。  

### ステップ3: SQL文の作成と実行  

`Connection`オブジェクトから`Statement`または`PreparedStatement`オブジェクトを作成し、SQL文を実行します。  

*   **`Statement`の場合**:  
    ```java
    Statement statement = connection.createStatement();  
    String sql = "SELECT * FROM users";  
    ResultSet resultSet = statement.executeQuery(sql); // SELECT文の実行
    // int affectedRows = statement.executeUpdate(sql); // INSERT, UPDATE, DELETE文の実行
    ```

*   **`PreparedStatement`の場合（推奨）**:  
    ```java
    String sql = "INSERT INTO users (name, age) VALUES (?, ?)";  
    PreparedStatement pstmt = connection.prepareStatement(sql);  
    pstmt.setString(1, "David"); // 1番目のプレースホルダに値を設定
    pstmt.setInt(2, 28);   // 2番目のプレースホルダに値を設定
    int affectedRows = pstmt.executeUpdate(); // INSERT, UPDATE, DELETE文の実行
    // ResultSet resultSet = pstmt.executeQuery(); // SELECT文の場合
    ```
    `setXXX()`メソッド（例: `setString`, `setInt`）を使用して、プレースホルダに適切なデータ型の値を設定します。  

### ステップ4: 結果セットの処理（SELECTの場合）  

`SELECT`文を実行した場合、結果は`ResultSet`オブジェクトとして返されます。  

```java
while (resultSet.next()) { // 結果セットの次の行に移動
    int id = resultSet.getInt("id");      // カラム名でint値を取得
    String name = resultSet.getString("name"); // カラム名でString値を取得
    int age = resultSet.getInt("age");    // カラム名でint値を取得
    System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age);  
}  
```
`next()`メソッドは、次の行が存在すれば`true`を返し、カーソルをその行に移動します。  
`getXXX()`メソッド（例: `getInt`, `getString`）を使用して、現在の行から指定されたカラムの値を取得します。  

### ステップ5: リソースの解放  

データベース接続や`Statement`、`ResultSet`などのリソースは、使用後に必ず解放する必要があります。  
これは、リソースリークを防ぎ、システムの安定性を保つために非常に重要です。  
Java 7以降では、`try-with-resources`文を使用することで、リソースが自動的に閉じられるため、手動での`close()`呼び出しが不要になり、より安全で簡潔なコードになります。  

```java
// try-with-resources を使用した例
try (Connection connection = DriverManager.getConnection(url, user, password);
     Statement statement = connection.createStatement();
     ResultSet resultSet = statement.executeQuery("SELECT * FROM users")) {

    // データベース操作

} catch (SQLException e) {
    e.printStackTrace();
}  
```
`try-with-resources`文は、括弧内に宣言されたリソースが`try`ブロックの終了時に自動的に閉じられることを保証します。  
リソースは開かれた順序と逆の順序で閉じられます。  

## 6. コード例とコマンドラインからの実行  

ここでは、実際にJDBCを使ってデータベースからデータを取得する例と、データを挿入する例を、コマンドラインからコンパイル・実行する方法とともに示します。  

### 6.1. データ取得の例 (`JdbcSelectExample.java`)  

`src`ディレクトリに以下のファイルを作成します。  

```java
// src/JdbcSelectExample.java
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.sql.Statement;  

public class JdbcSelectExample {  

    // MySQL接続情報
    private static final String DB_URL = "jdbc:mysql://localhost:3306/jdbc_sample_db";  
    private static final String DB_USER = "root";  
    private static final String DB_PASSWORD = "your_mysql_password"; // ★ここを実際のパスワードに変更してください

    public static void main(String[] args) {  
        // Java 6以降では不要だが、明示的なロードの例として記述
        // try {
        //     Class.forName("com.mysql.cj.jdbc.Driver");
        // } catch (ClassNotFoundException e) {
        //     System.err.println("JDBC Driverが見つかりません。CLASSPATHを確認してください。");
        //     e.printStackTrace();
        //     return;
        // }

        System.out.println("データベースに接続中...");  

        // try-with-resources を使用してリソースを自動的に閉じる
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);  
             Statement statement = connection.createStatement();  
             ResultSet resultSet = statement.executeQuery("SELECT id, name, age FROM users")) {  

            System.out.println("接続成功。  データを取得します。");  
            System.out.println("------------------------------------");  

            while (resultSet.next()) {  
                int id = resultSet.getInt("id");  
                String name = resultSet.getString("name");  
                int age = resultSet.getInt("age");  
                System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age);  
            }  
            System.out.println("------------------------------------");  

        } catch (SQLException e) {  
            System.err.println("データベース操作中にエラーが発生しました。");  
            e.printStackTrace();  
        }  
        System.out.println("プログラムを終了します。");  
    }  
}  
```

### 6.2. データ挿入の例 (`JdbcInsertExample.java`)  

`src`ディレクトリに以下のファイルを作成します。  

```java
// src/JdbcInsertExample.java
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.PreparedStatement;  
import java.sql.SQLException;  

public class JdbcInsertExample {  

    // MySQL接続情報
    private static final String DB_URL = "jdbc:mysql://localhost:3306/jdbc_sample_db";  
    private static final String DB_USER = "root";  
    private static final String DB_PASSWORD = "your_mysql_password"; // ★ここを実際のパスワードに変更してください

    public static void main(String[] args) {  
        String nameToInsert = "Eve";  
        int ageToInsert = 29;  

        System.out.println("データベースに接続中...");  

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);  
             PreparedStatement pstmt = connection.prepareStatement("INSERT INTO users (name, age) VALUES (?, ?)")) {  

            System.out.println("接続成功。  データを挿入します。");  

            // プレースホルダに値を設定
            pstmt.setString(1, nameToInsert);  
            pstmt.setInt(2, ageToInsert);  

            // SQLを実行
            int affectedRows = pstmt.executeUpdate();  

            System.out.println(affectedRows + "件のレコードが挿入されました。");  

        } catch (SQLException e) {  
            System.err.println("データベース操作中にエラーが発生しました。");  
            e.printStackTrace();  
        }  
        System.out.println("プログラムを終了します。");  
    }  
}  
```

### 6.3. コマンドラインからのコンパイルと実行  

Javaソースコードをコンパイルし、実行するには、`javac`と`java`コマンドを使用します。  
この際、MySQL Connector/Jの`.jar`ファイルをクラスパス（`CLASSPATH`）に含めることが重要です。  

まず、ディレクトリ構造が以下のように準備されていることを確認します。  

```
your_jdbc_project/
├── src/
│   ├── JdbcSelectExample.java
│   └── JdbcInsertExample.java
└── lib/
    └── mysql-connector-j-x.x.x.jar  
```
`mysql-connector-j-x.x.x.jar`の`x.x.x`は、ダウンロードした実際のバージョン番号に置き換えてください（例: `mysql-connector-j-8.0.33.jar`）。  

1.  **プロジェクトのルートディレクトリに移動**:  
    ```bash
    cd your_jdbc_project
    ```

2.  **コンパイル**:  
    *   コンパイル時に`CLASSPATH`を指定し、`.class`ファイルを`bin`ディレクトリに生成します（`bin`ディレクトリがなければ自動的に作成されます）。  
    *   **Windows**:  
        ```bash
        javac -d bin -cp "lib\mysql-connector-j-x.x.x.jar" src\JdbcSelectExample.java src\JdbcInsertExample.java  
        ```
    *   **Linux/macOS**:  
        ```bash
        javac -d bin -cp "lib/mysql-connector-j-x.x.x.jar" src/JdbcSelectExample.java src/JdbcInsertExample.java  
        ```
    コンパイルが成功すると、`bin`ディレクトリ内に`.class`ファイルが生成されます。  

3.  **実行**:  
    *   実行時にも`CLASSPATH`を指定し、生成された`.class`ファイルの場所（`bin`ディレクトリ）とJDBCドライバの`.jar`ファイルの場所を指定します。  
    *   **Windows (`JdbcSelectExample`を実行)**:  
        ```bash
        java -cp "bin;lib\mysql-connector-j-x.x.x.jar" JdbcSelectExample  
        ```
    *   **Linux/macOS (`JdbcSelectExample`を実行)**:  
        ```bash
        java -cp "bin:lib/mysql-connector-j-x.x.x.jar" JdbcSelectExample  
        ```

    *   **Windows (`JdbcInsertExample`を実行)**:  
        ```bash
        java -cp "bin;lib\mysql-connector-j-x.x.x.jar" JdbcInsertExample  
        ```
    *   **Linux/macOS (`JdbcInsertExample`を実行)**:  
        ```bash
        java -cp "bin:lib/mysql-connector-j-x.x.x.jar" JdbcInsertExample  
        ```

    *   **複数のJARファイルをまとめて指定する便利な方法（ワイルドカード）**:  
        `lib`ディレクトリ内の全てのjarファイルをクラスパスに含める場合、ワイルドカード`*`を使用できます。  
        *   **Windows**:  
            ```bash
            java -cp "bin;lib\*" JdbcSelectExample  
            ```
        *   **Linux/macOS**:  
            ```bash
            java -cp "bin:lib/*" JdbcSelectExample  
            ```
        **注意**: ワイルドカードを使用する場合、`"`でパスを囲む必要があります。  

## 7. よくある問題とヒント  

### 7.1. `ClassNotFoundException`  

*   **原因**: 指定されたJDBCドライバクラス（例: `com.mysql.cj.jdbc.Driver`）が見つからない場合に発生します。  
これは通常、JDBCドライバの`.jar`ファイルが`CLASSPATH`に正しく設定されていないことが原因です。  
*   **解決策**:
    *   `mysql-connector-j-x.x.x.jar`ファイルがダウンロードされ、指定された`lib`ディレクトリに存在することを確認します。  
    *   コンパイル時および実行時に、`-cp`オプションで`.jar`ファイルへのパスが正しく指定されていることを確認します。  
    *   `.jar`ファイル名がコマンドのファイル名と一致しているか確認します（特にバージョン番号）。  

### 7.2. `SQLException`  

`SQLException`は、データベース関連の様々なエラーを表します。  
エラーメッセージをよく読んで原因を特定することが重要です。  

*   **接続エラー**:  
    *   **原因**: データベースサーバーが起動していない、JDBC URL（ホスト名、ポート番号、データベース名）が間違っている、ユーザー名やパスワードが正しくない、ネットワークの問題など。  
    *   **解決策**:
        *   MySQLサーバーが起動していることを確認します。  
        *   JDBC URL、ユーザー名、パスワードがMySQLの設定と一致していることを再確認します。  
        *   ファイアウォールが接続をブロックしていないか確認します。  

*   **SQL構文エラー**:  
    *   **原因**: 実行しようとしたSQL文に構文エラーがある場合。  
    *   **解決策**: 実行しようとしているSQL文をMySQLクライアントで直接実行してみて、エラーがないことを確認します。  

*   **データ型不一致**:  
    *   **原因**: `PreparedStatement`で`setXXX()`メソッドを使用する際、データベースのカラムの型とJavaのコードで設定しようとしているデータの型が一致しない場合。  
    あるいは`ResultSet`で`getXXX()`メソッドを使用する際、取得しようとしているカラムの型と`getXXX()`の型が一致しない場合。  
    *   **解決策**: データベースのスキーマを確認し、適切な`setXXX()`や`getXXX()`メソッドを使用します。  

### 7.3. リソース解放の重要性  

`Connection`, `Statement`, `ResultSet`などのJDBCリソースは、使用後に必ず`close()`メソッドで解放する必要があります。  
これを怠ると、データベース接続が枯渇したり、メモリリークが発生したりして、アプリケーションやデータベースサーバーのパフォーマンスに悪影響を与える可能性があります。  

*   **推奨**: Java 7以降であれば、`try-with-resources`文を積極的に使用し、リソースの自動的な解放を保証します。  

## 8. まとめ  

この研修では、Java 17環境でJDBCを使用し、MySQLデータベースと連携してコマンドラインから操作する方法を学びました。  

*   **JDBCはJavaアプリケーションとデータベースを繋ぐ架け橋です。**  
*   **`DriverManager`, `Connection`, `Statement/PreparedStatement`, `ResultSet`が主要なコンポーネントです。**  
*   **`PreparedStatement`はセキュリティとパフォーマンスの観点から強く推奨されます。**  
*   **MySQL Connector/Jの`.jar`ファイルを`CLASSPATH`に含めることが重要です。**  
*   **`try-with-resources`文を活用し、リソースを確実に解放しましょう。**  

JDBCの知識は、Javaを用いたデータ駆動型アプリケーション開発において不可欠です。  
この基礎を土台として、さらに複雑なデータベース操作やトランザクション管理、ORM（Object-Relational Mapping）フレームワーク（JPA/Hibernateなど）へと学習を進めていくことができます。  