---
id: vm-lifecycle
title: VMの作成と基本操作
sidebar_position: 3
---

# VMの作成と基本操作

## VM作成の概要

KVM環境でVMを作成する主な方法は2つあります。

| ツール | 種別 | 特徴 |
|--------|------|------|
| **virt-manager** | GUI | 視覚的にウィザード形式でVM作成。初心者向け |
| **virt-install** | CLI | コマンドラインで作成。スクリプト化・自動化に向く |

どちらもlibvirtを介してQEMU/KVMを操作するため、裏側の動作は同じです。

```mermaid
flowchart LR
    virt-manager["virt-manager<br/>（GUI）"]
    virt-install["virt-install<br/>（CLI）"]
    libvirt["libvirtd"]
    QEMU["QEMU/KVM"]

    virt-manager --> libvirt
    virt-install --> libvirt
    libvirt --> QEMU
```

## ディスクイメージ

VMのディスクは**ディスクイメージファイル**として管理されます。主な形式は以下の2つです。

| 形式 | 特徴 | 推奨用途 |
|------|------|---------|
| **qcow2** | スナップショット対応・シンプロビジョニング・圧縮 | KVM標準。ほぼ全ての用途 |
| **raw** | 機能なし・高パフォーマンス | I/O性能を最大化したい場合 |

```mermaid
flowchart LR
    subgraph raw["raw"]
        r1["スナップショット ✗"]
        r2["シンプロビジョニング ✗"]
        r3["圧縮・暗号化 ✗"]
        r4["パフォーマンス: 高"]
    end
    subgraph qcow2["qcow2"]
        q1["スナップショット ✓"]
        q2["シンプロビジョニング ✓"]
        q3["圧縮・暗号化 ✓"]
        q4["パフォーマンス: 中"]
    end
```

## VMのライフサイクル

VMは以下の状態を遷移します。

```mermaid
flowchart TD
    S(["開始（未定義）"])
    defined["defined<br/>登録済み・未起動"]
    running["running<br/>実行中"]
    paused["paused<br/>一時停止"]
    shutoff["shutoff<br/>停止中"]
    E(["削除済み"])

    S -->|"virt-install / virsh define"| defined
    defined -->|"virsh start"| running
    running -->|"virsh suspend"| paused
    paused -->|"virsh resume"| running
    running -->|"virsh shutdown（正常停止）"| shutoff
    running -->|"virsh destroy（強制停止）"| shutoff
    shutoff -->|"virsh start"| running
    defined -->|"virsh undefine"| E
    shutoff -->|"virsh undefine --remove-all-storage"| E
```

### 各状態の説明

| 状態 | 説明 |
|------|------|
| **defined** | VMの定義がlibvirtに登録されているが、起動していない |
| **running** | 実行中 |
| **paused** | 一時停止（メモリ状態を保持したまま停止） |
| **shutoff** | 停止中（定義は残っている） |

### 停止方法の違い

| コマンド | 動作 | 使い分け |
|---------|------|---------|
| `virsh shutdown` | ゲストOSにシャットダウン信号を送信 | 通常の停止 |
| `virsh destroy` | 即時強制停止（電源断相当） | 応答しない場合 |

## Clone（クローン）

既存のVMを複製して新しいVMを作成します。同じ構成のVM（テンプレート）を素早く展開する際に使用します。

```mermaid
flowchart LR
    src["元VM<br/>（停止状態）"]
    clone1["クローンVM-1"]
    clone2["クローンVM-2"]
    clone3["クローンVM-3"]

    src -->|"virt-clone"| clone1
    src -->|"virt-clone"| clone2
    src -->|"virt-clone"| clone3
```

:::info
クローン時にMACアドレスとUUIDは自動的に新しい値に変更されます。ホスト名・IPアドレスはゲストOS内で手動変更が必要です。
:::

## スナップショット

VMの**特定時点の状態**（ディスク＋メモリ）を保存し、後から復元できる機能です。

```mermaid
gitGraph
   commit id: "VM作成"
   commit id: "OS設定完了"
   branch snapshot-1
   checkout snapshot-1
   commit id: "📸 snap1（ミドルウェア導入前）"
   checkout main
   merge snapshot-1
   commit id: "Nginx導入"
   commit id: "設定変更"
   branch snapshot-2
   checkout snapshot-2
   commit id: "📸 snap2（本番リリース前）"
   checkout main
   merge snapshot-2
   commit id: "障害発生"
```

### スナップショットの種類

| 種類 | 説明 | 特徴 |
|------|------|------|
| **internal** | qcow2ファイル内に保存 | 管理が簡単・同ファイルに格納 |
| **external** | 別ファイルとして保存 | 実行中VMにも対応・ファイル分離 |

:::warning
スナップショットは**バックアップの代替ではありません**。ディスク障害には対応できないため、重要データは別途バックアップを取得してください。
:::
