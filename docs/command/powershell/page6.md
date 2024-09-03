---
sidebar_position: 5
---

# 制御コマンドレット

スクリプトでは、制御コマンドレットを利用することでより複雑な処理を実行することができます  

## 変数

変数とは、名前のついた箱のようなもので **文字列や数値を格納** することができます  
変数に格納した文字列や数値のことを **変数の値** と呼びます  

変数は `$変数名` といったように `$(ドル)`記号 を先頭に修飾することで表現できます  

```powershell title="変数「str1」に、文字列「これは文字列です」を格納する"
$str1 = "これは文字列です"
```

また、以下のように記述することで **変数の値** を取り出すことができます  

```powershell title="変数の値をWrite-Outputコマンドレットで表示"
$str1 = "これは文字列です"
Write-Output "output: $str1"
```

## for

特定のコマンドレットを繰り返し実行するには `for`コマンドレット を利用します  

```powershell title="forコマンドレットの構文"
for (<カウンタ変数> = <カウンタ変数の初期値>; <繰り返し条件>; <カウンタ変数のカウントアップ(ダウン)値>) {
    <コマンドレット>
}
```

:::tip
**カウンタ変数** とは、繰り返しの回数を記録する変数です  
`for`コマンドレットでは、1回繰り返すごとに `{カウンタ変数のカウントアップ数}` で指定した値をカウンタ変数でカウントアップ(ダウン)します  
:::

<details>
    <summary>使い方</summary>
    <div>

### 基本的な記法
以下の例では、  

    1. カウンタ変数の値が 指定した `初期値` から `繰り返し条件` が **否(False)** になるまでコマンドレットを繰り返す
    2.  1回繰り返すごとに カウンタ変数の値を `カウントアップ(ダウン)` する

といった繰り返しが実行されます  

- カウンタ変数: i
- カウンタ変数の初期値: 1
- 繰り返し条件: $i -le 5( `カウンタ変数i` の値が **`5`以下** であれば繰り返す)
- カウンタ変数のカウントアップ(ダウン)値: 1(1回の繰り返しで、カウンタ変数を `1` 加算する)

```powershell title="echoコマンドレットを、カウンタが1から5にカウントアップするまで繰り返します"
for ($i = 1; $i -le 5; $i++) {
    Write-Output "繰り返し回数: $i"
}
Read-Host
```
    </div>
</details>

## foreach

コマンドレットの結果等に対して、特定のコマンドレットを繰り返し実行するには `foreach`コマンドレット を利用します

```powershell title="foreachコマンドレットの構文"
foreach (<取り出し用変数> in <取り出し元>) {
  <コマンドレット>
}
```

<details>
    <summary>使い方</summary>
    <div>

### 基本的な記法
以下の例では、  

    1. `＜取り出し元＞` に指定した `NetIPConfiguration`コマンドレットの結果 から 1回の繰り返しごとに、**1行分のデータ** を取り出す  
    2. 取り出した **1行分のデータ** を 表示  

といった繰り返しが実行されます  

- 取り出し用変数: $res変数
- 取り出し元: NetIPConfiguration

```powershell title="NetIPConfigurationコマンドレット の結果から、1行ずつインターフェース名を表示します"
foreach ($res in NetIPConfiguration) {
# highlight-start
    Write-Output "$($res.InterfaceAlias)"
# highlight-end
}
Read-Host
```

:::tip
`取り出し用変数` に格納された **1行分のデータ** から 特定のデータのみを取り出すには `<変数>.<データ名>` と表記します  

つまり上記の例:`$($res.InterfaceAlias)` では `NetIPConfiguration`コマンドレット の結果 から `InterfaceAlias`データ のみを表示しています  

```powershell title="NetIPConfigurationコマンドレット を実行した結果"
# highlight-start
InterfaceAlias       : イーサネット 2
# highlight-end
InterfaceIndex       : 14
InterfaceDescription : VirtualBox Host-Only Ethernet Adapter
IPv4Address          : 192.168.56.1
IPv6DefaultGateway   :
IPv4DefaultGateway   :
DNSServer            : fec0:0:0:ffff::1

# highlight-start
InterfaceAlias       : Wi-Fi
# highlight-end
InterfaceIndex       : 12
InterfaceDescription : Intel(R) Wi-Fi 6E AX211 160MHz
NetProfile.Name      : eightbit-wifi-A

...以下省略...
```
:::
    </div>
</details>

## if

条件分岐と呼ばれ、指定した条件が **真(Ture)** であるか **否(False)** かで、それぞれ別のコマンドレットを実行することができます  

```powershell title="ifコマンドレットの構文"
if (<条件>) {
    <"真"の場合のコマンドレット>
} else (
    <"否"の場合のコマンドレット>
)
```


<details>
    <summary>使い方</summary>
    <div>

### 基本的な記法

以下のように記述することができます  

```powershell title="変数の値が [test] であるか否かで実行するコマンドレットを分けます"
$a = "test"
$b = "best"

# 変数aを判定
if ($a -eq "test") {
    Write-Output "aはtestです"
} else {
    Write-Output "aはtestではありません"
}

# 変数bを判定
if ($b -eq "test") {
    Write-Output "bはtestです"
} else {
    Write-Output "bはtestではありません"
}
Read-Host
```

:::tip
コマンドレットやスクリプトにおいて、 `#(シャープ)` と記述された以降の文字列は **コメント** として扱われ  
実行する際にコマンドレットや処理と見なされず、自由にメモ等を記載することができます
:::

<br />

### else if
また、指定した条件が **真** でない場合(**否** である場合)に、別の条件を指定して  
**真** であるか **否** かを判定することもできます  

```powershell title="変数の値が [test] であるか否かで実行するコマンドレットを分けます"
$a = "rest"
$b = "test"

# 変数aを判定、"真"でなければ変数bを判定
if ($a -eq "test") {
    Write-Output "aはtestです"
} elseif ($b -eq "test") {
    Write-Output "aはtestではなく、bはtestです"
} else {
    Write-Output "aとbはtestではありません"
}
Read-Host
```
    </div>
</details>