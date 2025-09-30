# 確認問題 2

### クラスとインスタンスの基本

#### 問題1：シンプルな`Person`クラスの作成

`Person`クラスを作成してください。このクラスは、`name`（文字列）と`age`（整数）という2つのインスタンス変数（フィールド）を持ち、コンストラクタでこれらの値を初期化できるようにします。  
さらに、`introduce`というメソッドを作成し、「こんにちは、私の名前は〇〇です。〇歳です。」と表示できるようにしてください。  
`main`メソッドで`Person`クラスのインスタンスを生成し、`introduce`メソッドを呼び出してください。

**クラス名：`Person`**

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                       |
| :----------- | :------------------------- |
| **クラス** |                            |
| ファイル名   | `Person.java`              |
| クラス名     | `Person`                   |
|              |                            |
| **コンストラクタ** |                        |
| コンストラクタ名 | `Person`                   |
| 引数1        | `String name`              |
| 引数2        | `int age`                  |
| 機能         | 引数で渡された `age` の値を、フィールドの `age` に代入します。 |
|              |                            |
| **フィールド①** |                            |
| 変数名       | `name`                     |
| データ型     | `String`                   |
| アクセス修飾子 | -                          |
| 初期値       | -                          |
| 説明         | 人物の名前を保持します。   |
|              |                            |
| **フィールド②** |                            |
| 変数名       | `age`                      |
| データ型     | `int`                      |
| アクセス修飾子 | -                          |
| 初期値       | -                          |
| 説明         | 人物の年齢を保持します。   |
|              |                            |
| **メソッド** |                            |
| メソッド名   | `introduce`                |
| アクセス修飾子 | `public`                   |
| 引数         | -                          |
| 戻り値       | `void`                     |
| 機能         | フィールド `name` と `age` の値を使って、自己紹介文をコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番                 | 詳細                                         |
| :------------------- | :------------------------------------------- |
| 1      | `Main` クラス(Main.java)を作成し、`main`メソッドを定義します。 |
| 2      | `Person` クラスのインスタンスを生成します。このとき、コンストラクタに名前と年齢の値を渡します。 |
| 3      | 生成したインスタンスの `introduce` メソッドを呼び出します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
こんにちは、私の名前は山田です。25歳です。
```

    </div>
</details>

<!-- **回答例：**

```java
public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void introduce() {
        System.out.println("こんにちは、私の名前は" + this.name + "です。" + this.age + "歳です。");
    }

    public static void main(String[] args) {
        // Personクラスのインスタンスを生成
        Person person1 = new Person("山田", 25);
        
        // introduceメソッドを呼び出し
        person1.introduce();
    }
}
``` -->

-----

#### 問題2：`Dog`クラスの作成とメソッドの呼び出し

`Dog`クラスを作成してください。`name`（文字列）と`age`（整数）のフィールドを持ち、`bark`メソッドでは「〇〇（犬の名前）がワンワンと鳴いています。」と表示するようにしてください。`main`メソッドで`Dog`クラスのインスタンスを複数作成し、それぞれ`bark`メソッドを呼び出してください。

**クラス名：`Dog`**

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Dog`                            |
| ファイル名   | `Dog.java`                       |
| 概要         | 犬の情報を管理し、鳴き声を出力するクラスです。 |
|              |                                  |
| **フィールド** |                                  |
| 変数名       | `name`                           |
| データ型     | `String`                         |
| アクセス修飾子 | デフォルト                     |
| 説明         | 犬の名前を保持します。         |
| 変数名       | `age`                            |
| データ型     | `int`                            |
| アクセス修飾子 | デフォルト                     |
| 説明         | 犬の年齢を保持します。         |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Dog`                            |
| 引数1        | `String name`                    |
| 引数2        | `int age`                        |
| 機能         | 引数で渡された値を各フィールドに代入し、インスタンスを初期化します。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `bark`                           |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | フィールド `name` の値を使って、犬の鳴き声を表す文字列をコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                         |
| :--- | :------------------------------------------- |
| 1    | `Main` クラス(Main.java)を作成し、`main`メソッドを定義します。  |
| 2    | `Dog` クラスのインスタンスを**複数**生成します。 |
| 3    | それぞれのインスタンスの `bark` メソッドを呼び出します。 |
    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
ポチがワンワンと鳴いています。
ケンがワンワンと鳴いています。
```

    </div>
</details>

<!-- **回答例：**

```java
public class Dog {
    String name;
    int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void bark() {
        System.out.println(this.name + "がワンワンと鳴いています。");
    }

    public static void main(String[] args) {
        Dog dog1 = new Dog("ポチ", 3);
        Dog dog2 = new Dog("ケン", 5);
        
        dog1.bark();
        dog2.bark();
    }
}
``` -->

-----

### `ArrayList`とカプセル化の応用

#### 問題3：`Student`クラスと`ArrayList`の利用

`Student`クラスを作成してください。  
`name`（文字列）と`score`（整数）のフィールドを持ちます。  
`main`メソッドで`Student`クラスのインスタンスを3つ以上作成し、これらを`ArrayList`に格納してください。  
その後、`for`ループを使って`ArrayList`のすべての学生の名前と点数を表示するプログラムを作成してください。

**クラス名：`Student`**

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Student`                        |
| ファイル名   | `Student.java`                   |
| 概要         | 学生の名前と点数を管理するクラスです。 |
|              |                                  |
| **フィールド** |                                  |
| 変数名       | `name`                           |
| データ型     | `String`                         |
| アクセス修飾子 | デフォルト                     |
| 説明         | 学生の名前を保持します。       |
| 変数名       | `score`                          |
| データ型     | `int`                            |
| アクセス修飾子 | デフォルト                     |
| 説明         | 学生の点数を保持します。       |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Student`                        |
| 引数1        | `String name`                    |
| 引数2        | `int score`                      |
| 機能         | 引数で渡された値を各フィールドに代入し、インスタンスを初期化します。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | なし                             |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細 |
| :--- | :--- |
| 1 | `Main` クラス(Main.java)を作成し、`main`メソッドを定義します。  |
| 2 | `Student` クラスのインスタンスを3つ以上作成し、`ArrayList<Student>` に格納します。 |
| 3 | `for` ループを使って `ArrayList` のすべての要素（学生）を走査し、それぞれの名前と点数を表示します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
名前: 佐藤, 点数: 85
名前: 鈴木, 点数: 92
名前: 田中, 点数: 78
```

    </div>
</details>


<!-- **回答例：**

```java
import java.util.ArrayList;

public class Student {
    String name;
    int score;

    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();
        
        students.add(new Student("佐藤", 85));
        students.add(new Student("鈴木", 92));
        students.add(new Student("田中", 78));

        for (Student student : students) {
            System.out.println("名前: " + student.name + ", 点数: " + student.score);
        }
    }
}
``` -->

-----

#### 問題4：`BankAccount`クラスでのカプセル化

`BankAccount`クラスを作成してください。  
`balance`（残高）というフィールドを`private`で定義し、外部から直接アクセスできないようにしてください。  
このフィールドにアクセスするためには、以下の`public`メソッドを作成してください。

  * `deposit(int amount)`：引数`amount`の分だけ残高を増やす
  * `withdraw(int amount)`：引数`amount`の分だけ残高を減らす（ただし、残高が`amount`より少ない場合は「残高不足です。」と表示して引き出しを行わない）
  * `getBalance()`：現在の残高を返す

`main`メソッドでこのクラスの動作を確認してください。

**クラス名：`BankAccount`**

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `BankAccount`                    |
| ファイル名   | `BankAccount.java`               |
| 概要         | 銀行口座の残高を管理するクラスです。 |
|              |                                  |
| **フィールド** |                                  |
| 変数名       | `balance`                        |
| データ型     | `int`                            |
| アクセス修飾子 | `private`                        |
| 説明         | 口座の残高を保持します。       |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `BankAccount`                    |
| 引数        | `int initialBalance`             |
| 機能         | 引数で渡された初期残高を `balance` フィールドに代入し、インスタンスを初期化します。 |
|              |                                  |
| **メソッド①** |                                  |
| メソッド名   | `deposit`                        |
| アクセス修飾子 | `public`                         |
| 引数        | `int amount`                     |
| 戻り値       | `void`                           |
| 機能         | `balance` に `amount` の値を加算します。 |
|              |                                  |
| **メソッド②** |                                  |
| メソッド名   | `withdraw`                       |
| アクセス修飾子 | `public`                         |
| 引数        | `int amount`                     |
| 戻り値       | `void`                           |
| 機能         | `balance` が `amount` 以上の場合、`balance` から `amount` を減算します。それ以外の場合は「残高不足です。」と表示します。 |
| **メソッド③** |                                  |
|              |                                  |
| メソッド名   | `getBalance`                     |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `int`                            |
| 機能         | 現在の `balance` の値を返します。  |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `Main` クラス(Main.java)を作成し、`main`メソッドを定義します。    |
| 2    | `BankAccount` クラスのインスタンスを生成し、初期残高を設定します。 |
| 3    | `deposit` メソッドを呼び出し、残高が増えることを確認します。   |
| 4    | `withdraw` メソッドを呼び出し、残高が減ることを確認します。    |
| 5    | `getBalance` メソッドを呼び出し、現在の残高を取得して表示します。|
| 6    | `withdraw` メソッドを呼び出し、残高不足のケースをテストします。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
現在の残高: 10000
5000円入金しました。
現在の残高: 15000
3000円引き出しました。
現在の残高: 12000
残高不足です。
現在の残高: 12000
```

    </div>
</details>


<!-- **回答例：**

```java
public class BankAccount {
    private int balance;

    public BankAccount(int balance) {
        this.balance = balance;
    }

    public void deposit(int amount) {
        this.balance += amount;
        System.out.println(amount + "円入金しました。");
    }

    public void withdraw(int amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            System.out.println(amount + "円引き出しました。");
        } else {
            System.out.println("残高不足です。");
        }
    }

    public int getBalance() {
        return this.balance;
    }

    public static void main(String[] args) {
        BankAccount myAccount = new BankAccount(10000);
        
        System.out.println("現在の残高: " + myAccount.getBalance());
        
        myAccount.deposit(5000);
        System.out.println("現在の残高: " + myAccount.getBalance());
        
        myAccount.withdraw(3000);
        System.out.println("現在の残高: " + myAccount.getBalance());
        
        myAccount.withdraw(15000); // 残高不足のケース
        System.out.println("現在の残高: " + myAccount.getBalance());
    }
}
``` -->

-----

### 総合的な応用

#### 問題5：`Team`クラスと`ArrayList`、カプセル化の組み合わせ

`Player`クラスを作成してください。  
このクラスは`name`（文字列）と`score`（整数）を`private`フィールドとして持ち、それぞれの値を操作する**ゲッター・セッターメソッド**も定義してください。

次に、`Team`クラスを作成してください。

  * `Team`クラスは、`teamName`（文字列）と`players`という`Player`クラスの`ArrayList`を`private`フィールドとして持ちます。
  * コンストラクタでチーム名を初期化し、`players`を新しい`ArrayList`として初期化してください。
  * `addPlayer(Player player)`というメソッドを作成し、引数で渡された`Player`インスタンスをチームに追加できるようにしてください。
  * `displayPlayers()`というメソッドを作成し、チームに所属するすべてのプレイヤーの名前とスコアを表示してください。

`main`メソッドでこれらのクラスの動作を確認してください。

**クラス名：`Player`と`Team`**

<details>
    <summary>クラス設計書①</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Player`                         |
| ファイル名   | `Player.java`                    |
| 概要         | 選手名とスコアを管理するクラスです。 |
|              |                                  |
| **フィールド①** |                                  |
| 変数名       | `name`                           |
| データ型     | `String`                         |
| アクセス修飾子 | `private`                        |
| 説明         | 選手名を保持します。           |
|              |                                  |
| **フィールド②** |                                  |
| 変数名       | `score`                          |
| データ型     | `int`                            |
| アクセス修飾子 | `private`                        |
| 説明         | スコアを保持します。           |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Player`                         |
| 引数1        | `String name`                    |
| 引数2        | `int score`                      |
| 機能         | 引数で渡された値を各フィールドに代入し、インスタンスを初期化します。 |
|              |                                  |
| **メソッド①** |                                  |
| メソッド名   | `getName`                        |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `String`                         |
| 機能         | `name` フィールドの値を返します。（ゲッター） |
|              |                                  |
| **メソッド②** |                                  |
| メソッド名   | `getScore`                       |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `int`                            |
| 機能         | `score` フィールドの値を返します。（ゲッター） |
|              |                                  |
| **メソッド③** |                                  |
| メソッド名   | `setScore`                       |
| アクセス修飾子 | `public`                         |
| 引数1        | `int score`                      |
| 戻り値       | `void`                           |
| 機能         | `score` フィールドの値を更新します。（セッター） |

    </div>
</details>

<details>
    <summary>クラス設計書②</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Team`                           |
| ファイル名   | `Team.java`                      |
| 概要         | 複数の `Player` を管理するクラスです。 |
|              |                                  |
| **フィールド①** |                                  |
| 変数名       | `teamName`                       |
| データ型     | `String`                         |
| アクセス修飾子 | `private`                        |
| 説明         | チーム名を保持します。         |
|              |                                  |
| **フィールド②** |                                  |
| 変数名       | `players`                        |
| データ型     | `ArrayList<Player>`              |
| アクセス修飾子 | `private`                        |
| 説明         | `Player` オブジェクトのリストを保持します。 |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Team`                           |
| 引数1        | `String teamName`                |
| 機能         | `teamName` フィールドを初期化し、`players` リストを新しく作成します。 |
|              |                                  |
| **メソッド①** |                                  |
| メソッド名   | `addPlayer`                      |
| アクセス修飾子 | `public`                         |
| 引数1        | `Player player`                  |
| 戻り値       | `void`                           |
| 機能         | `players` リストに引数で渡された `Player` オブジェクトを追加します。 |
|              |                                  |
| **メソッド②** |                                  |
| メソッド名   | `displayPlayers`                 |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | `players` リスト内のすべての `Player` の名前とスコアをコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `Main` クラス(Main.java)を作成し、`main`メソッドを定義します。   |
| 2    | `Team` クラスのインスタンスを生成します。                      |
| 3    | 複数の `Player` クラスのインスタンスを生成します。             |
| 4    | `Team` インスタンスの `addPlayer` メソッドを呼び出し、`Player` インスタンスをチームに追加します。 |
| 5    | `displayPlayers` メソッドを呼び出し、メンバーリストを表示します。 |
| 6    | セッターメソッドを使って `Player` のスコアを更新し、再度 `displayPlayers` メソッドを呼び出し、変更が反映されていることを確認します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
田中がレッドドラゴンズに加入しました。
鈴木がレッドドラゴンズに加入しました。
--- レッドドラゴンズのメンバー ---
名前: 田中, スコア: 15
名前: 鈴木, スコア: 22
---------------------------------
--- レッドドラゴンズのメンバー ---
名前: 田中, スコア: 30
名前: 鈴木, スコア: 22
---------------------------------
```

    </div>
</details>


<!-- **回答例：**

```java
import java.util.ArrayList;

class Player {
    private String name;
    private int score;

    public Player(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}

public class Team {
    private String teamName;
    private ArrayList<Player> players;

    public Team(String teamName) {
        this.teamName = teamName;
        this.players = new ArrayList<>();
    }

    public void addPlayer(Player player) {
        this.players.add(player);
        System.out.println(player.getName() + "が" + this.teamName + "に加入しました。");
    }

    public void displayPlayers() {
        System.out.println("--- " + this.teamName + "のメンバー ---");
        for (Player player : players) {
            System.out.println("名前: " + player.getName() + ", スコア: " + player.getScore());
        }
        System.out.println("---------------------------------");
    }

    public static void main(String[] args) {
        Team myTeam = new Team("レッドドラゴンズ");
        
        Player player1 = new Player("田中", 15);
        Player player2 = new Player("鈴木", 22);
        
        myTeam.addPlayer(player1);
        myTeam.addPlayer(player2);
        
        myTeam.displayPlayers();
        
        // スコアを更新してみる
        player1.setScore(30);
        myTeam.displayPlayers();
    }
}
``` -->