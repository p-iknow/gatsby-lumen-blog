---
title: Carousel UI 만들기(With Vanilla JS)
date: '2019-07-12T23:46:37.121Z'
template: 'post'
draft: false
slug: 'project/lib/carousel'
category: 'Front End'
tags:
  - 'Observer 패턴'
  - 'Front End'
  - '객체지향'
  - 'carousel'
  - 'JS'

description: 'Vanila JS로 carousel 라이브러리를 만든다. 코드의 재사용을 고려하여 객체를 설계했고 설계과정에서 obbserver 패턴을 적용했다.'
---

## TLDR

- Vanila JS로 carousel 라이브러리를 만든다. 코드의 재사용을 고려하여 객체를 설계했고 설계과정에서 obbserver 패턴을 적용했다.
- template literal을 활용하여 ejs, pug 등의 라이브러리 없이 templating을 경험해 본다. 
- 브라우저 캐쉬 전략을 경험해 본다. 

## 1. template literal 활용과 함수로직 분리 

### 1-1기획 

- react 에서 component 처럼 분리해 보면 어떨까?

![image](https://user-images.githubusercontent.com/35516239/60788658-25a23880-a198-11e9-94db-92f4a2fa6eff.png)
- component로 관리하면 business logic 에만 집중할 수 있는 장점이 있기 때문에 이렇게 판단했다.
### 1-2 Sudo code
- carouselHeader, carouselMain, carousel(index) 로 나누고, carousel이 header와 main template를 포함한다
- carousel(index)
  - carouselHead
  - carouselMain
- 실제 데이터를 받아 templating을 작동할 때는 carousel 만 이용하자.
- 각 컴포넌트는 데이터를 받아 template에 데이터를 주입시켜서 완성된 html 텍스트를 반환하는 함수가 되야 한다.
#### 1-2-1  컴포넌트 

```js
// carouselHeader 
const carouselHeader = data => 
`
  <ul class="carousel__header">
    ${data} //
  </ul>
`
export default carouselHeader;

------------------------------------------------------

// carouselMain
const carouselMain = data => 
`
  <div class="carousel__main">
    ${data} //
  </div>
`
------------------------------------------------------

// carousel
import carouselHeader from './carouselHeader.js';
import carouselMain from './carouselMain.js';

const carousel = data =>
  `
  <div class="carousel">
    ${carouselHeader(data)}
    ${carouselMain(data)}
  </div>
`;

export default carousel;

```

#### 1-2-2 템플릿을 만드는 함수

```js
const makeDataToHtml = (data, templateFunc) => templateFunc(data);
```

## 2. 데이터 캐쉬

### 2-1 기획 

- [localstorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)를 이용하자
- 먼저 localStorage 를 조회하여 data가 있는지 점검하자 
- 없다면 fetch를 통해 데이터를 끌어다 쓰자(여기서 분기를 줄때 catch 메소드를 쓰면되겠다)
  - 다시 생각해보니 catch 는 오류를 잡을 때 쓰는거라, 분기를 줄때 써도 되는건지 의심스럽다. 
- fetch를 하고나서 localstroage에 다시 저장해두자 
- 업데이트나 변화가 있으면 새로 받아와야 하니까 버전정보도 함께 저장하자, 나중에 cache 유무 점검시 버젼 정보를 확인해 cache 에 저장된 버젼과 current 버젼이 다르면 데이터를 새로 업데이트 하도록 하자.   
- [Frontend caching strategies](https://medium.com/@brockreece/frontend-caching-strategies-38c57f59e254) 참고

### 2-2 sudo

```js
const currentVersion = 1
let data = localStorage.getItem('data')
let version = localStorage.getItem('version')
const URL = 'http://127.0.0.1:5500/data.json';
if (!version || version < currentVersion) {
  fetch(carouselURL).then((response) => {
    data = response;
    localStorage.setItem('data', data)
    localStorage.setItem('version', currentVersion)
  })
}
```

### 2-3 반영하며 어려웠던 점 

- `data = localstorage.getItem('data')` 는 동기적으로 작동하며 값을 리턴한다. 
- `fetch(carouselURL)` 은  비동기로 작동하며  프로미스를 리턴한다. 
- 동기로직은 바로 데이터를 받아 처리하면 되지만, 비동기 로직은 반환된 프로미스 값에 `.then` 메소드 체인을 통해 처리해야 한다. 그렇다보니 화면을 그리는 코드(`makeDataToHtml(data, carouselTemplate)`) 와 carousel 객체 생성 코드가 분기별(if, else)로 중복된다. 한쪽은 동기적 처리, 한쪽은 프로미스 패턴으로 처리해야 하기 때문이다. 

```js
window.addEventListener('DOMContentLoaded', () => {
 const URL = 'http://127.0.0.1:5500/data.json';
 const version = localStorage.getItem('version')
 const currentVersion = 1
  if (!version || version < currentVersion) {
    // 비동기 로직
    fetch(url)
      .then(response => response.json())
      .then(data => {
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('version', currentVersion);
      return data;})
      .then(parsedData => {
      makeDataToHtml(parseddata, carosuelTemplate)}) // 중복
      .then(_ => new Carousel()) // 중복 
      .then(carousel => carousel.init()); // 중복
  } else {
    // 동기 로직
      const data =  JSON.parse(localStorage.getItem('data'));
      makeDataToHtml(data, carosuelTemplate); // 중복
      const carousel = new Carousel(); // 중복
      carousel.init(); // 중복 
  }

}  
```

### 2-4 해결방법: 모두 Promise를 반환하여 chaining을 하자

- Async, await 을 통해  html 렌더링 이후 `new Carousel()` 이 실행되도록 하자 

```js
// renderHTML
const getCarouselData = async (currentVersion, url) => {
  const version = localStorage.getItem('version');
  if (!version || version < currentVersion) {
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('version', currentVersion);
        return data;
      });
  } else {
    return await Promise.resolve(localStorage.getItem('data')).then(response =>
      JSON.parse(response),
    );
  }
};

const renderHTML = ({ currentVersion, url, templateFunc }) => {
  const body = document.querySelector('body');
  const data = getCarouselData(currentVersion, url);
  return data.then(parsedData => {
    body.insertAdjacentHTML('afterbegin', templateFunc(parsedData));
  });
};

export default renderHTML;
-------------------------------------------------------------------------
// app.js 
window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: 'http://127.0.0.1:5500/data.json',
    templateFunc: carouselTemplate,
  }).then(_ => {
    carouselInit();
  });
});

```

## 3. 앱 실행시킬 때 초기화는 어떻게 하는게 좋을까?

### 3-1 기획 

- 데이터를 받아와서 렌더링하기 전까지 carousel 인스턴스가 초기화되면 안된다. 렌더링 이후로 init의 순서가 보장되어야 한다. 
- 렌더링(templating)과 carousel(조작)객체는 무관해야 하니까 분리해야 한다.
- app.js 는 entry point 이므로 복잡도를 높이지 말자. 렌더링과 관련된 로직을 따로 분리하여 캐시 전략의 의도를 분명히 할 수도 있다.

### 3-2 Real

```js
// app.js 
window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: 'http://127.0.0.1:5500/data.json',
    templateFunc: carouselTemplate,
  }).then(_ => {
    const carousel = new Carousel(config);
    carousel.init();
  });
});
```



## 4. Carousel 리펙토링 

### 4-1 책임과 역할 파악해보기(+개선요소 파악)

#### 4-1-1 책임과 역할 파악 
![image](https://user-images.githubusercontent.com/35516239/60788704-3d79bc80-a198-11e9-804a-df65c50ae592.png)
- 현재 상단에 표기된 `nav`, `pagenation` 은 현재 carousel 객체(view + model 짬뽕) 내부에 몽땅 들어있다.
- nav, pagenation 을 각각의 view 로 분리해서 그려봤다.
- 현재는 view가 화면을 그리는 일 이외에 상태를 관리하는 일까지 모두 한다. 이럴 경우 변경이 필요한 순간 모든 코드를 다 고쳐야 하며 그것은 끔찍한 일이다. 
- 상태관리는 별도의 객체(model) 가 하도록 하고, 각 view 들은 그리는 일만 담당하도록 바꿔야 한다. 
- 기존 MV* 모델과 다른 특이한 점은 각 view가 독립적이지 않고, 상태변경에 따라 같이 변한다는 점이다. 
  - nav의 변경이 pagenation의 변경을 유발한다.
  - pagenation의 변경이 nav 의 변경을 유발한다.  

#### 4-1-2 개선 요소 

- `clikedIndex` 를 파악할 때, 클릭된 nav 요소의 인덱스를 파악하기 위해 `getClikedIndex()` 내부에서  `indexOf(e.target)` 을 쓰고 있는데, 클릭할 때 마다 n번의 탐색 비용이 발생한다. html 내부에 data 속성에 인덱스 정보를 추가해 그것으로 인덱스를 파악하는 방식으로 개선하자 

### 4-2 인터렉션의 주요 흐름을 설계로 표현하기

#### 4-2-1 역할들 

이벤트 &rarr; 상태변경 &rarr; 화면의 변화 

#### 4-2-2 역할 할당 (구체화)
![image](https://user-images.githubusercontent.com/35516239/60788722-49fe1500-a198-11e9-85a0-caddb7dddc57.png)
- 각 view 는 이벤트 등록과 화면 변경의 역할을 가진다.
- model은 상태를 변경한다. 
- **이벤트가 발생하면 view는 model에게 상태 변경을 요청한다(메시지를 보낸다)**
- **상태가 변경되면 model은 각 view에게 화면 변경을 요청한다(메시지를 보낸다)**
- **'객체간의 소통은 메세지를 통해 한다.' 라는 말이 이런거였구나 하는 무릎 탁 하는 순간!!** 

#### 4-2-3 *케러셀의 독특한 특징
![image](https://user-images.githubusercontent.com/35516239/60788738-571b0400-a198-11e9-9565-acb297f31d9a.png)
- 한쪽 view가 발생시킨 이벤트가 모델의 상태변경을 요청한다.
- 여기서 조금 특이한게 **해당 상태변경의 파급력이 존재하는 모든 view 에 화면변화를 유도**한다는 점이다. 
- 슬슬 패턴이 보이기 시작한다. 주변 동료들이 옵저버(observer) 패턴을 쓴다고 하는데 옵저버 패턴을 공부해보자. 

### 4-3 Observer Pattern

#### 4-3-1 [blog 학습](https://webdevstudios.com/2019/02/19/observable-pattern-in-javascript/) 

> The observer pattern is a software design pattern in which **an object, called the subject**, **maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.**
>
> **The observer pattern defines a one-to-many relationship. When one object updates, it notifies many other objects that it has been updated.** 
>
> Here is a brief explanation for each:
>
> - **subject** – This is the object that will send out a notification to all of the ‘observers’ who want/need to know that the subject was updated. In our case, the subject will be the application state object.
> - **observers** – These are the objects that want to know when the subject has changed. In our case, these will be the page elements that need to update when the application state changes.

 **''옵저버 패턴은 일대다 관계를 정의한다. 상태를 관리하는 객체의 변경이 있을 경우 다른 모든 객체에 그 변경을 알려야 한다.**" 라는 내용은 바로 **4-2-3 에서 발견했던 독특한 특징**과  동일했다.  옵져버 패턴을 써야할 명분이 생겼다. 

> [obsever 패턴 데모](https://codesandbox.io/s/vqq4vvxl20?view=preview)

## 4-4 Observer Pattern 과 조금은 다른 것들

### 이벤트 발동 이후의 구체적인 실행흐름 
![image](https://user-images.githubusercontent.com/35516239/60788757-65692000-a198-11e9-860f-8e442d9b8233.png)


### 4-4-1 그리기(기존) vs 데이터변경 요청 + 그리기(My)

- 참고 했던 observer 패턴의 observer 객체의 경우 **view 객체는 변경된 상태를 그리는 일(역할1**)만한다. 
- 나의 observer 패턴은 이벤트 발생시  **subject(Publisher) 에게 데이터 변경을 요청(역할2**)하고, 그 **요청 메시지에 데이터를 담아 보내기도 한다.** **두 가지의 역할 (역할1, 2)을 하는 것이다.**
- **이벤트를 감지해서 데이터의 변경을 요청하는 역할을 다른 객체에게 위임한다면 응집도가 떨어진다고 판단**하여 observer들에게 해당 역할을 부여했다. 
- 실제 새로운 view가 추가한다 하더라도 각 view에 별도의 수정이 필요가 없다

### 4-4-2 상태변경과 무관하게 view 내부적으로 화면을 그리고, stateManager에게  별도로 보고만 하는 로직 

```js
update(state) { // 여기서 update는 stateManager (Publisher)가 실행시키며, 인자 state도 Publisher의 this.state 이다.
  const { offset, currentItem } = state;
  this.moveMain(offset);
  if (this.isClone(currentItem)) this.fakeMove({ offset, currentItem });
}


fakeMove(state) {
  const itemWidth = this.item.offsetWidth;
  let { offset, currentItem } = state;

  if (currentItem === 0) {
    offset -= this.itemsLength * itemWidth;
    currentItem += this.itemsLength;
  } else {
    offset += this.itemsLength * itemWidth;
    currentItem -= this.itemsLength;
  }

  this.subject.setState({ offset, currentItem });
  setTimeout(() => this.moveWithoutAnimation(offset), this.config.duration);
}
```

- 구체적으로 `fakeMove()` 함수의 경우 상태변경에 따른 반응이라기 보다는 view 내부의 필요에 의해 화면을 그린다. 
- **보통은 observer 들은 publisher 들에게 통지받은 결과를 화면에 그리는 수동적인 객체이지만,** **Main 객체는 내부적인 필요에 의해 스스로 화면을 그리고, 그린 결과와 해당 상태를 publisher(stateManager)에게 보고한다. 이때 따라 상태의 변동이 발생하지만, publisher는  상태의 변화를 view에게 다시 통지(notify) 하지 않는다.**  

### 4-4-3  stateManager의 setState 와 updateState 

```js
 setState(data = {}) {
    this.state = Object.assign(this.state, data);
  }

  updateState(eventReporter) {
    const UpdatedState = StateManager.getUpdatedStateFrom[eventReporter](
      this.state,
    );
    this.state = Object.assign(this.state, UpdatedState);
    this.notify(this.state);
  }
```



- 위 로직을 구현 하려면 stateManager 에게는 상태만 변경하는 함수와, 상태변경을 반영 한 후 observer 들에게 상태의 변화를 통지하는 함수가 필요하다.  
- **setState 는 데이터를 받아 상태만 변경하는 함수이다. **
- **updateState 함수는 이벤트 리포터의 이름을 받아 해당 리포터에 따른 상태 연산을 수행하고, 상태 변경한다. 그렇게 변경된 상태를 observer 들에게 다시 통지한다. 통지를 받은 Obersver 객체는 변경된 상태를 기반으로 다시 화면을 그린다.** 

### 4-4-4 getUpdatedStateFrom[eventReporter]

- 앞에서 "updateState 함수는 이벤트 리포터의 이름을 받아 해당 리포터에 따른 상태 연산을 수행" 한다고 했는데, 구체적으 무슨 연산을 하는건가?
-  이번에 만든 carousel 은 사용자가 어떤 이벤트를 발생시키냐(nav 클릭, arrow 버튼 클릭)에 따라 다소 복잡한 상태연산이 필요하다.  **stateManger는 이벤트를 감지해 상태를 변경하고, 그 변경된 상태를 observer에게 통지하는 본연의 업무에 집중시키는 편이 좋겠다** 라고 생각했다. 
- 새로운 view를 추가하거나 수정시에(유지, 보수) 때 stateManager(publisher)는 수정하지 않도록 하면 유지보수가 용이 해진다고 판단했기 때문이다. 그렇게 상태연산과 관련된 내용을 stateUpdater 라는  싱글톤 객체에 위임했고,  초기화 시에 그 객체를 stateManager의 static Member로 추가한 뒤 활용했다.

```js
// stateUpdater
const stateUpdater = {
  Main(state) {
    const { offset, currentItem, direction, itemWidth } = state;
    if (direction === 'next')
      return {
        offset: offset - itemWidth,
        currentItem: currentItem + 1,
        currNavItem: currentItem,
      };
    return {
      offset: offset + itemWidth,
      currentItem: currentItem - 1,
      currNavItem: currentItem - 2,
    };
  },

  Nav(state) {
    const { offset, currentItem, itemWidth, currNavItem } = state;
    return {
      offset: offset + itemWidth * (currentItem - (currNavItem + 1)),
      currentItem: currNavItem + 1,
    };
  },
};


-----------------------------------------------------------------------

// 초기화시에 static member로 추가 
  
const initCarousel = () => {
  StateManager.getUpdatedStateFrom = stateUpdater; // 여기서 추가함
  const stateManager = new StateManager();
  const main = new Main(config);
  const nav = new Nav(config);

  stateManager.addObserver(main, nav);
  main.addSubjet(stateManager);
  nav.addSubjet(stateManager);

  main.init();
  nav.init();
};
--------------------------------------------------------------------
// 아래 처럼 사용 한다.
 updateState(eventReporter) {
    const UpdatedState = StateManager.getUpdatedStateFrom[eventReporter](
      this.state,
    );
    this.state = Object.assign(this.state, UpdatedState);
    this.notify(this.state);
  }
```

## 그래서 결론적으로 뭐가 어쨌다는 건가? 

- 나름 유지, 보수에 용이한 설계가 된 것 같다. 왜? 새로운 view  를 만들어야 하면,  view 객체(obeserver)를 만들고, stateUpdater 에 상태와 관련된 함수를 추가하면 된다. 그게 끝이다. 
- 좋은 설계는 유지보수를 잘 견뎌야 한다. 설계 목적은 그것이다. 앞으로도 유지보수에 강한 견고한 설계를 위해 고민하자!!
- 고생했다. 짝짝짝!!