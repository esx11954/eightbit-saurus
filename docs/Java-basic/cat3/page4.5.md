# 確認問題 2

### クラスとインスタンスの基本

#### 問題1：シンプルな`Person`クラスの作成

`Person`クラスを作成してください。このクラスは、`name`（文字列）と`age`（整数）という2つのインスタンス変数（フィールド）を持ち、コンストラクタでこれらの値を初期化できるようにします。  
さらに、`introduce`というメソッドを作成し、「こんにちは、私の名前は〇〇です。〇歳です。」と表示できるようにしてください。  
`main`メソッドで`Person`クラスのインスタンスを生成し、`introduce`メソッドを呼び出してください。

**クラス名：`Person`**

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