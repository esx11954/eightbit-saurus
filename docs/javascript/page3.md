---
sidebar_position: 3
---

# DOM

## DOMとは
WebページはHTMLとCSSで構成されています  
ブラウザは、Webページを表示する際にそれらを __DOM(Document Object Model)__ へと変換します  

JavaScriptでは、このDOMを操作することで前述のようにWebページを変化させることができます  

### DOMの構造
DOMはHTMLをツリー(木)構造で表現したものになっています  
この構造のことを __DOMツリー__ と呼びます  

```html title="HTML"
<html>
    <head>
        <title>practice page</title>
    </head>

    <body>
        <div>
            <p>Welcome!!</p>
        </div>
    </body>
</html>
```

上記のようなHTMLの場合、DOMツリーは以下になります  



## 準備
DOMについて解説する前に、Webページを準備します  
以下の手順でWebページを作成してください  

<details>
<summary>Webページ 作成手順</summary>

1. 作業用フォルダ「C:\web\practice」を新規作成します  
中間のフォルダが存在しない場合は、同様に新規作成してください

2. 「practice」フォルダに以下のファイルを作成しましょう

```html title="index.html"
<html>
    <head>
        <title>practice page</title>
        <style link="./style.css" >
    </head>

    <body>
        <p class="p-big">Welcome!!</p>

        <div id="tb-area">
            <table>
                <thead>
                    <th>No</th>
                    <th>Corp</th>
                </thead>
                </tbody>
                    <tr>
                        <td>1</td>
                        <td>Google</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>App;e</td>
                    </tr>
            </table>
        </div>
    </body>
</html>
```
```css title="style.css"
.p-big{
    font-weight: bold;
    font-size: 50px;
}
```  

</details>

## DOMの確認
DOMは、ブラウザに搭載されている __開発者ツール__ を利用することで確認できます  
[準備]の項で作成したWebページのDOMを実際に確認してみましょう  

1. 作成した「index.html」をブラウザで開きます  

2. 「F12」キーを押して __開発者ツール__ を表示します  
:::tip
ChromeやEdgeでは、「F12」キーを押すことで __開発者ツール__ が開きます  
開発者ツールでは、DOM確認の他にも作成したHTMLやCSSのデバッグを行うこともできます  
とても有用なツールなので、Webページを開発する際は活用していきましょう

開発者ツールの利用方法は以下のリファレンスを参考にしましょう  
[ブラウザーの開発者ツールとは](https://developer.mozilla.org/ja/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)
:::


3. [Elements]タブ(もしくは[要素]タブ)を選択することで、「index.html」のDOMが確認できます  
![js](./images/practice_dom.png)