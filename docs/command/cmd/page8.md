---
sidebar_position: 7
---

# 課題② 制御コマンド

## 課題1
パス `C:\Windows\` に存在する各「.exe」ファイルの名前を、 `File: {名前}` といった形式で  
パス `C:\WorkSpace\memo\Exes.txt` へ全て出力するバッチを作成してください  

## 課題2
0から30までの偶数を全て出力するバッチを作成してください  

## 課題3
変数numA と 変数numB へ任意の値を代入し  
双方の値を大小比較した結果を、出力できるバッチを作成してください  

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

    以下の条件を満たすバッチを作成してください

    パス `%SystemRoot%\System32\Winevt\Logs\` に存在する、拡張子が `.evtx` のファイルを対象とします。

    対象ファイル名が
        - Application
        - System
        - Setup
        - Security

    の場合は、 `C:\WorkSpace\Logs\PC\` へコピーしてください  

    それ以外のファイルは `C:\WorkSpace\Logs\etc\` へコピーしてください

    </div>
</details>

<details>
    <summary>追加課題2</summary>
    <div>

    以下の条件を満たす **バッチを作成** してください

    - 追加課題1で作成した `C:\WorkSpace\Logs\` を `C:\WorkSpace\Backup\Logs` へ差分コピーする
    - 差分コピー処理後は拡張子が `.evtx` のファイルを `C:\WorkSpace\Logs\` 配下から 全て削除する
    - `C:\Windows\Logs` を `C:\WorkSpace\Backup\SystemLogs` へミラーリングする
    - 処理にあたり、必要なディレクトリが存在しない場合は作成処理を実施する

    </div>
</details>