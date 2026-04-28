---
id: virtualization-basics
title: 仮想化の基礎
sidebar_position: 1
---

# 仮想化の基礎

## 仮想化とは

仮想化とは、物理的なハードウェアリソース（CPU・メモリ・ストレージ・ネットワーク）をソフトウェアによって抽象化し、複数の論理的な環境として扱えるようにする技術です。

1台の物理サーバー上で複数のOSを同時に動作させることができ、リソースを効率的に利用できます。

```mermaid
block-beta
  columns 3

  block:physical["物理サーバー（従来）"]:1
    columns 1
    app1["アプリA"]
    os1["OS"]
    hw1["ハードウェア"]
  end

  space

  block:virtual["仮想化サーバー"]:1
    columns 1
    block:vms:1
      columns 2
      block:vm1:1
        columns 1
        vapp1["アプリA"]
        vos1["OS"]
      end
      block:vm2:1
        columns 1
        vapp2["アプリB"]
        vos2["OS"]
      end
    end
    hypervisor["ハイパーバイザー"]
    hw2["ハードウェア"]
  end
```

## サーバー仮想化のメリット

| メリット          | 説明                               |
| ------------- | -------------------------------- |
| **リソース効率化**   | 1台のサーバーで複数VMを稼働させ、CPU/メモリの利用率を向上 |
| **コスト削減**     | 物理サーバー台数の削減により、電力・冷却・スペースのコストを削減 |
| **柔軟なスケーリング** | VMの追加・削除・複製が容易                   |
| **障害分離**      | 1つのVMに問題が発生しても他のVMに影響しない         |
| **スナップショット**  | VMの状態を保存・復元できる                   |

## Type1 / Type2 ハイパーバイザ

仮想化を実現するソフトウェアを**ハイパーバイザー**と呼びます。ハードウェアへのアクセス方法によってType1とType2に分類されます。

```mermaid
flowchart LR
    subgraph type1["Type1（ベアメタル型）"]
        direction TB
        t1app1["App"] --> t1os1["Guest OS"]
        t1app2["App"] --> t1os2["Guest OS"]
        t1os1 & t1os2 --> t1hyp["ハイパーバイザー（Type1）"]
        t1hyp --> t1hw["ハードウェア"]
    end

    subgraph type2["Type2（ホスト型）"]
        direction TB
        t2app1["App"] --> t2os1["Guest OS"]
        t2app2["App"] --> t2os2["Guest OS"]
        t2os1 & t2os2 --> t2hyp["ハイパーバイザー（Type2）"]
        t2hyp --> t2hostos["ホストOS"]
        t2hostos --> t2hw["ハードウェア"]
    end
```

### 比較

| 項目 | Type1（ベアメタル型） | Type2（ホスト型） |
|------|---------------------|----------------|
| 動作場所 | ハードウェア上に直接 | ホストOS上で動作 |
| パフォーマンス | 高い | オーバーヘッドあり |
| 用途 | エンタープライズ・本番環境 | 開発・学習・検証 |
| 代表製品 | KVM, VMware ESXi, Hyper-V | VirtualBox, VMware Workstation |

:::info
**KVMはType1に分類されます。** Linuxカーネル自体がハイパーバイザーの役割を持つため、ホストOSのオーバーヘッドがなく高いパフォーマンスを発揮します。
:::

## CPU仮想化支援（Intel VT-x / AMD-V）

従来のx86 CPUは仮想化を前提に設計されていなかったため、ハイパーバイザーがCPU命令をソフトウェアでエミュレートする必要があり、パフォーマンスが大幅に低下していました。

この問題を解決するため、Intel・AMDはCPU自体に仮想化支援機能を組み込みました。

```mermaid
flowchart TD
    GuestApp["ゲストOS アプリケーション"]
    GuestOS["ゲストOS<br/>（特権命令を発行）"]
    VMX["CPU仮想化支援<br/>Intel VT-x / AMD-V"]
    HW["物理ハードウェア"]

    GuestApp -->|"通常命令"| GuestOS
    GuestOS -->|"特権命令"| VMX
    VMX -->|"ハードウェアレベルで処理"| HW
    VMX -->|"VMExit（必要な場合のみ）"| KVM["KVM（ハイパーバイザー）"]
    KVM --> HW
```

| 技術              | メーカー  | 有効化             |
| --------------- | ----- | --------------- |
| **Intel VT-x**  | Intel | BIOS/UEFI設定で有効化 |
| **AMD-V (SVM)** | AMD   | BIOS/UEFI設定で有効化 |
|                 |       |                 |
|                 |       |                 |

:::warning
KVMを使用するには、CPU仮想化支援機能がBIOS/UEFIで**有効化されている**必要があります。
`egrep -c '(vmx|svm)' /proc/cpuinfo` で確認できます（0より大きければ有効）。
:::
