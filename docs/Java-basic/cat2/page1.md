# 演算子

### はじめに

この資料では、Javaプログラミングの基礎中の基礎である「変数」と「演算子」について学習します。  
これらは、あらゆるプログラムでデータを扱ったり、計算したり、条件を判断したりするために不可欠な要素です。  

---

### サンプルコード

以下のJavaコードを`VariableAndOperatorWorkshop.java`というファイル名で保存し、コンパイル・実行してみてください。  
各セクションのコードと、その下の説明を照らし合わせながら学習を進めましょう。  

```java showLineNumbers
// VariableAndOperatorWorkshop.java

public class VariableAndOperatorWorkshop {

    public static void main(String[] args) {
        System.out.println("--- Java研修：演算子 ---");

        // 各デモンストレーションメソッドを呼び出す
        demonstrateArithmeticOperators();
        demonstrateAssignmentOperators();
        demonstrateIncrementDecrementOperators();
        demonstrateComparisonOperators();
        demonstrateLogicalOperators();

        System.out.println("\n--- 研修終了 ---");
    }
    // ... (各 demonstrate メソッドは後述)
}
```

---

### 詳細解説
<!-- 
#### 1. 変数とは？

変数は、プログラム内で一時的にデータを保存するための「箱」のようなものです。  
この「箱」には、データを識別するための「名前」（変数名）と、保存できるデータの種類を示す「データ型」が決められています。  
例えば、「年齢」を保存する箱なら`int age;`、「名前」を保存する箱なら`String name;`のように定義します。  

##### 1-1. 変数の宣言と初期化

変数を使い始めるには、まず「宣言」と「初期化」を行う必要があります。  

*   **変数の宣言**:  
    「このような種類のデータを保存する、この名前の箱を使いますよ」とJavaに伝えることです。  
    書式は `データ型 変数名;` です。  
*   **変数の初期化**:  
    宣言した変数（箱）に、初めて値を「代入」することです。  
    変数は初期化されるまで使用できません。  

以下のコードは、変数の宣言と初期化の例です。  

```java showLineNumbers
    /**
     * 1. 変数とは？
     * データの箱である「変数」の宣言、初期化、代入、データ型、定数について説明します。
     */
    public static void demonstrateVariables() {
        System.out.println("\n===== 1. 変数とは？ =====");
        System.out.println("変数は、データを一時的に保存するための「箱」のようなものです。\n" +
                           "それぞれの箱には名前（変数名）と、保存できるデータの種類（データ型）が決まっています。\n");

        // --- 1-1. 変数の宣言と初期化 ---
        System.out.println("--- 1-1. 変数の宣言と初期化 ---");
        // 変数の宣言: データ型 変数名;
        int age; // 「age」という名前の整数（int）を保存する箱を準備します

        // 変数の初期化: 変数に最初の値を代入すること
        age = 30; // ageという箱に30を入れます
        System.out.println("私の年齢は: " + age + "歳です。");

        // 宣言と同時に初期化することも可能です
        String name = "田中 太郎"; // 「name」という文字列（String）の箱に「田中 太郎」を入れます
        System.out.println("私の名前は: " + name + "です。");
        // ... (続く)
    }
```

**解説**:  

`int age;` は、「`age`という名前の変数を用意し、その変数には整数（`int`型）しか入れられません」と宣言しています。  
この時点では`age`という箱は空の状態です。  
`age = 30;` で、その空だった`age`という箱に「`30`」という値を入れています。これが初期化です。  

また、`String name = "田中 太郎";` のように、宣言と初期化を同時に行うこともよくあります。  
これは、「`name`という名前の文字列（`String`型）の箱を用意し、そこに最初に「`田中 太郎`」という値を入れてください」という意味になります。  

##### 1-2. データ型

データ型は、変数がどのような種類のデータを保存できるかを指定するものです。  
Javaには、主に数値を扱う「プリミティブ型（基本データ型）」と、より複雑なデータ（文字列など）を扱う「参照型」があります。  
ここではよく使う基本的なデータ型を紹介します。  

```java showLineNumbers
    public static void demonstrateVariables() {
        // ... (前略)
        // --- 1-2. データ型 ---
        System.out.println("\n--- 1-2. データ型 ---");
        System.out.println("変数がどのような種類のデータを保存できるかを「データ型」で指定します。\n" +
                           "よく使う基本的なデータ型を見てみましょう。");

        // 整数型: int, long など
        int quantity = 100; // 主に整数を扱う
        long bigNumber = 1234567890123L; // intより大きな整数を扱う (Lを付ける)
        System.out.println("数量: " + quantity + ", 大きな数: " + bigNumber);

        // 浮動小数点数型（小数を含む数）: double, float など
        double price = 99.99; // 主に小数を扱う（floatより精度が高い、通常はこちらを使う）
        float temperature = 25.5f; // floatを使う場合はfを付ける
        System.out.println("価格: " + price + "円, 気温: " + temperature + "℃");

        // 文字型: char
        char initial = 'T'; // 1文字を扱う（シングルクォートで囲む）
        System.out.println("イニシャル: " + initial);

        // 真偽値型: boolean
        boolean isStudent = true; // true（真）または false（偽）のどちらかのみ
        boolean hasLicense = false;
        System.out.println("学生ですか？ " + isStudent + ", 免許を持っていますか？ " + hasLicense);

        // 文字列型: String (クラス型、参照型)
        String message = "こんにちは、Javaの世界へようこそ！"; // 文字列を扱う（ダブルクォートで囲む）
        System.out.println("メッセージ: " + message);
        // ... (続く)
    }
```

**解説**:  

Javaの主なデータ型とその特徴は以下の通りです。  

| データ型       | 種類         | 説明                                                              | 例                      | 注意点                                                     |
| :------------- | :----------- | :---------------------------------------------------------------- | :---------------------- | :--------------------------------------------------------- |
| `int`          | プリミティブ | 整数値を格納します。  一般的に最もよく使われる整数型です。        | `100`, `-5`             |                                                            |
| `long`         | プリミティブ | `int`よりも大きな整数値を格納できます。                           | `1234567890123L`        | 数値の末尾に`L`または`l`を付けます（`L`推奨）。            |
| `double`       | プリミティブ | 小数を含む数（浮動小数点数）を格納します。  `float`より精度が高いです。 | `99.99`, `3.14`         | 小数を扱う際の標準的な型です。                             |
| `float`        | プリミティブ | `double`より精度の低い小数を含む数を格納します。                  | `25.5f`                 | 数値の末尾に`f`または`F`を付けます。  通常は`double`を使用。 |
| `char`         | プリミティブ | 1文字を格納します。  シングルクォート（`'`）で囲みます。          | `'A'`, `'z'`, `'1'`     | 文字コード（Unicode）に基づいて処理されます。              |
| `boolean`      | プリミティブ | 真偽値（`true`または`false`）を格納します。                        | `true`, `false`         | 条件判断によく使われます。                                 |
| `String`       | 参照型       | 複数の文字の並び（文字列）を格納します。  ダブルクォート（`"`）で囲みます。 | `"Hello"`, `"Java"`     | プリミティブ型ではなく、クラス（参照型）です。           |

*   **`L` と `f` のサフィックス**:  
    Javaでは、整数リテラル（コードに直接書かれた数値）はデフォルトで`int`型、浮動小数点数リテラルはデフォルトで`double`型として扱われます。  
    そのため、`long`型の値や`float`型の値を明示的に示すために、それぞれ`L`（または`l`）や`f`（または`F`）を末尾に付ける必要があります。  

*   **`char` と `String` のクォート**:  
    `char`型は1文字を表すため、シングルクォート（`'`）で囲みます。  
    `String`型は複数の文字からなる文字列を表すため、ダブルクォート（`"`）で囲みます。  

##### 1-3. 変数への値の再代入

変数は、一度値を代入した後でも、同じデータ型の新しい値を代入し直すことができます。  
新しい値が代入されると、以前の値は上書きされます。  

```java showLineNumbers
    public static void demonstrateVariables() {
        // ... (前略)
        // --- 1-3. 変数への値の再代入 ---
        System.out.println("\n--- 1-3. 変数への値の再代入 ---");
        System.out.println("変数は、一度値を代入した後でも、新しい値を代入し直すことができます。");
        int score = 80;
        System.out.println("現在のスコア: " + score);
        score = 95; // scoreの値を80から95に変更
        System.out.println("新しいスコア: " + score);
        // ... (続く)
    }
```

**解説**:  

最初は`score`に`80`が代入されています。  
次の行で`score = 95;`とすると、`score`の箱の中身が`80`から`95`に更新されます。  
このように、変数の値はプログラムの実行中に何度でも変更可能です。  

##### 1-4. 定数 (`final`キーワード)

プログラムによっては、一度設定したら二度と変更したくない値があります。  
このような値を「定数」と呼び、`final`キーワードを付けて宣言します。  
定数にすることで、誤って値が変更されることを防ぎ、プログラムの意図を明確にできます。  

定数名は、慣習的にすべて大文字で記述し、複数の単語を組み合わせる場合はアンダースコア（`_`）で区切ります（例: `MAX_VALUE`）。  

```java showLineNumbers
    public static void demonstrateVariables() {
        // ... (前略)
        // --- 1-4. 定数 (final キーワード) ---
        System.out.println("\n--- 1-4. 定数 (final キーワード) ---");
        System.out.println("一度値を設定したら、その後変更できない変数を「定数」と呼びます。\n" +
                           "finalキーワードを付けて宣言します（慣習的に変数名は大文字）。");
        final double PI = 3.14159; // 円周率のPIは変更されない値なので定数にする
        System.out.println("円周率 (PI): " + PI);
        // PI = 3.14; // ← この行はコンパイルエラーになります（定数のため再代入不可）
        // System.out.println("PI: " + PI); // エラーになるためコメントアウト
    }
```

**解説**:  

`final double PI = 3.14159;` と宣言することで、変数`PI`は定数となり、値`3.14159`が設定された後は、もう値を変更することができません。  
もし`PI = 3.14;` のように再代入を試みると、コンパイル時にエラーが発生し、プログラムをビルドできなくなります。  
これにより、重要な値が意図せず変更されてしまうバグを防ぐことができます。  

---
 -->
#### 1. 演算子とは？

演算子は、変数や値に対して様々な処理を行うための記号です。  
計算、比較、論理判断など、プログラムの動作を制御するために使われます。  
演算子を使うことで、複雑な処理を簡潔に記述できます。  

##### 1-1. 算術演算子

算術演算子は、数値の計算（足し算、引き算、掛け算、割り算、余りなど）に使われる基本的な演算子です。  

```java showLineNumbers
    /**
     * 1. 演算子とは？
     * 算術演算子、代入演算子、インクリメント/デクリメント演算子、比較演算子、論理演算子について説明します。
     */

    // --- 1-1. 算術演算子 ---
    public static void demonstrateArithmeticOperators() {
        System.out.println("--- 1-1. 算術演算子 ---");

        int num1 = 20;
        int num2 = 7;

        System.out.println("num1 = " + num1 + ", num2 = " + num2);

        // 足し算 (+)
        int sum = num1 + num2;
        System.out.println("足し算 (num1 + num2): " + sum); // 27

        // 引き算 (-)
        int difference = num1 - num2;
        System.out.println("引き算 (num1 - num2): " + difference); // 13

        // 掛け算 (*)
        int product = num1 * num2;
        System.out.println("掛け算 (num1 * num2): " + product); // 140

        // 割り算 (/)
        // 注意: 整数同士の割り算は小数点以下が切り捨てられます！
        int quotientInt = num1 / num2;
        System.out.println("割り算 (num1 / num2) [整数]: " + quotientInt); // 2 (20 / 7 = 2.85... -> 2)

        // 小数を含む割り算を行うには、どちらか一方を浮動小数点型にする
        double quotientDouble = (double) num1 / num2; // (double)で型をキャスト
        System.out.println("割り算 (num1 / num2) [小数]: " + quotientDouble); // 2.857...

        // 剰余 (あまり) (%)
        int remainder = num1 % num2;
        System.out.println("剰余 (num1 % num2): " + remainder); // 6 (20を7で割ると、2余り6)
    }
```

**解説**:  

| 演算子 | 名称       | 意味                                     | 例           | 結果 |
| :----- | :--------- | :--------------------------------------- | :----------- | :--- |
| `+`    | 加算       | 足し算を行います。                       | `num1 + num2` | `27` |
| `-`    | 減算       | 引き算を行います。                       | `num1 - num2` | `13` |
| `*`    | 乗算       | 掛け算を行います。                       | `num1 * num2` | `140` |
| `/`    | 除算       | 割り算を行います。                       | `num1 / num2` | `2`  |
| `%`    | 剰余（剰余演算子） | 割り算の余りを計算します。               | `num1 % num2` | `6`  |

*   **整数同士の割り算 (`/`) の注意点**:  
    Javaにおいて、整数型（`int`, `long`など）同士で割り算を行うと、結果も常に整数型になります。  
    そのため、割り算の商に小数点以下の部分があっても、その部分は「切り捨て」られます。  
    例: `20 / 7` は `2.85...` ですが、`int`型では `2` となります。  

    もし小数点以下を含む正確な割り算の結果を得たい場合は、計算を行う前に、オペランド（演算対象の数値）の少なくとも一方を浮動小数点型（`double`や`float`）に変換する必要があります。  
    `(double) num1 / num2` のように、変数の前に`(`とデータ型名` )`を記述することで、一時的にその変数のデータ型を変換できます。これを「キャスト」と呼びます。  
    キャストすると、もう一方のオペランドも浮動小数点型に自動的に変換され、浮動小数点数での割り算が行われます。  

##### 1-2. 代入演算子

代入演算子は、変数に値を代入するための演算子です。  
最も基本的なものは`=`（単純代入演算子）ですが、算術演算と組み合わせた短縮形もあります。  

```java showLineNumbers
    // --- 1-2. 代入演算子 ---
    public static void demonstrateAssignmentOperators() {
        System.out.println("\n--- 1-2. 代入演算子 ---");

        int x = 10;
        System.out.println("初期値: x = " + x);

        // 単純代入 (=)
        int y = 5;
        System.out.println("y = " + y);

        // 加算代入 (+=): x = x + 3; と同じ
        x += 3;
        System.out.println("x += 3 (x = x + 3): " + x); // xは13になる

        // 減算代入 (-=): x = x - 5; と同じ
        x -= 5;
        System.out.println("x -= 5 (x = x - 5): " + x); // xは8になる

        // 乗算代入 (*=): x = x * 2; と同じ
        x *= 2;
        System.out.println("x *= 2 (x = x * 2): " + x); // xは16になる

        // 除算代入 (/=): x = x / 4; と同じ
        x /= 4;
        System.out.println("x /= 4 (x = x / 4): " + x); // xは4になる

        // 剰余代入 (%=): x = x % 3; と同じ
        x %= 3;
        System.out.println("x %= 3 (x = x % 3): " + x); // xは1になる (4を3で割ると余り1)
    }
```

**解説**:  

| 演算子 | 例     | 意味               | 実際の計算例  | 結果 |
| :----- | :----- | :----------------- | :------------ | :--- |
| `=`    | `x = 10` | `x`に`10`を代入     |               | `x: 10` |
| `+=`   | `x += 3` | `x = x + 3`        | `10 + 3`      | `x: 13` |
| `-=`   | `x -= 5` | `x = x - 5`        | `13 - 5`      | `x: 8`  |
| `*=`   | `x *= 2` | `x = x * 2`        | `8 * 2`       | `x: 16` |
| `/=`   | `x /= 4` | `x = x / 4`        | `16 / 4`      | `x: 4`  |
| `%=`   | `x %= 3` | `x = x % 3`        | `4 % 3`       | `x: 1`  |

複合代入演算子（`+=`, `-=`など）は、`変数 = 変数 演算子 値;` の形式をより簡潔に記述するためのものです。  
コードの記述量を減らし、可読性を高める効果があります。  

##### 1-3. インクリメント/デクリメント演算子

インクリメント演算子（`++`）は変数の値を1だけ増やし、デクリメント演算子（`--`）は変数の値を1だけ減らすための演算子です。  
これらの演算子には、前置（`++num`または`--num`）と後置（`num++`または`num--`）の2種類があり、その挙動が異なります。  

```java showLineNumbers
    // --- 1-3. インクリメント/デクリメント演算子 ---
    public static void demonstrateIncrementDecrementOperators() {
        System.out.println("\n--- 1-3. インクリメント/デクリメント演算子 ---");

        // インクリメント (++)
        int count = 5;
        System.out.println("初期値: count = " + count);

        // 後置インクリメント (count++)
        // 式の評価後に値が増える
        int result1 = count++;
        System.out.println("result1 = count++ の場合:");
        System.out.println("  result1: " + result1); // 5 (countが6になる前の値がresult1に代入される)
        System.out.println("  count:   " + count);   // 6 (count自体は増えている)

        // 前置インクリメント (++count)
        // 値が増えてから式が評価される
        int result2 = ++count; // countは現在6なので、まず7になり、その7がresult2に代入される
        System.out.println("result2 = ++count の場合:");
        System.out.println("  result2: " + result2); // 7
        System.out.println("  count:   " + count);   // 7

        // デクリメント (--)
        int value = 10;
        System.out.println("\n初期値: value = " + value);

        // 後置デクリメント (value--)
        int result3 = value--;
        System.out.println("result3 = value-- の場合:");
        System.out.println("  result3: " + result3); // 10
        System.out.println("  value:   " + value);   // 9

        // 前置デクリメント (--value)
        int result4 = --value; // valueは現在9なので、まず8になり、その8がresult4に代入される
        System.out.println("result4 = --value の場合:");
        System.out.println("  result4: " + result4); // 8
        System.out.println("  value:   " + value);   // 8
    }
```

**解説**:  

| 演算子 | 種類 | 説明                                                                                                        |
| :----- | :--- | :---------------------------------------------------------------------------------------------------------- |
| `++num` | 前置インクリメント | 変数`num`の値が**まず1増加**し、その**新しい値**が式全体の値として評価されます。                   |
| `num++` | 後置インクリメント | 変数`num`の**現在の値**が式全体の値として評価され、その後に変数`num`の値が**1増加**します。       |
| `--num` | 前置デクリメント | 変数`num`の値が**まず1減少**し、その**新しい値**が式全体の値として評価されます。                   |
| `num--` | 後置デクリメント | 変数`num`の**現在の値**が式全体の値として評価され、その後に変数`num`の値が**1減少**します。       |

インクリメント/デクリメント演算子は、`num = num + 1;` や `num = num - 1;` を短く書くためのものですが、特に他の演算と組み合わせる際に、前置と後置の違いが重要になります。  

*   **後置の場合 (`count++`)**:  
    `int result1 = count++;` の例では、まず`count`の「現在の値（`5`）」が`result1`に代入されます。  
    その後に、`count`自身の値が`1`増加して`6`になります。  
*   **前置の場合 (`++count`)**:  
    `int result2 = ++count;` の例では、まず`count`自身の値が`1`増加して`7`になります。  
    その「新しい値（`7`）」が`result2`に代入されます。  

この違いは、ループ処理でカウンターを扱う際や、配列のインデックスを操作する際などによく現れます。  

##### 1-4. 比較演算子

比較演算子は、二つの値の関係（等しいか、大きいか、小さいかなど）を比較し、その結果を真偽値（`boolean`型: `true`または`false`）で返します。  
これらの演算子は、後で学習する`if`文やループなどの条件分岐で非常に重要な役割を果たします。  

```java showLineNumbers
    // --- 1-4. 比較演算子 ---
    public static void demonstrateComparisonOperators() {
        System.out.println("\n--- 1-4. 比較演算子 ---");

        int a = 10;
        int b = 20;
        int c = 10;

        System.out.println("a = " + a + ", b = " + b + ", c = " + c);

        // 等しい (==)
        System.out.println("a == b: " + (a == b)); // false
        System.out.println("a == c: " + (a == c)); // true

        // 等しくない (!=)
        System.out.println("a != b: " + (a != b)); // true
        System.out.println("a != c: " + (a != c)); // false

        // より大きい (>)
        System.out.println("a > b: " + (a > b));   // false
        System.out.println("b > a: " + (b > a));   // true

        // より小さい (<)
        System.out.println("a < b: " + (a < b));   // true
        System.out.println("b < a: " + (b < a));   // false

        // 以上 (>=)
        System.out.println("a >= b: " + (a >= b)); // false
        System.out.println("a >= c: " + (a >= c)); // true

        // 以下 (<=)
        System.out.println("a <= b: " + (a <= b)); // true
        System.out.println("a <= c: " + (a <= c)); // true

        // 応用例: 成人判定
        int age = 22;
        boolean isAdult = (age >= 20); // 20歳以上ならtrue
        System.out.println("\n年齢: " + age);
        System.out.println("成人ですか？ (age >= 20): " + isAdult);
    }
```

**解説**:  

| 演算子 | 名称         | 意味               | 例        | 結果 (`a=10, b=20, c=10`) |
| :----- | :----------- | :----------------- | :-------- | :------------------------ |
| `==`   | 等しい       | 左辺と右辺が等しい | `a == b`  | `false`                   |
|        |              |                    | `a == c`  | `true`                    |
| `!=`   | 等しくない   | 左辺と右辺が等しくない | `a != b`  | `true`                    |
|        |              |                    | `a != c`  | `false`                   |
| `>`    | より大きい   | 左辺が右辺より大きい | `a > b`   | `false`                   |
|        |              |                    | `b > a`   | `true`                    |
| `<`    | より小さい   | 左辺が右辺より小さい | `a < b`   | `true`                    |
|        |              |                    | `b < a`   | `false`                   |
| `>=`   | 以上         | 左辺が右辺以上     | `a >= b`  | `false`                   |
|        |              |                    | `a >= c`  | `true`                    |
| `<=`   | 以下         | 左辺が右辺以下     | `a <= b`  | `true`                    |
|        |              |                    | `a <= c`  | `true`                    |

*   **文字列の比較の注意点**:  
    `String`型の値を比較する場合、`==`演算子は通常使いません。  
    `==`は、プリミティブ型では値の比較を行いますが、参照型（`String`など）では「オブジェクトがメモリ上で同じ場所を指しているか」を比較します。  
    文字列の内容が等しいかを比較するには、`equals()`メソッドを使用します。  
    例: `name1.equals(name2)`  
    これはJava学習のより深い段階で説明されますが、注意点として覚えておくと良いでしょう。  

##### 1-5. 論理演算子

論理演算子は、`boolean`型の値（`true`または`false`）を組み合わせて、より複雑な条件を判断するために使われます。  
複数の比較結果を組み合わせる際に不可欠な演算子です。  

```java showLineNumbers
    // --- 1-5. 論理演算子 ---
    public static void demonstrateLogicalOperators() {
        System.out.println("\n--- 1-5. 論理演算子 ---");

        boolean isRaining = true;
        boolean hasUmbrella = false;
        boolean isWeekend = true;

        System.out.println("isRaining = " + isRaining);
        System.out.println("hasUmbrella = " + hasUmbrella);
        System.out.println("isWeekend = " + isWeekend);

        // 論理AND (&&): 両方の条件がtrueの場合にtrue
        // 例: 「雨が降っていて、傘を持っている」
        boolean canGoOutWithUmbrella = isRaining && hasUmbrella;
        System.out.println("雨が降っていて、傘を持っている (isRaining && hasUmbrella): " + canGoOutWithUmbrella); // false

        // 論理OR (||): どちらか一方でもtrueならtrue
        // 例: 「週末である、または雨が降っていない」
        boolean canRelax = isWeekend || !isRaining; // !isRaining は「雨が降っていない」
        System.out.println("週末である、または雨が降っていない (isWeekend || !isRaining): " + canRelax); // true (isWeekendがtrueだから)

        // 論理NOT (!): 真偽を反転させる
        System.out.println("雨が降っていない (!isRaining): " + (!isRaining)); // false (isRainingがtrueなので)
        System.out.println("傘を持っていない (!hasUmbrella): " + (!hasUmbrella)); // true (hasUmbrellaがfalseなので)

        // 複雑な条件の例: 「外出できる条件」
        // (雨が降っていない) または (雨が降っていて、かつ傘を持っている)
        boolean canGoOut = (!isRaining) || (isRaining && hasUmbrella);
        System.out.println("外出できる？ ((!isRaining) || (isRaining && hasUmbrella)): " + canGoOut); // false (雨が降っていて、傘がないため)

        boolean niceWeather = true;
        boolean enoughMoney = true;
        boolean tired = false;

        // 「映画を見に行く条件」：天気が良くて、お金があって、疲れていない
        boolean goToMovie = niceWeather && enoughMoney && !tired;
        System.out.println("\n天気が良くて、お金があって、疲れていない (niceWeather && enoughMoney && !tired): " + goToMovie); // true
    }
}
```

**解説**:  

| 演算子 | 名称       | 意味                                     | 真理値表例（A=true, B=false） | 結果 |
| :----- | :--------- | :--------------------------------------- | :---------------------------- | :--- |
| `&&`   | 論理AND    | 両方のオペランドが`true`の場合のみ`true`。 | `A && B`                      | `false` |
| `\|\|`   | 論理OR     | どちらか一方でも`true`なら`true`。       | `A \|\| B`                      | `true` |
| `!`    | 論理NOT    | オペランドの真偽を反転させる。           | `!A`                          | `false` |
|        |            |                                          | `!B`                          | `true` |

*   **論理AND (`&&`)**:  
    「A かつ B」という条件を表現します。  
    `A && B` は、`A`も`B`も`true`である場合にのみ`true`となります。  
    どちらか一方でも`false`であれば、結果は`false`です。  

*   **論理OR (`||`)**:  
    「A または B」という条件を表現します。  
    `A || B` は、`A`か`B`のどちらか一方でも`true`であれば`true`となります。  
    両方が`false`の場合にのみ`false`です。  

*   **論理NOT (`!`)**:  
    真偽値を反転させます。  
    `!A` は、`A`が`true`なら`false`、`A`が`false`なら`true`になります。  

*   **ショートサーキット評価**:  
    `&&`と`||`演算子には「ショートサーキット評価（短絡評価）」という特徴があります。  
    *   `A && B`: `A`が`false`であれば、`B`の評価は行われず、結果は直ちに`false`と決定されます。  
    *   `A || B`: `A`が`true`であれば、`B`の評価は行われず、結果は直ちに`true`と決定されます。  
    これは、不要な処理をスキップすることで、プログラムの効率を高める効果があります。  

---

### まとめ

*   **実際に手を動かすことの重要性**  
実際にコーディングし、実行することで理解が深まります。  
エラーが出たら原因を探し、デバッグの練習をしましょう。  
*   **インクリメント/デクリメント演算子**  
ここは特に混同しやすいので、`result = num++` と `result = ++num` の違いは都度確認しましょう。  
値の「取得」と「更新」の順序がポイントです。  
*   **データ型と型の変換（キャスト）**  
整数同士の割り算が小数点以下を切り捨てる点は盲点になりがちです。  
キャストの重要性と、なぜそれが必要になるのか（データ型の自動変換ルール）を確認してください。  
*   **比較演算子と論理演算子**  
これらは条件分岐（`if`文など）で非常に重要になるため、ここでしっかりと真偽値の概念と、複数の条件を組み合わせる方法を理解することが大切です。  
