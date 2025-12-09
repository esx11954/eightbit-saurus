---
sidebar_position: 10
---

# 9. VLANスイッチング

<details>
    <summary>概要</summary>
    <div>

## VLANスイッチングとは

**VLAN**（Virtual Local Area Network：仮想LAN）とは、物理的に一つのスイッチに接続されていても、**論理的**(仮想的)にネットワークを分割する技術です。  
これはルーターなしでネットワークを細かく分けたり、セキュリティを向上させたりするために使用されます。

### VLANの目的

VLANの最大の目的は、**ブロードキャストドメインを分割する**ことです。

  * **ブロードキャスト**とは、ネットワーク内の全端末に一斉に送られるデータ（例：ARPリクエスト）です。
  * ブロードキャストパケットはネットワークの負荷を高め、セキュリティリスクにもなります。
  * VLANを導入するとスイッチが論理的に仕切られ、**ブロードキャストは同じVLAN内**でのみ転送されます。  
  これによりネットワークの効率とセキュリティが向上します。

-----

## 動作の仕組みとタグ付け

### ポートのモード

VLANトラフィックを扱うスイッチポートには、主に2つのモードがあります。

| モード | 役割 | 通過トラフィック | 接続先 |
| :--- | :--- | :--- | :--- |
| **アクセスポート**<br />(Access Port) | 端末を接続 | **単一のVLAN**の非タグ付きトラフィック | PC、サーバーなど |
| **トランクポート**<br />(Trunk Port) | スイッチ間を接続 | **複数のVLAN**のトラフィック | スイッチ、ルーターなど |

### トランキングとIEEE 802.1Q

複数のVLANのトラフィックを1本のケーブル（トランクポート）で転送するためには、そのデータが**どのVLANに属するか**を識別する仕組みが必要です。

  * **トランキング:** スイッチ間で複数のVLANのトラフィックを転送する技術。
  * **IEEE 802.1Q:** トランキングを実現するための世界標準規格。  
  データフレームに**VLAN ID**（タグ）を付与し、どのVLAN宛てかを識別します。

-----

### VLANの利点

1.  **セキュリティ向上:** 異なるVLAN間の通信は、特別な設定（ルーターによるルーティング）がない限り遮断されます。  
これにより部署間やゲストネットワーク間の分離が可能になり、セキュリティリスクが閉じ込められます。
2.  **柔軟な設計:** 物理的な配線を変えずに、部署の移動や組織変更に応じて論理的にネットワークを再構成できます。
3.  **パフォーマンス向上:** ブロードキャストの範囲を限定することでネットワーク全体の負荷が軽減され、パフォーマンスが安定します。

---

## よく使用するコマンド

Ciscoスイッチ（IOS）におけるVLAN設定は、主に以下の3つのステップで行います。

### VLANの作成と名前の定義

VLANを作成し、識別しやすいように名前を付けます。  
VLAN IDは通常、1〜4094の範囲で指定します。

| コマンド | 目的 |
| :--- | :--- |
| `configure terminal` | グローバル設定モードへ移行 |
| `vlan [VLAN ID]` | **指定したVLAN IDを作成**し、VLAN設定モードへ移行 |
| `name [VLAN名]` | 作成したVLANに名前を付ける |
| `exit` | グローバル設定モードに戻る |

:::tip **例:** VLAN ID 10 (部署A) を作成する

```
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name DEP-A
Switch(config-vlan)# exit
```
:::

### ポートへのVLANの割り当て

作成したVLANをアクセスポートまたはトランクポートとして、特定のインターフェースに割り当てます。

#### A. アクセスポートの設定

端末（PCなど）を接続するポートには、**単一のVLAN**を割り当てます。

| コマンド | 目的 |
| :--- | :--- |
| `interface [インターフェース名]` | 指定したインターフェース設定モードへ移行 |
| `switchport mode access` | ポートを**アクセスモード**（単一VLAN専用）に設定 |
| `switchport access vlan [VLAN ID]` | ポートに**所属させるVLAN**を指定 |

:::tip **例:** FastEthernet 0/1 ポートを VLAN 10 に所属させる

```
Switch(config)# interface FastEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# no shutdown
```
:::

#### B. トランクポートの設定

スイッチやルーターを接続するポートには、**複数のVLAN**を通すためのトランクモードを設定します。

| コマンド | 目的 |
| :--- | :--- |
| `interface [インターフェース名]` | 指定したインターフェース設定モードへ移行 |
| `switchport mode trunk` | ポートを**トランクモード**（複数VLAN許可）に設定 |
| `switchport trunk encapsulation dot1q` | **802.1Q**のタグ付けプロトコルを使用するよう設定（古いスイッチでのみ必要） |
| `switchport trunk allowed vlan [VLAN ID, ...]` | トランクを**通過させるVLAN**を指定（通常は全て許可） |

:::tip **例:** GigabitEthernet 0/2 ポートをトランクモードに設定し、VLAN 10と20のみ許可する

```
Switch(config)# interface GigabitEthernet 0/2
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# no shutdown
```
:::

### 設定の確認

設定が正しく行われたかを確認するために、以下の`show`コマンドを使用します。

| コマンド | 目的 |
| :--- | :--- |
| `show vlan brief` | **VLAN IDとVLAN名**、および**どのポートがどのVLANに所属しているか**を一覧で表示。**最も重要な確認コマンド**。 |
| `show interface [IF名] switchport` | 特定のポートの**詳細なスイッチポート設定**（アクセスVLAN、トランクモードなど）を表示。 |
| `show running-config` | 現在稼働中の**全ての設定**を表示し、設定内容を確認する。 |

:::tip **例:** 現在のVLANの割り当て状況を確認する

```
Switch# show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/1, Gi0/3, Gi0/4
10   DEP-A                            active    Fa0/1, Fa0/2
20   DEP-B                            active    Fa0/3, Fa0/4
```
:::

<iframe src="https://drive.google.com/file/d/1gyin02cmdjm-S4mE88VEkFsSqom69gbr/preview" width="640" height="360" allow="fullscreen"></iframe>

　

    </div>
</details>

<details>
    <summary>構築課題</summary>
    <div>
|ゴール1|同じvlan 同士のPCで、通信が出来ること。(違うvlanのPC同士では通信出来ないこと)|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|VLAN, Trunk Port|
|構成図|![pkt](../foundation/Network/img/pkt5.png)|

:::caution
スイッチの型番はCatalyst2960です  
スイッチの設定は実務さながら、「設定用のPCを用意してコンソール接続」で設定ください
:::
    </div>
</details>
