---
sidebar_position: 11
---

# 10. VLAN間ルーティング

<details>
    <summary>概要</summary>
    <div>

## VLAN間ルーティングとは

VLAN間ルーティングとは、**論理的に分割された異なるVLAN**（＝異なるネットワークセグメント）間で、データ通信を可能にする技術です。

VLANは**ブロードキャストドメインを分割**しますが、その結果VLAN 10のPCはVLAN 20のPCに直接通信できません。  
異なるネットワーク間の通信にはL3デバイス（ルータ等）が必要となるため、そのルーティング機能を使ってVLANの境界を越えるのがVLAN間ルーティングです。

### 必要性

  * **スイッチ**（L2デバイス）は、同じブロードキャストドメイン内（同じVLAN内）でのみフレームを転送できます。
  * 異なるVLAN間での通信は、OSI参照モデルのレイヤ3（L3）機能である**ルーティング**を通じてのみ実現可能です。

-----

### 主要な仕組み

VLAN間ルーティングには、主に**ルーター・オン・ア・スティック**と**レイヤ3スイッチ**の2つの方法があります。

### 1. ルーター・オン・ア・スティック (Router-on-a-Stick)

最も基本的な方法で、**1台のルーターと1本の物理リンク**で複数のVLAN間のルーティングを処理します。

#### 仕組み

1.  ルーターの**物理インターフェース**を、スイッチの**トランクポート**に接続します。
2.  ルーターの物理インターフェース上に、**サブインターフェース**をVLANの数だけ作成します。（例: VLAN 10用に`Gi0/1.10`、VLAN 20用に`Gi0/1.20`）。
3.  各サブインターフェースに、対応するVLANの**デフォルトゲートウェイアドレス**を設定します。
4.  このサブインターフェースが**VLANのタグを識別・剥離**し、異なるVLAN間のパケットをルーティングします。

### 2. レイヤ3スイッチによるルーティング (SVI)

高性能な**レイヤ3スイッチ**（マルチレイヤスイッチとも呼ばれる）を使用する方法です。

#### 仕組み

1.  ルーターではなく、レイヤ3スイッチ自身がルーティング機能を持っています。
2.  スイッチ内に**SVI** (Switch Virtual Interface)と呼ばれる仮想インターフェースをVLANの数だけ作成します。（例: `interface vlan 10`、`interface vlan 20`）。
3.  各SVIに、対応するVLANの**デフォルトゲートウェイアドレス**を設定します。
4.  スイッチは、これらのSVI間（VLAN間）で高速な**ハードウェアベースのルーティング**を実行します。

-----

### ルーター・オン・ア・スティックで使用するコマンド

ルーターのサブインターフェースと、スイッチのトランクポートの設定が重要です。

### 1. スイッチ側の設定（トランクポートの確立）

ルーターと接続するポートをトランクモードに設定します。

```cli
Switch# configure terminal
Switch(config)# interface GigabitEthernet 0/1  // ルーターに接続するポート
Switch(config-if)# switchport mode trunk      // トランクモードに設定
Switch(config-if)# switchport trunk allowed vlan all // 全てのVLANの通過を許可
Switch(config-if)# end
```

### 2. ルーター側の設定（サブインターフェースの作成とIPアドレス設定）

ルーター上でVLAN IDと対応するサブインターフェースを作成し、IPアドレス（＝デフォルトゲートウェイ）を設定します。

| 設定項目 | VLAN 10 (192.168.10.0/24) | VLAN 20 (192.168.20.0/24) |
| :--- | :--- | :--- |
| **IPアドレス** | 192.168.10.1 (VLAN 10のGW) | 192.168.20.1 (VLAN 20のGW) |

```cli
Router# configure terminal
Router(config)# interface GigabitEthernet 0/0  // 物理インターフェースに入る
Router(config-if)# no ip address             // 物理I/FにはIPアドレスを設定しない
Router(config-if)# no shutdown
Router(config-if)# exit

// --- VLAN 10 用のサブインターフェース ---
Router(config)# interface GigabitEthernet 0/0.10
Router(config-subif)# encapsulation dot1Q 10 // 802.1Qタグ付け、VLAN ID 10を指定
Router(config-subif)# ip address 192.168.10.1 255.255.255.0 // デフォルトGWを設定
Router(config-subif)# no shutdown
Router(config-subif)# exit

// --- VLAN 20 用のサブインターフェース ---
Router(config)# interface GigabitEthernet 0/0.20
Router(config-subif)# encapsulation dot1Q 20 // 802.1Qタグ付け、VLAN ID 20を指定
Router(config-subif)# ip address 192.168.20.1 255.255.255.0 // デフォルトGWを設定
Router(config-subif)# no shutdown
Router(config-subif)# end
```

### 3. 確認コマンド

| コマンド | 目的 |
| :--- | :--- |
| `show ip interface brief` | ルーターの全インターフェース（サブインターフェース含む）の**IPアドレスとステータス**を確認する。 |
| `show interface [IF名]` | 特定のインターフェースの詳細、特に**802.1Qのカプセル化**が設定されているか確認する。 |

-----

## レイヤ3スイッチ/SVIで使用するコマンド

レイヤ3スイッチでVLAN間ルーティングを有効にするには、SVIの作成とルーティング機能の有効化が必要です。

```cli
Switch# configure terminal
Switch(config)# ip routing                 // (重要) ルーティング機能を有効化する
Switch(config)# interface vlan 10          // SVI (VLAN 10の仮想I/F) を作成
Switch(config-if)# ip address 192.168.10.1 255.255.255.0 // デフォルトGWを設定
Switch(config-if)# no shutdown
Switch(config-if)# exit

Switch(config)# interface vlan 20          // SVI (VLAN 20の仮想I/F) を作成
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# end
```

<iframe src="https://drive.google.com/file/d/1sACX2Mop_GQQox35_Lx-atvkkcqK3Z4b/preview" width="640" height="360" allow="fullscreen"></iframe>

　

    </div>
</details>

<details>
    <summary>構築課題</summary>
    <div>
|ゴール|VLAN間ルーティングでPC_A PC_Bのpingが成功するようにしましょう。|
|:--------:|:--------|
|提出物1|ping の結果を講師にSlackで送る|
|提出物2|名前を付けて保存「.pkt」のファイルを講師に送る|
|ポイント|L3Switchには、SVIを設定してください|
|構成図|![pkt](../foundation/Network/img/pkt6.jpg)|

:::caution
スイッチの型番はCatalyst2960です  
スイッチの設定は実務さながら、「設定用のPCを用意してコンソール接続」で設定ください
:::
    </div>
</details>