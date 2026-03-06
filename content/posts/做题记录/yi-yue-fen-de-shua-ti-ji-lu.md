---
title: 一月份的刷题记录
date: 2020-03-23
tags:
  - 做题计划
banner: "images/post-images/WallpaperEngineLockOverride_randomIVUSTT.jpg"
cover: "images/post-images/WallpaperEngineLockOverride_randomIVUSTT.jpg"
---

坑!好大的坑!要填的坑!

好啦开始补坑吧.

****数据结构!****

[P4588数学计算](https://www.luogu.com.cn/problem/P4588)

qwq,看起来只有一个数字但由于有许多的版本所以是一个线段树,暴力维护操作序列,可以用log的复杂度来合并操作,如果除那么就取消某一次乘法的影响

[P5889 跳树](https://www.luogu.com.cn/problem/P5889)

贼有趣,同理,暴力搞这个操作显然O(N)超时,需要每次logn来合并求解,那么我们需要存储一个区间的信息,发现如果能往儿子节点走然后又要走父亲肯定会相互抵消,那么经过消除后每个区间可以表示为有a个走父亲,b个走儿子,再用一个数值来以01的形式储存走哪边就可以,用struct存,题解用pair害死我了,改了半天,挺注重细节的

[P2161会场预约](https://www.luogu.com.cn/problem/P2161)

有趣的树状数组套二分,二分找左端点,如果有且被覆盖了就删去,否则打断,加线,因为树状数组没法维护线段所以机灵地采取只加单点的形式.

[自己的sb题](https://www.luogu.com.cn/problem/T115483)

暴力01trie就完事了

[P4605 颜色](https://www.luogu.com.cn/problem/P4065)

神题,讨论什么时候可以选择哪段区间,暴力枚举右端点,接下来要在logn的复杂度内求解左端点,可知每一个能被统计的右端点必然是end[a[i]],当达到可搞位置时,直接把fir+1到end锁定,因为这些段必然不会产生贡献,以后也不会,接着求解左端点,先将右端点入栈,若end<=i则代表可统计,i是单调递增的,所以栈是单调的,不断--r到合适点,然后区间查询就可以了

[P4344脑洞治疗仪](https://www.luogu.com.cn/problem/P4344)

区间覆盖练手题,就是搞搞搞就完事了

[P4064加法](https://www.luogu.com.cn/problem/P4064)

二分+排序,直接求难做,直接暴力二分最大值,下限边读边做,上限就是下限+a\*k,~~check函数的话就是乱写就可以了~~,以l为关键字排序,双指针往后跑,不行了就加进去

[P2471降雨量](https://www.luogu.com.cn/problem/P2471)

谁写谁sb,孤儿细节题(

[P3396哈希冲突](https://www.luogu.com.cn/problem/P3396)

分块暴力统计,预处理好f数组,能输出直接输出,边界暴力重构

[P3863序列](https://www.luogu.com.cn/problem/P3863)

orz鬼题,分块就完事了
