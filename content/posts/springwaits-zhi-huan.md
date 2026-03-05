---
title: "SpringWait's 置换"
date: 2020-12-23
tags:
  - 置换
  - 算法学习
cover: "images/post-images/miu_you-cai-ji-ren-shi-de-shen-xian-men.png"
---

$Burnside$ 引理： 对于一个置换 $f$，若一个着色方案$s$ 经过置换后不变，则称 $s$ 为 $f$ 的不动点。记 $f$ 的不动点数目为 $D(f)$，则等价类个数为所有 $D(f)$ 的平均值。

例题- [P1446 [HNOI2008]Cards](https://www.luogu.com.cn/problem/P1446)
````cpp
ll n,r,b,g,m,p,a[M],f[N][N][N];
bool vis[M];
ll t[M],sum,siz[M];
inline ll work(){
	memset(vis,0,sizeof(vis));
	memset(f,0,sizeof(f));
	f[0][0][0]=1;sum=0;
	memset(siz,0,sizeof(siz));
	for(int i=1;i<=n;++i){
		if(vis[i])continue;
		int x=i;
		++sum;
		while(!vis[x]){
			vis[x]=1;
			x=a[x];
			++siz[sum];
		}
	}
	for(int z=1;z<=sum;++z){
		for(int i=r;~i;--i){
			for(int j=b;~j;--j){
				for(int k=g;~k;--k){
					if(i>=siz[z])f[i][j][k]=(f[i][j][k]+f[i-siz[z]][j][k])%p;
					if(j>=siz[z])f[i][j][k]=(f[i][j][k]+f[i][j-siz[z]][k])%p;
					if(k>=siz[z])f[i][j][k]=(f[i][j][k]+f[i][j][k-siz[z]])%p;
				}
			}
		}
	}
	return f[r][b][g];
}
inline ll ksm(ll x,ll y){
	ll ans=1;
	while(y){
		if(y&1)ans=1ll*ans*x%p;
		x=1ll*x*x%p;
		y>>=1;
	}return ans;
}
int main(){
	rd(r);rd(b);rd(g);rd(m);rd(p);
	n=r+b+g;
	int ans=0;
	for(int i=1;i<=m;++i){
		for(int j=1;j<=n;++j){
			rd(a[j]);
		}
		ans=(ans+work())%p;
	}
	for(int i=1;i<=n;++i)a[i]=i;
	ans=(ans+work())%p;
	ans=1ll*ans*ksm(m+1,p-2)%p;
	cout<<ans<<endl;
}
````
