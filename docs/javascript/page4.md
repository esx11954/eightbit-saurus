---
sidebar_position: 4
---

# DOM操作
DOMについて学習できたところで、JavaScriptを実際に動作させてみましょう

## 準備

### jsファイルの作成
JavaScriptはjsファイルと呼ばれる、「.js」のファイルへ記述します  
作業用フォルダ「C:\web\practice」へ「js」フォルダを作成し、以下のファイルを新規作成しましょう
```js title="script.js"
// 「追加」ボタンをクリックしたときのイベント
function btnAddClick(){
    // id属性が「tb-body」となっているノードを取得
    const tbBody = document.getElementById('tb-body');
    // trのノードを新規作成
    const tr = document.createElement('tr');

    // tdのノードを新規作成
    const tdNo = document.createElement('td');    // No列
    const tdCorp = document.createElement('td');  // Corp列

    // tdの内容を設定
    tdNo.innerText = '3';
    tdCorp.innerText = 'Microsoft';

    // trに子ノードとして、tdを追加
    tr.appendChild(tdNo);
    tr.appendChild(tdCorp);
    // tbBodyに子ノードとして、trを追加
    tbBody.appendChild(tr);

    document.getElementById('txt-add-name').value = '';
}

// Webページの読み込み時に実行されるロードイベント
window.onload = function(){
    // id属性が「btn_add」となっているノードを取得
    const button = document.getElementById('btn-add');
    // ノードをクリックした時に、「btnAddClick」関数を呼び出すイベントを設定する
    button.setAttribute('onclick', 'btnAddClick()');
}
```

### jsファイルの読み込み
作成した「js」ファイルは、そのままでは実行することができません  
htmlファイルへ読み込み処理を記述する必要があります  

「index.html」のheadタグ内に以下の記述を追記しましょう
```html title=index.html
<script src="./js/script.js"></script>
```

## JavaScirptの実行
では、実際にJavaScriptを実行してみましょう  

1. 「index.html」を再びブラウザで開きます  
既に開いている場合は、Webページを「F5」キーで更新しましょう

![js](./images/run_js.png)

2. 「追加」ボタンをクリックします
JavaScriptが実行され、テーブルのDOMが操作されます 
