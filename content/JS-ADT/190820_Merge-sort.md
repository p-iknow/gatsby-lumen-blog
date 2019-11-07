---
title: 병합정렬, Merge Sort(with JS) 
date: '2019-08-20T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/merge-sort'
category: 'algorithm'
tags:
  - '자료구조'
  - 'ADT'
  - 'Sorting'
description: '병합 정렬(merge sort)의 핵심은 분할과 정복이다. 정렬할 배열을 원소가 하나뿐인 배열 단위로 나뉠 때까지 분할하고, 반대로 이렇게 분할된 배열을 점점 더 큰 배열로 병합하면서 정렬을 완성한다. 분할/정복이라는 접근 방식은 재귀 호출을 통해 구현된다.'
---

## 병합 정렬(merge sort)?

병합 정렬(merge sort)의 핵심은 분할과 정복이다. 정렬할 배열을 원소가 하나뿐인 배열 단위로 나뉠 때까지 분할하고, 반대로 이렇게 분할된 배열을 점점 더 큰 배열로 병합하면서 정렬을 완성한다. 분할/정복이라는 접근 방식은 재귀 호출을 통해 구현된다.

이 [링크](https://visualgo.net/ko/sorting)를 통해 병합 정렬이 어떻게 작동하는지 참고할 수 있다.

## 시간복잡도

시간 복잡도가 O(n* log n) 으로 성능이 뛰어나다.

![bubble-sort 시간복잡도](https://user-images.githubusercontent.com/35516239/63222527-3d7fca00-c1e4-11e9-8cbb-7e17ffeeff83.png)

## 병합 정렬 구현

```js
const mergeSort = (arr) => {
  return mergeSortRec(arr)
}
```

### 내부적으로 호출할 재귀함수 `mergeSortRec`

```js
const mergeSortRec = arr => {
  const length = arr.length;
  if (length === 1) return arr;
  const mid = Math.floor(length/2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid, length);
  
  return merge(mergeSortRec(left), mergeSort(right));
}
```

- 병합 정렬은 원소가 하나밖에 남지 않을 때까지 작은 배열 여러 개로 분할한다고 했다. 따라서 재귀 알고리즘에서 필수적인 중단 조건은 '배열 크기가 1과 같다' 는 것이다. 이 조건을 만족하면 배열을 반환하고 재귀를 반복하지 않는다.
- 원소가 2개 이상이라면, 더 작게 나누어야 한다. 먼저 배열의 중간 지점을 찾아 좌/우측으로 각각 `left, right` 로 분할한다. 분할 후 `left` 에는 `index 0 부터 mid-1` 까지 `right` 에는 `index mid에서 맨 끝의 원소까지` 각각 포함된다.
- 분할이 완료되면 이제 merge 함수를 호출해 잘게 쪼개진 배열들을 정렬하면서 점점 더 큰 배열로 병합하고 결국 정렬된 배열의 모습을 갖추도록 반복한다. 배열 분할 작업을 재귀적으로 계속해야 하므로 `mergeSortRec` 함수에 left, right를 인자로 전달해 호출한다. 

```js
const merge = (left, rigth) => {
  const result = [];
  let il = 0;
  let ir = 0;
  
  while(il < left.length && ir < right.length){
    if(left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }
  
 return [...result, ...left.slice(il), ...right.slice(ir)];
}
```

- `merge` 함수는 분한된 두 배열을 합쳐 큰 배열을 만든다. 병합을 하면서 정렬도 동시에 수행한다. 먼저, 병합 결과를 저장할 배열과 두 배열(`left, right`) 순회 시 사용할 변수 2개(`il, ir`) 를 선언한다. 
- 배열을 순회하는 동안, left의 원소가 right의 원소보다 더 작은지 비교한다. 참이라면 `left` 원소를 `result` 에 집어넣고 인덱스 변수(`il`) 를 증가시킨다. 거짓이라면, 반대로 `right` 원소를 결과 배열에 합류시킨다. 
- 그러고 나서 `left` 에 남은 원소 전부를 결과 배열에 더하고, `right` 배열에도 동일한 작업을 한다. 이제 병합 작업이 끝난 배열을 반환하면 된다. 

다음은 `mergeSort` 함수의 실행 과정을 그림으로 나타낸 것이다

![병합정렬, merge sort](https://user-images.githubusercontent.com/35516239/63268213-9deb3600-c2ce-11e9-9c5f-72f7b5deb5f3.png)



이 알고리즘의 전반전은 원소가 하나뿐인 배열 단위로 나뉠 때까지 분할을 계속하는 작업이다. 그리고 후반전에는 역으로 병합을 하면서 정렬을 수행한다. 

## 참고

[자바스크립트 자료 구조와 알고리즘, 로이아니 그로네르 지음](http://www.yes24.com/Product/Goods/22885878)