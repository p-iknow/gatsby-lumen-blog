# Promise 설계

## Promise의 기본동작 살펴보기

### Promise 인스턴스 생성

- 프로미스 객체는 인스턴스 생성시 executor 함수를 인자로 받는다.
- executor 함수는 resolve, reject 콜백함수를 인자로 받아 실행된다.

```js
// 프로미스 인스턴스 생성
new MyPromise((resolve, reject) => {
  resolve('여기에 value가 들어갑니다.');
  //reject("여기에 value가 실행됩니다.")
});

// executor
executor = (resolve, reject) => {
  resolve('여기에 value가 들어갑니다.');
  //reject("여기에 value가 실행됩니다.")
};
```

### then 메소드

- 생된된 프로미스 인스턴스의 then 메소드는 callback 함수를 인자로 받아 실행된다
- 해당 callback은 처음 생성된 프로미스 인스턴의 resolve 함수가 실행된 이후 실행된다.
- 해당 callback이 실행될 때 전달되는 value 인자는 처음 생성된 프로미스 인스턴스 resolve에 인자로 전달된 값이다.

```js
new MyPromise((resolve, reject) => {
  resolve('첫번째 프로미스');
}).then(value => {
  console.log(value); // value 에는 '첫번째 프로미스'가 담김
  return '두번째 프로미스';
});
```

- 이때 처음 생성한 프로미스 인스턴스의 resolve가 비동기로 실행되면 then 메소드 실행시 callback은 실행되지 않는다.
- callback은 앞에서 말했듯이 프로미스 인스턴스의 resolve가 실행된 후 실행된다.

```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프로미스');
  }, 1000);
})
  .then(value => {
    // callback 이 실행되지 않기 때문에 콘솔에 안찍힘
    console.log(value); // 나중에 비동기 resolve가 실행된 후 그때 callback이 실행됨
    return '두번째 프로미스';
  })
  .then(value => {
    console.log(value);
  });
```

- 위 결과를 토대로 프로미스의 동작을 살펴보면 플로우가 아래와 같이 진행될 수 있다.

```js
// 동기 로직
new promise() -> 동기 resolve(value) 실행 -> Promise 인스턴스 생성 -> .then 메소드 호출 -> callback(value) 호출

// 비동기로직
new Promise() -> 비동기 setTimeout(()=>resolve(value),100) -> Promise 인스턴스 생성 -> .then 메소드 호출
// 비동기 setTimeout 콜스텍에 등장
resolve(value) -> callback(value)
```

### 체이닝(`new Promise().then.then`)

- 처음 프로미스 인스턴스 생성 뒤 then 메소드를 호출하고 다시 뒤이어 then 을 호출할 수 있다.
- 두번째 `.then`의 `callback`은 역시나 첫번째 `.then`의 `callback` 이 실행된 후 실행된다.
- 두번째 `callback`에 인자로 전달되는 것은 첫번째 `.then` callback의 `return` 값이다.

```js
new MyPromise((resolve, reject) => {
  resolve('첫번째 프로미스');
})
  .then(value => {
    // value 에는 '첫번째 프로미스'가 담김
    console.log(value); // "첫번째 프로미스" 출력
    return '두번째 프로미스';
  })
  .then(value => {
    // 전달되는 인자는 첫번째 .then callback의 return '두번째 프로미스'
    console.log(value); // "두번째 프로미스" 출력
    // 암묵적인 undefined 리턴
  });

// 비동기
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프로미스');
  }, 1000);
})
  .then(value => {
    // 나중에 비동기 resolve가 실행된 후 그때 callback이 실행됨
    console.log(value);
    return '두번째 프로미스';
  })
  .then(value => {
    // 전달되는 인자는 첫번째 .then callback의 return '두번째 프로미스'
    // 나중에 첫번째 .then callback이 실행되고 그 이후 두번째 .then의 콜백이 실행
    console.log(value);
  });
```

- 위 결과를 토대로 다시한번 플로우를 살펴보자

```js
// 동기 로직
new promise() -> 동기 resolve(value) 실행 -> Promise 인스턴스 생성 -> 첫번째 .then 메소드 호출 -> 첫번째 callback(value) 호출  -> ??? -> 두번째 .then 메소드 호출
-> 두번째 callback 호출
// 비동기로직
new Promise() -> 비동기 setTimeout(()=>resolve(value),100) -> Promise 인스턴스 생성 -> .then 메소드 호출 -> ??? -> 두번째 .then 메소드 호출
// 비동기 setTimeout rsolve 콜스텍에 등장
resolve(value) -> 첫번째 callback(value) -> 두번째 callback()
```

- 세가지의 의문점이 생긴다.
  - 첫째 `.then 어떻게 연속으로 체이닝이 될 수 있는가?`
  - 둘째 `resolve가 실행됬는지 혹은 .then 내부에 callback이 실행되었느지 여부에 따라 .then 의 로직이 바뀌는데 어떻게 가능한 것인가?`
  - 셋째 '어떻게 비동기 resolve 이후 .then(callback)의 callback이 실행될 수 있는가?, 어떻게 비동기 resolve(value) 실행에 전달된 인자 값(value)이 그후 다음 .then 메소드의 callback(value)의 인자로 전달될 수 있는가?`
- 이 의문점을 가지고 Promise를 구현해보자

## 프로미스 구현하기

### `.then` 메소드가 리턴하는 것은 무엇인가?

- 우선 첫째 `.then 은 어떻게 연속으로 체이닝이 될 수 있는가?` 에 대한 답을 해보자.
- .then 은 프로미스의 method 이다. 그렇다면 두번째 `.then` 호출하기 위해서는 앞의 로직 `new promise(executor).then(callback)` 이
- 그렇다는 것은 `Promise(executor).then(callbak)` 프로미스를 리턴 한다고 볼 수 있지 않을까?(아마도 내부적으로 자기 자신을 리턴 `return this`, 혹은 새로운 프로미스를 리턴할 것이다.`return new Promise(executor)`)
- 프로미스 내부의 then 메소드는 아래와 같을 것으로 예상한다.

```js
const MyPromise = class {
  constructor(executor) {
  }
  then(callbakc){
    if(...) return this;
    else return new Promise(executor)
  }
```

- `.then 메소드는 promise를 리턴한다. 그래서 .then 메소드를 다시 호출할 수 있다.`라는 문장으로 `.then`의 체이닝이 가능해진다.

### 프로미스 인스턴스의 상태가 필요해지는 순간

- 다음은 둘째 `resolve가 실행됬는지 혹은 .then 내부에 callback이 실행되었느지 여부에 따라 .then 의 로직이 바뀌는데 어떻게 가능한 것인가?`에 대한 답을 해야한다.
- 위에서 봤듯이 프로미스 인스턴스의 resolve가 실행됬는지에 따라 then 메소드의 작동방식이 달라진다.
- then 메소드의 작동을 달리하기 위해 프로미스의 상태값을 지정하는 것을 고려해볼 수 있다.
- 상태값에 대항 상세는 아래와 같이한다.
- 프로미스 객체는 "state" 라는 상태를 가진다.
- pending(default) (executor 내부의 resolve, reject가 실행되지 않았을 경우는 그냥 기다린다는 의미로 pending을 썻다.)
- resolved(executor 함수에서 resolve 가 실행되었을 때)
- rejected(executor 함수에서 resolve 가 실행되었을 때) (아직 언급도 안한 reject를 은근 쓸쩍 끼워 넣었다^^)
- 코드로 살펴보면 아래와 같을 것이다.

```js
const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    this.value = value;
    this.state = "resolved"; //resolve가 실행될 때 상태를 바꾼다.
  }

  reject(value) {
    this.value = value;
    this.state = "resolved"; //reject가 실핼될 때 상태를 바꾼다.
  }

  then(callback) {
     then(callbakc){
      // 상태에 따라 then 메소드를 달리 할 수 있는 여지가 생겼다.
      if(this.sate === "pending") return this;
      if(this.state === "resolved") return new Promise(executor)
    }
  }
};
```

- `promise 가 상태값을 가지고 resolve, reject 실행시 상태를 변경한다. .then 메소드는 promise의 상태를 구분하여 동작한다`라는 문장으로 `resolve 실행 여부에 따른 .then 의 다른 동작이 설명 가능해졌다.

### .then(callback) 에서 내부 callback 함수의 지연실행

- 셋째 '어떻게 비동기 resolve 이후 .then(callback)의 callback이 실행될 수 있는가?, 어떻게 비동기 resolve(value) 실행에 전달된 인자 값(value)이 그후 다음 .then 메소드의 callback(value)의 인자로 전달될 수 있는가?` 에 대한 답을 해보자.
- resolve 함수 이후 callback 을 실행하기 위해서 생각해볼 수 있는 방법으로 프로미스 resolve 함수 내부에서 callback을 실행시는 방법을 생각해볼 수 있다.
- resolve 함수는 어떻게 그리고 어디서 callback을 가져다 실행할 수 있을까?
- 프로미스의 인스턴스 생성시 callback을 저장할 공간읆 만들고 then 메소드 실행시에 그 공간에 callback을 저장하는 방법을 생각해볼 수 있다.
- 코드로 정리해보면 다음과 같다.

```js
const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    this.lastcalls = [] // [callbakc(this.value)] 가 담기게 된다.
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    this.value = value;
    this.state = "resolved";
    lastCalls.forEach(lastcall => lastcall())
    // callback(this.value)  가 실행되고 여기서 this는 첫번째 프로미스를 가르킨다
  }

  reject(value) {
    this.value = value;
    this.state = "resolved";
    lastCalls.forEach(lastcall => lastcall())
    // callback(this.value)  가 실행되고 여기서 this는 첫번째 프로미스를 가르킨다.
  }

  then(callback) {
     then(callbakc){
      // 비동기 resolve 일 경우
      if(this.sate === "pending") {
        this.lastcalls.push(callback(this.value))
        return new Promise(executor)
      }
      // callback(this.value) 에서 this 는 첫번째로 생성된 프로미스를 가르킨다.
      if(this.state === "resolved") return new Promise((resolve) => resolve(callback(this.value))) ;
    }
  }
};
```

- 위에서 이야기 하지 않은 부분이 있다, resolve가 동기적으로 실행될 경우 then에서는 `if(this.state === "resolved") return new Promise((resolve) => resolve(callback(this.value)))` 이런식으로 동작한다.

- 테스트를 해보자.

```js
// 동기로직
new MyPromise((resolve, reject) => {
  resolve('첫번째 프로미스');
}).then(value => {
  console.log(value); //  '첫번째 프로미스'
  return '두번째 프로미스';
});

// 비동기로직
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프로미스');
  }, 1000);
})
  .then(value => {
    console.log(value); // `첫번째 프로미스`
    return '두번째 프로미스';
  })
  .then(value => {
    console.log(value); // `두번째 프로미스`
  });
```

### this가 참조하는 것

```js
  constructor(executor) {
    this.state = 'pending';
    this.lastcalls = [] // [callbakc(this.value)] 가 담기게 된다.
    executor(this.resolve.bind(this), this.reject.bind(this)); // bind this를 참고하자!!
  }

  resolve(value) {
    this.value = value;
    this.state = "resolved";
    lastCalls.forEach(lastcall => lastcall())
    // callback(this.value)  가 실행되고 여기서 this는 첫번째 프로미스를 가르킨다
  }

  then(callbakc){
    // 비동기 resolve 일 경우
    if(this.sate === "pending") {
      // 여기서 this는 첫번째 promise를 가르킨다.
      this.lastcalls.push(callback(this.value)) // 여기서 push
      return new Promise(executor)
    }
    // callback(this.value) 에서 this 는 첫번째로 생성된 프로미스를 가르킨다.
    // ...
}

```

- 위 코드에서 핵심은 `callback(this.value)`가 실행될 때 this.value 가 첫번째 프로미스의 value를 참조한다는 사실이다.
- js에서 this 는 동적(dynamic)으로 binding 된다. this 가 포함된 라인이 어디서 처리(평가)되는가에 따라 달라질 수 있다는 말이다.
- callback(this.value) 처리(평가) 되는지 지점은 첫번째 프로미스의 resolve 함수내부이다.
- executor가 실행될 때 `executor(this.resolve.bind(this), this.reject.bind(this))` resolve 함수 스코프에서 this를 첫번째 프로미스로 binding 시켜 인자로 전달했다.
- bind에 의해 resolve 내부에서 this는 첫번째 프로미스를 가르키도록 고정(static) 된다.
- `callbakc(this.value)` 는 resolve 함수 스코프에서 실행(평가) 되며 this 는 첫번째 프로미스를 가르킨다.
- 많은 문제가 해결된 것 같다. 그런데 문게 조금 더 남아있다. 아니 많이 남았다.

### .then(callBack)의 callback 함수 내부에서 새로운 프로미스를 만들어 리턴한다면?

- `요건 몰랐지?` 하는 심정이겟지만(필자도 만들다가 그랬다), 아래 코드와 같이 .then(callBack)의 callback 함수 내부에서 새로운 프로미스를 만들어 리턴하는 경우도 있다.
- 심지어 그 안에 들어있는 resolve는 또 비동기이다. 어떻게 해야하나 총체적 난국이다.

```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프라미스');
  }, 1000);
})
  .then(res => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('두번째 프라미스');
      }, 1000);
    });
  })
  .then(res => {
    console.log(res);
  });
```

- 구글링을 통해 영어 블로그의 어떤 현자가 Promise를 구현한 것을 참고했고 해당 로직을 아래코드와 같이 적용했다.
- 핵심은 두번째로 생성되는 `resolve` 함수의 지연실행이다. 처음 작성했던 `callbakc`을 지연실행 했던 것을 참고하면 첫번째 프로미스의 `resolve` 내부에서 callback 대신에두번째로 생성되는 `Promise`의 `resolve`를 실행하게 만들면 된다. `callback` 이 아닌 `두번째 promise(then 메소드의 실행으로 탄생한)`의 `resolve` 함수의 지연실행 인 것이다.
- 아래 코드를 보자.

```js
const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    this.lastcalls = []; // [callbakc(this.value)] 가 담기게 된다.
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    // 두번째 프로미스 resolve의 인자로 callback에 의해 생성된 innerPromise가 들어올 것이다.
    // value = innerPromise
    if (value instanceof MyPromise) {
      value.then(innerPromiseValue => {
        // then 의 callback 이 샐행될 때
        // innerPromise의 인자로 내부 프로미스의 resolve("두번째 프로미스")실행에 인자로 전달된 "두번째 프롷미스가 전달된다
        // innerPromiseValue = "두번째 프로미스"
        this.value = innerPromiseValue; // 여기서 this는 두번째 프로미스를 가르키게 된다.
        this.status = state;
        this.laterCalls.forEach(latercall => latercall());
      });
    } else {
      this.value = value;
      this.state = state;
      this.laterCalls.forEach(latercall => latercall());
    }
    // callback(this.value)  가 실행되고 여기서 this는 현재 실행된 resolve 가 선언되었던 프로미스를 참조한다.
  }

  reject(value) {
    this.value = value;
    this.state = 'resolved';
    lastCalls.forEach(lastcall => lastcall());
    // callback(this.value)  가 실행되고 여기서 this는 첫번째 프로미스를 가르킨다.
  }

  then(callback) {
    if (this.state === 'pending')
      return new MyPromise(resolve => {
        // 두번째 promise executor가 실핼될 때 첫번째 프로미스로 두번째 resolve 함수의 실행을 담은 arrow function을 보낸다.
        this.laterCalls.push(() => resolve(callback(this.value)));
      });
    if (this.state === 'resolved')
      return new MyPromise(resolve => resolve(callback(this.value)));

    return this;
  }
};
```

- 함수를 본인이 구현하고도 왜 이렇게 작동하는지에 대한 의문이 남는 부분이 많았다.
- 이 글을 보는 독자들도 마찬가지로 같은 어려움이 있을 수 있기에 해당 부분들을 따로 정리했다.('나만 어려운 거 아니야?' 하는 생각이 들었으나 일단 정리하고 보자고 생각했다. )

## 어려운 부분들 짚고가기

### `this.laterCalls.push(...)`에서 this

- this는 왜 첫번째 Promise를 가르키는 것인지 의문이 들 수 있다.

```js
  then(callback) {
    if (this.state === 'pending')
      return new MyPromise(resolve => {
        // 두번째 promise executor가 실핼될 때 첫번째 프로미스로 두번째 resolve 함수의 실행을 담은 arrow function을 보낸다.
        this.laterCalls.push(() => resolve(callback(this.value)));
      });
    if (this.state === 'resolved')
      return new MyPromise(resolve => resolve(callback(this.value)));


    return this;
  }

```
- 위에서 언급했던 것 처럼 this 는 동적 (dynamic) 스코프를 가진다.   
-`this.laterCalls.push(() => resolve(callback(this.value)));` 가 실행되는 공간은 두번째 프로미스(then 메소드로 생성된)의 executor 내부이다.
- 두번째 프로미스 내부에서 executor를 실행 (`executor(this.resolve.bind(this), this.reject.bind(this));`) 시켰지만
- executor가 함수가 정의된 공간은 then 이하이다. 함수가 실행될 때 스코프는 정의된 순간의 스코프를 정적(static)으로 따르게 된다.


### `() => resolve(callback(this.value))`

- 이 부분은 promise에서 구현에서 가장 어려운 부분이다. 이해하고 나면 스코프와 this의 binding 개념을 명확히 할 수 있다.

```js
  resolve(value) {
      // ... 생략
      this.value = value;
      this.state = state;
      this.laterCalls.forEach(latercall => latercall());
      // latercall ()
      -> () => resolve(callback(this.value))
      // 여기서 resolve 함수는 두번째 프로미스의 resolve 함수를 참조한다.
      -> resolve(callback(this.value))
      // 여기서 this.value 는 첫번째 promise의 this.value를 참조한다.
      -> callback(this.value)
    }
  }
```

#### `resolve` 가 어떻게 두번째 프로미스의 resolve 함수를 참조하는가?

- 우선 `resolve` 가 어떻게 두번째 프로미스의 resolve 함수를 참조하는지 알아보자.
- 저기 resolve는 두번째 프로미스 내부에서 executor의 실행시에 this가 bind되어 인자로 전달됬다.(`executor(this.resolve.bind(this), this.reject.bind(this));`)
- resolve는 함수이다. JS 에서 함수는 객체이다. 객체는 변수 할당시에 실제 값에 대한 참조정보를 할당한다.
- 특정 값이 함수의 인자로 전달될 때 그 값은 복사된다. 객체를 가르키는 참조값은 복사되도 여전히 그 참조는 실제 객체를 가르킨다.
- executor 내부에서 resolve를 전달받을 때 참조값이 전달되고 해당 참조는 여전히 resolve 를 가르킨다.
- executor 내부에서 `this.laterCall.push`를 통해 첫번째 promise의 latercalls 배열에 저장했다.
- 함수는 객체이고 객체는 참조값으로 형태로 전달되기에 latercalls 내부에서도 resolve는 여전히 두번째 promise를 가르킨다.
- 결론적으로 첫번째 프로미스의 resolve 함수 내에서 latercall() -> () => (resolve(...)) 로 실행되는 resolve 도 여전히 두번째 promise의 resolve를 참조한다.
- resolve 내부의 callback 도 마찬가지로 생각하면 된다.

#### callback(this.value) 에서 this는 어떻게 첫번째 프로미스를 참조하는가?

- callback(this.value)this.value 는 동적(dynamic) 바인딩된다.
- callback(this.value)가 실행되는 것은 첫번째 프로미스의 resolve 함수 아래이다.
- 첫번째 프로미스 executor 실행시 resolve 내부의 this를 첫번째 프로미스와 bind 시켜 인자로 전달했다.
- `executor(this.resolve.bind(this), this.reject.bind(this));`
- 때문에 this는 첫번째 프로미스를 참조한다.

### value.then(innerPromiseValue => {this.value = InnerPromiseValue})

- 이 부분을 이해하는데 큰 어려움을 겪었다. 이해하고 나면 this binding과 arrow function에 대해 이해할 수 있다. `- value.then(callback) 에서`callback` 내부의 this 가 왜 resolve 함수스코프에 this에 binding 되는가?

```js
  resolve(value) {
    // 두번째 프로미스 resolve의 인자로 callback에 의해 생성된 innerPromise가 들어올 것이다.
    // value = innerPromise
    if (value instanceof MyPromise) {
      value.then(innerPromiseValue => {
        // then 의 callback 이 샐행될 때
        // innerPromise의 인자로 내부 프로미스의 resolve("두번째 프로미스")실행에 인자로 전달된 "두번째 프롷미스가 전달된다
        // innerPromiseValue = "두번째 프로미스"
        this.value = innerPromiseValue; // 여기서 this는 실행중인 resolve 함수 스코프의 this(두번째프로미스)를 참조한다.
        this.status = state;
        this.laterCalls.forEach(latercall => latercall());
        // callback(this.value)  가 실행되고 여기서 this는 resolve 함수스코프의 this 를 참조한다.
      });
    }
  }
```

- 우선 앞서 말했던 것 처럼 함수가 실행될 때의 스코프는 함수가 선언됬을 때의 스코프를 따른다. 이를 정적(static or lexical)스코프라 한다.
- 때문에 callback 함수의 내부의 스코프는 해당 함수가 선언되었던 resolve 내부의 스코프를 따르게 된다.
- 그러나 this는 정적스코프를 따르지 않고 dynamic 스코프를 따른다. 정적 스코프를 따르게 하기 위해서는 선언 이후 `function(){}.bind(this)` bind 함수를 this를 정적스코프를 따르도록 바꿔줘야 한다.
- 그런데 bind() 말고 this 를 고정시키는 또 다른 방법이 있다. 바로 arrow function `() => {}` 이다. 이렇게 실행된 화살표 함수에서 `block{}` 내부의 this 는 선언될 당시의 this를 따른다.
- `value.then(()=>{})` 내부에 선언된 callback은 arrow function 이다. arrow function 의 `block{}` 내부에서 this 는 선언될 당시의 스코프의 this를 따른다.
- 선언될 당시의 스코프는 resolve 함수의 스코프이다. resolve 함수의 스코프는 resolve 함수가 선언될 당시의 스코프에 바인딩 되어있다.
- `executor(this.resolve.bind(this), this.reject.bind(this));` 이 코드가 resolve 함수의 this를 각 프로미스에 바인딩 시킨다.
- 정리하면 `value.then(()=>{this})` 내부 callback 함수 스코프에서 this는 resolve 함수 스코프의 this를 따르고, resolve 함수의 this는 resolve를 실행시킨 프로미스를 참조한다.
- 결과적으로 `value.then(()=>{this})` 내부 callback 함수 스코프에서 this는 resolve 를 실행시킨 프로미스를 참조하게 된다.
