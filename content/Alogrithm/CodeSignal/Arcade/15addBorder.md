---
title: CodeSignal - Arcade - Add Border
date: '2019-04-03T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/add-border'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - Add Border를 풀었다'
---

## Problem

![image](https://user-images.githubusercontent.com/35516239/57267140-00bb1780-70ba-11e9-9014-2ee892ef78f1.png)

## What I learned 

- destructing 을 쓸 수 있을 때는 최대한 활용하도록 하자 
- map을 적용한 뒤에 destruction을 사용할 수 있다.
- python list comprehension
- [python center method](https://python-reference.readthedocs.io/en/latest/docs/str/center.html)

## My solution

```javascript
function addBorder(picture) {
    const star = "*".repeat(picture[0].length + 2)
    const res = picture.map(v => "*" + v + "*")
    res.unshift(star)
    res.push(star)
    return res;
}

```

## Solution

```javascript
function addBorder(picture) {
    var width = picture[0].length + 2;
    return [
        '*'.repeat(width),
        ...picture.map(line => `*${line}*`),
        '*'.repeat(width)
    ];
}
```

## Python Solution

```python
def addBorder(picture):
    l=len(picture[0])+2
    return ["*"*l]+[x.center(l,"*") for x in picture]+["*"*l]
    
```

