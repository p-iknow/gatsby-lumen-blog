# CodeSignal - Arcade - avoidObstacles

## Problem

![image](https://user-images.githubusercontent.com/35516239/57978699-141c9a00-7a4d-11e9-93c9-63238cef7886.png)

## What I learned 

- 논리평가에서 `jumpPoint % 2`  이  0 이면 자동으로 false 가 나오게 된다. 굳이 `jumpPoint % 2 === 0` 으로 점검하지 않아도 된다. 
- `if sorted([i%c for i in inputArray])[0]>0:` 표현 
  - inputArray를 돌면서 배열의 각 요소를 c로 나눈 나머지를 다시 배열로 리턴함 
  - 리턴한 배열을 sorting 함 
  - sorting 한 배열의 첫번째 값 즉 가장 작은 값이 0 보다 클 경우 -> 즉 나머지가 0 인 경우가 없다면 
- 잘 모르겠는 경우 작은 수 부터 특정 조건을 만족하는지 실험해보는 것도 하나의 방법 
- 특정 조건을 찾는 것이 중요한데 여기서는 팬과 종이를 활용하여 하나씩 대입해보는게 좋음 

## My solution

```javascript
function isValidJumpPoint(jumpPoint, arr) {
  return arr.every(v => v % jumpPoint !== 0);
}

function avoidObstacles(arr) {
  let jumpPoint = 2;
  while (!isValidJumpPoint(jumpPoint, arr)) {
    jumpPoint++;
  }
  return jumpPoint;
}
```

## Solution

```javascript
function avoidObstacles(arr) {
  for(var n=1;;n++) if(arr.every(x=>x%n)) return n
}
```

## Python Solution

```python
# 1
def avoidObstacles(inputArray):
    c = 2
    while True:
        if sorted([i%c for i in inputArray])[0]>0:
            return c
        c += 1

# 2 
def avoidObstacles(inputArray):
    i=2
    while True:
        if all(x%i!=0 for x in inputArray):
            return i
        i=i+1
```

