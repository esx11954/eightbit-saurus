
# 継承

### 1. 継承とは

Javaにおける「継承（Inheritance）」は、オブジェクト指向プログラミングの三大要素（カプセル化、継承、多態性）の一つであり、「あるクラスが別のクラスの性質（フィールドやメソッド）を受け継ぐこと」を指します。  
これにより、コードの再利用性を高め、プログラムの構造をより論理的かつ効率的にすることができます。

継承は、**「is-a（〜である）」**の関係を表現するために使用されます。  
例えば、「車は乗り物である」「電気自動車は車である」といった関係です。

*   **親クラス（Superclass / Parent Class）**: 性質を提供する側のクラス。  
*   **子クラス（Subclass / Child Class）**: 性質を受け継ぐ側のクラス。

子クラスは、親クラスの公開（public）および保護（protected）されたフィールドやメソッドをそのまま利用できるだけでなく、自身に固有のフィールドやメソッドを追加したり、親クラスのメソッドの動作を上書き（オーバーライド）したりすることができます。

:::tip
#### 継承における「is-a」の関係
「AはBの一種である」という親子関係をコードで表現しています。  
継承は、共通の機能を共有したり、プログラムを整理したりするための仕組みと理解してください。

#### 例：動物と犬  
「動物」と「犬」の関係性で考えてみましょう。  
「**犬は動物である**」 と言えます。

**犬は動物の一種**であり、動物が持つ一般的な特徴（食べる、動くなど）をすべて持っています。  
さらに、犬独自の具体的な特徴（吠える、しっぽを振るなど）も持っています。

これをプログラミングのクラスに当てはめると、
- より**一般的**な「動物」クラスが親クラス（スーパークラス）
- より**具体的**な「犬」クラスが子クラス（サブクラス）

となります。
:::

### 2. 継承の基本的な書き方

Javaで継承を行うには、子クラスの宣言時に`extends`キーワードを使用します。

```java showLineNumbers
class 子クラス名 extends 親クラス名 {
    // 子クラス固有のフィールドやメソッド
}
```

### 3. 継承のメリット

継承は、コードの設計と保守において非常に強力なツールとなります。

1.  **コードの再利用性（Code Reusability）**:  
    *   共通の属性（フィールド）や振る舞い（メソッド）を親クラスに一度定義すれば、それを継承する全ての子クラスで利用できます。  
    これにより、同じコードを何度も書く手間が省けます。  
2.  **保守性の向上（Improved Maintainability）**:  
    *   共通のロジックが親クラスに集約されているため、そのロジックに変更が必要な場合、親クラスだけを修正すれば、全ての子クラスにその変更が反映されます。  
    これにより、バグの修正や機能追加が容易になります。  
3.  **拡張性の向上（Enhanced Extensibility）**:  
    *   既存のコードを変更することなく、新しい子クラスを追加して機能を拡張できます。  
    新しい種類のオブジェクトが必要になった場合でも、親クラスの既存の振る舞いを再利用しつつ、新しい特性を追加するだけで済みます。  
4.  **多態性（Polymorphism）の実現**:  
    *   継承と合わせて「多態性」を利用することで、親クラスの型を持つ変数に、その親クラスのインスタンスだけでなく、全ての子クラスのインスタンスも代入できるようになります。  
    これにより、異なる子クラスのオブジェクトを統一的に扱えるようになり、柔軟で汎用的なコードが書けるようになります。（後述のサンプルコードで確認できます。）

### 4. もし継承という概念がなかったら

もしJavaに継承の概念がなかったとしたら、私たちのコードはどのように変化するでしょうか？

1.  **コードの重複（Code Duplication）**:  
    *   異なるクラス間で共通する属性や振る舞いがあったとしても、それぞれのクラスで個別に定義し直す必要があります。  
    *   例えば、「自動車」「バイク」「自転車」というクラスがあった場合、それぞれに「製造元」「モデル名」「年式」といった共通の属性や、「情報を表示する」といった共通のメソッドを何度も記述することになります。  
2.  **保守の困難さ（Difficult Maintenance）**:  
    *   コードが重複しているため、ある共通のロジックに変更が必要になった場合、そのロジックが記述されている全てのクラスを一つ一つ探し出し、手作業で修正しなければなりません。  
    修正漏れがあれば、バグの原因となります。  
3.  **拡張性の低さ（Low Extensibility）**:  
    *   新しい種類のオブジェクトを追加する際に、既存の多くのコードをコピー＆ペーストで再利用することになります。  
    これでは、新しいオブジェクトを追加するたびに、コードベースが肥大化し、管理が難しくなります。  
4.  **複雑なコード（Complex Code）**:  
    *   クラス間の関係性が不明瞭になり、全体としてどのようなオブジェクト群が存在し、それらがどのように連携しているのかを把握するのが困難になります。  
    これにより、コードの可読性が著しく低下します。  

継承はこれらの問題を解決し、より整理され、保守しやすく、拡張性のあるプログラムを構築するための強力な基盤を提供してくれます。

### 5. サンプルコードによる解説

ここでは、「乗り物（Vehicle）」を親クラスとし、そこから「自動車（Car）」、さらに「電気自動車（ElectricCar）」へと継承させていく例を見てみましょう。  

**ファイル構成:**

```
.
├── Vehicle.java
├── Car.java
├── ElectricCar.java
└── InheritanceDemo.java
```

---

#### 5.1. `Vehicle.java` (親クラス)

すべての乗り物に共通する基本的な属性と動作を定義します。  

```java showLineNumbers
// Vehicle.java
package com.example.inheritance;

/**
 * すべての乗り物の基底クラス。
 * 共通の属性（ブランド、モデル、年式）と共通の動作（エンジンの始動/停止、情報表示）を定義します。
 */
public class Vehicle {
    // protected: 同じパッケージ内、およびサブクラスからアクセス可能。
    protected String brand;
    protected String model;
    protected int year;

    // コンストラクタ
    public Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        System.out.println("Vehicleクラスのコンストラクタが呼び出されました: " + brand + " " + model);
    }

    // エンジンを始動する共通メソッド
    public void startEngine() {
        System.out.println(brand + " " + model + " のエンジンを始動します。");
    }

    // エンジンを停止する共通メソッド
    public void stopEngine() {
        System.out.println(brand + " " + model + " のエンジンを停止します。");
    }

    // 乗り物の基本情報を表示するメソッド
    public void displayInfo() {
        System.out.println("---- 車両情報 ----");
        System.out.println("ブランド: " + brand);
        System.out.println("モデル: " + model);
        System.out.println("年式: " + year);
    }
}
```

**追記解説:**

この`Vehicle`クラスは、今回の継承階層における最上位の親クラスです。  
すべての乗り物に共通する「ブランド」「モデル」「年式」という属性と、「エンジンの始動」「エンジンの停止」「情報表示」という基本的な振る舞いを定義しています。  

*   **`protected`アクセス修飾子:**  
    `brand`, `model`, `year` フィールドが `protected` で宣言されています。  
    `protected` は、同じパッケージ内のクラス、およびこのクラスを継承する**サブクラス（子クラス）**からアクセスを許可します。  
    もし `private` にすると、子クラスから直接これらのフィールドにアクセスできなくなり、アクセサメソッド（getter/setter）を介してアクセスする必要が生じます。  
    継承関係にあるクラス間で共通のデータを共有し、直接操作させたい場合に `protected` は便利ですが、カプセル化の観点からは `private` にしてアクセサメソッドを提供することが推奨される場合もあります。  
    今回は継承のデモとして、子クラスからの直接アクセスを許容する設計にしています。  

*   **コンストラクタ:**  
    `public Vehicle(String brand, String model, int year)` は、`Vehicle`クラスのインスタンスを生成する際に呼び出される特別なメソッドです。  
    このコンストラクタ内で、引数として受け取った値をクラスのフィールドに代入し、インスタンスの初期化を行っています。  
    `System.out.println("Vehicleクラスのコンストラクタが呼び出されました: " + brand + " " + model);`  という出力は、後述する子クラスのコンストラクタ呼び出し順序を理解する上で非常に重要な手がかりとなります。  

*   **共通メソッド:**  
    `startEngine()`, `stopEngine()`, `displayInfo()` は、すべての乗り物が持つべき共通の振る舞いを表現しています。  
    これらのメソッドは `public` であるため、どのクラスからでも呼び出すことができます。  
    子クラスでは、これらの共通メソッドをそのまま利用することも、自身の特性に合わせて**オーバーライド**（上書き）することも可能です。  

---

#### 5.2. `Car.java` (子クラス - `Vehicle`を継承)

`Vehicle`クラスを継承し、自動車に固有の属性と動作を追加・上書きします。  

```java showLineNumbers
// Car.java
package com.example.inheritance;

/**
 * Vehicleクラスを継承した自動車クラス。
 * 自動車固有の属性（ドア数）と動作（クラクション、エンジンの始動/停止の上書き）を追加します。
 */
public class Car extends Vehicle { // extendsキーワードでVehicleを継承
    private int numberOfDoors;

    // コンストラクタ
    public Car(String brand, String model, int year, int numberOfDoors) {
        // super(...) を使用して親クラス（Vehicle）のコンストラクタを呼び出します。
        // 子クラスのコンストラクタで、親クラスのコンストラクタを最初に呼び出す必要があります。
        super(brand, model, year);
        this.numberOfDoors = numberOfDoors;
        System.out.println("Carクラスのコンストラクタが呼び出されました: " + brand + " " + model);
    }

    // メソッドのオーバーライド（Overriding）
    // 親クラスのメソッドと同じシグネチャ（メソッド名、引数リスト）で定義することで、動作を上書きします。
    // @Overrideアノテーションは、オーバーライドであることを明示し、コンパイラのチェックを助けます。（推奨）
    @Override
    public void startEngine() {
        System.out.println(brand + " " + model + " (自動車) のキーを回してエンジンを始動します。");
    }

    @Override
    public void stopEngine() {
        System.out.println(brand + " " + model + " (自動車) のエンジンを停止し、キーを抜きます。");
    }

    // Carクラス固有のメソッド
    public void honkHorn() {
        System.out.println(brand + " " + model + " がクラクションを鳴らしました！ Beep Beep!");
    }

    @Override
    public void displayInfo() {
        // super.メソッド名() を使用して、親クラスのメソッドを呼び出すことができます。
        // これにより、親クラスの表示ロジックを再利用しつつ、子クラス固有の情報を追加できます。
        super.displayInfo();
        System.out.println("ドア数: " + numberOfDoors);
    }
}
```

**追記解説:**

`Car`クラスは、`Vehicle`クラスを継承しています。  
これにより、`Car`クラスは`Vehicle`クラスのすべての`public`および`protected`なフィールドとメソッドを「is-a」関係として自動的に持つことになります。  

*   **`extends Vehicle` キーワード:**  
    このキーワードが、`Car`クラスが`Vehicle`クラスを継承していることを示します。  
    Javaでは**単一継承**のみが可能です。  つまり、一つのクラスは直接的に一つの親クラスしか継承できません。  

*   **`super(...)` の呼び出し:**  
    `Car`クラスのコンストラクタ内で、`super(brand, model, year);` が最初の行で呼び出されています。  
    `super(...)` は、**親クラスのコンストラクタを呼び出すための特別な構文**です。  
    子クラスのインスタンスが生成される際、まず親クラスのコンストラクタが呼び出され、親クラスの初期化が行われる必要があります。  
    Javaのルールとして、子クラスのコンストラクタの**最初の文**で`super(...)`または`this(...)`（同じクラスの別のコンストラクタを呼び出す）を呼び出す必要があります。  
    もし明示的に記述しない場合、Javaコンパイラは引数なしの`super()`を自動的に挿入します。  しかし、親クラスに引数なしのコンストラクタが存在しない場合はコンパイルエラーとなります。  

*   **メソッドのオーバーライド (`@Override`):**  
    `startEngine()`, `stopEngine()`, `displayInfo()` メソッドには `@Override` アノテーションが付与されています。  
    **オーバーライド**とは、親クラスで定義されているメソッドと同じシグネチャ（メソッド名、引数の型と数）で子クラスがメソッドを再定義することです。  
    これにより、子クラスのインスタンスでそのメソッドが呼び出された際には、親クラスのメソッドではなく、子クラスで定義された新しい動作が実行されます。  

    | 特徴        | 継承（extends）                        | オーバーライド（@Override）                 |
    | :---------- | :------------------------------------- | :------------------------------------------- |
    | **対象**    | クラス全体                             | メソッド（親クラスに同名のメソッドがある場合） |
    | **目的**    | コードの再利用、"is-a"関係の構築       | 親クラスのメソッドの動作を子クラスで変更/拡張  |
    | **キーワード** | `extends`                              | なし（`@Override`はアノテーション）          |
    | **関係**    | 親クラスの性質を「受け継ぐ」            | 親クラスの振る舞いを「上書きする」            |

    `@Override`アノテーションは、コンパイラに対して「このメソッドは親クラスのメソッドをオーバーライドしているはずだ」と伝えます。  
    もし親クラスに該当するシグネチャのメソッドが存在しない場合や、シグネチャが間違っている場合、コンパイルエラーが発生します。  
    これにより、プログラマの意図しないミスを防ぎ、コードの信頼性を高めることができます。  

*   **`super.メソッド名()` の呼び出し:**  
    `displayInfo()` メソッドのオーバーライドでは、`super.displayInfo();` が呼び出されています。  
    `super.メソッド名()` は、**親クラスで定義された特定のメソッドを呼び出すための構文**です。  
    これにより、親クラスの`displayInfo()`メソッドで定義された共通の表示ロジックを再利用しつつ、`Car`クラス固有の「ドア数」の情報を追加表示することができます。  
    重複コードを避け、効率的に機能を拡張する良い例です。  

*   **`honkHorn()` メソッド:**  
    `honkHorn()` は`Car`クラス固有のメソッドです。  `Vehicle`クラスには存在しません。  
    子クラスは、親クラスの特性を受け継ぐだけでなく、自身に固有の新しい特性（フィールドやメソッド）を追加できます。  

---

#### 5.3. `ElectricCar.java` (子クラス - `Car`を継承)

`Car`クラスを継承し、電気自動車に固有の属性と動作を追加・上書きします。  多段階の継承の例です。  

```java showLineNumbers
// ElectricCar.java
package com.example.inheritance;

/**
 * Carクラスを継承した電気自動車クラス。
 * 電気自動車固有の属性（バッテリー容量）と動作（充電、エンジンの始動/停止の上書き）を追加します。
 */
public class ElectricCar extends Car { // Carクラスを継承
    private double batteryCapacityKWh;

    // コンストラクタ
    public ElectricCar(String brand, String model, int year, int numberOfDoors, double batteryCapacityKWh) {
        // 親クラス（Car）のコンストラクタを呼び出します。
        super(brand, model, year, numberOfDoors);
        this.batteryCapacityKWh = batteryCapacityKWh;
        System.out.println("ElectricCarクラスのコンストラクタが呼び出されました: " + brand + " " + model);
    }

    // エンジン始動/停止を電気自動車向けにオーバーライド
    @Override
    public void startEngine() {
        System.out.println(brand + " " + model + " (電気自動車) のシステムを起動します。");
        System.out.println("「ブーン」という電気的な起動音...");
    }

    @Override
    public void stopEngine() {
        System.out.println(brand + " " + model + " (電気自動車) のシステムをシャットダウンします。");
    }

    // ElectricCarクラス固有のメソッド
    public void chargeBattery() {
        System.out.println(brand + " " + model + " のバッテリーを充電中です...");
    }

    @Override
    public void displayInfo() {
        super.displayInfo(); // 親クラス（Car）のdisplayInfoを呼び出す
        System.out.println("バッテリー容量: " + batteryCapacityKWh + " kWh");
    }
}
```

**追記解説:**

`ElectricCar`クラスは、`Car`クラスを継承しています。  
これは、`Vehicle` -> `Car` -> `ElectricCar`という**多段階継承（Multi-level Inheritance）**の例です。  
`ElectricCar`は`Car`の性質を受け継ぎ、`Car`は`Vehicle`の性質を受け継いでいるため、結果的に`ElectricCar`は`Vehicle`の性質も間接的に受け継いでいることになります。  

*   **`extends Car` キーワード:**  
    `ElectricCar`が`Car`のサブクラスであることを示します。  

*   **コンストラクタの連鎖の継続:**  
    `ElectricCar`のコンストラクタもまた、最初の行で`super(...)`を呼び出しています。  
    この場合、`super(brand, model, year, numberOfDoors);` は、直接の親クラスである`Car`のコンストラクタを呼び出します。  
    `Car`のコンストラクタはさらにその親である`Vehicle`のコンストラクタを呼び出すため、インスタンス生成時には以下の順序でコンストラクタが実行されます。  

    **`ElectricCar`インスタンス生成時のコンストラクタ呼び出し順序:**  
    1.  `ElectricCar`コンストラクタ内で`super(...)`が呼び出される  
    2.  `Car`コンストラクタが実行される  
    3.  `Car`コンストラクタ内で`super(...)`が呼び出される  
    4.  `Vehicle`コンストラクタが実行される (`Vehicle`の初期化処理が完了)  
    5.  `Car`コンストラクタの残りの処理が実行される (`Car`の初期化処理が完了)  
    6.  `ElectricCar`コンストラクタの残りの処理が実行される (`ElectricCar`の初期化処理が完了)  

    この順序は、オブジェクトが「親から子へ」と段階的に構築されていくことを示しており、非常に重要です。  

*   **メソッドのさらなるオーバーライド:**  
    `startEngine()` と `stopEngine()` は、`Car`クラスでオーバーライドされていたメソッドを、さらに`ElectricCar`クラスで電気自動車に特化した動作にオーバーライドしています。  
    `displayInfo()` も同様に、`super.displayInfo()`を呼び出すことで、`Vehicle`、`Car`、`ElectricCar`それぞれの`displayInfo`ロジックを段階的に実行し、すべての情報を表示するようになっています。  

*   **`chargeBattery()` メソッド:**  
    `chargeBattery()` は`ElectricCar`固有のメソッドであり、電気自動車に特有の振る舞いを表します。  

---

#### 5.4. `InheritanceDemo.java` (デモクラス)

これらのクラスのインスタンスを作成し、継承と多態性の動作を確認します。  

```java showLineNumbers
// InheritanceDemo.java
package com.example.inheritance;

import java.util.ArrayList;
import java.util.List;

public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("--- 1. 各クラスのインスタンス生成と基本動作確認 ---");

        // Vehicleクラスのインスタンス
        Vehicle myVehicle = new Vehicle("Boeing", "747", 2005);
        myVehicle.displayInfo();
        myVehicle.startEngine();
        myVehicle.stopEngine();
        System.out.println();

        // Carクラスのインスタンス（Vehicleの属性とメソッドも持つ）
        Car myCar = new Car("Toyota", "Prius", 2020, 5);
        myCar.displayInfo(); // CarでオーバーライドされたdisplayInfoが呼び出される
        myCar.startEngine(); // CarでオーバーライドされたstartEngineが呼び出される
        myCar.honkHorn();    // Car固有のメソッド
        myCar.stopEngine();
        System.out.println();

        // ElectricCarクラスのインスタンス（CarとVehicleの属性とメソッドも持つ）
        ElectricCar myElectricCar = new ElectricCar("Tesla", "Model 3", 2023, 4, 75.0);
        myElectricCar.displayInfo();    // ElectricCarでオーバーライドされたdisplayInfoが呼び出される
        myElectricCar.startEngine();    // ElectricCarでオーバーライドされたstartEngineが呼び出される
        myElectricCar.chargeBattery();  // ElectricCar固有のメソッド
        myElectricCar.honkHorn();       // Carから継承したメソッド
        myElectricCar.stopEngine();
        System.out.println();

        System.out.println("--- 2. 多態性（Polymorphism）の確認 ---");
        // 親クラスの型（Vehicle）のリストに、子クラスのインスタンスを格納できます。
        List<Vehicle> vehicles = new ArrayList<>();
        vehicles.add(myVehicle);
        vehicles.add(myCar);           // CarはVehicleでもある
        vehicles.add(myElectricCar);   // ElectricCarはCarであり、Vehicleでもある

        for (Vehicle vehicle : vehicles) {
            System.out.println("\n--- 処理中の車両 ---");
            vehicle.displayInfo();  // 各オブジェクトの実際の型に応じたdisplayInfoが呼び出される
            vehicle.startEngine();  // 各オブジェクトの実際の型に応じたstartEngineが呼び出される
            // vehicle.honkHorn(); // コンパイルエラー: Vehicle型にはhonkHornメソッドがない
            // vehicle.chargeBattery(); // コンパイルエラー: Vehicle型にはchargeBatteryメソッドがない
        }

        System.out.println("\n--- 3. 型キャストと特定のメソッドの呼び出し ---");
        // 必要に応じてダウンキャストして、子クラス固有のメソッドを呼び出すこともできますが、
        // instanceofで型を確認するのが安全です。
        for (Vehicle vehicle : vehicles) {
            if (vehicle instanceof Car) { // vehicleがCar型、またはCarのサブクラスであればtrue
                Car car = (Car) vehicle; // Car型にキャスト
                car.honkHorn();
            }
            if (vehicle instanceof ElectricCar) { // vehicleがElectricCar型であればtrue
                ElectricCar electricCar = (ElectricCar) vehicle; // ElectricCar型にキャスト
                electricCar.chargeBattery();
            }
        }
    }
}
```

**追記解説:**

この`InheritanceDemo`クラスは、これまでに定義した`Vehicle`、`Car`、`ElectricCar`クラスのインスタンスを作成し、継承と多態性がどのように機能するかを実演します。  

---

#### **5.4.1. 実行結果と詳細な解説**  

上記の`InheritanceDemo.java`を実行すると、以下のような出力が得られます。  

```
--- 1. 各クラスのインスタンス生成と基本動作確認 ---
Vehicleクラスのコンストラクタが呼び出されました: Boeing 747
---- 車両情報 ----
ブランド: Boeing
モデル: 747
年式: 2005
Boeing 747 のエンジンを始動します。
Boeing 747 のエンジンを停止します。

Vehicleクラスのコンストラクタが呼び出されました: Toyota Prius
Carクラスのコンストラクタが呼び出されました: Toyota Prius
---- 車両情報 ----
ブランド: Toyota
モデル: Prius
年式: 2020
ドア数: 5
Toyota Prius (自動車) のキーを回してエンジンを始動します。
Toyota Prius がクラクションを鳴らしました！ Beep Beep!
Toyota Prius (自動車) のエンジンを停止し、キーを抜きます。

Vehicleクラスのコンストラクタが呼び出されました: Tesla Model 3
Carクラスのコンストラクタが呼び出されました: Tesla Model 3
ElectricCarクラスのコンストラクタが呼び出されました: Tesla Model 3
---- 車両情報 ----
ブランド: Tesla
モデル: Model 3
年式: 2023
ドア数: 4
バッテリー容量: 75.0 kWh
Tesla Model 3 (電気自動車) のシステムを起動します。
「ブーン」という電気的な起動音...
Tesla Model 3 のバッテリーを充電中です...
Tesla Model 3 がクラクションを鳴らしました！ Beep Beep!
Tesla Model 3 (電気自動車) のシステムをシャットダウンします。

--- 2. 多態性（Polymorphism）の確認 ---

--- 処理中の車両 ---
---- 車両情報 ----
ブランド: Boeing
モデル: 747
年式: 2005
Boeing 747 のエンジンを始動します。

--- 処理中の車両 ---
---- 車両情報 ----
ブランド: Toyota
モデル: Prius
年式: 2020
ドア数: 5
Toyota Prius (自動車) のキーを回してエンジンを始動します。

--- 処理中の車両 ---
---- 車両情報 ----
ブランド: Tesla
モデル: Model 3
年式: 2023
ドア数: 4
バッテリー容量: 75.0 kWh
Tesla Model 3 (電気自動車) のシステムを起動します。
「ブーン」という電気的な起動音...

--- 3. 型キャストと特定のメソッドの呼び出し ---
Toyota Prius がクラクションを鳴らしました！ Beep Beep!
Tesla Model 3 がクラクションを鳴らしました！ Beep Beep!
Tesla Model 3 のバッテリーを充電中です...
```

---

#### **5.4.2. 出力結果のポイント解説**  

1.  **コンストラクタの呼び出し順序:**  
    `myCar`（Carクラスのインスタンス）を生成した際、  
    `Vehicleクラスのコンストラクタが呼び出されました: Toyota Prius`  
    `Carクラスのコンストラクタが呼び出されました: Toyota Prius`  
    の順で出力されています。  
    同様に、`myElectricCar`（ElectricCarクラスのインスタンス）を生成した際も、  
    `Vehicleクラスのコンストラクタが呼び出されました: Tesla Model 3`  
    `Carクラスのコンストラクタが呼び出されました: Tesla Model 3`  
    `ElectricCarクラスのコンストラクタが呼び出されました: Tesla Model 3`  
    という順序で出力されており、**常に親クラスのコンストラクタが子クラスのコンストラクタよりも先に実行される**ことが確認できます。  
    これは、オブジェクトが「親から子へ」と段階的に初期化されるというJavaの規則を示しています。  

2.  **オーバーライドされたメソッドの動作:**  
    `myCar.displayInfo();` や `myCar.startEngine();` を呼び出すと、`Car`クラスでオーバーライドされたバージョンのメソッドが実行されていることが出力から分かります。  
    例えば、`myCar.startEngine()`では、`Toyota Prius (自動車) のキーを回してエンジンを始動します。`  と表示され、`Vehicle`クラスの汎用的なメッセージとは異なる、自動車特有の始動方法が表現されています。  
    `myElectricCar`についても同様で、`ElectricCar`クラスでオーバーライドされたメソッドが呼び出されています。  
    `myElectricCar.displayInfo()`が`super.displayInfo()`を呼び出すことで、`Vehicle`の基本情報、`Car`のドア数、`ElectricCar`のバッテリー容量がすべて表示される点にも注目してください。  

3.  **子クラス固有のメソッド:**  
    `myCar.honkHorn();` や `myElectricCar.chargeBattery();` は、それぞれ`Car`クラスと`ElectricCar`クラスにしか存在しない固有のメソッドです。  
    これらのメソッドは、それぞれのクラスのインスタンスから直接呼び出すことができます。  
    また、`myElectricCar.honkHorn();` のように、親クラス（`Car`）から継承したメソッドを子クラス（`ElectricCar`）のインスタンスが利用できることも確認できます。  

4.  **多態性（Polymorphism）の確認:**  
    **多態性**とは、「一つの型で、異なるオブジェクトを扱うことができる」という性質です。  
    このデモでは、`List<Vehicle> vehicles` という`Vehicle`型のリストに、`Vehicle`、`Car`、`ElectricCar`のインスタンスを格納しています。  
    `Car`は`Vehicle`を継承しているので「Car is-a Vehicle」、`ElectricCar`は`Car`を継承しているので「ElectricCar is-a Car」であり、結果的に「ElectricCar is-a Vehicle」でもあるため、これら全てを`Vehicle`型として扱うことが可能なのです。  

    ```java showLineNumbers
    List<Vehicle> vehicles = new ArrayList<>();
    vehicles.add(myVehicle);
    vehicles.add(myCar);           // CarはVehicleでもある
    vehicles.add(myElectricCar);   // ElectricCarはCarであり、Vehicleでもある
    ```

    ループ処理で`vehicle.displayInfo();` や `vehicle.startEngine();` を呼び出すと、**実行時のオブジェクトの実際の型**に応じて、適切な（オーバーライドされた）メソッドが自動的に呼び出されます。  
    これは「**動的メソッドディスパッチ（Dynamic Method Dispatch）**」または「**遅延バインディング（Late Binding）**」と呼ばれ、Javaの多態性の核心となる機能です。  
    コンパイル時には変数の型（この場合`Vehicle`）に存在するメソッドかどうかをチェックし、実行時にJVMが実際のオブジェクトの型を判断して呼び出すべきメソッドを決定します。  

    *   **コンパイルエラーの例:**  
        コード中のコメントアウトされた行  
        `// vehicle.honkHorn();`  
        `// vehicle.chargeBattery();`  
        はコンパイルエラーになります。  
        これは、変数`vehicle`の**宣言された型が`Vehicle`**であるため、コンパイラは`Vehicle`クラスに`honkHorn()`や`chargeBattery()`メソッドが存在しないと判断するためです。  
        たとえ実行時に`vehicle`が`Car`や`ElectricCar`のインスタンスを指していたとしても、コンパイル時にはその事実は考慮されません。  
        多態性では、変数の宣言型が持つメソッドのみを呼び出すことができます。  

5.  **型キャストと `instanceof`:**  
    多態性によって統一的に扱えるのは便利ですが、子クラス固有のメソッドを呼び出したい場合はどうすればよいでしょうか？  
    その場合、「**ダウンキャスト（Downcasting）**」という操作が必要です。  
    親クラスの型を持つ変数を、その変数が実際に参照している子クラスの型に変換することです。  

    しかし、ダウンキャストは実行時に`ClassCastException`が発生する可能性があるため、安全に行う必要があります。  
    ここで役立つのが `instanceof` 演算子です。  
    `if (vehicle instanceof Car)` のように使用し、変数が特定の型（またはそのサブタイプ）のインスタンスであるかどうかをチェックします。  
    このチェックを行った上で安全にダウンキャストすることで、子クラス固有のメソッドを呼び出すことが可能になります。  

    ```java showLineNumbers
    if (vehicle instanceof Car) { // vehicleがCar型、またはCarのサブクラスであればtrue
        Car car = (Car) vehicle; // Car型にキャスト
        car.honkHorn();
    }
    if (vehicle instanceof ElectricCar) { // vehicleがElectricCar型であればtrue
        ElectricCar electricCar = (ElectricCar) vehicle; // ElectricCar型にキャスト
        electricCar.chargeBattery();
    }
    ```
    この部分の出力では、`myVehicle`は`Car`でも`ElectricCar`でもないためスキップされますが、`myCar`と`myElectricCar`に対しては`honkHorn()`が呼び出され、さらに`myElectricCar`に対しては`chargeBattery()`が呼び出されていることが確認できます。  

---

### 6. まとめ

継承は、オブジェクト指向プログラミングにおいて、コードの再利用、保守性の向上、拡張性の実現、そして多態性の基盤を提供する非常に重要な概念です。  
「is-a」の関係を表現する際に用いられ、共通のロジックを親クラスに集約することで、効率的で理解しやすいプログラム構造を構築できます。  

しかし、過度な継承はクラス間の結合度を高め、柔軟性を損なう可能性もあるため、適切に使用することが重要です。  
継承を適用するかどうかの判断には、「is-a」の関係が本当に成り立っているか、そしてコードの再利用性や拡張性が本当に向上するかを慎重に検討する必要があります。  

時には継承よりも「コンポジション（オブジェクトの組み合わせ）」の方が、より柔軟で疎結合な設計をもたらす場合もあります。  