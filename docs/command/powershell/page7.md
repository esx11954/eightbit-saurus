---
sidebar_position: 6
---

# 課題② 制御コマンド

## 課題1
パス `C:\Windows\` に存在するファイルとディレクトリの **ファイル名** を `File: {名前}` といった形式で  
パス `C:\WorkSpace_PS\memo\Exes.txt` へ全て出力するスクリプトを作成してください  

## 課題2
0から30までの偶数を全て出力するスクリプトを作成してください  

## 課題3
変数numA と 変数numB へ任意の値を代入し  
双方の値を大小比較した結果を、出力できるスクリプトを作成してください  

```title="numAの方が大きい場合 の出力"
numAよりnumBの方が大きい
```

```title="numBの方が大きい場合 の出力"
numBよりnumAの方が大きい
```

```title="同値の場合 の出力"
どちらも一緒！
```

<br />

## 追加課題
<details>
    <summary>追加課題1</summary>
    <div>

以下の条件を満たすスクリプトを作成してください

パス `%SystemRoot%\System32\Winevt\Logs\` に存在する、拡張子が `.evtx` のファイルを対象とします。

対象ファイル名が
    - Application
    - System
    - Setup
    - Security

の場合は、 `C:\WorkSpace_PS\Logs\PC\` へコピーしてください  

それ以外のファイルは `C:\WorkSpace_PS\Logs\etc\` へコピーしてください

    </div>
</details>