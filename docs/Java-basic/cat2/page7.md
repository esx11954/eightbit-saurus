# 確認問題 1

### 基本的な文法と概念の確認

#### 問題1：合計点の計算

整数型の変数`mathScore`に`85`、`englishScore`に`92`を代入し、これらの合計を`totalScore`という変数に代入して表示するプログラムを作成してください。

**クラス名：`Calculation`**

<!-- **回答例：**

```java
public class Calculation {
    public static void main(String[] args) {
        int mathScore = 85;
        int englishScore = 92;
        int totalScore = mathScore + englishScore;
        System.out.println("合計点: " + totalScore);
    }
}
``` -->

-----

#### 問題2：偶数かどうかの判定

整数型の変数`number`に任意の値を代入し、その値が**偶数**である場合は「偶数です」、**奇数**である場合は「奇数です」と表示するプログラムを作成してください。

**クラス名：`EvenOrOdd`**

<!-- **回答例：**

```java
public class EvenOrOdd {
    public static void main(String[] args) {
        int number = 10;
        if (number % 2 == 0) {
            System.out.println("偶数です");
        } else {
            System.out.println("奇数です");
        }
    }
}
``` -->

-----

#### 問題3：配列の要素表示

整数型の配列`scores`を宣言し、`{70, 85, 90}`という値を代入してください。  
その後、`for`ループを使って配列の要素を**先頭から順番にすべて**表示するプログラムを作成してください。

**クラス名：`PrintArray`**

<!-- **回答例：**

```java
public class PrintArray {
    public static void main(String[] args) {
        int[] scores = {70, 85, 90};
        for (int score : scores) {
            System.out.println(score);
        }
    }
}
``` -->

-----

### 複数の概念の組み合わせと応用

#### 問題4：最高点の検索

整数型の配列`scores`に`{88, 75, 95, 60, 100}`という値を代入してください。  
`for`ループを使ってこの配列の中から**最高点**を検索し、その値を表示するプログラムを作成してください。

**クラス名：`FindMaxScore`**

<!-- **回答例：**

```java
public class FindMaxScore {
    public static void main(String[] args) {
        int[] scores = {88, 75, 95, 60, 100};
        int maxScore = scores[0]; 

        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
            }
        }
        
        System.out.println("最高点: " + maxScore);
    }
}
``` -->

-----

#### 問題5：条件に合う値の合計

整数型の配列`numbers`に`{15, 20, 33, 40, 52}`という値を代入してください。  
`for`ループと`if`文を組み合わせて、この配列の中から**3の倍数かつ5の倍数ではない値の合計**を計算して表示するプログラムを作成してください。

**クラス名：`ConditionalSum`**

<!-- **回答例：**

```java
public class ConditionalSum {
    public static void main(String[] args) {
        int[] numbers = {15, 20, 33, 40, 52};
        int sum = 0;

        for (int number : numbers) {
            if (number % 3 == 0 && number % 5 != 0) {
                sum += number;
            }
        }
        
        System.out.println("合計: " + sum);
    }
}
``` -->

-----

#### 問題6：平均点より高い人数

整数型の配列`grades`に`{72, 85, 91, 65, 78}`という値を代入してください。  
まず配列の**平均点**を計算し、次に`for`ループと`if`文を使って、平均点より高い点数の人が何人いるか**カウント**して表示するプログラムを作成してください。

**クラス名：`AboveAverageCounter`**

<!-- **回答例：**

```java
public class AboveAverageCounter {
    public static void main(String[] args) {
        int[] grades = {72, 85, 91, 65, 78};
        int sum = 0;
        
        for (int grade : grades) {
            sum += grade;
        }
        double average = (double) sum / grades.length;
        
        int count = 0;
        for (int grade : grades) {
            if (grade > average) {
                count++;
            }
        }
        
        System.out.println("平均点: " + average);
        System.out.println("平均点より高い人数: " + count);
    }
}
``` -->

-----

#### 問題7：九九の表の表示

`for`ループを2つ使って、1の段から9の段までの九九の表を以下のように表示するプログラムを作成してください。

**クラス名：`MultiplicationTable`**

<!-- **回答例：**

```java
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= 9; j++) {
                System.out.println(i + " * " + j + " = " + (i * j));
            }
        }
    }
}
``` -->

-----

### より複雑な論理とアルゴリズム

#### 問題8：FizzBuzz問題

1から100までの整数を順番に表示するプログラムを作成してください。  
ただし、以下の条件に従ってください。

  * 3の倍数の場合は「Fizz」
  * 5の倍数の場合は「Buzz」
  * 3の倍数かつ5の倍数（つまり15の倍数）の場合は「FizzBuzz」
  * それ以外の場合は、そのまま数値を表示する。

**クラス名：`FizzBuzz`**

<!-- **回答例：**

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
``` -->

-----

#### 問題9：配列の要素を逆順に並び替え

整数型の配列`data`に`{10, 20, 30, 40, 50}`という値を代入してください。  
新しい配列を宣言し、`for`ループを使って元の配列の要素を**逆順に格納**してください。  
最後に、新しい配列の要素をすべて表示してください。

**クラス名：`ReverseArray`**

<!-- **回答例：**

```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        int[] reversedData = new int[data.length];
        
        for (int i = 0; i < data.length; i++) {
            reversedData[i] = data[data.length - 1 - i];
        }
        
        System.out.print("逆順に並べ替えた配列: ");
        for (int value : reversedData) {
            System.out.print(value + " ");
        }
    }
}
``` -->

-----

#### 問題10：素数の合計

1から100までの整数の中で、**素数**であるものの**合計**を計算して表示するプログラムを作成してください。  
素数とは、1とその数自身以外に約数を持たない2以上の自然数です。

**クラス名：`PrimeSum`**

<!-- **回答例：**

```java
public class PrimeSum {
    public static void main(String[] args) {
        int primeSum = 0;
        
        for (int i = 2; i <= 100; i++) {
            boolean isPrime = true;
            for (int j = 2; j < i; j++) {
                if (i % j == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primeSum += i;
            }
        }
        
        System.out.println("1から100までの素数の合計: " + primeSum);
    }
}
``` -->