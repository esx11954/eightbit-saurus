# インターフェース

インターフェースは「**完全に抽象的なクラスの設計図**」または「**クラスが持つべき能力の契約書**」のようなものです。

抽象クラスが「未完成なクラスの設計図」だったのに対し、インターフェースはすべてのメソッドが抽象メソッド（Java 8以降のdefaultメソッドなどを除く）であり、具体的な処理は一切持ちません。  
フィールドも定数しか持てません。

上記の説明では抽象クラスと混同してしまうことも考えられるので、以下に違いをまとめます。

|特徴	|抽象クラス (Abstract Class)	|インターフェース (Interface)|
|----|----|----|
|目的	|「is-a」の関係（〜は〜である）を表現。共通の振る舞いと状態を定義し、部分的に実装を共有する。	|「can-do」の関係（〜ができる）を表現。クラスが持つべき能力や契約を定義する。|
|実装	|通常のメソッドも抽象メソッドも持てる。フィールドも持てる（変数）。	|基本的に抽象メソッドのみ（Java 8以降はdefault/staticメソッドも可）。フィールドは定数のみ。|
|インスタンス化	|できない。継承しないと使えない。	|できない。実装しないと使えない。|
|継承/実装	|1つのクラスしか継承（extends）できない。	|複数（いくつでも）実装（implements）できる。|

:::tip
#### インターフェースのイメージ

例えばPCやOA機器にはUSBポート（差し込み口）があります。  
そこにはUSBメモリ、マウス、キーボード、プリンター、外付けHDDなど、様々な機器を接続することができます。  

上記で挙げたどの機器も、USBポートに接続することでデータ転送や電力供給といった**共通のルール**（**インターフェース**）に従って動作します。  
USBメモリはデータを保存し、マウスはカーソルを動かし、プリンターは印刷します。 
それぞれの機器が持つ具体的な機能は異なります。

USBという**インターフェース**があるおかげで、私たちは個々の機器の内部構造や通信方法を詳しく知らなくても、ただUSBケーブルを差し込むだけで様々な機器を利用することができます。
:::

### 1-1. インターフェースの定義 `Printable.java`

このファイルでは、すべての「印刷可能」なオブジェクトが満たすべき共通の振る舞いを定義しています。  
インターフェースは「契約」であるため、ここでは具体的な処理の実装は行わず、どのようなメソッドが存在すべきか、どのような定数が利用できるかを定めます。  

```java showLineNumbers
// Printable.java
public interface Printable {

    // 定数: 最大印刷部数
    int MAX_COPIES = 50;

    // 抽象メソッド: ドキュメントを印刷する
    void print();

    // 抽象メソッド: ページ数を取得する
    int getPageCount();

    // デフォルトメソッド: ドキュメントをスキャンする (Java 8+)
    // 既存のドキュメントタイプに影響を与えずに追加できる機能
    default void scanDocument() {
        System.out.println("ドキュメントをスキャン中です...");
        // privateメソッドを利用して共通処理をカプセル化 (Java 9+)
        performScanProcess();
    }

    // 静的メソッド: プリンターの初期設定を行う (Java 8+)
    // インターフェース自身に属するユーティリティ機能
    static void setupPrinter(String printerModel) {
        System.out.println("プリンターモデル '" + printerModel + "' の初期設定を行っています。");
    }

    // プライベートメソッド: スキャン処理の内部ヘルパー (Java 9+)
    private void performScanProcess() {
        System.out.println("スキャン処理の内部ロジックを実行しました。");
    }
}
```

#### 解説:

`Printable`インターフェースは、印刷に関わる共通の機能群を定義しています。  
ここでは、Java 17におけるインターフェースの様々な要素が盛り込まれています。  

| 要素の種類       | 定義時の特徴                                                         | 役割とポイント                                                                                                                                                                                                                                                                             |
| :--------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **定数**         | `int MAX_COPIES = 50;`のように宣言。  <br/>  `public static final`が暗黙的に付与されます。                                              | インターフェースを実装するすべてのクラスで共通して利用できる不変の値を提供します。  <br/>  この例では、印刷可能なドキュメントの「最大印刷部数」という共通の制約を定義しています。  <br/>  アクセスする際は `Printable.MAX_COPIES`のようにインターフェース名から直接アクセスします。  |
| **抽象メソッド** | `void print();`のように、メソッドシグネチャ（名前と引数、戻り値）のみを記述し、実装（`{}`の中身）を持たない。  <br/>  `public abstract`が暗黙的に付与されます。 | インターフェースを`implements`するすべてのクラスに、このメソッドの具体的な実装を強制します。  <br/>  「ドキュメントを印刷する」「ページ数を取得する」という「**何をすべきか**」という契約を定義し、「**どのようにすべきか**」は実装クラスに委ねています。  <br/>  実装しないクラスは、自身も`abstract`クラスである必要があります。  |
| **デフォルトメソッド** | `default`キーワードを付けて、メソッドの具体的な実装を持つ。  <br/>  Java 8で導入。                                          | 既存のインターフェースに新しい機能を追加する際に、既存の実装クラスに影響を与えずに（コンパイルエラーを起こさずに）機能を追加できます。  <br/>  この例では、`scanDocument()`という新しいスキャン機能を追加しています。  <br/>  実装クラスはデフォルト実装をそのまま利用することも、必要に応じてオーバーライド（上書き）して独自の処理を提供することも可能です。  |
| **静的メソッド** | `static`キーワードを付けて、メソッドの具体的な実装を持つ。  <br/>  Java 8で導入。                                            | インターフェースのインスタンスを作成せずに、インターフェース名から直接呼び出すことができるメソッドです。  <br/>  主に、そのインターフェースに関連するユーティリティ的な機能や、インスタンスに依存しない共通の処理を提供するために使われます。  <br/>  この例では、`setupPrinter()`というプリンターの初期設定を行うメソッドを定義しており、`Printable.setupPrinter("...")`のように呼び出します。  |
| **プライベートメソッド** | `private`キーワードを付けて、メソッドの具体的な実装を持つ。  <br/>  Java 9で導入。  <br/>  `private static`も可能。  | デフォルトメソッドや静的メソッドの中で共通して利用される処理をカプセル化し、コードの重複を避けるために使われます。  <br/>  インターフェースの外部からは呼び出すことができません。  <br/>  この例では、`scanDocument()`メソッド内で呼び出される`performScanProcess()`がこれにあたります。  <br/>  これにより、デフォルトメソッドの可読性を保ちつつ、複雑な内部処理を隠蔽できます。  |

**まとめ:**  
`Printable`インターフェースは、抽象メソッドによる「契約の強制」、定数による「共通設定」、デフォルトメソッドによる「後方互換性を持つ機能追加」、静的メソッドによる「ユーティリティ機能」、プライベートメソッドによる「内部処理のカプセル化」という、Javaインターフェースの多彩な側面を網羅して示しています。  

### 1-2. インターフェースの実装クラス `Report.java`

このファイルは、`Printable`インターフェースを実装する具体的なクラスの一つです。  
レポートという種類のドキュメントが、どのように印刷可能であるかを定義しています。  

```java showLineNumbers
// Report.java
public class Report implements Printable {
    private String title;
    private int pages;

    public Report(String title, int pages) {
        this.title = title;
        this.pages = pages;
    }

    @Override
    public void print() {
        System.out.println("レポート「" + title + "」を印刷中（" + pages + "ページ）。");
    }

    @Override
    public int getPageCount() {
        return pages;
    }

    // デフォルトメソッドをオーバーライドすることも可能
    @Override
    public void scanDocument() {
        System.out.println("レポート専用のスキャン処理: 「" + title + "」のスキャン設定を調整します。");
        // オーバーライドした場合でも、元のデフォルトメソッドのロジックを呼び出すことも可能
        // Printable.super.scanDocument();
    }
}
```

#### 解説:

*   **`public class Report implements Printable`**:  
    `implements`キーワードを使用して、`Report`クラスが`Printable`インターフェースの契約に従うことを宣言しています。  
    これにより、`Report`クラスは`Printable`インターフェースが定義するすべての抽象メソッドを実装する義務が生じます。  

*   **`private String title; private int pages;`**:  
    `Report`クラスは、レポート固有の状態として「タイトル」と「ページ数」を持っています。  
    インターフェースはインスタンス変数を持つことができませんが、インターフェースを実装するクラスは、そのクラス固有のインスタンス変数を持つことができます。  

*   **コンストラクタ `public Report(String title, int pages)`**:  
    `Report`オブジェクトが生成される際に、タイトルとページ数を設定するためのコンストラクタです。  

*   **`@Override public void print()`**:  
    `Printable`インターフェースの抽象メソッド`print()`をオーバーライドし、レポートを印刷する具体的なロジックを記述しています。  
    ここでは、レポートのタイトルとページ数を利用して、分かりやすいメッセージを出力しています。  

*   **`@Override public int getPageCount()`**:  
    `Printable`インターフェースの抽象メソッド`getPageCount()`をオーバーライドし、レポートのページ数を返す具体的なロジックを記述しています。  

*   **`@Override public void scanDocument()`**:  
    `Printable`インターフェースで定義された**デフォルトメソッド**`scanDocument()`をオーバーライドしています。  
    これは必須ではありませんが、`Report`クラスではデフォルトのスキャン処理ではなく、レポートに特化したスキャン処理（例：「スキャン設定を調整します」というメッセージ）を行いたい場合にこのように記述します。  
    `// Printable.super.scanDocument();`のコメントアウトされた行は、オーバーライドしたメソッドの中から、親インターフェースのデフォルト実装を呼び出す方法を示しています。  
    これにより、独自の処理を追加しつつ、元のデフォルト処理も実行させることができます。  

### 1-3. インターフェースの別実装クラス `ImageFile.java`

このファイルは、`Printable`インターフェースを実装するもう一つの具体的なクラスです。  
画像ファイルという種類のドキュメントが、どのように印刷可能であるかを定義しています。  

```java showLineNumbers
// ImageFile.java
public class ImageFile implements Printable {
    private String fileName;
    private int dpi; // 解像度

    public ImageFile(String fileName, int dpi) {
        this.fileName = fileName;
        this.dpi = dpi;
    }

    @Override
    public void print() {
        System.out.println("画像ファイル「" + fileName + "」を印刷中（DPI: " + dpi + "）。");
    }

    @Override
    public int getPageCount() {
        // 画像は通常1ページとして扱う
        return 1;
    }
    // このクラスでは scanDocument() はオーバーライドせず、デフォルトの実装が使われる
}
```

#### 解説:

*   **`public class ImageFile implements Printable`**:  
    `Report`クラスと同様に、`ImageFile`クラスも`Printable`インターフェースを実装することを宣言しています。  

*   **`private String fileName; private int dpi;`**:  
    `ImageFile`クラスは、画像ファイル固有の状態として「ファイル名」と「DPI（解像度）」を持っています。  
    これにより、`Report`とは異なる種類の情報を持つオブジェクトを表現できます。  

*   **コンストラクタ `public ImageFile(String fileName, int dpi)`**:  
    `ImageFile`オブジェクトが生成される際に、ファイル名とDPIを設定するためのコンストラクタです。  

*   **`@Override public void print()`**:  
    `Printable`インターフェースの抽象メソッド`print()`をオーバーライドし、画像ファイルを印刷する具体的なロジックを記述しています。  
    画像ファイルに特化したメッセージを出力しています。  

*   **`@Override public int getPageCount()`**:  
    `Printable`インターフェースの抽象メソッド`getPageCount()`をオーバーライドしています。  
    画像ファイルは通常1ページとして印刷されるため、常に`1`を返すように実装されています。  

*   **`scanDocument()` の省略**:  
    `ImageFile`クラスでは、`Printable`インターフェースの`scanDocument()`メソッドをオーバーライドしていません。  
    この場合、`ImageFile`のインスタンスに対して`scanDocument()`が呼び出されると、`Printable`インターフェースで定義された**デフォルトの実装がそのまま使用されます**。  
    これは、デフォルトメソッドが後方互換性を提供し、既存クラスに影響を与えずにインターフェースに機能を追加できることの具体的な例です。  

### 1-4. メイン実行クラス `PrintDemo.java`

このファイルは、先に定義したインターフェースとその実装クラス群を実際に利用し、インターフェースの主要なメリットをデモンストレーションするクラスです。  

```java showLineNumbers
// PrintDemo.java
public class PrintDemo {
    public static void main(String[] args) {

        System.out.println("--- インターフェースの利用デモ ---");

        // 1. ポリモーフィズムの利用
        // Printableインターフェース型で異なる実装クラスを扱う
        Printable document1 = new Report("月次進捗報告書", 15);
        Printable document2 = new ImageFile("風景写真.jpg", 300);

        // 共通のインターフェースメソッドを呼び出す
        System.out.println("\n--- ドキュメントの印刷 ---");
        document1.print();
        System.out.println("ページ数: " + document1.getPageCount());

        document2.print();
        System.out.println("ページ数: " + document2.getPageCount());

        // 2. デフォルトメソッドの利用
        System.out.println("\n--- ドキュメントのスキャン ---");
        document1.scanDocument(); // Reportクラスでオーバーライドされた実装
        document2.scanDocument(); // ImageFileクラスではデフォルトの実装

        // 3. 定数へのアクセス
        System.out.println("\n--- インターフェースの定数 ---");
        System.out.println("最大印刷部数: " + Printable.MAX_COPIES + "部");

        // 4. 静的メソッドの呼び出し
        System.out.println("\n--- インターフェースの静的メソッド ---");
        Printable.setupPrinter("Canon Pixma G3000");

        // 5. インターフェース型の配列/リスト
        System.out.println("\n--- インターフェース型のリストで一括処理 ---");
        Printable[] documents = {
            new Report("年次決算報告書", 50),
            new ImageFile("製品ロゴ.png", 600),
            new Report("プロジェクト計画書", 20)
        };

        for (Printable doc : documents) {
            doc.print();
            doc.scanDocument(); // デフォルトメソッドも一括で呼び出せる
            System.out.println("---");
        }
    }
}
```

#### 解説:

この`PrintDemo`クラスは、`Printable`インターフェースとその実装クラスである`Report`と`ImageFile`がどのように連携し、インターフェースの利点を活かしているかを示しています。  

1.  **ポリモーフィズム (多態性) の利用**:  
    `Printable document1 = new Report("月次進捗報告書", 15);`  
    `Printable document2 = new ImageFile("風景写真.jpg", 300);`  
    ここが最も重要なポイントの一つです。  
    `document1`は実際には`Report`クラスのインスタンスであり、`document2`は`ImageFile`クラスのインスタンスですが、これらを共通の`Printable`型として扱っています。  
    これにより、呼び出し側は「`Printable`型のオブジェクトには`print()`メソッドや`getPageCount()`メソッドがある」という知識だけで、具体的な実装クラスが`Report`であろうと`ImageFile`であろうと、同じ方法でメソッドを呼び出すことができます。  
    `document1.print()`を呼び出すと`Report`クラスの`print()`メソッドが実行され、`document2.print()`を呼び出すと`ImageFile`クラスの`print()`メソッドが実行されます。  
    これが、一つのインターフェース型で異なる振る舞いを実現するポリモーフィズムの強力さです。  

2.  **デフォルトメソッドの利用**:  
    `document1.scanDocument();`  
    `document2.scanDocument();`  
    `document1`は`Report`クラスのインスタンスであり、`Report`クラスは`scanDocument()`メソッドをオーバーライドしていました。  
    そのため、ここでは`Report`クラスで定義された、レポートに特化したスキャン処理が出力されます。  
    一方、`document2`は`ImageFile`クラスのインスタンスであり、`ImageFile`クラスは`scanDocument()`をオーバーライドしていません。  
    このため、`Printable`インターフェースに定義された**デフォルトの`scanDocument()`実装**が実行されます。  
    これにより、実装クラスがデフォルトメソッドをオーバーライドするかどうかで、異なる動作をさせつつ、インターフェース契約を柔軟に保てることを示しています。  

3.  **定数へのアクセス**:  
    `System.out.println("最大印刷部数: " + Printable.MAX_COPIES + "部");`  
    インターフェースで定義された定数`MAX_COPIES`は、インスタンスを生成することなく、`Printable.MAX_COPIES`のようにインターフェース名に続けて`.`（ドット）で直接アクセスできます。  
    これは、定数が`public static final`であるためです。  

4.  **静的メソッドの呼び出し**:  
    `Printable.setupPrinter("Canon Pixma G3000");`  
    静的メソッド`setupPrinter()`も、定数と同様に、インターフェースのインスタンスを生成することなく、`Printable.setupPrinter()`のようにインターフェース名から直接呼び出されます。  
    これは、インターフェースに関連するユーティリティ的な機能を提供するために非常に便利です。  

5.  **インターフェース型の配列/リスト**:  
    `Printable[] documents = { ... };`  
    異なる具体的なクラス（`Report`と`ImageFile`）のインスタンスを、共通のインターフェース型`Printable`の配列に格納しています。  
    その後の`for`ループでは、この`documents`配列の各要素に対して、`print()`や`scanDocument()`といった共通のインターフェースメソッドを呼び出しています。  
    これはポリモーフィズムの真価を発揮する典型的なパターンです。  
    コードの利用側は、配列の中身が`Report`であろうと`ImageFile`であろうと、その具体的な型を知る必要なく、統一されたインターフェースを通して操作できます。  
    これにより、システムへの新しいドキュメントタイプ（例: `Spreadsheet`クラス）を追加する際にも、`PrintDemo`クラスのこのループ部分を変更する必要がなく、極めて高い拡張性が実現されます。  

