---
title: CSP-S2考前综合强化刷题（第一场）
date: 2020-10-01
banner: "images/hero/VRChat_2026-02-11_02-48-10.343_2560x1440.png"
cover: "images/hero/VRChat_2026-02-11_02-48-10.343_2560x1440.png"
---

A. 打扑克

题目描述

皮蛋为了讨好黑妞，想要跟她打扑克。
他们打的扑克是这样一种规则：有面值大小从1到n的扑克各一张。其中奇数牌在皮蛋手中，偶数牌在黑妞手中。每人每次只能出一张牌，先出完者获胜（遵循最基本的扑克规则：当对手出牌后，可以选择出一张比他大的牌，或者不管，让他再任意出一张牌）。假设皮蛋和黑妞都是足够聪明的人，都想让自己获胜。现在给定n和谁先出牌，那么谁会获胜呢？

输入格式

第1行1个正整数T，表示数据组数。
接下来T行，每行2个正整数n,op，表示打一局牌。其中n如题所示，保证op∈{0,1},op=0表示皮蛋先出牌，op=1表示黑妞先出牌。

输出格式

T行每行1个数表示打一局牌的答案。0表示皮蛋获胜，1表示黑妞获胜。

代码
````cpp
int t;
char s[N];
int main(){
	rd(t);
	while(t--){
		scanf("%s",s+1);int op;
		int len=strlen(s+1);
		rd(op);
    if(len==1&&s[1]=='2'){//2不符合规律
        cout<<op<<endl;
        continue;
    }
		if(op==0&&((s[len]-'0')&1)){
			puts("0");
		}else{
			puts("1");
		}
	}
	return 0;
}
````

B. 粉刷匠

题目描述
皮蛋喜欢黑妞，想为她粉刷一面网格墙。
墙上有n行m列共n∗m个网格。初始时，整面墙都是红色的。皮蛋只有红、蓝两种颜色的油漆，而且皮蛋很懒，他每次刷墙只会把某一整行或某一整列刷成红色或蓝色。皮蛋一共粉刷了k次墙。现在给出皮蛋的粉刷方案，请你求出最后这面墙有多少个格子是蓝色的。

输入格式
第1行3个正整数n,m,k。
接下来k行，每行3个整数x,y,z表示一次刷墙。保证x,z∈{0,1}，x=0表示皮蛋粉刷第y行，否则表示粉刷第y列；z=0则表示将该行（列）的格子都粉刷成红色，否则表示都粉刷成蓝色。保证操作合法。

输出格式
1行1个数表示答案。

题解
正难则反,红影响不到比它晚的,标记起来影响之前的蓝即可

代码
````cpp
int n,m,k;
struct node{
	int x,y,z;
}t[N];
int s1[N],s2[N];
ll ans;
int b1,r1,b2,r2;
int main(){
	rd(n);rd(m);rd(k);
	for(int i=1;i<=k;++i)rd(t[i].x),rd(t[i].y),rd(t[i].z);
	for(int i=k;i;--i){
		if(t[i].x==0){
			if(s1[t[i].y])continue;
			s1[t[i].y]=t[i].z+1;
			if(s1[t[i].y]==1){
				++r1;
			}else if(s1[t[i].y]==2){
				++b1;
				ans+=m;
				ans-=r2;
				ans-=b2;
			}
		}else{
			if(s2[t[i].y])continue;
			s2[t[i].y]=t[i].z+1;
			if(s2[t[i].y]==1){
				++r2;
			}else if(s2[t[i].y]==2){
				++b2;
				ans+=n;
				ans-=r1;
				ans-=b1;
			}
		}
	}
	cout<<ans<<endl;
	return 0;
}
````

C. 直线竞速

题目描述
一年一度的繁荣山庄直线竞速比赛要开始了！
本次比赛共有n位选手，第i位选手的起点在ai位置，速度是vi，速度方向是正方向。
之后有Q个询问，每次询问经过t秒后，排名在第k位的选手的编号（在相同位置时，编号小的排名靠前）。

输入格式
第1行1个正整数n。
接下来n行，每行2个正整数vi,ai。
接下来1行1个整数Q。
接下来Q行，每行2个正整数t,k，表示一个询问。

输出格式
Q行，每行一个整数表示询问的答案。

题解
按照时间变化去维护n条直线的大小关系,用类冒泡去解决,最多$n^2$个交点,可以保证复杂度
````cpp
int n;
struct node{
	ll pos,v,id;
}s[N];
struct edge{
	int t,k,id;
}q[N];
inline bool operator <(node x,node y){
	return x.pos>y.pos;
}
inline bool operator <(edge x,edge y){
	return x.t<y.t;
}
int sum[N];
int main(){
	rd(n);
	for(int i=1;i<=n;++i){
		rd(s[i].v);rd(s[i].pos);s[i].id=i;
	}int Q;
	rd(Q);
	for(int i=1;i<=Q;++i){
		rd(q[i].t);rd(q[i].k);q[i].id=i;
	}
	sort(s+1,s+1+n);sort(q+1,q+1+Q);
	for(int i=0;i<=Q;++i){
		for(int j=1;j<=n;++j){
			for(int z=j-1;z;--z){
				ll x=s[z+1].v*q[i].t+s[z+1].pos;
				ll y=s[z].v*q[i].t+s[z].pos;
				if(x>y||(x==y&&s[z+1].id<s[z].id))swap(s[z+1],s[z]);
				else break;
			}
		}
		sum[q[i].id]=s[q[i].k].id;
	}
	for(int i=1;i<=Q;++i)printf("%d\n",sum[i]);
	return 0;
}
````

D.游戏
题目描述
有一个游戏：给定两个正整数序列A,B，长度分别为n,m。你可以做如下操作：删掉A的最后x(x≥1)个数并得到它们的和S1，同时删掉B的最后y(y≥1)个数并得到它们的和S2，这次操作的花费是(S1–x)(S2–y)。你需要一直操作直到A,B都为空（不能做完一次操作后使得其中一个为空而另一个非空）。本次游戏的总花费是每次花费的和。求最小的总花费。

输入格式
第1行2个正整数n,m。
第2行n个正整数，表示序列A。
第3行m个正整数，表示序列B。

输出格式
1行1个数表示最小的总花费。

题解
仔细想想发现$a_i=a_i-1$即可化简柿子,随后贪心思考,俩边都是越短越好,简单DP即可
````cpp
int n,m;
ll a[N],b[N],sa[N],sb[N];
ll dp[N][N];
int main(){
	rd(n);rd(m);
    for(int i=1;i<=n;++i)rd(a[i]),--a[i];
    for(int j=1;j<=m;++j)rd(b[j]),--b[j];
    memset(dp,0x3fll,sizeof(dp));
    dp[0][0]=0;
    for(int i=1;i<=n;++i){
        for(int j=1;j<=m;++j){
            dp[i][j]=min(dp[i][j],dp[i-1][j-1]+a[i]*b[j]);
            dp[i][j]=min(dp[i][j],dp[i][j-1]+a[i]*b[j]);
            dp[i][j]=min(dp[i][j],dp[i-1][j]+a[i]*b[j]);
        }
    }cout<<dp[n][m]<<endl;
	return 0;
}
````
