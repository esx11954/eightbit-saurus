---
sidebar_position: 3
---

# 3. 正規表現


## 問題1
以下の要件を満たすようにプログラムに追記して下さい
- 実行時引数に渡した値が電話番号(例：123-4567-8910)形式であれば「~(受け取った引数) は電話番号です」と出力する
- 実行時引数に渡した値が電話番号以外の場合、「~(受け取った引数) は電話番号ではありません」と出力する
- 正規表現を使用する

```java {14-15} showLineNumbers 
package javaB.regex;

import java.util.regex.Pattern;

class RegularEx1{
    public static void main(String[] args){
        String phone = "";
        if(args.length > 0){
            phone = args[0];
        }else{
            System.out.println("引数を入力してください");
            return;
        }
        /* 受け取った文字列が電話番号かどうか判定 */

    }
}
```

## 問題2
以下の要件を満たすようにプログラムに追記して下さい
- 実行時 `Scanner` クラスを使用してユーザからの入力を受け取る
- 受け取った値が数値の場合、「~(受け取った値) は数値です」と出力する
- 受け取った値が数値以外の場合、「~(受け取った値) は数値ではありません」と出力する
- 正規表現を使用する

```java {9-10,14-15} showLineNumbers 
package javaB.regex;

import java.util.regex.Pattern;
import java.util.Scanner;

class RegularEx2{
    public static void main(String[] args){
        System.out.print("入力してください > ");
        /* ユーザからの入力を受け取る */

        // 改行
        System.out.println();

        /* 受け取った文字列が数字かどうか判定 */

    }
}
```