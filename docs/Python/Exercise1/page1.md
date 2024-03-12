---
sidebar_position: 1
---

# 課題1

## 【四則演算】

変数aとbを用意し、それぞれに10と2を代入してaとbの和，差，積，商を出力してください．  
例として和であれば、`a + b = 12`という形式でf文字列を使用して出力しましょう  

#### 期待する出力
```
a + b = 12
a - b = 8
a * b = 20
a / b = 5
```

## 【スライス】

変数に文字列'eightbit'を代入し，スライスを使用して'big'と出力してください．

#### 期待する出力
```
big
```

## 【文字列1】
```
Somebody might be calling my name, but I can't tell somewhere from here. 
I wish something interesting would happen sometime soon. 
Maybe then I could meet someone special and feel loved and needed.
```
上記の文字列を変数に代入し、「some」を「any」に変換して出力して下さい

#### 期待する出力
```
Anybody might be calling my name, but I can't tell anywhere from here. 
I wish anything interesting would happen anytime soon. 
Maybe then I could meet anyone special and feel loved and needed.
```

:::tip
### トリプルクォート
複数行に渡る文字列を変数に代入する場合は以下のようにトリプルクォートを使用します  
以下ではダブルクォートを使用していますが、シングルクォートでも同様に動作します

```python
variant = """
Somebody might be calling my name, but I can't tell somewhere from here. 
I wish something interesting would happen sometime soon. 
Maybe then I could meet someone special and feel loved and needed.
"""
```
:::

## 【文字列2】
変数に以下の文字列を代入して下さい
```
A feeling of uncertainty lingers. 
I can't tell where it's coming from, 
but I have a feeling something interesting is going to happen sometime soon. 
Maybe then I can meet someone special and feel loved and needed.
```

1. 上記文字列の長さ(文字数)を出力してください
2. 上記文字列の半角スペースを除いた長さ(文字数)を出力してください
3. 上記文字列を全て大文字に変換して出力してください
4. 上記文字列を全て小文字に変換して出力してください

## 【型の確認】

変数に以下のように代入したコードがあります．  
各変数の型を出力してください．出力形式は問いません．

```python
data1 = {'A':1, 'B':2}
data2 = "hoge"
data3 = {1,2,3,4,5}
data4 = (10, 20)
data5 = [1, 2, 3, 4, 5]
```

#### 期待する出力
```
`<class 'dict'> <class 'str'> <class 'set'>...`
```
