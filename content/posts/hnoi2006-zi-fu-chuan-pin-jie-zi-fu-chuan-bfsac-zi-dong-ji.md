---
title: "[HNOI2006字符串拼接][字符串][BFS][AC自动机]"
date: 2020-12-26
tags:
  - BFS
  - 字符串
  - 解题报告
cover: "images/post-images/1583391058067.jpg"
---

* [P2322 [HNOI2006]最短母串问题](https://www.luogu.com.cn/problem/P2322)

首先建个自动机出来,同时处理一下每个叶子结点有哪些节点
然后就是直接$BFS$,性质自然
````cpp
short n,cnt,ch[N][26];
char s[N];
int date[N];
inline void ins(int zi){
	int len=strlen(s),now=1;
	for(int i=0;i<len;++i){
		int x=s[i]-'A';
		if(!ch[now][x]){
			ch[now][x]=++cnt;
		}now=ch[now][x];
	}
	date[now]|=(1<<zi);
	//cout<<now<<endl;
}
short q[N],l,r,fail[N];
void FA(){
	r=-1;
	for(int i=0;i<=25;++i)ch[0][i]=1;
	q[++r]=1;
	while(l<=r){
		int x=q[l];++l;
		for(int i=0;i<=25;++i){
			if(ch[x][i]){
				fail[ch[x][i]]=ch[fail[x]][i];
				date[ch[x][i]]|=date[ch[fail[x]][i]];
				q[++r]=ch[x][i];
			}else{
				ch[x][i]=ch[fail[x]][i];
			}
		}
	}
}

queue<int>now,son;
bool vis[N][M];
char ans[N*M];
int nex[N*M];
int main(){
	cin>>n;cnt=1;
	for(int i=0;i<n;++i){
		scanf("%s",s);
		ins(i);
	}
	FA();
	now.push(1);
	son.push(0);
	int num=0,sum=0;
	vis[0][0]=1;
	while(now.size()){
		int xnow=now.front();
		int xson=son.front();
		now.pop();
		son.pop();
		if(xson==((1<<n)-1)){
			int le=0;
			while(num){
				s[++le]=ans[num];
				num=nex[num];
			}
			while(le)putchar(s[le--]);
			break;
		}
		for(int i=0;i<=25;++i){
			if(!vis[ch[xnow][i]][xson|date[ch[xnow][i]]]){
				vis[ch[xnow][i]][xson|date[ch[xnow][i]]]=1;
				now.push(ch[xnow][i]);
				son.push(xson|date[ch[xnow][i]]);
				nex[++sum]=num;
				ans[sum]='A'+i;
			}
		}
		++num;
	}
	system("Pause");
    return 0;
}
````
