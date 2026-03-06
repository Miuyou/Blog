---
title: "[排队打饭][动态规划][不错的状态压缩]"
date: 2020-12-24
tags:
  - 状态压缩
  - 动态规划
  - 背包
  - 解题报告
banner: "images/post-images/1591519415942.jpg"
cover: "images/post-images/1591519415942.jpg"
---

* [P2157 [SDOI2009]学校食堂](https://www.luogu.com.cn/problem/P2157)

刚看到题目会觉得难以下手

考虑最难解决的是如何维护那些人吃过饭了那些人可以吃饭,发现大家的容忍度都不高,将其状态压缩,那么就可以传递那些人吃过了,然后考虑上一个是谁吃会影响到计算结果,那么再开一维记录上一个是谁,就可以转移啦.想当于每个点都要背包一下怎么选后面谁吃,然后转移到下一个人的前提是这个人吃过了.
````cpp
memset(f,0x3f,sizeof(f));
		f[1][0][7]=0;
		for(int i=1;i<=n;++i){
			for(int j=0;j<MAXN;++j){
				for(int k=-8;k<=7;++k){
					if(f[i][j][k+8]!=f[0][0][0]){
						if(j&1){
							f[i+1][j>>1][k+7]=min(f[i+1][j>>1][k+7],f[i][j][k+8]);
						}else{
							int r=f[0][0][0];
							for(int z=0;z<=7;++z){
								if(j&(1<<z))continue;
								if(i+z>r)break;
								r=min(r,i+z+b[i+z]);
								f[i][j|(1<<z)][z+8]=min(f[i][j|(1<<z)][z+8],f[i][j][k+8]+((i+k)?(a[i+k]^a[i+z]):0));

							}
						}
					}
				}
			}
		}
		int ans=f[0][0][0];
		for(int i=0;i<=8;++i){
			ans=min(ans,f[n+1][0][i]);
		//	cout<<f[n+1][0][i]<<endl;
		}
````
