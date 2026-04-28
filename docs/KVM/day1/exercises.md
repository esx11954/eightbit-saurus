---
id: day1-exercises
title: Day 1 演習：環境構築チェックリスト
sidebar_position: 10
---

# Day 1 演習：環境構築チェックリスト

環境構築が正しく完了しているか、コマンドを実行して1つずつ確認します。  
各項目を実行し、期待通りの出力が得られたらチェックを入れてください。

---

## チェックリスト

### 1. systemd が有効になっているか

```bash
systemctl is-system-running
```

**確認ポイント：** `running` または `degraded` と表示されているか

- [ ] 確認できた

---

### 2. KVM モジュールがロードされているか

```bash
lsmod | grep kvm
```

**確認ポイント：** `kvm_intel` または `kvm_amd` が一覧に表示されているか

- [ ] 確認できた

> 表示されない場合は以下を実行してください（Intel の場合）：
> ```bash
> sudo modprobe kvm_intel
> ```

---

### 3. `/dev/kvm` が存在するか

```bash
ls -la /dev/kvm
```

**確認ポイント：** `/dev/kvm` のファイル情報が表示されているか

- [ ] 確認できた

---

### 4. libvirtd が起動しているか

```bash
sudo systemctl status libvirtd
```

**確認ポイント：** `Active: active (running)` と表示されているか

- [ ] 確認できた

---

### 5. ユーザーが libvirt グループに所属しているか

```bash
groups
```

**確認ポイント：** 出力の中に `libvirt` が含まれているか

- [ ] 確認できた

---

### 6. KVM ホストの検証を実行する

```bash
virt-host-validate
```

**確認ポイント：** `QEMU` と `KVM` の行が `PASS` になっているか

- [ ] 確認できた

> IOMMU に関する `WARN` は WSL2 環境では無視して問題ありません。

---

### 7. virsh で VM 一覧を表示する

```bash
sudo virsh list --all
```

**確認ポイント：** エラーなく（空でも）一覧が表示されるか

- [ ] 確認できた

---

### 8. default ネットワークが有効か

```bash
sudo virsh net-list --all
```

**確認ポイント：** `default` ネットワークが `active` になっているか

- [ ] 確認できた

> `inactive` の場合は以下を実行してください：
> ```bash
> sudo virsh net-start default
> sudo virsh net-autostart default
> ```

---

## 全チェック完了後の確認

上記 8 項目すべてにチェックが入ったら、講師に完了報告をしてください。

---

## トラブルシューティング

| 症状 | 確認コマンド | 対処 |
|------|------------|------|
| `systemctl` が使えない | `ps aux \| grep systemd` | `wsl --shutdown` 後に再起動 |
| `/dev/kvm` が存在しない | `grep -E '(vmx\|svm)' /proc/cpuinfo` | `sudo modprobe kvm_intel` を実行 |
| `libvirtd` が起動しない | `sudo journalctl -u libvirtd -n 30` | パッケージ未インストールの可能性 |
| `default` ネットワークがない | `sudo virsh net-list --all` | `net-define` → `net-start` を実行 |
