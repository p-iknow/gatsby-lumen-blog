# JS 단축평가(short-circuit evaluation) 

## 개요

- JS 에서 단축평가란 무엇인가? 
- 단축평가를 사용할때의 이점
- 단축평가를 사용할 때 유의할 점 

##  JS 에서 단축평가란 무엇인가?

- 단축 평가(short circuit) 

```
a = (b = 'string is truthy'); // b gets string; a gets b, which is a primitive (copy)
a = (b = { c: 'yes' }); // they point to the same object; a === b (not a copy)
```

------

`(a && b)` is logically `(a ? b : a)` and behaves like multiplication (eg. `!!a * !!b`)

`(a || b)` is logically `(a ? a : b)` and behaves like addition (eg. `!!a + !!b`)

```
(a = 0, b)` is short for not caring if `a` is truthy, implicitly return `b
```

------

```
a = (b = 0) && "nope, but a is 0 and b is 0"; // b is falsey + order of operations
a = (b = "b is this string") && "a gets this string"; // b is truthy + order of ops
```

