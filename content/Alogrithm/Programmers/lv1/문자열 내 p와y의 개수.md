---
title: programmers - 문자열 내 p와 y의 개수 with JS
date: '2019-11-22T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/programmers/number-of-p-and-y-in-string'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'programmers'
description: 'JS 로 programmers 의 문자열 내 p와 y의 개수"를 풀었다.'


---

## Problem

![image](https://user-images.githubusercontent.com/35516239/69420725-97071000-0d62-11ea-93a6-881791be71e0.png)

>  [출저: 프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/12916) 

## Solve

### 문자열 내에 특정 문자의 갯수를 구하는 함수 

`String.prototype.indexOf()` 함수의 두 번째 인자는 `fromIndex` 로 해당 인덱스 부터 문자를 탐색한다.  이를 아래 처럼 활용하면 하나의 문자열에 특정 문자가 몇번 포함되어 있는지 파악할 수 있다.  

```js
function getCountChar(str, char) {
	let count = 0;
  let position = str.indexOf(char);
  while (position !== -1){
    count++;
    position = str.indexOf(char, position +1);
  }
  return count;
}
```

### 전체 풀이 

```js
function solution(s){
    const lowercaseS = s.toLowerCase();
    const countP = getCountChar(lowercaseS, "p")
    const countY = getCountChar(lowercaseS, "y")
    
    if(countP === countY) {
        return true;
    }
    return false;


}
```





