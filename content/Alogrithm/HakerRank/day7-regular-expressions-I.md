---
title: HakerRank - Day 7: Regular Expressions I
date: '2019-10-05T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/hakerrank/day7-regular-expressions-I'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'HakerRank - Day 7: Regular Expressions I 를 풀었다'
---

## Problem

https://www.hackerrank.com/challenges/js10-regexp-1/problem

## My solution

```javascript
function regexVar() {
    /*
     * Declare a RegExp object variable named 're'
     * It must match a string that starts and ends with the same vowel (i.e., {a, e, i, o, u})
     */
    const re = /^([aeiou]).*\1$/
    
    /*
     * Do not remove the return statement
     */
    return re;
}
```

### 역참조(backreferences)

정규 표현식에서는 패턴의 일부를 하위 표현식으로 묶으면, 첫번째로 나타나는 부분 문자열을 찾은 뒤에 역참조를 통해 이후에 나타나는 부분 문자열을 찾을 수 있다. 이때, 각 하위 표현식은 번호로 식별된다. 이 역참조를 통해서, 앞 쪽에서 한번 쓰였던 문자열을 찾을  수 있다. 

 `\1` 로 `( )` 그룹에 의해 캡쳐된 첫번째 내용을 참조할 수 있다.

**Reg. Expression:**

`\b([a-z]+) \1\b

**Text:**

why **so so** serious

출처: https://blog.hexabrain.net/204 [끝나지 않는 프로그래밍 일기]