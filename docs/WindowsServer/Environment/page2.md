---
sidebar_position: 2
---

# クライアント

構築したWindowsの役割や機能は、クライアントを介して動作を確認します  
以下の手順の従い、Windowsをインストールしたクライアント用の仮想マシンを構築しましょう  

<details>
    <summary>1. 仮想マシン作成</summary>
    <div>
### 1. 仮想マシン作成

[Windowsの構築](http://localhost:3000/eightbit-saurus/docs/Windows/%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89/page1#windowsos%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB) でダウンロードした **WindowsOSイメージファイル** を使用して
以下の仮想マシンを作成しましょう  

#### 仮想マシン作成画面
- 仮想マシン概要
    - 名前 → 任意
    - タイプ → Microsoft Windows
    - バージョン → Windows 11(64-bit)
- ハードウェアリソース
    - メモリ容量 → 4096MB
    - プロセッサー数 → 2
    - EFIを有効化(一部のOSのみ) → チェックを入れる
    - ディスクサイズ: 30GB

#### 仮想マシン設定画面

- Windowsの構築と同様の設定

</div>
</details>

<details>
    <summary>2. Windowsのインストール</summary>
    <div>
### 2. Windowsのインストール

予め作成した仮想マシンを起動しておきましょう  

**仮想マシン画面**

最初に以下の画面が表示されるので、一度画面をクリックし、`Enter` キーを押して下さい

![Windows](./img/install2.png)

**Windowsインストール画面**

1. しばらく待つと言語の選択画面が表示されます  
    理由がない限り設定を変更せず、`次へ` をクリック

    ![Windows](./img/client1.png)

2. こちらの画面も理由がない限り設定を変更せず、`次へ` をクリック
    ![Windows](./img/client2.png)

3. Windowsをセットアップ方法を選択する画面です  

    今回は **新規インストール** を実施するので  
    `Windows xx のインストール` を選択 > `I agree everything will...` にチェックを入れる > `次へ` をクリック  
    の順で操作

    ![Windows](./img/client3.png)

    :::note
    既にインストールされているWindowsに不具合がある場合は  
    `PC を修復する` を選択することで、修復を試みることができます  
    :::

4. この画面は、ソフトウェアライセンス条項の同意画面です  
    問題がなければ `同意する` をクリック  

    ![Windows](./img/client4.png)

5. Windows のインストール先を指定する画面です  
    理由がない限り変更はせず、 `次へ` をクリック

    ![Windows](./img/client5.png)

6. インストール前の確認画面です  
    問題がなければ、`インストール` をクリック

    ![Windows](./img/client6.png)

    インストールが開始されるので、完了するまで待ちます  
    ![Windows](./img/client7.png)

7. インストール完了後、初期設定ウィザードが開始します  
    `日本`を選択して、`はい` をクリック

    ![Windows](./img/client8.png)

8. `はい` をクリック

    ![Windows](./img/client9.png)

8. `スキップ` をクリック

    ![Windows](./img/client10.png)

8. `インターネットに接続していません` をクリック

    ![Windows](./img/client11.png)

9. ユーザの名前を入力(任意の名前で構いません)して `次へ` をクリック  
    ![Windows](./img/client12.png)

10. 任意のパスワードを入力して `次へ` をクリック

    ![Windows](./img/client13.png)


11. 次の画面でパスワードの再入力を求められるので、再度入力して `次へ` をクリック

    ![Windows](./img/client14.png)


12. ユーザへログイン不可能な場合に使用するセキュリティの質問を設定する画面です  
    任意の質問と回答を設定後、`次へ` をクリック  
    この操作を計3回実施してください

    ![Windows](./img/client15.png)

13. プライバシー設定画面です  
    今回は設定を変更しないので `次へ` を複数回クリックし、画面を進めて行きます  

    ![Windows](./img/client16.png)


14. 最後に `同意` をクリックし、セットアップが完了するまでしばらく待ちます  

    ![Windows](./img/client17.png)


以上でWindowsのインストールは完了です  

</div>
</details>


<details>
    <summary>3. 使用準備</summary>
    <div>

インストールが完了したWindowsは、画面左下に以下の画像のような表示がされる場合があります  

    ![Windows](./img/client18.png)

この場合、インターネットを介したライセンスの有効化がされていない状態です  
以下の指示に従って一時的にインターネットへ接続して、有効化を完了させましょう  

1. 仮想マシンを起動した状態で、上部のメニューから `デバイス` > `ネットワーク` > `ネットワーク設定` をクリック  

    ![Windows](./img/client19.png)

2. `名前` のドロップダウンリストを開き、`Intel(R) Wireless-AC 9560` を選択後、画面右下の `OK` をクリックして下さい

    ![Windows](./img/client20.png)

3. 5分程度すると、画面右下が以下の表示になります  

    ![Windows](./img/client21.png)

4. 最後に、再度ネットワークの設定画面を開いて
    `名前` のドロップダウンリストを **元の設定** に戻してください  

    ![Windows](./img/client22.png)



</div>
</details>