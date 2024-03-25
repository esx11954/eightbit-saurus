---
sidebar_position: 8
---

# 8. コレクション

## 問題1

実行結果と同様になるように以下のプログラムに追記して下さい

```java {16-22} showLineNumbers 
package javaB.collection.arrayList;

import java.util.ArrayList;

class ArrayListSample{
    public static void main(String[] args){
        ArrayList list = new ArrayList();

        // リストに数値をラッパークラスに型変換して追加
        list.add(Integer.valueOf(1));
        list.add(Integer.valueOf(2));
        list.add(Integer.valueOf(3));
        list.add(Integer.valueOf(4));
        list.add(Integer.valueOf(5));

        // ★listの3番目の要素を出力して下さい

        // ★listの1番目の要素を削除して下さい

        // ★listの要素数を出力して下さい

        // ★list内の要素の合計値を出力して下さい
    }
}
```

#### 実行結果
```
> java javaB.collection.arrayList.ArrayListSample
3
4
14
```

## 問題2

実行結果と同様になるように以下のプログラムに追記して下さい

```java {9-21} showLineNumbers 
package javaB.collection.hashMap;

import java.util.HashMap;

class HashMapSample{
    public static void main(String[] args){
        HashMap map = new HashMap();

        // ★キーを「会社名」、値を自身が所属する会社名としてmapに追加して下さい

        // ★キーを「所属」、値を自身が所属する部署としてmapに追加して下さい

        // ★上記の要素をそれぞれキーで取得し、出力して下さい

        // ★会社名の値を英語表記に変更して下さい

        // ★「所属」キーの要素を削除して下さい

        // ★新たなキー「ID」と任意の値(数値)をmapに追加して下さい

        // ★全てのキーと値のセットを取得して出力して下さい
    }
}
```

#### 実行結果
```
> java javaB.collection.hashMap.HashMapSample
エイトビット株式会社
営業部
会社名：EIGHTBITCo.,Ltd.
ID：1234
```
