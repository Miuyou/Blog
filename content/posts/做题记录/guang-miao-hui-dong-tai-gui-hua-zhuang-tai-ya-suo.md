---
title: "[逛庙会][动态规划][状态压缩]"
date: 2020-12-25
tags:
  - 状态压缩
  - 动态规划
  - 解题报告
cover: "images/hero/VRChat_2026-02-19_16-29-01.762_3840x2160.png"
---

* [P2238 逛庙会](https://www.luogu.com.cn/problem/P2238)

还算不错的题.....考虑俩种转移方式产生的不确定因素,将其状态压缩然后转移
````cpp
  for(int i=1;i<=n;++i)scanf("%s",s[i]+1);
    for(int i=1;i<=n;++i){
        for(int j=1;j<=m;++j){
            if(s[i][j]=='.'){
                a[i][j]=0;
            }else{
                a[i][j]=s[i][j]-'0';
            }
        }
    }
    int mn=15;
    memset(b,0x3f,sizeof(b));
    b[1][1][mn]=0;
    for(int i=1;i<=n;++i){
        for(int j=1;j<=m;++j){
            for(int x=0;x<=mn;++x){
                for(int y=0;y<=mn;++y){
                    if((((x&4)==0)!=((y&8)==0))||(!(x&1))||(((x&2)!=0)+((y&1)!=0)+((y&4)!=0)<=1))continue;
                    int ans=b[i][j][x];
                    if(y&4)ans+=a[i+1][j+1];
                    if(y&2)ans+=a[i-1][j+2];
                    if(y&1)ans+=a[i][j+2];
                    b[i][j+1][y]=min(b[i][j+1][y],ans);
                }
                for(int y=0;y<=mn;++y){
                     if((((x&1)==0)!=((y&2)==0))||(!(x&4))||(((x&8)!=0)+((y&1)!=0)+((y&4)!=0)<=1))continue;
                    int ans=b[i][j][x];
                    if(y&1)ans+=a[i+1][j+1];
                    if(y&4)ans+=a[i+2][j];
                    if(y&8)ans+=a[i+2][j-1];
                    b[i+1][j][y]=min(b[i+1][j][y],ans);
                }
            }
        }
    }
    cout<<b[n][m][15]<<endl;

    ```
````
