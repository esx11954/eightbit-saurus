# 条件分岐

### 目的

プログラムは通常、記述された順序（上から下へ）に実行されます。  
しかし、実際のアプリケーションでは、「もしこの条件が真ならAを実行し、偽ならBを実行する」といったように、状況に応じて異なる処理を行いたい場面が多々あります。  
条件分岐は、まさにそうした「もし〜ならば」という判断をプログラムにさせるための構文です。

### 1. `if`文の基本

最も基本的な条件分岐の構文です。  
指定した条件式が`true`（真）の場合にのみ、特定のコードブロックを実行します。

#### 構文

```java showLineNumbers showLineNumbers
if (条件式) {
    // 条件式がtrueの場合に実行されるコード
}
```

#### サンプルコード

```java showLineNumbers showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        System.out.println("--- Javaにおける条件分岐の基本 ---");

        // 1. if文の基本
        System.out.println("\n--- 1. if文 ---");
        int score = 75;
        System.out.println("現在のスコア: " + score);

        // スコアが60点以上の場合に「合格です！」と表示
        if (score >= 60) {
            System.out.println("合格です！");
        }
        System.out.println("if文の処理が終了しました。\n");
    }
}
```

#### 実行結果例

```
--- Javaにおける条件分岐の基本 ---

--- 1. if文 ---
現在のスコア: 75
合格です！
if文の処理が終了しました。
```

#### 詳細解説

この`if`文は、「もし`score`が60以上であれば」という条件を設定しています。  
`score >= 60`の部分が「条件式」です。  
`>=`は「〜以上」を意味する比較演算子で、左辺の値が右辺の値以上であるかを評価します。  
この条件式の結果は、`true`（真）か`false`（偽）のいずれかになります。  
今回の例では`score`が`75`なので、`75 >= 60`は`true`と評価されます。  

`if (条件式) { ... }` の波括弧`{}`で囲まれた部分は「コードブロック」と呼ばれます。  
条件式が`true`と評価された場合のみ、このコードブロック内の処理が実行されます。  
`score`が`75`であるため、「合格です！」というメッセージが表示されます。  
もし`score`が`50`だった場合、`50 >= 60`は`false`と評価されるため、コードブロック内の`System.out.println("合格です！");`は実行されず、`if`文の直後の行へ処理が移ります。  

### 2. `if-else`文

`if`文に`else`ブロックを追加することで、条件式が`true`の場合と`false`の場合で異なる処理を行うことができます。

#### 構文

```java showLineNumbers
if (条件式) {
    // 条件式がtrueの場合に実行されるコード
} else {
    // 条件式がfalseの場合に実行されるコード
}
```

#### サンプルコード

```java showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        // ... (省略: 上記のif文のコード)

        // 2. if-else文
        System.out.println("--- 2. if-else文 ---");
        int age = 17;
        System.out.println("現在の年齢: " + age);

        // 年齢が18歳以上なら「成人」、そうでなければ「未成年」と表示
        if (age >= 18) {
            System.out.println("成人です。");
        } else {
            System.out.println("未成年です。");
        }
        System.out.println("if-else文の処理が終了しました。\n");
    }
}
```

#### 実行結果例

```
--- 2. if-else文 ---
現在の年齢: 17
未成年です。
if-else文の処理が終了しました。
```

#### 詳細解説

この`if-else`文は、「もし`age`が18以上であれば『成人です。』と表示し、そうでなければ（18未満であれば）『未成年です。』と表示する」という処理を行います。  
`if`ブロックは条件式`age >= 18`が`true`の場合に実行され、`else`ブロックは条件式が`false`の場合に実行されます。  
現在の`age`は`17`なので、`17 >= 18`は`false`と評価されます。  
このため、`if`ブロックはスキップされ、`else`ブロック内の`System.out.println("未成年です。");`が実行され、「未成年です。」と表示されます。  
`if-else`文では、`if`ブロックと`else`ブロックのどちらか一方が必ず実行され、両方が実行されることはありません。  

### 3. `if-else if-else`文 (複数の条件分岐)

複数の条件を順番に評価し、最初に`true`になった条件に対応するブロックを実行したい場合に用います。  
どの条件も`true`にならなかった場合に`else`ブロックが実行されます。

#### 構文

```java showLineNumbers
if (条件式1) {
    // 条件式1がtrueの場合
} else if (条件式2) {
    // 条件式1がfalseで、条件式2がtrueの場合
} else if (条件式3) {
    // 条件式1, 2がfalseで、条件式3がtrueの場合
} else {
    // どの条件式もtrueにならなかった場合
}
```

#### サンプルコード

```java showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        // ... (省略: 上記のif-else文のコード)

        // 3. if-else if-else文 (複数の条件分岐)
        System.out.println("--- 3. if-else if-else文 ---");
        int gradeScore = 85;
        System.out.println("評価対象スコア: " + gradeScore);

        // スコアに応じて評価を判定
        if (gradeScore >= 90) {
            System.out.println("評価: A");
        } else if (gradeScore >= 80) { // 90未満で80以上
            System.out.println("評価: B");
        } else if (gradeScore >= 70) { // 80未満で70以上
            System.out.println("評価: C");
        } else { // 70未満
            System.out.println("評価: D");
        }
        System.out.println("if-else if-else文の処理が終了しました。\n");
    }
}
```

#### 実行結果例

```
--- 3. if-else if-else文 ---
評価対象スコア: 85
評価: B
if-else if-else文の処理が終了しました。
```

#### 詳細解説

この構文は、複数の可能性の中から一つを選択する場合に非常に役立ちます。  
プログラムは、`if`の条件式から順番に評価していきます。  
  
1.  `if (gradeScore >= 90)`: `85 >= 90` は`false`なので、このブロックはスキップされます。  
2.  `else if (gradeScore >= 80)`: 最初の条件が`false`だったため、次にこの条件が評価されます。  
    `85 >= 80`は`true`なので、このブロック内の`System.out.println("評価: B");`が実行され、「評価: B」と表示されます。  
  
一度`true`と評価された条件式が見つかると、そのブロックが実行され、それ以降の`else if`や`else`ブロックは評価されることなく、`if-else if-else`文全体の処理が終了します。  
例えば、`gradeScore`が`95`であれば「評価: A」と表示され、`else if`や`else`の条件は評価されません。  
どの`if`や`else if`の条件も`true`にならなかった場合にのみ、最後の`else`ブロックが実行されます。  

### 4. ネストされた`if`文 (複合的な条件)

`if`文のブロック内にさらに`if`文を記述することができます。  
これにより、より複雑な条件を表現できます。

#### 構文

```java showLineNumbers
if (条件A) {
    if (条件B) {
        // 条件Aがtrue AND 条件Bがtrueの場合
    } else {
        // 条件Aがtrue AND 条件Bがfalseの場合
    }
} else {
    // 条件Aがfalseの場合
}
```

#### サンプルコード

```java showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        // ... (省略: 上記のif-else if-else文のコード)

        // 4. ネストされたif文 (複合的な条件)
        System.out.println("--- 4. ネストされたif文 ---");
        boolean isMember = true;
        double purchaseAmount = 12000.0;
        System.out.println("会員ステータス: " + (isMember ? "会員" : "非会員") + ", 購入金額: " + purchaseAmount + "円");

        // 会員の場合、購入金額に応じて割引を判定
        if (isMember) { // 外側のif文: 会員であるか
            if (purchaseAmount >= 10000) { // 内側のif文: 購入金額が10000円以上か
                System.out.println("会員かつ高額購入のため、プレミアム割引が適用されます。");
            } else {
                System.out.println("会員割引が適用されます。");
            }
        } else { // 会員ではない場合
            System.out.println("割引は適用されません。");
        }
        System.out.println("ネストされたif文の処理が終了しました。\n");
    }
}
```

#### 実行結果例

```
--- 4. ネストされたif文 ---
会員ステータス: 会員, 購入金額: 12000.0円
会員かつ高額購入のため、プレミアム割引が適用されます。
ネストされたif文の処理が終了しました。
```

#### 詳細解説

「ネストされた`if`文」とは、`if`文の中にさらに`if`文が「入れ子に」なっている状態を指します。  
この例では、まず外側の`if (isMember)`という条件が評価されます。  
`isMember`が`true`（会員である）の場合に限り、その内側のコードブロックが実行され、さらに内側の`if (purchaseAmount >= 10000)`という条件が評価されます。  
  
現在の`isMember`は`true`、`purchaseAmount`は`12000.0`です。  
1.  外側の`if (isMember)`: `true`なので、内側のブロックに進みます。  
2.  内側の`if (purchaseAmount >= 10000)`: `12000.0 >= 10000`は`true`なので、このブロック内の`System.out.println("会員かつ高額購入のため、プレミアム割引が適用されます。");`が実行されます。  
  
もし`isMember`が`false`だった場合、外側の`if`文の条件が`false`になるため、内側の`if`文は一切評価されることなく、外側の`else`ブロックが実行されます。  
また、もし`isMember`が`true`で、`purchaseAmount`が`5000.0`だった場合、内側の`if`文の条件が`false`になるため、内側の`else`ブロックが実行され「会員割引が適用されます。」と表示されます。  

ネストされた`if`文は複雑な条件を表現できますが、あまり深くネストしすぎるとコードの可読性が低下し、理解しにくくなる傾向があります。  
このような複合的な条件は、`if (isMember && purchaseAmount >= 10000)`のように、`&&`（論理AND）や`||`（論理OR）といった「論理演算子」を使用して1つの条件式にまとめることで、ネストを減らし、コードをより読みやすくすることも可能です。  

### 5. `switch`文

一つの変数の値に基づいて、複数の処理の中から一つを選択して実行したい場合に便利です。  
特に、多くの`else if`が続くようなケースで、コードの可読性を高めることができます。

#### 構文

```java showLineNumbers
switch (評価対象の変数) {
    case 値1:
        // 変数の値が「値1」の場合に実行されるコード
        break; // breakがないと次のcaseも実行される (フォールスルー)
    case 値2:
        // 変数の値が「値2」の場合に実行されるコード
        break;
    // ...
    default:
        // どのcaseにも一致しない場合に実行されるコード
        break; // defaultにもbreakを記述するのが一般的
}
```

#### 注意点

*   `switch`文の評価対象には、`int`型、`short`型、`byte`型、`char`型、`String`型、`enum`型が使用できます。  
    （Java 7からは`String`型が、Java 5からは`enum`型がサポートされました。）  
*   各`case`の後に続く値は、変数ではなく、コンパイル時に値が確定する「定数」でなければなりません。  
*   各`case`ブロックの最後には、通常`break;`を記述します。  
    `break;`がない場合、その`case`の処理が終わった後も、次の`case`の処理が実行されてしまいます（これを**フォールスルー (fall-through)**と呼びます）。  
    意図的にフォールスルーを利用することもありますが、バグの原因になりやすいため、初学者は`break;`を忘れないように注意が必要です。  
*   `default`は、どの`case`にも値が一致しなかった場合に実行されるオプションのブロックです。  
    これにも`break;`を記述するのが一般的です。  

#### サンプルコード

```java showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        // ... (省略: 上記のネストされたif文のコード)

        // 5. switch文
        System.out.println("--- 5. switch文 ---");
        String dayOfWeek = "水曜日";
        System.out.println("本日の曜日: " + dayOfWeek);

        switch (dayOfWeek) {
            case "月曜日":
            case "火曜日":
            case "水曜日":
            case "木曜日":
            case "金曜日":
                System.out.println("今日は平日です。");
                break; // breakがないと次のcaseも実行される
            case "土曜日":
            case "日曜日":
                System.out.println("今日は週末です！");
                break;
            default: // どのcaseにも一致しない場合
                System.out.println("認識できない曜日です。");
                break;
        }

        int menuChoice = 2; // 例: 1=コーヒー, 2=紅茶, 3=ジュース
        System.out.println("選択されたメニュー番号: " + menuChoice);
        switch (menuChoice) {
            case 1:
                System.out.println("コーヒーが選択されました。");
                break;
            case 2:
                System.out.println("紅茶が選択されました。");
                break;
            case 3:
                System.out.println("ジュースが選択されました。");
                break;
            default:
                System.out.println("無効な選択です。1-3のいずれかを選んでください。");
                break;
        }
        System.out.println("switch文の処理が終了しました。\n");
    }
}
```

#### 実行結果例

```
--- 5. switch文 ---
本日の曜日: 水曜日
今日は平日です。
選択されたメニュー番号: 2
紅茶が選択されました。
switch文の処理が終了しました。
```

#### 詳細解説

`switch`文は、指定された変数（この例では`dayOfWeek`や`menuChoice`）の値が、それぞれの`case`ラベルの値と一致するかどうかを調べます。  
  
**1つ目の`switch`文の例 (`dayOfWeek`)**:  
`dayOfWeek`の値は`"水曜日"`です。  
`switch`文は各`case`ラベルの値を`dayOfWeek`と比較していきます。  
`"月曜日"`とは一致しません。  
`"火曜日"`とも一致しません。  
しかし、次の`case "水曜日":`と一致します。  
ここで注目すべきは、`"月曜日":`, `"火曜日":`, `"水曜日":`, `"木曜日":`, `"金曜日":`という複数の`case`ラベルが連続している点です。  
このように`case`ラベルを連続して記述すると、いずれかのラベルと一致した場合に、その後のコードブロック（この場合は`System.out.println("今日は平日です。");`）が実行されます。  
`"水曜日"`に一致したため、「今日は平日です。」と表示され、`break;`によって`switch`文の実行が終了します。  
  
**2つ目の`switch`文の例 (`menuChoice`)**:  
`menuChoice`の値は`2`です。  
`switch`文は`case 1:`、`case 2:`、`case 3:`、`default:`を順にチェックします。  
`case 1:`とは一致しません。  
`case 2:`と一致します。  
そのため、「紅茶が選択されました。」と表示され、`break;`によって`switch`文の実行が終了します。  
もし`menuChoice`が`5`のような、どの`case`ラベルとも一致しない値であった場合、`default`ブロック内の「無効な選択です。1-3のいずれかを選んでください。」というメッセージが表示されます。  

**フォールスルーの重要性**:  
もし`case 2:`の後に`break;`を書き忘れた場合、`case 2:`の処理が終わった後も、制御が`case 3:`へと「流れ落ち」、続けて「ジュースが選択されました。」というメッセージも表示されてしまいます。  
これが「フォールスルー」です。  
フォールスルーは、意図的に特定の複数の`case`で共通の処理を行いたい場合に利用されることもありますが、多くの場合、`break;`の書き忘れによる意図しないバグの原因となるため、特に研修生は各`case`ブロックの最後に`break;`を記述する習慣をつけることが重要です。  

### 6. 三項演算子 (条件演算子)

条件に基づいて値を割り当てる際に、`if-else`文を1行で簡潔に記述できる特別な演算子です。  
主に、変数への代入など、シンプルな条件分岐に適しています。

#### 構文

```java showLineNumbers
データ型 変数名 = (条件式) ? 真の場合の値 : 偽の場合の値;
```

#### サンプルコード

```java showLineNumbers
public class ConditionalStatementsDemo {

    public static void main(String[] args) {
        // ... (省略: 上記のswitch文のコード)

        // 6. 三項演算子 (条件演算子)
        System.out.println("--- 6. 三項演算子 ---");
        int number = 10;
        // numberが偶数なら"偶数"、奇数なら"奇数"という文字列をresultに代入
        String result = (number % 2 == 0) ? "偶数" : "奇数";
        System.out.println(number + "は" + result + "です。");

        int val1 = 50;
        int val2 = 30;
        // val1とval2のうち大きい方をmaxValに代入
        int maxVal = (val1 > val2) ? val1 : val2;
        System.out.println(val1 + "と" + val2 + "のうち大きい方は" + maxVal + "です。");
        System.out.println("三項演算子の処理が終了しました。\n");

        System.out.println("--- 条件分岐のサンプルコードの実行が完了しました ---");
    }
}
```

#### 実行結果例

```
--- 6. 三項演算子 ---
10は偶数です。
50と30のうち大きい方は50です。
三項演算子の処理が終了しました。

--- 条件分岐のサンプルコードの実行が完了しました ---
```

#### 詳細解説

三項演算子（`? :`）は、その名の通り3つのオペランド（操作対象）を取る特殊な演算子です。  
構文は「`条件式 ? 値1 : 値2`」となっており、以下の順序で評価されます。  
1.  まず「`条件式`」が評価されます。  
2.  もし条件式が`true`であれば、「`値1`」がこの演算子全体の評価結果となります。  
3.  もし条件式が`false`であれば、「`値2`」がこの演算子全体の評価結果となります。  
  
`if-else`文が「文」（命令）であるのに対し、三項演算子は「式」です。  
式は必ず何らかの「値」を返します。  
この特性から、三項演算子は主に変数への代入やメソッドの引数など、何らかの値を動的に決定したい場合に簡潔に記述するために使用されます。  

**1つ目の例**: `String result = (number % 2 == 0) ? "偶数" : "奇数";`  
*   `number % 2 == 0`: `number`を`2`で割った余りが`0`であるか（つまり偶数であるか）を判定する条件式です。  
    `number`が`10`なので、`10 % 2`は`0`となり、`0 == 0`は`true`と評価されます。  
*   条件式が`true`なので、`?`の後の「`"偶数"`」が結果となり、`result`変数には`"偶数"`という文字列が代入されます。  

**2つ目の例**: `int maxVal = (val1 > val2) ? val1 : val2;`  
*   `val1 > val2`: `val1`が`val2`より大きいかを判定する条件式です。  
    `val1`が`50`、`val2`が`30`なので、`50 > 30`は`true`と評価されます。  
*   条件式が`true`なので、`?`の後の「`val1`」の値（`50`）が結果となり、`maxVal`変数には`50`が代入されます。  

三項演算子はコードを簡潔にする強力なツールですが、複雑な条件や複数の処理を含む場合には、可読性が低下する可能性があります。  
そのような場合は、通常の`if-else`文を使用する方が、他の開発者や将来の自分がコードを理解しやすくなるでしょう。  

### まとめとポイント

*   **`if`文**: 最も基本的な条件分岐。  特定の条件が`true`の場合のみ実行。  
*   **`if-else`文**: 条件が`true`の場合と`false`の場合で処理を分ける。  どちらか一方のブロックが必ず実行される。  
*   **`if-else if-else`文**: 複数の条件を順に評価し、最初に合致したブロックを実行。  多くの条件がある場合に有効で、上から順に評価される特性を理解することが重要。  
*   **ネストされた`if`文**: 複雑な複合条件を表現できるが、深くネストしすぎると可読性が低下する可能性がある。  論理演算子 (`&&`, `||`) を活用して、ネストを減らすことも検討する。  
*   **`switch`文**: 単一の値に基づく多分岐に適している。  `if-else if`の連鎖を置き換えることで、コードがすっきりする。  `break`の記述を忘れると「フォールスルー」が発生し、意図しない動作の原因となるため注意が必要。  
*   **三項演算子**: 簡潔な条件式で値を代入したい場合に便利。  `if-else`文とは異なり「式」であり値を返す。  可読性を損なわない範囲で使用する。  

どの条件分岐構文を使うかは、条件の複雑さ、分岐の数、そしてコードの可読性を考慮して適切に選択することが重要です。  
実際にコードを書きながら、それぞれの構文がどのように動作するかを体験し、理解を深めていきましょう。