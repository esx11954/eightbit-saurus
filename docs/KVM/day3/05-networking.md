---
id: networking
title: 仮想ネットワーク
sidebar_position: 5
---

# 仮想ネットワーク

## 仮想ネットワークの基本概念

KVM/libvirtではソフトウェアで仮想的なネットワーク機器を作成します。

```mermaid
block-beta
  columns 1

  block:components["仮想ネットワークの構成要素"]:1
    columns 3
    vnic["仮想NIC<br/>（vNIC）<br/>VMに接続される<br/>仮想的なネットワークカード"]
    vswitch["仮想スイッチ<br/>（Linux Bridge）<br/>VMどうし・VMとホストを<br/>接続するL2スイッチ"]
    vnet["仮想ネットワーク<br/>（libvirt管理）<br/>NAT / ブリッジなどの<br/>ネットワーク構成を定義"]
  end
```

libvirtが管理するネットワークモデルは主に **NAT** と **ブリッジ** の2種類があります。

## NATネットワーク

libvirtのデフォルトネットワーク（`default`）はNATモードで動作します。ホストOSがルーターとなり、VMはホストを介して外部と通信します。

```mermaid
flowchart TB
    internet["インターネット / 外部ネットワーク"]

    subgraph host["ホストOS"]
        eth0["物理NIC<br/>（eth0）<br/>例: 192.168.1.10"]
        nat["NAT / IP Masquerade"]
        virbr0["仮想ブリッジ<br/>（virbr0）<br/>例: 192.168.122.1/24"]
    end

    subgraph vms["仮想マシン"]
        vm1["VM-A<br/>vNIC: 192.168.122.10"]
        vm2["VM-B<br/>vNIC: 192.168.122.11"]
    end

    internet <--> eth0
    eth0 <--> nat
    nat <--> virbr0
    virbr0 <--> vm1
    virbr0 <--> vm2
```

| 項目 | 内容 |
|------|------|
| **外部→VM通信** | ポートフォワーディングを設定しない限り不可 |
| **VM→外部通信** | NATにより可能 |
| **VM間通信** | 同じ仮想ブリッジ上であれば可能 |
| **デフォルトブリッジ** | `virbr0`（192.168.122.0/24） |
| **適用場面** | 開発・学習環境。外部からVMへのアクセスが不要な場合 |

## ブリッジネットワーク

ホストの物理NICとVMの仮想NICを同一のブリッジに接続します。VMが**物理ネットワークと同じセグメント**に属するため、外部から直接アクセスできます。

```mermaid
flowchart TB
    internet["インターネット / 外部ネットワーク<br/>（192.168.1.0/24）"]
    router["ルーター<br/>（192.168.1.1）"]

    subgraph host["ホストOS"]
        br0["Linux Bridge<br/>（br0）"]
        eth0["物理NIC（eth0）<br/>ブリッジのメンバー"]
    end

    subgraph vms["仮想マシン"]
        vm1["VM-A<br/>vNIC: 192.168.1.101"]
        vm2["VM-B<br/>vNIC: 192.168.1.102"]
    end

    internet <--> router
    router <--> br0
    br0 <--> eth0
    br0 <--> vm1
    br0 <--> vm2
```

| 項目 | 内容 |
|------|------|
| **外部→VM通信** | 直接アクセス可能 |
| **VMのIPアドレス** | 物理ネットワークのDHCPまたは手動設定 |
| **ホストのIP** | ブリッジ（br0）に設定（eth0からブリッジへ移動） |
| **適用場面** | サーバー用途。外部から直接VMにアクセスが必要な場合 |

## NATとブリッジの比較

```mermaid
flowchart LR
    subgraph nat_mode["NATモード"]
        nat_ext["外部"] -->|"到達不可<br/>（ポートFWなし）"| nat_vm["VM"]
        nat_vm -->|"通信可"| nat_ext
    end

    subgraph bridge_mode["ブリッジモード"]
        br_ext["外部"] <-->|"双方向通信可"| br_vm["VM"]
    end
```

| 比較項目 | NAT | ブリッジ |
|---------|-----|---------|
| 設定の容易さ | ◎ デフォルトで使用可能 | △ ブリッジ作成が必要 |
| 外部からのアクセス | ✗（ポートFW要） | ◎ |
| IPアドレス管理 | libvirt内部DHCP | 物理NWと統一 |
| 分離性 | 高い | 低い |
| 用途 | 学習・開発環境 | 本番・サーバー用途 |

## libvirtによるネットワーク管理

libvirtはネットワーク定義をXMLで管理します。virshコマンドで操作できます。

### ネットワーク管理コマンド体系

```mermaid
mindmap
  root((virsh ネットワーク管理))
    一覧・確認
      net-list
      net-info
      net-dumpxml
    操作
      net-start
      net-destroy
      net-autostart
    定義管理
      net-define
      net-undefine
      net-edit
```

### デフォルトネットワークの構成（XML例）

```xml
<network>
  <name>default</name>
  <forward mode="nat"/>
  <bridge name="virbr0" stp="on" delay="0"/>
  <ip address="192.168.122.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.122.2" end="192.168.122.254"/>
    </dhcp>
  </ip>
</network>
```

:::info
ネットワーク設定はXMLファイルで定義されており、`virsh net-dumpxml <ネットワーク名>` で確認できます。
:::
