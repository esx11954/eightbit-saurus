---
sidebar_position: 5
---
# 外部ライブラリの利用
ここでは、実際に外部ライブラリをインストールし、利用する方法を解説します
今回は例として「NumPy」を利用し、配列の合計値を算出してみます

## 外部ライブラリのインストール

1. Visual Studio Codeを起動します

2. ターミナルを起動し、以下のコマンドを実行します

    ``` shell title="ターミナル"
    pip install NumPy
    ```

:::tip
- 外部ライブラリをインストールする場合は「pip」を利用します  
「pip」とは、Pythonのライブラリ管理システムです
- コマンドの実行でエラーが発生する場合は、講師を呼び出してください
:::

3. ターミナルにて「Successfully installed NumPy ... 」と表示され、インストールが完了します

## 外部ライブラリのインポート

1. インポートを行う「.py」ファイルの先頭で以下を記述します

``` Python title="main.py"
import numpy as np # 「NumPy」をインポート
```

2. 上記へ合計値の算出処理を追記します

``` Pyton title="main.py"
ary = np.array([[1, 2, 3],[4, 5, 6],[7, 8, 9]])

# 配列の要素の合計値を算出
result = np.sum(ary) # 記述パターン1
result2 = ary.sum()  # 記述パターン2

print(result)
print(result2)
```

3. 実行すると配列の要素の合計値(45)が表示されます
``` shell
C:\python>python main.py
45
45
```
