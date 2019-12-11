---
title: leetcode - 209. Minimum Size Subarray Sum with JS
date: '2019-12-11T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/leetcode/minimum-size-subarray-sum'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'programmers'
description: 'JS 로 leetcoded 의 "minimum-size-subarray-sum"를 풀었다.'
---

## Problem

![Imgur](https://i.imgur.com/aaVaLmA.png)

> [문제 링크](https://leetcode.com/problems/minimum-size-subarray-sum/)

## 풀이

```js
// https://leetcode.com/problems/minimum-size-subarray-sum/

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 * @time complexity: O(n)
 * @space complexity: O(1)
 */
const minSubArrayLen = function(s, nums) {
  let res = Infinity;
  let sum = 0;
  let start = 0;

  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];

    while (sum >= s) {
      res = Math.min(res, j - i + 1);
      sum -= nums[start];
      start++;
    }
  }

  return res === Infinity ? 0 : res;
};

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);

```

- `res` 값을 가장 큰 값으로 초기화해서 0 이 나올 경우에 대비한다. 모든 요소를 더했을 때의 `sum` 값이 인자 `s` 보다 작은 경우에는 0을 리턴하도록 하기 위함이다. 여기서 `Infinity  ` 대신에  `res = s+1 ` 을 값을 사용해도 무관하다. 
- `sum` 의 값이 `s`와 같거나 클때까지 각 요소를 `sum`에 더한다. 
- `while ` 문 안에서는 res 값을 재설정 한다. 이때 부터 리턴 값이 0은 아님이 확정된다.
- 재설정시에 `res` 에 Math.min 을 통해 최소 갯수를 보증한다. min 함수의 두번째 인자를 구할 때  +1 을 더하는 이유는 `index` 와 배열 `length` 의 차이를 보정 하기 위함이다.
- 다음으로 `sum` 값에서 제일 앞에 있는` start` 요소를 제외하고 `start++` 를 통해 start 인덱스를 증가시킨다. 

```js
// [2, 3, 1, 2] 를 더한 값이 8이다
// sum -= number[start] 와 start ++ 을 통해 
// [3, 1, 2] 도 res 값이 될 수 있는지 판단한다. 
// while 조건문을 판단해보니, 실패한다. 다시 [3, 1, 2, 4]를 더해본다. 
// while 로직에 의해 [1, 2, 4] 로 가능한지 살핀다. 조건에 부합한다.이때 res는 3이다. 
// 다시 [2, 4] 로 판단해보니 while 조건문에 실패한다 이때 res는 3이다
// [2,4,3] 을 통해 다시 while 조건을 만족한다. 이때 res는 3이다. 
// 결국 3으로 귀결된다. 
```

