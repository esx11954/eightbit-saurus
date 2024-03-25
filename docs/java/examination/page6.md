---
sidebar_position: 5
---

# 5. static修飾子

以下のJavaファイルを用意して下さい

```java showLineNumbers 
package javaB.staticMod;

class StaticMain{
    public static void main(String[] args){
        StaticClass.n1 = 5;

        StaticClass sc1 = new StaticClass();
        sc1.n2 = 8;

        System.out.println(sc1.multiply());

        StaticClass sc2 = new StaticClass();
        sc2.n2 = 10;

        System.out.println(sc2.multiply());
    }
}
```

以下の要件を満たすようにクラス内に追記して下さい

- StaticMainクラスのmainメソッド実行時にコンソールに40と50が出力されるように必要なメンバを定義する
- StaticClassクラスにmultiplyメソッドを用意する
- multiplyメソッドではクラス変数とインスタンス変数が持つ値を乗算した結果を戻り値として返却する


```java {4-5} showLineNumbers 
package javaB.staticMod;

class StaticClass{
    // ★ここに追記

}
```
