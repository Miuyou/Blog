---
title: "[铁马落地][动态规划][线段树优化DP]"
date: 2020-12-23
tags:
  - 数据结构优化DP
  - 动态规划
  - 解题报告
---

* [P1442 铁球落地](https://www.luogu.com.cn/problem/P1442)

先弄一个假假的想法,发现影响复杂的是快速找到下一层,那么从下往上线段树区间覆盖就好了....
````cpp
struct SpringWait{
	int h,l,r;
}a[N];
inline bool operator <(SpringWait a,SpringWait b){
	return a.h<b.h;
}
int t[N],num;
int f[N],g[N],ls[N],rs[N],flag[N<<2];
inline void pushdown(int k){
	if(flag[k]){
		flag[k<<1]=flag[k];
		flag[k<<1|1]=flag[k];
		flag[k]=0;
	}
}
inline int query(int k,int l,int r,int x){
	if(l==r)return flag[k];
	pushdown(k);
	int mid=(l+r)>>1;
	if(x<=mid)return query(k<<1,l,mid,x);
	else return query(k<<1|1,mid+1,r,x);
}
inline void update(int k,int l,int r,int L,int R,int x){
	if(L<=l&&r<=R){
		flag[k]=x;
	}else{
		int mid=(l+r)>>1;
		if(L<=mid)update(k<<1,l,mid,L,R,x);
		if(R>mid)update(k<<1|1,mid+1,r,L,R,x);
	}
}
int main(){
	rd(n);rd(h);
	int x,y;
	rd(x);rd(y);
	for(int i=1;i<=n;++i){
		rd(a[i].h);rd(a[i].l);rd(a[i].r);
		t[++num]=a[i].l;
		t[++num]=a[i].r;
	}
	++n;
	a[n].l=a[n].r=x;
	a[n].h=y;
	t[++num]=x;
	sort(a+1,a+1+n);
	sort(t+1,t+1+num);
	//num=unique(t+1,t+1+num)-t-1;
	for(int i=1;i<=n;++i){
		a[i].l=lower_bound(t+1,t+1+num,a[i].l)-t;
		a[i].r=lower_bound(t+1,t+1+num,a[i].r)-t;
	}
	for(int i=1;i<=n;++i){
		ls[i]=query(1,1,num,a[i].l);
		rs[i]=query(1,1,num,a[i].r);
		update(1,1,num,a[i].l,a[i].r,i);
	}
	memset(f,0x3f,sizeof(f));
	memset(g,0x3f,sizeof(g));
	f[0]=g[0]=0;
	for(int i=1;i<=n;++i){
		if(a[i].h-a[ls[i]].h<=h){
			if(ls[i]){
				f[i]=min(f[i],f[ls[i]]+t[a[i].l]-t[a[ls[i]].l]+a[i].h-a[ls[i]].h);
				f[i]=min(f[i],g[ls[i]]-t[a[i].l]+t[a[ls[i]].r]+a[i].h-a[ls[i]].h);
			}else{
				f[i]=a[i].h;
			}
		}

		if(a[i].h-a[rs[i]].h<=h){
			if(rs[i]){
				g[i]=min(g[i],f[rs[i]]+t[a[i].r]-t[a[rs[i]].l]+a[i].h-a[rs[i]].h);
				g[i]=min(g[i],g[rs[i]]-t[a[i].r]+t[a[rs[i]].r]+a[i].h-a[rs[i]].h);
			}else{
				g[i]=a[i].h;
			}
		}
	}
	printf("%d\n",min(f[n],g[n]));
	system("Pause");
	return 0;
}
````
