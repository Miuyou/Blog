---
title: "P4607 [SDOI2018]反回文串"
date: 2021-01-21
tags:
  - 数学
  - 质数
  - 解题报告
cover: "images/post-images/1591517369461.jpg"
---

好nb啊,,首先摸一摸不可以的情况,然后列个狮子出来,大概就是枚举循环节长度去计算,大力反演,反演出来的结果加以计算就行了

$$
\sum_{x|n}F(x)g(x)\sum_{k|\frac{n}{x}}\mu(k)k
$$

考虑一个 dp 的思想来统计答案，每次新增一个质因数 $p'$ 进入集合的时候，显然答案有两类，一类是不选入 $p'$ 一类是选入 $p'$，选入 $p
'$ 的同时会使得所有贡献都乘以 $(-1)$，令 $f_i$ 表示之前的答案，则有 $f_i'=(f_i-p'f_i)$，我们把每一项的贡献单独提取出来，则可以得到上式为：

$$
\sum_{k|n}\mu(k)k=\prod(1-p_i)
$$
````cpp
#include<cstdio>
#include<iostream>
#include<bitset>
#include<queue>
#include<set>
#include<vector>
#include<map>
#include<cmath>
#include<cstring>
#include<algorithm>
using namespace std;
#define db double
#define ll long long
#define lb long double
#define be bitset
#define lll __int128
const int N=1e6+5;
const int INF=1e8+5;
const int M=1e5;
const ll mod=1e9+7;
inline void rd(ll &x){
	x=0;
	char ch=getchar();bool flag=0;
	while((ch<'0'||ch>'9')&&ch!='-')ch=getchar();
	if(ch=='-')flag=1,ch=getchar();
	while(ch>='0'&&ch<='9')x=x*10ll+ch-'0',ch=getchar();
	if(flag)x=-x;return;
}
inline void rd(int &x){
	x=0;
	char ch=getchar();bool flag=0;
	while((ch<'0'||ch>'9')&&ch!='-')ch=getchar();
	if(ch=='-')flag=1,ch=getchar();
	while(ch>='0'&&ch<='9')x=x*10+ch-'0',ch=getchar();
	if(flag)x=-x;return;
}
inline char rch() {
    char c; while ((c = getchar()) != 'N' && c != 'E');
    return c;
}
inline ll gcd(ll a,ll b){
    return b?gcd(b,a%b):a;
}
ll n,k,p,q[N],lr;
long long mul(long long x,long long y,long long mod){
    x%=mod;y%=mod;
	return (x*y-(long long)((long double)x/mod*y)%mod*mod+mod)%mod;
}

inline ll ksm(ll x,ll y,ll p){
    ll ans=1ll;
    while(y){
        if(y&1)ans=mul(ans,x,p);
        x=mul(x,x,p);
        y>>=1;
    }return ans;
}
inline ll F(ll x,ll y,ll p){
    return (mul(x,x,p)+y)%p;
}
ll prim[7]={2,325,9375,28178,450775,9780504,1795265022};
inline bool miller(ll x){
    if(x<2)return 0;
    if(x==2||x==3)return 1;
    ll y=x-1,r=0;
    while(!(y&1))++r,y>>=1;
    for(int i=0;i<=6;++i){
        ll a=prim[i]%(x-2)+2;
        ll z=ksm(a,y,x);
        if(z==1||z==x-1)continue;
        for(int j=0;j<r-1;++j){
            z=mul(z,z,x);
            if(z==x-1)break;
        }
        if(z!=x-1)return 0;
    }return 1;
}
inline ll rho(ll x){
    ll s=0,t=0,z=1ll*rand()%(x-1)+1,val=1;
    int num=0,goal=1;
    for(;;goal<<=1,s=t,val=1){
        for(num=1;num<=goal;++num){
            t=F(t,z,x);
            val=mul(val,abs(t-s),x);
            if(num%127==0){
                ll k=gcd(val,x);
                if(k>1)return k;
            }
        }
        ll k=gcd(val,x);
        if(k>1)return k;
    }
}
inline void prollard(ll x){
    if(x<2)return;
    if(miller(x)){
        q[++lr]=x;
    }else{
        ll y=x;
        while(y==x)y=rho(x);
        prollard(x/y);prollard(y);
    }
}
ll val[N],tot,num[N],ans,tat;
inline void dp(ll x,ll f, ll d){
    if(x==tot+1){
        if((d&1)&&(!((n/d)&1)))return;
        ll g=(d&1)?d:d/2ll;
        ans=(ans+mul(mul(ksm(k,(d+1ll)/2ll,p),g,p),f,p))%p;
        if(ans<0)ans+=p;
        ++tat;
        return;
    }
    ll h=1ll;
    for(int i=0;i<=num[x];++i){
        if(i==num[x])dp(x+1,f,d*h);
        else dp(x+1,((f-mul(f,val[x],p))%p+p)%p,d*h);
        h=h*val[x];
    }
}
int main(){
    int t;
    rd(t);
    while(t--){
        lr=tot=0;ans=0;
        rd(n);rd(k);rd(p);
        prollard(n);
        sort(q+1,q+1+lr);
        for(int i=1;i<=lr;++i){
            if(q[i]==q[i-1])++num[tot];
            else val[++tot]=q[i],num[tot]=1;
        }
        dp(1,1,1);
        printf("%lld\n",ans);
    }
    system("pause");
	return 0;
}
````
