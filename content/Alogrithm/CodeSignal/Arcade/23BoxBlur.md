---
title: CodeSignal - Arcade - BoxBlur
date: '2019-05-11T23:46:37.121Z'
template: 'post'
draft: false
slug: 'algorithm/codesignal/BoxBlur'
category: 'algorithm'
tags:
  - 'algorithm'
  - 'codesignal'
description: 'CodeSignal - Array Change를 풀었다'
---

## Problem

![image](https://user-images.githubusercontent.com/35516239/58026445-8080c180-7b51-11e9-945f-9a8af46d4988.png)

![image](https://user-images.githubusercontent.com/35516239/58026532-a8702500-7b51-11e9-899e-1ff28d4f78db.png)

### Python solution

- `image[j:j+3]` [파이썬의 슬라이싱 기법](https://wikidocs.net/14#_4)

- 파이선 list comprehension 중첩 풀어서 써보기 

- ```python
  image = [[36, 0, 18, 9, 9, 45, 27],
            [27, 0, 54, 9, 0, 63, 90],
            [81, 63, 72, 45, 18, 27, 0],
            [0, 0, 9, 81, 27, 18, 45],
            [45, 45, 27, 27, 90, 81, 72],
            [45, 18, 9, 0, 9, 18, 45],
            [27, 81, 36, 63, 63, 72, 81]]
  
  # list comprehension 중첩
  def boxBlur(image):
      return [[int(sum(sum(x[i:i+3]) for x in image[j:j+3])/9) for i in range(len(image[j])-2)] for j in range(len(image)-2)]
    
    
    
  # 중첩을 풀 때는 역순으로 풀어야 함
  # 풀어서 써보기 함
  def boxBlur(image)
  resArr = []
  tmpSum = 0
  tmpArr = []
  for j in range(len(image) - 2):
      for i in range(len(image[0]) - 2):
          for x in imeage[j: j+3]:
              tmpSum += sum(x[i:i+3])
          tmpArr.append(int(tmpSum / 9))
          tmpSum = 0
      resArr.append(tmpArr)
      tmpArr = []
  
  print(resArr)
  
  
  ```

- 파이썬의 sum 함수는 리스트 자료형을 넣으주면 리스트 자료형 내부 요소들을 모두 더해서 출력해줌

## My solution

```javascript
function boxBlur(image) {
  const hLength = image.length - 2;
  const wLenght = image[0].length - 2;
  const resArr = [];
  let h = 0;
  let sumOfPixel = 0;
  for (let h = 0; h < hLength; h++) {
    let tempArr = [];
    for (let w = 0; w < wLenght; w++) {
      sumOfPixel +=
        image[h][w] +
        image[h][w + 1] +
        image[h][w + 2] +
        image[h + 1][w] +
        image[h + 1][w + 1] +
        image[h + 1][w + 2] +
        image[h + 2][w] +
        image[h + 2][w + 1] +
        image[h + 2][w + 2];
      tempArr.push(Math.floor(sumOfPixel / 9));
      sumOfPixel = 0;
    }
    resArr.push(tempArr);
  }
  return resArr;
}
```

## Solution

```javascript
// #1
boxBlur = I => {
    //Slice off the border
    var B = I.slice(1,-1).map(e=>e.slice(1,-1))
    
    //Replace every element with the average
    // of its neighbors
    return B.map((row,i) =>
        row.map((elem,j) => {
            var sum = 0
            for(var x=0;x<3;++x)
                for(var y=0;y<3;++y)
                    sum += I[i+x][j+y]
            return sum/9|0
        })
    )
}


// #2 
/**
 * Blurring as a concept is simply taking the average of all values that condense to a pixel.
 * So, we calculate the sum of all corresponding numbers of a particular pixel.
 * Then, we divide by the amount of numbers that correspond to that pixel.
 * 
 * To avoid performing a lot of division operations, we should save that until the very end.
 * 
 * Therefore, all we care about the in the algorithm is getting those sums.
 * The simplest way to get the sums is to:
 * 
 * • Do a rolling total across each row, getting the sum of every subset [i...i+3]
 * • Do a rolling total down each column, getting the sum of every subset [j...j+3]
 * 
 * The below implementation is this, but performed with `map` and `reduce`.
 */

rowSum = (a, b) => a.map((x, i) => x + (b[i] || 0));
rowDiff = (a, b) => a.map((x, i) => x - (b[i] || 0));

blurRow = (blurred, x, i, arr) => (
    i -= 2,
    i <= 0
        ? blurred[0] = x + (blurred[0] || 0)
        : blurred[i] = x + blurred[i - 1] - arr[i - 1],
    blurred
);

blurRows = (blurred, x, i, arr) => (
    i -= 2,
    i <= 0
        ? blurred[0] = rowSum(x, (blurred[0] || []))
        : blurred[i] = rowDiff(rowSum(blurred[i - 1], x), arr[i - 1]),
    blurred
);

boxBlur = image => image
    .map(x => x.reduce(blurRow, []))
    .reduce(blurRows, [])
    .map(x => x.map(x => Math.floor(x / 9)));
```

## Python Solution

```python
# first
def boxBlur(image):
    return [[sum(sum(x[i:i+3]) for x in image[j:j+3])/9 
                                   for i in range(len(image[0])-2)] 
                                   for j in range(len(image)-2)]
# second 
def boxBlur(image):
    #print ([[x[i:i+3] for x in image[j:j+3] for i in range(len(image[j])-2)] for j in range(len(image)-2)])
    
    return [[int(sum(sum(x[i:i+3]) for x in image[j:j+3])/9) for i in range(len(image[j])-2)] for j in range(len(image)-2)]
```

## What I learned 

### JS #1



![image](https://user-images.githubusercontent.com/35516239/58377825-2c983180-7fc4-11e9-9e74-1a3fc5028f05.png)

- 4 * 4의  2차원 배열의 계산 결과는 2 * 2 배열 이다. 
- 3 * 3의  2차원 배열의 계산 결과는 1 * 1 배열 이다. 
- 결국 위 아래, 양 옆을 빼어주면된다. 
- 이때 사용되는 로직이 arr.slice(1,-1).map(slicedArr => slicedArr.slice(1,-1))
- 위의 로직을 거치면 `[ [6, 2], [10, 7] ]` 의 2 * 2 배열이 등장한다. 
- 이렇게 처리된 배열에 i, j 를 포인터로 하는 중첩 map 함수와 x, y를 포인터로 3을 세는  중첩 for 문을 활용하여 3 * 3 영역의  `sum += Arr[i+x][j+y]`   을 구하고 이렇게 구해진 `(sum / 9)| 0 `로 나눈다
- 암묵적 형변환
  - `(sum / 9)| 0`  이 expression 에서 `|(single pipeline) 은 어떤 역할을 하는가?`  [ 참고 링크](https://stackoverflow.com/questions/6194950/what-does-the-single-pipe-do-in-javascript) 를 살펴보면 
  - | 는 `bitwise operations` 이다. 연산을 위해 피연산자가 float라면 암시적으로 정수형으로 형변환이 일어난다. 
  - `5.222 | 0` => `ParseInt(5.222)| 0 ` => `5 | 0` => `0101 | 0000` => `0101`=> `5`  이런 과정을 거치게 되는  것이다.  

### JS #2 

```js
rowSum = (a, b) => a.map((x, i) => x + (b[i] || 0));
// a 배열과 b 배열의 값을 각 인덱스별로 더함 

rowDiff = (a, b) => a.map((x, i) => x - (b[i] || 0));
// a 배열과 b 배열의 값을 각 인덱스별로 뺌

blurRow = (blurred, x, i, arr) => {
  i -= 2;
  i <= 0
    ? (blurred[0] = x + (blurred[0] || 0))
    : (blurred[i] = x + blurred[i - 1] - arr[i - 1]);
  return blurred;
};

// blurRow 함수는 reduce 함수의 콜백함수,
// i 가 2가 될때까지 blurred[0] 에 값을 더한 뒤, blurred[i] 인데스로 넘어감 
// 다음 배열의 값은  blurred[0] (이전 값) +  x (현재값) 을 더한뒤 맨 앞자리 인덱스(arr[i-1])를 빼서 구함

// 동작은 아래와 같음
// [[7,4,0,1], => [(7+4+0), [(7+4+0) +1 - 7] 
//  [5,6,2,2], => ...
//  [6,10,7,8], => ...
//  [1,4,2,0]] => ... 


blurRows = (blurred, x, i, arr) => {
  i -= 2;
  i <= 0
    ? (blurred[0] = rowSum(x, blurred[0] || []))
    : (blurred[i] = rowDiff(rowSum(blurred[i - 1], x), arr[i - 1]));
  return blurred;
};

// blurRows 함수는 blurrow 함수의 동작을 세로로 진행
// 이 부분에서 rowSum 과 rowDiff 가 필요해짐 

const boxBlur = image =>
  image.map(x => x.reduce(blurRow, [])).map(x => x.map(x => Math.floor(x / 9)));

const test1 = [[7, 4, 0, 1], [5, 6, 2, 2], [6, 10, 7, 8], [1, 4, 2, 0]];

boxBlur(test1);

// [[7,4,0,1],
//  [5,6,2,2],
//  [6,10,7,8],
//  [1,4,2,0]]

```

