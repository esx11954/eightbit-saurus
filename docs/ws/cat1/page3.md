# Hyper-VにクライアントOSをインストール

AD DSの動作検証のため、クライアント端末が必要になります。  
基本的にはWindows ServerOSのインストールと同じ流れですが、以下を参照してインストールしましょう。


## Windows11 評価版の入手
***
以下リンクをクリックしてWindows11（評価版）のiSOファイルをダウンロードしてください。  
※ダウンロードしたiSOファイルは開く事が出来ません。  

[Windows11(評価版) ISOファイルダウンロード](https://go.microsoft.com/fwlink/?linkid=2288286&clcid=0x411&culture=ja-jp&country=jp)


## インストール時の注意
---

各OSにはシステム要件というものが指定されています。  
システム要件とは、該当OSを動作させるためのハードウェアにおける最小要件のことです。  
以下を閲覧し、それを満たすように仮想マシンを作成して下さい。

[Windows11 システム要件](https://www.microsoft.com/ja-jp/windows/windows-11-specifications?r=1)

:::caution
最初にWindows Serverを構築した際に作成した仮想スイッチを選択して下さい。  
仮想スイッチを新たに作成する必要はありません。

:::

## ドメイン参加
---
クライアントは構築しただけではドメインに参加しません。    
ドメインに参加するには様々な手法がありますが、今回はクライアントPCから操作してドメインに参加します。  
以下の手順を参考にドメインに参加させて下さい。

[ドメイン参加方法](https://learn.microsoft.com/ja-jp/windows-server/identity/ad-ds/manage/join-computer-to-domain?tabs=cmd&pivots=windows-client-11)

