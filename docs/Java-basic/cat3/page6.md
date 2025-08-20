
# 抽象クラス

抽象クラスは未完成なクラスの設計図です。  
それ単体ではオブジェクト（実体）を作れず、必ず他のクラスに継承されて使われます。

抽象クラスは具体的な処理が書かれていない「抽象メソッド」を持つことができ、これを継承した子クラスはその抽象メソッドを**必ず実装する義務**があります。  
これにより共通の機能は定義しつつ、その具体的な動作は子クラスに任せる、という柔軟な設計が可能になります。

:::tip
#### 通常のクラスとの差異
通常のクラスは、その設計図通りにインスタンスを作ることができます。  
例えば、「Carという設計図があるから、すぐにnew Car()で車を作れる」といった具合です。

しかし抽象クラスはそれ単体ではモノを直接作ることはできません。  
なぜならその設計図の中に「**抽象メソッド**」という具体的な作り方がまだ決まっていない（中身が書かれていない）部分があるからです。

#### 抽象メソッド
抽象メソッドは「こんな機能は必要だ」という宣言だけがあり、その機能が**実際にどう動くか**という中身（処理）は書かれていません。  
例えば設計図に「ここにドアを付ける」と書いてあるけど、「どんなドアか（開き方、素材など）」が具体的に決まっていないような状態です。
:::


従業員管理システムを例に、抽象クラスの概念を詳しく解説します。  

### 1-1. 抽象クラス `Employee.java` 詳細解説

`Employee` クラスは、すべての従業員に共通する特性と振る舞いを定義する抽象クラスです。  
抽象クラスであるため、このクラス単体では不完全であり、直接オブジェクトを作成することはできません。  
具体的な従業員の種類（月給制、時給制など）がこのクラスを継承して、足りない部分（給与計算方法）を補完することで、完全なクラスとなります。  

```java showLineNumbers
// Employee.java (抽象クラス)
public abstract class Employee {
    private String name; // 従業員名
    private String id;   // 従業員ID

    // コンストラクタ (サブクラスから呼び出される)
    public Employee(String name, String id) {
        this.name = name;
        this.id = id;
    }

    // 共通のゲッターメソッド
    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    // 共通の具体的なメソッド (全従業員に共通の振る舞い)
    public void displayInfo() {
        System.out.println("従業員名: " + name + ", ID: " + id);
    }

    // 抽象メソッド (給与計算は従業員の種類によって異なるため、実装を持たない)
    // このメソッドは、Employeeを継承するすべての具象クラスで実装が必須となる
    public abstract double calculatePay();
}
```

**コード解説:**

*   **`public abstract class Employee`**:  
    *   `abstract` キーワードがクラス宣言の前に付与されています。  
    *   これは、このクラスが抽象クラスであることを示します。  
    *   抽象クラスは、それ自身ではインスタンス化（`new Employee(...)` のようにオブジェクトを作成すること）ができません。  
    *   必ず他の具象クラスに継承され、そのサブクラスによって完成されることを前提としています。  

*   **`private String name;` / `private String id;`**:  
    *   これらは、すべての従業員が共通して持つべき「属性（プロパティ）」です。  
    *   `private` アクセス修飾子が付いているため、これらのフィールドにはこのクラス内からのみ直接アクセスできます。  
    *   外部からのアクセスは、後述のゲッターメソッドを通じて行われます。  

*   **`public Employee(String name, String id)`**:  
    *   これはコンストラクタです。  
    *   抽象クラスは直接インスタンス化できませんが、コンストラクタを持つことができます。  
    *   その理由は、サブクラスがインスタンス化される際に、`super(...)` を使って親クラス（この場合は `Employee`）のコンストラクタを呼び出す必要があるためです。  
    *   ここで `name` と `id` を初期化することで、サブクラスのインスタンスもこれらの共通プロパティを持つことになります。  

*   **`public String getName()` / `public String getId()`**:  
    *   これらは「ゲッターメソッド」と呼ばれ、`private` なフィールド `name` と `id` の値を取得するための公開メソッドです。  
    *   これらのメソッドは、すべての従業員に共通の「振る舞い」であり、具体的な実装を持っています。  

*   **`public void displayInfo()`**:  
    *   これもすべての従業員に共通する「振る舞い」を定義した具体的なメソッドです。  
    *   従業員の名前とIDを表示するという、特定のロジックを持っています。  
    *   抽象クラスは、このように具体的な実装を持つメソッドを定義することもできます。  
    *   これにより、共通のコードを抽象クラスにまとめることで、サブクラスでのコード重複を防ぐことができます。  

*   **`public abstract double calculatePay();`**:  
    *   これが「抽象メソッド」です。  
    *   `abstract` キーワードがメソッド宣言の前に付与されています。  
    *   メソッドの本体（`{}` で囲まれた処理ブロック）がありません。  
    *   これは「このメソッドは存在するが、具体的な処理内容はまだ決まっていない」ということを示します。  
    *   `Employee` クラスのサブクラスは、この `calculatePay()` メソッドを**必ず**オーバーライド（再定義）し、具体的な給与計算ロジックを実装する必要があります。  
    *   もしサブクラスがこの抽象メソッドを実装しなかった場合、そのサブクラス自身も抽象クラスとして宣言するか、コンパイルエラーが発生します。  
    *   このように、抽象メソッドは、サブクラスに対して特定の振る舞いの実装を「強制」する役割を担います。  

**`Employee` クラスの要素まとめ:**

| 要素の種別       | 具体的な要素名/例 | 説明                                                                    |
| :--------------- | :---------------- | :---------------------------------------------------------------------- |
| **クラス修飾子** | `abstract`        | クラスを直接インスタンス化できないようにし、継承されることを強制します。  |
| **フィールド**   | `name`, `id`      | 全ての従業員が共通して持つ属性（プロパティ）を定義します。              |
| **コンストラクタ** | `Employee(...)`   | サブクラスがインスタンス化される際に、親クラスの初期化を行うために存在します。 |
| **具象メソッド** | `getName()`, `getId()`, `displayInfo()` | 具体的な処理内容を持つメソッドです。共通の振る舞いを定義します。      |
| **抽象メソッド** | `calculatePay()`  | 処理内容を持たないメソッドです。サブクラスで必ず実装されるべき振る舞いを「強制」します。 |

---

### 1-2. 具象クラス `SalariedEmployee.java` 詳細解説

`SalariedEmployee` クラスは、月給制の従業員を表す具体的なクラスです。  
`Employee` 抽象クラスを継承することで、その共通プロパティと抽象メソッドの実装義務を引き継ぎます。  

```java showLineNumbers
// SalariedEmployee.java (具象クラス)
public class SalariedEmployee extends Employee {
    private double annualSalary; // 年間給与

    public SalariedEmployee(String name, String id, double annualSalary) {
        // 親クラス (Employee) のコンストラクタを呼び出す
        super(name, id);
        this.annualSalary = annualSalary;
    }

    // 抽象メソッドの具体的な実装 (月給制の給与計算)
    @Override // オーバーライドしていることを明示
    public double calculatePay() {
        return annualSalary / 12; // 年間給与を12で割って月給を計算
    }
}
```

**コード解説:**

*   **`public class SalariedEmployee extends Employee`**:  
    *   `extends Employee` は、`SalariedEmployee` が `Employee` クラスを継承していることを示します。  
    *   これにより、`SalariedEmployee` は `Employee` クラスのすべての公開（`public`）および保護（`protected`）メンバー（フィールド、メソッド）を利用できるようになります。  
    *   また、`Employee` クラスが持つ抽象メソッド `calculatePay()` の実装が `SalariedEmployee` に義務付けられます。  
    *   このクラスは `abstract` キーワードを持たないため、具象クラスであり、インスタンス化が可能です。  

*   **`private double annualSalary;`**:  
    *   これは `SalariedEmployee` 固有の属性です。  
    *   月給制の従業員にのみ関連する年間給与を保持します。  

*   **`public SalariedEmployee(String name, String id, double annualSalary)`**:  
    *   `SalariedEmployee` クラスのコンストラクタです。  
    *   `super(name, id);` の行に注目してください。  
    *   `super` キーワードは、親クラス（この場合は `Employee`）のコンストラクタを呼び出すために使用されます。  
    *   これにより、`Employee` クラスで定義された `name` と `id` の初期化が行われます。  
    *   `super()` の呼び出しは、サブクラスのコンストラクタの最初の行になければなりません。  

*   **`@Override`**:  
    *   これはアノテーションです。  
    *   このメソッドが親クラスのメソッドをオーバーライドしていることをコンパイラに示します。  
    *   必須ではありませんが、記述することで、もし親クラスに該当するメソッドが存在しない場合や、メソッドシグネチャ（名前、引数の型と数）が間違っている場合にコンパイルエラーとして教えてくれるため、ミスの発見に役立ちます。  

*   **`public double calculatePay()`**:  
    *   `Employee` 抽象クラスで定義された抽象メソッド `calculatePay()` の具体的な実装です。  
    *   ここでは、`annualSalary` を `12` で割ることで月給を計算し、その値を返します。  
    *   この実装により、`SalariedEmployee` クラスは `Employee` クラスの抽象メソッドの義務を果たし、完全な具象クラスとなっています。  

---

### 1-3. 具象クラス `HourlyEmployee.java` 詳細解説

`HourlyEmployee` クラスは、時給制の従業員を表す具体的なクラスです。  
これも `Employee` 抽象クラスを継承し、独自の給与計算ロジックを実装します。  

```java showLineNumbers
// HourlyEmployee.java (具象クラス)
public class HourlyEmployee extends Employee {
    private double hourlyRate;  // 時給
    private int hoursWorked;    // 勤務時間 (月間)

    public HourlyEmployee(String name, String id, double hourlyRate, int hoursWorked) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    // 抽象メソッドの具体的な実装 (時給制の給与計算)
    @Override
    public double calculatePay() {
        return hourlyRate * hoursWorked; // 時給 × 勤務時間 で給与を計算
    }
}
```

**コード解説:**

*   **`public class HourlyEmployee extends Employee`**:  
    *   `SalariedEmployee` と同様に、`Employee` 抽象クラスを継承しています。  
    *   これにより、`Employee` の共通プロパティと抽象メソッド `calculatePay()` の実装義務を引き継いでいます。  

*   **`private double hourlyRate;` / `private int hoursWorked;`**:  
    *   これらは `HourlyEmployee` 固有の属性です。  
    *   時給と月間の勤務時間を保持し、時給制の給与計算に必要となります。  

*   **`public HourlyEmployee(String name, String id, double hourlyRate, int hoursWorked)`**:  
    *   `HourlyEmployee` クラスのコンストラクタです。  
    *   ここでも `super(name, id);` を呼び出し、親クラスである `Employee` のコンストラクタを通じて `name` と `id` を初期化しています。  

*   **`public double calculatePay()`**:  
    *   `Employee` 抽象クラスで定義された抽象メソッド `calculatePay()` の具体的な実装です。  
    *   このクラスでは、`hourlyRate`（時給）と `hoursWorked`（勤務時間）を掛け合わせることで月給を計算し、その値を返します。  
    *   `SalariedEmployee` とは異なる、このクラス独自の給与計算ロジックが実装されています。  
    *   このように、抽象メソッドをオーバーライドすることで、各サブクラスが独自の振る舞いを定義しつつ、共通のインターフェース（`calculatePay()` というメソッド名）を提供することができます。  

---

### 1-4. 実行クラス `Main.java` 詳細解説

`Main` クラスはこれまでに定義した抽象クラスと具象クラスを利用し、抽象クラスの特性とポリモーフィズムのメリットを示すための実行エントリポイントです。  

```java showLineNumbers
// Main.java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // --- 抽象クラスの直接インスタンス化は不可 ---
        // 以下の行はコンパイルエラーになります！
        // Employee employee = new Employee("田中", "E000");

        System.out.println("--- 従業員の給与計算 ---");

        // 各具象クラスのインスタンスを作成
        SalariedEmployee salariedEmp = new SalariedEmployee("山田 太郎", "S001", 6000000); // 年収600万円
        HourlyEmployee hourlyEmp = new HourlyEmployee("鈴木 花子", "H002", 1500, 160); // 時給1500円で160時間勤務

        // --- ポリモーフィズムの活用 ---
        // 抽象クラス型 (Employee) のリストに、異なる具象クラスのインスタンスを格納できる
        List<Employee> employees = new ArrayList<>();
        employees.add(salariedEmp);
        employees.add(hourlyEmp);

        // リストをループして各従業員の情報を表示し、給与を計算
        for (Employee emp : employees) {
            emp.displayInfo(); // 共通のメソッド (抽象クラスで定義)
            // calculatePay() はサブクラスごとに異なる実装が呼び出される
            System.out.printf("  月給: %.2f円%n", emp.calculatePay());
            System.out.println("------------------------------------");
        }
    }
}
```

**コード解説:**

*   **`import java.util.ArrayList;` / `import java.util.List;`**:  
    *   リスト（`List`）と、その具体的な実装である `ArrayList` を使用するために必要なインポート文です。  

*   **`public static void main(String[] args)`**:  
    *   Javaアプリケーションの実行開始点となるメインメソッドです。  

*   **`// Employee employee = new Employee("田中", "E000");`**:  
    *   このコメントアウトされた行は非常に重要です。  
    *   `new Employee(...)` のように、抽象クラス `Employee` を直接インスタンス化しようとすると、コンパイルエラーが発生します。  
    *   これは、抽象クラスが「不完全な設計図」であり、具体的なオブジェクトを作成する能力を持たないためです。  
    *   実行前にコンパイルの段階でエラーになることで、誤った使用を防ぐことができます。  

*   **`SalariedEmployee salariedEmp = new SalariedEmployee("山田 太郎", "S001", 6000000);`**:  
    *   `SalariedEmployee` クラスは具象クラスであるため、このように `new` キーワードを使ってインスタンスを作成できます。  
    *   コンストラクタに名前、ID、年間給与を渡して初期化しています。  

*   **`HourlyEmployee hourlyEmp = new HourlyEmployee("鈴木 花子", "H002", 1500, 160);`**:  
    *   同様に、`HourlyEmployee` クラスも具象クラスなのでインスタンス化が可能です。  
    *   コンストラクタに名前、ID、時給、勤務時間を渡して初期化しています。  

*   **`List<Employee> employees = new ArrayList<>();`**:  
    *   これは「ポリモーフィズム（多態性）」の非常に良い例です。  
    *   リストの型を抽象クラスである `Employee` と宣言しています。  
    *   これにより、このリストには `Employee` を継承する**すべての具象クラスのインスタンス**（`SalariedEmployee` や `HourlyEmployee` など）を格納することができます。  
    *   これにより、異なる種類の従業員を一つのコレクションとして一元的に管理できる柔軟性が生まれます。  

*   **`employees.add(salariedEmp);` / `employees.add(hourlyEmp);`**:  
    *   作成した `salariedEmp` と `hourlyEmp` のインスタンスを `Employee` 型のリストに追加しています。  
    *   Javaの型システムでは、サブクラスのインスタンスは親クラスの型として扱うことができます（「IS-A」関係：`SalariedEmployee` は `Employee` の一種である）。  

*   **`for (Employee emp : employees)`**:  
    *   `Employee` 型のリスト `employees` を拡張forループで反復処理しています。  
    *   ループ内で `emp` は、その時点でのリスト要素（`SalariedEmployee` または `HourlyEmployee` のインスタンス）を参照しますが、型としては `Employee` として扱われます。  

*   **`emp.displayInfo();`**:  
    *   `displayInfo()` メソッドは `Employee` 抽象クラスで具象メソッドとして実装されています。  
    *   したがって、`emp` が `SalariedEmployee` であっても `HourlyEmployee` であっても、この共通の `displayInfo()` メソッドが呼び出され、それぞれのインスタンスの名前とIDが表示されます。  

*   **`System.out.printf("  月給: %.2f円%n", emp.calculatePay());`**:  
    *   ここがポリモーフィズムの最も重要なポイントです。  
    *   `emp.calculatePay()` を呼び出す際、Javaの実行時（ランタイム）システムは、`emp` が実際に参照しているオブジェクトの**具体的な型**（`SalariedEmployee` か `HourlyEmployee` か）を判断し、その型でオーバーライドされた `calculatePay()` メソッドを呼び出します。  
    *   例えば、`emp` が `salariedEmp` を参照している場合は `SalariedEmployee` クラスの `calculatePay()` が（年間給与/12）実行され、`emp` が `hourlyEmp` を参照している場合は `HourlyEmployee` クラスの `calculatePay()` が（時給×勤務時間）実行されます。  
    *   開発者は、ループ内で `emp` の具体的な型を意識することなく、共通の `calculatePay()` メソッドを呼び出すだけで、適切な給与計算ロジックが自動的に選択・実行される、という非常に柔軟なコードを書くことができます。  

**実行結果:**

```
--- 従業員の給与計算 ---
従業員名: 山田 太郎, ID: S001
  月給: 500000.00円
------------------------------------
従業員名: 鈴木 花子, ID: H002
  月給: 240000.00円
------------------------------------
```

**実行結果の解説:**

*   `山田 太郎` の行では、`SalariedEmployee` の `calculatePay()` メソッドが呼び出され、年収600万円を12で割った月給50万円が正確に計算・表示されています。  
*   `鈴木 花子` の行では、`HourlyEmployee` の `calculatePay()` メソッドが呼び出され、時給1500円と月間勤務時間160時間を掛け合わせた月給24万円が正確に計算・表示されています。  
*   このように、同じ `emp.calculatePay()` という呼び出しでありながら、参照しているオブジェクトの具体的な型に応じて異なる振る舞いが実行されていることが確認できます。  
*   これが、抽象クラスとポリモーフィズムが提供する強力な機能です。  

### まとめ

- **直接オブジェクトを作れない:**   
newを使って直接「モノ」を作り出すことはできません。
- **抽象メソッドを持てる:**   
中身が空っぽの、宣言だけのメソッド（抽象メソッド）を持つことができます。
- **必ず継承して使う:**   
抽象クラスは、他のクラスに継承されることで利用されます。
- **子クラスは抽象メソッドを完成させる義務がある:**   
継承した子クラスは、親の抽象クラスにある抽象メソッドをすべて実装（中身を書く）しないとエラーになります。

この仕組みは、共通の「型」や「必要な機能」は親の抽象クラスで決めておきつつ、その機能の「具体的なやり方」は、それを引き継ぐ子クラスに任せる、という柔軟な設計を可能にします。