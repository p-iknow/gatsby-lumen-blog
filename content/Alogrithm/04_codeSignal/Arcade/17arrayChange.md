# CodeSignal - Arcade - Array Change

## Problem

![image](https://user-images.githubusercontent.com/35516239/57595785-12049800-7582-11e9-856f-2667d2af92a6.png)

![image](https://user-images.githubusercontent.com/35516239/57595815-36607480-7582-11e9-9297-4d01e7be89ff.png)

## What I learned 

- 시퀀스를 만들기 위해서는 이전 인덱스의 값과 현재 인덱스 값의 차이에 대한 합이 필요

## My solution

```javascript
function arrayChange(inputArray) {
    let res = 0;
    inputArray.reduce((prev, curr, v, i) => {
            if (prev < curr) return curr;
            const diff = Math.abs(prev - curr);
            const shift = diff + 1; 
            res += shift
            return curr + shift
        
    } )
    return res;

}
```

## Solution

```javascript
function arrayChange(series) {
    var moves = 0;
    
    for (var i = 1; i < series.length; i++) {
        if (series[i] <= series[i - 1]) {
            diff = series[i - 1] - series[i] + 1;
            series[i] += diff;
            moves += diff;
        }
    }
    
    return moves;
}
```

## Python Solution

```python
def arrayChange(inputArray):
    a = 0
    for i in range(1, len(inputArray)):
        if inputArray[i] <= inputArray[i - 1]:
            f = (inputArray[i - 1] - inputArray[i]) + 1
            inputArray[i] = inputArray[i - 1] + 1
            a += f
    return a
```

