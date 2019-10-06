---
title: HakerRank - Mini Max Sum
date: '2019-05-20T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/hakerrank/Mini-Max-Sum'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'HakerRank - Mini Max Sum를 풀었다'
---

## Problem

- [링크](https://www.hackerrank.com/challenges/mini-max-sum/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign)

![image](https://user-images.githubusercontent.com/35516239/56944849-f64fc980-6b5f-11e9-97ee-ef3d888f6510.png)

## What I Learned

- 단축 평가(short circuit) 

```
a = (b = 'string is truthy'); // b gets string; a gets b, which is a primitive (copy)
a = (b = { c: 'yes' }); // they point to the same object; a === b (not a copy)
```

------

`(a && b)` is logically `(a ? b : a)` and behaves like multiplication (eg. `!!a * !!b`)

`(a || b)` is logically `(a ? a : b)` and behaves like addition (eg. `!!a + !!b`)

```
(a = 0, b)` is short for not caring if `a` is truthy, implicitly return `b
```

------

```
a = (b = 0) && "nope, but a is 0 and b is 0"; // b is falsey + order of operations
a = (b = "b is this string") && "a gets this string"; // b is truthy + order of ops
```

- [연산자 우선순위, JavaScript Operator Precedence (Order of Operations)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- 해당 상황에서 sort() 함수의 활용 
- 해당 상황에서 max 값을 0으로 변환하여 활용 



## My Solution

```javascript
// My solution 
function miniMaxSum(arr) {
    const minArr = arr.map(v => v);
    const maxArr = arr.map(v => v);
    minArr.splice(minArr.indexOf(Math.max(...arr)),1)
    const resMin = minArr.reduce((prev, curr) => prev + curr);
    maxArr.splice(maxArr.indexOf(Math.min(...arr)), 1)
    const resMax = maxArr.reduce((prev, curr) => prev + curr);
    console.log(resMin, resMax)
}
```

## Other Solution

```javascript
function miniMaxSum(arr) {
  arr.sort();
  var minSum = sum(arr.slice(0, -1))
  var maxSum = sum(arr.slice(1))
  console.log(minSum, maxSum)
}

function sum(subArr) {
  return subArr.reduce(function(a, b) {
    return a + b;
  }, 0);
}

miniMaxSum([1,2,3,4,5]);
```

