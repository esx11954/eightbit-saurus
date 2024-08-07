---
sidebar_position: 2
---

# 課題2-1 スクレイピング

#### 概要
気象庁のサーバにアクセスし、指定した年月の気象情報をスクレイピングします  
その後取得したデータをデータベースに格納するプログラムを作成します  
スクレイピング対象[**サンプルページ**](https://www.data.jma.go.jp/stats/etrn/view/daily_s1.php?prec_no=44&block_no=47662&year=2000&month=1&day=1&view=)

## 手順

必要な[**プロジェクト雛形をダウンロード**](./files/scraping_weather.zip)  
`db_setup.py` から必要なDB環境を構築  
`setup.py` から必要なモジュールをインストール  
その他モジュールの内容を確認する  
用意されたモジュールを使用して、`main.py` に記されたコメントをヒントにコアとなる処理を実装する  

## 実装フロー

ユーザから年、月それぞれのパラメータを受け取る  
パラメータを気象庁のURLに組み込んでリクエストし、レスポンスデータを取得する  
取得したデータをパースし、必要な情報をリストにまとめる  
DBに接続し、作成したテーブルにリストの要素をインサートする  


:::caution
### 注意点
一気に実装しようとせず、処理を部品化して考えましょう  
追記するのはmain.pyだけです
:::


