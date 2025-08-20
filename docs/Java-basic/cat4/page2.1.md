# Collections Framework

## 1.  Collections Framework とは  

Collections Frameworkは、Javaでデータの集まり（コレクション）を扱うための、統一されたアーキテクチャを提供するフレームワークです。  
配列が固定長のデータ構造であるのに対し、コレクションは動的に要素数を変更できる柔軟性を提供します。  

### 1.1.  必要性  

*   **データ構造の抽象化**:  リスト、セット、マップなど、様々なデータ構造を共通のインターフェースで扱えます。  
*   **再利用可能なアルゴリズム**:  ソート、検索、シャッフルなどの一般的な操作が、`Collections`ユーティリティクラスとして提供されており、容易に利用できます。  
*   **パフォーマンスの最適化**:  様々なデータ構造の実装が提供されており、要件に合わせて最適なものを選択することで、パフォーマンスを向上させることができます。  
*   **型安全性**:  Java 5以降のジェネリクス（Generics）により、コレクションに格納する要素の型をコンパイル時に指定でき、実行時エラーを防ぐことができます。  

---

## 2.  主要インターフェース  

Collections Frameworkの核となるのは、いくつかの主要なインターフェースです。  
これらはデータの集まりが持つべき基本的な操作を定義します。  

### 2.1.  `Collection` インターフェース  

`Collection`は、要素のグループを表す最上位のインターフェースです。  
ここから派生する`List`、`Set`、`Queue`が、より具体的なコレクションの型を定義します。  
`Map`は`Collection`インターフェースを直接継承していませんが、Collections Frameworkの一部として扱われます。  

### 2.2.  各インターフェースの特徴と用途  

| インターフェース | 特徴                                                              | 主な用途                                       |
| :--------------- | :---------------------------------------------------------------- | :--------------------------------------------- |
| `List`           | 順序付けされた要素のコレクションです。  重複した要素も格納できます。  要素にはインデックスでアクセスできます。  | 要素の順序が重要な場合（例: ログの記録順、メニュー項目）。  |
| `Set`            | 重複のない要素のコレクションです。  一般的に要素の順序は保証されません（実装による）。  | 重複を排除したい場合（例: ユニークなIDの集合、タグの集合）。  |
| `Queue`          | 要素を特定の順序で処理するためのコレクションです。  主にFIFO (First-In, First-Out) やLIFO (Last-In, First-Out) のデータ構造を表現します。  | タスクキュー、イベント処理、幅優先探索など。  |
| `Map`            | キーと値のペアを格納するオブジェクトです。  キーは重複できませんが、値は重複可能です。  各キーは最大1つの値にマッピングされます。  | ディクショナリ、設定情報、DBレコードの表現など。  |

---

## 3.  主要実装クラス  

各インターフェースには、様々な実装クラスが存在します。  
それぞれのクラスは、特定のパフォーマンス特性や機能を持っています。  

### 3.1.  `List` インターフェースの実装  

| クラス        | 特徴                                                         | パフォーマンス（一般論）                 | 用途                                       |
| :------------ | :----------------------------------------------------------- | :--------------------------------------- | :----------------------------------------- |
| `ArrayList`   | 動的配列に基づいて実装されます。  要素へのランダムアクセス（インデックス指定での読み書き）が高速です。  リストの途中での要素の追加・削除は、要素の移動が発生するため低速になる傾向があります。  | 読み込み: O(1)  挿入/削除（末尾以外）: O(n) | 要素のランダムアクセスが頻繁に行われる場合。  |
| `LinkedList`  | 双方向連結リストに基づいて実装されます。  要素へのランダムアクセスは低速です。  リストの途中での要素の追加・削除は、参照の付け替えのみで済むため高速です。  | 読み込み: O(n)  挿入/削除（途中）: O(1)     | 頻繁な要素の追加・削除が必要な場合。  `Queue`や`Deque`としても利用できます。  |

**使用例:**  

```java showLineNumbers
import java.util.ArrayList;
import java.util.List;

public class ListExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(); // String型のリスト
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        System.out.println("リストの要素: " + names); // [Alice, Bob, Charlie]

        // インデックス2の要素を取得
        String name = names.get(2);
        System.out.println("インデックス2の要素: " + name); // Charlie

        // インデックス1に新しい要素を追加
        names.add(1, "David");
        System.out.println("要素追加後のリスト: " + names); // [Alice, David, Bob, Charlie]

        // 要素を削除
        names.remove("Bob");
        System.out.println("要素削除後のリスト: " + names); // [Alice, David, Charlie]
    }
}
```

### 3.2.  `Set` インターフェースの実装  

| クラス          | 特徴                                                                  | 順序保証       | パフォーマンス（一般論） | 用途                                                   |
| :-------------- | :-------------------------------------------------------------------- | :------------- | :----------------------- | :----------------------------------------------------- |
| `HashSet`       | ハッシュテーブルに基づいて実装されます。  最も高速なSetの実装ですが、要素の順序は保証されません。  nullを1つだけ格納できます。  | なし           | ほぼO(1)                 | 順序を気にせず、高速に重複を排除したい場合。  |
| `LinkedHashSet` | ハッシュテーブルと連結リストの組み合わせです。  要素の挿入順を保持します。  `HashSet`よりはわずかに遅いですが、順序が必要な場合に便利です。  | 挿入順         | ほぼO(1)                 | 挿入順を保持しつつ、高速に重複を排除したい場合。  |
| `TreeSet`       | 赤黒木（Red-Black Tree）に基づいて実装されます。  要素をソートされた順序で保持します（自然順序または`Comparator`による指定順）。  `HashSet`より遅いですが、ソートされたSetが必要な場合に利用します。  | 自然順序/指定順 | O(log n)                 | 要素をソートされた順序で扱いたい場合（例: 辞書順、数値順）。  |

**使用例:**  

```java showLineNumbers
import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        Set<Integer> uniqueNumbers = new HashSet<>(); // Integer型のSet
        uniqueNumbers.add(10);
        uniqueNumbers.add(20);
        uniqueNumbers.add(10); // 重複は追加されない
        uniqueNumbers.add(30);
        System.out.println("Setの要素: " + uniqueNumbers); // [20, 10, 30] (順序は保証されない)

        boolean added = uniqueNumbers.add(20);
        System.out.println("20を追加しようとした結果 (追加されたか): " + added); // false

        boolean contains = uniqueNumbers.contains(30);
        System.out.println("30が含まれているか: " + contains); // true
    }
}
```

### 3.3.  `Queue` インターフェースの実装  

`Queue`インターフェースは、FIFO（First-In, First-Out）原則に基づいた要素のコレクションを表現します。  
Java 6からは`Deque`（Double Ended Queue）インターフェースも追加され、両端からの要素の追加・削除が可能になりました（LIFOスタックとしても利用可能）。  

| クラス        | 特徴                                                         | 用途                                                   |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------- |
| `LinkedList`  | `List`としても使用されますが、`Queue`および`Deque`インターフェースも実装しており、両端からの要素の追加・削除が効率的です。  | キュー（FIFO）、スタック（LIFO）、両端キューとして利用。  |
| `ArrayDeque`  | 配列ベースの双方向キューです。  `LinkedList`よりも一般的に高速で、`Queue`と`Deque`の両方の機能を提供します。  | `LinkedList`の代わりにキューやスタックとして使用する場合。  |
| `PriorityQueue` | 要素の自然順序またはコンストラクタで指定された`Comparator`に従って要素を並べ替えます。  取り出し時に最も優先度の高い要素が取得されます。  | タスクスケジューリング、優先度付きキューなど。  |

**使用例:**  

```java showLineNumbers
import java.util.ArrayDeque;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> taskQueue = new ArrayDeque<>(); // String型のキュー
        taskQueue.offer("Task A"); // 要素を追加 (成功するとtrueを返す)
        taskQueue.offer("Task B");
        taskQueue.offer("Task C");
        System.out.println("キューの要素: " + taskQueue); // [Task A, Task B, Task C]

        String firstTask = taskQueue.poll(); // 先頭の要素を取得し、キューから削除
        System.out.println("処理されたタスク: " + firstTask); // Task A
        System.out.println("残りのキューの要素: " + taskQueue); // [Task B, Task C]

        String nextTask = taskQueue.peek(); // 先頭の要素を取得 (削除はしない)
        System.out.println("次のタスク (削除しない): " + nextTask); // Task B
        System.out.println("残りのキューの要素: " + taskQueue); // [Task B, Task C]
    }
}
```

### 3.4.  `Map` インターフェースの実装  

| クラス          | 特徴                                                                  | 順序保証           | パフォーマンス（一般論） | 用途                                                   |
| :-------------- | :-------------------------------------------------------------------- | :----------------- | :----------------------- | :----------------------------------------------------- |
| `HashMap`       | ハッシュテーブルに基づいて実装されます。  最も高速なMapの実装ですが、キーと値の順序は保証されません。  nullキーを1つ、null値を複数格納できます。  | なし               | ほぼO(1)                 | 順序を気にせず、高速にキーと値のペアを扱いたい場合。  |
| `LinkedHashMap` | ハッシュテーブルと連結リストの組み合わせです。  キーの挿入順またはアクセス順を保持します。  `HashMap`よりはわずかに遅いですが、順序が必要な場合に便利です。  | 挿入順またはアクセス順 | ほぼO(1)                 | 挿入順またはアクセス順を保持しつつ、高速にキーと値のペアを扱いたい場合。  |
| `TreeMap`       | 赤黒木（Red-Black Tree）に基づいて実装されます。  キーをソートされた順序で保持します（自然順序または`Comparator`による指定順）。  `HashMap`より遅いですが、ソートされたMapが必要な場合に利用します。  | キーのソート順     | O(log n)                 | キーをソートされた順序で扱いたい場合。  範囲検索が必要な場合。  |

**使用例:**  

```java showLineNumbers
import java.util.HashMap;
import java.util.Map;

public class MapExample {
    public static void main(String[] args) {
        Map<String, String> capitals = new HashMap<>(); // キー: String, 値: String のMap
        capitals.put("Japan", "Tokyo");
        capitals.put("USA", "Washington D.C.");
        capitals.put("France", "Paris");
        System.out.println("Mapの要素: " + capitals); // {Japan=Tokyo, USA=Washington D.C., France=Paris} (順序は保証されない)

        // キーを指定して値を取得
        String capitalOfJapan = capitals.get("Japan");
        System.out.println("日本の首都: " + capitalOfJapan); // Tokyo

        // キーの存在チェック
        boolean containsKey = capitals.containsKey("Germany");
        System.out.println("ドイツが含まれているか: " + containsKey); // false

        // キーと値のペアを繰り返し処理
        for (Map.Entry<String, String> entry : capitals.entrySet()) {
            System.out.println(entry.getKey() + "の首都は" + entry.getValue());
        }
    }
}
```

---

## 4.  ユーティリティクラス: `Collections`  

`java.util.Collections`クラスは、コレクションに対する様々な便利な静的メソッドを提供します。  
これらは、コレクションの操作を簡素化し、標準的なアルゴリズムを再利用できるようにします。  

**主なメソッドの例:**  

*   `sort(List<T> list)`:  リストの要素を自然順序または`Comparator`に従ってソートします。  
*   `shuffle(List<?> list)`:  リストの要素をランダムにシャッフルします。  
*   `max(Collection<? extends T> coll)` / `min(Collection<? extends T> coll)`:  コレクション内の最大/最小要素を返します。  
*   `reverse(List<?> list)`:  リストの要素の順序を反転させます。  
*   `fill(List<? super T> list, T obj)`:  リストのすべての要素を指定されたオブジェクトで置き換えます。  
*   `synchronizedList(List<T> list)` / `synchronizedMap(Map<K,V> m)` など:  指定されたコレクションのスレッドセーフな（同期化された）ビューを返します。  

**使用例:**  

```java showLineNumbers
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsUtilityExample {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Orange");
        fruits.add("Banana");
        System.out.println("元のリスト: " + fruits); // [Apple, Orange, Banana]

        // リストをソート
        Collections.sort(fruits);
        System.out.println("ソート後のリスト: " + fruits); // [Apple, Banana, Orange]

        // リストをシャッフル
        Collections.shuffle(fruits);
        System.out.println("シャッフル後のリスト: " + fruits); // (毎回異なる順序)

        // リストの要素を全て"Grape"で埋める
        Collections.fill(fruits, "Grape");
        System.out.println("Fill後のリスト: " + fruits); // [Grape, Grape, Grape]
    }
}
```

---

## 5.  ジェネリクス (Generics) との連携  

Java 5で導入されたジェネリクスは、Collections Frameworkと密接に連携しています。  
コレクションを作成する際に、格納する要素の型を指定することで、型安全性が保証されます。  

**メリット:**  

*   **コンパイル時型チェック**:  誤った型の要素を追加しようとすると、コンパイルエラーになります。  
*   **キャスト不要**:  コレクションから要素を取り出す際に、明示的な型キャストが不要になります。  

**使用例:**  

```java showLineNumbers
import java.util.ArrayList;
import java.util.List;

public class GenericsExample {
    public static void main(String[] args) {
        // ジェネリクスを使用しない場合（非推奨）
        // List rawList = new ArrayList();
        // rawList.add("Hello");
        // rawList.add(123); // コンパイルエラーにならないが、実行時に問題を起こす可能性

        // ジェネリクスを使用する場合
        List<String> stringList = new ArrayList<>(); // String型のみを格納
        stringList.add("Java");
        stringList.add("Collections");
        // stringList.add(123); // コンパイルエラー: Incompatible types

        String firstElement = stringList.get(0); // キャスト不要
        System.out.println(firstElement);
    }
}
```

---

## 6.  イテレータ (Iterator)  

`Iterator`インターフェースは、コレクションの要素を順次走査（イテレート）するための標準的な方法を提供します。  
すべての`Collection`インターフェースを実装するクラスは、`iterator()`メソッドを提供し、`Iterator`オブジェクトを返します。  

**主なメソッド:**  

*   `hasNext()`:  イテレーションに次の要素がある場合に`true`を返します。  
*   `next()`:  イテレーションの次の要素を返します。  
*   `remove()`:  `next()`によって返された最後の要素をコレクションから削除します。（オプション操作）  

**拡張forループとの関係:**  

Java 5で導入された拡張forループ（for-eachループ）は、`Iterable`インターフェースを実装するすべてのオブジェクトに対して使用できます。
  `Collection`インターフェースは`Iterable`を継承しているため、すべてのコレクションで拡張forループが利用可能です。  
  これにより、`Iterator`を直接使用するよりも簡潔に要素を走査できます。  

**使用例:**  

```java showLineNumbers
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorExample {
    public static void main(String[] args) {
        List<String> programmingLanguages = new ArrayList<>();
        programmingLanguages.add("Java");
        programmingLanguages.add("Python");
        programmingLanguages.add("C++");
        programmingLanguages.add("JavaScript");

        // Iteratorを使用した走査
        System.out.println("--- Iteratorを使った走査 ---");
        Iterator<String> iterator = programmingLanguages.iterator();
        while (iterator.hasNext()) {
            String lang = iterator.next();
            System.out.println(lang);
            // 条件によっては要素を安全に削除できる
            // if (lang.equals("C++")) {
            //     iterator.remove();
            // }
        }
        System.out.println("Iterator走査後のリスト: " + programmingLanguages);


        // 拡張forループを使用した走査 (推奨)
        System.out.println("\n--- 拡張forループを使った走査 ---");
        for (String lang : programmingLanguages) {
            System.out.println(lang);
        }
        // 注意: 拡張forループ中にコレクションの構造を変更（追加・削除）すると、
        // ConcurrentModificationExceptionが発生する可能性があります。
    }
}
```

---

## 7.  Java 8以降の機能強化  

Java 8では、Collections Frameworkに関連する多くの機能強化が行われました。  
特にStream APIとデフォルトメソッドが重要です。  

### 7.1.  Stream API との連携  

Stream APIは、コレクションに対する関数型スタイルでの操作を可能にします。  
フィルタリング、マッピング、集約など、複雑なデータ処理を簡潔かつ効率的に記述できます。  

*   **コレクションからストリームへの変換**:  ほとんどのコレクションは`stream()`メソッド（Java 8で追加されたデフォルトメソッド）を提供しており、これを使って簡単にストリームに変換できます。  
*   **中間操作**:  `filter()`, `map()`, `sorted()`, `distinct()`など。  これらは新しいストリームを返します。  
*   **終端操作**:  `forEach()`, `collect()`, `reduce()`, `count()`, `min()`, `max()`など。  これらはストリームの処理を開始し、結果を生成します。  

**使用例:**  

```java showLineNumbers
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StreamApiExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("David");

        // ストリームAPIを使用して、'A'で始まる名前を抽出し、大文字に変換して新しいリストに収集
        List<String> filteredNames = names.stream()
            .filter(name -> name.startsWith("A")) // 'A'で始まる名前をフィルタリング
            .map(String::toUpperCase)          // 大文字に変換
            .collect(Collectors.toList());     // 結果をリストに収集

        System.out.println(filteredNames); // [ALICE]

        // 全ての名前の長さを合計
        int totalLength = names.stream()
            .mapToInt(String::length) // 各名前の長さをIntStreamに変換
            .sum();                   // 合計を計算

        System.out.println("名前の長さの合計: " + totalLength); // (5+3+7+5) = 20
    }
}
```

### 7.2.  デフォルトメソッド  

Java 8では、インターフェースにデフォルトメソッドを定義できるようになりました。  
これにより、既存のインターフェース（`Iterable`, `Collection`, `List`, `Map`など）に新しいメソッド（例: `forEach()`, `removeIf()`, `replaceAll()`, `sort()`, `compute()`, `merge()`など）を追加しても、既存の実装クラスを壊すことなく機能を追加できるようになりました。  

---

## 8.  並行コレクション (Concurrent Collections)  

マルチスレッド環境でコレクションを使用する場合、通常のコレクションクラス（`ArrayList`, `HashMap`など）はスレッドセーフではありません。  
複数のスレッドが同時にコレクションを変更しようとすると、データ破損や`ConcurrentModificationException`などの問題が発生する可能性があります。  

`java.util.concurrent`パッケージは、マルチスレッド環境での安全かつ効率的な操作をサポートするコレクションクラスを提供します。  

**主な並行コレクションの例:**  

*   `ConcurrentHashMap`:  `HashMap`のスレッドセーフな代替。  
高い並列性とスケーラビリティを提供します。  
*   `CopyOnWriteArrayList`:  書き込み操作時に新しい配列を作成することで、読み込み操作の競合をなくします。  
読み込みが頻繁で書き込みが少ない場合に適しています。  
*   `ConcurrentLinkedQueue`:  非ブロッキングのFIFOキュー。  
*   `BlockingQueue`インターフェースの実装 (`ArrayBlockingQueue`, `LinkedBlockingQueue`など):  要素の追加や取り出し時にスレッドをブロックできるキュー。  
プロデューサー・コンシューマーパターンなどで使用されます。  

**使用例 (ConcurrentHashMap):**  

```java showLineNumbers
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class ConcurrentMapExample {
    public static void main(String[] args) {
        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();

        // 複数のスレッドから安全にアクセスできる
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                concurrentMap.put("Key" + i, i);
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 500; i < 1500; i++) {
                concurrentMap.put("Key" + i, i * 2);
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("ConcurrentHashMapのサイズ: " + concurrentMap.size()); // 約1500
        System.out.println("Key999の値: " + concurrentMap.get("Key999")); // T1かT2どちらかの値
    }
}
```

---

## 9.  まとめ  

Collections Frameworkは、Javaプログラミングにおけるデータ管理の基盤となる非常に重要な要素です。  

*   **インターフェースの理解**:  `List`, `Set`, `Queue`, `Map`のそれぞれの特性を理解し、要件に合わせて適切なインターフェースを選択することが重要です。  
*   **実装クラスの選択**:  各インターフェースには複数の実装クラスがあり、それぞれのパフォーマンス特性やメモリ使用量を考慮して最適なものを選択することで、アプリケーション全体の効率が大きく変わります。  
*   **ジェネリクスの活用**:  型安全性を確保し、実行時エラーのリスクを減らすために、常にジェネリクスを使用しましょう。  
*   **Java 8以降の機能**:  Stream APIやデフォルトメソッドを積極的に活用し、より簡潔で表現力豊かなコードを記述しましょう。  
*   **並行処理**:  マルチスレッド環境では、`java.util.concurrent`パッケージの並行コレクションを正しく利用し、スレッドセーフなアプリケーションを構築しましょう。  

