---
sidebar_position: 7
---

# 7. インターフェース

以下のJavaファイルを用意して下さい

```java showLineNumbers 
package javaB.interFace;

interface Run{
    public void run();
}

interface Eat{
    public void eat();
}

interface Dog extends Run, Eat{
    public void bark();
}

class BigDog implements Dog{
public void bark(){
    System.out.println("わんわん！");
}
public void run(){
    System.out.println("run slowly");
}
public void eat(){
    System.out.println("eat faster");
}
}

class SmallDog implements Dog{
    public void bark(){
       System.out.println("きゃんきゃん！");
    }
    public void run(){
      System.out.println("run faster");
    }
    public void eat(){
       System.out.println("eat slowly");
    }
}

```

以下の実行結果と同様になるようにクラス内に追記して下さい

```java {5-6} showLineNumbers 
package javaB.interFace;

class InterfaceMain{
    public static void main(String[] args){
        // ★ここに追記

    }
}
```


#### 実行結果

```
> java javaB.interFace.InterfaceMain big
わんわん！
run slowly
eat faster
```

```
> java javaB.interFace.InterfaceMain small
きゃんきゃん！
run faster
eat slowly
```

```
> java javaB.interFace.InterfaceMain
引数に「big」 か 「small」を入力してください
```

