---
title: React app에 코드스플리팅 적용하기
date: '2019-09-19T10:46:37.121Z'
template: 'post'
draft: false
slug: 'front-end/react-codespliting'
category: 'Front End'
tags:
  - 'Front End'
  - 'Webpack'
  - 'React'
description: '리엑트 앱에 코드스플리팅을 적용한 경험에 대해 다룬다. 이와 관련된 웹펙 설정과 리엑트 코드에 대해 다룬다.'
---

## TLDR

- 리엑트 앱에 코드스플리팅을 적용한 경험에 대해 다룬다. 
- 이와 관련된 웹펙 설정과 리엑트 코드에 대해 다룬다.

## 왜 code Spliting 이 필요할까? 

대부분의 React 앱은 [Webpack](https://webpack.js.org/)  같은 도구를 사용하여 "번들 된"파일을 갖게 된다. 번들링은 가져온 파일을 따라 하나의 파일, 즉 "번들"으로 병합하는 프로세스다. 이 번들(js)은 웹 페이지에 포함되어 한 번에 전체 앱을 로드 할 수 있다.

번들링은 훌륭하지만 앱이 커짐에 따라 번들도 커진다. 특히 큰 `third-party` 라이브러리를 포함하는 경우. 번들에 포함된 코드를 주의깊게 확인해야 한다. 실수로 커진 앱으로 인해 로드시간이 오래 걸리는 문제가  발생하기 때문이다.  실제 webpack을 통해  React Todo App 을 번들링 하던 도중 bundle size가 크다는 이유의 경고를 마주하게 되었다.

![webpack-bundle-size-big](https://user-images.githubusercontent.com/35516239/65141573-db68ed80-da4b-11e9-80ed-ffc27370caa5.png)

큰 번들로 묶이지 않으려면 번들을 [`code splitting`](https://webpack.js.org/guides/code-splitting/) 하는것이 좋다. `code splitting` 기능은 런타임시 동적으로 로드할 수 있는 여러 번들을 만들 수 있는 `Webpack`  번들러에서 지원되는 기능이다.

`code splitting`을 하면 자주 바뀌지 않는 부분을 브라우저에 캐싱하고, 바뀐 부분만 로드하거나, 사용자가 현재 필요로하는 것들만 `lazy-load`할 수 있으므로 앱의 성능을 크게 향상시킬 수 있다. 앱의 전체 코드 양을 줄이지는 않지만 사용자가 필요로하지 않은 코드를 로드하는 것을 피하고, 초기 페이지 로드시 필요한 코드만 받게 된다. 이것이 `code splitting` 을 해야하는 이유다. 아래 그 방법을 적었다. 

## [splitChunk](https://webpack.js.org/plugins/split-chunks-plugin/)

> 하기 내용은 [요즘 잘나가는 프론트엔드 개발환경](https://shiren.github.io/2018-04-16-요즘-잘나가는-프론트엔드-개발-환경-만들기(2018)-Webpack-4/) 블로그의 글을 옮겼다. 

우선 splitChunk 라는 플러그인을 통해 코드 스플리팅이 가능하다. node_modules 처럼 변하지 않는 JS 파일을 vendor파일로 분리(chunkhash로 네이밍)하여 브라우저 캐시를 활용하도록 최적화 하기 위해 splitChunk 라는 webPakck 내장 플러그인을 설정했다.

 splitChunk를 이용하면 대형 프로젝트에서 거대한 번들 파일을 적절히 분리하고 나눌 수 있다. 파일 사이즈, 비동기 요청 횟수 등의 옵션에 따라 자동으로 분리할 수 있고 정규식에 따라서 특정 파일들만 분리할 수 있고 혹은 특정 엔트리 포인트를 분리할 수 있다. 번들 파일을 적절히 분리하면 브라우저 캐시를 전략적으로 활용할 수 있으며 초기 로딩속도를 최적화할 수도 있다. 물론 프로젝트의 필요에 따라 엔트리 포인트를 분리해서 여러 가지 번들 파일을 만들 때도 사용된다.
splitChunks 에 대한 자세한 이야기는 [여기](https://webpack.js.org/plugins/split-chunks-plugin/#select-chunks) 에서 확인할 수 있다.

```js
//..
module.exports = {
    //..
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }

  //..
}
```

`cacheGroups` 는 명시적으로 특정 파일들을 청크로 분리할 때 사용한다. 여기서는 common 이란 청크를 분리한다. 내용을 살펴보면 `test` 를 사용해 대상이 되는 파일을 정규식으로 잡는다. 여기서는 `node_modules` 디렉터리에 있는 파일들이다. `name` 은 청크로 분리할 때 이름으로 사용될 파일명이다. 우리의 설정에서는 output.filename 옵션에 `[name]` 에 대치될 내용이기도 하다. `chunks` 는 모듈의 종류에 따라 청크에 포함할지 말지를 결정하는 옵션이다 `initial` 과 `async` 그리고 `all` 이 있다. 여기서는 `all` 을 사용하는데 말 그대로 `test` 조건에 포함되는 모든 것을 분리하겠다는 뜻이다. `initial` 은 초기 로딩에 필요한 경우, `async` 은 `import()` 를 이용해 다이나믹하게 사용되는 경우에 분리한다.

분리된 파일들은 서버가 열리면 `HtmlWebpackPlugin` 이 알아서 index.html에 주입해준다. 물론 production 빌드를 하면 분리된 번들 파일 두개가 생성된다

### before

- bundle 하나만 로드되었다. 

![before-one-bundle](https://user-images.githubusercontent.com/35516239/65139125-10267600-da47-11e9-8a67-ecf9c91af77e.png)

### After

- bundle 이 main 과 vendor 코드로 분리되었다. 잘 바뀌지 않는 vendor 번들의 경우 브라우저에 캐싱하여 매번 로드되지 않도록 하면 초기 로딩시간을 일부 향상 시킬 수 있다. 

![after-spliting](https://user-images.githubusercontent.com/35516239/65244941-99f94080-db26-11e9-85fd-5b37de08ff9e.png)

## `React.lazy` 와 `React.Suspend`를 통한 코드 스플리팅

다음은 `React.lazy` 이다. 이를 사용하면 사용자가 현재 필요로하는 것들만 `lazy-load`할 수 있으므로 앱의 성능을 크게 향상시킬 수 있다`React.lazy` 은 내부적으로  `dynamic import()`(동적 import)구문을 이용한다. 

`dynamic import`에 대한 자세한 내용은 [여기](https://javascript.info/modules-dynamic-imports) 와 코드 [리엑트 공식문서](https://javascript.info/modules-dynamic-imports)를 살펴보자.( 참고로 해당 문법은 JS stage3 에 등록된 문법으로 [Babel](http://babeljs.io/)을 사용할 때는 `Babel` 이 dynamic `import` 구문을 분석하게 하기위해서 [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import) 플러그인이 필요하다.)

`React.lazy` 함수를 사용하면 `dynamic import`를 사용하여 가져온 컴포넌트를 랜더링 할 수 있다. 

### before

```jsx
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

### after

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

`MyComponent` 컴포넌트가 랜더링되면 `OtherComponent`컴포넌트를 포함한 번들이 자동으로 로드된다. React 컴포넌트를 `export default`로 해석되는 `Promise`로 반환하고 `React.lazy`로 dynamic `import()`를 할때에는 함수 형태로 사용한다.

## Suspense

`dynamic import` 를 사용하여 해당 자원이 필요할 때 로딩하면 초기 로딩속도는 분명하게 빨라진다. 그러나 필요할 때 네트워크 요청이 시작되어 불러오므로 요청 부터 화면 렌더링 까지 일정시간  delay가 있을 수 있다. 이때  `Suspense` 컴포넌트를 사용한다면, `MyComponent`가 랜더링 될 때까지 동적으로 불러온 `OtherComponent`가 아직 로드가 되지 않은경우 **로딩중**과 같은 `fallback content` 표현이 가능하다. (실제로 `React.lazy`를 통해 불러온 컴포넌트를 `Suspense` 컴포넌트로 감싸지 않으면 브라우저에서 에러를 낸다.) 

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`fallback` 기능은 컴포넌트가 로드 될 때까지 기다리는 동안 랜더링하려는 모든 React요소에 적용가능합니다. `Suspense` 컴포넌트는 `lazy` 컴포넌트를 감쌉니다. 하나의 `Suspense` 컴포넌트로 여러 `lazy` 컴포넌트를 래핑할 수도 있습니다.

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

 현재 만들고 있는 React Todo 프로젝트는 라우터를 통해 Home, Todo, About 페이지를 별도로 보여준다. 처음 로딩시에는 사용자에게 보이는 페이지 하나만 로딩하고 나머지는 필요한 경우 네트워크 요청해 import 하면 된다. 이 부분에 위에서 다뤘던 내용을 적용해 보았다.

### before

```js
import React from 'react';
import './TodoListTemplate.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Todo from './Todo';
import Home from './Home';
import About from './About';
import Fallback from './Fallback';

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <h1 className="title">TODO LIST</h1>
      <Router>
        <Nav />
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route path="/todo" component={Todo} />
          <Route path="/about" component={About} />
          <Route component={Fallback} />
        </Switch>
      </Router>
    </main>
  );
};

export default TodoListTemplate;

```

### after

```jsx
import React, { Suspense, lazy } from 'react';
import './TodoListTemplate.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Loader from './Loader';

// lazy 적용
const Todo = lazy(() => import('./Todo'));
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Fallback = lazy(() => import('./Fallback'));

const TodoListTemplate = () => {
  return (
    <main className="todo-list-template">
      <h1 className="title">TODO LIST</h1>
      <Router>
        <Nav />
        // 서스펜스 적용 
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route path="/todo" component={Todo} />
            <Route path="/about" component={About} />
            <Route component={Fallback} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default TodoListTemplate;

```

빌드 후 main 과 vendor 이외에 0, 1, 3, 4의 새로운 청크파일이 보인다. 필요할 때 import 되기 위해 청크가 나눠진 것이다.

![청크파일](https://user-images.githubusercontent.com/35516239/65151640-73250680-da61-11e9-9b24-0593b8c75453.png)

이제 해당 페이지의 컴포넌트가 필요할 때 청크파일을 요청하는 것을 볼 수 있다.

![screencast 2019-09-18 22-09-38](https://user-images.githubusercontent.com/35516239/65151552-496bdf80-da61-11e9-8b43-12383f5eafd3.gif)

## clean webpack plugin

코드를 스플리팅하고 캐쉬 활용을 위해 output 옵션에  [chunkhash] 를 설정했다.  빌드를 몇번 하니 dist 폴더에 금세 분리된 chunk 가 한 가득이다. 이런 경우 빌드할 때 기존의 dist 디렉터리를 지워주고 싶을 수 있는데, `clean webpack plugin` 이 그 역할을 한다.  

![dirty-dist-because-of-chunk](https://user-images.githubusercontent.com/35516239/65146963-12dd9700-da58-11e9-8c66-f5d7f6d31e9b.png)

플러그인을 설치하고 

```bash
yarn add clean-webpack-plugin -D
```

간단한 설정을 해준다.

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
{...
    plugins: [
			new CleanWebpackPlugin()	
  ],
 ...     
}
```

이제 매 프로덕션 빌드전에 dist 디렉토리는 깔끔하게 지워지고 새로 빌드된 js 파일만 남게된다. 

![image](https://user-images.githubusercontent.com/35516239/65149184-99947300-da5c-11e9-8c1b-89f1df673711.png)

## ManifestPlugin

**hash**와 **chunkhash**를 쓰면 다음과 같이 느낄 수 있다. *app.js*를 쓰다가 청크해시를 준 이후부터는 *app.청크해시.js*를 사용해야 한다. 문제는 청크해시 부분이 어떻게 나올지 미리 예측할 수가 없다는 것이다. 예를 들어 `<script src="app.청크해시.js"></script>`를 할 때 청크해시 부분에 뭐를 넣어줘야할지 모르는 상황이 생긴다.(사실 `HtmlWebpackPlugin` 을 사용하면, `script` 태그를 자동으로 넣어주기 때문에 걱정할 필요가없다.) 이런 상황을 해결하는게  `manifest` 플러그인 이다 

플러그인을 설치하고  

```bash
yarn add webpack-manifest-plugin -D
```

간단한 설정을 해준다.

```js
const ManifestPlugin = require('webpack-manifest-plugin');
{...
    plugins: [
			new ManifestPlugin({
      	fileName: 'assets.json',
      	basePath: '/'
    }),
  ],
 ...     
}
```

이제 build 후에 output의 path 경로에 `assets.json`이 생긴다. 그 파일을 열어보면

```json
{
  "/vendors.js": "vendors.e65aa7211353e4a5e028.js",
  "/main.js": "main.ea2180b26f1702649647.js",
  "/2.c7dce983472e333482ba.js": "2.c7dce983472e333482ba.js",
  "/3.afb2010b2f39b22982d0.js": "3.afb2010b2f39b22982d0.js",
  "/4.8e8cad92fc70c08bcd4a.js": "4.8e8cad92fc70c08bcd4a.js",
  "/5.e9ab5b38134949b33253.js": "5.e9ab5b38134949b33253.js",
  "/favicon.ico": "favicon.ico",
  "/index.html": "index.html"
}
```

이렇게 미리 청크 해시값을 알 수 있게 json 구조로 나와있다.  

