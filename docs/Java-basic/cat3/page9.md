# 確認問題 3

### 継承と単純な例外処理

#### 問題1：`Animal`と`Dog`クラスの作成

`Animal`クラスを作成し、`eat()`メソッドで「動物が食事をします。」と表示できるようにしてください。  
次に、`Animal`クラスを継承する`Dog`クラスを作成し、`eat()`メソッドをオーバーライドして「犬がドッグフードを食べます。」と表示できるようにしてください。  
`main`メソッドで`Dog`クラスのインスタンスを生成し、`eat()`メソッドを呼び出して動作を確認してください。

**クラス名：`Animal`、`Dog`**

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

**クラス名：`Shape`、`Circle`**

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

**クラス名・インターフェース名：`Bird`、`Flyable`**

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

**クラス名：`Calculator`**

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

**クラス名・インターフェース名：`Movable`、`Vehicle`、`Car`**

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