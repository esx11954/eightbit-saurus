# ラムダ式

## 1. はじめに  

Java 8で導入されたラムダ式は、関数型プログラミングの要素をJavaに取り入れ、コードをより簡潔かつ表現豊かに記述するための強力な機能です。  
従来の匿名内部クラスに代わるものとして、特にイベント処理、コレクションの操作、スレッド処理などでその真価を発揮します。  

このページでは、ラムダ式の基本的な使い方から、その背後にある概念、実践的な利用方法までを解説します。  

## 2. ラムダ式の基本構文  

ラムダ式は、引数のリスト、アロー演算子 (`->`)、そしてボディ（本体）から構成されます。  

### 基本形式  
`(parameters) -> { body }`  

### 各要素の解説  
*   **`parameters` (引数リスト)**: メソッドの引数に相当します。  
型は通常、コンパイラによって推論されますが、明示的に指定することも可能です。  
引数が1つで型推論が可能な場合は、括弧を省略できます。  
引数がない場合は空の括弧 `()` を使用します。  
*   **`->` (アロー演算子)**: 引数リストとボディを区切る記号です。  
*   **`body` (ボディ)**: メソッドの本体に相当します。  
単一の式の場合は波括弧 `{}` を省略できます。  
複数の文がある場合は、波括弧で囲み、最後に `return` 文が必要であれば記述します。  

### 構文パターン例  

ラムダ式の構文パターンを以下のテーブルにまとめます。  

| パターン                   | 構文                                  | 説明                                                 |
| :------------------------- | :------------------------------------ |  :--------------------------------------------------- |
| **引数なし、単一式**       | `() -> expression`                    | 引数を受け取らず、単一の式を実行します。            |
| **引数なし、ブロック**     | `() -> { statements; }`               | 引数を受け取らず、複数の文を実行します。            |
| **単一引数、単一式**       | `x -> expression` <br /> `(x) -> expression` | 引数が1つの場合、括弧を省略できます。  型は推論されます。   |
| **単一引数、ブロック**     | `x -> { statements; }` <br /> `(x) -> { statements; }` | 引数が1つの場合、複数の文を実行します。  戻り値がある場合は `return` が必要です。   |
| **複数引数、単一式**       | `(x, y) -> expression`                | 複数の引数の場合、必ず括弧が必要です。  型は推論されます。   |
| **複数引数、ブロック**     | `(x, y) -> { statements; }`           | 複数の引数の場合、複数の文を実行します。  戻り値がある場合は `return` が必要です。   |
| **明示的な型指定**         | `(Type x, Type y) -> expression`      | 必要に応じて、引数の型を明示的に指定できます。      |

## 3. 関数型インタフェース (Functional Interface)  

ラムダ式は、単独では存在できません。  
ラムダ式は「関数型インタフェース」のインスタンスとして扱われます。  

### 関数型インタフェースとは  
関数型インタフェースとは、ただ1つの抽象メソッドを持つインタフェースのことです。  
このようなインタフェースは「SAMインタフェース (Single Abstract Method Interface)」とも呼ばれます。  

Java 8以降、このようなインタフェースには `@FunctionalInterface` アノテーションを付与することが推奨されています。  
このアノテーションは必須ではありませんが、コンパイラが「これは関数型インタフェースである」と認識し、誤って複数の抽象メソッドを追加した場合にコンパイルエラーを発生させてくれるため、安全性が高まります。  

```java showLineNumbers
// 関数型インタフェースの例
@FunctionalInterface
interface MyCalculator {
    int calculate(int a, int b); // 唯一の抽象メソッド
    // default void printResult() { ... } // デフォルトメソッドは持てる
    // static void showInfo() { ... } // staticメソッドも持てる
    // void anotherMethod(); // ←これは許されない（抽象メソッドが複数になるため）
}
```

### Java標準ライブラリの関数型インタフェース  
Javaの標準ライブラリには、`java.util.function` パッケージに多くの便利な関数型インタフェースが用意されています。  
代表的なものを以下のテーブルにまとめます。  

| インタフェース名              | 抽象メソッドのシグネチャ        | 説明                                                         |
| :---------------------------- | :------------------------------ | :----------------------------------------------------------- |
| `Predicate<T>`                | `boolean test(T t)`             | T型の引数を受け取り、boolean値を返す。条件を評価する際に使用します。   |
| `Consumer<T>`                 | `void accept(T t)`              | T型の引数を受け取り、何も返さない。副作用のある処理（例: 出力）に使用します。   |
| `Function<T, R>`              | `R apply(T t)`                  | T型の引数を受け取り、R型の値を返す。変換処理に使用します。   |
| `Supplier<T>`                 | `T get()`                       | 引数を受け取らず、T型の値を返す。生成処理に使用します。      |
| `UnaryOperator<T>`            | `T apply(T t)`                  | `Function<T, T>` の特殊なケースで、引数と戻り値が同じ型です。   |
| `BinaryOperator<T>`           | `T apply(T t1, T t2)`           | `BiFunction<T, T, T>` の特殊なケースで、2つの引数と戻り値が同じ型です。   |
| `Runnable`                    | `void run()`                    | 引数なし、戻り値なし。スレッドの実行処理などに使用します。   |
| `Comparator<T>`               | `int compare(T o1, T o2)`       | 2つのT型オブジェクトを比較し、順序を示すint値を返します。  ソート処理に使用します。   |

## 4. ラムダ式の使用例  

具体的なコード例を通して、ラムダ式の使い方を見ていきましょう。  

### 例1: `Runnable` (スレッドの実行)  

```java showLineNumbers
// 従来の匿名内部クラス
Runnable oldRunnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello from old Runnable!");  
    }
};
new Thread(oldRunnable).start();  

// ラムダ式
Runnable lambdaRunnable = () -> System.out.println("Hello from Lambda Runnable!");  
new Thread(lambdaRunnable).start();  

// さらに簡潔に
new Thread(() -> System.out.println("Hello from inline Lambda Runnable!")).start();  
```

### 例2: `Comparator` (コレクションのソート)  

```java showLineNumbers
import java.util.ArrayList;  
import java.util.Collections;  
import java.util.List;  

List<String> names = new ArrayList<>();  
names.add("Charlie");  
names.add("Alice");  
names.add("Bob");  

System.out.println("ソート前: " + names);  

// 従来の匿名内部クラス
Collections.sort(names, new java.util.Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.compareTo(s2);
    }
});
System.out.println("匿名クラスでソート後: " + names);  

// リストを元に戻す
names = new ArrayList<>();  
names.add("Charlie");  
names.add("Alice");  
names.add("Bob");  

// ラムダ式
Collections.sort(names, (s1, s2) -> s1.compareTo(s2));  
System.out.println("ラムダ式でソート後: " + names);  

// 長さでソートするラムダ式
Collections.sort(names, (s1, s2) -> Integer.compare(s1.length(), s2.length()));  
System.out.println("長さでソート後: " + names);  
```

### 例3: カスタム関数型インタフェース  

```java showLineNumbers
// 前述のMyCalculatorインタフェース
@FunctionalInterface
interface MyCalculator {
    int calculate(int a, int b);
}

// 足し算
MyCalculator adder = (x, y) -> x + y;
System.out.println("10 + 20 = " + adder.calculate(10, 20));  

// 掛け算
MyCalculator multiplier = (x, y) -> x * y;
System.out.println("5 * 8 = " + multiplier.calculate(5, 8));  
```

## 5. メソッド参照 (Method Reference)  

ラムダ式が、既存の単一のメソッドを呼び出すだけの非常に単純なものである場合、さらに簡潔に記述する方法として「メソッド参照」があります。  
メソッド参照はラムダ式の糖衣構文（シンタックスシュガー）のようなものです。  

構文は `ClassName::methodName` または `objectName::methodName` の形式を取ります。  

### メソッド参照の種類と例  

メソッド参照の主な種類を以下のテーブルにまとめます。  

| 種類                                 | 構文                           | 例                                      | 等価なラムダ式                         | 説明                                                 |
| :----------------------------------- | :----------------------------- | :-------------------------------------- | :------------------------------------- | :--------------------------------------------------- |
| **静的メソッド参照**                 | `ClassName::staticMethodName`  | `Integer::parseInt`                     | `s -> Integer.parseInt(s)`             | クラスの静的メソッドを参照します。                |
| **特定オブジェクトのインスタンスメソッド参照** | `objectName::instanceMethodName` | `System.out::println`                   | `s -> System.out.println(s)`           | 特定のインスタンスのメソッドを参照します。        |
| **任意オブジェクトのインスタンスメソッド参照** | `ClassName::instanceMethodName` | `String::length`                        | `s -> s.length()`                      | 任意の（任意の引数オブジェクトの）インスタンスメソッドを参照します。  <br />最初の引数がメソッドのターゲットとなります。   |
| **コンストラクタ参照**               | `ClassName::new`               | `ArrayList::new` <br /> `MyClass::new` | `() -> new ArrayList<>()` <br /> `(args) -> new MyClass(args)` | コンストラクタを参照します。                    |

### メソッド参照の例  

```java showLineNumbers
import java.util.Arrays;  
import java.util.List;  
import java.util.function.Consumer;  

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");  

// ラムダ式でリストの各要素を出力
Consumer<String> lambdaPrinter = s -> System.out.println(s);  
names.forEach(lambdaPrinter);  

System.out.println("---");  

// メソッド参照でリストの各要素を出力
Consumer<String> methodRefPrinter = System.out::println;  
names.forEach(methodRefPrinter);  

System.out.println("---");  

// インラインでメソッド参照
names.forEach(System.out::println);  

// Comparatorでの例 (String::compareTo)
// (s1, s2) -> s1.compareTo(s2) と同じ意味
Collections.sort(names, String::compareTo);  
System.out.println("自然順ソート (メソッド参照): " + names);  
```

## 6. 変数スコープ  

ラムダ式内で外部スコープのローカル変数を参照する場合、その変数は「実質的final (effectively final)」である必要があります。  

### 実質的finalとは  
*   `final` キーワードが付与されていないローカル変数でも、その値が初期化後に一度も変更されなければ、コンパイラはそれを「実質的final」とみなします。  
*   ラムダ式内で参照されるローカル変数は、ラムダ式が実行される時点でのその変数の値が保証される必要があるため、変更が許可されません。  
*   インスタンス変数や静的変数については、この制限は適用されません。  
これらはラムダ式内で自由に読み書きできます。  

```java showLineNumbers
int x = 10; // 実質的final

// x = 20; // ここでxを変更すると、以下のラムダ式でコンパイルエラーになる

MyCalculator calculator = (a, b) -> {
    // x は実質的finalなので参照可能
    // return a + b + x;

    // x = 30; // ラムダ式内での変更は不可（コンパイルエラー）
    return a + b + x;
};

System.out.println("Result: " + calculator.calculate(5, 7));  

// ラムダ式定義後にxを変更しようとすると、ラムダ式内で参照されていればコンパイルエラー
// x = 40; // コンパイルエラー: Local variable x defined in an enclosing scope must be final or effectively final
```

## 7. ラムダ式の利点と欠点  

ラムダ式には、コードをより良くするための多くの利点がありますが、一方で考慮すべき点も存在します。  

### 利点と欠点の一覧  

| 利点                                 | 欠点                                           |
| :----------------------------------- | :--------------------------------------------- |
| **コードの簡潔化**                   | 複雑なロジックは読みにくくなる可能性           |
| &nbsp;&nbsp;&nbsp;&nbsp;匿名内部クラスのボイラープレートコードを削減し、コードの行数を減らします。   | &nbsp;&nbsp;&nbsp;&nbsp;ラムダ式が長すぎたり、ネストが深くなったりすると、かえって可読性が低下することがあります。   |
| **可読性の向上**                     | **デバッグの複雑さ**                           |
| &nbsp;&nbsp;&nbsp;&nbsp;処理の意図が明確になり、より自然な形でコードを記述できます。   | &nbsp;&nbsp;&nbsp;&nbsp;スタックトレースが匿名内部クラスよりも読みにくくなる場合があります。   |
| **関数型プログラミングの促進**       | **ごくわずかなパフォーマンスオーバーヘッド**   |
| &nbsp;&nbsp;&nbsp;&nbsp;Stream APIなどと組み合わせることで、宣言的かつ効率的なデータ処理が可能になります。   | &nbsp;&nbsp;&nbsp;&nbsp;内部的に匿名クラスの生成に近い処理が行われるため、理論的にはわずかなオーバーヘッドが生じますが、実用上はほとんど問題になりません。   |
| **API設計の柔軟性向上**              |                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;コールバックや戦略パターンをより柔軟に設計できるようになります。   |                                                |

## 8. まとめ  

ラムダ式は、Java 8以降のJavaプログラミングにおいて、非常に重要な機能です。  

*   **関数型インタフェース**とともに利用することで、コードをより簡潔かつ宣言的に記述できるようになります。  
*   特に **Stream API** と組み合わせることで、コレクションの処理が劇的に効率的かつ直感的になります。  
*   コードの可読性を高め、ボイラープレートコードを削減し、Javaにおける関数型プログラミングの道を拓きました。  

