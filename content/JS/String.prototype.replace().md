---
title: String.prototype.replace()
date: '2019-07-30T23:46:37.121Z'
template: 'post'
draft: false
slug: 'js/string-replace/'
category: 'JS'
tags:
  - 'JS'
description: '알고리즘 풀때 replace() 메소드를 가끔 써봤다. 이번에 vanila JS로 검색 자동완성 라이브러리 만들 때, 자동완성 문자열 중 쿼리 부분을 <span> 으로 감싸기 위해 replace를 적극적으로 사용할 일이 있어 다시 공부하게 되었다. 공부하며 알게 된 점을 정리했다. replace() 메서드는 특정 패턴(교체할 대상) 과 교체문자열(대상을 이 문자열로 대신한다) 을 받아 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다. 그 패턴은 문자열("")이나 정규식(RegExp)이 될 수 있으며, 교체 문자열은 문자열이나 전달된 콜백 함수일 수 있다. 특이점으로는 pattern이 문자열 인 경우, 첫 번째 문자열만 치환이 되며 원래 문자열은 변경되지 않는다.'
---

## 들어가며 

알고리즘 풀때 `replace()` 메소드를 가끔 써봤다. 이번에 vanila JS로 검색 자동완성 라이브러리 만들 때, 자동완성 문자열 중 쿼리 부분을 `<span>` 으로 감싸기 위해 replace를 적극적으로 사용할 일이 있어 다시 공부하게 되었다. 공부하며 알게 된 점을 정리했다.   

## String.prototype.replace() 는 뭐하는 메소드인가?

**replace()** 메서드는 특정 패턴(교체할 대상) 과 교체문자열(대상을 이 문자열로 대신한다) 을 받아 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다. 그 패턴은 문자열("")이나 정규식([`RegExp`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp))이 될 수 있으며, 교체 문자열은 문자열이나 전달된 콜백 함수일 수 있다. 특이점으로는 `pattern`이 문자열 인 경우, 첫 번째 문자열만 치환이 되며 원래 문자열은 변경되지 않는다.

## Syntax

 JS 로 표현하면 아래와 같다.

```
var newStr = str.replace(regexp|substr, newSubstr|function
```

## 매개변수

- `regexp` (pattern)

  정규식([`RegExp`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp)) 객체 또는 리터럴. 일치하는 항목은 `newSubStr` 또는 지정된 함수(`function`)가 반환 한 값으로 대체된다.

- `substr` (pattern)

  `newSubStr`로 대체 될 [`String`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String). 정규식이 아닌 글자 그대로의 문자열로 처리됩니다. 첫 번째 일치되는 문자열만 대체된다

- `newSubStr` (replacement)

  첫번째 파라미터를 대신할 문자열([`String`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)). 여러가지 대체 패턴들이 지원됩니다. 아래의 "[매개변수가 `string`으로 지정되었을 때](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter)" 섹션을 참고하세요.

- `function` (replacement)

  주어진 `regexp` 또는 `substr`에 일치하는 요소를 대체하는 데 사용될 새 하위 문자열을 생성하기 위해 호출되는 함수. 이 함수에 제공되는 인수는 아래 "[매개변수가 `function`으로 지정되었을 때](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter)"단원에서 설명합니다.

## Return ? 

어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열

## 세부 사항

replace 메서드는 호출된 [`String`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String) 객체를 바꾸지 않고. 단순히 새로운 문자열을 리턴한다(immutable).

모든 문자열에 대해 검색하고 바꾸려면 정규표현식의 `g`플래그를 포함해야 한다.

### 매개변수가 `string`으로 지정되었을 때

`replacement` 문자열은 다음과 같은 특수 교체 패턴을 포함할 수 있다. 이 부분이 핵심이다.

| Pattern | Inserts                                                      |
| ------- | ------------------------------------------------------------ |
| `$$`    | "`$`" 기호를 삽입한다                                        |
| `$&`    | 매치된 문자열을 삽입한다.                                    |
| `'$`    | 매치된 문자열 앞쪽까지의 문자열을 삽입한다.                  |
| `$'`    | 매치된 문자열의 뒤쪽 문자열을 삽입한다.                      |
| `$*n*`  | *n*이 1이상 99이하의 정수라면, 첫번째 매개변수로 넘겨진 [`RegExp`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp)객체에서 소괄호로 묶인 *n*번째의 부분 표현식으로 매치된 문자열을 삽입한다. |

### 매개변수가 `function`으로 지정되었을 때

두번째 매개변수로 함수를 지정할 수 있다. 이 경우, 함수는 정규표현식 매치가 수행된 후 호출 된다. 함수의 반환값은 교체될 문자열이 된다. (참고: 윗쪽에서 언급된 특수 교체 패턴은 반환값에 *적용되지 않는다.*) 만약 정규표현식의 플래그로 글로벌(`g`)이 오는 경우, 함수는 매치될 때마다 계속 호출된다. 

함수의 매개변수들은 다음과 같습니다.

| Possible name | Supplied value                                               |
| ------------- | ------------------------------------------------------------ |
| `match`       | 매치된 문자열. (윗쪽의 `$& `표현식으로 매치된 경우와 동일하다.) |
| `p1,p2,...`   | 윗쪽의 $n 표현식과 동일합니다. (`$1`은 `p1`, `$2`는 `p2`...) 예를 들어, 만약 정규표현식 `/(\a+)(\b+)/` 이 주어진다면` ``p1`은 `\a+`와 매치되고 `p2`는 `\b+`와 매치된다. |
| `offset`      | 조사된 전체 문자열 중에서 매치된 문자열의 `index.`(예를 들어, 조사될 전체 문자열이 `abcd`이고, 매치된 문자열이 `bc`면 이 매개변수의 값은 1이 된다.) |
| `string`      | 조사된 전체 문자열 (`replace`를 호출한 `string`)             |

`p1, p2` 등의 정확한 수는 첫 번째 인수가 [`RegExp`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 객체인지 아닌지에 따라 다르며, 소괄호`()`로 묶이는 부분표현식의 갯수에 따라 달라진다. 

다음 예제는 `newString`을 `'abc - 12345 - #$*%'`로 교체한다

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

## Example

### `replace()`의 첫번째 인자로 정규표현식 사용

다음 예제에서, 대소문자를 구분하지 않는 정규표현식을 `replace()`의 첫번째 인자로 정규 표현식을 사용

```js
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...
```

'Twas the night before Christmas...'로 출력한다.

### 첫번째 인자의 정규식에 `global`과 `ignore`를 사용한 `replace()`

Global replace는 정규식으로만 수행 할 수 있다. 다음 예제에서 정규 표현식은 replace()가 **모든 'apples'**를 'oranges'로 바꿀 수 있도록 global 및 ignore case 플래그를 사용했다.

```js
var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');
console.log(newstr);  // oranges are round, and oranges are juicy.
```

`oranges are round, and oranges are juicy.` 가 출력된다.

### 문자열의 단어 치환시 특수 교체 패턴 활용

다음 스크립트는 문자열의 단어를 전환한다. 대체 텍스트는 `$1` 와 `$2` 대체 패턴을 사용한다.

```js
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);  // Smith, John
```

**'Smith, John.'**이 출력된다

### 함수를 통한 변환

아래 예제에서 문자열의 대문자가 모두 소문자로 변환되고 일치되는 위치 바로 앞에 하이픈이 삽입된다. 여기에서 중요한 점은 일치되는 항목이 대체 항목으로 다시 반환되기 전에 추가 작업이 필요하다는 것이다.

바꾸기 기능은 일치하는 문자를 매개 변수로 받아 각 케이스별로 변환한후 반환하기 전에 하이픈을 연결한다.

```js
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}

styleHyphenFormat('borderTop'), // border-top
```

반환 후 추가 작업이 필요하다면 함수를 통해 변환하는 편이 좋다. 함수를 사용하지 않을 경우 아래와 같은 접근 방법을 생각해 볼 수 있다.

```js
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work
```

그러나  `'$&'.toLowerCase()` 는 우리의 예상과 달리 `$&` 를 반환한다. `$&` 일반 문자열로 평가되고 해당 문자열에 `.toLowerCase()` 를 실행한 결과는 여전히  `$&`  이다. 

### 화씨를 섭씨로 바꾸는 예제

```js
function f2c(x) {
  function convert(str, p1, offset, s) {
    return ((p1 - 32) * 5/9) + 'C';
  }
  var s = String(x);
  var test = /(-?\d+(?:\.\d*)?)F\b/g;
  return s.replace(test, convert);
}
```

`(?:)` 는 캡쳐하지 않는 그룹을 표시하는 플래그이다 

### 정규식과 replace 함수를 통해 반복문 대체하기

아래 예제는 string pattern 을 받아서 배열을 담은 `array`를 반환하는 예제이다. 

**Input:**

스트링은 `x`, `-` 그리고 `_` 로 구성되어 있다.

```html
x-x_
x---x---x---x---
x-xxx-xx-x-
x_x_x___x___x___
```

**Output:**

반환되는 객체의 배열에 대한 설명은 다음과 같다. .  `'x'` 가 있다면  `state`는   `'on'` 이다.   `'-'` (hyphen) 은  `state` 는 `'off'` 이다.  마지막으로 `'_'` 는 `'on'` 의 `length` 를 의미한다. 

예를 들어 `x-x_ ` 를 변환하면 아래와 같다. 

```json
[
  { on: true, length: 1 },
  { on: false, length: 1 },
  { on: true, length: 2 }
]
```

for 문을 대체하는 로직은 다음과 같다.

```js
var str = 'x-x_';
var retArr = [];
str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
  if (p1) { retArr.push({ on: true, length: p1.length }); }
  if (p2) { retArr.push({ on: false, length: 1 }); }
});

console.log(retArr);

[
  { on: true, length: 1 },
  { on: false, length: 1 },
  { on: true, length: 2 }
]
```

## 참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace