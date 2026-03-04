---
title: Miu_you の动态规划
date: 2020-11-06
tags:
  - 算法学习
---

动态规划也炒鸡可爱的说!
![](/images/post-images/1583457992014.jpg)

欸,这篇废了,等所有子文章编辑完成了再来搞

## $树形DP$

* [P1131 [ZJOI2007]时态同步](https://www.luogu.com.cn/problem/P1131)
  简单树形DP,让所有点都和最慢得一样慢就可以了

## $杂类DP$

* [P1169 [ZJOI2007]棋盘制作](https://www.luogu.com.cn/problem/P1169)
  悬线法
* [P1437 [HNOI2004]敲砖块](https://www.luogu.com.cn/problem/P1437)
  一般向DP
* [P1841 [JSOI2007]重要的城市](https://www.luogu.com.cn/problem/P1841)
  无可取代得最短路经过点为重要城市,也不知道和dp有什么关系
* [P1772 [ZJOI2006]物流运输](https://www.luogu.com.cn/problem/P1772)
  奇怪のDP,发现无法简单得跑一个分层图最短路,因为有着更改路径得操作,那么就要dp了,枚举是什么时候更改路径得

## $数学DP$

* [P1450 [HAOI2008]硬币购物](https://www.luogu.com.cn/problem/P1450)
  是榕树,我死了,不合法方案为强制选$b_i$+1个
* [P2059 [JLOI2013]卡牌游戏](https://www.luogu.com.cn/problem/P2059)
  窝又死了,设$f_{i,j}$表示第i个人经过j-1轮会胜出,因为他的位置在不断变化,所以每次把庄家提到1的位置上,$f_{i,j}+=f_{x,j-1}/m$,x为当前位置-新的庄家的位置
* [P2473 [SCOI2008]奖励关](https://www.luogu.com.cn/problem/P2473)
  考虑到正着dp甚至不知道要输出什么,考虑反过来,代码不用改多少就变成反着的啦,然后就加加加就行了,考虑到有可能当前集合已经选过当前礼品了,所以也可以取$max{dp_{i+1,j|(...)},dp_{i+1,j}+a_k}$,因为题目说了"假设你采取最优策略"那么在能够选择拿或不拿的时候,自然拿走期望最高的啦

## $状态压缩DP$

* [P1896 [SCOI2005]互不侵犯](https://www.luogu.com.cn/problem/P1896)
  简单的状态压缩

## $神仙DP$

* [P2051 [AHOI2009]中国象棋](https://www.luogu.com.cn/problem/P2051)
  数据太大了,没法状态压缩,那么就dp喽,要详细的考虑到每种情况
* [P4158 [SCOI2009]粉刷匠](https://www.luogu.com.cn/problem/P4158)
  比较难想又比较难写的DP,其实熟练以后会觉得挺好写的.
