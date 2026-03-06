---
title: "[HNOI2005星际贸易][动态规划][单调队列优化][背包路径]"
date: 2020-12-26
tags:
  - 数据结构优化DP
  - 动态规划
  - 背包
  - 解题报告
banner: "images/hero/VRChat_2026-02-19_16-32-57.661_3840x2160.png"
cover: "images/hero/VRChat_2026-02-19_16-32-57.661_3840x2160.png"
---

* [P2317 [HNOI2005]星际贸易](https://www.luogu.com.cn/problem/P2317)

首先背包求出第一问,并且得到所有强制要选的点

那么接下来就是要最下化满足要求的路径花费

发现转移就俩种,要么从某个点飞过来要么原地加油,枚举某个点以及油量,复杂度$O(N^3)$,用单调队列搞搞就能优化成$O(N^2)$

然鹅这题在背包部分翻车了....不该省的不要省,多重背包做不到$O(N)$的空间复杂度的
````cpp
 rd(n);rd(m);rd(RR);rd(LL);
    RR=min(RR,2*n);
    for(int i=1;i<=n;++i){
        rd(a[i]);rd(b[i]);rd(l[i]);rd(p[i]);rd(f[i]);
    }
    for(int i=1;i<=n;++i){
        if(l[i]-l[i-1]>LL){
            puts("Poor Coke!");return 0;
        }
    }
    memset(bb,-1,sizeof(bb));
    bb[0][0]=0;
    for(int i=1;i<=n;++i){
        for(int j=0;j<=m;++j){
            if(bb[i-1][j]>=0)bb[i][j]=bb[i-1][j];
            if(j>=a[i]&&bb[i-1][j-a[i]]>=0){
                bb[i][j]=max(bb[i][j],bb[i-1][j-a[i]]+b[i]);
            }
        }
    }
    int an=0;int tp=0;
    for(int i=0;i<=m;++i)if(bb[n][i]>bb[n][an])an=i;
    for(int i=n,j=an;i;--i){
        if(bb[i][j]==bb[i-1][j])continue;
        else vis[i]=1,j-=a[i];
    }an=bb[n][an];

    memset(dp,0x3f,sizeof(dp));
    for(int i=0;i<=RR;++i)L[i]=1;
    dp[0][RR]=0;
    q[RR][++R[RR]]=0;
    vis[n]=1;
    for(int i=1;i<=n;++i){
        for(int j=0;j<=RR;++j){
            if(p[i]>0&&j>0)dp[i][j]=min(dp[i][j],dp[i][j-1]+p[i]);

            if(L[j+2]<=R[j+2])
            dp[i][j]=min(dp[i][j],dp[q[j+2][L[j+2]]][j+2]+f[i]);
            if(vis[i])L[j]=1,R[j]=0;
            while(L[j]<=R[j]&&(dp[q[j][R[j]]][j]>=dp[i][j]))--R[j];
            q[j][++R[j]]=i;
              while (L[j]<=R[j]&&(l[i+1]-l[q[j][L[j]]]>LL))++L[j];
        }
    }
    int ans=0;
    for(int i=0;i<=RR;++i){if(dp[n][i]<dp[n][ans])ans=i;//cout<<dp[n][i]<<endl;
    };
    if(dp[n][ans]==dp[0][0])puts("Poor Coke!");
    else printf("%d %d",an,an-dp[n][ans]);

    ```
````
