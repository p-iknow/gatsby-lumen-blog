---
title: programmers - 네트워크 with JS
date: '2019-10-04T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/programmers/network'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'programmers'
description: 'JS 로 programmers 의 "네트워크"를 풀었다.'
---

## Problem

https://programmers.co.kr/learn/courses/30/lessons/43162

![image](https://user-images.githubusercontent.com/35516239/66176736-d639ae80-e699-11e9-9399-99c3d6b98425.png)

## Solve

### 내 풀이 

```js
// i로 시작하여 해당 컴퓨터(노드)로 부터 연결된 다른 컴퓨터(노드)를 탐색하는 재귀 함수
const DFS = function(computers, i) {
  console.log('DFS excuted');
  // 이미 방문했다면 리턴하여 재방문을 막기(재귀 탈출 조건)
  if (isVisited[i]) {
    return;
  }
  isVisited[i] = true;
  console.log(isVisited);

  for (let j = 0; j < computers.length; j++) {
    //i 컴퓨터와, j 컴퓨터가 연결되었을 때만 재귀를 실행시킴
    // computers[1][2] 의 경우 0 이고 연결되어 있지 않기 때문에 DFS 를 실행시키지 않음
    if (computers[i][j] === 1) {
      console.log(`${i}, ${j}`);
      console.log('connected');
      DFS(computers, j);
    }
  }
};

function solution(n, computers) {
  let answer = 0;
  // 각 컴퓨터의 방문을 체크하는 배열을 생성한다.
  const isVisited = new Array(n).fill(false);
	
  // 모든 방문을 false로 초기화한다. 
  for (let i = 0; i < n; i++) {
    isVisited.push(false);
  }

  for (let i = 0; i < n; i++) {
    // 시작점이 될 수 있다는 것은 기존에 다른 네트워크와 연결되지 않았다는 뜻
    if (!isVisited[i]) {
      // 그러므로 네트워크에 1을 추가
      answer++;
      console.log(isVisited, '도입부');
      console.log(answer);
      DFS(computers, i);
    }
  }

  return answer;
}

solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]);


```

#### 참고: Array.fill()

```js
new Array(3).fill(false);
// (3) [false, false, false]

```

### 파이썬 풀이

참고: https://itholic.github.io/kata-network/

```python
def dfs(graph, start_node):
    visit = list()
    stack = list()
    stack.append(start_node)

    while stack:
        node = stack.pop()
        if node not in visit:
            visit.append(node)
            stack.extend(graph[node])

    return visit


def solution(n, computers):
    graph = {node: [] for node in range(n)}

    for i, computer in enumerate(computers):
        for j, conn in enumerate(computer):
            if i != j and conn == 1:
                graph[i].append(j)

    paths = map(sorted, [dfs(graph, node) for node in graph])

    return len(set(["".join(map(str, path)) for path in paths]))
문제를 풀기 위해 필요했던 정보 
```

#### 참고: extend 

[append()](https://docs.python.org/2/library/array.html?highlight=append#array.array.append)는 object를 맨 뒤에 추가한다

```python
x = [1, 2, 3]
x.append([4, 5])
print (x)
[1, 2, 3, [4, 5]]
```

[extend()](https://docs.python.org/2/library/array.html?highlight=append#array.array.extend)는 iterable 객체(리스트, 튜플, 딕셔너리 등)의 element를 list에 appending 시킨다.

```python
x = [1, 2, 3]
x.extend([4, 5])
print (x)
[1, 2, 3, 4, 5]
```

