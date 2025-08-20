# スレッドと並行処理  

## 1. はじめに  

現代のソフトウェアは、ユーザーインターフェースの応答性確保、大規模なデータ処理、ネットワーク通信など、同時に複数の処理を効率的に実行する能力が求められています。  
この「同時に複数の処理を実行する」ことを実現するための仕組みが「並行処理（Concurrency）」であり、Javaにおいてその中核を担うのが「スレッド（Thread）」です。  

### スレッドとは  

スレッドとは、プログラムの実行単位のことです。  
一つのプロセス（実行中のプログラム）は、通常、一つ以上のスレッドを持ちます。  
複数のスレッドが同時に動作することで、プログラムはより効率的に、そして応答性高くタスクをこなすことが可能になります。  

*   **シングルスレッド:** 一度に一つのタスクしか実行できない。  
*   **マルチスレッド:** 複数のタスクを同時に実行できる（厳密には、CPUコア数に応じて並列実行、または高速な切り替えによって並行実行）。  

### スレッドの必要性  

*   **ユーザーインターフェースの応答性向上:** 時間のかかる処理を別のスレッドで行い、UIスレッドがフリーズするのを防ぎます。  
*   **リソースの有効活用:** 複数のCPUコアを最大限に活用し、処理速度を向上させます。  
*   **複雑なタスクの分解:** 大きなタスクを小さなタスクに分割し、それぞれを独立したスレッドで実行することで、開発・保守を容易にします。  

## 2. スレッドの基本  

Javaにおいてスレッドを扱う基本的な方法は、主に2つあります。  

### 2.1. `Thread`クラスの継承  

`java.lang.Thread`クラスを継承し、`run()`メソッドをオーバーライドすることでスレッドを定義します。  

```java showLineNumbers
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("MyThreadが実行中です。");  
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // スレッドを開始
    }
}
```

**注意点:** Javaは単一継承であるため、既に別のクラスを継承している場合にはこの方法は使えません。  

### 2.2. `Runnable`インターフェースの実装（推奨）  

`java.lang.Runnable`インターフェースを実装し、`run()`メソッドをオーバーライドすることでスレッドの実行内容を定義します。  
この方法が推奨されるのは、Javaの単一継承の制約を受けないためです。  

```java showLineNumbers
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("MyRunnableが実行中です。");  
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        MyRunnable runnable = new MyRunnable();
        Thread thread = new Thread(runnable); // RunnableインスタンスをThreadに渡す
        thread.start(); // スレッドを開始
    }
}
```

Java 8以降では、ラムダ式を使用してさらに簡潔に記述できます。  

```java showLineNumbers
public class LambdaThreadExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("ラムダ式でスレッドが実行中です。");  
        });
        thread.start();
    }
}
```

### 2.3. スレッドの生成と実行のライフサイクル  

スレッドを定義したら、`Thread`インスタンスを作成し、`start()`メソッドを呼び出すことで実行を開始します。  
`start()`メソッドは新しいスレッドを作成し、そのスレッドで`run()`メソッドを呼び出します。  

スレッドは、その生存期間中にいくつかの状態を遷移します。  

| 状態名         | 説明                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------ |
| `NEW`          | スレッドが作成されたが、まだ `start()` メソッドが呼び出されていない状態。                                       |
| `RUNNABLE`     | Java仮想マシン内で実行可能な状態。  CPUが割り当てられるのを待っているか、既に実行されている状態。                |
| `BLOCKED`      | モニターロック（`synchronized`）を取得できずにブロックされている状態。                                         |
| `WAITING`      | 別のスレッドによる特定のアクション（例: `Object.wait()`, `Thread.join()` など）を無期限に待っている状態。          |
| `TIMED_WAITING`| 指定された待機時間（例: `Thread.sleep(long)`, `Object.wait(long)` など）が経過するか、通知を待っている状態。     |
| `TERMINATED`   | スレッドの実行が完了した状態。  `run()` メソッドの処理が終了したか、例外により終了した場合。                    |

## 3. スレッドの管理と制御  

スレッドの実行中に、その動作を制御するためのいくつかの便利なメソッドがあります。  

*   `Thread.sleep(long millis)`:  
    現在実行中のスレッドを、指定されたミリ秒間一時停止させます。  
    `InterruptedException`をスローする可能性があるので、適切な例外処理が必要です。  

    ```java showLineNumbers
    Thread thread = new Thread(() -> {
        try {
            System.out.println("5秒間スリープします。");  
            Thread.sleep(5000); // 5000ミリ秒 = 5秒
            System.out.println("スリープから復帰しました。");  
        } catch (InterruptedException e) {
            System.out.println("スレッドが中断されました。");  
            Thread.currentThread().interrupt(); // 中断状態を再設定
        }
    });
    thread.start();
    ```

*   `thread.join()`:  
    呼び出し元のスレッド（例: `main`スレッド）が、このメソッドを呼び出したスレッド（`thread`）の終了を待ちます。  
    指定されたスレッドが終了するまで、呼び出し元のスレッドは実行をブロックします。  

    ```java showLineNumbers
    Thread worker = new Thread(() -> {
        System.out.println("ワーカーが作業を開始します。");  
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("ワーカーが作業を終了しました。");  
    });

    worker.start();
    try {
        System.out.println("メインスレッドはワーカーの終了を待ちます。");  
        worker.join(); // workerスレッドの終了を待つ
        System.out.println("ワーカーが終了したので、メインスレッドが続行します。");  
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    ```

*   `thread.interrupt()`:  
    スレッドに対して割り込みを要求します。  
    スレッドが`sleep()`, `wait()`, `join()`などのブロックメソッドで待機している場合、`InterruptedException`をスローして待機を解除します。  
    スレッドがブロックされていない場合、中断状態フラグが設定されるだけです。  
    スレッドの`run()`メソッド内でこのフラグを定期的にチェックし、終了処理を行うことが推奨されます。  

    ```java showLineNumbers
    Thread interruptibleThread = new Thread(() -> {
        while (!Thread.currentThread().isInterrupted()) { // 中断フラグをチェック
            System.out.println("実行中...");  
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("割り込みによりスリープが解除されました。");  
                Thread.currentThread().interrupt(); // 中断状態を再設定し、ループを終了させる
            }
        }
        System.out.println("スレッドが終了します。");  
    });

    interruptibleThread.start();
    try {
        Thread.sleep(3500); // 3.5秒後に中断要求
        interruptibleThread.interrupt();
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    ```

*   **デーモンスレッド:**  
    JVM（Java仮想マシン）が、ユーザー定義の通常の（非デーモン）スレッドが一つも実行されていない場合に自動的に終了する特性を持つスレッドです。  
    バックグラウンド処理やガベージコレクションなど、アプリケーションの実行に直接関わらないタスクに適しています。  
    `thread.setDaemon(true)`を`start()`呼び出し前に設定することでデーモンスレッドになります。  

## 4. スレッドセーフティと同期  

複数のスレッドが同時に同じ共有リソース（変数、オブジェクトなど）にアクセスしようとすると、「競合状態（Race Condition）」が発生し、予期せぬ結果やデータの不整合を引き起こす可能性があります。  
これを防ぎ、複数のスレッドから共有リソースに安全にアクセスできるようにすることを「スレッドセーフティ（Thread Safety）」と呼びます。  

### 4.1. 共有リソースの問題  

例として、複数のスレッドが一つのカウンタを同時にインクリメントする場合を考えます。  

```java showLineNumbers
class Counter {
    private int count = 0;

    public void increment() {
        count++; // この操作は実際には「読み込み」「インクリメント」「書き込み」の3ステップ
    }

    public int getCount() {
        return count;
    }
}
```

複数のスレッドが`increment()`を同時に呼び出すと、期待する結果（例: 1000回のインクリメントで1000）が得られない可能性があります。  

### 4.2. 同期メカニズム  

Javaは、スレッドセーフなコードを書くためのさまざまな同期メカニズムを提供しています。  

#### 4.2.1. `synchronized`キーワード  

`synchronized`キーワードは、共有リソースへのアクセスを排他的に制御するための最も基本的なメカニズムです。  
メソッドまたはコードブロックに適用できます。  

*   **メソッド同期:**  
    メソッド全体を同期化します。  
    インスタンスメソッドの場合、そのインスタンスのロック（オブジェクトのモニター）を取得します。  
    スタティックメソッドの場合、そのクラスのClassオブジェクトのロックを取得します。  

    ```java showLineNumbers
    class SafeCounter {
        private int count = 0;

        public synchronized void increment() { // メソッド全体が同期化される
            count++;
        }

        public synchronized int getCount() {
            return count;
        }
    }
    ```

*   **ブロック同期:**  
    特定のコードブロックのみを同期化します。  
    ロックするオブジェクトを明示的に指定できます。  
    これにより、同期の範囲を最小限に抑え、並行性を高めることができます。  

    ```java showLineNumbers
    class SafeCounter {
        private int count = 0;
        private final Object lock = new Object(); // ロック用のオブジェクト

        public void increment() {
            synchronized (lock) { // ロックオブジェクトに対する排他制御
                count++;
            }
        }

        public int getCount() {
            synchronized (lock) {
                return count;
            }
        }
    }
    ```

#### 4.2.2. `java.util.concurrent.locks.Lock`インターフェース  

`synchronized`キーワードは便利ですが、より高度なロック制御（ロックの試行、タイムアウト付きのロック、条件変数など）が必要な場合、`Lock`インターフェース（代表的な実装は`ReentrantLock`）が利用されます。  

```java showLineNumbers
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class SafeCounterWithLock {
    private int count = 0;
    private final Lock lock = new ReentrantLock(); // Lockインスタンス

    public void increment() {
        lock.lock(); // ロックを取得
        try {
            count++;
        } finally {
            lock.unlock(); // 忘れずにロックを解放
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```

#### 4.2.3. `volatile`キーワード  

`volatile`キーワードは、変数の「可視性（Visibility）」を保証します。  
つまり、あるスレッドが`volatile`変数を変更した場合、その変更は他のすべてのスレッドからすぐに可視になります。  
これは、CPUキャッシュとメインメモリ間の同期を保証しますが、アトミックな操作（例: `i++`のような読み込み→変更→書き込みの複合操作）は保証しません。  

*   **用途:** 主に、複数のスレッドからアクセスされるが、読み書きが単一の操作で完了するフラグやステータス変数に使用されます。  

    ```java showLineNumbers
    class StatusFlag {
        private volatile boolean running = true; // running変数の変更が即座に他のスレッドに伝わる

        public void stop() {
            running = false;
        }

        public void runLoop() {
            while (running) {
                // 何らかの処理
            }
            System.out.println("ループが停止しました。");  
        }
    }
    ```

#### 4.2.4. `java.util.concurrent.atomic`パッケージ  

`AtomicInteger`, `AtomicLong`, `AtomicReference`などのクラスは、単一の変数に対してアトミックな操作（例えば、インクリメント、デクリメント、比較と交換（CAS: Compare-and-Swap））を提供します。  
これはロックを使用せずにスレッドセーフな操作を実現するため、`synchronized`よりもパフォーマンスが高い場合があります。  

```java showLineNumbers
import java.util.concurrent.atomic.AtomicInteger;

class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0); // AtomicIntegerを使用

    public void increment() {
        count.incrementAndGet(); // アトミックにインクリメント
    }

    public int getCount() {
        return count.get();
    }
}
```

#### 4.2.5. 同期メカニズムの比較  

| メカニズム           | 特徴                                                         | 用途                                                                    |
| :------------------- | :----------------------------------------------------------- | :---------------------------------------------------------------------- |
| `synchronized`       | JVMが管理する組み込みロック。自動的なロック解放。再入可能。    | シンプルな排他制御。小規模な同期処理、既存コードの修正。                 |
| `Lock` (例: `ReentrantLock`) | 明示的なロック/アンロック。柔軟な制御（タイムアウト、条件変数）。再入可能。 | 複雑なロック条件、複数のロック取得、ノンブロッキング処理。                |
| `volatile`           | 変数の「可視性」を保証。アトミック操作は保証しない。         | 複数のスレッドから参照される単一変数の最新値保証（フラグ、ステータス）。   |
| `Atomic`クラス       | 単一変数のアトミック操作。ロック不要で高いパフォーマンス。CAS利用。 | カウンタ、フラグなど、アトミックな更新が必要な単一変数の場合。            |

## 5. 並行処理API (`java.util.concurrent`)  

Java 5で導入された`java.util.concurrent`パッケージは、スレッドセーフなデータ構造や、スレッドの生成・管理を効率的に行うための高度なAPIを提供します。  

### 5.1. Executor Framework  

スレッドの生成や管理はコストがかかります。  
`Executor`フレームワークは、これらのタスクを抽象化し、スレッドプールを使ってスレッドの再利用を可能にすることで、オーバーヘッドを削減し、アプリケーションの安定性とパフォーマンスを向上させます。  

*   **`ExecutorService`**: スレッドを管理し、タスクを実行するためのインターフェース。  
*   **`ThreadPoolExecutor`**: `ExecutorService`の主要な実装。  
*   **`Executors`**: `ExecutorService`のインスタンスを簡単に作成するためのファクトリメソッドを提供します。  
    *   `Executors.newFixedThreadPool(int nThreads)`: 固定数のスレッドを持つプール。  
    *   `Executors.newCachedThreadPool()`: 必要に応じてスレッドを作成し、不要なスレッドは破棄する（キャッシュする）。  
    *   `Executors.newSingleThreadExecutor()`: 単一のスレッドでタスクを順次実行する。  

```java showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ExecutorExample {
    public static void main(String[] args) {
        // 2つのスレッドを持つ固定スレッドプールを作成
        ExecutorService executor = Executors.newFixedThreadPool(2);

        for (int i = 0; i < 5; i++) {
            final int taskId = i;
            executor.submit(() -> { // タスクをプールに投入
                System.out.println("タスク " + taskId + " がスレッド " + Thread.currentThread().getName() + " で実行中です。");  
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        executor.shutdown(); // 新しいタスクの受け入れを停止
        try {
            executor.awaitTermination(60, TimeUnit.SECONDS); // 全てのタスクが終了するのを待つ
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("全てのタスクが完了しました。");  
    }
}
```

### 5.2. `Callable`と`Future`  

`Runnable`インターフェースは値を返したり、チェック例外をスローしたりできません。  
`Callable`インターフェースは、これらの制約を克服し、タスクの実行結果を非同期に取得するための`Future`オブジェクトを返します。  

*   **`Callable<V>`**: `call()`メソッドを持ち、`V`型の値を返し、`Exception`をスローできます。  
*   **`Future<V>`**: `Callable`タスクの非同期な結果を表します。  
    *   `get()`: タスクが完了するまでブロックし、結果を取得します。  
    *   `isDone()`: タスクが完了したかどうかをチェックします。  
    *   `cancel()`: タスクの実行を取り消します。  

```java showLineNumbers
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class CallableFutureExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        // Callableタスクの定義
        Callable<Integer> task = () -> {
            System.out.println("計算を開始します...");  
            Thread.sleep(2000);
            return 123 + 456;
        };

        Future<Integer> future = executor.submit(task); // タスクを投入し、Futureを取得

        System.out.println("タスクの完了を待っています...");  
        // future.get()はタスクが完了するまでブロックする
        Integer result = future.get(); // 結果を取得
        System.out.println("計算結果: " + result);  

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
    }
}
```

### 5.3. 並行コレクション  

`java.util.concurrent`パッケージには、`ArrayList`や`HashMap`といった標準コレクションの代わりに、スレッドセーフで高性能な並行コレクションが提供されています。  
これらは内部的に適切な同期メカニズムを実装しており、手動で`synchronized`ブロックなどを使用する必要がありません。  

| コレクションタイプ   | 並行コレクションの例           | 特徴                                                      |
| :------------------- | :----------------------------- | :-------------------------------------------------------- |
| `List`               | `CopyOnWriteArrayList`         | 書き込み時に新しい配列を作成し、読み込みはロックなし。読み込みが多い場合に適する。 |
| `Map`                | `ConcurrentHashMap`            | 高い並行性を持つハッシュマップ。読み込みはロックなし、書き込みは部分的にロック。 |
| `Queue`              | `ConcurrentLinkedQueue`, `ArrayBlockingQueue` | スレッドセーフなキュー。メッセージキューなどに利用される。   |
| `Set`                | `ConcurrentHashMap.newKeySet()` | `ConcurrentHashMap`を利用したスレッドセーフなセット。      |

## 6. スレッド利用のベストプラクティスと注意点  

スレッドは強力ですが、不適切に扱うとデバッグが難しい問題を引き起こす可能性があります。  

*   **スレッドプールの活用:**  
    安易に新しいスレッドを作成せず、`Executor`フレームワークを使用してスレッドプールを管理することで、リソースの消費を抑え、パフォーマンスを向上させることができます。  

*   **デッドロック、ライブロック、スターベーションの回避:**  
    *   **デッドロック（Deadlock）:** 複数のスレッドがお互いに相手が保持するリソースの解放を待ち続け、結果としてどのスレッドも処理を進められなくなる状態。  
        *   **回避策:** ロックの取得順序を統一する、タイムアウト付きのロックを使用する、など。  
    *   **ライブロック（Livelock）:** スレッドがお互いにリソースを解放し合うが、常に衝突して処理が進まない状態。  
    まるで互いに道を譲り合っているかのように見えるが、どちらも進めない状態に似ています。  
    *   **スターベーション（Starvation）:** 特定のスレッドがリソースをなかなか獲得できず、実行が著しく遅延したり、停止したりする状態。  
    優先度の低いスレッドが常にリソースを獲得できない場合などに発生します。  

*   **共有リソースへのアクセスを最小限にする:**  
    スレッド間で共有される状態（共有リソース）をできるだけ減らすことで、同期の必要性を減らし、並行性を向上させることができます。  
    不変オブジェクト（Immutable Object）は、一度作成されたら変更されないため、スレッドセーフです。  

*   **スレッド内での例外処理:**  
    スレッド内で発生したチェックされない例外（`RuntimeException`など）は、そのスレッドを終了させてしまいますが、他のスレッドの実行には影響しません。  
    予期せぬスレッドの終了を防ぐため、タスクの`run()`や`call()`メソッド内では適切な例外処理を行うか、`Thread.UncaughtExceptionHandler`を設定することを検討してください。  

*   **スレッドの終了は`interrupt()`で:**  
    非推奨の`Thread.stop()`や`Thread.suspend()`, `Thread.resume()`メソッドは絶対に使用しないでください。  
    これらはデッドロックやデータの破壊を引き起こす可能性があるため、`interrupt()`メソッドと協調的な中断処理（`isInterrupted()`のチェックなど）を使用してください。  

## 7. まとめ  

Javaにおけるスレッドと並行処理は、現代の高性能なアプリケーション開発に不可欠な技術です。  

*   **スレッドの基本:** `Runnable`インターフェースを実装し、`Thread`クラスで実行するのが一般的です。  
*   **同期:** 共有リソースへの安全なアクセスを保証するため、`synchronized`、`Lock`、`volatile`、`Atomic`クラスなどのメカニズムを適切に使い分けます。  
*   **`java.util.concurrent`パッケージ:** `ExecutorService`、`Callable`、`Future`、並行コレクションなどを活用し、より効率的かつ安全に並行処理を実装します。  

スレッドを扱う際には、スレッドセーフティ、デッドロック、パフォーマンスなどの複雑な側面を理解し、適切な設計と実装を心がけることが重要です。  

---