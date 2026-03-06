---
title: Miu_you の 树形DP
date: 2020-03-23
tags:
  - 算法学习
banner: "images/post-images/1583677126629.jpg"
cover: "images/post-images/1583677126629.jpg"
---

![](../images/post-images/1584943612772.jpg)

* [P5898 [COCI 2015]Kamp](https://www.luogu.com.cn/problem/P5898)
  无法避免的以1为根进行DP,求出每个点的最长链,然后考虑转移答案到子节点,分类讨论,如果子节点的siz为0那么就叠加答案,如果在非最长链上答案不变,在最长链上移动的话最长链可能被改变,需要同时记录一个次长链来更新最长链
* [P4253 [SCOI2015]小凸玩密室](https://www.luogu.com.cn/problem/P4253)
  设$f_{i,j}$表示为点亮以$i$为根节点的子树且到达$i$的第$j$个祖先的花费,如果当前点是叶子节点,
  $dp[0][i][j] = d[i][j] * a[fa(i, j)];$
  $dp[1][i][j] = (d[i][j] + d[bo(i, j)][1]) * a[bo(i, j)];$
  1为走到她的第$j$祖先的右节点的花费.
  如果有一个儿子节点
  $dp[0][i][j] = dp[0][ls][j + 1] + d[ls][1] * a[ls];$
  $dp[1][i][j] = dp[1][ls][j + 1] + d[ls][1] * a[ls];$
  如果有两个,同理转移
  $dp[0][i][j] = min(dp[0][i][j], dp[1][ls][1] + dp[0][rs][j + 1] + d[ls][1] * a[ls]);$
  $dp[0][i][j] = min(dp[0][i][j], dp[1][rs][1] + dp[0][ls][j + 1] + d[rs][1] * a[rs]);$
  $dp[1][i][j] = min(dp[1][i][j], dp[1][ls][1] + dp[1][rs][j + 1] + d[ls][1] * a[ls]);$
  $dp[1][i][j] = min(dp[1][i][j], dp[1][rs][1] + dp[1][ls][j + 1] + d[rs][1] * a[rs]);$
* [P3757 [CQOI2017]老C的键盘](https://www.luogu.com.cn/problem/P3757)
  拓扑图计数,按照树的亚子合并起来就可以了
* [P3576 [POI2014]MRO-Ant colony](https://www.luogu.com.cn/problem/P3576)
  恰蚂蚁(bushi),统计蚂蚁,反向考虑,因为向下取整所以要记录的是区间不是一个确定的值!,然后DP一下就好啦,题目一定要看清楚;
* [P3574 [POI2014]FAR-FarmCraft](https://www.luogu.com.cn/problem/P3574)
  最小时间emm,不太聪明的样子不如吃了吧(雾
  可以考虑贪心,通过推导柿子证明可得$siz[x] - f[x] < siz[y] - f[y]$用这个去排个序然后统计一下就好了,一开始忘记了可以推柿子只拿了80pts(悲
* [P3554 [POI2013]LUK-Triumphal arch](https://www.luogu.com.cn/problem/P3554)
  求最小k,二分答案,然后扔进去判断即可
* [P3523 [POI2011]DYN-Dynamite](https://www.luogu.com.cn/problem/P3523)
  难以为继,继续二分算了,然后树形DP求一下每个点是否被覆盖就可以了,设一个离当前点最近的撤离点,一个最远的未被覆盖点,操作一下
* [P3565 [POI2014]HOT-Hotels](https://www.luogu.com.cn/problem/P3565)
* [自贴自链](https://miuyouqwq.blog.luogu.org/solution-p3565)
* [P2607 [ZJOI2008]骑士](https://www.luogu.com.cn/problem/P2607)
  环套树,找到那个环,暴力断开两头DP即可
* [P3174 [HAOI2009]毛毛虫](https://www.luogu.com.cn/problem/P3174)
  找一条特殊最长链即可.
* [P3177 [HAOI2015]树上染色](https://www.luogu.com.cn/problem/P3177)
* 暴力统计贡献
* [P3237 [HNOI2014]米特运输](https://www.luogu.com.cn/problem/P3237)
  没想到吧这是个hash题!但可以用指数+桶做,计算一下每个节点被固定以后的情况,统计起来就可以了
