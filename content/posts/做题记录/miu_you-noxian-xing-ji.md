---
title: Miu_you の线性基
date: 2020-06-07
banner: "images/post-images/1584945867019.jpg"
cover: "images/post-images/1584945867019.jpg"
---

![](../images/post-images/1591519415942.jpg)

给定n个整数（数字可能重复），求在这些数中选取任意个，使得他们的异或和最大。
这就是线性基要做的事情啦!
下面是板子
````cpp
int N=60;
inline void insert(ll x)
	for(int i=N;i+1;--i)
		if(!(x>>i))continue;
		if(!p[i])p[i]=x;return;
		x^=p[i];
int main(){
	for(int i=N;i+1;--i)
		if((p[i]^ans)>ans)
			ans^=p[i];
````

至于怎么理解么,就是要保证每一位都是最大值啦

* [P4570 [BJWC2011]元素](https://www.luogu.com.cn/problem/P4570)
* [P4301 [CQOI2013] 新Nim游戏](https://www.luogu.com.cn/problem/P4301)
* [P4151 [WC2011]最大XOR和路径](https://www.luogu.com.cn/problem/P4151)
* [P3857 [TJOI2008]彩灯](https://www.luogu.com.cn/problem/P3857)
* [P3292 [SCOI2016]幸运数字](https://www.luogu.com.cn/problem/P3292)
