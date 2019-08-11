---
title: React(16.4v) Life Cycle
date: '2019-08-10T23:46:37.121Z'
template: 'post'
draft: True
slug: 'React/life-cycle'
category: 'React'
tags:
  - 'React'
  - 'Front End'

description: 'Vanila JS로 검색 자동완성 라이브러리를 만든다. 코드의 재사용을 고려하여 객체를 설계했고 설계과정에서 MVC 패턴을 적용했다. 사용자와 성능을 고려하여 debounce, throttle 등의 UI 제어 기술을 사용하였다.'
---

## TLDR

- 리엑트 life cycle method 에 대해 다룬다. 
- 각 method의 용도와 사용에 유의해야 할 점에 집중했다.

- react 16.4 버전을 기준으로 작성했다. 

## 들어가며

![image](https://user-images.githubusercontent.com/35516239/62819577-1d239000-bb92-11e9-812c-0a78fc5a167f.png)

  ## render

`render` 메소드는 pure(순수) 해야 한다. pure 의미는 다음과 같이 풀어볼 수 있다.  메소드 내부에서 state(상태)의 변경이 일어나면 안되며, render 메소드가 호출될 때마다 같은 결과를 보장해야 한다. 또한 브라우저와 직접적으로 상호작용을 하도록 해서는 안된다. 

브라우저와 상호작용하기 위해서는 `componentDidmount()` 메소드를 활용해야 한다. 

`render` 메소드 이전에 `shouldComponentUpdata()` 가 호출되는데 `shouldComponentUpdata()`의 리턴값이 false 이면 `render` 메소드는 호출되지 않는다. 이점을 활용하면 불필요한 `dom` 변경을 줄일 수 있다. 

## constructor

메서드를 바인딩하거나 state를 초기화하는 작업이 없다면, 해당 React 컴포넌트에 constructor 를 구현하지 않아도 된다.

React 컴포넌트의 생성자는 해당 컴포넌트가 마운트되기 전에 호출된다.`React.Component`를 상속한 컴포넌트의 constructor를 구현할 때에는 다른 구문에 앞서 `super(props)`를 호출해야 한다. 그렇지 않으면 `this.props`가 constructor 내에서 정의되지 않아  추후에 사용시에 undefined로 평가되고 이는 버그로 이어질 수 있다..

constructor는 보통 아래의 두 가지 목적을 위하여 사용한다:

- `this.state`에 객체를 할당하여 [지역 state](https://ko.reactjs.org/docs/state-and-lifecycle.html)를 초기화
- 인스턴스에 [이벤트 처리](https://ko.reactjs.org/docs/handling-events.html) 메서드를 바인딩

`constructor()` 내부에서 **setState()를 호출하면 안된다.** 컴포넌트에 지역 state가 필요하다면 생성자 내에서 `this.state`에 초기 state 값을 할당하자.

```js
constructor(props) {
  super(props);
  // 여기서 this.setState()를 호출하면 안된다.
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

생성자는 `this.state`를 직접 할당할 수 있는 유일한 곳이다. 그 외의 메서드에서는 `this.setState()`를 사용해야 한다.

constructor 내부에서 side effect(부수 효과)를 발생시키거나 subscription을 수행하면 안된다. 해당 작업은 `componentDidMount()`를 활용하면 된다.

> ###  주의해야할 사항
>
> **state에 props를 복사하면 안 됩니다! 가장 흔히 범하는 실수 중 하나다.**
>
> ```js
> constructor(props) {
>  super(props);
>  // 이렇게 하지 마라!
>  this.state = { color: props.color };
> }
> ```
>
> 이것은 불필요한 작업이며(`this.props.color`를 직접 사용하면 됩니다), 버그를 발생시킵니다(`color` props의 값이 변하더라도 state에 반영되지 않는다. 의도와 달라지는 것이다).
>
> **props의 갱신을 의도적으로 무시해야 할 때만 이와 같은 패턴을 사용하자.** 이 경우, 해당 props의 이름을 `initialColor` 또는 `defaultColor` 등으로 변경하는 편이 자연스럽습다. 그러면 이후 필요에 따라 컴포넌트가 [`key`를 변경](https://ko.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key)하여 초기 state를 “재설정”하도록 강제할 수 있다.
>
> props의 값에 의존하는 state가 필요할 때 어떻게 해야 하는지에 대하여 알고 싶다면,  [state로부터 값을 가져오지 않는 법에 대한 블로그 글](https://ko.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)을 읽어보자.

## 부수효과를 발생시켜도 되는가? 

커밋단계의 라이프 사이클 메소드는 된다. 

그 마운팅 단계에서는 부수효과를 일으키면 안된다. 무슨 차이 인가?