---
title: "[NOI2013][动态规划][大模拟]"
date: 2020-12-21
tags:
  - 模拟
  - 动态规划
  - 解题报告
---

* [P1398 [NOI2013]书法家](https://www.luogu.com.cn/problem/P1398)

属实脑瘫,不知道为啥挂掉了,最后提交了题解代码
暴力DP,细节无数,以后闲着没事可以看看,还是有可取之处的
````cpp
for(int i=1;i<=n;++i){
		for(int j=1;j<=m;++j){
			rd(b[i][j]);
			sum[i][j]=sum[i-1][j]+b[i][j];
		}
	}
	for(int i=0;i<=8;++i)for(int j=0;j<=150;++j)for(int k=0;k<=150;++k)f[0][i][j][k]=INF;
	for(int i=0;i<=150;++i)for(int j=0;j<=150;++j)a[i][j]=INF;
	int now,pre,nex;
	now=1;
	pre=0;
	nex=2;
	int ans=INF;
	for(int k=1;k<=m;++k){
		for(int i=1;i<=n;++i){
			for(int j=i+1;j<=n;++j){
				f[now][0][i][j]=max(f[pre][0][i][j],0)+sum[j][k]-sum[i-1][k];
			}
		}
		for(int i=1;i<=n;++i){
			a[1][i]=f[pre][1][1][i];
			for(int j=2;j<=i;++j){
				a[j][i]=max(a[j-1][i],f[pre][1][j][i]);
			}
		}

		for(int i=1;i<=n;++i){
			f[now][1][i][i]=max(a[i][i],a[i-1][i-1])+b[i][k];
			for(int j=i+1;j<=n;++j){
				f[now][1][i][j]=max(f[now][1][i][j-1]+sum[j][k]-sum[j-1][k],a[i][j]+sum[j][k]-sum[i-1][k]);
			}
		}

		for(int i=1;i<n;++i){
			int mx=INF;
			for(int j=n-1;j>=i;--j){
				mx=max(mx,f[pre][0][i][j+1]);
				f[now][1][i][j]=max(f[now][1][i][j],mx+sum[j][k]-sum[i-1][k]);
			}
		}
		for(int i=2;i<=n;++i){
			int mx=INF;
			for(int j=i-1;j;--j){
				mx=max(mx,f[pre][1][j+1][i]);
				f[now][2][j][i]=max(f[pre][2][j][i],mx)+sum[i][k]-sum[j-1][k];
			}
		}

		int mx=INF;
		if(k!=1){
			for(int i=2;i<=n;++i){
				for(int j=i-1;j;--j){
					mx=max(mx,f[nex][2][j][i]);
				}
			}
		}
		for(int i=1;i+1<n;++i){
			for(int j=i+2;j<=n;++j){
				f[now][3][i][j]=mx+sum[j][k]-sum[i-1][k];
				f[now][4][i][j]=max(f[pre][3][i][j],f[pre][4][i][j])+b[i][k]+b[j][k];
				f[now][5][i][j]=f[pre][4][i][j]+sum[j][k]-sum[i-1][k];
			}
		}

		mx=INF;
		if(k!=1){
			for(int i=1;i+1<n;++i){
				for(int j=i+2;j<=n;++j){
					mx=max(mx,f[nex][5][i][j]);
				}
			}
		}
		for(int i=1;i+1<n;++i){
			for(int j=i+2;j<=n;++j){
				f[now][6][i][j]=max(mx,f[pre][6][i][j])+b[i][k]+b[j][k];
				f[now][7][i][j]=max(f[pre][6][i][j],f[pre][7][i][j])+sum[j][k]-sum[i-1][k];
				f[now][8][i][j]=max(f[pre][7][i][j],f[pre][8][i][j])+b[i][k]+b[j][k];

				ans=max(ans,f[now][8][i][j]);
			}
		}
		/*for(int z=0;z<9;z++){
        	for(int i=0;i<=n;i++){
         	   for(int j=0;j<=n;j++){
                cout<<f[now][z][i][j]<<" ";
        	    }cout<<endl;
       	 	}cout<<endl;
   		 }
		cout<<"  !!!!  "<<endl;*/
		++now;
		++pre;
		++nex;
		if(now>=3)now=0;
		if(pre>=3)pre=0;
		if(nex>=3)nex=0;
	}
	cout<<ans<<endl;
````
