---
title: "[花园][动态规划][状态压缩][矩阵转移]"
date: 2020-12-21
tags:
  - 状态压缩
  - 矩阵
  - 动态规划
  - 解题报告
cover: "images/post-images/1583297071335.jpg"
---

* [P1357 花园](https://www.luogu.com.cn/problem/P1357)

数据范围一看就是要矩阵快速幂
考虑直接在序列上转移,发现行不通....
换个角度把每一段的状态给他状压一下,求出可行性矩阵,然后加速一下
````cpp
ll n,m,k;
int list[N],num;
inline int bit(int x){
	int nm=0;
	while(x){
		if(x&1)++nm;
		x>>=1;
	}return nm;
}

struct SpringWait{
	ll f[N][N];
	SpringWait(){memset(f,0,sizeof(f));}
}a;
inline SpringWait operator *(SpringWait x,SpringWait y){
	SpringWait z;
	for(int k=1;k<=num;++k)
	for(int i=1;i<=num;++i){
		for(int j=1;j<=num;++j){
			z.f[i][j]=(z.f[i][j]+1ll*x.f[i][k]*y.f[k][j]%mod)%mod;
		}
	}return z;
}
inline SpringWait ksm(SpringWait x,ll y){
	SpringWait ans;
	for(int i=1;i<=num;++i){
		ans.f[i][i]=1ll;
	}
	while(y){
		if(y&1)ans=ans*x;
		x=x*x;
		y>>=1;
	}return ans;
}
int tp[N];
int main(){
	rd(n);rd(m);rd(k);
	for(int i=0;i<(1<<m);++i)if(bit(i)<=k)list[++num]=i,tp[i]=num;
	for(int i=1;i<=num;++i){
		a.f[i][tp[(list[i]>>1)]]=1;
		a.f[i][tp[(list[i]>>1)|(1<<(m-1))]]=1;

	}

	SpringWait b=ksm(a,n);
	ll ans=0;
	for(int i=1;i<=num;++i){
		ans=(ans+b.f[i][i])%mod;
	}
	printf("%lld\n",ans);
	system("Pause");
	return 0;
}
````
