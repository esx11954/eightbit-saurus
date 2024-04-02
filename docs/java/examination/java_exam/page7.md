---
sidebar_position: 6
---

# 6. final修飾子

画像の様な実行結果となるように以下のプログラムに追記して下さい

```java showLineNumbers 
package javaB.finalMod;

class FinalMain{
    public static void main(String[] args){
        System.out.println(FinalDefine.CO_NAME + " の住所は " + FinalDefine.CO_ADDRESS + " です");
        System.out.println(FinalDefine.CO_NAME + " の社長は " + FinalDefine.CO_CEO + " です");
    }
}
```

以下の要件を満たすようにクラス内に追記して下さい

- FinalMainクラスのmainメソッド実行時にご自身が所属する会社名、住所、社長の名前が表示される
- FinalDefineクラスに定義する変数は `final` 修飾子を付与する

```java {4-5} showLineNumbers 
package javaB.finalMod;

class FinalDefine{
    // ★ここに追記

}
```

