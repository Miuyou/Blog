---
title: Miu_you の 数学知识
date: 2020-11-04
---

重新整活
下面是数学知识区

# 数学

## 一.数论

### 1.简单前置

跳过

### 2.各式定理

费马小定理
若 $p$ 为素数， $\gcd(a, p) = 1$ ，则 $a^{p - 1} \equiv 1 \pmod{p}$ 。
另一个形式：对于任意整数 $a$ ，有 $a^p \equiv a \pmod{p}$ 。

欧拉定理
若 $\gcd(a, m) = 1$ ，则 $a^{\varphi(m)} \equiv 1 \pmod{m}$ 。

扩展欧拉定理

$$
a^b\equiv
\begin{cases}
a^{b\bmod\varphi(p)},\,&\gcd(a,\,p)=1\\
a^b,&\gcd(a,\,p)\ne1,\,b<\varphi(p)\\
a^{b\bmod\varphi(p)+\varphi(p)},&\gcd(a,\,p)\ne1,\,b\ge\varphi(p)
\end{cases}
\pmod p
$$

裴蜀定理
设 $a,b$ 是不全为零的整数，则存在整数 $x,y$ , 使得 $ax+by=\gcd(a,b)$ .

### 3.类欧几里得算法

### 4. BSGS/EXBSGS

求$a^x \equiv b \pmod p$

算法描述
令 $x = A \left \lceil \sqrt p \right \rceil - B$ ，其中 $0\le A,B \le \left \lceil \sqrt p \right \rceil$ ，则有 $a^{A\left \lceil \sqrt p \right \rceil -B} \equiv b \pmod p$ ，稍加变换，则有 $a^{A\left \lceil \sqrt p \right \rceil} \equiv ba^B \pmod p$ 。

我们已知的是 $a,b$ ，所以我们可以先算出等式右边的 $ba^B$ 的所有取值，枚举 $B$ ，用 `hash` / `map` 存下来，然后逐一计算 $a^{A\left \lceil \sqrt p \right \rceil}$ ，枚举 $A$ ，寻找是否有与之相等的 $ba^B$ ，从而我们可以得到所有的 $x$ ， $x=A \left \lceil \sqrt p \right \rceil - B$ 。

注意到 $A,B$ 均小于 $\left \lceil \sqrt p \right \rceil$ ，所以时间复杂度为 $\Theta\left (\sqrt p\right )$ ，用 `map` 则多一个 $\log$
````cpp
int n, m, p;
inline int gcd(int a, int b) {
	if (!b)return a;
	return gcd(b, a % b);
}
map<int, int>q;
int ksm(int a, int b, int p) {
	int ans = 1;
	while (b) {
		if (b & 1)ans = ans * a % p;
		a = a * a % p;
		b >>= 1;
	}return ans;
}
int bsgs(int a, int b, int p) {
	q.clear();
	int k = ceil(sqrt(p));
	//cout << a << "  " << b << "   " << p << endl;

	for (int i = 1; i <= k; ++i) {
		b = b * a % p;
		q[b] = i;
	}int z = ksm(a, k, p);
	b = 1;
	for (int i = 1; i <= k; ++i) {
		b = b * z % p;
		if (q[b])return (i * k - q[b] + p) % p;
	}return -1;
}
int x, y;
void exgcd(int a, int b) {
	if (!b) {
		x = 1;
		y = 0;
	}
	else {
		exgcd(b, a % b);
		int k = x;
		x = y;
		y = k - a / b * y;
	}
}
int inv(int a, int b) {
	exgcd(a, b);
	return (x%b + b) % b;
}
int exbsgs() {
	if (m == 1 || p == 1)return 0;
	int g = gcd(n, p);
	int k = 0, a = 1;
	while (g > 1) {
		if (m % g)return -1;
		++k;
		p /= g; m /= g;
		a = a * n / g % p;
		if (a == m)return k;
		g = gcd(n, p);
	}
	int f = bsgs(n, m *inv(a,p)% p, p);
	if (f == -1)return -1;
	else return f + k;
}
````

### 5.中国剩余定理

CRT
````cpp
ll x, y, g;
void exgcd(ll a, ll b) {
	if (!b) {
		x = 1; y = 0;
		g = a;
	}
	else {
		exgcd(b, a % b);
		ll k = x;
		x = y;
		y = k - a / b * y;
	}
}
int main() {
	for (int i = 1; i <= n; ++i) {
		ll G = sum / z[i];
		exgcd(G, z[i]);
		ans = ((ans+x * s[i] * G) % sum + sum) % sum;
	}
}
````

EXCRT
````cpp
ll x, y, g;
void exgcd(ll a, ll b) {
	if (!b) {
		x = 1; y = 0;
		g = a;
	}
	else {
		exgcd(b, a % b);
		ll k = x;
		x = y;
		y = k - a / b * y;
	}
}

ll a[100005], b[100005];
ll mul(ll n, ll k, ll mod) {
	ll ans = 0;
	while (k) {
		if (k & 1)ans = (ans + n) % mod;
		k >>= 1;
		n = (n + n) % mod;
	}return ans;
}
int main() {
    ll p=a[1], q=b[1];
	for (int i = 2; i <= n; ++i) {
		ll G = ((a[i] - p) % b[i] + b[i]) % b[i];
		exgcd(q, b[i]);
		x = mul(x, G / g, b[i]);
		p += q * x;
		q *= b[i] / g;
		p = (p + q) % q;
	}
}
````

### 莫反和他的兄弟们

先放放,咕咕咕

## 二.计数/代数

### 1.组合

---

一堆定理

卢卡斯定理

$$
\binom{n}{m}\bmod p = \binom{\left\lfloor n/p \right\rfloor}{\left\lfloor m/p\right\rfloor}\cdot\binom{n\bmod p}{m\bmod p}\bmod p
$$

唯一分解定理

$$
p={q_1}^{\alpha_1}\cdot{q_2}^{\alpha_2}\cdots{q_r}^{\alpha_r}=\prod_{i=1}^{r}{q_i}^{\alpha_i}
$$

扩展Lucas

$$
\left\{
\begin{aligned}
a_1\equiv C_n^m&\pmod {{q_1}^{\alpha_1}}\\
a_2\equiv C_n^m&\pmod {{q_2}^{\alpha_2}}\\
&\cdots\\
a_r\equiv C_n^m&\pmod {{q_r}^{\alpha_r}}\\
\end{aligned}
\right.
$$
````cpp
LL CRT(int n, LL* a, LL* m) {
  LL M = 1, p = 0;
  for (int i = 1; i <= n; i++) M = M * m[i];
  for (int i = 1; i <= n; i++) {
    LL w = M / m[i], x, y;
    exgcd(w, m[i], x, y);
    p = (p + a[i] * w * x % mod) % mod;
  }
  return (p % mod + mod) % mod;
}
LL calc(LL n, LL x, LL P) {
  if (!n) return 1;
  LL s = 1;
  for (int i = 1; i <= P; i++)
    if (i % x) s = s * i % P;
  s = Pow(s, n / P, P);
  for (int i = n / P * P + 1; i <= n; i++)
    if (i % x) s = s * i % P;
  return s * calc(n / x, x, P) % P;
}
LL multilucas(LL m, LL n, LL x, LL P) {
  int cnt = 0;
  for (int i = m; i; i /= x) cnt += i / x;
  for (int i = n; i; i /= x) cnt -= i / x;
  for (int i = m - n; i; i /= x) cnt -= i / x;
  return Pow(x, cnt, P) % P * calc(m, x, P) % P * inverse(calc(n, x, P), P) %
         P * inverse(calc(m - n, x, P), P) % P;
}
LL exlucas(LL m, LL n, LL P) {
  int cnt = 0;
  LL p[20], a[20];
  for (LL i = 2; i * i <= P; i++) {
    if (P % i == 0) {
      p[++cnt] = 1;
      while (P % i == 0) p[cnt] = p[cnt] * i, P /= i;
      a[cnt] = multilucas(m, n, i, p[cnt]);
    }
  }
  if (P > 1) p[++cnt] = P, a[cnt] = multilucas(m, n, P, P);
  return CRT(cnt, a, p);
}
````

多重组合数/多重集的排列数

$\binom{r+k-1}{k-1}$

当$r>\min(n_i)$

$Ans=\sum_{p=0}^k(-1)^p\sum_{A}\binom{k+r-1-\sum_{A} n_{A_i}-p}{k-1}$

不相邻排列的组合有$\binom{n-k+1}{k}$

错位排列$f(n)=(n-1)(f(n-1)+f(n-2))$

部分圆排列

$\mathrm Q_n^r = \frac{\mathrm A_n^r}{r} = \frac{n!}{r \times (n-r)!}$

## 组合数性质 | 二项式推论

由于组合数在 OI 中十分重要，因此在此介绍一些组合数的性质。

$$
\binom{n}{m}=\binom{n}{n-m}\tag{1}
$$

相当于将选出的集合对全集取补集，故数值不变。（对称性）

$$
\binom{n}{k} = \frac{n}{k} \binom{n-1}{k-1}\tag{2}
$$

由定义导出的递推式。

$$
\binom{n}{m}=\binom{n-1}{m}+\binom{n-1}{m-1}\tag{3}
$$

组合数的递推式（杨辉三角的公式表达）。我们可以利用这个式子，在 $O(n^2)$ 的复杂度下推导组合数。

$$
\binom{n}{0}+\binom{n}{1}+\cdots+\binom{n}{n}=\sum_{i=0}^n\binom{n}{i}=2^n\tag{4}
$$

这是二项式定理的特殊情况。取 $a=b=1$ 就得到上式。

$$
\sum_{i=0}^n(-1)^i\binom{n}{i}=0\tag{5}
$$

二项式定理的另一种特殊情况，可取 $a=1, b=-1$ 。

$$
\sum_{i=0}^m \binom{n}{i}\binom{m}{m-i} = \binom{m+n}{m}\ \ \ (n \geq m)\tag{6}
$$

拆组合数的式子，在处理某些数据结构题时会用到。

$$
\sum_{i=0}^n\binom{n}{i}^2=\binom{2n}{n}\tag{7}
$$

这是 $(6)$ 的特殊情况，取 $n=m$ 即可。

$$
\sum_{i=0}^ni\binom{n}{i}=n2^{n-1}\tag{8}
$$

带权和的一个式子，通过对 $(3)$ 对应的多项式函数求导可以得证。

$$
\sum_{i=0}^ni^2\binom{n}{i}=n(n+1)2^{n-2}\tag{9}
$$

与上式类似，可以通过对多项式函数求导证明。

$$
\sum_{l=0}^n\binom{l}{k} = \binom{n+1}{k+1}\tag{10}
$$

可以通过组合意义证明，在恒等式证明中较常用。

$$
\binom{n}{r}\binom{r}{k} = \binom{n}{k}\binom{n-k}{r-k}\tag{11}
$$

通过定义可以证明。

$$
\sum_{i=0}^n\binom{n-i}{i}=F_{n+1}\tag{12}
$$

其中 $F$ 是斐波那契数列。

$$
\sum_{l=0}^n \binom{l}{k} = \binom{n+1}{k+1}\tag{13}
$$

通过组合分析——考虑 $S={a_1, a_2, \cdots, a_{n+1}}$ 的 $k+1$ 子集数可以得证。

---

* [P5481 [BJOI2015] 糖果](https://www.luogu.com.cn/problem/P5481)(将排列问题转化为组合问题求解)
* [P5377 [THUPC2019]鸽鸽的分割](https://www.luogu.com.cn/problem/P5377)(欧拉公式的应用,$F-E+V=2$,$V=n+\binom{n}{4}$,$E=n+\binom{n}{2}+2*\binom{n}{4}$,平面图的F要减一,为$F=1+\binom{n}{2}+\binom{n}{4}$)
* [P5376 [THUPC2019]过河卒二](https://www.luogu.com.cn/problem/P5376)(内紧则散,尝试去扩大模型简化问题)
* [P5339 [TJOI2019]唱、跳、rap和篮球](https://www.luogu.com.cn/problem/P5339)(至少可榕树,恰好不行,所以考虑至少k个cxk然后去榕树一波,一层套一层的组合可以折半组合)
* [P4562 [JXOI2018]游戏](https://www.luogu.com.cn/problem/P4562)
* [P3330 [ZJOI2011]看电影](https://www.luogu.com.cn/problem/P3330)
* [P3301 [SDOI2013]方程](https://www.luogu.com.cn/problem/P3301)
* [P3255 [JLOI2013]地形生成](https://www.luogu.com.cn/problem/P3255)
* [P2481 [SDOI2010]代码拍卖会](https://www.luogu.com.cn/problem/P2481)
* [P3214 [HNOI2011]卡农](https://www.luogu.com.cn/problem/P3214)
* [P2154 [SDOI2009]虔诚的墓主人](https://www.luogu.com.cn/problem/P2154)
* [P2963 [USACO09NOV]Cow Rescue G](https://www.luogu.com.cn/problem/P2963)
* [P3166 [CQOI2014]数三角形](https://www.luogu.com.cn/problem/P3166)
* [P4187 [USACO18JAN]Stamp Painting G](https://www.luogu.com.cn/problem/P4187)
* [P5547 [BJ United Round #3] 三色树](https://www.luogu.com.cn/problem/P5547)
* [P6735 「Wdsr-2」环](https://www.luogu.com.cn/problem/P6735)
* [P6478 [NOI Online #2 提高组]游戏](https://www.luogu.com.cn/problem/P6478)
* [CF294C Shaass and Lights](https://www.luogu.com.cn/problem/CF294C)
* [CF979E Kuro and Topological Parity](https://www.luogu.com.cn/problem/CF979E)
* [CF708E Student's Camp](https://www.luogu.com.cn/problem/CF708E)

---

### 2.概率期望

没救了,随便写写
期望和DP是好兄弟
如果不是DP,那么就是矩阵
有后效性就矩阵,无后效性就DP
有后效性矩阵TLE代表可以优化到无后效性

* [P2221 [HAOI2012]高速公路](https://www.luogu.com.cn/problem/P2221)
* [P2473 [SCOI2008] 奖励关](https://www.luogu.com.cn/problem/P2473)
* [P2474 [SCOI2008]天平](https://www.luogu.com.cn/problem/P2474)
* [P3211 [HNOI2011]XOR和路径](https://www.luogu.com.cn/problem/P3211)
* [P3232 [HNOI2013]游走](https://www.luogu.com.cn/problem/P3232)
* [P3239 [HNOI2015]亚瑟王](https://www.luogu.com.cn/problem/P3239)
* [P3317 [SDOI2014]重建](https://www.luogu.com.cn/problem/P3317)
* [P3644 [APIO2015]八邻旁之桥](https://www.luogu.com.cn/problem/P3644)
* [P3750 [六省联考2017]分手是祝愿](https://www.luogu.com.cn/problem/P3750)
* [P3830 [SHOI2012]随机树](https://www.luogu.com.cn/problem/P3830)
* [P3863 序列](https://www.luogu.com.cn/problem/P3863)
* [P3978 [TJOI2015]概率论](https://www.luogu.com.cn/problem/P3978)
* [P4206 [NOI2005]聪聪与可可](https://www.luogu.com.cn/problem/P4206)
* [P4284 [SHOI2014]概率充电器](https://www.luogu.com.cn/problem/P4284)
* [P4321 随机漫游](https://www.luogu.com.cn/problem/P4321)
* [P4564 [CTSC2018]假面](https://www.luogu.com.cn/problem/P4564)
* [P4657 [CEOI2017]Chase](https://www.luogu.com.cn/problem/P4657)
* [P4853 yyf hates dagequ](https://www.luogu.com.cn/problem/P4853)
* [P5437 【XR-2】约定](https://www.luogu.com.cn/problem/P5437)
* [P5442 【XR-2】约定 (加强版)](https://www.luogu.com.cn/problem/P5442)
* [P6030 [SDOI2012]走迷宫](https://www.luogu.com.cn/problem/P6030)
* [P2081 [NOI2012]迷失游乐园](https://www.luogu.com.cn/problem/P2081)
* [P2538 [SCOI2008]城堡](https://www.luogu.com.cn/problem/P2538)
* [P3343 [ZJOI2015]地震后的幻想乡](https://www.luogu.com.cn/problem/P3343)
* [P3600 随机数生成器](https://www.luogu.com.cn/problem/P3600)
* [P3779 [SDOI2017]龙与地下城](https://www.luogu.com.cn/problem/P3779)
* [P4232 无意识之外的捉迷藏](https://www.luogu.com.cn/problem/P4232)
* [P4223 期望逆序对](https://www.luogu.com.cn/problem/P4223)
* [P4457 [BJOI2018]治疗之雨](https://www.luogu.com.cn/problem/P4457)
* [P4927 [1007]梦美与线段树](https://www.luogu.com.cn/problem/P4927)
* [P4007 小 Y 和恐怖的奴隶主](https://www.luogu.com.cn/problem/P4007)
* [P3923 大学数学题](https://www.luogu.com.cn/problem/P3923)
* [P3793 由乃救爷爷](https://www.luogu.com.cn/problem/P3793)

### 3.线性基

线性基是向量空间的一组基，通常可以解决有关异或的一些题目。
通俗一点的讲法就是由一个集合构造出来的另一个集合，它有以下几个性质：

* 线性基的元素能相互异或得到原集合的元素的所有相互异或得到的值。
* 线性基是满足性质 1 的最小的集合。
* 线性基没有异或和为 0 的子集。
* 线性基中每个元素的异或方案唯一，也就是说，线性基中不同的异或组合异或出的数都是不一样的。
* 线性基中每个元素的二进制最高位互不相同。

构造线性基的方法如下：

对原集合的每个数 p 转为二进制，从高位向低位扫，对于第 $x$ 位是 1 的，如果 $a_x$ 不存在，那么令 $a_x=p$ 并结束扫描，如果存在，令 $p=p~\text{xor}~a_x$ 。

代码：
````cpp
inline void insert(long long x) {
  for (int i = 55; i + 1; i--) {
    if (!(x >> i))  // x的第i位是0
      continue;
    if (!p[i]) {
      p[i] = x;
      break;
    }
    x ^= p[i];
  }
}
````

### 4.高斯消元

代码如下,约旦消元
````cpp
for(re int i=1;i<=n;++i){
		re int max=i;
		for(re int j=i+1;j<=n;++j){
			if(fabs(a[j][i])>fabs(a[max][i])){
				max=j;
			}
		}
		swap(a[i],a[max]);
		if(!a[i][i]){
			puts("No Solution");
			return 0;
		}
		for(re int j=1;j<=n;++j){
			if(j!=i){
				re D temp=a[j][i]/a[i][i];
				for(re int k=i+1;k<=n+1;++k){
					a[j][k]-=a[i][k]*temp;
				}
			}
		}
	}
````

注意!模数不为质数咋搞呢?
````cpp
inline void gaoss(int n){
	int ans=1ll;
	for(int i=1;i<=n;++i){
		for(int k=i+1;k<=n;++k)
		while(f[k][i]){
			int tmp=f[i][i]/f[k][i];
			for(int j=i;j<=n;++j)f[i][j]=(f[i][j]-1ll*tmp*f[k][j]%mod+mod)%mod;
			std::swap(f[i],f[k]);
			ans=-ans;
		}
		ans=(1ll*ans*f[i][i]%mod+mod)%mod;
	}cout<<ans<<endl;
}
````

### 5.矩阵

### 贝尔数

递推公式：

$$
B_{n+1}=\sum_{k=0}^n\binom{n}{k}B_{k}
$$

每个贝尔数都是相应的第二类斯特林数的和。
因为第二类斯特林数是把基数为 $n$ 的集合划分为正好 $k$ 个非空集的方法数目。

$$
B_{n} = \sum_{k=0}^nS(n,k)
$$
````cpp
  const int maxn = 2000 + 5;
    int bell[maxn][maxn];
    void f(int n) {
      bell[1][1] = 1;
      for (int i = 2; i <= n; i++) {
        bell[i][1] = bell[i - 1][i - 1];
        for (int j = 2; j <= i; j++)
          bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1];
      }
    }
````

### catalan数

$H_n = \binom{2n}{n} - \binom{2n}{n-1}$

路径计数问题
非降路径是指只能向上或向右走的路径。

1. 从 $(0,0)$ 到 $(m,n)$ 的非降路径数等于 $m$ 个 $x$ 和 $n$ 个 $y$ 的排列数，即 $\dbinom{n + m}{m}$ 。
2. 从 $(0,0)$ 到 $(n,n)$ 的除端点外不接触直线 $y=x$ 的非降路径数：
   先考虑 $y=x$ 下方的路径，都是从 $(0, 0)$ 出发，经过 $(1, 0)$ 及 $(n, n-1)$ 到 $(n,n)$ ，可以看做是 $(1,0)$ 到 $(n,n-1)$ 不接触 $y=x$ 的非降路径数。
   所有的的非降路径有 $\dbinom{2n-2}{n-1}$ 条。对于这里面任意一条接触了 $y=x$ 的路径，可以把它最后离开这条线的点到 $(1,0)$ 之间的部分关于 $y=x$ 对称变换，就得到从 $(0,1)$ 到 $(n,n-1)$ 的一条非降路径。反之也成立。从而 $y=x$ 下方的非降路径数是 $\dbinom{2n-2}{n-1} - \dbinom{2n-2}{n}$ 。根据对称性可知所求答案为 $2\dbinom{2n-2}{n-1} - 2\dbinom{2n-2}{n}$ 。
3. 从 $(0,0)$ 到 $(n,n)$ 的除端点外不穿过直线 $y=x$ 的非降路径数：
   用类似的方法可以得到： $\dfrac{2}{n+1}\dbinom{2n}{n}$

### Stirling Number

**第一类斯特林数** （斯特林轮换数） $\begin{bmatrix}n\\ k\end{bmatrix}$ 表示将 $n$ 个两两不同的元素，划分为 $k$ 个非空圆排列的方案数。

### 递推式

$$
\begin{bmatrix}n\\ k\end{bmatrix}=\begin{bmatrix}n-1\\ k-1\end{bmatrix}+(n-1)\begin{bmatrix}n-1\\ k\end{bmatrix}
$$

边界是 $\begin{bmatrix}n\\ 0\end{bmatrix}=[n=0]$ 。

**第二类斯特林数** （斯特林子集数） $\begin{Bmatrix}n\\ k\end{Bmatrix}$ 表示将 $n$ 个两两不同的元素，划分为 $k$ 个非空子集的方案数。

### 递推式

$$
\begin{Bmatrix}n\\ k\end{Bmatrix}=\begin{Bmatrix}n-1\\ k-1\end{Bmatrix}+k\begin{Bmatrix}n-1\\ k\end{Bmatrix}
$$

边界是 $\begin{Bmatrix}n\\ 0\end{Bmatrix}=[n=0]$ 。

## 应用

[孤儿题](http://csp.ac/contest/43/problem/291)

### 上升幂与普通幂的相互转化

我们记上升阶乘幂 $x^{\overline{n}}=\prod_{k=0}^{n-1} (x+k)$ 。

则可以利用下面的恒等式将上升幂转化为普通幂：

$$
x^{\overline{n}}=\sum_{k} \begin{bmatrix}n\\ k\end{bmatrix} x^k
$$

如果将普通幂转化为上升幂，则有下面的恒等式：

$$
x^n=\sum_{k} \begin{Bmatrix}n\\ k\end{Bmatrix} (-1)^{n-k} x^{\overline{k}}
$$

### 下降幂与普通幂的相互转化

我们记下降阶乘幂 $x^{\underline{n}}=\dfrac{x!}{(x-n)!}=\prod_{k=0}^{n-1} (x-k)$ 。

则可以利用下面的恒等式将普通幂转化为下降幂：

$$
x^n=\sum_{k} \begin{Bmatrix}n\\ k\end{Bmatrix} x^{\underline{k}}
$$

如果将下降幂转化为普通幂，则有下面的恒等式：

$$
x^{\underline{n}}=\sum_{k} \begin{bmatrix}n\\ k\end{bmatrix} (-1)^{n-k} x^k
$$

### 7.康托展开

BIT优化一波直接算就行
[有点意思的题](https://www.cnblogs.com/tommy0103/p/13900257.html)

## 三.多项式

咕咕咕

## 四.生成函数

咕咕咕

## 五.杂项

咕咕咕
