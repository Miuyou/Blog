---
title: "[队员分组][动态规划][二分图][01背包]"
date: 2020-12-20
tags:
  - 动态规划
  - 背包
  - 解题报告
banner: "images/hero/VRChat_2026-02-19_16-28-52.717_3840x2160.png"
cover: "images/hero/VRChat_2026-02-19_16-28-52.717_3840x2160.png"
---

* [P1285 队员分组](https://www.luogu.com.cn/problem/P1285)

仔细思考发现有向图可以转化成无向图,发现彼此冲突的点对对答案有影响,冲突点对连边,二分图性质显然,但是这个可以由多个连通图组成,彼此之间无影响,考虑分组进行01背包就做完了
````cpp
inline void dfs(int x,int fa,int se){
	col[x]=se;
	V[tsum][se].push_back(x);
	++num[tsum][se];
	for(int i=1;i<=n;++i){
		if(i==fa||i==x)continue;
		if(!tu[x][i]){
			if(!col[i]){
				dfs(i,x,3-se);
			}else if(col[i]==se){
				puts("No solution");
				exit(0);
			}
		}
	}
}
int f[N][N],pre[N][N];
bool vis[N];
int main(){
	rd(n);
	for(int i=1,x;i<=n;++i){
		rd(x);
		while(x){
			tu[i][x]=1;
			rd(x);
		}
	}
	for(int i=1;i<=n;++i){
		for(int j=1;j<=n;++j){
			if(i!=j){
				if(tu[i][j]&&tu[j][i])continue;
				tu[i][j]=tu[i][j]=0;
			}
		}
	}
	for(int i=1;i<=n;++i){
		if(!col[i]){
			++tsum;
			dfs(i,0,1);
		}
	}
	pre[0][0]=1;
	for(int i=1;i<=tsum;++i){
		for(int j=1;j<=n/2;++j){
			int k=j-num[i][1];
			if(k>=0){if(pre[i-1][k])pre[i][j]=1;}
			k=j-num[i][2];
			if(k>=0){if(pre[i-1][k])pre[i][j]=2;}
		}
	}
	int ans=n/2;
	for(int i=n/2;i;--i)if(pre[tsum][i]){ans=i;break;}
	printf("%d ",ans);
	for(int i=tsum;i;--i){
		for(int j=0;j<V[i][pre[i][ans]].size();++j)vis[V[i][pre[i][ans]][j]]=1;
		ans-=num[i][pre[i][ans]];
	}
	for(int i=1;i<=n;++i)if(vis[i])printf("%d ",i),++ans;
	printf("\n%d ",n-ans);
	for(int i=1;i<=n;++i)if(!vis[i])printf("%d ",i);
	system("Pause");
	return 0;
}
````
