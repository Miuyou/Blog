---
title: "[HEOI2016/TJOI2016]排序 题解"
date: 2020-02-27
tags:
  - 解题报告
cover: "images/hero/VRChat_2026-02-19_16-29-46.777_3840x2160.png"
---

题目要求我们求出第$q$位置上的数字.
暴力想法:暴力局域排序,每次排序的复杂度为$nlogn$
不合格,舍弃暴力,发现排序不可避免,那么考虑如何优化排序复杂度
考虑$01$串可以做到$logn$排序(如何排序自行思考)
那么考虑如何转换成一个$01$串
约定比选择的数大的为1,小的为0
但题目要求固定位置的数字,则选择的数不确定
发现题目给出序列的为排列,则可二分所选择的数
求出结果

logn排序的原理是
因为序列全01,那么从小到大就是将所有的0放到前面,所有的1放到后面

时间复杂度为$O(nlogn^{2})$
````cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cstring>
using namespace std;
#define mid ((l+r)>>1)
#define ls (k<<1)
#define rs (k<<1|1)
#define lson ls,l,mid
#define rson rs,mid+1,r
int n,m,q,a[100050];
struct edge{
	int a,b,c;
}tu[100050];
struct node{
	int flag,sum;
}t[400050];
inline void pushdown(int k,int l,int r){
	if(t[k].flag==1){
		t[ls].flag=t[rs].flag=1;
		t[ls].sum=t[rs].sum=0;
	}else if(t[k].flag==2){
		t[ls].flag=t[rs].flag=2;
		t[ls].sum=(mid-l+1);t[rs].sum=(r-mid);
	}t[k].flag=0;
}
inline void built(int k,int l,int r,int x) {
	t[k].flag=0;
	if(l==r) {
		t[k].sum=(a[l]>=x);
	} else {
		built(lson,x);
		built(rson,x);
        t[k].sum=t[ls].sum+t[rs].sum;
	}
}
inline int query(int k,int l,int r,int L,int R) {
	if(l>r||r<L||l>R)return 0;
	if(L<=l&&r<=R)return t[k].sum;
    int tot=0;
	pushdown(k,l,r);
	if(L<=mid)tot+=query(lson,L,R);
	if(mid<R)tot+=query(rson,L,R);
	t[k].sum=t[ls].sum+t[rs].sum;
	return tot;
}
inline void gai(int k,int l,int r,int L,int R,int val){
	if(l>r||r<L||l>R)return;
    if(L<=l&&r<=R){
        t[k].flag=val+1;
		t[k].sum=(r-l+1)*val;
    }else{
        pushdown(k,l,r);
		if(mid>=L)gai(lson,L,R,val);
		if(mid<R)gai(rson,L,R,val);
		t[k].sum=t[ls].sum+t[rs].sum;
    }
}
inline int cha(int k,int l,int r,int val){
	if(l>r||r<val||l>val)return 0;
    if(l==val&&r==val){
        return t[k].sum;
    }else{
        pushdown(k,l,r);
		if(mid>=val)return cha(lson,val);
		else return cha(rson,val);
    }
}
int check(int x){
	built(1,1,n,x);
	for(int i=1;i<=m;++i){
        int val=query(1,1,n,tu[i].b,tu[i].c);
        if(!val)gai(1,1,n,tu[i].b,tu[i].c,0);
		if(tu[i].a){
			gai(1,1,n,tu[i].b,tu[i].b+val-1,1);
			gai(1,1,n,tu[i].b+val,tu[i].c,0);
		}else{
			val=(tu[i].c-tu[i].b+1)-val;
			gai(1,1,n,tu[i].b,tu[i].b+val-1,0);
			gai(1,1,n,tu[i].b+val,tu[i].c,1);
		}
	}
	return cha(1,1,n,q);
}
int main(){
	cin>>n>>m;
	for(int i=1;i<=n;++i)scanf("%d",&a[i]);
	for(int i=1;i<=m;++i){
		scanf("%d%d%d",&tu[i].a,&tu[i].b,&tu[i].c);
	}int l=1,r=n,md,anse=0;cin>>q;
	while(l<=r){
		md=(l+r)>>1;
		if(check(md)){
			anse=md;
			l=md+1;
		}else r=md-1;
	}cout<<anse<<endl;return 0;
}
````
