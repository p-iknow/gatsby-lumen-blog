---
title: CodeSignal - Arcade - areEquallystrong
date: '2019-04-20T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/areEquallystrong'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - areEquallystrong를 풀었다'
---

## Problem

![image](https://user-images.githubusercontent.com/35516239/57603509-e2af5480-759c-11e9-90c3-11567e6aa9a3.png)

## What I learned 

- 연산자 우선순위
- sorting 먼저하는 로직
- python 집합으로 비교하는 로직

## My solution

```javascript
function areEquallyStrong(yourLeft, yourRight, friendsLeft, friendsRight) {
    return (yourLeft + yourRight  === friendsLeft + friendsRight) &&( (yourLeft === friendsLeft) || (yourLeft === friendsRight) )
}

```

## Solution

```javascript
function areEquallyStrong(yourLeft, yourRight, friendsLeft, friendsRight) {
    var me = [yourLeft, yourRight].sort().join("");
    var friend = [friendsLeft, friendsRight].sort().join("");
    return me === friend;
}
```

## Python Solution

```python
def areEquallyStrong(yourLeft, yourRight, friendsLeft, friendsRight):
    return {yourLeft, yourRight} == {friendsLeft, friendsRight}

def areEquallyStrong(yourLeft, yourRight, friendsLeft, friendsRight):
    return sorted([yourLeft,yourRight])==sorted([friendsLeft,friendsRight])
```

