# ArrayList

### 1. はじめに

Javaにはデータを複数扱うための仕組みがいくつか存在します。  
その中でも、最も頻繁に利用されるデータ構造の一つが `ArrayList` です。

### 2. 配列の限界

まず、Javaの基本的なデータ構造である「配列」について復習し、その限界点を理解することから始めましょう。

**特徴:**
*   **固定長:** 配列は宣言時にサイズ（要素数）を決定する必要があり、後から変更することはできません。
*   **型安全:** 特定の型のデータのみを格納できます。
*   **プリミティブ型も直接扱える:** `int[]`, `double[]` のようにプリミティブ型を直接格納できます。

**問題点:**
*   **要素数の変更が困難:** 実行中に要素数を増減させたい場合、新しいサイズの配列を作り直し、元のデータをコピーするという手間が発生します。
*   **要素の追加・削除が非効率:** 配列の途中に要素を追加したり削除したりすると、それ以降の要素をすべてずらす必要があり、非効率です。

**サンプルコード：配列の基本と限界**

```java showLineNumbers
public class ArrayExample {
    public static void main(String[] args) {
        System.out.println("--- 配列の基本 ---");

        // 1. 配列の宣言と初期化（固定長）
        // String型の要素を3つ格納できる配列を宣言
        String[] fruits = new String[3];

        // 要素への代入
        fruits[0] = "Apple";
        fruits[1] = "Banana";
        fruits[2] = "Cherry";

        // 要素の取得
        System.out.println("1番目のフルーツ: " + fruits[0]);
        System.out.println("配列の長さ: " + fruits.length);

        // ループでの表示
        System.out.print("現在のフルーツ: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println("\n");

        System.out.println("--- 配列の限界：要素数の変更 ---");

        // 2. 配列のサイズ変更の試み（直接はできない）
        // 例: 新しいフルーツ "Date" を追加したいが、配列は満杯
        // fruits[3] = "Date"; // これはコンパイルエラーまたは実行時エラー (ArrayIndexOutOfBoundsException) になる

        // 解決策: 新しい配列を作成し、コピーする
        System.out.println("「Date」を追加するため、新しい配列にコピーします...");
        String[] newFruits = new String[fruits.length + 1]; // サイズを1増やした新しい配列

        // 旧配列の要素を新配列にコピー
        for (int i = 0; i < fruits.length; i++) {
            newFruits[i] = fruits[i];
        }
        newFruits[fruits.length] = "Date"; // 新しい要素を追加

        fruits = newFruits; // 参照を新しい配列に切り替える

        System.out.println("新しい配列の長さ: " + fruits.length);
        System.out.print("更新後のフルーツ: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println("\n");

        System.out.println("--- 配列の限界：要素の途中挿入・削除 ---");

        // 3. 要素の途中挿入（例: BananaとCherryの間にGrapeを挿入）
        // 配列の場合、非常に手間がかかる
        // この操作を行うためには、さらに大きな配列を作成し、要素をずらしながらコピーする必要がある
        System.out.println("配列の途中挿入は非常に複雑です。（ここではコードは省略）");

        // 4. 配列に異なる型の要素を格納する（ジェネリクスなしのArrayListとの比較用）
        // Object型の配列なら可能だが、取り出すときにキャストが必要で型安全ではない
        Object[] mixedObjects = new Object[2];
        mixedObjects[0] = "Hello";
        mixedObjects[1] = 123; // intはIntegerにオートボクシングされる

        // 取り出す際にキャストが必要で、型を誤るとClassCastExceptionが発生する可能性
        String str = (String) mixedObjects[0];
        // Integer num = (Integer) mixedObjects[1]; // これはOK
        // Double dbl = (Double) mixedObjects[1]; // 実行時エラー (ClassCastException) になる可能性

        System.out.println("Object配列から取り出し: " + str);
        // System.out.println("誤った型で取り出し（コメントアウト）: " + dbl);
    }
}
```

**解説:**
配列はメモリ上で連続した領域を確保するため、インデックスによるアクセスは非常に高速です。  
しかし、一度宣言した配列のサイズは変更できないという根本的な制約があります。  
要素数の変更や、途中への要素の挿入・削除は、新しい配列の作成と既存要素のコピーという非常に手間のかかる操作を伴います。  
また、ジェネリクスが導入される前の`Object`配列のように、異なる型の要素を格納できる仕組みは、実行時まで型エラーが検出されないという型安全性の問題も抱えていました。  
これらの配列の限界こそが、`ArrayList`のような「可変長コレクション」が必要とされる理由です。


### 3. ArrayListとは

`ArrayList` は、Javaの `java.util` パッケージに属するコレクションフレームワークの一つです。  
その名の通り、「可変長配列（Dynamic Array）」として機能します。  
内部的には配列を利用していますが、要素の追加や削除に応じて自動的に配列のサイズを調整してくれます。

**特徴:**
*   **可変長:** 必要に応じて自動的にサイズが拡張・縮小されます。開発者がサイズ変更の手間を考える必要がありません。
*   **要素の追加・削除が容易:** 専用のメソッド（`add()`, `remove()`など）が用意されており、簡単かつ効率的に操作できます。
*   **順序が保持される:** 要素が追加された順序で格納されます。
*   **インデックスアクセスが可能:** 配列と同様に、インデックス（0から始まる番号）を使って要素にアクセスできます。
*   **オブジェクトのみ格納可能:** `ArrayList` はプリミティブ型（`int`, `double` など）を直接格納することはできません。  
これらを格納したい場合は、対応するラッパークラス（`Integer`, `Double` など）を利用する必要があります（オートボクシング/アンボクシングによって透過的に扱 えることが多いです）。
*   **`List` インターフェースを実装:** `ArrayList` は `List` インターフェースを実装しており、`List` の持つ共通の操作（`add`, `get`, `remove` など）を利用できます。

### 4. ジェネリクス（Generics）とは

`ArrayList` を含むJavaの多くのコレクションクラスは「ジェネリクス」をサポートしています。  
ジェネリクスはJava 5で導入された機能で、**コンパイル時の型安全性を高める**ことを目的としています。

**ジェネリクスなしの問題点 (旧いJavaでのArrayList)**

ジェネリクスが導入される前の`ArrayList`は、あらゆる型のオブジェクトを格納できる `ArrayList` (raw type) として使われていました。

```java showLineNumbers
// 旧いJavaでの例（推奨されない書き方）
ArrayList rawList = new ArrayList(); // ジェネリクスなし
rawList.add("Hello");
rawList.add(123); // Integer (オートボクシング)

// 取り出す際に、開発者が型を把握し、明示的にキャストする必要があった
String s = (String) rawList.get(0);
Integer i = (Integer) rawList.get(1);
// Double d = (Double) rawList.get(1); // これだとClassCastExceptionが発生する可能性！
```
この場合、誤った型でキャストしようとすると、**実行時**になって `ClassCastException` が発生し、プログラムがクラッシュするリスクがありました。

**ジェネリクスによる解決策**

ジェネリクスを使用すると、`ArrayList` がどのような型の要素を格納するのかを**コンパイル時**に指定できます。  
`ArrayList<String>` のように、クラス名の後に `<型名>` を記述します。

```java showLineNumbers
// ジェネリクスを使用
ArrayList<String> names = new ArrayList<String>(); // Java 6以前の記述
ArrayList<String> names = new ArrayList<>();        // Java 7以降の記述（ダイヤモンド演算子）
```

**メリット:**
1.  **コンパイル時の型チェック:** 指定した型以外の要素を追加しようとすると、コンパイルエラーになります。  
これにより、実行時エラーの多くを防ぐことができます。
2.  **キャスト不要:** 要素を取り出す際に、明示的な型キャストが不要になります。  
コードが簡潔になり、可読性が向上します。
3.  **コードの再利用性向上:** 同じロジックで異なる型のデータを扱えるため、汎用的なクラスやメソッドを作成しやすくなります。

### 5. ArrayListの基本操作（サンプルコード）

それでは、`ArrayList` の基本的な使い方をコードで確認していきましょう。

```java showLineNumbers
import java.util.ArrayList; // ArrayListを使うために必要
import java.util.List;    // Listインターフェースを使うことも推奨される

public class ArrayListExample {
    public static void main(String[] args) {

        System.out.println("--- ArrayListの宣言とジェネリクス ---");
        // 1. ArrayListの宣言と初期化 (ジェネリクスを使用)
        // <String> はこのArrayListがString型のみを格納することを示す。
        // Java 7以降では、右側の <> の中の型は省略可能（ダイヤモンド演算子）
        ArrayList<String> studentNames = new ArrayList<>();

        // 一般的には、インターフェース型で宣言することが推奨されます
        // ListインターフェースはArrayList以外にもLinkedListなど様々な実装があるため、
        // 実装の詳細に依存しない柔軟なコードになります。
        List<Integer> studentScores = new ArrayList<>();

        System.out.println("初期状態のリストの要素数: " + studentNames.size());
        System.out.println("リストは空か？: " + studentNames.isEmpty());
        System.out.println("\n");

        System.out.println("--- 要素の追加 (add) ---");
        // 2. 要素の追加: add() メソッド
        studentNames.add("Alice");  // リストの末尾に追加
        studentNames.add("Bob");
        studentNames.add("Charlie");
        System.out.println("要素追加後: " + studentNames); // ListのtoString()が呼ばれる
        System.out.println("現在の要素数: " + studentNames.size());

        // 指定したインデックスに要素を挿入 (既存の要素は後ろにずれる)
        studentNames.add(1, "David"); // 1番目のインデックスにDavidを挿入
        System.out.println("David挿入後: " + studentNames);
        System.out.println("\n");

        // ジェネリクスによる型安全性の確認
        // studentNames.add(123); // コンパイルエラー！ String型以外は追加できない

        System.out.println("--- 要素の取得 (get) ---");
        // 3. 要素の取得: get(index) メソッド (0-based index)
        String firstStudent = studentNames.get(0);
        String thirdStudent = studentNames.get(2);
        System.out.println("最初の学生: " + firstStudent);
        System.out.println("3番目の学生 (インデックス2): " + thirdStudent);
        // String otherType = studentNames.get(0); // キャスト不要！String型として直接受け取れる
        // int invalidIndex = studentNames.get(100); // 実行時エラー: IndexOutOfBoundsException
        System.out.println("\n");

        System.out.println("--- 要素の変更 (set) ---");
        // 4. 要素の変更: set(index, element) メソッド
        // 2番目の要素 (Bob) を Eve に変更
        String oldName = studentNames.set(2, "Eve"); // setは変更前の要素を返す
        System.out.println("2番目の要素をEveに変更後: " + studentNames);
        System.out.println("変更前の要素: " + oldName); // Bob
        System.out.println("\n");

        System.out.println("--- 要素の削除 (remove) ---");
        // 5. 要素の削除: remove() メソッド
        // a) インデックスで削除
        String removedStudentByIndex = studentNames.remove(0); // Aliceを削除
        System.out.println("インデックス0を削除後 (" + removedStudentByIndex + "が削除された): " + studentNames);

        // b) オブジェクトで削除 (最初の合致する要素を削除)
        boolean isRemoved = studentNames.remove("Eve"); // Eveを削除
        System.out.println("Eveを削除後 (" + isRemoved + "): " + studentNames);
        System.out.println("現在の要素数: " + studentNames.size());

        boolean notFound = studentNames.remove("Frank"); // 存在しない要素を削除しようとする
        System.out.println("Frankを削除試行 (" + notFound + "): " + studentNames);
        System.out.println("\n");

        System.out.println("--- 要素の検索 (contains) ---");
        // 6. 要素の検索: contains(element) メソッド
        System.out.println("リストにBobはいるか？: " + studentNames.contains("Bob"));
        System.out.println("リストにCharlieはいるか？: " + studentNames.contains("Charlie"));
        System.out.println("\n");

        System.out.println("--- リストの繰り返し処理 ---");
        // 7. リストの繰り返し処理 (イテレーション)
        System.out.println("拡張forループ (推奨):");
        for (String name : studentNames) {
            System.out.println("学生名: " + name);
        }
        System.out.println();

        System.out.println("従来のforループ (インデックスが必要な場合):");
        for (int i = 0; i < studentNames.size(); i++) {
            System.out.println("学生名 (インデックス " + i + "): " + studentNames.get(i));
        }
        System.out.println();

        // Java 8以降のStream API (forEach)
        System.out.println("forEach + ラムダ式 (Java 8+):");
        studentNames.forEach(name -> System.out.println("学生名 (forEach): " + name));
        System.out.println("\n");

        System.out.println("--- すべての要素の削除 (clear) ---");
        // 8. すべての要素を削除: clear() メソッド
        studentNames.clear();
        System.out.println("全要素削除後: " + studentNames);
        System.out.println("リストは空か？: " + studentNames.isEmpty());
        System.out.println("現在の要素数: " + studentNames.size());
    }
}
```

### 6. 配列 ・ ArrayList 比較表

| 特徴           | 配列                                  | ArrayList                                    |
| :------------- | :------------------------------------------- | :------------------------------------------- |
| **サイズ**     | 固定長。宣言時に決定。後から変更不可。       | 可変長。必要に応じて自動で拡張・縮小される。 |
| **型**         | プリミティブ型、参照型（オブジェクト）を直接格納可能。 | 参照型（オブジェクト）のみ格納可能。プリミティブ型はラッパークラスで。 |
| **ジェネリクス** | なし（型を指定するが、コンパイル時の型安全性は限定的） | あり（コンパイル時の型安全性を提供）。       |
| **初期化**     | `new String[10]` または `{}` で初期化。      | `new ArrayList<>()` で初期化。               |
| **要素追加**   | 不可。新しい配列を作り直してコピーする必要がある。 | `add()` メソッドで追加。              |
| **要素削除**   | 不可。要素をずらし、`null` で埋めるなどの手動操作が必要。 | `remove()` メソッドで削除。           |
| **要素アクセス** | `array[index]` で高速。                      | `get(index)` メソッドで高速（内部的に配列）。 |
| **用途**       | サイズが固定で、高速なインデックスアクセスが最優先される場合。 | サイズが可変で、要素の追加・削除が頻繁な場合。 |
| **メモリ効率** | 比較的良い。                                 | 配列拡張のために、ややオーバーヘッドがある。 |

### 7. いつArrayListを使うべきか

*   **要素数が事前に分からない、または頻繁に変動する場合:** これがArrayListを使う最大の理由です。
*   **要素の追加・削除が頻繁に行われる場合（特に末尾への追加・削除）:** `add()` や `remove()` が非常に便利です。
*   **インデックスを使った要素へのアクセスが頻繁な場合:** 内部が配列のため、ランダムアクセスは高速です。
*   **要素の順序が重要である場合:** 追加された順序が保持されます。

### 8. まとめ

*   **配列の限界:** 固定長であるため、要素数の変更や途中の追加・削除が非効率。
*   **`ArrayList` の利点:** 可変長であり、要素の追加・削除が容易。内部的に配列を利用しているため、インデックスアクセスが高速。
*   **ジェネリクスの重要性:** `<T>` の形で型を指定することで、コンパイル時に型安全性を保証し、`ClassCastException` のような実行時エラーを防ぎ、コードの可読性を高める。

