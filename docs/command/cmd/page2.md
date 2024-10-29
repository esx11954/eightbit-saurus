---
sidebar_position: 1
---

# 基本コマンド

以下はコマンドプロンプトを利用する上での基本のコマンドです  
実際に実行して、動作を確認しましょう  

:::caution
コマンドを実行する前に、以下のコマンドを実行して作業用のディレクトリと学習環境を作成しましょう  

```powershell
mkdir C:\WorkSpace
cd C:\WorkSpace
echo "This is dummy text." > C:\WorkSpace\sample.txt
echo "command prompt" > C:\WorkSpace\cmd.txt
```

上記で作成した **「WorkSpace」ディレクトリ** を **カレントディレクトリに指定** しましょう

```powershell
cd C:\WorkSpace
```

以降コマンドを実行する時は、 **「WorkSpace」ディレクトリ** をカレントディレクトリとしてください  

:::

## dir

カレントディレクトリ配下のファイルやディレクトリの一覧を表示します  

```powershell title="コマンド"
dir
```

<br />

# mkdir

指定したパスにディレクトリを新規作成します  

```powershell title="相対パスを利用し、カレントディレクトリへ 「relative」 ディレクトリを作成する "
mkdir relative
```

```powershell title="絶対パスを利用し、カレントディレクトリへ 「absolute」 ディレクトリを作成する "
mkdir C:\WorkSpace\absolute
```

:::tip
コマンドを実行したら、既に学習したコマンドを駆使して必ず結果を確認しましょう  
確認方法が分からない場合は、講師へ連絡しましょう  
:::

<br />

# copy

指定された *ファイル* を、 **コピー先パス** へコピーできます  

```powershell title="「sample.txt」ファイルを「relative」ディレクトリ配下へコピーします"
copy .\sample.txt .\relative
```

**コピー先パス** へファイル名を指定することで、別名でのコピーができます  

```powershell title="「sample.txt」ファイルを「relative」ディレクトリ配下の「dummy.txt」という名前でコピーします"
copy .\sample.txt .\relative\dummy.txt
```

<br />

# move

指定されたファイルやディレクトリを、 **コピー先パス** へ移動できます  

```powershell title="「relative」ディレクトリを「absolute」ディレクトリ配下へコピーします"
move .\relative .\absolute
```

<br />

# type

指定されたファイルの内容を表示します  

```powershell title="カレントディレクトリ配下の「dummy.txt」の内容を表示します"
type sample.txt
```

<br />

# echo

指定された文字列やコマンドの結果を出力します  

```powershell title="「こんにちわ」と表示します"
echo "こんにちわ"
```