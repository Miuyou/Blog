---
title: "[SDOI2011导弹拦截][CDQ][DP]"
date: 2021-01-01
tags:
  - CDQ
  - 数据结构
  - 动态规划
  - 解题报告
---

* [P2487 [SDOI2011]拦截导弹](https://www.luogu.com.cn/problem/P2487)
  拦了半天发现是自己人内鬼了
  首先一眼看出是CDQ,然后要求一个中间点的方案需要他往前和他往后,所以要倒过来再做一次CDQ
````cpp
int n;
struct SpringWait
{
	int a,b,f,id;
	db g;
}f[N],g[N];
inline bool cmp1(SpringWait X,SpringWait Y){
	return X.b<Y.b;
}
inline bool cmp2(SpringWait X,SpringWait Y){
	return X.id>Y.id;
}
inline bool cmp3(SpringWait X,SpringWait Y){
	return X.a<Y.a;
}
inline bool cmp4(SpringWait X,SpringWait Y){
	return X.b>Y.b;
}
inline bool cmp5(SpringWait X,SpringWait Y){
	return X.id<Y.id;
}
inline bool cmp6(SpringWait X,SpringWait Y){
	return X.a>Y.a;
}
int rk[N];
int tf[N];
db tg[N];
inline int lowbit(int x){
	return x&(-x);
}
inline void insert(int x,int ff,db gg){
	while(x<=n){
		if(tf[x]==ff){
			tg[x]+=gg;
		}else if(tf[x]<ff){
			tg[x]=gg;
			tf[x]=ff;
		}
		x+=lowbit(x);
	}
}
inline void del(int x){
	while(x<=n){
		tf[x]=0;
		tg[x]=0;
		x+=lowbit(x);
	}
}
inline void query(int x,int &l,db &r){
	while(x){
		if(l==tf[x]){
			r+=tg[x];
		}else if(l<tf[x]){
			l=tf[x];
			r=tg[x];
		}
		x-=lowbit(x);
	}
}
inline void CDQ(int l,int r){
	if(l==r)return;
	int mid=(l+r)>>1;
	CDQ(l,mid);
	sort(f+1+mid,f+r+1,cmp3);
	int L=l;
	for(int R=mid+1;R<=r;++R){
		while(f[L].a<=f[R].a&&L<=mid){
			insert(f[L].b,f[L].f,f[L].g);
			++L;
		}
		int ff=0;db gg=0;
		query(f[R].b,ff,gg);
		if(f[R].f<ff+1){
			f[R].f=ff+1;
			f[R].g=gg;
		}else if(f[R].f==ff+1){
			f[R].g+=gg;
		}
	}
	for(int i=l;i<=mid;++i)del(f[i].b);
	sort(f+mid+1,f+1+r,cmp2);
	CDQ(mid+1,r);
	sort(f+l,f+1+r,cmp3);
}
inline void CD(int l,int r){
	if(l==r)return;
	int mid=(l+r)>>1;
	CD(l,mid);
	sort(g+1+mid,g+r+1,cmp6);
	int L=l;
	for(int R=mid+1;R<=r;++R){
		while(g[L].a>=g[R].a&&L<=mid){
			insert(g[L].b,g[L].f,g[L].g);
			++L;
		}
		int ff=0;db gg=0;
		query(g[R].b,ff,gg);
		if(g[R].f<ff+1){
			g[R].f=ff+1;
			g[R].g=gg;
		}else if(g[R].f==ff+1){
			g[R].g+=gg;
		}
	}
	for(int i=l;i<=mid;++i)del(g[i].b);
	sort(g+mid+1,g+1+r,cmp5);
	CD(mid+1,r);
	sort(g+l,g+1+r,cmp6);
}
int main(){
	rd(n);
	for(int i=1;i<=n;++i){
		rd(f[i].a);rd(f[i].b);f[i].id=i;f[i].f=1;
		f[i].g=1.0;
		g[i]=f[i];
	}
	sort(f+1,f+1+n,cmp1);
	rk[1]=1;int tot=1;
	for(int i=2;i<=n;++i){
		if(f[i].b==f[i-1].b){
			rk[i]=tot;
		}else {
			++tot;
			rk[i]=tot;
		}
	}
	for(int i=1;i<=n;++i){
		f[i].b=rk[i];
	}sort(f+1,f+1+n,cmp2);
	CDQ(1,n);

	/*for(int i=1;i<=n;++i){
		printf("%d %d %d %d %.5lf\n",f[i].a,f[i].b,f[i].id,f[i].f,f[i].g);
	}*/
	sort(g+1,g+1+n,cmp4);
	rk[1]=1;tot=1;
	for(int i=2;i<=n;++i){
		if(g[i].b==g[i-1].b){
			rk[i]=tot;
		}else {
			++tot;
			rk[i]=tot;
		}
	}
	for(int i=1;i<=n;++i){
		g[i].b=rk[i];
	}sort(g+1,g+1+n,cmp5);
	CD(1,n);
	/*for(int i=1;i<=n;++i){
		printf("%d %d %d %d %.5lf\n",g[i].a,g[i].b,g[i].id,g[i].f,g[i].g);
	}*/
	sort(f+1,f+1+n,cmp5);
	sort(g+1,g+1+n,cmp5);
	int len=0;
	for(int i=1;i<=n;++i){
		len=max(len,f[i].f);
	}
	cout<<len<<endl;
	db ans=0;
	for(int i=1;i<=n;++i){
		if(f[i].f==len)ans+=f[i].g;
	}
	for(int i=1;i<=n;++i){
		if(f[i].f+g[i].f-1==len){
			printf("%.5lf ",(f[i].g*g[i].g)/ans);
		}else{
			printf("0.00000 ");
		}
	}
	system("pause");
    return 0;
}
````
