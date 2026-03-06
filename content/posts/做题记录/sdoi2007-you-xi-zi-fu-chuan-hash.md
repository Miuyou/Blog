---
title: "[SDOI2007游戏][字符串][HASH]"
date: 2020-12-29
tags:
  - hash
  - 字符串
  - 动态规划
  - 解题报告
cover: "images/post-images/1592042663704.jpg"
---

* [P2462 [SDOI2007]游戏](https://www.luogu.com.cn/problem/P2462)

简单题,要咋做就咋做就行了,给他hash一下分层DP
````cpp
n=1;
	while(~scanf("%s",ss+1)){

		a[n].len=strlen(ss+1);
		for(int i=1;i<=a[n].len;++i)a[n].s[i]=ss[i];
		++n;
	}--n;
	sort(a+1,a+1+n);
	int len=a[1].len;
	pw[0]=1ll;
	for(int i=1;i<=100;++i)pw[i]=pw[i-1]*base%mod;
	int tp=1;
	for(int i=1;i<=n&&a[i].len==len;++i){
		f[i]=1;
		insert(i);++tp;
	}
	if(tp==n+1){
		cout<<1<<endl;
		cout<<a[1].s<<endl;
	}else{
		for(int i=tp;i<=n;i=tp){
			for(tp=i;tp<=n&&a[tp].len==a[i].len;++tp){
				int x=get(tp);
				int y=x;
				f[tp]=1;
				for(int j=1;j<=a[tp].len;++j){
					x=((y-pw[a[tp].s[j]-'a'])%mod+mod)%mod;
					if(g[x]){
						if(ha[x]+1>f[tp]){
							f[tp]=ha[x]+1;
							nex[tp]=g[x];
						}
					}
				}
			}memset(ha,0,sizeof(ha));memset(g,0,sizeof(g));
			for(int j=i;j<tp;++j){
				insert(j);
			}
		}
		int pt=1;
		for(int i=1;i<=n;++i){
			if(f[i]>f[pt]){
				pt=i;
			}
		}
		cout<<f[pt]<<endl;
		dfs(pt);
	}

    ```
````
