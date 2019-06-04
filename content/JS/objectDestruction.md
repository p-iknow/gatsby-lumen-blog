---
title: JS Object destructuring
date: '2019-05-24T23:46:37.121Z'
template: 'post'
draft: false
slug: 'js/object-destructuring/'
category: 'js'
tags:
  - 'js'
  - 'object destructuring'
description: 'es6 이후로 js 에서도 함수의 인자에 어떤 type이 들어가는 표시할 수 있는 방법이 생겼다. 바로 object destructuring 이다.
오늘은 해당 키워드에 대해 알아보자'
---

## 들어가며

[destructing assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 가 ES6 에 추가되었다는데.. JS를 시작한지 얼마안된 사람들은 도대체 그 기능을 어디다 써야 하는지 알수가 없다. 사실 대다수의 새로운 기술은 다량의 삽질과 고통을 줄이기 위해 탄생되었다. 그래서 어떤 기술에 대한 이해를 위해 일정량의 고통이 필요하다. 나 같은 초보자의 경우 기술이 없었다면 있었을 고통을 알지 못한다. 이미 모든 것이 잘 돌아가는 세상에서 시작했기 때문이다. 필자는 이해를 위해 그 고통을 상상해보았다.

## 이슈: 함수에 많은 인자(argument) 를 전달해야 할 경우

```js
apiRequest(
  '/index',
  'GET',
  { optiron : true },
  ["Content-Type: text/plain"],
  function(response) { ... },
  null,
  true
)
```

- 인자가 많다. 그 많은 인자가 도대체 무슨 의미인지 알기 힘들다. **고통스럽다!**
- 함수 선언부로 넘어가 어떤 parameter들이 정의 되어있는지 참고해볼수도 있지만 번거로운 일이다. **고통스럽다!!**
- 이런 문제를 해결하기 위한 키워드로 `named arguement` 가 있는데, 주로 `python`, `kotlin` 에서 사용된다. **내 고통을 해결해줄 기술이 있다고?!**

```python
# 파이썬 named argument
from math import sqrt

def quadratic(a, b, c):
    x1 = -b / (2*a)
    x2 = sqrt(b**2 - 4*a*c) / (2*a)
    return (x1 + x2), (x1 - x2)

quadratic(31, 93, 62) # 이렇게 함수를 호출할 수도 있지만
quadratic(a=31, b=93, c=62) # 이렇게 각 인자의 의미를 함께 표기해서 호출할 수 있다.
```

- 자바스크립트에서도 해당 기능을 사용할 수 있다. **다행이다**
- 구현 모습이 같지는 않지만 목표는 동일하게 달성할 수 있다. **야호!!**
- 구현을 위해 일단 자바스크립트의 object destructing 에 대한 이해가 필요하다. **이제 object destructing 이해를 위한 명분이 생겼다!!**

## Object destructing

아래 코드를 보면 object destructing 이 무엇인지 직관적으로 알 수 있다.

```javascript
// e.g. Object destructing
var someObject = { a: 1, b: 2, c: 3 };
var { a: a, b: c, c: c } = someObject;

// 더 즐여서 아래와 같이 사용할 수 있다.
var someObject = { a: 1, b: 2, c: 3 };
var { a, b, c } = someObject;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```

objectg destructing 을 이용하면 위에서 인자의 의미가 무엇인지 파악하기 어려웠던 문제를 효과적으로 해결할 수 있다.

```js
// 함수 호출
apiRequest({  // 인자들이 {}로 감싸져있다. 함수에 객체를 전달하고 있다!!
  endpoint: 'products',
  method: 'GET',
  getParams: { category: 3 },
  headers: ["Content-Type: text/plain"],
  callback: function(response) {},
  timeout: 0,
  authRequest: true
})

// 함수 선언부
function ({
	apiRequest, //{}를 주의하라. 우리는 객체를 인자(parameter)로 받고 있다.
  endpoint,
  method,
  getParams,
  headers,
  callback,
  timeout,
  authRequest,
}) {
  //...
}
```

### 무엇이 달라졌는가?

- 전달인자(argument) 가 객체이다
- 객체 특성상 key, value 형태로 전달하는 값이 어떤 의미를 가지고 있는지 표현이 가능하다.
- 그 표현을 통해 코드를 읽기가 편하다.

## default parameter 활용하여 조금 더 개선하기

사실 object destructing 과정에서 특정 값을 기본으로 설정할 수 있다. 아래 코드를 참고하자

```js
var someObj = { a: 1, b: 2 };
var { a, b, c = 123456 } = someObj;

// a = 1
// b = 2
// c = 123456
```

위 코드를 참고하면 apiRequest 함수를 더 개선할 수 있다.

```javascript
// 함수 선언부에서 기본적으로 쓰이게 될 값을 세팅해두고
function apiRequest({
  endpoint,
  method = 'GET',
  getParams = {},
  headers = ['Content-Type: text-plain'],
  callback = () => {},
  timeout = 0,
  authRequest = true,
} = {}) {
  //...
}

// 실제 함수호출할 때에는 필요한 내용만 인자로 전달받는다
apiRequest({
  endpoint: 'products',
  getParams: { category: 3 },
});
```

이것이 바로 `named parameters(or named arguments)`라 불리는 패턴이며 우리는 이것을 javascript object 와 es6의 destructing 문법을 통해 구현할 수 있다.

## return 값에 적용

- 해당 destructing을 리턴값에 적용하여 활용할 수도 있다. 다음 예제를 참고하자

```js
function apiRequest({ ... }) { // 인자로 무언가를 받게될 것이다라는 표현을 ... 으로 표현했다.
  var response, error, loading
  response = error = loading = null
  // ... 추후 작성될 로직에서 response, error, loading 값이 할당될 것이다.
  return { // 객체로 리턴하는 것에 주목!!
    response,
    error,
    loading,
  }
}
// 추후 리턴된 객체를 destructing 하여 활용할 수 있다.
var { response, error, loading } = apiRequest({ ... })

```

## 정리: Object 를 인자(argument) 로 전달하면 좋은 점

- 전달하는 인자가 무엇인지 표시할 수 있다. 의미전달에 용이하다
- **순서가 필요없다. 객체는 배열과 다르게 순서와 무관한 자료구조이기에 인자 전달시에 순서를 고려하지 않아도 된다.**
- default parameter 를 사용하면 호출시 불필요하게 많은 인자를 전달받지 않아도 된다.
- 해당 패턴을 함수 retrun에도 사용할 수 있다.

## 조심할 것

### 1. 그렇다고 인자를 엄청받는 함수를 마구 만들어도 된다는 걸까?

- 아니다. 함수가 인자를 많이 받아서 처리한다면 문제가 있는 것일 수 있다.
- 분명 많은 역할을 담당하는 함수일 확률이 높고 SRP(단일 책임의 원칙)에 위배된다.
- 인자를 많이 받는 함수라면 해당 함수를 하위 함수로 분리할 수 없는지 생각해보자.
- 그 고민을 해소하기 위해 [Partial Application of Functions](https://hackernoon.com/partial-application-of-functions-dbe7d9b80760) 를 읽어보는 것도 좋겠다.

### 2 단지 여러 패턴중 하나일 뿐이다.

- 인자를 하나만 받아도 되는 함수에 굳이 객체로 인자를 전달해야 할까? 아니다.
- 방법론은 맥락적이다. 맥락이 달라지면 다시 고민해야한다. 뭐든 해결하는 방법론은 없다.
