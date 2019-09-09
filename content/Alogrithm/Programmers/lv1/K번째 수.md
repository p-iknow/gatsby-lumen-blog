---
title: programmers - K번째 수 with JS
date: '2019-09-04T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/programmers/k-th-number'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'programmers'
description: 'JS 로 programmers 의 "완주하지 못한 선수"를 풀었다.'
---

## Problem

![k번째 수](https://user-images.githubusercontent.com/35516239/64502384-e19af380-d300-11e9-9f4d-f93f0b855484.png)

## What I learned

#### array sort 유니코드 방식의 비교

- array의 sort 함수는 애초에 문자열 정렬을 위해 탄생했기 때문에, compare 함수를 인자로 전달해야 한다. 

- [ 링크](https://ohgyun.com/790)

## Solve

### 내 풀이 

```js
const commandToK = (arr, command) => {
  let [i, j, k] = command.map(item => item - 1);
  j += 1;
  return arr.slice(i, j).sort((a, b) => a - b)[k];
};

const solution = (arr, commands) => {
  const answer = commands.map(command => {
    return commandToK(arr, command);
  });
  return answer;
};

```

### 다른 사람 풀이 

```js
function solution(array, commands) {
    return commands.map(([from, to, k]) => {
        return array.slice(from - 1, to).sort((x, y) => x > y)[k-1];
    });
} 
```

 `const [from, to, k] = command` 의 `array destructuring` 부분이 인상적임 

