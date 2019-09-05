---
title: programmers - 모의고사 with JS
date: '2019-09-02T23:46:37.121Z'
template: 'post'
draft: true
slug: 'algorithm/programmers/mock-test'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'programmers'
description: 'JS 로 programmers 의 "완주하지 못한 선수"를 풀었다.'
---

## Problem

## What I learned

#### array sort 유니코드 방식의 비교

array의 sort 함수는 애초에 문자열 정렬을 위해 탄생했기 때문에, compare 함수를 인자로 전달해야 한다. [링크](https://ohgyun.com/790)

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

```


### 참고
