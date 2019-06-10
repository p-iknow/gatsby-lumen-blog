---
title: CodeSignal - Arcade - 24MineSweeper
date: '2019-04-11T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/24MineSweeper'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - 24MineSweeper를 풀었다'
---

## Problem

![image](https://user-images.githubusercontent.com/35516239/58180169-94a8f800-7ce4-11e9-867a-5f694b11113c.png)

![image](https://user-images.githubusercontent.com/35516239/58180222-abe7e580-7ce4-11e9-94ac-023d941315a1.png)

## My solution

```javascript
const Callback = (line, h, board) => {
  return line.map((cell, w, line) => {
    const top = board[h - 1] ? board[h - 1][w] : undefined;
    const bottom = board[h + 1] ? board[h + 1][w] : undefined;
    const left = line[w - 1];
    const right = line[w + 1];
    const topLeft = board[h - 1] ? board[h - 1][w - 1] : undefined;
    const topRight = board[h - 1] ? board[h - 1][w + 1] : undefined;
    const bottomLeft = board[h + 1] ? board[h + 1][w - 1] : undefined;
    const bottomRight = board[h + 1] ? board[h + 1][w + 1] : undefined;

    let num = 0;
    if (top === true) num += 1;
    if (bottom === true) num += 1;
    if (left === true) num += 1;
    if (right === true) num += 1;
    if (topLeft === true) num += 1;
    if (topRight === true) num += 1;
    if (bottomLeft === true) num += 1;
    if (bottomRight === true) num += 1;
    return num;
  });
};

const minesweeper = matrix => {
  return matrix.map(Callback);
};
```

## Solution

```javascript
const directions = [
    [ 1,-1], [ 1, 0], [ 1, 1],
    [ 0,-1],          [ 0, 1],
    [-1,-1], [-1, 0], [-1, 1]
];
minesweeper = matrix => matrix.map((row, y) => row.map((col, x) => directions.reduce((count, i) => count += !!(matrix[y + i[0]] && matrix[y + i[0]][x + i[1]]), 0)));

var dirs = [ { r: -1, c: -1 },
             { r: -1, c:  0 },
             { r: -1, c:  1 },
             { r:  0, c:  1 },
             { r:  0, c: -1 },
             { r:  1, c: -1 },
             { r:  1, c:  0 },
             { r:  1, c:  1 }];

// 2
function minesweeper(matrix) {
    return matrix.map((a,r) => a.map((_,c) => dirs.reduce((p,v) => p+=(matrix[r+v.r]||[])[c+v.c]|0, 0)))
}

```

## Python Solution

```python
# 1
def minesweeper(matrix):
    r = []
    for i in range(len(matrix)):
        r.append([])
        for j in range(len(matrix[0])):
            l = -matrix[i][j] # 0,0 을 포함시키면 지뢰일 경우 +1 이 더해짐 그래서 미리 -1을 빼줌
            for x in [-1,0,1]:
                for y in [-1,0,1]:
                    if 0<=i+x<len(matrix) and 0<=j+y<len(matrix[0]):
                        l += matrix[i+x][j+y]

            r[i].append(l) # i 가 열을 나타냄
    return r
# 2
def minesweeper(matrix):
    N, M = len(matrix), len(matrix[0])
    def neighbours(i, j):
        return sum(matrix[ii][jj] for ii in range(i-1, i+2) if 0 <= ii < N
                                  for jj in range(j-1, j+2) if 0 <= jj < M
                                  if i != ii or j != jj)
    return [[neighbours(i, j) for j in range(M)] for i in range(N)]
```

## What I learned 

### JS

- ` matrix.map((a,r) => a.map((_,c) => dirs.reduce((p,v) => p+=(matrix[r+v.r]||[])[c+v.c]|0, 0)))`  `map` 함수 중첩으로 row, colum 지정 가능
- `undefined|0`  bitwise 연산자로 0을 반환
- 보통 y축 (row) undefined 여부를 검사 후 x축 좌표를 통해 지뢰를 확인함
- `count += !!(matrix[y + i[0]] && matrix[y + i[0]][x + i[1]]), 0)));`  
  - `+ false or ture` 는 1 혹은 0을 반환
  - `!!` double bang 은 값을 boolean 으로 변환 시킴 

### pyhton

```python
def minesweeper(matrix):
    N, M = len(matrix), len(matrix[0])
    def neighbours(i, j):
        return sum(matrix[ii][jj] for ii in range(i-1, i+2) if 0 <= ii < N
                                  for jj in range(j-1, j+2) if 0 <= jj < M
                                  if i != ii or j != jj)
    return [[neighbours(i, j) for j in range(M)] for i in range(N)]

# list comprehension 풀어쓰기
res = []  
for i in range(N):
  temp = []
  for j in range(M):
    temp.append(neighbours(i,j))
  res.append(temp)
  temp = []
  
```

