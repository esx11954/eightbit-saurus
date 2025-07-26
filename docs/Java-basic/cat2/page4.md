# 配列・多次元配列

### 目的
この研修では、Javaにおける配列の基本的な概念、宣言、初期化、要素へのアクセス、そして多次元配列の扱い方について学習します。  
配列はプログラミングにおいて非常に頻繁に利用される基本的なデータ構造であり、その概念を深く理解することは、より複雑なデータ構造やアルゴリズムを学習する上での土台となります。  

### 1. 配列（単一次元配列）

#### 概要
配列は、**同じ型の複数のデータ**をひとまとめにして管理するための構造です。  
各データは「要素」と呼ばれ、0から始まる「インデックス」（添字）を使ってアクセスします。  

**特徴:**  
*   **固定長**: 一度サイズを決めると、後から変更することはできません。  
    *   これは、配列がメモリ上に連続した領域を確保するためです。  
        いったん確保した領域の途中に新しい要素を挿入したり、既存の要素を削除したりすることは、その後の要素の配置をずらす必要があり、非効率的であるため、サイズ変更ができないように設計されています。  
*   **同型**: すべての要素は同じデータ型でなければなりません。  
    *   これは、配列が各要素のメモリサイズを事前に知っている必要があるためです。  
        異なる型の要素が混在すると、メモリ上の要素の開始位置を特定するのが困難になります。  

#### 1.1. 宣言と初期化

配列を宣言する方法はいくつかあります。  
これらの方法は、配列がメモリ上にどのように確保され、デフォルト値がどのように設定されるかを理解する上で重要です。  

1.  **サイズを指定して宣言・初期化（要素はデフォルト値）**  
    *   `データ型[] 変数名 = new データ型[サイズ];`  
    *   この形式で配列を初期化すると、指定されたサイズのメモリ領域が確保され、すべての要素はそれぞれのデータ型に応じた**デフォルト値**で自動的に初期化されます。  
    *   例えば、`int`型配列の要素は`0`、`boolean`型は`false`、参照型（`String`など）は`null`になります。  
        これはJavaが安全なプログラミングを促進するため、未初期化の変数を許容しない設計になっているためです。  

2.  **要素の値を指定して宣言・初期化**  
    *   `データ型[] 変数名 = {値1, 値2, ...};`  
    *   この形式の場合、コンパイラが自動的に要素の数から配列のサイズを推測し、新しい配列を生成します。  
    *   `new データ型[サイズ]` の部分は不要です。  
        この方法は、配列の要素が初期時点で確定している場合に簡潔に記述できます。  

3.  **宣言と初期化を別々に行う**  
    *   `データ型[] 変数名;`  
    *   `変数名 = new データ型[サイズ];`  
    *   この方法では、まず配列変数を宣言し、その後で`new`キーワードを使って実際の配列オブジェクトをメモリ上に生成し、その参照を変数に代入します。  
    *   配列変数を宣言しただけでは、まだメモリ上に配列の領域は確保されていません。  
        `new`演算子を使うことで、ヒープ領域に配列オブジェクトが生成され、その参照（アドレス）が変数に格納されます。  



**サンプルコード:**  

```java showLineNumbers
public class ArrayTraining {

    public static void main(String[] args) {

        System.out.println("--- 1. 配列（単一次元配列） ---");

        // 1.1. 宣言と初期化
        System.out.println("\n--- 1.1. 宣言と初期化 ---");

        // (1) サイズを指定して宣言・初期化（要素はデフォルト値）
        int[] numbers = new int[5]; // int型の配列を5つの要素で作成
        System.out.println("int配列 'numbers' の初期状態 (サイズ5):");
        // 配列の内容を簡単に表示するために Arrays.toString() を利用
        // (import java.util.Arrays; が必要)
        System.out.println(java.util.Arrays.toString(numbers)); // => [0, 0, 0, 0, 0]

        String[] names = new String[3]; // String型の配列を3つの要素で作成
        System.out.println("String配列 'names' の初期状態 (サイズ3):");
        System.out.println(java.util.Arrays.toString(names)); // => [null, null, null]

        // (2) 要素の値を指定して宣言・初期化
        String[] fruits = {"Apple", "Banana", "Cherry"};
        System.out.println("String配列 'fruits' (初期値指定):");
        System.out.println(java.util.Arrays.toString(fruits)); // => [Apple, Banana, Cherry]

        double[] prices = {100.5, 200.0, 50.75};
        System.out.println("double配列 'prices' (初期値指定):");
        System.out.println(java.util.Arrays.toString(prices)); // => [100.5, 200.0, 50.75]

        // (3) 宣言と初期化を別々に行う
        char[] letters; // 宣言
        letters = new char[4]; // 初期化
        letters[0] = 'J';
        letters[1] = 'A';
        letters[2] = 'V';
        letters[3] = 'A';
        System.out.println("char配列 'letters' (別々に宣言・初期化):");
        System.out.println(java.util.Arrays.toString(letters)); // => [J, A, V, A]
    }
}
```

#### 1.2. 要素へのアクセス

配列の要素には、**インデックス**を使ってアクセスします。  インデックスは`0`から始まり、`サイズ-1`までです。  

*   `配列名[インデックス]` で要素の値を取得できます。  
    *   この記法は、配列の内部で「基準アドレス + インデックス * 要素のサイズ」といった計算により、該当する要素のメモリ位置を直接特定するために使われます。  
*   `配列名[インデックス] = 値;` で要素に値を代入できます。  
    *   これにより、特定のメモリ位置に新しい値を書き込むことができます。  

:::caution
#### 境界チェック
Javaの配列は、要素へのアクセス時に自動的に**境界チェック**を行います。  
指定されたインデックスが配列の有効な範囲（`0`から`length - 1`まで）を超えている場合、`ArrayIndexOutOfBoundsException`という実行時エラー（例外）が発生し、プログラムは異常終了します。  
これは、配列の範囲外へのアクセスによるデータの破損を防ぐためのJavaの安全機構です。  
:::

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 1.2. 要素へのアクセス ---");

        String[] colors = {"Red", "Green", "Blue", "Yellow"};
        System.out.println("配列 colors: " + java.util.Arrays.toString(colors));

        // 最初の要素 (インデックス0) にアクセス
        System.out.println("最初の要素: " + colors[0]); // Red

        // 3番目の要素 (インデックス2) にアクセス
        System.out.println("3番目の要素: " + colors[2]); // Blue

        // 要素の値を変更
        colors[1] = "Orange";
        System.out.println("2番目の要素を変更後: " + java.util.Arrays.toString(colors)); // [Red, Orange, Blue, Yellow]

        // 存在しないインデックスにアクセスするとエラー (ArrayIndexOutOfBoundsException)
        // System.out.println(colors[4]); // コメント解除するとエラーが発生します (インデックスは0～3なので4は範囲外)
        // System.out.println(colors[-1]); // コメント解除するとエラーが発生します (負のインデックスは無効)
```

#### 1.3. 配列の長さ (`length` プロパティ)

配列の要素数は、`配列名.length` で取得できます。  
これはフィールドであり、メソッドではないため、`()` は不要です。  
`length`プロパティは、配列が初期化された時点でそのサイズが設定され、その後は変更されません。  
これは配列が固定長であることの直接的な証拠です。  
ループ処理などで配列の全要素を処理する際に、この`length`プロパティが非常に役立ちます。  

:::info
ループ処理については[**次のページ**](./page5.md)で詳しく学習します。

:::

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 1.3. 配列の長さ (`length` プロパティ) ---");

        String[] animals = {"Dog", "Cat", "Bird"};
        System.out.println("配列 animals: " + java.util.Arrays.toString(animals));

        // 配列の長さを取得
        int arrayLength = animals.length;
        System.out.println("配列 animals の長さ: " + arrayLength); // 3

        int[] data = new int[10];
        System.out.println("配列 data の長さ: " + data.length); // 10
```

<!--  
#### 1.4. 配列の繰り返し処理（ループ）

配列のすべての要素を処理するには、ループ（`for`文や拡張`for`文）を使います。  
これは、配列の各要素に順番にアクセスし、それぞれの要素に対して何らかの操作を行うためによく使われます。  


1.  **`for`ループ（インデックスを使う場合）**  
    *   `for (初期化; 条件式; 更新式) { ... }` の一般的な`for`ループです。  
    *   要素のインデックスを使って処理を行う場合に適しています。  
    *   配列の長さを利用してループ回数を制御します（`i < scores.length`）。  
    *   この方法では、インデックスを使って直接要素にアクセスするため、要素の値を読み込むだけでなく、変更することも可能です。  

2.  **拡張`for`ループ（要素を直接使う場合）**  
    *   `for (データ型 変数名 : 配列名) { ... }` の形式で記述します。  
    *   配列のすべての要素を順番に取り出して処理を行う場合に適しています。  
    *   インデックスを必要としない読み込み専用の処理に便利です。  
    *   **注意点:** 拡張`for`ループでは、ループ変数に配列の各要素の「値のコピー」または「参照のコピー」が渡されます。  したがって、プリミティブ型の要素の場合、ループ変数（例：`int score`）の値を変更しても、元の配列の要素には影響しません。  参照型の要素の場合、参照先のオブジェクトの状態を変更することはできますが、配列要素が保持する参照自体を変更することはできません（つまり、別のオブジェクトを指すようにすることはできません）。  

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 1.4. 配列の繰り返し処理（ループ） ---");

        int[] scores = {85, 92, 78, 65, 95};
        System.out.println("配列 scores: " + java.util.Arrays.toString(scores));

        // (1) forループ (インデックスを使う場合)
        System.out.println("\nforループを使って要素を順番に表示:");
        for (int i = 0; i < scores.length; i++) { // インデックスiが0からlength-1まで変化
            System.out.println("scores[" + i + "]: " + scores[i]);
            // 例: 各要素に10点加算する (値を変更する)
            scores[i] += 10; // インデックスを使って元の配列の要素の値を変更できる
        }
        System.out.println("10点加算後の scores: " + java.util.Arrays.toString(scores));


        // (2) 拡張forループ (要素を直接使う場合)
        System.out.println("\n拡張forループを使って要素を順番に表示:");
        String[] seasons = {"Spring", "Summer", "Autumn", "Winter"};
        for (String season : seasons) { // 配列seasonsの各要素が順番にseasonに代入される
            System.out.println("季節: " + season);
        }
        // 拡張forループでは要素の値を直接変更することはできません（コピーされた値が渡されるため）
        // for (int score : scores) { score += 5; } // この変更は元の配列には反映されません
        // 上記の行は、scoreという変数にscores配列の要素の値がコピーされて渡されるため、
        // scoreの値を変更しても元のscores配列の要素は変化しない、という意味です。
```
 -->
---

### 2. 多次元配列

#### 概要
多次元配列は、「配列の配列」として考えることができます。  
最も一般的なのは2次元配列で、行と列を持つ表のような構造を表現するのに使われます。  
Javaでは、厳密には「多次元配列」という特別なデータ型はなく、配列の要素がさらに配列になっている構造を指します。  
例えば、`int[][]`は`int`型の配列を要素に持つ配列を意味します。  
これは、外側の配列の各要素が、内側の配列オブジェクトへの参照（ポインタのようなもの）を保持しているようなイメージです。  
この構造により、後述するジャグ配列（不規則配列）が可能になります。  

#### 2.1. 宣言と初期化

2次元配列の宣言と初期化の方法も、単一次元配列に似ています。  

1.  **サイズを指定して宣言・初期化（全要素をデフォルト値）**  
    *   `データ型[][] 変数名 = new データ型[行数][列数];`  
    *   この形式では、指定された行数と列数を持つ矩形（長方形）の配列が生成され、すべての要素はそれぞれのデータ型に応じたデフォルト値で初期化されます。  
    *   メモリ上では、まず外側の配列（行を管理する配列）が確保され、次にその外側の配列の各要素が指す内側の配列（列を管理する配列）がそれぞれ確保されます。  

2.  **要素の値を指定して宣言・初期化**  
    *   `データ型[][] 変数名 = {{行1の値}, {行2の値}, ...};`  
    *   この形式は、初期値が明確に決まっている場合に便利です。  
    *   各内側の波括弧`{}`が1つの行を表し、その中に列の要素がカンマ区切りで並びます。  
    *   コンパイラが自動的に行数と各行の列数を推測して配列を生成します。  

多次元配列の内容をコンソールに出力する際には、単一次元配列用の`Arrays.toString()`では正しく表示されません。  
これは、`Arrays.toString()`が配列の要素を文字列化する際に、参照型の要素（この場合、内側の配列）のデフォルトの`toString()`メソッドを呼び出してしまうためです。  
多次元配列の深い内容まですべて文字列として表示するには、`java.util.Arrays.deepToString()`メソッドを使用する必要があります。  

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n\n--- 2. 多次元配列 ---");

        // 2.1. 宣言と初期化
        System.out.println("\n--- 2.1. 宣言と初期化 ---");

        // (1) サイズを指定して宣言・初期化（全要素をデフォルト値）
        // 3行4列のint型2次元配列
        int[][] matrix = new int[3][4];
        System.out.println("int型2次元配列 'matrix' (3行4列) の初期状態:");
        // 2次元配列の表示には Arrays.deepToString() を利用
        System.out.println(java.util.Arrays.deepToString(matrix));
        // => [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

        // (2) 要素の値を指定して宣言・初期化
        int[][] coordinates = {
            {1, 2}, // 1行目
            {3, 4}, // 2行目
            {5, 6}  // 3行目
        };
        System.out.println("int型2次元配列 'coordinates' (初期値指定):");
        System.out.println(java.util.Arrays.deepToString(coordinates));
        // => [[1, 2], [3, 4], [5, 6]]

        String[][] board = {
            {"X", "O", "X"},
            {"O", "X", "O"},
            {"X", "O", "X"}
        };
        System.out.println("String型2次元配列 'board' (初期値指定):");
        System.out.println(java.util.Arrays.deepToString(board));
        // => [[X, O, X], [O, X, O], [X, O, X]]
```

#### 2.2. 要素へのアクセス

2次元配列の要素には、`配列名[行インデックス][列インデックス]` でアクセスします。  
最初のインデックスが行（外側の配列のインデックス）を、2番目のインデックスが列（内側の配列のインデックス）を指定します。  
これも単一次元配列と同様に、`0`から始まるインデックスを使用し、範囲外へのアクセスは`ArrayIndexOutOfBoundsException`を引き起こします。  

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 2.2. 要素へのアクセス ---");

        int[][] gameBoard = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        System.out.println("配列 gameBoard:\n" + java.util.Arrays.deepToString(gameBoard));

        // 1行1列目 (インデックス[0][0]) の要素にアクセス
        System.out.println("1行1列目の要素: " + gameBoard[0][0]); // 1

        // 2行3列目 (インデックス[1][2]) の要素にアクセス
        System.out.println("2行3列目の要素: " + gameBoard[1][2]); // 0

        // 要素の値を変更
        gameBoard[0][1] = 9; // 1行2列目の値を9に変更
        System.out.println("変更後の gameBoard:\n" + java.util.Arrays.deepToString(gameBoard));
        // => [[1, 9, 0], [0, 1, 0], [0, 0, 1]]
```

<!-- 
#### 2.3. 多次元配列の繰り返し処理（ネストしたループ）

多次元配列のすべての要素を処理するには、ネストした（入れ子になった）ループを使います。  
これは、表形式のデータを順次処理する際に非常に重要です。  

*   2次元配列の場合、外側のループで「行」を、内側のループで「列」を処理するのが一般的です。  
    *   外側のループは、配列の行数（`多次元配列名.length`）に基づいて繰り返し行われます。  
    *   内側のループは、現在の行（`多次元配列名[i]`）の列数（`多次元配列名[i].length`）に基づいて繰り返し行われます。  この`多次元配列名[i].length`を使用する点が特に重要です。  

**ポイント:**  
*   `多次元配列名.length` は「行数」を返します。  これは、外側の配列（内側の配列への参照を保持する配列）の長さを意味します。  
*   `多次元配列名[i].length` は `i` 行目の「列数」を返します。  これは、特定の行（`i`番目の内側の配列）の長さを意味します。  ジャグ配列の場合、この値は行ごとに異なる可能性があります。  

**拡張`for`ループを使った多次元配列の反復処理:**  
2次元配列を拡張`for`ループで処理する場合、外側のループでは各「行」（つまり、単一次元配列オブジェクト）が取得されます。  そして、内側のループでその「行」の各要素を取得することになります。  コードの記述が簡潔になりますが、インデックスに依存する操作（例: `[i][j]`で要素を更新する、行番号や列番号を表示するなど）が必要な場合は、通常の`for`ループの方が適しています。  

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 2.3. 多次元配列の繰り返し処理（ネストしたループ） ---");

        int[][] studentScores = {
            {80, 75, 90},  // 学生A (国語, 数学, 英語)
            {60, 88, 70},  // 学生B
            {95, 82, 85}   // 学生C
        };
        System.out.println("配列 studentScores:\n" + java.util.Arrays.deepToString(studentScores));

        System.out.println("\nネストしたforループを使って要素を順番に表示:");
        for (int i = 0; i < studentScores.length; i++) { // 行 (学生) のループ。studentScores.lengthは行数(3)
            System.out.print("学生" + (char)('A' + i) + "の点数: "); // 学生A, 学生B, 学生Cと表示
            for (int j = 0; j < studentScores[i].length; j++) { // 列 (科目) のループ。studentScores[i].lengthはi行目の列数(3)
                System.out.print(studentScores[i][j] + " ");
            }
            System.out.println(); // 各行の終わりに改行
        }

        // 拡張forループを使った多次元配列の反復処理 (あまり推奨されないこともあるが、表示には便利)
        // 変更を伴わない読み込み専用の処理に向いている
        System.out.println("\n拡張forループを使って要素を順番に表示 (2次元):");
        for (int[] studentScore : studentScores) { // 外側のループ: studentScoresから各行（int[]型の配列）を取り出す
            for (int score : studentScore) { // 内側のループ: 取り出した行（studentScore）から各要素（int型の値）を取り出す
                System.out.print(score + " ");
            }
            System.out.println();
        }
```
 -->

#### 2.4. ジャグ配列（不規則配列、Ragged Array）

Javaの多次元配列は、「配列の配列」であるため、各行（内側の配列）のサイズが異なっていても構いません。  
このような配列を「ジャグ配列」または「不規則配列」と呼びます。  
これは、外側の配列が内側の配列オブジェクトへの参照を保持しているため、各参照が指す配列の長さは独立して設定できるというJavaの配列の特性によるものです。  
ジャグ配列は、データの構造が行ごとに異なる場合や、メモリを節約したい場合に有用です。  

**宣言と初期化:**  
*   `データ型[][] 変数名 = new データ型[行数][];` のように、列数を省略して宣言します。  
    *   この段階では、外側の配列のみが作成され、各要素（内側の配列への参照）は`null`で初期化されています。  
*   その後、各行（内側の配列）を個別に`new`キーワードを使って初期化します。  
    *   例: `変数名[0] = new データ型[サイズ1];`  
    *   このようにすることで、各行が異なる長さの配列オブジェクトを指すように設定できます。  

**サンプルコード:**  

```java showLineNumbers
// ArrayTrainingクラスのmainメソッド内に記述

        System.out.println("\n--- 2.4. ジャグ配列（不規則配列） ---");

        // ジャグ配列の宣言 (行数は指定するが、列数は指定しない)
        int[][] jaggedArray = new int[3][]; // この時点では、jaggedArray[0], [1], [2]はすべてnull

        // 各行（内側の配列）を異なるサイズで初期化
        jaggedArray[0] = new int[5]; // 1行目は5つの要素を持つ配列を割り当て
        jaggedArray[1] = new int[2]; // 2行目は2つの要素を持つ配列を割り当て
        jaggedArray[2] = new int[3]; // 3行目は3つの要素を持つ配列を割り当て

        // 要素に値を代入 (例として簡単な値を代入)
        // 各行の配列の長さに合わせてループを回す
        for (int i = 0; i < jaggedArray[0].length; i++) jaggedArray[0][i] = i + 1;
        for (int i = 0; i < jaggedArray[1].length; i++) jaggedArray[1][i] = (i + 1) * 10;
        for (int i = 0; i < jaggedArray[2].length; i++) jaggedArray[2][i] = (i + 1) * 100;

        System.out.println("ジャグ配列 jaggedArray:\n" + java.util.Arrays.deepToString(jaggedArray));
        // 出力例: [[1, 2, 3, 4, 5], [10, 20], [100, 200, 300]]

    } // mainメソッドの閉じ括弧
} // ArrayTrainingクラスの閉じ括弧
```

<!-- 
---

### 全体サンプルコード

上記で解説した内容をまとめた、実行可能な完全なサンプルコードです。  
`import java.util.Arrays;` の行を追加して、`Arrays.toString()` および `Arrays.deepToString()` をクラス名なしで利用できるようにしています。  

```java showLineNumbers
import java.util.Arrays; // Arrays.toString() や Arrays.deepToString() を使うために必要

public class ArrayTraining {

    public static void main(String[] args) {

        System.out.println("--- 1. 配列（単一次元配列） ---");

        // --- 1.1. 宣言と初期化 ---
        System.out.println("\n--- 1.1. 宣言と初期化 ---");

        // (1) サイズを指定して宣言・初期化（要素はデフォルト値）
        int[] numbers = new int[5]; // int型の配列を5つの要素で作成
        System.out.println("int配列 'numbers' の初期状態 (サイズ5):");
        System.out.println(Arrays.toString(numbers)); // => [0, 0, 0, 0, 0]

        String[] names = new String[3]; // String型の配列を3つの要素で作成
        System.out.println("String配列 'names' の初期状態 (サイズ3):");
        System.out.println(Arrays.toString(names)); // => [null, null, null]

        // (2) 要素の値を指定して宣言・初期化
        String[] fruits = {"Apple", "Banana", "Cherry"};
        System.out.println("String配列 'fruits' (初期値指定):");
        System.out.println(Arrays.toString(fruits)); // => [Apple, Banana, Cherry]

        double[] prices = {100.5, 200.0, 50.75};
        System.out.println("double配列 'prices' (初期値指定):");
        System.out.println(Arrays.toString(prices)); // => [100.5, 200.0, 50.75]

        // (3) 宣言と初期化を別々に行う
        char[] letters; // 宣言
        letters = new char[4]; // 初期化
        letters[0] = 'J';
        letters[1] = 'A';
        letters[2] = 'V';
        letters[3] = 'A';
        System.out.println("char配列 'letters' (別々に宣言・初期化):");
        System.out.println(Arrays.toString(letters)); // => [J, A, V, A]

        // --- 1.2. 要素へのアクセス ---
        System.out.println("\n--- 1.2. 要素へのアクセス ---");

        String[] colors = {"Red", "Green", "Blue", "Yellow"};
        System.out.println("配列 colors: " + Arrays.toString(colors));

        System.out.println("最初の要素 (colors[0]): " + colors[0]); // Red
        System.out.println("3番目の要素 (colors[2]): " + colors[2]); // Blue

        colors[1] = "Orange"; // 2番目の要素を変更
        System.out.println("2番目の要素を変更後: " + Arrays.toString(colors)); // [Red, Orange, Blue, Yellow]

        // --- 1.3. 配列の長さ (`length` プロパティ) ---
        System.out.println("\n--- 1.3. 配列の長さ (`length` プロパティ) ---");

        String[] animals = {"Dog", "Cat", "Bird"};
        System.out.println("配列 animals の長さ: " + animals.length); // 3

        // --- 1.4. 配列の繰り返し処理（ループ） ---
        System.out.println("\n--- 1.4. 配列の繰り返し処理（ループ） ---");

        int[] scores = {85, 92, 78, 65, 95};
        System.out.println("配列 scores: " + Arrays.toString(scores));

        // (1) forループ (インデックスを使う場合)
        System.out.println("\nforループを使って要素を順番に表示 (10点加算):");
        for (int i = 0; i < scores.length; i++) {
            scores[i] += 10; // 要素の値を変更
            System.out.println("scores[" + i + "]: " + scores[i]);
        }
        System.out.println("10点加算後の scores: " + Arrays.toString(scores));


        // (2) 拡張forループ (要素を直接使う場合)
        System.out.println("\n拡張forループを使って要素を順番に表示:");
        String[] seasons = {"Spring", "Summer", "Autumn", "Winter"};
        for (String season : seasons) {
            System.out.println("季節: " + season);
        }


        System.out.println("\n\n--- 2. 多次元配列 ---");

        // --- 2.1. 宣言と初期化 ---
        System.out.println("\n--- 2.1. 宣言と初期化 ---");

        // (1) サイズを指定して宣言・初期化（全要素をデフォルト値）
        int[][] matrix = new int[3][4]; // 3行4列のint型2次元配列
        System.out.println("int型2次元配列 'matrix' (3行4列) の初期状態:");
        System.out.println(Arrays.deepToString(matrix));

        // (2) 要素の値を指定して宣言・初期化
        int[][] coordinates = {
            {1, 2},
            {3, 4},
            {5, 6}
        };
        System.out.println("int型2次元配列 'coordinates' (初期値指定):");
        System.out.println(Arrays.deepToString(coordinates));

        // --- 2.2. 要素へのアクセス ---
        System.out.println("\n--- 2.2. 要素へのアクセス ---");

        int[][] gameBoard = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        System.out.println("配列 gameBoard:\n" + Arrays.deepToString(gameBoard));

        System.out.println("1行1列目の要素 (gameBoard[0][0]): " + gameBoard[0][0]); // 1
        System.out.println("2行3列目の要素 (gameBoard[1][2]): " + gameBoard[1][2]); // 0

        gameBoard[0][1] = 9; // 要素の値を変更
        System.out.println("変更後の gameBoard:\n" + Arrays.deepToString(gameBoard));

        // --- 2.3. 多次元配列の繰り返し処理（ネストしたループ） ---
        System.out.println("\n--- 2.3. 多次元配列の繰り返し処理（ネストしたループ） ---");

        int[][] studentScores = {
            {80, 75, 90},  // 学生A (国語, 数学, 英語)
            {60, 88, 70},  // 学生B
            {95, 82, 85}   // 学生C
        };
        System.out.println("配列 studentScores:\n" + Arrays.deepToString(studentScores));

        System.out.println("\nネストしたforループを使って要素を順番に表示:");
        for (int i = 0; i < studentScores.length; i++) { // 行 (学生) のループ
            System.out.print("学生" + (char)('A' + i) + "の点数: ");
            for (int j = 0; j < studentScores[i].length; j++) { // 列 (科目) のループ
                System.out.print(studentScores[i][j] + " ");
            }
            System.out.println(); // 各行の終わりに改行
        }

        // --- 2.4. ジャグ配列（不規則配列） ---
        System.out.println("\n--- 2.4. ジャグ配列（不規則配列） ---");

        // ジャグ配列の宣言 (行数は指定するが、列数は指定しない)
        int[][] jaggedArray = new int[3][];

        // 各行（内側の配列）を異なるサイズで初期化
        jaggedArray[0] = new int[5]; // 1行目は5つの要素
        jaggedArray[1] = new int[2]; // 2行目は2つの要素
        jaggedArray[2] = new int[3]; // 3行目は3つの要素

        // 要素に値を代入 (例として簡単な値を代入)
        for (int i = 0; i < jaggedArray[0].length; i++) jaggedArray[0][i] = i + 1;
        for (int i = 0; i < jaggedArray[1].length; i++) jaggedArray[1][i] = (i + 1) * 10;
        for (int i = 0; i < jaggedArray[2].length; i++) jaggedArray[2][i] = (i + 1) * 100;

        System.out.println("ジャグ配列 jaggedArray:\n" + Arrays.deepToString(jaggedArray));

        // ジャグ配列の繰り返し処理 (内側のループは current_row.length を使う)
        System.out.println("\nジャグ配列の各要素:");
        for (int i = 0; i < jaggedArray.length; i++) {
            System.out.print("行 " + i + ": ");
            for (int j = 0; j < jaggedArray[i].length; j++) { // ここで jaggedArray[i].length を使うのがポイント
                System.out.print(jaggedArray[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```
 -->
---

### まとめ

*   **配列**  
    同じ型の要素をまとめる固定長のデータ構造です。  インデックスは0から始まります。  
    メモリ上に連続した領域を確保し、各要素に高速にアクセスできます。  
*   **アクセス**  
    `配列名[インデックス]`   
    有効なインデックス範囲は`0`から`配列名.length - 1`までです。  
    範囲外アクセスは`ArrayIndexOutOfBoundsException`を引き起こします。  
*   **長さ**  
    `配列名.length` (フィールド)  
    配列のサイズは一度決定されると変更できません。  
*   **繰り返し**  
    `for`ループや拡張`for`ループを使用します。  
    `for`ループはインデックスを必要とする操作や要素の変更に適しています。  
    拡張`for`ループは読み込み専用の処理を簡潔に記述するのに適していますが、要素の値を直接変更することはできません（プリミティブ型の場合）。  
*   **多次元配列**  
    「配列の配列」です。  
    `データ型[][] 変数名;`  
    行と列の概念で要素にアクセスします。  
    `配列名[行インデックス][列インデックス]`。  
    ネストしたループを使って全要素を処理します。  
    外側のループで`配列名.length`（行数）を、内側のループで`配列名[i].length`（特定の行の列数）を利用します。  
*   **ジャグ配列**  
    各行の長さが異なる多次元配列です。  
    `new データ型[行数][];` で宣言し、各行を個別に初期化します。  
    メモリ効率や柔軟性が求められる場合に有効です。  
*   **配列の出力**  
    配列の内容をデバッグ目的で簡単に表示するには、  
    `java.util.Arrays.toString()` (1次元配列用) や  
    `java.util.Arrays.deepToString()` (多次元配列用) が非常に便利です。  

