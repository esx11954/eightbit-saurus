# Stream API

## 1. Stream APIとは

Java Stream APIは、Java 8で導入された、コレクションに対する処理を関数型スタイルで記述するためのAPIです。  
これにより、データのフィルタリング、変換、集計といった操作を、より宣言的かつ効率的に記述できるようになりました。  
従来のループ処理に比べて、コードの可読性が向上し、並列処理への移行も容易になります。  

## 2. なぜStream APIを使うのか  

Stream APIを利用することには、以下のようなメリットがあります。  

*   **コードの簡潔性と可読性向上**: 複雑なループ処理や条件分岐を、連鎖的なメソッド呼び出しとして記述できるようになります。  
これにより、コードが意図することをより明確に表現できます。  
*   **ボイラープレートコードの削減**: 従来のイテレーションで必要だった多くの定型的なコード（ループの初期化、カウンター、条件判定など）が不要になります。  
*   **内部イテレーション**: コレクションの要素をどのように処理するかをStream APIに任せることで、開発者は「何をしたいか」に集中できます。  
要素の反復処理はライブラリ内部で行われます。  
*   **遅延評価**: 中間操作は、終端操作が呼び出されるまで実際の処理を行いません。  
これにより、不要な処理が削減され、パフォーマンスが向上する場合があります。  
*   **並列処理の容易さ**: ほとんどのストリーム操作は、`parallelStream()`メソッドを呼び出すだけで簡単に並列化できます。  
これにより、マルチコアプロセッサの恩恵を容易に受けられます。  

## 3. Stream APIの基本概念  

Stream APIは、データソース、中間操作、終端操作という3つの主要な概念に基づいて動作します。  

### 3.1. ストリームのライフサイクル  

ストリームの操作は、以下の3つのステップで構成されます。  

1.  **ストリームの生成 (Source)**: コレクション、配列、I/Oチャネルなどからストリームを生成します。  
2.  **中間操作 (Intermediate Operations)**: 生成されたストリームに対して、0回以上の中間操作を適用します。  
中間操作はストリームを別のストリームに変換し、遅延評価されます。  
3.  **終端操作 (Terminal Operations)**: 最後に1つの終端操作を適用します。  
終端操作はストリームを消費し、結果（単一の値、コレクション、副作用など）を生成します。  
終端操作が実行されると、ストリームは閉じられ、再利用できません。  

### 3.2. 中間操作 (Intermediate Operations)  

中間操作は、ストリームを変換し、新たなストリームを返します。  
これらの操作は「遅延評価」されるため、終端操作が呼び出されるまで実際には実行されません。  

| 操作名       | 説明                                                                     | 戻り値        | 遅延評価 | ステートフル/レス |
| :----------- | :----------------------------------------------------------------------- | :------------ | :------- | :---------------- |
| `filter()`   | 指定された述語に一致する要素のみを含むストリームを返します。             | `Stream<T>`   | 遅延     | ステートレス      |
| `map()`      | 各要素に関数を適用し、結果のストリームを返します。                       | `Stream<R>`   | 遅延     | ステートレス      |
| `flatMap()`  | 各要素をストリームに変換し、それらのストリームを1つのストリームにフラット化します。 | `Stream<R>`   | 遅延     | ステートレス      |
| `distinct()` | 重複する要素を除去したストリームを返します。                             | `Stream<T>`   | 遅延     | ステートフル      |
| `sorted()`   | 要素を自然順序、または指定されたComparatorでソートしたストリームを返します。 | `Stream<T>`   | 遅延     | ステートフル      |
| `peek()`     | ストリームの各要素に対して副作用のある操作を実行します（デバッグなどに）。 | `Stream<T>`   | 遅延     | ステートレス      |
| `limit()`    | ストリームの要素数を指定された数に制限します。                           | `Stream<T>`   | 遅延     | ステートフル      |
| `skip()`     | ストリームの先頭から指定された数の要素をスキップします。                 | `Stream<T>`   | 遅延     | ステートフル      |
| `takeWhile()`| (Java 9+) 述語がtrueである間、要素をストリームに含めます。               | `Stream<T>`   | 遅延     | ステートレス      |
| `dropWhile()`| (Java 9+) 述語がtrueである間、要素をスキップします。                     | `Stream<T>`   | 遅延     | ステートレス      |

**ステートフル操作**は、ストリーム全体の状態を記憶する必要があるため、並列処理においてはパフォーマンスに影響を与える可能性があります。  

### 3.3. 終端操作 (Terminal Operations)  

終端操作は、ストリームを消費し、最終的な結果を生成します。  
終端操作が呼び出されると、中間操作を含め、ストリームパイプライン全体が実行されます。  
一度終端操作が実行されたストリームは、それ以降使用できません。  

| 操作名             | 説明                                                                     | 戻り値                                  |
| :----------------- | :----------------------------------------------------------------------- | :-------------------------------------- |
| `forEach()`        | ストリームの各要素に対して指定されたアクションを実行します。             | `void`                                  |
| `toArray()`        | ストリームの要素を含む配列を返します。                                 | `Object[]` or `T[]`                     |
| `reduce()`         | ストリームの要素を単一の結果に集約します。                             | `Optional<T>` or `T`                    |
| `collect()`        | ストリームの要素をCollectionなどに集めます。                             | 汎用 (例: `List<T>`, `Set<T>`, `Map<K, V>`) |
| `min()` / `max()`  | ストリームの最小/最大要素を返します。                                  | `Optional<T>`                           |
| `count()`          | ストリームの要素数を返します。                                         | `long`                                  |
| `anyMatch()`       | 述語に一致する要素が1つでもある場合に`true`を返します。                  | `boolean`                               |
| `allMatch()`       | すべての要素が述語に一致する場合に`true`を返します。                   | `boolean`                               |
| `noneMatch()`      | どの要素も述語に一致しない場合に`true`を返します。                       | `boolean`                               |
| `findFirst()`      | ストリームの最初の要素を返します。                                     | `Optional<T>`                           |
| `findAny()`        | ストリームの任意の要素を返します（並列ストリームで効率的）。           | `Optional<T>`                           |
| `sum()`            | (IntStream/LongStream/DoubleStream) 要素の合計を返します。             | `int`/`long`/`double`                   |
| `average()`        | (IntStream/LongStream/DoubleStream) 要素の平均を返します。             | `OptionalDouble`                        |

## 4. ストリームの生成方法  

様々なデータソースからストリームを生成できます。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamGeneration {
    public static void main(String[] args) {
        // 1. コレクションから
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        Stream<String> streamFromList = names.stream();
        streamFromList.forEach(System.out::println);
        System.out.println("---");

        // 2. 配列から
        String[] colors = {"Red", "Green", "Blue"};
        Stream<String> streamFromArray = Arrays.stream(colors);
        streamFromArray.forEach(System.out::println);
        System.out.println("---");

        // 3. Stream.of() メソッドから
        Stream<Integer> streamOfIntegers = Stream.of(1, 2, 3, 4, 5);
        streamOfIntegers.forEach(System.out::println);
        System.out.println("---");

        // 4. 数値範囲から (IntStream, LongStream, DoubleStream)
        IntStream intStreamRange = IntStream.range(1, 5); // 1, 2, 3, 4 (5は含まれない)
        intStreamRange.forEach(System.out::println);
        System.out.println("---");

        IntStream intStreamRangeClosed = IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5 (5も含まれる)
        intStreamRangeClosed.forEach(System.out::println);
        System.out.println("---");

        // 5. 無限ストリーム (Stream.iterate(), Stream.generate())
        // Stream.iterate(初期値, 条件述語, 単項演算子) Java 9以降
        Stream.iterate(1, n -> n <= 10, n -> n * 2)
              .forEach(System.out::println); // 1, 2, 4, 8
        System.out.println("---");

        // Stream.generate(Supplier)
        Stream.generate(Math::random)
              .limit(3) // 無限ストリームなのでlimitで制限する
              .forEach(System.out::println); // 3つのランダムなdouble値
        System.out.println("---");

        // 6. null許容要素を含むストリーム (Stream.ofNullable()) Java 9以降
        String nullableValue = null;
        Stream.ofNullable(nullableValue)
              .forEach(System.out::println); // 何も出力されない
        Stream.ofNullable("NonNull")
              .forEach(System.out::println); // "NonNull"が出力される
    }
}
```  

## 5. 主要な中間操作の詳細とコード例  

### 5.1. `filter()`  

指定された条件（述語 `Predicate`）に合致する要素のみを通過させます。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FilterExample {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange", "Grape", "Avocado");

        // "A"で始まるフルーツをフィルタリング
        List<String> filteredFruits = fruits.stream()
                                            .filter(s -> s.startsWith("A"))
                                            .collect(Collectors.toList());
        System.out.println(filteredFruits); // [Apple, Avocado]
    }
}
```  

### 5.2. `map()`  

ストリーム内の各要素に変換関数（`Function`）を適用し、変換後の要素からなる新しいストリームを生成します。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MapExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 各数値を2乗する
        List<Integer> squaredNumbers = numbers.stream()
                                              .map(n -> n * n)
                                              .collect(Collectors.toList());
        System.out.println(squaredNumbers); // [1, 4, 9, 16, 25]

        // 文字列を大文字に変換
        List<String> names = Arrays.asList("alice", "bob", "charlie");
        List<String> upperCaseNames = names.stream()
                                           .map(String::toUpperCase)
                                           .collect(Collectors.toList());
        System.out.println(upperCaseNames); // [ALICE, BOB, CHARLIE]
    }
}
```  

### 5.3. `flatMap()`  

各要素をストリームに変換し、それらのストリームを単一のストリームに「フラット化」します。  
ネストされたコレクションや配列を平坦化する際に特に有用です。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FlatMapExample {
    public static void main(String[] args) {
        List<List<String>> listOfLists = Arrays.asList(
            Arrays.asList("Apple", "Banana"),
            Arrays.asList("Orange", "Grape"),
            Arrays.asList("Strawberry")
        );

        // ネストされたリストを1つのリストにフラット化
        List<String> allFruits = listOfLists.stream()
                                            .flatMap(List::stream) // 各List<String>をStream<String>に変換
                                            .collect(Collectors.toList());
        System.out.println(allFruits); // [Apple, Banana, Orange, Grape, Strawberry]

        // 文書内のユニークな単語を抽出する例
        List<String> sentences = Arrays.asList(
            "Hello world",
            "Stream API in Java",
            "Hello Java"
        );
        List<String> uniqueWords = sentences.stream()
                                            .flatMap(s -> Arrays.stream(s.split(" "))) // 各文を単語のストリームに
                                            .distinct() // 重複を除去
                                            .sorted() // ソート
                                            .collect(Collectors.toList());
        System.out.println(uniqueWords); // [API, Hello, Java, Stream, in, world]
    }
}
```  

### 5.4. `distinct()`  

ストリーム内の重複する要素を除去し、ユニークな要素のみを含むストリームを返します。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class DistinctExample {
    public static void main(String[] args) {
        List<Integer> numbersWithDuplicates = Arrays.asList(1, 2, 2, 3, 4, 4, 5);

        List<Integer> distinctNumbers = numbersWithDuplicates.stream()
                                                             .distinct()
                                                             .collect(Collectors.toList());
        System.out.println(distinctNumbers); // [1, 2, 3, 4, 5]
    }
}
```  

### 5.5. `sorted()`  

ストリームの要素をソートします。  
引数なしの場合は自然順序でソートされ、`Comparator`を渡すことでカスタムソートが可能です。  

```java showLineNumbers
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SortedExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "David");

        // 自然順序でソート
        List<String> sortedNames = names.stream()
                                        .sorted()
                                        .collect(Collectors.toList());
        System.out.println(sortedNames); // [Alice, Bob, Charlie, David]

        // 長さでソート（昇順）
        List<String> sortedByLength = names.stream()
                                           .sorted(Comparator.comparingInt(String::length))
                                           .collect(Collectors.toList());
        System.out.println(sortedByLength); // [Bob, Alice, David, Charlie]
    }
}
```  

### 5.6. `limit()` と `skip()`  

*   `limit(long maxSize)`: ストリームの要素数を指定された最大数に制限します。  
*   `skip(long n)`: ストリームの先頭から指定された数の要素をスキップします。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LimitSkipExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 最初の5つの要素を取得
        List<Integer> firstFive = numbers.stream()
                                         .limit(5)
                                         .collect(Collectors.toList());
        System.out.println(firstFive); // [1, 2, 3, 4, 5]

        // 最初の3つの要素をスキップし、残りの要素を取得
        List<Integer> skippedThree = numbers.stream()
                                            .skip(3)
                                            .collect(Collectors.toList());
        System.out.println(skippedThree); // [4, 5, 6, 7, 8, 9, 10]

        // ページネーションのような組み合わせ
        // 4番目から6番目の要素を取得 (0-indexedで4番目から、つまり5番目の要素から3つ)
        List<Integer> page = numbers.stream()
                                    .skip(4) // 最初の4つをスキップ
                                    .limit(3) // その後の3つを取得
                                    .collect(Collectors.toList());
        System.out.println(page); // [5, 6, 7]
    }
}
```  

## 6. 主要な終端操作の詳細とコード例  

### 6.1. `forEach()`  

ストリームの各要素に対して指定されたアクション（`Consumer`）を実行します。  
返り値は`void`で、ストリームの要素を消費する用途に利用されます。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;

public class ForEachExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // 各名前を出力
        names.stream()
             .forEach(name -> System.out.println("Hello, " + name));
        // 出力:
        // Hello, Alice
        // Hello, Bob
        // Hello, Charlie
    }
}
```  

### 6.2. `collect()`  

ストリームの要素を様々な形式（List, Set, Map, カスタムのデータ構造など）に集約する強力な操作です。  
`Collectors`クラスに用意されている静的メソッドを組み合わせて使用します。  

#### 6.2.1. 基本的なコレクタ  

*   `toList()`: 要素を`List`に集めます。  
*   `toSet()`: 要素を`Set`に集めます（重複は除去されます）。  
*   `toMap(keyMapper, valueMapper)`: 要素を`Map`に集めます。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class CollectBasicExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apple", "orange", "grape");

        // Listに収集
        List<String> wordList = words.stream().collect(Collectors.toList());
        System.out.println("List: " + wordList); // List: [apple, banana, apple, orange, grape]

        // Setに収集 (重複除去)
        Set<String> wordSet = words.stream().collect(Collectors.toSet());
        System.out.println("Set: " + wordSet); // Set: [orange, banana, apple, grape] (順序は保証されない)

        // Mapに収集 (要素と文字列の長さをキーと値にする)
        // キーが重複する場合の解決策も指定可能 (例: (oldV, newV) -> oldV)
        Map<String, Integer> wordLengthMap = words.stream()
                                                  .distinct() // キーが重複しないようにdistinct()を追加
                                                  .collect(Collectors.toMap(
                                                      word -> word,          // キーは要素自身
                                                      String::length         // 値は要素の長さ
                                                  ));
        System.out.println("Map: " + wordLengthMap); // Map: {orange=6, banana=6, apple=5, grape=5}
    }
}
```  

#### 6.2.2. グループ化とパーティショニング  

*   `groupingBy(classifier)`: 要素を指定された基準でグループ化し、`Map<K, List<T>>`を生成します。  
*   `partitioningBy(predicate)`: 要素を述語に基づいて2つのグループ（`true`と`false`）に分割し、`Map<Boolean, List<T>>`を生成します。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GroupingPartitioningExample {
    static class Person {
        String name;
        int age;
        String city;

        public Person(String name, int age, String city) {
            this.name = name;
            this.age = age;
            this.city = city;
        }

        public String getName() { return name; }
        public int getAge() { return age; }
        public String getCity() { return city; }

        @Override
        public String toString() {
            return "Person{" + "name='" + name + '\'' + ", age=" + age + ", city='" + city + '\'' + '}';
        }
    }

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 30, "Tokyo"),
            new Person("Bob", 25, "Osaka"),
            new Person("Charlie", 30, "Tokyo"),
            new Person("David", 35, "Kyoto"),
            new Person("Eve", 25, "Osaka")
        );

        // 年齢でグループ化
        Map<Integer, List<Person>> peopleByAge = people.stream()
                                                      .collect(Collectors.groupingBy(Person::getAge));
        System.out.println("People by age: " + peopleByAge);
        // 出力例: {35=[Person{name='David', age=35, city='Kyoto'}], 25=[Person{name='Bob', age=25, city='Osaka'}, Person{name='Eve', age=25, city='Osaka'}], 30=[Person{name='Alice', age=30, city='Tokyo'}, Person{name='Charlie', age=30, city='Tokyo'}]}

        // 都市でグループ化し、各都市の人数をカウント
        Map<String, Long> countByCity = people.stream()
                                              .collect(Collectors.groupingBy(Person::getCity, Collectors.counting()));
        System.out.println("Count by city: " + countByCity); // Count by city: {Tokyo=2, Osaka=2, Kyoto=1}

        // 30歳以上か以下かでパーティショニング
        Map<Boolean, List<Person>> adultsAndMinors = people.stream()
                                                          .collect(Collectors.partitioningBy(p -> p.getAge() >= 30));
        System.out.println("Adults (>=30): " + adultsAndMinors.get(true));
        System.out.println("Minors (<30): " + adultsAndMinors.get(false));
    }
}
```  

### 6.3. `reduce()`  

ストリームの要素を単一の結果に集約します。  3つのオーバーロードがあります。  

1.  `Optional<T> reduce(BinaryOperator<T> accumulator)`: ストリームの最初の要素を初期値とし、アキュムレータ関数を適用します。  
ストリームが空の場合に備えて`Optional`を返します。  
2.  `T reduce(T identity, BinaryOperator<T> accumulator)`: `identity`を初期値とし、アキュムレータ関数を適用します。  
`identity`があるため、`Optional`は返しません。  
3.  `U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner)`: 並列処理を考慮した、より汎用的な`reduce`です。  
`identity`、`accumulator`、そして結果を結合するための`combiner`関数を指定します。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 1. 全ての要素の合計を計算 (Optional<Integer>を返す)
        Optional<Integer> sumOptional = numbers.stream()
                                               .reduce((a, b) -> a + b);
        sumOptional.ifPresent(s -> System.out.println("Sum (Optional): " + s)); // Sum (Optional): 15

        // 2. 初期値を与えて合計を計算 (Integerを返す)
        Integer sumWithIdentity = numbers.stream()
                                         .reduce(0, (a, b) -> a + b);
        System.out.println("Sum (with identity): " + sumWithIdentity); // Sum (with identity): 15

        // 3. 文字列を結合 (identity, accumulator, combiner)
        List<String> words = Arrays.asList("Hello", "World", "Java", "Stream");
        String combinedString = words.stream()
                                     .reduce("", (s1, s2) -> s1 + " " + s2);
        System.out.println("Combined String: " + combinedString.trim()); // Combined String: Hello World Java Stream

        // 単語の総文字数を計算
        Integer totalLength = words.stream()
                                   .reduce(0, // 初期値
                                           (partialSum, word) -> partialSum + word.length(), // 各要素の文字数を加算
                                           (a, b) -> a + b); // 並列処理で部分合計を結合
        System.out.println("Total length of words: " + totalLength); // Total length of words: 21
    }
}
```  

### 6.4. 数値集計操作 (`count()`, `sum()`, `average()` など)  

`IntStream`, `LongStream`, `DoubleStream`などのプリミティブ型ストリームで利用できる集計操作です。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.OptionalDouble;
import java.util.OptionalInt;

public class NumericSummaryExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // count()
        long count = numbers.stream().count();
        System.out.println("Count: " + count); // Count: 5

        // sum() (IntStreamに変換)
        int sum = numbers.stream()
                         .mapToInt(Integer::intValue)
                         .sum();
        System.out.println("Sum: " + sum); // Sum: 15

        // average() (IntStreamに変換)
        OptionalDouble average = numbers.stream()
                                        .mapToInt(Integer::intValue)
                                        .average();
        average.ifPresent(avg -> System.out.println("Average: " + avg)); // Average: 3.0

        // min() (IntStreamに変換)
        OptionalInt min = numbers.stream()
                                 .mapToInt(Integer::intValue)
                                 .min();
        min.ifPresent(m -> System.out.println("Min: " + m)); // Min: 1

        // max() (IntStreamに変換)
        OptionalInt max = numbers.stream()
                                 .mapToInt(Integer::intValue)
                                 .max();
        max.ifPresent(m -> System.out.println("Max: " + m)); // Max: 5
    }
}
```  

### 6.5. マッチング操作 (`anyMatch()`, `allMatch()`, `noneMatch()`)  

ストリーム内の要素が特定の条件に一致するかどうかを判定し、`boolean`値を返します。  

*   `anyMatch(Predicate)`: 1つでも一致する要素があれば`true`。  
*   `allMatch(Predicate)`: すべての要素が一致すれば`true`。  
*   `noneMatch(Predicate)`: どの要素も一致しなければ`true`。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;

public class MatchExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 偶数が含まれているか？
        boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);
        System.out.println("Contains even number? " + hasEven); // true

        // 全て偶数か？
        boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);
        System.out.println("All numbers are even? " + allEven); // false

        // 10より大きい数がないか？
        boolean noneGreaterThanTen = numbers.stream().noneMatch(n -> n > 10);
        System.out.println("No number greater than 10? " + noneGreaterThanTen); // true
    }
}
```  

### 6.6. 検索操作 (`findFirst()`, `findAny()`)  

ストリームから要素を検索し、`Optional<T>`を返します。  

*   `findFirst()`: ストリームの最初の要素を返します。  
順序が重要な場合に利用します。  
*   `findAny()`: ストリームの任意の要素を返します。  
並列ストリームでは、パフォーマンス上の利点がある場合があります（どの要素が返されるかは保証されません）。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class FindExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // 最初の要素を見つける
        Optional<String> first = names.stream().findFirst();
        first.ifPresent(s -> System.out.println("First element: " + s)); // First element: Alice

        // "C"で始まる任意の要素を見つける
        Optional<String> anyC = names.stream()
                                     .filter(s -> s.startsWith("C"))
                                     .findAny();
        anyC.ifPresent(s -> System.out.println("Any element starting with 'C': " + s)); // Any element starting with 'C': Charlie (並列実行では異なる場合もある)
    }
}
```  

## 7. Optionalクラスとの連携  

`min()`, `max()`, `findFirst()`, `findAny()`, `reduce()`（identityなし）などの終端操作は、ストリームが空である可能性を考慮して`Optional`を返します。  
`Optional`は、値が存在しない可能性を明示的に示すためのコンテナオブジェクトです。  

`Optional`の主な操作は以下の通りです。  

*   `isPresent()`: 値が存在するかどうか。  
*   `isEmpty()`: 値が存在しないかどうか (Java 11+)。  
*   `get()`: 値を取得します（値がない場合は`NoSuchElementException`をスロー）。  
*   `orElse(T other)`: 値が存在する場合はその値を返し、存在しない場合は指定されたデフォルト値を返します。  
*   `orElseGet(Supplier<? extends T> other)`: 値が存在する場合はその値を返し、存在しない場合はSupplierから提供される値を返します。  
*   `orElseThrow(Supplier<? extends X> exceptionSupplier)`: 値が存在する場合はその値を返し、存在しない場合は指定された例外をスローします。  
*   `ifPresent(Consumer<? super T> consumer)`: 値が存在する場合にのみ、指定されたConsumerを実行します。  
*   `map(Function<? super T, ? extends U> mapper)`: 値が存在する場合に、その値に関数を適用してOptionalを返します。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class OptionalExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob");
        List<String> emptyList = Arrays.asList();

        // 最初の要素を取得
        Optional<String> firstPerson = names.stream().findFirst();
        firstPerson.ifPresent(name -> System.out.println("First person: " + name)); // First person: Alice

        // 空のストリームの場合
        Optional<String> firstPersonEmpty = emptyList.stream().findFirst();
        System.out.println("Is first person from empty list present? " + firstPersonEmpty.isPresent()); // false

        // orElseを用いたデフォルト値
        String defaultName = firstPersonEmpty.orElse("No one");
        System.out.println("Default name: " + defaultName); // Default name: No one

        // mapとorElse
        String upperCaseName = firstPerson.map(String::toUpperCase)
                                          .orElse("NO NAME");
        System.out.println("Uppercase name: " + upperCaseName); // Uppercase name: ALICE

        String upperCaseNameEmpty = firstPersonEmpty.map(String::toUpperCase)
                                                     .orElse("NO NAME");
        System.out.println("Uppercase name (empty): " + upperCaseNameEmpty); // Uppercase name (empty): NO NAME
    }
}
```  

## 8. 並列ストリーム (Parallel Streams)  

Stream APIは、簡単に並列処理を行うためのメカニズムを提供します。  
`Collection`からストリームを生成する際に`parallelStream()`メソッドを使用するか、既存のストリームに対して`parallel()`中間操作を適用することで、ストリームパイプラインの処理を並列化できます。  

```java showLineNumbers
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ParallelStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 通常のストリーム
        long serialSum = numbers.stream()
                                .peek(n -> System.out.println("Serial processing: " + n + " by " + Thread.currentThread().getName()))
                                .mapToInt(Integer::intValue)
                                .sum();
        System.out.println("Serial sum: " + serialSum);
        System.out.println("---");

        // 並列ストリーム
        // 出力順序は保証されない
        long parallelSum = numbers.parallelStream() // parallelStream()を使用
                                  .peek(n -> System.out.println("Parallel processing: " + n + " by " + Thread.currentThread().getName()))
                                  .mapToInt(Integer::intValue)
                                  .sum();
        System.out.println("Parallel sum: " + parallelSum);
    }
}
```  

**注意点**:  
*   **パフォーマンス**: 並列ストリームは、データ量が多く、各要素に対する処理が独立しており、CPUバウンドな処理である場合に効果を発揮します。  
I/Oバウンドな処理や、データ量が少ない場合は、オーバーヘッドのためかえって遅くなることがあります。  
*   **スレッドセーフティ**: 並列ストリームで共有される状態（例えば、`forEach`内で外部のリストに追加するなど）を更新する場合は、スレッドセーフなコレクションや適切な同期メカニズムを使用する必要があります。  
`collect`操作は、通常、スレッドセーフに設計されています。  
*   **順序**: `forEach`, `findAny`, `reduce`など一部の操作は、並列実行時に順序を保証しません。  順序が必要な場合は`findFirst`や`sorted`などを使用する必要があります。  

## 9. Stream APIの進化 (補足)  

Java 9以降、Stream APIにはいくつかの新機能が追加されています。  
Java 17はこれらの機能を含んでいます。  

*   **`takeWhile()` / `dropWhile()` (Java 9)**: 述語がtrueである間要素を含める/スキップする操作です。  
ソートされたストリームで効率的に機能します。  
*   **`ofNullable()` (Java 9)**: nullではない単一の要素からなるストリームを生成します。  
引数がnullの場合、空のストリームを生成します。  
*   **`iterate()`のオーバーロード (Java 9)**: `Stream.iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next)`の形式が追加され、ループ条件を指定できるようになりました（従来の`for`ループに似た記述が可能に）。  
*   **`Collectors.teeing()` (Java 12)**: 2つのコレクタを並行して実行し、その結果を結合する機能です。  

これらの新機能は、より柔軟なストリーム操作を可能にします。  

## 10. まとめ  

Stream APIは、Javaでデータ処理を行うための強力なツールです。  
適切に利用することで、コードの品質とパフォーマンスを向上させることができます。  

**ベストプラクティス**:  
*   **遅延評価を理解する**: 中間操作は終端操作が呼び出されるまで実行されないことを意識し、不必要な処理を行わないようにパイプラインを設計しましょう。  
*   **副作用のない操作を心がける**: ストリーム操作は、可能な限り副作用のない（状態を変更しない）純粋関数を使用するようにしましょう。  
これは並列処理の安全性にもつながります。  
*   **`Optional`を適切に扱う**: `Optional`を返す操作の結果は、`isPresent()`, `orElse()`, `map()`などを用いて適切に処理しましょう。  
`get()`の安易な使用は避け、`NoSuchElementException`のリスクを回避しましょう。  
*   **並列処理は慎重に**: 並列ストリームは強力ですが、常にパフォーマンスが向上するわけではありません。  データサイズ、処理の種類、スレッドセーフティの考慮事項をよく理解した上で適用しましょう。  
*   **可読性を重視する**: 複雑なストリームパイプラインは、複数の行に分割したり、中間結果を変数に格納したりすることで可読性を高められます。  
