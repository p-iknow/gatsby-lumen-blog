---
title: Bubble Sort(with JS) 
date: '2019-08-17T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/big-o'
category: 'algorithm'
tags:
  - '자료구조'
  - 'ADT'
  - 'Sorting'
description: '버블 정렬(bubble-sort)은 인접한 두 원소를 모두 다 비교하고 그 결과에 따라 두 원소의 위치를 서로 바꾼다. 원소가 정렬돼가는 모습이 마치 수면 위로 떠오르는 거품(버블) 같다고 하여 버블 정렬이란 이름이 붙었다.'
---

## 버블정렬(Bubble Sort)?

버블 정렬은 인접한 두 원소를 모두 다 비교하고 그 결과에 따라 두 원소의 위치를 서로 바꾼다. 원소가 정렬돼가는 모습이 마치 수면 위로 떠오르는 거품(버블) 같다고 하여 버블 정렬이란 이름이 붙었다. 

## 시간복잡도

시간 복잡도가 o(n^2) 이기 때문에 거의 사용되지 않는 알고리즘이다. 다만 단순하다.

![bubble-sort 시간복잡도](https://user-images.githubusercontent.com/35516239/63222527-3d7fca00-c1e4-11e9-8cbb-7e17ffeeff83.png)

## 버블 정렬 구현(JS)

```js
const swap = (arr, index1, index2) => {
  const aux = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = arr[index1];
  return arr;
}

const bubbleSort = arr => {
  const length = arr.length;
  for (let 1=0; i<length; i++){
    for (let j=0; j<lenght; i++) {
      if (arr[j] > arr[j+1]) {
        swap(j, j+1);
      }
    }
  }
  return arr;
} 
```

## 개선된 버블 정렬

```js
const swap = (arr, index1, index2) => {
  const aux = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = arr[index1];
  return arr;
}

const modifiedBubbleSort = arr => {
  const length = arr.length;
  for (let i=0; i<length; i++){
    for (let j=0; j<length<-1-i; j++){
      if (arr[j] > arr[j+1]){
        swap(arr, j, j+1)
      }
    }
  }
}
```

### 개선 효과

![bubble-sort 정렬 효과](https://user-images.githubusercontent.com/35516239/63222497-c6e2cc80-c1e3-11e9-9413-8163655bdffb.png)