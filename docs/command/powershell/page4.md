---
sidebar_position: 3
---

# スクリプト

スクリプトは、PowerShellで実行できるコマンドレットの集まりを、`.ps1`ファイル にまとめたものです  
これを実行することでコマンドレットを一括実行することができます  


:::caution
**スクリプト(.ps1)** は通常、初期設定では起動することができません  
エラーが発生し、スクリプトが実行できない場合は以下のコマンドレットを実行しましょう  
```powershell title=""
Set-ExecutionPolicy RemoteSigned
```

コマンドレットを実行したら、再度スクリプトを起動してください
:::

## 作成

スクリプトには、コマンドレットを組み合わせて一連の処理を記述することができます  
実際に作成してみましょう  


```powershell title="「C:\WorkSpace_PS\」へ以下の内容のファイル「test.bat」を作成します"
Set-Location C:\WorkSpace_PS
Get-ChildItem
Get-Content sample.txt
Read-Host
```

上記のスクリプトをエクスプローラー上から右クリック > `PowerShellで実行` をクリック

    1. 指定したフォルダに移動
    2. ファイルのリストを表示
    3. 任意のテキストファイルを開く

といった処理が実行されます  

### Read-Host

`Read-Host`を記述すると、ユーザが何かしらの入力を実施するまで、その行で一旦処理を待機させることができます  

通常、スクリプトの処理が全て完了すると自動でPowerShell画面が終了されますが  
処理の最後で `Read-Host` を記述することでPowerShell画面は閉じず、待機することができます  

```powershell title="例"

Write-Output  "スクリプトを実行しました"
Read-Host please input any key...

```

:::tip
バッチでは、コマンドを実行するとコマンド入力行が表示されるため、非表示としたい場合は `@echo off` を記述する必要があります  
一方PowerShellは、初期設定で同等の機能が有効となっており、コマンド入力行が表示されません
:::