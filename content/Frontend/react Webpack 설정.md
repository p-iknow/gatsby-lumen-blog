---
title: React 빌드(webpack) 환경 직접 구성하기 (without CRA)
date: '2019-08-09T10:46:37.121Z'
template: 'post'
draft: false
slug: 'front-end/react-webpack-config'
category: 'Front End'
tags:
  - 'Front End'
  - 'Webpack'
  - 'React'
description: 'webpack, babel 많이 들어는 봤으나 정작 해당 설정을 눈앞에 마주하면 아득 하기만 했다. 설정 이라는 영역은 사실 경험이 쌓이지 않으면 단번에 이해하기가 어렵다. 또한 webpack 과 babel은 수시로 update 되고 규칙과 네이밍이 미세하게 조정되며 어려움을 더한다. 그래서 이번에 리엑트를 시작하며  CRA(create react app) 없이 직접  Webpack 설정을 통해  React 빌드 환경을 구성하고자 한다. webpack에 어려움을 느꼈던 분들에게 도움이 될 수 있었으며 좋겠다. 참고로 이 글은  2019.08.09 에 webpack v4, babel 7 기준으로 작성했다.'
---

## 들어가며 

webpack, babel 많이 들어는 봤으나 정작 해당 설정을 눈앞에 마주하면 아득 하기만 했다. 설정 이라는 영역은 사실 경험이 쌓이지 않으면 단번에 이해하기가 어렵다. 또한 webpack 과 babel은 수시로 update 되고 규칙과 네이밍이 미세하게 조정되며 어려움을 더한다. 그래서 이번에 리엑트를 시작하며  CRA(create react app) 없이 직접  Webpack 설정을 통해  React 빌드 환경을 구성하고자 한다. webpack에 어려움을 느꼈던 분들에게 도움이 될 수 있었으며 좋겠다. 참고로 이 글은  2019.08.09 에 `webpack v4`, `babel 7` 기준으로 작성했다. 

## 1-1 필요한 Lib 

- react: 리액트
- react-dom: 브라우저 DOM 메서드를 제공한다.
- [react-prop-types (React props 타입을 체크하기 위함)](https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html)
- react-hot-loader : dev-server 를 켜둔 상태에서수정사항이 생겼을 때 페이지 새로고침을 하지 않고 변경된 부분만 바꿔주도록 하는 lib
- babel-core: Babel 핵심 의존성 라이브러리이다. Babel(바벨)은 자바스크립트 ES6를 ES5로 컴파일하여 현재 브라우저가 이해할 수 있도록 변환하는 도구다.
- babel-loader: babel과 webpack을 사용해 자바스크립트 파일을 컴파일한다.
- babel-preset-env: ES2015, ES2016, ES2017 버전을 지정하지 않아도 바벨이 자동으로 탐지해 컴파일한다.
- babel-preset-react: 리액트를 사용한다는 것을 바벨에게 말해준다.
- html-webpack-plugin: 생성된 .html파일과 .favicon파일을 번들링과정에 포함시키는 플러그인 이다
- webpack: 모듈 번들러(Module bundler)
- webpack-cli: Webpack 4.0.1 이상에서 필요한 커맨드라인 인터페이스다.
- webpack-dev-server: 애플리케이션 개발 서버를 제공한다.
- node-sass : sass 를 css 파일로 컴파일 해준다
- style-loader: sass, css 파일을 `<style>` 태그로 만들어 html의 head 태그 내부에 선언해준다.
- sass-loader: `import/require()`처럼 `@import`와 `url()` 해석한다.

## 1-2 의존성 초기화

npm 대신 yarn을 사용했다. [yarn 이 npm 보다 빌드성능이 더 좋다라는 블로그](https://www.holaxprogramming.com/2017/12/21/node-yarn-tutorials/)를 참고했다.

```bash
# root 폴더(프로젝트를 시작할 폴더) 내부

yarn init -y 

# 여러 패키지 한 번에 설치하고 싶으면 패키지명 사이에 한 칸 space로 구분
# add 를 dependencies 에 설치내용이 추가됨
yarn add react react-dom react-prop-types 

# -D 플래그를 붙이면 devDependencies 에 설치해서 개발용으로 사용할 수 있음

yarn add @babel/core babel-loader @babel/preset-env babel-preset-react sass-loader node-sass css-loader style-loader html-webpack-plugin webpack webpack-dev-server webpack-cli -D
```

## 1-3 Babel 설정 

### babel 설정 파일 생성

```bash
touch babel.config.js 
# vim 에디터로 위에서 만든 babel.config.js 열기
vi bable.config.js
```

### babel 세팅

```js
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  // 여기 프리셋 및 플러그인에 추가한 것들을 babel-loader를 통해 webpack에서 사용한다.
  const presets = [['@babel/preset-env'], ['@babel/preset-react']];

  const plugins = [
    'react-hot-loader/babel',
    // class property 
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ];

  return {
    presets,
    plugins
  };
};

```

### plugin 

- [react-hot-loader/babel](https://github.com/gaearon/react-hot-loader) : react 프로젝트의 코드 변동시 새로고침이 아닌 변경된 부분만 동적으로 업데이트 되는 옵션)
- [@babel/plugin-proposal-class-properties](https://github.com/tc39/proposal-class-fields) : TC39 stage 3에 있는 class propery를 사용하기 위한 플러그인이다. 아직 stage에 있는 기능을 코드에 사용하기 위해서는 바벨 설정에 해당 플러그인을 등록해야 한다. 
-  [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) : babel 7 이전 버전에서 `@babel/polyfill` 로 폴리필을 설정했으나, 해당 설정은 전역 공간에 폴리필 코드를 노출시켜 전역공간을 오염시키는 이슈가 있었고, 이런 부분을 해결하기 위해 도입되었다. 이 설정을 통해 `async` 같은 함수를 코드에 포함시킬 수 있다. 자세한 내용은 [링크](https://babeljs.io/docs/en/babel-plugin-transform-runtime#why)를 참조하자. 필자는 이 [링크](https://www.valentinog.com/blog/await-react/)를 참조하여 설정을 진행했다.  

## 1-4 Webpack 설정 

#### webpack 설정 파일 생성

```bash
touch webpack.config.js 
vi webpack.config.js 
```

#### webpack 세팅 

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [`${__dirname}/src/scss`],
              data: `@import 'variables';`
            }
          }
        ]
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new DefinePlugin({
      FetchUrl: JSON.stringify(
        'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      )
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    inline: true
  }
};

```

위의 설정이 어떤 역할을 하는지 좀 더 세부적으로 파악해 보자. 

### mode

```javascript
...
module.exports = {
  mode: 'development', //production
};
```

설정 사항이 개발 환경(`development`)인지 프로덕션(`production`)인지를 알려주는 역할을 한다. 개발환경은 말 그대로 앱을 개발하는 모드로 개발하기 편한 환경을 제공하고, production 은 배포 서버에 올릴 때 사용하는 모드이다. 보통 모드에 따라 다르게 옵션을 주고 개발시에는 development 모드를 사용하다, 배포할 때 prodcution 모드로 배포한다.

> "개발 모드는 속도와 개발자 경험에 최적화되어 있다. 프로덕션 모드는 애플리케이션을 배포와 관련된 유용한 집합을 제공한다." [웹팩 4: mode and optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a) 에서 발췌

### entry, output, filename  

웹팩 인스턴스를 실행하기 위해 `entry`, `output`, `filename`, `devtool`, `module`, `rules` 값을 설정해보자

```javascript
...
module.exports = {
  ...
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js'
  },
};
```

- `entry` - 애플리케이션의 진입점(entry point)이다. 리액트 앱이 있는 위치와 번들링 프로세스가 시작되는 지점이다. ([웹팩 공식 문서 - entry point](https://webpack.js.org/concepts/entry-points/)) 웹팩4에서는  `entry`를 생략할 수 있다. `entry`가 없으면 웹팩은 시작점이 `./src` 디렉토리 아래에 있다고 가정한다. 여기서는 `entry`를 설정해 시작점을 분명하게 표시하기로 한다. 나중에 이 부분을 삭제해도 무관하다.
- `output` - 컴파일된 파일을 저장할 경로를 알려준다.
- `filename` - 번들된 파일 이름을 말한다. `[hash]`는 애플리케이션이 수정되어 다시 컴파일 될 때마다 웹팩에서 생성된 해시로 변경해주어 캐싱에 도움이 된다.

### module, rules 

```js
module.exports = { 
  ...
  module: {
      rules: [
        // bable-loader 
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        // sass-loader
      	{
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]'
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [`${__dirname}/src/scss`],
                data: `@import 'variables';`
              }
            }
          ]
        },
      ]
    }
}
```

- `module` - 애플리케이션 내 포함되는 모듈을 정의한다. 현재 사용하는 모듈은 babel(js 파일을 원하는 상태(모든 브라우저 호환 되도록)로 트렌스 파일링 하기 위함), CSS 모듈(css 를 js 파일 내부에서 쓰기 위함) 에 해당한다.
- `rules` - 각 모듈을 처리하는 방법을 설정한다.

#### babel-loader

- `test: /\.(js)$/`  : .js 로 끝나는 파일을 대상으로 로더를 적용한다 &rarr; js 파일을 트렌스파일링 한다.  
- `exclude: /node_modules/`:  node_module 폴더는 대상에서 제외한다.
- `use: ['babel-loader']`:  해당 규칙에 사용할 loader는 `bable-loader` 이다.

#### sass-loader

- `test: /\.sass$/` : .sass 끝나는 파일을 대상으로 로더를 적용한다. (sass 가 아닌 css를 사용한다면 `/\.css/` 를 적용하면 된다.)
- `loader: 'style-loader'` : `.css` 파일을 style 태그로 만든 뒤 `html`의 ` <head>` 내부에 선언해주는 역할을 한다
- `loader: 'css-loader'` : `import '/.css'` 처럼 .jsx or js 파일에서 css 파일을 import할 수 있게 해준다. 
- `loader: 'sass-loader'` , `option: {modules: true,
  camelCase: true,
  sourceMap: true}` : .js파일에서 import 또는 require로 .sass파일을 가져올수 있게 해준다. 나머지 옵션에 관한 내용은 아래 예시를 참고하자

#### option 관련

##### module, camelCase

```css
/styles/commentlog.sass

.comment-log {
	background-color:#fff
}

```

라는 .scss파일이 있다면

```javascript
// /src/App.js

// moduel 옵션으로 import 구문 사용 가능
// camelcase 옵션으로 .comment-log -> commentLog 변수 선언 가능
import { commentLog } from '../styles/commentlog.css


```

이렇게 불러와 사용할 수 있다.

##### sourceMap

  sourceMap 의 경우 나중에 debug 모드에서 병합된 css 파일이 아닌 원 소스 `.sass` 를 통해 debug 할 수 있도록 지원  

![sourcemap](https://user-images.githubusercontent.com/35516239/62781584-49d49a80-baf3-11e9-8997-0c4d2823a6ba.png)

##### includePaths, data 

scss 를 사용하는 경우 자주 사용하는 변수 or mixin을 별도에 파일로 지정해두고 각 컴포넌트의 css에서 import(`import ../scss/variable.scss, import ../scss/mixin.scss`)해서 쓰는 경우가 많다. 

```js
import '../scss/variable.scss'
import '../scss/mixin.scss'

```

이 때 `includePaths` 옵션의 경우 해당 value 값에 지정된 path를 import path 앞에 자동으로 붙여줘 path를 간략하게 쓰도록 도와준다.

```js
// import '../scss/variable.scss'
// 대신 이렇게 작성이 가능하다. 
import 'variable.scss' 


```

`import 'variable.scss' ` 마저도 생략하고 싶을 때 `data`  옵션을 사용하면 된다. `scss` 파일이 import 될 때 마다 data 에 등록된 내용이 `import ` 되어 별도의 `import` 없이 `variable` 에 있는 변수를 사용할 수 있다.  

### devtool, devServer

```javascript
...
module.exports = {
  ...
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port,
    open: true,
    // historyApiFallback: true, 현재 불필요함으로 제외
    hot: true
    inline:true
  }
};

```

- `devtool`은 [소스 맵(source maps)](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)을 생성해 애플리케이션 디버깅을 도와준다. 소스 맵에는 여러 가지 유형이 있으며 그 중 inline-source-map은 은 개발시에만 사용된다. (이외 옵션은 [공식 문서](https://webpack.js.org/configuration/devtool/)를 참고한다.)
- `devServer` 는 개발서버를 정의하는 옵션이다. 상세 옵션은 아래와 같다.

| option             | description                                                  | CLI 사용                                          |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| host               | 사용될 호스트 지정                                           | webpack-dev-server –host 127.0.0.1                |
| hot                | webpack의 HMR 기능 활성화                                    | -                                                 |
| inline             | inline 모드 활성화                                           | webpack-dev-server –inline=true (default 가 true) |
| port               | 접속 포트 설정                                               | webpack-dev-server –port 9000                     |
| open               | dev server 구동 후 브라우저 열기                             | webpack-dev-server –open                          |
| historyApiFallback | HTML5 히스토리 API를 이용하는 단일 페이지 애플리케이션을 개발할 때 유용한 옵션으로서 "true"로 설정하면 기존 스크립트와 매핑되지 않는 웹팩 개발 서버에 대한 모든 요청이 곧바로 /(index.html) 파일로 라우팅 됨 |                                                   |

#### 난해한  “hot” Vs “inline” webpack-dev-server options

`inline` 은 전체 페이지에 대한 실시간 리로딩(“Live Reloading”) 옵션이며, `hot` 은 컴포넌트가 수정 될 경우 그 수정된 부분만 리로드 해주는 부분 모듈 리로딩(“Hot Module Reloading”) 옵션이다. 만약 두개 옵션을 모두 지정할 경우 “Hot Module Reloading”이 처음 발생한다. 그리고 “Hot Module Reloading”이 안되면 전체 페이지 로딩을 한다.

```
//1. 페이지를 로딩하지 않는다.
$ webpack-dev-server

//2. 전체 페이지를 로딩 한다.
$ webpack-dev-server --inline

//3. 부분 로딩  또는 전체 페이지 로딩
$ webpack-dev-server  --inline --hot

```

### plugins

plugins 옵션은 웹팩 번들과정에 적용할 플러그인을 설정한다.

```javascript
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
     new DefinePlugin({
      FetchUrl: JSON.stringify(
        'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      )
    })
  ],
};

```

#### HtmlWebpackPlugin

- 위에서 등록한 HtmlWebpackPlugin은 생성된 .html파일과 .favicon파일을 번들링과정에 포함시키는 플러그인이다.
- 위 플러그인을 설정하지 않는다면 dist.html 파일에 매번 bundle.[hash].js를  추가해줘야 해서 번거롭다.

#### DefinePlugin

보통 `fetch` 요청을 위한 api 주소 같은 내용을 config.js 파일에 두고 import 에서 쓰는 경우가 많다. webpack을 통해 빌드할 경우 DefinePlugin을 통해 webpack 컴파일 시점에 해당 config 내용이 반영되도록 세팅할 수 있다. 

 아래에서 FetchUrl 의 value를 등록하고 코드에 사용하면

```js
const { DefinePlugin } = require('webpack');
new DefinePlugin({
      FetchUrl: JSON.stringify(
        'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      )
    })

```

webPack을 통해 complie 될 때 플러그인에 등록한 코드로 바뀌게 된다. 

```js
class App extends Component {
  state = { todos: [], folded: false };

  async componentDidMount() {
    const errorMsg = ERROR_MSG.FETCh;
    try {
      // 아래 FetchUrl = 'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);

      this.setState({ todos: data.body });
    } catch (err) {
      console.warn(err);
    }
  }

```

Defineplugin 이외에도 [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/), [dotenv](https://www.npmjs.com/package/dotenv) 라는 패키지를 사용할 수 있다. 

```js
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false
});


// 변수를 사용할 때는 아래와 같이 사용한다.
process.env.NODE_ENV

```

위 코드는 아래와 같은 역할을 한다. 

```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
});

```

## 1-5 React 

먼저 HtmlWebpackPlugin을 사용하기 위한 html파일과 favicon파일을 루트에 생성하자

```bash
# root 폴더
mkdir public && cd $_ && touch index.html

```

public/index.html

```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>

```

이제 다시 루트로 돌아와서 리액트 파일(index.js)을 하나 생성하자

```bash
# root 폴더
mkdir src && cd $_ && touch index.js

```

src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
ReactDOM.render(<App />, document.getElementById('root'));

```

components/App.js와 함께 몇개의 컴포넌트 파일들을 생성하자

```bash
# root 폴더
mkdir components && cd $_ && touch App.js 

```

components/App.js

root 컴포넌트인 app 에 react-hot-loader를 적용하자. 적용하면 특정 부분만 변경 됬을 때 새로고침 되지 않고 변경된 부분만 바뀐다. 

```javascript
// react-hot-loader를 사용하기 위한 import
import { hot } from 'react-hot-loader/root';
import React from 'react';

const App = props => {
  return ( <div> 안녕하세요 저는 seldev 입니다 </div> );
};

// export 할 때 hot 함수를 실행시켜 내보낸다
export default hot(App);


```

리엑트 어플리케이션 기본 구조는 끝났다. 완성된 프로젝트의 트리구조는 다음과 같다

```
|-- public
    |-- index.html
|-- src
    |-- components
        |-- App.js
   	|-- index.js
|-- node_modules
|-- babel.config.js
|-- package.json
|-- webpack.config.js
|-- yarn.lock

```



## 1-6 pakage.json

완성된 리액트 어플리케이션 구동을 위해 package.json을 수정한다.

```json
{
  "name": "javascript-web-todo",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/P-iknow/javascript-web-todo.git",
  "author": "P-iknow <apricotsoul@gmail.com>",
  "license": "MIT",
  "scripts": {
    // 이 부분을 추가했다.
    "start": "webpack-dev-server"
  },
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-prop-types": "^0.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^3.1.0",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.12.0",
    "react-hot-loader": "^4.12.10",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.38.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  }
}


```

## 1-7 실행

이제 터미널에서 `yarn start`로 개발 서버를 시작하자