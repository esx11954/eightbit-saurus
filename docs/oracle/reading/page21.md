---
sidebar_position: 21
---

# 制約

## 制約とは

**制約**とは、テーブルに格納するデータのルールを定義する仕組みです。  
制約に違反するデータの挿入・更新を自動的に拒否することで、データの整合性を保ちます。

---

## 制約の種類

| 制約 | キーワード | 説明 |
|---|---|---|
| 主キー制約 | PRIMARY KEY | 行を一意に識別する列。NOT NULL + UNIQUE を兼ねる |
| 外部キー制約 | FOREIGN KEY | 別テーブルの主キーを参照し、参照整合性を保つ |
| 一意制約 | UNIQUE | 列内で重複する値を禁止する（NULLは許容） |
| NOT NULL制約 | NOT NULL | NULLの格納を禁止する |
| CHECK制約 | CHECK | 指定した条件を満たす値のみ許可する |

---

## PRIMARY KEY（主キー制約）

テーブル内の各行を一意に識別するための列に設定します。  
NULL不可かつ重複不可であり、1テーブルに1つだけ定義できます。

```sql
CREATE TABLE team (
    tno  NUMBER(4)    PRIMARY KEY,
    tname VARCHAR2(32),
    loc   VARCHAR2(32)
);
```

```sql
-- 同じtnoで挿入しようとするとエラーになる
INSERT INTO team VALUES (10, 'Blue Sharks', 'Miami');
INSERT INTO team VALUES (10, 'Red Dragons', 'Seoul');  -- エラー
```

複数列を組み合わせた**複合主キー**も定義できます。

```sql
CREATE TABLE team_member (
    tno     NUMBER(4),
    empno   NUMBER(4),
    CONSTRAINT pk_team_member PRIMARY KEY (tno, empno)
);
```

---

## FOREIGN KEY（外部キー制約）

別テーブルの主キーを参照する列に設定します。  
参照先に存在しない値の挿入や、参照されている行の削除を防ぎます。

```sql
CREATE TABLE player (
    player_id NUMBER(4) PRIMARY KEY,
    name      VARCHAR2(32),
    tno       NUMBER(4),
    CONSTRAINT fk_player_team FOREIGN KEY (tno) REFERENCES team(tno)
);
```

```sql
-- teamに存在しないtnoで挿入しようとするとエラーになる
INSERT INTO player VALUES (1, '田中', 999);  -- エラー
```

```sql
-- playerから参照されているteamの行は削除できない
DELETE FROM team WHERE tno = 10;  -- エラー
```

:::tip
参照先の行が削除されたときの動作は `ON DELETE` で指定できます。

| オプション | 動作 |
|---|---|
| `ON DELETE CASCADE` | 参照先の行が削除されると、参照元の行も一緒に削除される |
| `ON DELETE SET NULL` | 参照先の行が削除されると、外部キー列がNULLに更新される |

```sql
CONSTRAINT fk_player_team FOREIGN KEY (tno) REFERENCES team(tno) ON DELETE CASCADE
```
:::

---

## UNIQUE（一意制約）

列内での重複を禁止します。PRIMARY KEYとは異なりNULLを複数格納することが可能です。  
また、1テーブルに複数定義できます。

```sql
CREATE TABLE team (
    tno   NUMBER(4)    PRIMARY KEY,
    tname VARCHAR2(32) UNIQUE,
    loc   VARCHAR2(32)
);
```

```sql
-- 同じtnameで挿入しようとするとエラーになる
INSERT INTO team VALUES (10, 'Blue Sharks', 'Miami');
INSERT INTO team VALUES (20, 'Blue Sharks', 'Seoul');  -- エラー
```

---

## NOT NULL（NOT NULL制約）

NULLの格納を禁止します。値が必須の列に設定します。

```sql
CREATE TABLE team (
    tno   NUMBER(4)    PRIMARY KEY,
    tname VARCHAR2(32) NOT NULL,
    loc   VARCHAR2(32)
);
```

```sql
-- tnameにNULLを挿入しようとするとエラーになる
INSERT INTO team (tno, loc) VALUES (10, 'Miami');  -- エラー
```

---

## CHECK（CHECK制約）

列に格納できる値の条件を指定します。条件を満たさない値は拒否されます。

```sql
CREATE TABLE player (
    player_id NUMBER(4) PRIMARY KEY,
    name      VARCHAR2(32) NOT NULL,
    age       NUMBER(3) CHECK (age >= 0 AND age <= 150),
    tno       NUMBER(4)
);
```

```sql
-- 条件を満たさない値はエラーになる
INSERT INTO player VALUES (1, '田中', -5, 10);   -- エラー
INSERT INTO player VALUES (2, '鈴木', 200, 10);  -- エラー
```

---

## 制約の確認

作成済みの制約はデータディクショナリビューで確認できます。

```sql
-- テーブルの制約一覧を確認する
SELECT constraint_name, constraint_type, column_name
FROM user_cons_columns
WHERE table_name = 'TEAM';
```

---

## 制約の追加・削除

テーブル作成後でも `ALTER TABLE` で制約を追加・削除できます。

```sql
-- 制約を追加する
ALTER TABLE player ADD CONSTRAINT chk_age CHECK (age >= 0 AND age <= 150);

-- 制約を削除する
ALTER TABLE player DROP CONSTRAINT chk_age;
```

### 制約の無効化・有効化

データの一括投入時など、一時的に制約を無効にしたい場合に使用します。

```sql
-- 制約を無効化する
ALTER TABLE player DISABLE CONSTRAINT fk_player_team;

-- 制約を有効化する
ALTER TABLE player ENABLE CONSTRAINT fk_player_team;
```

:::caution
制約を無効にしている間は整合性が保証されません。作業後は必ず有効に戻しましょう。
:::
