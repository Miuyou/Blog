---
title: "[CF600E][启发式合并]"
date: 2021-01-09
tags:
  - 启发式合并
  - 数据结构
cover: "images/hero/VRChat_2026-01-13_01-01-05.123_2560x1440.png"
---

* [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E)

我是弟弟
这都写错
````cpp
inline void work(int x,int fa,int z){
   // cout<<x<<"  "<<fa<<endl;
    ++sum[a[x]];
    if(sum[a[x]]>top){
        num=0;
        top=sum[a[x]];
        num=a[x];
    }else if(sum[a[x]]==top){
        num+=a[x];
    }
    for(int i=firs[x];i;i=nex[i]){
        int y=to[i];
        if(y==fa||y==z)continue;
        work(y,x,z);
    }
}
inline void init(int x,int fa){
    --sum[a[x]];
    for(int i=firs[x];i;i=nex[i]){
        int y=to[i];
        if(y==fa)continue;
        init(y,x);
    }
}
inline void dfs(int x,int fa){
    for(int i=firs[x];i;i=nex[i]){
        int y=to[i];
        if(y==fa||y==son[x])continue;
        dfs(y,x);
        init(y,x);
        num=top=0;
    }
    if(son[x]){
        dfs(son[x],x);
    }
    work(x,fa,son[x]);
    ans[x]=num;
}
````
