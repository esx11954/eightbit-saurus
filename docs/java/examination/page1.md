---
sidebar_position: 1
---

# 1. コマンドライン引数

画像の様な実行結果となるように以下のプログラムに追記して下さい

```java {7-8} showLineNumbers 
package javaB.argument;

class Args2{
    public static void main(String[] args){
        if(args.length > 0){
            String str = "";
            /* ★Args2.png の実行結果となるようにfor文でargsの中身を連結しましょう */

            System.out.println("引数として " + str + "を受け取りました");
        }else{
            System.out.println("引数を入力してください");
        }
    }
}
```

#### 実行結果
```
> java javaB.argument.Args2 aa aa aa
引数として aa aa aa を受け取りました

> java javaB.argument.Args2 aa aa aa bb bb bb
引数として aa aa aa bb bb bb を受け取りました
```
