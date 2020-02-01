---
title: ESModule 확장자(.js) 쓰지 않았을 때 404 Not Fount 오류
date: '2020-01-31T23:46:37.121Z'
template: 'post'
draft: false
slug: 'js/es-moudle/error-without-extension'
category: 'JS'
tags:
  - 'JS'
  - 'ESModule'
description: '브라우저에서 지원하는 ESModule을 사용할 때 .js 확장자를 같이 기입하지 않아 발생하는 이슈에 대해 다뤘습니다.'
---

## 이슈 

별도의 번들링 없이 ESModule을 사용해 `import` 할때 확장자를 쓰지 않으면 에러가 발생한다. 평소 React  환경에서 webpack 번들링을 통해 ESModule을 사용할 때는 확장자 없이 `import` 를 했기에 문제가 있다고 생각했다. 

### 코드 샘플

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- 아래 부분이 bundler 없이 ESModule을 사용하는 부분이다. -->
    <script type="module" src="index.js"></script>
    <title>MVVM</title>
  </head>
  <body>
    <section id="target" data-viewmodel="wrapper">
      <h2 data-viewmodel="title"></h2>
      <section data-viewmodel="contents"></section>
    </section>
  </body>
</html>
```

```js
import ViewModel from "./ViewModel"; // 확장자(.js) 없으면 에러 발생
import Scanner from "./Scanner.js"; // 확장자 붙이면 에러 발생 하지 않음 

...
```

### 에러 화면

![Imgur](https://imgur.com/oVU7abr.png)



## 해결 

### 확장자를 예측하고 붙여주는 일은 사실 모듈 번들러의 일이었다.

브라우저는 상대경로를 통해(`/ViewModel`) 절대 경로(http://127.0.0.1:5500/mvvm2-practice/ViewModel)를 만들기는 하지만,  해당 경로를 보고 자동으로 확장자를 붙이는 일을 하지는 않는다. 해당 경로를 탐색하고 그에 맞는 확장자를 붙여주고 문제가 없게 만드는 것은 Webpack 이나 RollUp 같은 모듈 번들러의 역할이었다.  

브라우저 입장에서http://127.0.0.1:5500/mvvm2-practice/ViewModel이라는 주소에 해당하는 static file은 없다. 에러를 Throw 하는게 당연하다. 때문에 브라우저 자체적으로 지원하는 ESModule을 사용할 때에는 파일명과 확장자를 병기 해야 한다.

> ## 참고
>
> https://stackoverflow.com/questions/55251956/how-does-javascript-import-find-the-module-without-an-extension



