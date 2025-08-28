# 確認問題 3

### 継承と単純な例外処理

#### 問題1：`Animal`と`Dog`クラスの作成

`Animal`クラスを作成し、`eat()`メソッドで「動物が食事をします。」と表示できるようにしてください。  
次に、`Animal`クラスを継承する`Dog`クラスを作成し、`eat()`メソッドをオーバーライドして「犬がドッグフードを食べます。」と表示できるようにしてください。  
`main`メソッドで`Dog`クラスのインスタンスを生成し、`eat()`メソッドを呼び出して動作を確認してください。

<details>
    <summary>クラス設計書①</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Animal`                         |
| ファイル名   | `Animal.java`                    |
| 概要         | 動物が持つ共通の振る舞いを定義する基底クラスです。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `eat`                            |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | 「動物が食事をします。」とコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>クラス設計書②</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Dog`                            |
| ファイル名   | `Dog.java`                       |
| 概要         | `Animal`クラスを継承し、犬特有の振る舞いを定義するクラスです。 |
|              |                                  |
| **継承** |                                  |
| 親クラス     | `Animal`                         |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `eat`                            |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | 親クラスの`eat`メソッドをオーバーライドし、「犬がドッグフードを食べます。」と表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `main`メソッドを `Dog` クラス内に定義します。                 |
| 2    | `Dog` クラスのインスタンスを生成します。                      |
| 3    | 生成したインスタンスの `eat` メソッドを呼び出し、オーバーライドされたメソッドが実行されることを確認します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
犬がドッグフードを食べます。
```

    </div>
</details>

<!-- **回答例：**

```java
class Animal {
    public void eat() {
        System.out.println("動物が食事をします。");
    }
}

public class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("犬がドッグフードを食べます。");
    }

    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat();
    }
}
``` -->

-----

### 抽象クラスとインターフェース

#### 問題2：`Shape`抽象クラスと`Circle`クラスの作成

`Shape`という**抽象クラス**を作成してください。  
このクラスは`getArea()`という**抽象メソッド**を持ちます。  
次に、`Shape`を継承する`Circle`クラスを作成し、コンストラクタで`radius`（半径）を受け取るようにしてください。  
そして、`getArea()`メソッドを実装して円の面積を返すようにしてください。  
`main`メソッドで`Circle`のインスタンスを生成し、面積を表示して動作を確認してください。

<details>
    <summary>抽象クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Shape`                          |
| ファイル名   | `Shape.java`                     |
| 概要         | 図形の共通の振る舞いを定義する抽象クラスです。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `getArea`                        |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `double`                         |
| 機能         | 図形の面積を計算して返す抽象メソッドです。 |

    </div>
</details>

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Circle`                         |
| ファイル名   | `Circle.java`                    |
| 概要         | `Shape`クラスを継承し、円の面積を計算するクラスです。 |
|              |                                  |
| **継承** |                                  |
| 親クラス     | `Shape`                          |
|              |                                  |
| **フィールド** |                                  |
| 変数名       | `radius`                         |
| データ型     | `double`                         |
| アクセス修飾子 | `private`                        |
| 説明         | 円の半径を保持します。           |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Circle`                         |
| 引数1        | `double radius`                  |
| 機能         | 引数で渡された値を `radius` フィールドに代入します。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `getArea`                        |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `double`                         |
| 機能         | 円の面積を計算して返します。 (半径^2 * 3.141592653589793) |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `main`メソッドを `Circle` クラス内に定義します。               |
| 2    | `Circle` クラスのインスタンスを生成し、半径をコンストラクタに渡します。 |
| 3    | 生成したインスタンスの `getArea()` メソッドを呼び出し、計算された面積をコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>実行結果(半径が5の場合)</summary>
    <div>

```
円の面積: 78.53981633974483
```

    </div>
</details>

<!-- **回答例：**

```java
abstract class Shape {
    public abstract double getArea();
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        Circle circle = new Circle(5.0);
        System.out.println("円の面積: " + circle.getArea());
    }
}
``` -->

-----

#### 問題3：`Flyable`インターフェースと`Bird`クラスの作成

`Flyable`という**インターフェース**を作成してください。  
このインターフェースは`fly()`という抽象メソッドを持ちます。  
次に、`Bird`クラスを作成し、`Flyable`インターフェースを実装してください。  
`fly()`メソッドの中では、「鳥が空を飛んでいます。」と表示するようにしてください。  
`main`メソッドで`Bird`クラスのインスタンスを生成し、`fly()`メソッドを呼び出して動作を確認してください。

<details>
    <summary>インターフェース設計書</summary>
    <div>

| 項目           | 詳細                                 |
| :------------- | :----------------------------------- |
| **インターフェース** |                                      |
| インターフェース名 | `Flyable`                            |
| ファイル名     | `Flyable.java`                       |
| 概要           | 飛ぶことができるという能力を定義するインターフェースです。 |
|                |                                      |
| **メソッド** |                                      |
| メソッド名     | `fly`                                |
| アクセス修飾子 | `public`                             |
| 引数           | なし                                 |
| 戻り値         | `void`                               |
| 機能           | 飛ぶための抽象的な行動を定義します。 |


    </div>
</details>

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Bird`                           |
| ファイル名   | `Bird.java`                      |
| 概要         | `Flyable`インターフェースを実装し、鳥の飛ぶ行動を定義するクラスです。 |
|              |                                  |
| **実装** |                                  |
| インターフェース | `Flyable`                        |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `fly`                            |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | 「鳥が空を飛んでいます。」とコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `main`メソッドを `Bird` クラス内に定義します。               |
| 2    | `Bird` クラスのインスタンスを生成します。                      |
| 3    | 生成したインスタンスの `fly()` メソッドを呼び出して動作を確認します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
鳥が空を飛んでいます。
```

    </div>
</details>

<!-- **回答例：**

```java
interface Flyable {
    void fly();
}

public class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鳥が空を飛んでいます。");
    }

    public static void main(String[] args) {
        Bird myBird = new Bird();
        myBird.fly();
    }
}
``` -->

-----

### 総合的な応用と例外処理

#### 問題4：`Calculator`クラスと例外処理

`Calculator`クラスを作成してください。  
このクラスに`divide(int numerator, int denominator)`というメソッドを追加します。

  * `denominator`が`0`の場合、`ArithmeticException`をスローするようにしてください。
  * `main`メソッドで`divide`メソッドを呼び出し、**`try-catch`ブロック**を使って`ArithmeticException`を適切に処理するプログラムを作成してください。`catch`ブロック内では、「0で割ることはできません。」と表示してください。

<details>
    <summary>クラス設計書</summary>
    <div>

| 項目         | 詳細                               |
| :----------- | :--------------------------------- |
| **クラス** |                                    |
| クラス名     | `Calculator`                       |
| ファイル名   | `Calculator.java`                  |
| 概要         | 数値計算を行うクラスです。           |
|              |                                    |
| **メソッド** |                                    |
| メソッド名   | `divide`                           |
| アクセス修飾子 | `public static`                      |
| 引数1        | `int numerator` (分子)             |
| 引数2        | `int denominator` (分母)           |
| 戻り値       | `double`                           |
| 機能         | 分子を分母で割った結果を返します。分母が0の場合は `ArithmeticException` をスローします。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `main`メソッドを `Calculator` クラス内に定義します。           |
| 2    | `try-catch` ブロックを配置します。                             |
| 3    | `try` ブロック内で、`divide` メソッドを呼び出し、正常な計算を行います。 |
| 4    | 同じく `try` ブロック内で、分母に `0` を渡して `divide` メソッドを呼び出し、例外を意図的に発生させます。 |
| 5    | `catch` ブロックで `ArithmeticException` を捕捉し、エラーメッセージを表示します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>
```
10 / 2 = 5.0
0で割ることはできません。
```

    </div>
</details>

<!-- **回答例：**

```java
public class Calculator {
    public static double divide(int numerator, int denominator) {
        if (denominator == 0) {
            throw new ArithmeticException("0で割ることはできません。");
        }
        return (double) numerator / denominator;
    }

    public static void main(String[] args) {
        try {
            double result = divide(10, 2);
            System.out.println("10 / 2 = " + result);

            double resultZero = divide(10, 0); // ここで例外が発生
            System.out.println("この行は実行されません");

        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        } finally {
            System.out.println("処理を終了します。");
        }
    }
}
``` -->

-----

#### 問題5：`Movable`インターフェースと抽象クラスの組み合わせ

`Movable`という**インターフェース**を作成してください。  
このインターフェースは`move()`という抽象メソッドを持ちます。

次に、`Vehicle`という**抽象クラス**を作成してください。  
`Vehicle`は`Movable`インターフェースを**実装**し、`brand`というフィールドと、`getBrand()`という`public`メソッドを持ちます。  
ただし、`move()`メソッドは実装しません。

最後に、`Vehicle`を継承する`Car`クラスを作成してください。  
`Car`クラスは`move()`メソッドを実装し、「〇〇（ブランド名）の車が移動します。」と表示するようにしてください。

`main`メソッドで`Car`のインスタンスを生成し、`move()`と`getBrand()`メソッドを呼び出して動作を確認してください。

<details>
    <summary>インターフェース設計書</summary>
    <div>

| 項目           | 詳細                                 |
| :------------- | :----------------------------------- |
| **インターフェース** |                                      |
| インターフェース名 | `Movable`                            |
| ファイル名     | `Movable.java`                       |
| 概要           | 「移動できる」という能力を定義するインターフェースです。 |
|                |                                      |
| **メソッド** |                                      |
| メソッド名     | `move`                               |
| アクセス修飾子 | `public`                             |
| 引数           | なし                                 |
| 戻り値         | `void`                               |
| 機能           | 移動を表す抽象的な行動を定義します。 |

    </div>
</details>

<details>
    <summary>クラス設計書①</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Vehicle`                        |
| ファイル名   | `Vehicle.java`                   |
| 概要         | 移動可能な乗り物の共通の特性を定義する抽象クラスです。 |
|              |                                  |
| **実装** |                                  |
| インターフェース | `Movable`                        |
|              |                                  |
| **フィールド** |                                  |
| 変数名       | `brand`                          |
| データ型     | `String`                         |
| アクセス修飾子 | `protected`                      |
| 説明         | 車両のブランド名を保持します。   |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Vehicle`                        |
| 引数1        | `String brand`                   |
| 機能         | `brand` フィールドを初期化します。 |
|              |                                  |
| **メソッド①** |                                  |
| メソッド名   | `getBrand`                       |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `String`                         |
| 機能         | `brand` フィールドの値を返します。 |
|              |                                  |
| **メソッド②** |                                  |
| メソッド名   | `move`                           |
| 機能         | `Movable`インターフェースの`move`メソッドを**未実装のまま**です。 |

    </div>
</details>

<details>
    <summary>クラス設計書②</summary>
    <div>

| 項目         | 詳細                             |
| :----------- | :------------------------------- |
| **クラス** |                                  |
| クラス名     | `Car`                            |
| ファイル名   | `Car.java`                       |
| 概要         | `Vehicle`を継承し、自動車の移動行動を具体的に定義するクラスです。 |
|              |                                  |
| **継承** |                                  |
| 親クラス     | `Vehicle`                        |
|              |                                  |
| **コンストラクタ** |                                  |
| コンストラクタ名 | `Car`                            |
| 引数1        | `String brand`                   |
| 機能         | 親クラスのコンストラクタを呼び出し、`brand`を初期化します。 |
|              |                                  |
| **メソッド** |                                  |
| メソッド名   | `move`                           |
| アクセス修飾子 | `public`                         |
| 引数         | なし                             |
| 戻り値       | `void`                           |
| 機能         | 「〇〇（ブランド名）の車が移動します。」とコンソールに表示します。 |

    </div>
</details>

<details>
    <summary>`main`メソッド実装</summary>
    <div>

| 項番 | 詳細                                                           |
| :--- | :------------------------------------------------------------- |
| 1    | `main`メソッドを `Car` クラス内に定義します。                  |
| 2    | `Car` クラスのインスタンスを生成し、ブランド名をコンストラクタに渡します。 |
| 3    | 生成したインスタンスの `move()` メソッドを呼び出します。       |
| 4    | 生成したインスタンスの `getBrand()` メソッドを呼び出し、ブランド名を表示します。 |

    </div>
</details>

<details>
    <summary>実行結果(出力例)</summary>
    <div>

```
トヨタの車が移動します。
ブランド: トヨタ
```

    </div>
</details>

<!-- **回答例：**

```java
interface Movable {
    void move();
}

abstract class Vehicle implements Movable {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }
}

public class Car extends Vehicle {
    public Car(String brand) {
        super(brand);
    }

    @Override
    public void move() {
        System.out.println(this.brand + "の車が移動します。");
    }

    public static void main(String[] args) {
        Car myCar = new Car("トヨタ");
        myCar.move();
        System.out.println("ブランド: " + myCar.getBrand());
    }
}
``` -->