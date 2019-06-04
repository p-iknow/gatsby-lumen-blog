# CodeSignal - Arcade - palindromeRearranging

## Problem

![image](https://user-images.githubusercontent.com/35516239/57593082-d44d4280-7574-11e9-87c9-fe56a2e0bbb5.png)

## What I learned 

- 들어있는 각 요소의 개별 등장 횟수를 세고 그 횟수를 2로 나눈 나머지의 합이 1 또는 1 이하일때 에만 회문으로 변경가능하다.
- new Set 함수
- sort 함수 와 정규식 역참조 그리고 replace 함수를 이용한 풀이 
- 파이썬 count 함수

## My solution

```javascript
function palindromeRearranging(inputString) {
    if(inputString.length === 1) return true;
    const arrTypeStr = inputString.split("");
    const res = [];
    new Set(inputString.split("")).forEach(v => {
        let arr;
        arr = arrTypeStr.filter(el => el === v)
        res.push(arr)
    })
    const result = res.reduce((prev, curr) => {
        return prev + (curr.length % 2)
    }, 0)
 
    return result <= 1
}
```

## Solution

```javascript
function palindromeRearranging(inputString) {
    return inputString.split('').sort().join('').replace(/(\w)\1/g,'').length < 2; 
}
```

## Python Solution

```python
def palindromeRearranging(inputString):
    return sum([inputString.count(i)%2 for i in set(inputString)]) <= 1
```

