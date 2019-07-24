---
title: JS comma operator(쉼표 연산자)
date: '2019-05-24T23:46:37.121Z'
template: 'post'
draft: false
slug: 'js/comma-operator/'
category: 'JS'
tags:
  - 'JS'
  - 'comma operator'
description: '"," 가 operator 였다는 사실을 알았는가?, 타인의 코드에서 볼 수 있는 comma operator에 대해 알아보자'
---
## 들어가며

[Code Signal](https://app.codesignal.com/)의 BoxBlur 라는 문제를 풀었다. 문제는 아래와 같다.

![image](https://user-images.githubusercontent.com/35516239/58382860-5b38fb00-800a-11e9-828f-b3f1e1908601.png)

코드 시그널은 문제를 풀고 난 뒤 다른 사람의 코드를 볼 수 있다. 코드는 따봉(추천)을 많이 받은순으로 나열되고, 따봉을 많이 받은 코드는 좋은 풀이(?)라는 간접적 증거이기에 나는 그 코드를 참고해서 풀이의 의도를 훔치려는 노력을 한다. 보통은 끙끙대도 그시간이 걸려 코드의 의도를 파악하는데, 오늘 만난 코드는 한참을 끙끙대도 파악하기 힘들었다. 코드 곳곳에 숨어있는 `, comma operator` 때문이다. 그게 무엇인가? 아래 코드의 주석을 참고하자.

```js
rowSum = (a, b) => a.map((x, i) => x + (b[i] || 0));
rowDiff = (a, b) => a.map((x, i) => x - (b[i] || 0));

blurRow = (blurred, x, i, arr) => (
  (i -= 2), // <= 쉼표가 있다. 무엇을 의미하는 쉼표인가?
  i <= 0
    ? (blurred[0] = x + (blurred[0] || 0))
    : (blurred[i] = x + blurred[i - 1] - arr[i - 1]), // <= 여기도 쉼표가 있다.
  blurred
);

blurRows = (blurred, x, i, arr) => (
  (i -= 2), // <= 여기 또 쉼표가 있다.
  i <= 0
    ? (blurred[0] = rowSum(x, blurred[0] || []))
    : (blurred[i] = rowDiff(rowSum(blurred[i - 1], x), arr[i - 1])), // <= 여기도 있다.
  blurred
);

boxBlur = image =>
  image
    .map(x => x.reduce(blurRow, []))
    .reduce(blurRows, [])
    .map(x => x.map(x => Math.floor(x / 9)));
```

## Comma Operator 정의

모두가 참고하는 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator) 을 참고하면 다음과 같은 정의를 볼 수 있다.

> 쉼표 연산자는 각각의 피연산자를 왼쪽에서 오른쪽 순서로 평가하고, 마지막 피연산자의 값을 반환합니다.

으레 그렇듯 정의만 보면 잘 모르겠으니, 하단에 딸린 실제 코드를 통해 Comma Operator 의 실체를 파악해 보자.

```js
var x = 1;

// 하기 변수 선언식(assignment expression)에서 =(할당연산자)우측에서 ,(쉼표 연산자)를 볼 수 있다.
x = (x++, x);

// 쉼표 연산자의 피연산자는 각각 x++ 와 x 이다.
// 첫번째 피연산자 x++(후위 증감 연산자) 는 1로 평가되고, 두번째 피연산자 x가 평가된다
// 위 정의에 따라 왼쪽에서 부터 오른쪽으로 평가하고 가장 오른쪽은 피연산자 x(2가 담겨있다)를 반환한다.
// 해당 반환값은 다시 =(할당 연산자)의 피연산자가 되어 x 에는 x(2를 담은) 가 할당된다.
// 결과는 다음과 같다

console.log(x);
// expected output: 2

// 아래의 예시도 동일하다 .
x = (2, 3);

console.log(x);
// expected output: 3
```

## Comma Operator 활용

### For 문

for 문은 모두 익숙할 것이다. 아래와 같이 for 문에 `,` 를 쓰는데 `,` 는 operator 이다.

```js
for (var i = 0, j = 9; i <= 9; i++, j--)
  console.log('a[' + i + '][' + j + '] = ' + a[i][j]);
```

### 별도 예제들

아래의 결과에 납득이 가지 않는다면 [연산자 우선순위](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)에 대한 학습이 필요하다. 링크를 눌러 살펴보자.

```js
var a, b, c;

(a = b = 3), (c = 4); // Returns 4 in console
console.log(a); // 3 (left-most)

var x, y, z;

x = ((y = 5), (z = 6)); // Returns 6 in console
console.log(x); // 6 (right-most)
```

## 문제 해결

이제 개념도, 용례도 알아봤으니 원래 코드를 읽어보자.

```js
// 이 코드로 시작하자
blurRow = (blurred, x, i, arr) => (
  (i -= 2), // <= 쉼표가 있다. 무엇을 의미하는 쉼표인가?
  i <= 0
    ? (blurred[0] = x + (blurred[0] || 0))
    : (blurred[i] = x + blurred[i - 1] - arr[i - 1]), // <= 여기도 쉼표가 있다.
  blurred
);
```

우리에게 익숙한 코드로 변형해 보자

```js
// 코드를 읽을 수 있게 바꿔보자
blurRow = (blurred, x, i, arr) => {
  // <= ( 가 { 로 바뀌었다.
  i -= 2; // <= i에서 -2를 빼고
  i <= 0 // <= 삼항식이 평가된다. 평가과정에서 조건에 따라 blurred 배열 요소에 할당이 진행된다.
    ? (blurred[0] = x + (blurred[0] || 0))
    : (blurred[i] = x + blurred[i - 1] - arr[i - 1]); // <= 여기도 쉼표가 있다.
  return blurred; // <= blurred 를 리턴한다.
};
```

## 무엇이 왜 바뀌었는가?

- `( ) => ( ... , ..., blurred )`가`() =>{... return blurred; }` 로 바뀌었다.
- arrow function(화살표 함수) 사용시 뒤 이어지는 문(statement)의 평가 값이 return 된다. 단, 화살표 뒤에 block `{ }` 이 표기되면 기존 함수와 같이 명시적으로 return 을 써야 한다.
- 결국 위 코드를 썼던 사람의 의도는 `() =>{... return blurred; }` 형태로 별도 리턴을 하기 싫었던 것이다. 그래서 `( ... , ... , blurred )` 형태로 함수를 작성한 것이다.
- 그러나 방금 코드의 맥락에서는 return 을 명시적으로 활용한 코드가 가독성이 좋다. `,` 활용으로 인해 코드를 읽기가 힘들다.
- return 을 생략하는게 좋은 맥락은 코드가 간결할 때이다. 아래에 코드를 살펴보자.

```js
// 인자에 1을 더한 뒤 2를 곱해서 리턴하는 함수
addPlusOneMultiplytow = a => ((a += 1), a * 2);
```

- 코드가 간단한 경우 `=>` 화살표 함수와 `,` 를 활용한 `return` 이 더 간결하고 코드의 양도 작다.

## 정리

- 쉼표 연산자는 각각의 피연산자를 왼쪽에서 오른쪽 순서로 평가하고, 마지막 연산자의 값을 반환한다.
- 보통 for 문이나, 한줄에 여러개의 할당문을 쓸 때 활용한다.
- 추가로 `=>` 화살표 함수 뒤의 `statement`가 간결한 경우 2개 이상의 연산을 한뒤 return 을 별도 쓰지 않기 위해 활용된다.
- 다만 로직이 복잡한 statement를 `() => (... , ...)`로 썻을 때 가독성이 좋지 않다.
