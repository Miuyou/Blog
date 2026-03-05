---
title: Miu_you の 单调队列
date: 2020-03-25
cover: "images/post-images/1583748331912.png"
---

* [P2219 [HAOI2007]修筑绿化带](https://www.luogu.com.cn/problem/P2219)
  先搞一个二维前缀和,然后求出大块块和小块块的数值,然后根据这个跑二维单调队列
* [P2254 [NOI2005]瑰丽华尔兹](https://www.luogu.com.cn/problem/P2254)
* 将每个点压进去,对于每行每列都采用单调队列优化解决
* [P2569 [SCOI2010]股票交易](https://www.luogu.com.cn/problem/P2569)
  将以前的dp值直接转移过来,这样这可以点对转移,然后单调队列维护
* [P3071 [USACO13JAN]Seating G](https://www.luogu.com.cn/problem/P3071)
  憨批标签,挨打,其实是一个线段树,仿照最大字段和做即可
* [P3084 [USACO13OPEN]Photo G](https://www.luogu.com.cn/problem/P3084)
  难做就DP,考虑对于每个点求出一个转移集合,然后单调队列维护即可
* [P3117 [USACO15JAN]Cow Rectangles G](https://www.luogu.com.cn/problem/P3117)
  因为要在一个合法矩阵里面求最小矩阵,所以悬线法似乎不能很好的解决这个问题,所以去枚举合法矩形然后求解
* [P3118 [USACO15JAN]Moovie Mooving G](https://www.luogu.com.cn/problem/P3118)
  所以这和单调队列有啥关系
* [P3195 [HNOI2008]玩具装箱](https://www.luogu.com.cn/problem/P3195)
  经典斜率优化
* [P3438 [POI2006]ZAB-Frogs](https://www.luogu.com.cn/problem/P3438)
  细节巨多的斜率优化
* [P3470 [POI2008]BBB-BBB](https://www.luogu.com.cn/problem/P3470)
  仔细想想没有单调队列呀,考虑如何去做,枚举起点无法避免,然后要求$O(1)$计算,考虑到欠钱最厉害的地方被补上了就可以了,那么去搞一个前缀最小和+后缀最小和处理就可以啦!
* [P3474 [POI2008]KUP-Plot purchase](https://www.luogu.com.cn/problem/P3474)
  海星垂线法直接做
* [P3515 [POI2011]Lightning Conductor](https://www.luogu.com.cn/problem/P3515)
  好!其实是单调性优化...对于每一个数字都要$O(log)$处理,那么考虑如何做到$O(log)$转移,
  因为$a_j\le a_i+p-\sqrt{|i-j|}$,所以$a_j+\sqrt{|i-j|}\le a_i+p$,那么$a_i+p$只要大于最大的值就可以了,那么考虑到$\sqrt{|i-j|}$这个东西会随着$i$变化变化,映射到了平面图上就是一些曲线.发现有一些曲线是不会被考虑的直接去掉,而且对于一个点,必然有一条线最高,考虑到这些曲线都是弧度相等高度不同的,那么一条弧线只会被后来的起点比他高的超过,也就是说可以计算出当前弧线什么时候超过前一条弧线,二分求解,单调队列维护.
* [P3564 [POI2014]BAR-Salad Bar](https://www.luogu.com.cn/problem/P3564)
  tmd,以后不看标签了,一看二分答案,想都没想就去二分了答案区间,结果喜提$80pts$的好成绩,调了调发现从头到尾都是错的,根本不符合二分的性质.而一开始的想法反而是正确的,直接去找合法区间,枚举右端点,一个单调队列维护能取得最左端,就是第一个前缀和大于他的数的位置+1,然后再开一个单调递增的单调队列来二分找到可行的位置,因为第一个被破坏惹啦.
* [P3587 [POI2015]POD](https://www.luogu.com.cn/problem/P3587)
* [P3714 [BJOI2017]树的难题](https://www.luogu.com.cn/problem/P3714)
* [P4259 [Code+#3]寻找车位](https://www.luogu.com.cn/problem/P4259)
* [P4744 [Wind Festival]Iron Man](https://www.luogu.com.cn/problem/P4744)
* [P4852 yyf hates choukapai](https://www.luogu.com.cn/problem/P4852)
* [P5665 划分](https://www.luogu.com.cn/problem/P5665)
