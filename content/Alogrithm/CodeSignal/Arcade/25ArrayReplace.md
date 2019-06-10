---
title: CodeSignal - Arcade - Array Replace
date: '2019-06-10T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/Array-replace'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - Array replace를 풀었다'
---

## Problem

![image-20190610215131024](assets/image-20190610215131024.png)

## My solution

```javascript
function arrayReplace(inputArray, elemToReplace, substitutionElem) {
  return inputArray.map(elem => elem === elemToReplace ? substitutionElem : elem )
}

arrayReplace([1,2,1], 1, 3)
```

## Solution

```javascript
function arrayReplace(inputArray, elemToReplace, substitutionElem) {
  return inputArray.map(elem => elem === elemToReplace ? substitutionElem : elem )
}

arrayReplace([1,2,1], 1, 3)
```

## Python Solution

```python
def arrayReplace(inputArray, elemToReplace, substitutionElem):
    return [substitutionElem if x==elemToReplace else x for x in inputArray]

```

## What I learned 

- 파이썬 list comprehension if else 구문의 동작방법