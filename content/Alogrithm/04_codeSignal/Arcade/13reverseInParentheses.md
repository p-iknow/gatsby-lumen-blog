# CodeSignal - Arcade - reverseInParentheses

## Problem

![image](https://user-images.githubusercontent.com/35516239/56940892-11b0d980-6b4c-11e9-839f-30dec2a2a2d1.png)


## What I learned 

- indexOf("str or num", "start index") 해당 함수의 두번째 인자의 활용방안
- lastIndexOf 의 활용방안 
- substirng() 
- substing 대신 slice()를 쓰는 로직

## My solution

```javascript
const testcase = "foo(bar)baz(blim)"

function reverseInParentheses(string) {
    if(string.indexOf(")") < 0) return string;
    let reversedString, indexOfOpenParenth, indexOfCloseParenth, beforeParenth, afterParenth, parsedString;
    indexOfOpenParenth = string.lastIndexOf("(");
    indexOfCloseParenth = string.indexOf(")", string.lastIndexOf("("));
    beforeParenth = string.substring(0, indexOfOpenParenth);
    afterParenth = string.substring(indexOfCloseParenth +1);
    parsedString = string.substring(indexOfOpenParenth + 1, indexOfCloseParenth).split("").reverse().join("");

    return  reverseInParentheses(beforeParenth + parsedString + afterParenth)
}
reverseInParentheses(testcase);
```

## Solution

```javascript
const reverse = (str) => str.split('').reverse().join('');

const reverseParentheses = (s) => {
    while (s.includes('(')) {
        let l = s.lastIndexOf('(');
        let r = s.indexOf(')', s.lastIndexOf('('));
        s = s.slice(0, l) + reverse(s.slice(l + 1, r)) + (r + 1 === s.length ? s.slice(r, -1) : s.slice(r + 1));
    }
    return s;
};
```

