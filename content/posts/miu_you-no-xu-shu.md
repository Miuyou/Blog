---
title: Miu_you の 虚树
date: 2020-03-23
tags:
  - 算法学习
cover: "images/post-images/1591605623747.jpg"
---

![](/images/post-images/1584945867019.jpg)

关于虚树,若一个树中,窝们真正用得到且会变改变的点少,可以提出来重新建树,然后在这棵树上做树形DP,可以保证一个较低的复杂度

这里贴代码
````cpp
sort(a + 1, a + 1 + m, cmp);//按dfn排序
	sta[tp = 1] = 1;//入一个根节点
	for (int i = 1; i <= m; ++i) {
		if (a[i] == 1)continue;//已经操作
		if (!tp) {
			dep[tp = 1] = a[i]; continue;//以防空栈
		}
		int lca = LCA(sta[tp], a[i]);
		while (tp>1&&dep[lca] < dep[sta[tp - 1]]) {//如果不是合适的位置
			add(sta[tp - 1], sta[tp]);
			--tp;
		}if (dep[lca] < dep[sta[tp]]||(!tp)) {
			add(lca, sta[tp]);
			--tp;
		}
		if (sta[tp] != lca)sta[++tp] = lca;//不是lca就把lca加进去
		sta[++tp] = a[i];
	}for (int i = 1; i < tp; ++i)add(sta[i], sta[i + 1]);
````

因为我们的栈里面存储的是一条链

* [CF613D Kingdom and its Cities](https://www.luogu.com.cn/problem/CF613D)
  如果两个点相连则无解,然后建立虚树再DP,如果该点不是关键点可以一代价全断,否则就得花费同等与子树的代价断点,子树为一且不是关键点可以留着以后断
* [P4103 [HEOI2014]大工程](https://www.luogu.com.cn/problem/P4103)
  第一问直接统计,第二问和第三问常规树形DP,可以通过一些奇技淫巧来躲掉次长链
* [P2495 [SDOI2011]消耗战](https://www.luogu.com.cn/problem/P2495)
  提前统计出每个节点到根节点的最小边,然后做就可以了
* [P3233 [HNOI2014]世界树](https://www.luogu.com.cn/problem/P3233)
  debug了N个小时.....................................................
  选择区域计算,写了五个DFS,一个用来预处理,两个拿来求当前点的统治点,第三个拿来计算一些在虚树外面的点的归属,第四个拿来做最后的计算,倍增求中间点.

不要把一个无法确定正确性の含树写的很长很长!
