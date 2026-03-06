---
title: 春卷の博弈论
date: 2020-11-23
banner: "images/hero/VRChat_2026-01-31_19-40-28.306_2560x1440.png"
cover: "images/hero/VRChat_2026-01-31_19-40-28.306_2560x1440.png"
---

定义 Nim 和 $=a_1 \oplus a_2 \oplus \ldots \oplus a_n$ 。

当且仅当 Nim 和为 $0$ 时，该状态为必败状态；否则该状态为必胜状态。

在一个有向无环图中，只有一个起点，上面有一个棋子，两个玩家轮流沿着有向边推动棋子，不能走的玩家判负。

定义 $\operatorname{mex}$ 函数的值为不属于集合 $S$ 中的最小非负整数，即：

$$
\operatorname{mex}(S)=\min\{x\} \quad (x \notin S, x \in N)
$$

例如 $\operatorname{mex}(\{0, 2, 4\})=1$ ， $\operatorname{mex}(\{1, 2\})=0$ 。

对于状态 $x$ 和它的所有 $k$ 个后继状态 $y_1, y_2, \ldots, y_k$ ，定义 $\operatorname{SG}$ 函数：

$$
\operatorname{SG}(x)=\operatorname{mex}\{\operatorname{SG}(y_1), \operatorname{SG}(y_2), \ldots, \operatorname{SG}(y_k)\}
$$

而对于由 $n$ 个有向图游戏组成的组合游戏，设它们的起点分别为 $s_1, s_2, \ldots, s_n$ ，则有定理： **当且仅当 $\operatorname{SG}(s_1) \oplus \operatorname{SG}(s_2) \oplus \ldots \oplus \operatorname{SG}(s_n) \neq 0$ 时，这个游戏是先手必胜的。**

* [P6665 [清华集训2016] Alice 和 Bob 又在玩游戏](https://www.luogu.com.cn/problem/P6665)

子树互相独立,对于每颗子树,要么删根要么删子节点,删根把子节点全部异或起来就行了,删子节点则要异或上其他子树,则需要全局异或/全局查询/合并/插入,01trie解决即可
