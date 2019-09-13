---
title: css loader의 sourceMap 사용시 발생하는 FOUC 이슈
date: '2019-07-24T10:46:37.121Z'
template: 'post'
draft: false
slug: 'front-end/fouc-when-using-css-loader-sourceMap'
category: 'Front End'
tags:
  - 'Front End'
  - 'Webpack'
  - 'JS'
description: 'webpack 을 통해 번들링한 React 활용 TODO 어플을 로드했다.  CSS 가 미적용 된 상태로 DOM 컨텐츠가 로드되는 이슈가 있다. 알고보니 CSS Loader 의 sourceMap 옵션 을 켜둔 것이 원인이었다. 해당 옵션을 끄면 이슈가 해결된다. '
---

## TLDR

webpack 을 통해 번들링한 React 활용 TODO 어플을 로드했다.  CSS 가 미적용 된 상태로 DOM 컨텐츠가 로드되는 이슈가 있다. 알고보니 CSS Loader 의 sourceMap 옵션 을 켜둔 것이 원인이었다. 해당 옵션을 끄면 이슈가 해결된다. 

## 1. 이슈

webpack 을 통해 번들링한 React 활용 TODO 어플을 로드했다.  CSS 가 미적용 된 상태로 DOM 컨텐츠가 로드되는 이슈가 있다.

![깜빡임 이슈](https://user-images.githubusercontent.com/35516239/63646773-1df02080-c753-11e9-9510-8cea1a563724.gif)

더 정확하게 진단하기 위해 domcontent loaded 이벤트에 debugger를 걸고 멈추어보았다. 

![image](https://user-images.githubusercontent.com/35516239/63646722-4deaf400-c752-11e9-83b8-a509a7295de3.png)

 문제를 제대로 정의해보면 현재 CSS 는  webpack 을 통해 JS 파일로  번들링 된다. 웹펙 내부적으로는 sass loader를 통해 sass 파일을 css 로 변경하고  css loader를 통해 css 파일을 Js 파일로 번들링 한다. 해당 이슈는 아무래도 webpack 설정상 특히 css loader 설정의 문제일 가능성이 높다. 





## 2. 문제 파악 

일단 `stylesheet` 가 어떻게 로드되는지 확인해보자. 크롬 브라우저의 네트워크 탭을 조회했다. `stylesheet` 가 로드될 때 blob url을 통해 분리되어 로드되고 있다. 이것이 이슈가 될 수 있겠다

![stylesheet request as blob](https://user-images.githubusercontent.com/35516239/64843552-5f803700-d640-11e9-8873-1e526fe74a57.png)

## 3. 해결과정 

**" react css blob"** 라는 키워드로 검색을 해서  [FOUC - JS chunks rendered before CSS has loaded, on development, references blobs instead of inline style #6399](https://github.com/facebook/create-react-app/issues/6399#issuecomment-463156035) 이슈를 발견했다. 여기서 **FOUC** 란 아래의 설명과  같다. 

### FOUC

> **FOUC**(Flash Of Unstyled Content)는 외부의 [CSS](https://ko.wikipedia.org/wiki/CSS)가 불러오기 전에 잠시 스타일이 적용되지 않은 웹 페이지가 나타나는 현상이다. 이 현상은 스타일이 적용되지 않은 웹 페이지가 스타일이 적용된 웹 페이지로 변화하는 것이다. [웹 브라우저](https://ko.wikipedia.org/wiki/웹_브라우저)가 웹 페이지에 스타일 정의를 부르고 적용할 때 보여지는 부분을 최대한 빨리 수정하지만, 이 변화는 짧지 않은 시간 동안 나타나므로 사용자는 페이지에 오류가 있다는 생각을 하게된다.

해당 링크에서 아래와 같은 답변을 참고하게 되었다.

> I don't know if this helps, but on `style-loader` they say:
>
> ℹ️ Source maps and assets referenced with url: when style loader is used with { options: { sourceMap: true } } option, the CSS modules will be generated as Blobs,
>
> Seems to be related to [webpack-contrib/style-loader#352](https://github.com/webpack-contrib/style-loader/issues/352)

### CSS Loader의 sourceMap 옵션 

css loader 옵션 중 debug를 위한 **souceMap** 옵션을 사용하면 css module이 Blob(Binary Large Object) 형태로 생성된다는 것이다. 이 [블로그](https://heropy.blog/2019/02/28/blob/)에 따르면 Blob은  **"데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용된다"** css loader 와 webpack의 역할은 모든 모듈을 하나의 파일로 합치는 것이다. souceMap 옵션은 디버깅을 위해 합쳐진 파일을 나눠야 한다. 개인적으로 나누기 위한 방법으로 CSS 모듈을 Blob으로 로드하는 것이 아닐까 생각해봤다. 

## 4. 해결방법 

webpack 설정 중 css loader 의 `souceMap` 옵션 설정을 `false` 로 변경했다. 

![webpack sourceMap option](https://user-images.githubusercontent.com/35516239/64842954-b2f18580-d63e-11e9-82bd-0edddda9ed74.png)

## 5. 결과 

loader.css.js 하나의 파일이 로더 되면서 **FOUC**(Flash Of Unstyled Content) 현상이 사라졌다. 

![css loader network tab](https://user-images.githubusercontent.com/35516239/64842915-8e95a900-d63e-11e9-80e3-1644868c0614.png)

사실 FOUC 는 개발단계에서 큰 문제가 되는 사항이 아니다.  webpack의 prod mode 빌드시에 souceMap 옵션을 끄고 빌드하고, dev mode에서는 켜두자.

## 참고

- [블롭에 대한 이해를 도와준 블로그](https://heropy.blog/2019/02/28/blob/)
- [해당 이슈를 알게된 github 이슈 링크](https://github.com/facebook/create-react-app/issues/6399#issuecomment-463156035)