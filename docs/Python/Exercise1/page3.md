---
sidebar_position: 3
---

# 課題3

## 【正規表現】

:::caution
以下の問題は正規表現を使用して下さい  
なお、記号等の使用方法は[**こちら**](https://docs.python.org/ja/3/library/re.html)の公式リファレンスを参考にして下さい
:::

1. 文字列"This is a sample text with zip code: 100-0001 and 123-4567."から郵便番号のみをリストとして抽出して下さい  
2. 文字列"This is a sample    text."を空白文字で分割し、リストとして出力して下さい  
3. 引数に受け取った文字列の末尾が「.py」であればtrue, それ以外はfalseを返却する関数を作成してください  
4. 引数に受け取った文字列が以下の要件を満たす場合はtrue, それ以外はfalseを返却する関数を作成してください
    - 先頭がaで始まる
    - 末尾がzで終わる

5. 引数に受け取った文字列が以下の要件を満たす場合はtrue, それ以外はfalseを返却する関数を作成してください
    - 8文字以上
    - アルファベット大文字小文字どちらも含む
    - 数値を含む

## 【ファイル入出力】
```python
['The io module provides Python’s main facilities for dealing with various types of I/O.',
 'There are three main types of I/O: text I/O, binary I/O and raw I/O.',
 'These are generic categories, and various backing stores can be used for each of them.',
 'A concrete object belonging to any of these categories is called a file object.']
```

1. 上記のリストの全要素を新規ファイルに書き込み、「python_file_output.txt」というファイル名で保存して下さい

2. 上で作成したファイルを読み込み、「I/O」を「i/o」に置換して「python_file_replace.txt」というファイル名で保存して下さい

## 【例外処理】
1. 引数にファイル名を受取り、実行ファイルと同じ階層にあればそのファイルをコピーする関数を実装してください  
ただし、ファイルが見つからない場合は例外処理を用いて `'ファイルが見つかりません'` を出力して下さい  
捕捉する例外：**FileNotFoundError**

2. 引数に受け取った2つの値をそれぞれ変数a, bに代入し、a/bの計算結果を出力する関数を実装してください  
ただし，ゼロ除算が発生した場合は例外処理を用いて `'ゼロ除算が発生しました'` を出力してください  
また、正常に計算処理ができない場合は例外処理を用いて `'データ型の違いにより計算できません'` を出力してください  
捕捉する例外：**ZeroDivisionError**、**TypeError**

## 【可変長引数】
1. 任意個数の数値を受取り、それらを全て合計した数値を出力する関数calcを定義してください  

```python
# 例：
calc(1, 2, 3, 4, 5) # 実行結果：15      
calc(10, 20, 30) # 実行結果：60
``` 

## 【デコレータ】
1. 【例外処理】で作成したファイルをコピーし、例外処理用のデコレータを実装してください  
必要箇所を編集し、デコレータを付与した関数が同様に動作するかを確認してください  

2. 例外エラーオブジェクトが持つ具体的なエラーメッセージを、  
`YYYY-MM-DD:エラーメッセージ` という形式でログファイル(error.log)に出力(追記)するように修正してください


## 【オブジェクト】
以下のプログラムにおけるクラス定義部分を完成させください

```python
# クラス定義
class Dog:
    pass

dog_list = [Dog('Angela James', 'Max', 'Chihuahua', '2004-01-01', 20), 
            Dog('Rebecca Collins', 'Buddy', 'Toy Poodle', '2012-12-02', 12),
            Dog('Tamara Delgado', 'Oscar', 'Beagle', '2020-06-28', 4)]
# 出力処理
for dog_obj in dog_list:
    print(dog_obj.get_info())

```

#### 期待する出力
```
owner: Angela James
name: Max
breed: Chihuahua
birthday: 2004-01-01
age: 20

owner: Rebecca Collins
name: Buddy
breed: Toy Poodle
birthday: 2012-12-02
age: 12

owner: Tamara Delgado
name: Oscar
breed: Beagle
birthday: 2020-06-28
age: 4
```