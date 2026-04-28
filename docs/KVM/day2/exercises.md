---
id: day2-exercises
title: Day 2 演習：VM 操作ハンズオン
sidebar_position: 10
---

# Day 2 演習：VM 操作ハンズオン

`virt-install` と `virsh` を使って VM の作成から削除まで一通り操作します。  
各課題は前の課題の結果を引き継ぎます。順番通りに進めてください。

---

## 課題 1：VM を作成する

`virt-install` コマンドで `almalinux01` という名前の VM を作成し、OS をインストールしてください。

**条件：**

| 項目 | 値 |
|------|-----|
| VM 名 | `almalinux01` |
| vCPU | 2 |
| メモリ | 2048 MB |
| ディスク | 20 GB / qcow2 形式 |
| ネットワーク | default |
| ISO | AlmaLinux 9 最小構成 |

**完了の確認：**

以下のコマンドを実行し、`almalinux01` が `running` 状態になっていることを確認してください。

```bash
sudo virsh list --all
```

- [ ] VM が `running` 状態で表示された

ゲスト VM にログインし、以下を確認してください。

```bash
ip addr show
cat /etc/os-release
```

- [ ] IP アドレスが表示された
- [ ] AlmaLinux 9 であることが確認できた

---

## 課題 2：VM の起動・停止を操作する

ゲスト VM のコンソールから抜け（`Ctrl + ]`）、ホスト側で以下の操作を順番に実施してください。

**手順：**

1. VM を正常停止する
2. `virsh list --all` で状態が `shut off` になっていることを確認する
3. VM を起動する
4. `virsh list --all` で状態が `running` になっていることを確認する
5. VM を強制停止する
6. `virsh list --all` で状態が `shut off` になっていることを確認する

**完了の確認：**

- [ ] 正常停止（`shutdown`）と強制停止（`destroy`）の違いを説明できる

> **ヒント：** `shutdown` と `destroy` ではゲスト OS の扱いが異なります。どちらがより安全か考えてみてください。

---

## 課題 3：スナップショットを操作する

VM のスナップショットを作成し、復元できることを確認します。

### 3-1. スナップショットの作成

VM が停止状態であることを確認し、スナップショットを作成してください。

```bash
sudo virsh list --all   # shut off であることを確認
```

スナップショット名：`snap-before-change`

- [ ] スナップショットを作成できた

作成後、以下で確認してください。

```bash
sudo virsh snapshot-list almalinux01
```

- [ ] 一覧に `snap-before-change` が表示された

### 3-2. ゲスト OS にファイルを追加する

VM を起動してコンソールにログインし、以下のコマンドでファイルを作成してください。

```bash
echo "test file" > /tmp/testfile.txt
cat /tmp/testfile.txt
```

- [ ] `test file` と表示された

VM を停止してください。

### 3-3. スナップショットに復元する

`snap-before-change` に復元してください。

- [ ] 復元コマンドを実行できた

### 3-4. ファイルが消えていることを確認する

VM を起動してコンソールにログインし、ファイルが消えていることを確認してください。

```bash
ls /tmp/testfile.txt
```

- [ ] ファイルが存在しないことが確認できた（スナップショット時点に戻った）

---

## 課題 4：VM をクローンする

停止中の `almalinux01` から `almalinux02` という名前のクローンを作成してください。

**完了の確認：**

```bash
sudo virsh list --all
```

- [ ] `almalinux01` と `almalinux02` の両方が表示された

クローン VM を起動してコンソールにログインし、ホスト名を変更してください。

変更後のホスト名：`almalinux02`

```bash
hostnamectl hostname    # 現在のホスト名を確認
```

- [ ] ホスト名が `almalinux02` に変更された

---

## 課題 5：VM を削除する

`almalinux02` を完全に削除してください（定義とディスクイメージの両方）。

**完了の確認：**

```bash
sudo virsh list --all
ls /var/lib/libvirt/images/
```

- [ ] `almalinux02` が VM 一覧から消えた
- [ ] `almalinux02.qcow2` がディスク一覧から消えた

---

## 振り返り

全課題が完了したら、以下の問いに答えてみてください。

1. `shutdown` と `destroy` はどう使い分けるべきか？
2. スナップショットはどのような場面で役に立つか？
3. クローンを使うと何が便利になるか？

講師に完了報告をし、振り返りの答えを共有してください。
