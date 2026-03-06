---
title: "[CF786B Legacy]"
date: 2021-01-10
tags:
  - 优化建图
  - 数据结构
  - 解题报告
cover: "images/hero/VRChat_2026-01-31_19-39-34.323_2560x1440.png"
---

* [CF786B Legacy](https://www.luogu.com.cn/problem/CF786B)

线段树优化建图,因为生疏了所以头疼了会
考虑点到区间就是正向连边
区间到点就要反过来连边,那么再建一个倒着的树即可
````cpp
inline void update(int op,int k,int l,int r,int L,int R,int w){
    if(L<=l&&r<=R){
        V[op].push_back((SpringWait){k,w});
    }else{
        int mid=(l+r)>>1;
        if(L<=mid)update(op,k<<1,l,mid,L,R,w);
        if(mid<R)update(op,k<<1|1,mid+1,r,L,R,w);
    }
}
inline void pdate(int op,int k,int l,int r,int L,int R,int w){
    if(L<=l&&r<=R){
        V[k+mn].push_back((SpringWait){op,w});
    }else{
        int mid=(l+r)>>1;
        if(L<=mid)pdate(op,k<<1,l,mid,L,R,w);
        if(mid<R)pdate(op,k<<1|1,mid+1,r,L,R,w);
    }
}
struct node{
    ll id,dis;
};
priority_queue<node>que;
inline bool operator <(node x,node y){
    return x.dis>y.dis;
};
ll dis[N];
inline void built(int k,int l,int r){
    if(l==r){
        tp[l]=k;
        V[k].push_back((SpringWait){k+mn,0});
        V[k+mn].push_back((SpringWait){k,0});
    }else{
        V[k].push_back((SpringWait){(k<<1),0});
        V[k].push_back((SpringWait){(k<<1)+1,0});
        V[(k<<1)+mn].push_back((SpringWait){k+mn,0});
        V[(k<<1)+1+mn].push_back((SpringWait){k+mn,0});
        int mid=(l+r)>>1;
        built(k<<1,l,mid);
        built(k<<1|1,mid+1,r);
    }
}
int main(){
    rd(n);rd(q);rd(s);mn=n*4;
    int opt,u,v,l,r,w;built(1,1,n);
    for(int i=1;i<=q;++i){
        rd(opt);
        if(opt==1){
            rd(u);rd(v);rd(w);
            V[tp[u]].push_back((SpringWait){tp[v],w});
        }else if(opt==2){
            rd(u);rd(l);rd(r);rd(w);
            update(tp[u],1,1,n,l,r,w);
        }else{
            rd(u);rd(l);rd(r);rd(w);
            pdate(tp[u],1,1,n,l,r,w);
        }
    }

    que.push((node){tp[s],0});

    ```
````
