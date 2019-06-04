# CodeSignal - Arcade - Arr Similar

## Problem

![image](https://user-images.githubusercontent.com/35516239/57354055-61734e80-71a5-11e9-933f-9640523ae1b4.png)

## What I learned 

- swap을 충족하기 위해서는 두 배열간의 다른 부분이 2개 여야 하고
- 그 부분의 위치를 바꿨을 때 같아져야 한다. 
- filter 함수와 배열의 length 를 통해 값 표현하기 
- python의 counter 와, zip 함수 

## My solution

```javascript
function areSimilar(A, B) {
    if(A.toString() === B.toString()) return true;
    const AdiffFromB = [];
    const BdiffFromA = [];
    A.forEach((v, i, arr) => {
        if (!(v === b[i])){
            AdiffFromB.push(v)
            BdiffFromA.push(b[i])
        }  
    })
    bdiffFroma.reverse()
    if(AdiffFromB.length === 2 && (AdiffFromB.toString() === BdiffFromA.toString())){
      return true;
    }
    return false;
}
```

## Solution

```javascript
function areSimilar(a, b) {
    const ad = a.filter((v,i)=>v!=b[i])
    const bd = b.filter((v,i)=>v!=a[i])
    return ad.length == 0 || (ad.length == 2 && ad.join('') == bd.reverse().join(''))
}
```

## Python Solution

```python
from collections import Counter as C

def areSimilar(A, B):
    return C(A) == C(B) and sum(a != b for a, b in zip(A, B)) < 3
```

```python
def areSimilar(A, B):
    return sorted(A)==sorted(B) and sum([a!=b for a,b in zip(A,B)])<=2
```

