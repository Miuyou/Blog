---
title: Miu_you の最小斯坦纳树
date: 2020-03-26
cover: "images/post-images/miu_you-no-qu-jian-dp.jpg"
---

给定一个包含 $n$ 个结点和 $m$ 条带权边的无向连通图 $G=(V,E)$。

再给定包含 $k$ 个结点的点集 $S$，选出 $G$ 的子图 $G'=(V',E')$，使得：

1. $S\subseteq V'$；
2. $G'$ 为连通图；
3. $E'$ 中所有边的权值和最小。

你只需要求出 $E'$ 中所有边的权值和。

对于这么一个问题,可以视作类似于局部最小生成树?考虑到如果选取的$S=V$,那么就是最小生成树.

也就是说最小生成树其实是这种问题的一个特殊形式,而这个问题就是最小斯坦纳树.

这个问题属于组合优化.考虑用DP的方式去解决问题,设$dp_{i,j}$表示为以$i$为根且包含$j$这个集合的生成树最小边权和为多少,然后合并一些已经算出来的结果,如果可以从这个点出发就做一次$spfa$来更新一下其他节点.

* [P3264 [JLOI2015]管道连接](https://loj.ac/problem/2110)
  还有一题但是因为太煞笔了所以不放出来了,去tm的输出方案
  关于这题,有一个比较巧妙的思路,如何合并两棵树的结果呢?建一个虚拟根然后模拟合并子树就可以了
````cpp
inline void dij(int s) {
	memset(vis, 0, sizeof(vis));
	while (!q.empty()) {
		node x = q.top();
		q.pop();
		if (vis[x.poi])continue;
		vis[x.poi] = 1;
		for (int i = firs[x.poi]; i; i = nex[i]) {
			int y = to[i];
			if (dp[y][s] > dp[x.poi][s] + dis[i]) {
				dp[y][s] = dp[x.poi][s] + dis[i];
					q.push( node{ dp[y][s],y });
			}
		}
	}
}
int main() {
	n = read(); k = read(); m = read();
	memset(dp, 127/3, sizeof(dp));
	for (int i = 1; i <= k; ++i) {
		X[i] = read();
		dp[X[i]][(1 << (i-1))] = 0;
	}
	for (int i = 1, x, y, z; i <= m; ++i) {
		x = read(); y = read();
		z = read();
		add(x, y, z);
		add(y, x, z);
	}
	for (int s = 1; s < (1 << k); ++s) {
		for (int i = 1; i <= n; ++i) {
			for (int j = s & (s - 1); j; j = s & (j - 1)) {
				dp[i][s] = min(dp[i][s], dp[i][j] + dp[i][s ^ j]);
			}
			if (dp[i][s] != dp[0][0]) {
				q.push(node{ dp[i][s],i });
			}
		}
		dij(s);
	}
````
