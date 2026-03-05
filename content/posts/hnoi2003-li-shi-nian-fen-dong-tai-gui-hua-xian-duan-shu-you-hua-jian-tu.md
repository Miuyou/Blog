---
title: "[HNOI2003历史年份][动态规划][线段树优化建图]"
date: 2020-12-22
tags:
  - 字符串
  - 数据结构优化DP
  - 动态规划
  - 解题报告
cover: "images/post-images/1583297071335.jpg"
---

* [P2282 [HNOI2003]历史年份](https://www.luogu.com.cn/problem/P2282)

orzzzzzzzzzzzzzzzzzzz

调了一天

让我们先把弱化版给切掉

* [P1415 拆分数列](https://www.luogu.com.cn/problem/P1415)

一路填表过去就好了,正着一次反着一次
先求出最小后缀,发现对于每个值的左下标越靠近n越小
然后倒着做回来,右下标越靠近n越nb

那么
````cpp
inline bool cmp(int l1,int r1,int l2,int r2){
	int len1=r1-l1+1;
	int len2=r2-l2+1;
	int s1=l1,s2=l2,e1=r1,e2=r2;
	while(!a[s1]){
		++s1;
		--len1;
	}
	while (!a[s2]){
		++s2;
		--len2;
	}
	if(len1>len2)return 0;
	if(len1<len2)return 1;
	for(int i=0;i<len1;++i){
		if(a[s1+i]!=a[s2+i]){
			return 	a[s1+i]<a[s2+i];
		}
	}
	return 0;
}
int main(){
	scanf("%s",s+1);
	n=strlen(s+1);
	for(int i=1;i<=n;++i){
		a[i]=s[i]-'0';
	}
	f[1]=1;
	for(int i=2;i<=n;++i){
		for(int j=i;j;--j){
			if(cmp(f[j-1],j-1,j,i)){
				f[i]=j;break;
			}
		}
	}
	int i=n;
	while((i>=f[n]||(!a[i]))&&i){
		g[i]=n;
		--i;
	}
	for(;i;--i){
		g[i]=i;
		for(int j=n-1;j>i;--j){
			if(cmp(i,j,j+1,g[j+1])){
				g[i]=j;
				break;
			}
		}
	}
	for(int i=1;i<=n;i=g[i]+1){
		for(int j=i;j<=g[i];++j){
			printf("%c",s[j]);
		}
		if(g[i]!=n)printf(",");
	}
````

就好了,然鹅这个复杂度高达$O(n^3)$,需要优化
一:hash+二分代替暴力检查
二:改成刷表,然后线段树优化DP
````cpp
int n;
char s[N];
unsigned ll a[N],pw[N];
inline void prework(){
	n=strlen(s+1);
	for(int i=1;i<=n;++i){
		a[i]=a[i-1]*md+(s[i]-'0');
	}
}
unsigned ll get(int l,int r){return a[r]-a[l-1]*pw[r-l+1];}
inline bool cmp(int l1,int r1,int l2,int r2){
	int len1=r1-l1+1;
	int len2=r2-l2+1;
	if(len1<len2)return 1;
	if(len2<len1)return 0;
	int l=1,r=len1,mid,ans=0;
	while(l<=r){
		mid=(l+r)>>1;
		if(get(l1,l1+mid-1)==get(l2,l2+mid-1))l=mid+1,ans=mid;
		else r=mid-1;
	}
	if(ans>=len1)return 0;
	return s[l1+ans]<s[l2+ans];
}
int l[N],r[N],f,g,flag[N<<2],t[N<<2];
inline void update(int k,int l,int r,int L,int R,int val){
	if(L<=l&&r<=R){
		flag[k]=max(flag[k],val);
		return;
	}
	int mid=(l+r)>>1;
	if(mid>=L)update(k<<1,l,mid,L,R,val);
	if(mid<R)update(k<<1|1,mid+1,r,L,R,val);
}
inline void pushdown(int k){
	if(flag[k]){
		flag[k<<1]=max(flag[k<<1],flag[k]);
		flag[k<<1|1]=max(flag[k<<1|1],flag[k]);
		flag[k]=0;
	}return;
}
inline int query(int k,int l,int r,int z){

	if(l==r){t[k]=max(t[k],flag[k]);flag[k]=0;return t[k];}
	pushdown(k);
	int mid=(l+r)>>1;
	if(z<=mid)return query(k<<1,l,mid,z);
	else return query(k<<1|1,mid+1,r,z);
}
int main(){
	pw[0]=1ll;
	for(int i=1;i<=N-5;++i)pw[i]=pw[i-1]*md;
	while(~scanf("%s",s+1)){

		prework();
		for(int i=1;i<=n;++i)if(s[i]=='0')l[i]=l[i-1];else l[i]=i;
		r[n+1]=n+1;
		for(int i=n;i;--i)if(s[i]=='0')r[i]=r[i+1];else r[i]=i;
		memset(flag,0,sizeof(flag));
		memset(t,0,sizeof(t));
		update(1,1,n,r[1],n,1);
		for(int i=1;i<n;++i){
			f=query(1,1,n,i);
			int nex=r[i+1]+i-r[f];
			if(!cmp(r[f],i,r[i+1],nex))++nex;
			//cout<<i<<" "<<f<<"   "<<nex<<endl;
			if(nex<=n)update(1,1,n,nex,n,i+1);
		}int z=query(1,1,n,n);
		//cout<<z<<endl;
		memset(flag,0,sizeof(flag));
		memset(t,0,sizeof(t));
		update(1,1,n,l[z-1]+1,n,n);
		while(z>1){
			g=query(1,1,n,z);
			int k=g-r[z]+1;
			int y=l[max(z-1-k,0)]+1;
			if(!cmp(r[y],z-1,r[z],g))y=r[y]+1;
			update(1,1,n,y,z-1,z-1);
			z--;
		}
		int pos=query(1,1,n,1);
		//cout<<pos<<endl;
		for(int i=1;i<=n;++i){
			putchar(s[i]);
			if(i==pos&&i!=n)putchar(','),pos=query(1,1,n,i+1);
		}
		puts("");
	}
````
