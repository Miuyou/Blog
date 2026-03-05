---
title: "[HNOI2007]梦幻岛宝珠 题解"
date: 2020-03-09
tags:
  - 解题报告
cover: "images/post-images/1583294990170.jpg"
---

![](https://cdn.luogu.com.cn/upload/image_hosting/iskee2vp.png)

这题看起来只是一个01背包,但是庞大的数据范围告诉我们常规手段无法解决.

容量非常大,$2^{30}$,没有任何的通用优化手段可以解决,但是发现每个物品的容量都为$(a*2^{b})$,同时$a*b$很小,考虑先分层,将$2^i$作为分层的依据,且最多分成$b$层,考虑对于每一层进行01DP,然后再合并每一层的dp值.

这里用到了泛化的思想,合并dp值在正整数域的情况下是$O(n^2)$的.考虑合并时,总容量为之前所有层的容量之和.

这题的基本思路其他题解已经写的很好了,感谢他们的工作.但是稍微有一些遗憾.

1.合并的原理是什么?

关于泛化的概念可以去看背包九讲,因为这里的容量是基于正整数域的,那么我们需要将两组dp数值两两合并.

参照背包九讲的说法:"如果面对两个泛化物品h和l，要用给定的费用从这两个泛化物品中得到最大的价值.怎么求呢？事实上，对于一个给定的费用v，只需枚举将这个费用如何分配给两个泛化物品就可以了。同样的，对于$0..V$的每一个整数v，可以求得费用v分配到h和l中的最大价值$f(v)$。也即$f(v)=max(h_k+l_{v-k})$且$0<=k<=v$。可以看到，f也是一个由泛化物品h和l决定的定义域为0..V的函数，也就是说，f是一个由泛化物品h和l决定的泛化物品。"

按照这个思想,我们就能进行如下合并
````cpp
for (int j = sum[i]; j > -1; --j) {
				for (int k = 0; k <= j; ++k) {
					dp[i][j] = max(dp[i][j], dp[i][j - k] + dp[i - 1][min(sum[i - 1], (k << 1) | ((m >> (i - 1)) & 1))]);
				}
			}
````

直接套模板就行了,但是(((m >> (i - 1)) & 1)这是个啥???
$k<<1$是分配给h的容量的,分配了k个单位,然后因为退位了所以乘以二,但是还有一部分容量没有被计算,那就是背包容量在当前位的单位,所以判断一下m的当前位是否为1.

2.每一层的单位总量是什么?
代码中有这么一句
````cpp
sum[i] += (sum[i - 1] + 1) / 2;
````

为什么要加一?
如果现在$sum[i]==0$,且$sum[i-1]==1$,如果向下取整,那么在i这一层无法合并第i-1层,所以应当向上取整,不怕多只怕少(雾

下面就是完整代码了
````cpp
#define _CRT_SECURE_NO_DEPRECATE
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<vector>
#include<cmath>
#include<queue>
#include<map>
#include<cstring>
#include<set>
using namespace std;
int n, m, maxx;
int sum[35];
long long dp[35][1050];
vector<int>w[35], v[35];
inline int lowbit(int x) {
	return x & (-x);
}
int main() {
	while (1) {
		memset(sum, 0, sizeof(sum));
		scanf("%d%d", &n, &m);
		if (n == -1 && m == -1)return 0;
		maxx = 0;
		memset(dp, 0, sizeof(dp));
		for (int i = 1; i <= n; ++i) {
			int x, y;
			scanf("%d%d", &x, &y);
			int k = 0;
			while (!(x & 1)) {
				x >>= 1;
				++k;
				if (!x)break;
			}w[k].push_back(x);
			sum[k] += x;
			maxx = max(maxx, k);
			v[k].push_back(y);
		}

		for (int i = 0; i <= maxx; ++i) {
			for (int j = 0; j < w[i].size(); ++j) {
				for (int k = sum[i]; k >= w[i][j]; --k) {
					dp[i][k] = max(dp[i][k], dp[i][k - w[i][j]] + v[i][j]);
				}
			}
		}
		while (m >> maxx)++maxx; --maxx;
		for (int i = 1; i <= maxx; ++i) {
			sum[i] += (sum[i - 1] + 1) / 2;
			for (int j = sum[i]; j > -1; --j) {
				for (int k = 0; k <= j; ++k) {
					dp[i][j] = max(dp[i][j], dp[i][j - k] + dp[i - 1][min(sum[i - 1], (k << 1) | ((m >> (i - 1)) & 1))]);
				}
			}
			//考虑一个事情,我们当前停留的位置到底在哪里,例如一个110101   如果现在在第5位   j={1,2,3},发现后面还有一串没有分配
		}

		cout << dp[maxx][1] << endl;
		for (int i = 0; i <= 30; ++i) {
			v[i].clear();
			w[i].clear();
		}
	}
}
````
