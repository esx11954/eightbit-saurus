---
sidebar_position: 9
---

# 9. ジェネリクス

以下のJavaファイルを用意して下さい

```java showLineNumbers 
package javaB.generics;

class GenericsDto{
    String name;
    int age;
    String gender;
    String favorite;

    public GenericsDto(String name, int age, String gender, String favorite){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.favorite = favorite;
    }

    public String getName(){
        return name;
    }
    public int getAge(){
        return age;
    }
    public String getGender(){
        return gender;
    }
    public String getFavorite(){
        return favorite;
    }
}
```

実行結果と同様になるように以下のプログラムに追記して下さい

```java {16-17,22-25} showLineNumbers 
package javaB.generics;

import java.util.*;

class GenericsMain{
    public static void main(String[] args){

        // ArrayListのジェネリクス
        ArrayList<GenericsDto> list = new ArrayList<GenericsDto>();

        list.add(new GenericsDto("田中", 31, "男", "ラーメン"));
        list.add(new GenericsDto("井田", 15, "女", "スイーツ"));
        list.add(new GenericsDto("佐藤", 56, "男", "焼きそば"));
        list.add(new GenericsDto("上田", 47, "女", "ピザ"));

        // ★listの全要素の全フィールドを出力して下さい


        // HashMapのジェネリクス
        HashMap<String, Integer> map = new HashMap<String, Integer>();

        // ★listに格納されたオブジェクトから「名前」、「年齢」をそれぞれキーと値として取り出し、mapに格納して下さい

        // ★keySet()でmapからそれぞれのキーを取得し、get()で値を出力して下さい

    }
}
```

#### 実行結果
```
> java javaB.generics.GenericsMain
名前...田中
年齢...31
性別...男
好物...ラーメン

名前...井田
年齢...15
性別...女
好物...スイーツ

名前...佐藤
年齢...56
性別...男
好物...焼きそば

名前...上田
年齢...47
性別...女
好物...ピザ

井田の年齢: 15
田中の年齢: 31
佐藤の年齢: 56
上田の年齢: 47
```

