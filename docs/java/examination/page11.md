---
sidebar_position: 10
---

# 10. 例外処理

以下のJavaファイルを用意して下さい

```java showLineNumbers 
package javaB.exception;

class ThrowsException{
    public void parse(String i) throws Exception{
        System.out.println("引数を " + Integer.parseInt(i) + " に数値変換しました");
    }
}
```

実行結果と同様になるように以下のプログラムに追記して下さい

```java {5-6} showLineNumbers 
package javaB.exception;

class ThrowsMain{
    public static void main(String[] args){
        // ★以下に処理を追記

    }
}
```


#### 実行結果
```
> java javaB.exception.ThrowsMain 123
引数を 123 に数値変換しました
```

```
> java javaB.exception.ThrowsMain
引数を入力してください
```

```
> java javaB.exception.ThrowsMain test
test は数値に変換できませんでした
```

