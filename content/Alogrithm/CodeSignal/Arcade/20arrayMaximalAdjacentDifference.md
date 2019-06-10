---
title: CodeSignal - Arcade - Array Maximal Adjacent Difference
date: '2019-04-24T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/Array-Maximal-Adjacent-Difference'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - Array Maximal Adjacent Difference를 풀었다'
---

## Problem

![image](https://user-images.githubusercontent.com/35516239/57898402-e809e900-7893-11e9-9a0b-b5977004a4ff.png)

## What I learned 

- 맨앞의 배열을 자른 배열과 원본 배열을 똑같은 인덱스로 비교하면 인접한 요소간의 차이를 알 수 있음
- `arr.slice(1)` 의 0번 인덱스와 `arr`의 0번 인덱스를 빼면 차이를 알 수 있음
- Math.max(...arr) 표현
- 파이썬 list comprehension 표현 `[abs(a[i]-a[i+1]) for i in range(len(a)-1)]`
- 파이썬 `max` 함수는 `arr` 자체를  인자로 받을 수 있음(자바스크립트가 배열을 풀어쓴 것과는 다름)

## My solution

```javascript
function arrayMaximalAdjacentDifference(inputArray) {
    const findMaxDiff = (prev, curr, i, arr)=>{
        const currDiff = Math.abs(curr - arr[i+1]);
        return prev < currDiff ? currDiff : prev;  
    }
    return inputArray.reduce(findMaxDiff, 0);
}
```

## Solution

```javascript
function arrayMaximalAdjacentDifference(arr) {
  return Math.max(...arr.slice(1).map((x,i)=>Math.abs(x-arr[i])))
}
```

## Python Solution

```python
def arrayMaximalAdjacentDifference(a):
    diffs=[abs(a[i]-a[i+1]) for i in range(len(a)-1)]
    return max(diffs)
```

