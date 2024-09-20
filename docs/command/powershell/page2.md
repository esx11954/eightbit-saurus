---
sidebar_position: 1
---

# 基本コマンドレット

以下はPowerShellを利用する上での基本のコマンドレットです  
実際に実行して、動作を確認しましょう  

:::caution
コマンドレットを実行する前に、以下のコマンドレットを実行して作業用のディレクトリと学習環境を作成しましょう  

```powershell
New-Item -Type Directory C:\WorkSpace_PS
Write-Output "This is dummy text." > C:\WorkSpace_PS\sample.txt
Write-Output "command prompt" > C:\WorkSpace_PS\cmdlet.txt
```

上記で作成した **「WorkSpace_PS」ディレクトリ** を **カレントディレクトリに指定** しましょう

```powershell
Set-Location C:\WorkSpace_PS
```

以降コマンドレットを実行する時は、 **「WorkSpace_PS」ディレクトリ** をカレントディレクトリとしてください  

:::

## Get-ChildItem

カレントディレクトリ配下のファイルやディレクトリの一覧を表示します  

```powershell title="コマンドレット"
Get-ChildItem
```

<br />

# New-Item

指定したパスにディレクトリを新規作成します  

```powershell title="相対パスを利用し、カレントディレクトリへ 「relative」 ディレクトリを作成する "
New-Item -Type Directory relative
```

```powershell title="絶対パスを利用し、カレントディレクトリへ 「absolute」 ディレクトリを作成する "
New-Item -Type Directory C:\WorkSpace_PS\absolute
```

:::tip
コマンドレットを実行したら、既に学習したコマンドレットを駆使して必ず結果を確認しましょう  
確認方法が分からない場合は、講師へ連絡しましょう  
:::

<br />

# Copy-Item

指定されたファイルを、 **コピー先パス** へコピーできます  

```powershell title="「sample.txt」ファイルを「relative」ディレクトリ配下へコピーします"
Copy-Item .\sample.txt .\relative
```

**コピー先パス** へファイル名を指定することで、別名でのコピーができます  

```powershell title="「sample.txt」ファイルを「relative」ディレクトリ配下の「dummy.txt」という名前でコピーします"
Copy-Item .\sample.txt .\relative\dummy.txt
```

<br />

# Move-Item

指定されたファイルやディレクトリを、 **コピー先パス** へ移動できます  

```powershell title="「relative」ディレクトリを「absolute」ディレクトリ配下へコピーします"
Move-Item .\relative .\absolute
```

<br />

# Get-Content

指定されたファイルの内容を表示します  

```powershell title="カレントディレクトリ配下の「dummy.txt」の内容を表示します"
Get-Content sample.txt
```

<br />

# Write-Output

指定された文字列やコマンドレットの結果を出力します  

```powershell title="「こんにちわ」と表示します"
Write-Output "こんにちわ"
```

<br />

# Out-File

実行結果をファイル出力したいコマンドレットに対し、 `|`(パイプ) を利用して `Out-File`コマンドレットを記述することで  
コマンドレットの結果を指定したファイルへ出力することができます  

```powershell title="Get-ChildItemコマンドレットの結果を、「files.txt」へ出力します"
Get-ChildItem | Out-File files.txt
```

:::tip
`|`(パイプ) は、コマンドレットとコマンドレットを繋ぐ(パイプする)ことができる特殊な記号です  
これを利用することで、左辺に記述したコマンドレットの結果を  
右辺に記述したコマンドレットで処理することができます  

```powershell title="カレントディレクトリ配下一覧から「.txt」ファイルを抽出してファイルへ出力します"
Get-ChildItem | Out-String -Stream | Select-String -Pattern ".txt" | Out-File files2.txt
```
:::