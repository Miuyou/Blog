---
title: Miu_you の 区间DP
date: 2020-03-11
tags:
  - 算法学习
cover: "images/post-images/1584945867019.jpg"
---

![](/images/post-images/1583918620293.jpg)

区间DP就显得没那么有趣了,下面放一些做过的题就好啦

* [P1864 [NOI2009]二叉查找树](https://www.luogu.com.cn/problem/P1864)
  因为按照$val$从小到大插入,所以将数据值排序就可以得到中序遍历,转化成区间问题,将权值离散化,
  设$f_{i,j,k}$表示从$i$到$j$的权值都大于$k$,转移的时候枚举一个中转点$z$,然后转移就可以了
* [P2466 [SDOI2008]Sue的小球](https://www.luogu.com.cn/problem/P2466)
  对于一断已经取完的序列,可以向左还是向右取,取到的点造成的浪费直接计算出来即可
* [P2470 [SCOI2007]压缩](https://www.luogu.com.cn/problem/P2470)
  暴力判断字符串是否相等,然后枚举中间点来合并DP数组即可,默认每个$i-1$前都有一个$M$来简化问题,所以在枚举中间点的$M$合并两个区间的时候要$+1$
* [P4290 [HAOI2008]玩具取名](https://www.luogu.com.cn/problem/P4290)
  多设状态,不要偷懒.是个裸题
* [P4302 [SCOI2003]字符串折叠](https://www.luogu.com.cn/problem/P4302)
  和P2470类似,直接做即可,注意特殊情况
* [P4342 [IOI1998]Polygon](https://www.luogu.com.cn/problem/P4342)
  经典老题,注意细节,
* [P4766 [CERC2014]Outer space invaders](https://www.luogu.com.cn/problem/P4766)
  如果要消灭某个时间点出现的所有敌人,那么花费必然是那个点的最大值,为了DP不重不漏,我们只把被完全覆盖的敌人计入当前答案,那么消灭$i->j$的敌人花费就是完全在这个区间内的最大敌人加上除了消灭这个敌人外的小区间的答案.
* [P4767 [IOI2000]邮局](https://www.luogu.com.cn/problem/P4767)
  枚举邮局数,那么就要去求解每个邮局的最优位置,可以证明出单调性
