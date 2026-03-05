---
title: "Miu_you的字符串!"
date: 2020-06-07
tags:
  - 算法学习
cover: "images/post-images/1583715537254.jpg"
---

![](/images/post-images/1591517369461.jpg)

超级可爱的字符串!

* [P5357 【模板】AC自动机（二次加强版）](https://www.luogu.com.cn/problem/P5357)
  板子题!
* [「HAOI2017」字符串](https://loj.ac/problem/2278)
  字符串神题!虽然还是个字符串萌新还是学会了怎么做欸
  考虑题目的意思就是$LCP(A,B)+LCS(A,B)+k<=|A|$,考虑起点相同时,如果有$LCP(A,B)+LCS(A,B)+k-1<=|A|$则必有$LCP(A,B)+LCS(A,B)+k<=|A|$,题目要求的匹配可以视为若干个二元组,即某个前缀要被匹配的最短后缀,考虑到这样计算会有重复$(不相同长度<k)$,那么就要减去$LCP(A,B)+LCS(A,B)+k-1<=|A|$的匹配数,
  模板穿建立自动机,建立fail树,同时匹配串计算出每个前缀能到达的后缀,将这些二元组丢到树状数组上去维护即可.
