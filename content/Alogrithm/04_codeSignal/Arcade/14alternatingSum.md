# CodeSignal - Arcade - alternatingSums

## Problem

![image](https://user-images.githubusercontent.com/35516239/57208431-b6c92780-700e-11e9-9d5b-63cd7ed9cf11.png)

## What I learned 

- 나머지의 값이 리턴해야하는 배열과 동일한 것을 이용하여 reduce 함수로 처리하는 방식
  - `alternatingSums = a => a.reduce((p,v,i) => (p[i&1]+=v,p), [0,0])`

- 파이썬의 list 조회방식 `sum(a[::2]),sum(a[1::2]

## My solution

```javascript
function alternatingSums(a) {
    let team1=0, team2=0;
    a.forEach((v,i) => {
        if(i%2 === 0) team1 += v;
        if(i%2 === 1) team2 += v;
    })
    return [team1, team2]
}
```

## Solution 

```javascript
alternatingSums = a => a.reduce((p,v,i) => (p[i&1]+=v,p), [0,0])
```

## Python solution

```python
def alternatingSums(a):
    return [sum(a[::2]),sum(a[1::2])]
```

