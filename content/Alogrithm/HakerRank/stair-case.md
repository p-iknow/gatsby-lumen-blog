---
title: HakerRank - StairCase
date: '2019-05-20T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/hakerrank/StairCase'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'HakerRank - StairCase를 풀었다'
---

## 문제 

- [링크](<https://www.hackerrank.com/challenges/staircase/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign>)

![image](https://user-images.githubusercontent.com/35516239/56862691-91259800-69e8-11e9-9520-e1903e78a284.png)

## 배운것 

- "str".repeat() 함수 - 특정 문자를 반복해주는 함수

- Array(n).fill(arg) - 특정 arg 를 n 번 채워서 가지고 있는 배열 반환

## 풀이

```javascript
function staircase(n) {
    const hash = "#", space = " "
    for (let i = n - 1, j = 1 ; -1 < n && j < n + 1 ; j++, i--){
        console.log(space.repeat(i) + hash.repeat(j))
    }
}
```

