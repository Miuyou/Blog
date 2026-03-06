---
title: "[SHOI2009舞会][动态规划][计数]"
date: 2020-12-24
tags:
  - 计数
  - 动态规划
  - 解题报告
cover: "images/post-images/1601984663941.jpg"
---

* [P2159 [SHOI2009]舞会](https://www.luogu.com.cn/problem/P2159)

很神啊,啪的一下,我就被秒了

俩个轴,考虑固定男生,然后去逐位匹配女生,发现每次加入一个男生无法统计...那么考虑同时加入$a_i$和$b_i$,i号要么男生高,
然后考虑$x_j>=y_i$且$j<i$,共$s$个,以及剩下的j个$x_j<y_j$都不需要特殊处理,再加上自己
需要特殊处理的只有$y_j<=x_j<y_i$,为$i-s-j$

需要着重注意一些性质,例如本题的有序性,有序是我们计数的关键条件
````cpp
rd(n);rd(k);
	for(int i=1;i<=n;++i){
		rd(a[i]);
	}for(int i=1;i<=n;++i){
		rd(b[i]);
	}
	sort(a+1,a+1+n);
	sort(b+1,b+1+n);
	for(int i=1;i<=n;++i){
		for(int j=1;j<i;++j){
			c[i]+=(a[j]>=b[i]);
			d[i]+=(b[j]>a[i]);
		}
	}
	dp[0][0]=1;
	for(int i=1;i<=n;++i){
		if(a[i]>=b[i])
		for(int j=0;j<=min(n,k);++j){
			SpringWait x;
			x=(c[i]+j+1);
			dp[i][j]+=x*dp[i-1][j];
			if(!j)continue;
			x=(i-c[i]-j);
			if(i-c[i]-j)
			dp[i][j]+=x*dp[i-1][j-1];
		}else{
			for(int j=1;j<=min(n,k);++j){
				SpringWait x;
				x=(d[i]+i-j+1);
				dp[i][j]+=x*dp[i-1][j-1];
				x=(j-d[i]);
				if(j-d[i]>0)
				dp[i][j]+=x*dp[i-1][j];
			}
		}
	}
	SpringWait ans;
	for(int i=0;i<=k;++i){
		ans=(ans+dp[n][i]);
	}

    ```
````
