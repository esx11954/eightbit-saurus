---
sidebar_position: 1
---

# Network基礎


<details>
    <summary>導入</summary>
    <div>
## 環境確認

お使いのPCにPacketTracerというソフトウェアが入っているかどうかを確認して下さい  
画面下の検索窓に`packet tracer`と入力していただき、  
以下のソフトウェアが表示されればインストールされています

![pt](./img/pt_img.png)


もしインストールされていなければ以下のリンクの手順を参考にインストールして下さい

[パケットトレーサー インストール手順](https://infra-note.net/cisco-packet-tracer/#index_id1)

:::note
## ネットワークとは
一般的に「**網**」を意味する英単語が語源で、人やモノをつないで情報を互いに共有しあうためのものです
例えば、会社というネットワークでは、さまざまな部署が互いに情報を共有しあい、会社の利益を上げるという同じ目的のために用意されます

そしてIT業界においてネットワークとは、「**コンピューターネットワーク**」のことであり、ケーブルや通信経路を通して、**複数のコンピューターをつなげる技術**のことを指します


現在、私たちが当たり前のように使用しているPCやスマートフォンなどの通信端末も、このネットワークがないと成立しません
またメールやWebサイトの閲覧、SNSでのコミュニケーション、動画視聴、オンラインゲーム、ネットショッピングといったこともすべてネットワークでつながっているから行えるのようになっています
このようにネットワークは世界中のあらゆる場面で使用されています

## ネットワークが普及した背景
もともとコンピューターは単体で使う機器であり、高価だったことから一般層には普及していませんでした
しかし科学技術の発展に伴い、コンピューターがほかの機器と接続できるようになると、アメリカの大学や研究機関などが、ネットワークを利用するようになりました

そしてネットワークを介してPC間でメールでのコミュニケーションがとれるようになると、ネットワークの商用利用が進むようになります
さらにコンピューターの価格が安価になり、ブラウザが開発されると企業だけでなく個人でもネットワークを利用する人が増えるようになりました

その後ノートPCや携帯電話の登場、スマホやタブレットの普及によってネットワークは生活の中で当たり前の存在にまでなります
そして現在では、あらゆるシーンで必要不可欠な存在となり、電気、水道、ガスと同じインフラとして通信環境が整備されています
:::
    </div>
</details>

<details>
    <summary>IPアドレス計算問題</summary>
    <div>
### 1. 導入動画

[動画リンク](https://drive.google.com/drive/folders/1J0e65zstbx4Cv57UdoTMinEOOegeXnT8?usp=sharing)

上記のリンクの **第1章 LANテクノロジーから第4章 IPアドレッシング** までの動画を視聴して下さい  
視聴が完了したらら担当講師までお声がけいただき確認テストを実施してください

### 2. 確認テスト

以下のリンクをクリックし、課題用ファイルをダウンロードして下さい  

[計算問題リンク](./files/IPアドレス計算問題.pdf)  
[解答用紙リンク](./files/解答用紙.xlsx)

計算問題ファイルを見つつ課題に差し掛かったら解答用紙ファイルに回答を記入して下さい  
全ての回答が完了したら担当講師まで解答用紙ファイルをDMで送りましょう

:::caution
確認テストは質問をしていただいてもいいですし、調べながら回答しても大丈夫ですが、  
大事な内容なので全問正解するまで繰り返し実施します
:::


    </div>
</details>


<details>
    <summary>パケットトレーサー課題</summary>
    <div>

[動画リンク](https://drive.google.com/drive/folders/1J0e65zstbx4Cv57UdoTMinEOOegeXnT8?usp=sharing)

上記のリンクの続きから視聴して下さい  
5章(IPルーティング)まで終わったら、以下の課題に着手しましょう

<details>
    <summary>【課題1】</summary>
    <div>
|ゴール|PC間で通信ができること  |
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|構成図を解読して、配線・各機器の設定を行い、疎通確認をする|
|構成図|![pkt](./img/pkt1.jpg)|  

    </div>
</details>

<details>
    <summary>【課題2】</summary>
    <div>

|ゴール|すべてのコンピュータ間で通信ができること|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|構成図を解読して、配線・各機器の設定を行い、疎通確認をする|
|構成図|![pkt](./img/pkt2.jpg)|  

    </div>
</details>

<details>
    <summary>【課題3】</summary>
    <div>

|ゴール1|PCからwebサーバに通信ができること(webサーバからpingを送る必要はありません)|
|:--------:|:--------|
|ゴール2|各PCのブラウザからWebサーバにアクセスして「Webページ」が見れること|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|宛先が異なるネットワークの場合「とりあえずここに向かいましょう」という設定が必要|
|構成図|![pkt](./img/pkt3.jpg)|

    </div>
</details>

<details>
    <summary>【課題3-2】</summary>
    <div>

|ゴール1|指定したコンピュータ間で通信ができること(VLANは使用しません)|
|:--------:|:--------|
|ゴール2|指定したコンピュータには通信ができない事|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|サブネットマスクでどう表現するか|
|構成図|![pkt](./img/pkt3_2.png)|
    </div>
</details>

:::caution
### 課題4以降について

課題4から**ルータとスイッチ**のGUI操作を禁止します  
設定や確認はかならずコマンドで行いましょう  

※PCはこれまで通りGUI設定で問題ありません  
接続は以下のキャプチャのように**構築するネットワークとは関係ない**「作業用のPC」を準備していただき  
コンソールケーブルで直接つないでください  

||ポート名称|
|----|----|
|作業用PC|RS232|
|ルータ|console|

作業用PCのデスクトップから「ターミナル」を選択して接続していただくと、コマンドが入力できる状態になります

![pkt](./img/console.png)

:::

<details>
    <summary>【課題4】</summary>
    <div>

|ゴール1|すべてのコンピュータ間で通信ができること(ルータを含め)|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|スタティックルーティングの設定|
|構成図|![pkt](./img/pkt4.jpg)|

:::caution
今回、ダイナミックルーティングは使用しません  
ルータの設定は実務さながら、「設定用のPCを用意してコンソール接続」で設定ください
:::

    </div>
</details>


14章(VLAN間ルーティング)まで終わったら、以下の課題に着手しましょう


<details>
    <summary>【課題5】</summary>
    <div>

|ゴール1|同じvlan 同士のPCで、通信が出来ること。(違うvlanのPC同士では通信出来ないこと)|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|VLAN, Trunk Port|
|構成図|![pkt](./img/pkt5.png)|

:::caution
スイッチの型番はCatalyst2960です  
スイッチの設定は実務さながら、「設定用のPCを用意してコンソール接続」で設定ください
:::

    </div>
</details>



<details>
    <summary>【課題6】</summary>
    <div>

|ゴール|VLAN間ルーティングでPC_A PC_Bのpingが成功するようにしましょう。|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|L3Switchには、SVIを設定してください|
|構成図|![pkt](./img/pkt6.jpg)|

:::caution
スイッチの型番はCatalyst2960です  
スイッチの設定は実務さながら、「設定用のPCを用意してコンソール接続」で設定ください
:::

    </div>
</details>

    </div>
</details>