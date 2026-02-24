---
sidebar_position: 10
---
# NAT DHCP SSH

![Topology](./img/sim_38_1.png)

### タスク

#### タスク1
事前定義された設定を使用して、R1上の NAT/PAT の設定を完了します。

**R1 事前定義された設定**
```
interface Ethernet0/0
 ip nat outside
interface Ethernet0/1
 ip nat inside
access-list 192 permit ip 192.168.0.0 0.0.3.255 any
```
* 192.168.0.0 ~ 3.255から、any (どこに対しても) IPトラフィックを許可する
* inside/outsideの関係から、PC1,2のIPアドレスをインターネットに抜けるときに変換するということ

<details>
<summary>タスク1の解答・解説を確認する</summary>

```
R1(config)#ip nat inside source list 192 interface e0/0 overload
```
* PAT : 複数の内部IPを1つの外部IPに変換する。NAPTと同義。
</details>

#### タスク2
次の情報を使用して、R1 および Sw1 で NTP を設定します。
- NTPサーバー：R1
- ソース：Loopback0 //R1の
- クライアント：Sw1

<details>
<summary>タスク2の解答・解説を確認する</summary>

**まずはLoopback0のIPアドレスを確認する**
```
R1#sh ip int brief
Interface    IP-Address      OK? Method Status  Protocol
Loopback0    209.165.202.134 YES manual up      up
```
* sh run で確認してもよい

**R1をNTPサーバーにする**
```
R1(config)#ntp master
R1(config)#ntp source Loopback0
```

**クライアント側も設定する (Sw1)**
```
Sw1(config)#ntp server 209.165.202.134
```

**セルフチェック (任意)** ※設定後、約1分待ってから
```
Sw1# show ntp status
Clock is synchronized, stratum 16, reference is 209.165.202.134
```
</details>

#### タスク3
R1にはDHCPプールと関連情報が事前に設定されています。PC1はIPアドレスを自動的に取得するように設定されています。Sw1 にリレー エージェントを設定します。

<details>
<summary>タスク3の解答・解説を確認する</summary>

```
Sw1(config)#interface e0/1
Sw1(config)#ip helper-address 172.16.0.9
```
**解説・注意点**
* リレーエージェント : 異なるネットワークのDHCPサーバーからIPアドレスを享受したいときに設定する。R1の内側（クライアントがいる方）に設定する。
* ちなみにこれはL3スイッチです（L2スイッチとアイコンが異なります）
</details>

#### タスク4
Sw1にはローカルユーザーとドメイン名が事前設定されています。Sw1でSSH設定を完了してください。
- RSAキー：2048ビット
- SSHバージョン：2

<details>
<summary>タスク4の解答・解説を確認する</summary>

```
Sw1(config)#crypto key generate rsa
% Do you really want to replace them? [yes/no]: y
How many bits in the modulus [512]: 2048

Sw1(config)#ip ssh version 2

Sw1(config)#line vty 0 15
Sw1(config-line)#transport input ssh
Sw1(config-line)#login local
Sw1(config-line)#exit
```
**解説・注意点**  
① ホストネーム：既にSw1と決まっているので設定不要  
② ドメイン：設定済みとのこと  
③ RSA鍵の作成：まだなので行う  
④ バージョン指定：本来任意ではあるが、本問では指定するよう指示されている  
⑤ ユーザーアカウントの設定：設定済みとのこと  
⑥ SSHを有効化：行う

**セルフチェック (任意)**
```
Sw1#shw run
...
hostname Sw1
...
username admin privilege 15 secret 5 $1$mERr$hfk3xUXxAyIp79uKzGksi1
```
</details>

#### 設定の保存
<details>
<summary>設定の保存を確認する</summary>

```
R1,Sw1 #copy run start
```
</details>
