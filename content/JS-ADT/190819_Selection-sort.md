---
title: 선택정렬, Selection Sort(with JS) 
date: '2019-08-19T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/selection-sort'
category: 'algorithm'
tags:
  - '자료구조'
  - 'ADT'
  - 'Sorting'
description: '선택정렬(selection sort)은 제자리(in-place) 정렬 알고리즘의 하나로, 최솟값을 찾아 맨 앞으로 보내고, 그 다음으로 작은 값을 찾아 2번째 위치로 보내는 식으로 정렬한다. '
---

## 선택정렬?

선택정렬(selection sort)은 제자리(in-place) 정렬 알고리즘의 하나로, 최솟값을 찾아 맨 앞으로 보내고, 그 다음으로 작은 값을 찾아 2번째 위치로 보내는 식으로 정렬한다. 

이 [링크](https://visualgo.net/ko/sorting)를 통해 선택 정렬이 어떻게 작동하는지 참고할 수 있다.

## 시간복잡도

시간 복잡도가 O(n^2) 이기 때문에 거의 사용되지 않는 알고리즘이다. 다만 단순하다.

![bubble-sort 시간복잡도](https://user-images.githubusercontent.com/35516239/63222527-3d7fca00-c1e4-11e9-8cbb-7e17ffeeff83.png)

## 선택정렬 구현

```js
const swap = (arr, index1, index2) => {
  const aux = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = arr[index1];
}

const selectionSort = arr => {
  const length = arr.length;
  let indexMin;
  
  for (let i=0; i<length-1; i++){
    indexMin = i;
    for (let j=i; j<lenght; j++){
      if(arr[indexMin] > arr[j]){
        indexMin = j;
      }
    }
    if (i !== indexMin){
      swap(i, indexMin);
    }
  }
}
```

- 배열 크기(length)와 최솟값을 가진 원소의 인덱스(indexMIn)를 담아둔 변수를 선언한다. 
- 바깥쪽 루프에서 배열을 순회하면서 i+1 번째로 작은 값을 찾아야 하는데, 안쪽 루프가 시작되기 전 최솟값을 가진 원소의 인덱스는 i라고 가정한다.
- 그리고 i 에서 length 까지 인덱스 원소 값을 현재까지의 최솟값과 비교해, 만약 더 작다면 현재 최솟값을 이 원소 값으로 갱신한다.
- 안쪽 루프를 벗어날 때 i+1 번째로 작은 값이 결정된다.
- 이렇게 찾은 indexMin이 i 와 다르면 원소의 위치를 교환(swap) 한다 

다음 그림은 `[5, 4, 3, 2, 1]` 배열에 선택 정열 알고리즘을 적용한 단계별 실행 과정이다.

![선택정렬](https://user-images.githubusercontent.com/35516239/63230416-405fd680-c247-11e9-8ebd-d94e0f3d14cb.png)

그림에서 화살표는 최솟값을 찾기 위해 비교하는 두 원소를 나타내며(안쪽 루프), 각 단계는 바깥쪽 루프에 대응된다.

## 참고

[자바스크립트 자료 구조와 알고리즘, 로이아니 그로네르 지음](http://www.yes24.com/Product/Goods/22885878)