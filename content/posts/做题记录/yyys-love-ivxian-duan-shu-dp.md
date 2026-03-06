---
title: "[yyy's love IV][线段树DP]"
date: 2020-12-27
tags:
  - 数据结构优化DP
  - 动态规划
  - 解题报告
cover: "images/post-images/cts2019ke-jin-shou-you.jpg"
---

* [P2418 yyy loves OI IV](https://www.luogu.com.cn/problem/P2418)

我光想想就硬了(指拳头)

很容易想,需要处理的是快速查询可行区间最小值,使用线段树即可,至于臭味相投的人那就另外整点东西处理下就行了

注意:线段树是建立在$x$轴上的,包括负区间....
````cpp
int x[N],y[N],X[N],Y[N],g[N];
int main(){
	rd(n);rd(m);
	for(int i=1;i<=n;++i){
		rd(a[i]);
		if(a[i]==1)a[i]=-1;
		else a[i]=1;
		x[i]=x[i-1]+(a[i]==-1);
		y[i]=y[i-1]+(a[i]==1);
	}
	memset(t,0x3f,sizeof(t));
	memset(g,0x3f,sizeof(g));
	memset(X,0x3f,sizeof(X));
	memset(Y,0x3f,sizeof(Y));
	update(1,-M,M,0,0);
	X[0]=Y[0]=g[M]=0;
	int opt,num;
	opt=0;num=0;
	f[0]=0;
	for(int i=1;i<=n;++i){
		sum[i]=sum[i-1]+a[i];
		f[i]=query(1,-M,M,max(sum[i]-m,-M),min(M,sum[i]+m))+1;
		f[i]=min(f[i],f[i-1]+1);
		f[i]=min(f[i],X[x[i]]+1);
		f[i]=min(f[i],Y[y[i]]+1);
		X[x[i]]=min(f[i],X[x[i]]);
		Y[y[i]]=min(f[i],Y[y[i]]);
		update(1,-M,M,sum[i],f[i]);
	}
	cout<<f[n]<<endl;
	system("Pause");
    return 0;
}
````
