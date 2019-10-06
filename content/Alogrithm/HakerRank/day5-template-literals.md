---
title: HakerRank - Day 5: Template Literals
date: '2019-10-05T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/hakerrank/day5-template-literals'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'HakerRank - Day 5: Template Literals 를 풀었다'

---

## Problem

https://www.hackerrank.com/challenges/js10-template-literals/problem

## My solution

```javascript
function sides(literals, ...expressions) {
    let area = expressions[0];
    let perimeter = expressions[1];
    
    let d = Math.sqrt(perimeter * perimeter - 16 * area);
    
    let s1 = (perimeter + d) / 4;
    let s2 = (perimeter - d) / 4;
    
    return [s1, s2].sort();
}

function main() {
    let s1 = +(readLine());
    let s2 = +(readLine());
    
    [s1, s2] = [s1, s2].sort();
    
    const [x, y] = sides`The area is: ${s1 * s2}.\nThe perimeter is: ${2 * (s1 + s2)}.`;
    
    console.log((s1 === x) ? s1 : -1);
    console.log((s2 === y) ? s2 : -1);
}
```

### Tagged Template

해당 문제는 `Tagged Template` 에 대한 이해가 있어야 풀 수 있다. 아래에 그에 대한 설명이 담긴 링크를 첨부하였다.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates

- https://wesbos.com/tagged-template-literals/