---
id: migration-cli
title: マイグレーションとCLI管理
sidebar_position: 6
---

# マイグレーションとCLI管理

## マイグレーションとは

マイグレーションとは、**稼働中または停止中のVMを別の物理ホストへ移動する**技術です。ハードウェアのメンテナンスや負荷分散のために使用します。

### マイグレーションの種類

```mermaid
flowchart LR
    subgraph cold["コールドマイグレーション"]
        direction TB
        cs["ホストA<br/>（VMを停止）"] -->|"VMイメージを転送"| cd["ホストB<br/>（VMを起動）"]
    end

    subgraph live["ライブマイグレーション"]
        direction TB
        ls["ホストA<br/>（VM稼働中）"] -->|"サービス継続したまま移動"| ld["ホストB<br/>（VMを引き継ぎ）"]
    end
```

| 種類 | ダウンタイム | 用途 |
|------|------------|------|
| **コールドマイグレーション** | あり（停止が必要） | メンテナンス時・シンプルな移動 |
| **ライブマイグレーション** | ほぼなし（数ms〜数秒） | サービスを止めたくない本番環境 |

## ライブマイグレーションの仕組み

ライブマイグレーションはVMを停止せずにメモリをコピーするため、複数のフェーズで段階的に処理されます。

```mermaid
sequenceDiagram
    participant src as ホストA（移行元）
    participant dst as ホストB（移行先）

    Note over src: VM稼働中（サービス提供中）
    src->>dst: フェーズ1: メモリの全量コピー開始
    Note over src,dst: VM稼働を継続しながらコピー
    src->>dst: フェーズ2: 差分（ダーティページ）を繰り返し転送
    Note over src,dst: 差分が十分小さくなったら...
    src->>src: フェーズ3: VMを一時停止（数ms〜数秒）
    src->>dst: フェーズ4: 残りの差分・CPUレジスタ・デバイス状態を転送
    dst->>dst: フェーズ5: VM再開
    Note over dst: VM稼働中（サービス提供継続）
    src->>src: 移行元VMを破棄
```

:::info
ライブマイグレーションには共有ストレージ（NFS, SANなど）か、**ストレージマイグレーション**（ディスクも同時転送）が必要です。
:::

## CLIによるVM管理

`virsh` はlibvirtの公式CLIツールです。VMの操作から情報取得・リソース変更まで一元管理できます。

### コマンドカテゴリ

```mermaid
mindmap
  root((virsh))
    VM操作
      start
      shutdown
      destroy
      reboot
      suspend
      resume
    VM定義管理
      define
      undefine
      dumpxml
      edit
    情報取得
      list
      dominfo
      domstate
      vcpuinfo
      domstats
      dommemstat
    リソース変更
      setvcpus
      setmem
      setmaxmem
      attach-disk
      detach-disk
      attach-interface
    スナップショット
      snapshot-create-as
      snapshot-list
      snapshot-revert
      snapshot-delete
    ネットワーク
      net-list
      net-start
      net-destroy
      net-define
```

### 情報取得コマンド

| コマンド | 用途 | 例 |
|---------|------|-----|
| `virsh list --all` | 全VMの一覧と状態表示 | — |
| `virsh dominfo <VM名>` | VMの詳細情報（CPU・メモリ・状態） | `virsh dominfo almalinux01` |
| `virsh domstate <VM名>` | VMの現在の状態のみ表示 | `virsh domstate almalinux01` |
| `virsh vcpuinfo <VM名>` | vCPUの割り当て状況 | `virsh vcpuinfo almalinux01` |
| `virsh dommemstat <VM名>` | メモリ使用状況の詳細 | `virsh dommemstat almalinux01` |
| `virsh domstats <VM名>` | CPU・メモリ・ネットワーク・ディスクの統計 | `virsh domstats almalinux01` |

### リソース変更コマンド

| コマンド | 用途 | オプション例 |
|---------|------|-----------|
| `virsh setvcpus` | vCPU数を変更 | `--count 4 --live` で稼働中に反映 |
| `virsh setmem` | メモリ使用量を変更（バルーニング） | `--size 2G --live` |
| `virsh setmaxmem` | メモリ最大値を変更（要停止） | `--size 4G --config` |
| `virsh attach-disk` | ディスクを追加 | `--source /var/lib/libvirt/images/data.qcow2` |
| `virsh attach-interface` | NICを追加 | `--type network --source default` |

### `--live` / `--config` オプション

```mermaid
flowchart LR
    cmd["virsh setvcpus vm1 4"]

    live["--live<br/>稼働中VMに即時反映<br/>再起動後は元に戻る"]
    config["--config<br/>XML定義に保存<br/>次回起動時から有効"]
    both["--live --config<br/>両方に反映<br/>即時 + 永続"]

    cmd --> live
    cmd --> config
    cmd --> both
```

:::tip
設定を永続化したい場合は `--config` を必ず付けてください。`--live` のみだと再起動後に設定が失われます。
:::
