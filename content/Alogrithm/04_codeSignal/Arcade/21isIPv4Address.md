# CodeSignal - Arcade - isIPv4Address

## Problem

![image](https://user-images.githubusercontent.com/35516239/57965024-32b16100-7979-11e9-8bef-683ed25be4a2.png)

![image](https://user-images.githubusercontent.com/35516239/57965037-5aa0c480-7979-11e9-9dc9-402489e5e137.png)

## What I learned 

- input 조건을 제대로 살펴볼 것, input 에 숫자가 아닌 lowercase 알파벳이 들어온다.
- 반례에 대해 진지하게 생각해볼 것
- [파이썬 all 함수](https://wikidocs.net/32#all) 자바스크립트 every 함수와 유사함
- [파이썬 isdigit 함수](https://m.blog.naver.com/PostView.nhn?blogId=lee95292&logNo=221201880034&proxyReferer=https%3A%2F%2Fwww.google.com%2F) 
- [파이썬 len 함수](https://wikidocs.net/32#len) 
- [자바스크립트 every 함수 활용](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## My solution

```javascript
function isIPv4Address(inputString) {
    const ipArr = inputString.split(".");
    if(! (ipArr.length === 4) ) return false;
    for (v of ipArr) {
        if (v === "") return false;
        if(!v.split("").every(v => !isNaN(Number(v)))) return false; 
        if ( Number(v) < 0 || Number(v) > 255 ) return false;
    }    
    return true;
}
```

## Solution

```javascript
function isIPv4Address(s) {
  var  r=s.split(".")
  return r.length===4&&r.every(x=>x!=""&&!isNaN(x)&&x>=0&&x<256)
}
```

## Python Solution

```python
def isIPv4Address(s):
    p = s.split('.')

    return len(p) == 4 and all(n.isdigit() and 0 <= int(n) < 256 for n in p)
```

