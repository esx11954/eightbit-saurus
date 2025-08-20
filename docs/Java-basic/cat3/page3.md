# カプセル化・アクセス修飾子

### 1. カプセル化とは

カプセル化（Encapsulation）とは、オブジェクト指向プログラミングの主要な原則の一つで、**データ（属性）とそのデータを操作するメソッド（振る舞い）を一つの単位（クラス）にまとめ、外部から直接データを操作できないように隠蔽すること**を指します。  
これにより、オブジェクトの内部構造や実装詳細を隠し、外部からは定められたインターフェース（公開されたメソッド）を通してのみアクセスできるようになります。  

**イメージ:**
自動販売機を想像してみてください。  
*   ジュースを出すためのボタン（公開されたインターフェース）は触れます。  
*   しかし、お釣りが出てくる仕組みや、中のジュースがどう補充されているか（内部実装）は、通常ユーザーからは見えませんし、直接触れません。  

これがカプセル化の考え方です。  
ユーザーは「ボタンを押せばジュースが出る」という機能だけを知っていればよく、内部の複雑さを気にする必要はありません。  

Javaでは、このカプセル化を実現するために、フィールド（データ）を `private` に設定し、そのフィールドにアクセスするための `public` なメソッド（一般的にGetter/Setter）を提供することが一般的です。  
これにより、データの読み書きを制御し、不正な値が設定されることを防ぐことができます。  

### 2. カプセル化の必要性

カプセル化は、コードの品質と保守性を大幅に向上させます。  
具体的なメリットは以下の通りです。  

1.  **データ保護と整合性（Data Protection & Integrity）**
    *   外部からの不正なデータ変更を防ぎ、データの一貫性と正しさを保てます。  
    例えば、年齢がマイナスになったり、給料が不当に高くなったりするのを防ぐバリデーションロジックを、Setterメソッド内に集中させることができます。  
    これにより、オブジェクトが常に有効な状態を保つことができます。  
2.  **保守性の向上（Improved Maintainability）**
    *   クラスの内部実装（例えば、データの保存形式や計算ロジック）を変更しても、そのクラスの公開されたインターフェース（`public` メソッド）が変わらなければ、外部のコードに影響を与えません。  
    これにより、システム全体を再コンパイル・再デプロイすることなく、安全に内部を変更・改善できます。  
3.  **コードの再利用性（Code Reusability）**
    *   独立性の高い、自己完結型のクラスを設計できるため、他のプロジェクトや異なる状況での再利用が容易になります。  
    内部実装に依存せず、公開されたインターフェースだけを使えばよいからです。  
4.  **複雑さの軽減（Reduced Complexity）**
    *   クラスの内部構造を隠蔽することで、そのクラスを使用する側は、公開されたメソッドの使い方だけを覚えればよく、内部の複雑なロジックを理解する必要がなくなります。  
    これにより、大規模なシステム開発でもコードの可読性と理解度が向上します。  
5.  **セキュリティ（Security）**
    *   機密性の高い情報（例: パスワード）を `private` にすることで、外部から直接アクセスされることを防ぎ、セキュリティを高めることができます。  
6.  **テスト容易性（Testability）**
    *   各クラスが独立した機能を持つため、単体テストが容易になります。  
    また、内部状態を操作する際に必ずSetterを通すことで、テスト時のデータの準備や検証がしやすくなります。  

### 3. アクセス修飾子とは

カプセル化を実現するための具体的なメカニズムが「アクセス修飾子（Access Modifiers）」です。  これらは、クラス、フィールド（属性）、メソッド、コンストラクターなどへのアクセスレベルを制御します。  

Javaには4つのアクセス修飾子があります。  

1.  `private`
2.  `default` (修飾子を何も付けない場合)
3.  `protected`
4.  `public`

#### 各アクセス修飾子の詳細

| 修飾子    | アクセス可能な範囲                                         | 特徴                                                         |
| :-------- | :--------------------------------------------------------- | :----------------------------------------------------------- |
| `private` | **同じクラス内のみ**                                       | 最も制限が強い。  主にフィールドのカプセル化や、そのクラスの内部でのみ使用されるヘルパーメソッドに使用されます。  外部からは一切アクセスできません。  |
| `default` | **同じパッケージ内のみ**（修飾子なし）                   | 明示的な修飾子を付けない場合に適用されます。  同じパッケージ内のクラスからのみアクセス可能です。  パッケージ内での密接な連携が必要な場合に利用されますが、修飾子がないため、その意図がコードを読む人に伝わりにくいことがあります。  |
| `protected` | **同じパッケージ内、または異なるパッケージのサブクラス**   | 継承関係にあるクラスに対してのみ公開したい場合に利用します。  特に、サブクラスが親クラスの特定の内部実装にアクセスする必要があるが、それ以外のクラスからは直接アクセスされたくない場合に便利です。  注意点として、異なるパッケージのサブクラスからアクセスする場合、そのアクセスはサブクラスのインスタンス自身（またはその親クラスのインスタンス）に限定されます（他のサブクラスのインスタンスの`protected`メンバーにはアクセスできません）。  |
| `public`  | **どこからでもアクセス可能**（全てのクラス、全てのパッケージ） | 最も制限が緩い。  公開API、外部に提供する機能（メソッド）やクラスに付けられます。  Javaアプリケーションのエントリーポイントとなる`main`メソッドは必ず`public`である必要があります。  |

#### クラスに対するアクセス修飾子

クラス自体に適用できるアクセス修飾子は `public` または `default` のみです。  

*   `public class MyClass { ... }`: どこからでもこのクラスにアクセスし、インスタンスを生成したり、静的メンバーにアクセスしたりできます。  
*   `class MyClass { ... }` (修飾子なし): 同じパッケージ内からのみこのクラスにアクセスできます。  
これは、特定のパッケージ内部でのみ使用されるヘルパークラスなどに利用されます。  

### 4. サンプルコードによる解説

以下のサンプルコードでは、`Employee` クラスを中心に、様々なアクセス修飾子とカプセル化の概念を説明します。  

**プロジェクト構成例:**

```
src/
├── com/
│   └── example/
│       └── hr/
│           ├── employee/
│           │   └── Employee.java  <-- 社員情報クラス
│           └── app/
│               └── HrApplication.java <-- アプリケーション実行クラス (異なるパッケージ)
│       └── payroll/
│           └── Manager.java     <-- 管理者クラス (Employeeとは異なるパッケージ)
```

#### 4.1 `Employee.java` (社員情報クラス)

このクラスは、カプセル化と各種アクセス修飾子の利用例を示します。  

```java showLineNumbers
// src/com/example/hr/employee/Employee.java
package com.example.hr.employee;

import java.time.LocalDate;

/**
 * 社員情報を管理するクラス。
 * 各種アクセス修飾子とカプセル化の概念をデモンストレーションします。
 */
public class Employee {
    // --- フィールド（属性）---
    // 1. private (最も強力なカプセル化)
    // 外部から直接アクセスできないようデータを隠蔽し、Getter/Setter経由でのみ操作を許可します。
    private String name;        // 社員名
    private double salary;      // 給与
    private final String employeeId;  // 社員ID (finalを付けて、一度設定したら変更不可にしています)
    private String password;    // パスワードなど機密性の高い情報

    // 2. default (パッケージプライベート)
    // 同じパッケージ内 (com.example.hr.employee) のクラスからのみアクセス可能。
    String department; // 部署名 (同じHR部門内でのみ共有したい情報など)

    // 3. protected
    // 同じパッケージ内、または異なるパッケージのサブクラスからアクセス可能。
    protected LocalDate hireDate; // 採用日 (継承関係にあるクラスに公開したい情報など)

    // 4. public
    // どこからでもアクセス可能。
    public String companyName = "YourCompany Inc."; // 会社名 (誰でもアクセス可能)

    /**
     * Employeeクラスのコンストラクタ。
     * public修飾子により、どこからでもこのクラスのインスタンスを生成できます。
     * @param name 社員名
     * @param salary 給与
     * @param employeeId 社員ID
     * @param department 部署名
     * @param hireDate 採用日
     */
    public Employee(String name, double salary, String employeeId, String department, LocalDate hireDate) {
        this.name = name;
        // 給与はsetterを通して設定し、バリデーションロジックを適用します。
        setSalary(salary); // コンストラクタ内でもsetterを呼び出すことで、バリデーションを適用できます。
        this.employeeId = employeeId; // finalフィールドはコンストラクタでのみ初期化可能
        this.department = department;
        this.hireDate = hireDate;
        this.password = "initial_pass"; // 仮のパスワード、実際はより複雑なロジックやハッシュ化が必要です。
        System.out.println("Employeeインスタンスが生成されました: " + name);
    }

    // --- メソッドによるアクセス制御 ---

    // public: 外部に公開するインターフェース (Getter)。
    // privateフィールド 'name' の値を安全に取得するためのメソッドです。
    public String getName() {
        return name;
    }

    // public: 外部に公開するインターフェース (Getter)。
    // privateでfinalなフィールド 'employeeId' の値を取得します。
    public String getEmployeeId() {
        return employeeId;
    }

    // public: 外部に公開するインターフェース (Getter)。
    // privateフィールド 'salary' の値を取得します。
    public double getSalary() {
        return salary;
    }

    // public: 外部に公開するインターフェース (Setter)。
    // privateフィールド 'salary' の値を設定するためのメソッドです。
    // データ保護と整合性の例: 不正な給与設定を防ぐバリデーションロジックが含まれます。
    public void setSalary(double newSalary) {
        if (newSalary >= 0) { // 給与は0以上である必要があるというビジネスルールを適用
            this.salary = newSalary;
            System.out.println(this.name + "の給与が" + newSalary + "に設定されました。");
        } else {
            System.err.println("エラー: 給与は0以上である必要があります。不正な値: " + newSalary);
        }
    }

    // private: クラスの内部でのみ使用されるヘルパーメソッド。
    // 外部からは直接呼び出せず、Employeeクラスの他のpublicメソッドなどから間接的に利用されます。
    private void generatePayroll() {
        System.out.println(name + "の給与計算を内部的に実行中...");
        // 実際には複雑な給与計算ロジックがここに実装されます。
        // このロジックの詳細は外部に隠蔽されています。
    }

    // public: 外部に公開する社員の基本情報表示メソッド。
    // このメソッドを通じて、privateフィールドやprivateメソッドに安全にアクセスできます。
    public void displayPublicInfo() {
        System.out.println("\n--- 公開情報 ---");
        System.out.println("氏名: " + name); // privateフィールドへのアクセス (同クラス内なのでOK)
        System.out.println("社員ID: " + employeeId); // privateフィールドへのアクセス (同クラス内なのでOK)
        System.out.println("会社名: " + companyName); // publicフィールドへのアクセス (同クラス内なのでOK)
        // privateメソッドも同クラス内から呼び出し可能。外部からは直接呼び出せません。
        generatePayroll();
    }

    // default (修飾子なし): 同じパッケージ内からのみアクセス可能。
    // com.example.hr.employee パッケージ内のクラスからはアクセスできますが、
    // com.example.hr.app のような異なるパッケージからはアクセスできません。
    void displayPackageInfo() {
        System.out.println("\n--- パッケージ内情報 (部署) ---");
        System.out.println("部署: " + department); // defaultフィールドへのアクセス (同クラス内なのでOK)
        System.out.println("（このメソッドは同じパッケージのクラスからのみ呼び出し可能です）");
    }

    // protected: 同じパッケージ内、またはサブクラスからのみアクセス可能。
    // このクラスを継承するクラス（例: Manager）からは呼び出し可能ですが、
    // それ以外の外部クラスからは直接呼び出すことはできません。
    protected void displayProtectedInfo() {
        System.out.println("\n--- 保護された情報 (採用日) ---");
        System.out.println("採用日: " + hireDate); // protectedフィールドへのアクセス (同クラス内なのでOK)
        System.out.println("（このメソッドは同じパッケージのクラス、またはサブクラスからのみ呼び出し可能です）");
    }

    // privateなパスワードにはpublicなgetter/setterを提供しない（セキュリティのため）。
    // 必要であれば、パスワード変更メソッドなどを提供し、古いパスワードの確認などを含んだロジックを実装します。
    public boolean checkPassword(String inputPassword) {
        return this.password.equals(inputPassword); // 実際はハッシュ化したパスワードを比較します。
    }
}
```
**`Employee.java` の解説:**  
*   **`private` フィールド (`name`, `salary`, `employeeId`, `password`):**  
    これらのフィールドは最も厳しくカプセル化されており、`Employee` クラスの内部からのみ直接アクセス可能です。  
    クラスの外部からは、`public` な `getName()`, `getSalary()`, `setSalary()` などのメソッド（いわゆる「Getter」と「Setter」）を介してのみ、間接的にアクセスできます。  
    *   `employeeId` は `final` 修飾子が付いており、一度コンストラクタで初期化されると、以降は変更不可能となります。  
    これはオブジェクト生成時に一意の識別子を設定し、その後の変更を防ぐ典型的な使用例です。  
    *   `password` のように機密性の高い情報は、`private` にして直接アクセスできないようにすることが非常に重要です。  
    `checkPassword()` のような限定的な操作のみを許可します。  
*   **`default` フィールド (`department`):**  
    修飾子を何も付けない場合、これは `default` (パッケージプライベート) アクセスレベルとなります。  
    `Employee` クラスと同じ `com.example.hr.employee` パッケージ内の他のクラスからは直接アクセスできますが、`com.example.hr.app` や `com.example.hr.payroll` のような異なるパッケージのクラスからはアクセスできません。  
*   **`protected` フィールド (`hireDate`):**  
    このフィールドは、同じパッケージ内のクラス、または `Employee` クラスを継承するサブクラスからアクセス可能です。  
    例えば、`com.example.hr.payroll` パッケージにある `Manager` クラス（`Employee` のサブクラス）からはアクセスできますが、`com.example.hr.app` パッケージにある `HrApplication` クラスからは直接アクセスできません。  
*   **`public` フィールド (`companyName`):**  
    このフィールドは最もアクセス制限が緩く、プロジェクト内のどこからでも直接アクセス可能です。  
    一般的に、定数やアプリケーション全体で共有される読み取り専用の情報に利用されます。  
*   **コンストラクタ (`public Employee(...)`):**  
    コンストラクタもアクセス修飾子を持ちます。  
    `public` であるため、どのパッケージのクラスからでも `new Employee(...)` の形式でインスタンスを生成できます。  
*   **`public` メソッド (`getName()`, `getEmployeeId()`, `getSalary()`, `setSalary()`, `displayPublicInfo()`, `checkPassword()`):**  
    これらのメソッドは、`Employee` クラスの外部に対する「窓口」です。  
    これらを通じてのみ、`private` なデータへのアクセスや、クラスの機能の利用が許可されます。  
    特に `setSalary()` メソッドは、給与が0以上である必要があるというビジネスルールを内部で検証しており、不正な値が設定されるのを防ぐことでデータの整合性を保っています。  
*   **`private` メソッド (`generatePayroll()`):**  
    このメソッドは `Employee` クラスの内部でのみ使用されるヘルパーメソッドです。  
    例えば、`displayPublicInfo()` メソッド内で呼び出されています。  
    その実装詳細は外部からは完全に隠蔽されており、クラスの内部ロジックを整理し、複雑さを軽減するのに役立ちます。  
*   **`default` メソッド (`displayPackageInfo()`):**  
    `department` フィールドと同様に、このメソッドも同じパッケージ内のクラスからのみ呼び出し可能です。  
*   **`protected` メソッド (`displayProtectedInfo()`):**  
    `hireDate` フィールドと同様に、このメソッドも同じパッケージ内のクラス、またはサブクラスからのみ呼び出し可能です。  

#### 4.2 `Manager.java` (管理者クラス - 異なるパッケージのサブクラス)

`Employee` クラスを継承し、`protected` メンバーへのアクセスを示します。  

```java showLineNumbers
// src/com/example/hr/payroll/Manager.java
package com.example.hr.payroll; // 異なるパッケージ

import com.example.hr.employee.Employee; // Employeeクラスをインポート
import java.time.LocalDate;

/**
 * Employeeクラスを継承するManagerクラス。
 * 異なるパッケージのサブクラスからprotectedメンバーにアクセスする例を示します。
 */
public class Manager extends Employee {

    private String teamName;

    /**
     * Managerクラスのコンストラクタ。
     * 親クラスのコンストラクタをsuperキーワードで呼び出します。
     */
    public Manager(String name, double salary, String employeeId, String department, LocalDate hireDate, String teamName) {
        super(name, salary, employeeId, department, hireDate);
        this.teamName = teamName;
        System.out.println("Managerインスタンスが生成されました: " + name);
    }

    // publicなGetter
    public String getTeamName() {
        return teamName;
    }

    /**
     * マネージャー情報を表示するメソッド。
     * protectedメンバーへのアクセス例が含まれます。
     */
    public void displayManagerInfo() {
        System.out.println("\n--- マネージャー情報 ---");
        // publicな親クラスのgetter経由でprivateフィールドにアクセス
        System.out.println("氏名: " + getName()); 
        System.out.println("チーム: " + teamName);
        
        // protectedなフィールド 'hireDate' にアクセス
        // ManagerはEmployeeのサブクラスであり、'hireDate' はprotectedなので、
        // Managerクラスのインスタンス（this）から直接アクセスできます。
        System.out.println("マネージャーの採用日: " + hireDate); 
        
        // protectedなメソッド 'displayProtectedInfo()' を呼び出し
        // protectedなメソッドもサブクラスから呼び出し可能です。
        displayProtectedInfo(); 

        // 以下はアクセスできません (コンパイルエラーになる例)
        // System.out.println("給与: " + salary); // private なのでアクセス不可
        // System.out.println("部署: " + department); // default なので異なるパッケージからはアクセス不可
        // (注: ManagerがEmployeeと同じパッケージにあったら department にはアクセス可能です)
    }
}
```
**`Manager.java` の解説:**  
*   **継承と `protected` アクセス:**  
    `Manager` クラスは `Employee` クラスを `extends` キーワードで継承しています。  
    これにより、`Manager` は `Employee` のサブクラスとなります。  
    *   `hireDate` フィールドと `displayProtectedInfo()` メソッドは `Employee` クラスで `protected` として定義されています。  `Manager` は `Employee` のサブクラスであるため、異なるパッケージに属していても、自身のインスタンス（`this`）を通じてこれらの `protected` メンバーに直接アクセスできます。  
    *   ただし、`protected` アクセスはあくまで「サブクラスのインスタンス自身」に限定される点に注意が必要です。  
    例えば、`Manager` クラスの内部で、別の `Employee` 型のインスタンス（`Employee otherEmployee = new Employee(...)`）の `protected` メンバーにアクセスしようとするとコンパイルエラーになります。  
    この場合、`public` な Getter/Setter を介してアクセスする必要があります。  
*   **アクセスできない例:**  
    *   `salary` フィールドは `private` なので、サブクラスであっても直接アクセスすることはできません。  
    必ず `public` な `getSalary()` や `setSalary()` メソッドを介してアクセスする必要があります。  
    *   `department` フィールドは `default` (パッケージプライベート) なので、`Manager` クラスが `Employee` クラスとは異なるパッケージ（`com.example.hr.payroll` vs `com.example.hr.employee`）にあるため、直接アクセスすることはできません。  

#### 4.3 `HrApplication.java` (アプリケーション実行クラス)

メインメソッドを持ち、各アクセス修飾子の動作を確認します。  

```java showLineNumbers
// src/com/example/hr/app/HrApplication.java
package com.example.hr.app; // Employeeクラスとは異なるパッケージ

import com.example.hr.employee.Employee; // Employeeクラスをインポート
import com.example.hr.payroll.Manager; // Managerクラスをインポート
import java.time.LocalDate;

/**
 * カプセル化とアクセス修飾子のデモンストレーションを行うメインアプリケーションクラス。
 * 各修飾子に対するアクセス可否を確認します。
 */
public class HrApplication {
    public static void main(String[] args) {
        System.out.println("--- カプセル化とアクセス修飾子のデモンストレーション ---");

        // --- Employeeクラスのインスタンス生成 ---
        // コンストラクタはpublicなので、どこからでもインスタンス生成が可能です。
        Employee employee1 = new Employee(
            "山田 太郎",
            500000.0,
            "EMP001",
            "開発部",
            LocalDate.of(2020, 4, 1)
        );

        // --- public メンバーへのアクセス ---
        System.out.println("\n--- public メンバーへのアクセス ---");
        // publicなgetter経由でprivateフィールドの値を取得
        System.out.println("社員名 (public getter): " + employee1.getName());
        // publicフィールドに直接アクセス
        System.out.println("会社名 (public field): " + employee1.companyName);
        // publicメソッドの呼び出し
        employee1.displayPublicInfo(); 

        // --- private メンバーへのアクセス (不可) ---
        System.out.println("\n--- private メンバーへのアクセス (コンパイルエラーになる例) ---");
        // privateフィールドには外部から直接アクセスできません。
        // これらの行を有効にすると、コンパイルエラーが発生します。
        // employee1.salary = -100; // コンパイルエラー: salary has private access in Employee
        // System.out.println(employee1.password); // コンパイルエラー: password has private access in Employee
        // privateメソッドも外部から直接呼び出せません。
        // employee1.generatePayroll(); // コンパイルエラー: generatePayroll() has private access in Employee

        // Setterを通してprivateフィールドを変更 (バリデーションが機能する例)
        // publicなsetSalaryメソッド経由で、privateなsalaryフィールドを安全に更新します。
        employee1.setSalary(600000.0); // 成功: バリデーションが通過
        employee1.setSalary(-50000.0); // 失敗: バリデーションによりエラーメッセージが表示される
        System.out.println("現在の給与 (public getter): " + employee1.getSalary());

        // --- default (パッケージプライベート) メンバーへのアクセス ---
        System.out.println("\n--- default (パッケージプライベート) メンバーへのアクセス ---");
        // HrApplicationは com.example.hr.app パッケージに、Employeeは com.example.hr.employee パッケージにあります。
        // 両者は異なるパッケージなので、defaultメンバーにはアクセスできません。
        // これらの行を有効にすると、コンパイルエラーが発生します。
        // System.out.println("部署 (default field): " + employee1.department); // コンパイルエラー: department is not public in Employee; cannot be accessed from outside package
        // employee1.department = "経理部"; // コンパイルエラー
        // employee1.displayPackageInfo(); // コンパイルエラー: displayPackageInfo() is not public in Employee; cannot be accessed from outside package
        System.out.println("（注: HrApplicationがEmployeeと同じパッケージでないため、defaultメンバーにはアクセスできません。）");

        // --- protected メンバーへのアクセス (直接は不可) ---
        System.out.println("\n--- protected メンバーへのアクセス (直接は不可、サブクラス経由は可) ---");
        // protectedフィールド 'hireDate' は、同じパッケージまたはサブクラスからのみアクセス可能です。
        // HrApplicationはEmployeeのサブクラスではなく、かつ異なるパッケージなので、直接アクセスできません。
        // これらの行を有効にすると、コンパイルエラーが発生します。
        // System.out.println("採用日 (protected field): " + employee1.hireDate); // コンパイルエラー: hireDate has protected access in Employee
        // employee1.displayProtectedInfo(); // コンパイルエラー: displayProtectedInfo() has protected access in Employee
        System.out.println("（注: HrApplicationがEmployeeのサブクラスでないため、protectedメンバーには直接アクセスできません。）");

        // --- Managerクラス（サブクラス）によるprotectedメンバーへのアクセス ---
        System.out.println("\n--- Managerクラス（サブクラス）によるprotectedメンバーへのアクセス ---");
        // ManagerはEmployeeのサブクラスであり、異なるパッケージでもprotectedメンバーにアクセスできます。
        Manager manager1 = new Manager(
            "田中 花子",
            800000.0,
            "MGR001",
            "営業部",
            LocalDate.of(2018, 1, 15),
            "第一営業部"
        );
        // manager1.displayManagerInfo() メソッド内で、
        // Managerクラス自身が Employee の protected メンバー (hireDate, displayProtectedInfo()) にアクセスしています。
        manager1.displayManagerInfo(); 
        
        System.out.println("\n--- デモンストレーション終了 ---");
    }
}
```
**`HrApplication.java` の解説:**  
このクラスは、前述の `Employee` クラスと `Manager` クラスを利用して、各アクセス修飾子の振る舞いを実際に確認するためのものです。  

*   **`public` メンバーへのアクセス:**  
    `employee1.getName()` や `employee1.companyName`、`employee1.displayPublicInfo()` のように、`public` なフィールドやメソッドには、`HrApplication` クラスがどのパッケージにあっても問題なくアクセスできます。  
    これは、`public` が最もアクセス範囲が広いことを示しています。  

*   **`private` メンバーへのアクセス (コンパイルエラー):**  
    `employee1.salary = -100;` や `employee1.generatePayroll();` のように、`private` なフィールドやメソッドに外部から直接アクセスしようとすると、コンパイル時にエラーとなります。  
    これは、`private` なメンバーがそのクラスの内部からのみアクセス可能であるという厳格なルールによるものです。  
    代わりに`setSalary()` のような `public` なメソッドを通して、安全にデータを操作する必要があります。  

*   **`default` メンバーへのアクセス (コンパイルエラー):**  
    `Employee` クラスの `department` フィールドや `displayPackageInfo()` メソッドは `default` (パッケージプライベート) アクセスレベルです。  
    `Employee` は `com.example.hr.employee` パッケージに、`HrApplication` は `com.example.hr.app` パッケージに属しており、両者は異なるパッケージです。  
    そのため、`HrApplication` から `employee1.department` や `employee1.displayPackageInfo()` に直接アクセスしようとするとコンパイルエラーになります。  
    この制限は、特定の機能がそのパッケージ内でのみ利用されるべきであることを示唆します。  

*   **`protected` メンバーへのアクセス (コンパイルエラーとサブクラス経由):**  
    `Employee` クラスの `hireDate` フィールドや `displayProtectedInfo()` メソッドは `protected` アクセスレベルです。  
    `HrApplication` は `Employee` クラスのサブクラスではないため、異なるパッケージに位置するこれらの `protected` メンバーには直接アクセスできません。  
    これもコンパイルエラーとなります。  
    しかし、`Manager` クラスの例で示されているように、`Manager` は `Employee` のサブクラスであるため、たとえ異なるパッケージにあっても、**自身のインスタンスを通じて** `protected` な `hireDate` や `displayProtectedInfo()` にアクセスできることが確認できます。  
    これは `protected` の重要な特性であり、継承関係にあるクラス間での限定的な情報共有を可能にします。  

---

### まとめ

*   **カプセル化**は、データと操作をクラスにまとめ、内部実装を隠蔽するオブジェクト指向の重要な原則です。  
これにより、コードの保守性、再利用性、セキュリティなどが向上します。  
*   **アクセス修飾子** (`private`, `default`, `protected`, `public`) は、カプセル化を実現するための具体的な手段であり、クラス、フィールド、メソッド、コンストラクタなどへのアクセス範囲を制御します。  
*   これらの修飾子を適切に使い分けることで、クラスの設計意図を明確にし、意図しないアクセスを防ぎ、堅牢でメンテナンスしやすいシステムを構築することができます。  
