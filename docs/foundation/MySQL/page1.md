---
sidebar_position: 3
---

# MySQL基礎

本研修で使用する教材は全て動画コンテンツです  
インストールが完了したら以下リンクの動画教材に沿って学習を進めて下さい  

[動画教材リンク](https://www.youtube.com/playlist?list=PLWnJYgCgYpgBcMQZiZczXtXQnpzwE--TN)

動画の途中でMySQLのデータベース作成等の作業をする必要があり、  
Excelからファイルを出力したり「実運用SQL」というファイルの案内をしていますが、それらは無視して下さい  

MySQLにログインできたら以下のSQLをコピーして実行して下さい  

<details>
    <summary>DB作成クエリ</summary>
    <div>
```sql
create database mydb;

use mydb;

create table if not exists weather (
weather_id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
weather varchar(30)
);

INSERT INTO weather (weather) VALUES ('晴れ');
INSERT INTO weather (weather) VALUES ('雨');
INSERT INTO weather (weather) VALUES ('曇り');
INSERT INTO weather (weather) VALUES ('雪');
INSERT INTO weather (weather) VALUES ('みぞれ');

create table if not exists subject (
subject_id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
subject varchar(30)
);

INSERT INTO subject (subject) VALUES ('ビジネスマナー');
INSERT INTO subject (subject) VALUES ('Excel');
INSERT INTO subject (subject) VALUES ('Windows基本操作');
INSERT INTO subject (subject) VALUES ('インフラ・ネットワーク');
INSERT INTO subject (subject) VALUES ('ExcelVBA');
INSERT INTO subject (subject) VALUES ('Linux');
INSERT INTO subject (subject) VALUES ('MySQL');
INSERT INTO subject (subject) VALUES ('AWS');
INSERT INTO subject (subject) VALUES ('その他');

create table if not exists my_log (
id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
date date default (CURRENT_DATE),
weather_id int, 
wake_up_time time,
bedtime time,
study_hours float(2,1),
breakfast varchar(30),
dinner varchar(30),
foreign key (weather_id) REFERENCES weather(weather_id)
);

create table if not exists lesson_log (
date_group int,
subject_id int,
content varchar(100),
comprehension int,
foreign key (date_group) REFERENCES my_log(id),
foreign key (subject_id) REFERENCES subject(subject_id)
);

create table if not exists review (
date date default (CURRENT_DATE),
keyword varchar(100),
impression varchar(255),
notes varchar(255)
);

INSERT INTO my_log (date, weather_id, wake_up_time, bedtime, study_hours, breakfast, dinner) values 
('2022/12/01', 1, '08:30', '23:30', 2, 'オムレツ', 'グリルチキン'),
('2022/12/02', 3, '08:45', '23:30', 1, 'パンケーキ', 'ステーキ'),
('2022/12/05', 1, '08:30', '20:00', 0, 'フレンチトースト', 'シーフードパスタ'),
('2022/12/06', 3, '08:45', '23:30', 2, 'グラノーラとヨーグルト', 'カルボナーラ'),
('2022/12/07', 1, '08:30', '22:00', 1, 'ベーコンと卵サンドイッチ', 'サーモンのホイル焼き'),
('2022/12/08', 3, '08:45', '21:00', 0, 'スクランブルエッグ', '野菜炒め'),
('2022/12/09', 4, '06:45', '22:30', 2, 'アボカドトースト', 'ハンバーグ'),
('2022/12/12', 5, '07:00', '23:30', 1, 'フルーツサラダ', 'ポークチョップ'),
('2022/12/13', 1, '08:30', '22:00', 0, 'ハッシュドポテト', 'ローストビーフ'),
('2022/12/14', 3, '08:45', '23:30', 2, 'ホットケーキミックスで作るワッフル', 'シチュー'),
('2022/12/15', 1, '08:30', '23:45', 1, 'ヨーグルトパフェ', 'パエリア'),
('2022/12/16', 3, '09:30', '23:30', 0, 'シナモントースト', 'カレーライス'),
('2022/12/19', 2, '08:30', '21:45', 2, 'ベーコンとハムのキッシュ', '肉じゃが'),
('2022/12/20', 3, '08:15', '23:30', 1, 'スムージー', 'オムライス'),
('2022/12/21', 1, '08:30', '19:45', 0, '豆腐スクランブルエッグ', '餃子'),
('2022/12/22', 2, '08:45', '20:15', 2, 'フルーツスムージー', 'ナポリタン'),
('2022/12/23', 1, '08:30', '23:45', 1, 'ツナとアボカドのトースト', 'カポナータ');

INSERT INTO lesson_log (date_group, subject_id, content, comprehension) values 
(1, 1, '敬語尊敬語謙譲語', 80),
(1, 1, 'メールについて', 50),
(1, 3, 'タイピング', 60),
(2, 2, '関数', 90),
(2, 2, '条件付き書式', 80),
(2, 2, '校閲タブ', 50),
(3, 5, '文字列結合', 70),
(3, 5, '変数', 60),
(3, 5, 'if', 80),
(4, 5, 'selectcase', 50),
(4, 5, 'do', 70),
(4, 5, 'for', 60),
(5, 5, 'for each', 80),
(5, 5, 'function', 50),
(5, 5, 'call', 70),
(6, 5, '自習作成1', 60),
(6, 5, '自習作成2', 80),
(6, 5, '自習作成3', 50),
(7, 4, 'OSI参照モデル', 70),
(7, 4, 'TCP/IP', 60),
(7, 4, 'VLAN', 80),
(8, 4, 'スタティックルーティング', 50),
(8, 4, 'ダイナミックルーティング', 70),
(8, 4, 'RIP', 60),
(9, 4, 'OSPF', 80),
(9, 4, 'IPアドレス計算問題1', 50),
(9, 4, 'IPアドレス計算問題2', 70),
(10, 4, 'サブネットマスク', 60),
(10, 4, 'クラスアドレス', 80),
(10, 4, 'デフォルトゲートウェイ', 50),
(11, 4, 'Ethernet', 70),
(11, 4, 'ストレートケーブル', 60),
(11, 4, 'クロスケーブル', 80),
(12, 4, '構築課題1', 50),
(12, 4, '構築課題2', 70),
(12, 4, '構築課題3', 60),
(13, 6, 'virtualbox', 80),
(13, 6, 'ディストリビューション', 50),
(13, 6, 'カーネル', 70),
(14, 6, 'シェル', 60),
(14, 6, 'OSインストール', 80),
(14, 6, 'テラターム', 50),
(15, 6, 'SSH', 70),
(15, 6, 'cdコマンド', 60),
(15, 6, 'lsコマンド', 80),
(16, 6, 'mkdirコマンド', 50),
(16, 6, 'touchコマンド', 70),
(16, 6, 'viコマンド', 60),
(17, 6, '構築課題1', 80),
(17, 6, '構築課題2', 50),
(17, 6, '構築課題3', 70);

INSERT INTO review (date, keyword, impression, notes) values 
('2022/12/01', 'タイピング', '楽しかった', null),
('2022/12/02', '関数', '楽しかった', '体調が悪い'),
('2022/12/05', '変数', '楽しかった', null),
('2022/12/06', '条件文', 'できた', null),
('2022/12/07', 'function', '難しい', null),
('2022/12/08', 'プログラム', '楽しかった', '体調が悪い'),
('2022/12/09', '効率化', '楽しかった', null),
('2022/12/12', 'Cisco', '楽しかった', null),
('2022/12/13', 'IPアドレス', 'できた', null),
('2022/12/14', 'ping', '難しい', null),
('2022/12/15', 'ゲートウェイ', '楽しかった', null),
('2022/12/16', 'パケトレ', '楽しかった', null),
('2022/12/19', '課題', '楽しかった', null),
('2022/12/20', '構築', 'できた', null),
('2022/12/21', 'DNS', '難しい', '絶好調'),
('2022/12/22', 'サーバ', '難しい', null),
('2022/12/23', 'アパッチ', '難しい', null);

select * from my_log;
select * from lesson_log;
select * from review;
select * from subject;
select * from weather;

```
    </div>
</details>


動画内の講師と同じように、自分でもクエリを入力して実行結果を確認しながら視聴して下さい  
また特定動画終了後に課題を実施します  

下表の該当動画終了後、リンクにアクセスして実施してください  
:::caution
**Chromeでこのサイトを閲覧している方**  

**eightbit.tr9999@gmail.com**のアカウントでサインインしている場合、  
リンクを右クリックして`プライベートウィンドウでリンクを開く`をクリックして下さい  
共有アカウントなので、解答タイミングが被ると解答も共有されてしまいます
:::

|動画名|リンク|
|---|---|
|【演習】行の絞り込み|[【課題】行の絞り込み](https://forms.gle/zsfutYEHw9ZSqfKC6)|
|【演習】グループ化|[【課題】グループ化](https://forms.gle/FnFqYdAoBhF8WQiM9)|
|【演習】副問合せ|[【課題】副問合せ](https://forms.gle/pAKtJvThqiWJoP5d8)|

:::danger
課題で記入するクエリは、**実際に実行して動作したクエリ**をコピペして下さい
:::

### 課題の流れ
1. 該当動画まで視聴したら課題に着手する
2. フォーム画面から記入完了したら送信
3. 担当講師にDMで完了連絡を入れる
4. 担当講師から添削がある場合は**slackで**修正したクエリを送信する
5. 全ての修正が完了したら次の動画に進む


:::caution
課題ごとに確認しますので、slackで完了連絡をお願いします。  
:::

:::caution
### グループ化時のエラー
以下のようなエラーが出てくる原因について
```
ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'mydb.lesson_log.date_group' 
which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```
動画内のMySQLの**バージョンが5系**であることと  
皆さんのお使いの**バージョンが8系**であることによる違いにより発生します  
現状はあまり気にする必要はありません  
詳しく知りたい方は[公式リファレンス](https://dev.mysql.com/doc/refman/8.0/ja/group-by-handling.html)をご覧ください。 

:::

