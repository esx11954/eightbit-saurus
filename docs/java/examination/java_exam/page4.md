---
sidebar_position: 4
---

# 4. 型変換

以下のJavaファイルを用意して下さい

```java showLineNumbers 
package javaB.parse;

import java.util.regex.Pattern;

class ParseJudge{
    String str;

    public ParseJudge(String str){
        this.str = str;
    }

    public boolean isNumber() {
        return Pattern.compile("^[0-9]+$").matcher(this.str).find();
    }

    public int getResult(){
        return Integer.parseInt(this.str) * Integer.parseInt(this.str);
    }
}
```


以下の要件を満たすようにプログラムに追記して下さい

- 実行時に1つのコマンドライン引数を受け取った場合、ParseJudgeクラスのインスタンスを生成する
- 受け取ったコマンドライン引数が数値に変換可能であれば、その値を2乗した値を出力する
- 数値に変換できなければ「数字を入力して下さい」と出力する

```java {6-7} showLineNumbers
package javaB.parse;

class Parse2{ // ParseJudgeクラスと連携
    public static void main(String[] args){
        if(args.length == 1){
            // ★ここに処理を記入
            
        }else if(args.length > 1){
            System.out.println("引数が多すぎます");
        }else{
            System.out.println("引数を入力してください");
        }
    }
}
```

