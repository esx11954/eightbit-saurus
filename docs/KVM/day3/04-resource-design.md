---
id: resource-design
title: リソース設計
sidebar_position: 4
---

# リソース設計

## vCPU設計

### 物理CPU・コア・スレッドとvCPUの関係

```mermaid
flowchart TB
    subgraph physical["物理サーバー"]
        subgraph socket["CPUソケット（1つ）"]
            direction LR
            subgraph core2["物理コア2"]
                t3["スレッド3<br/>（論理CPU）"]
                t4["スレッド4<br/>（論理CPU）"]
            end
            subgraph core1["物理コア1"]
                t1["スレッド1<br/>（論理CPU）"]
                t2["スレッド2<br/>（論理CPU）"]
            end
        end
    end

    subgraph vcpus["仮想マシンへのvCPU割り当て"]
        direction LR
        subgraph vm3["VM-C（1 vCPU）"]
            v4["vCPU0"]
        end
        subgraph vm2["VM-B（1 vCPU）"]
            v3["vCPU0"]
        end
        subgraph vm1["VM-A（2 vCPU）"]
            v1["vCPU0"]
            v2["vCPU1"]
        end
    end

    physical ~~~ vcpus
```

- vCPUは**論理CPU（スレッド）**に対してスケジューリングされます
- 1つの論理CPUに複数のvCPUを割り当て可能（**オーバーコミット**）

### オーバーコミット

物理コア数を超えてvCPUを割り当てることを**オーバーコミット**と呼びます。

```mermaid
xychart-beta
    title "物理論理CPU: 4 / 割り当てvCPU合計: 8（2倍オーバーコミット）"
    x-axis ["VM-A", "VM-B", "VM-C", "VM-D"]
    y-axis "vCPU数" 0 --> 4
    bar [2, 2, 2, 2]
```

| 観点 | 内容 |
|------|------|
| **メリット** | 物理CPUを有効活用。全VMが同時フル稼働しない前提で有効 |
| **デメリット** | 全VMが高負荷になると競合が発生し、パフォーマンスが低下 |
| **推奨比率** | 本番環境では1:1〜1:2程度が目安 |

## メモリ割り当て

### 固定割り当て vs バルーニング

```mermaid
flowchart LR
    subgraph fixed["固定割り当て"]
        direction TB
        fhost["ホストメモリ 16GB"]
        fvm1["VM-A: 4GB（固定）"]
        fvm2["VM-B: 4GB（固定）"]
        fhost --> fvm1
        fhost --> fvm2
    end

    subgraph balloon["バルーニング（動的）"]
        direction TB
        bhost["ホストメモリ 16GB"]
        bvm1["VM-A: 2〜6GB（動的）"]
        bvm2["VM-B: 2〜6GB（動的）"]
        bhost --> bvm1
        bhost --> bvm2
    end
```

| 方式 | 特徴 | 適用場面 |
|------|------|---------|
| **固定割り当て** | 常に指定量を確保。予測可能な動作 | 本番環境・性能保証が必要な場合 |
| **バルーニング** | 使用量に応じて動的に調整。効率的 | 開発・テスト環境。負荷がバラつく場合 |

:::info
KVMでバルーニングを利用するにはゲストOS側に `virtio-balloon` ドライバが必要です。Linuxでは標準搭載されています。
:::

## ストレージモデル

### シンプロビジョニング vs シックプロビジョニング

```mermaid
block-beta
  columns 2

  block:thin:1
    columns 1
    thin_label["シンプロビジョニング（qcow2）"]
    t_disk["仮想ディスク: 50GB"]
    t_actual["実際の使用量: 8GB<br/>（使った分だけ拡張）"]
    t_host["ホストディスク消費: 8GB"]
  end

  block:thick:1
    columns 1
    thick_label["シックプロビジョニング（raw）"]
    k_disk["仮想ディスク: 50GB"]
    k_actual["初期確保: 50GB<br/>（全量を事前確保）"]
    k_host["ホストディスク消費: 50GB"]
  end

  style thin_label fill:#dbeafe,stroke:#3b82f6
  style thick_label fill:#fef3c7,stroke:#f59e0b
```

| 方式 | ホスト消費量 | I/O性能 | 適用場面 |
|------|------------|--------|---------|
| **シン（qcow2）** | 実使用量のみ | 中 | 開発・検証・ストレージ節約 |
| **シック（raw）** | 最大容量を確保 | 高 | DBサーバーなど性能重視の本番 |

## パフォーマンス最適化の観点

### virtioドライバの活用

デバイスI/Oにはエミュレーションよりもvirtioドライバが大幅に高速です。

```mermaid
flowchart TB
    subgraph emulation["エミュレーション（低速）"]
        direction LR
        e_app["ゲストOS アプリ"]
        e_driver["標準ドライバ（例: e1000）"]
        e_qemu["QEMUエミュレーション層"]
        e_hw["物理HW"]
        e_app --> e_driver --> e_qemu --> e_hw
    end

    subgraph virtio["virtio（高速）"]
        direction LR
        v_app["ゲストOS アプリ"]
        v_driver["virtioドライバ"]
        v_kvm["KVM（直接アクセス）"]
        v_hw["物理HW"]
        v_app --> v_driver --> v_kvm --> v_hw
    end

    emulation ~~~ virtio
```

| デバイス種別 | エミュレーション | virtio |
|------------|----------------|--------|
| ネットワーク | e1000, rtl8139 | virtio-net |
| ディスク | IDE, SATA | virtio-blk, virtio-scsi |
| メモリバルーン | — | virtio-balloon |

:::tip
新規VM作成時は原則 **virtioを選択**してください。パフォーマンスが大きく向上します。
:::
