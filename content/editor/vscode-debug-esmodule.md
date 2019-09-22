---
title: vscode 에서 ES module debug 하기
date: '2019-09-22T23:46:37.121Z'
template: 'post'
draft: false
slug: 'editor/vscode/debug-es-module'
category: 'vscode'
tags:
  - 'editor'
  - 'vscode'
  - 'debug'
  - 'JS'
description: '자바스크립트 알고리즘 코드 샘플의 모듈이 common.js 스펙이 아닌 es module 을 따르고 있었다. 디버깅을 하려니 import 와 export 구문을 인지하지 못했다. 브라우저를 통하지 않고 vs code의 디버깅 기능만을 활용하여 es module을 디버깅할 수 있는 방법이 필요했다. 검색을 통해서 해당 문제를 해결했다.'
---

## TLDR

vscode 내부의 launch.json 설정을 통해 es moudle 기반의 js 파일을 디버깅할 수 있다.  

참고로 필자는 맥북 환경에서 테스트 했으므로 windows 이용자의 경우 **path** 관련 부분이 달라 동일하게 작동하지 않을 가능성이 높다. 

## 이슈

자바스크립트 알고리즘 코드 샘플의 모듈이 common.js 스펙이 아닌 es module 을 따르고 있었다. 디버깅을 하려니 import 와 export 구문을 인지하지 못했다. 브라우저를 통하지 않고 vs code의 디버깅 기능만을 활용하여 es module을 디버깅할 수 있는 방법이 필요했다. 검색을 통해서 해당 문제를 해결했다.

## 검색어

**vscode debug using es module**

## 해결과정 

### esm 모듈 설치

es module 을 활용하기 위한 페키지를 설치해야 한다

```bash
npm i esm -D 
```

### launch.json 파일 설정 

es module 디버깅이 필요한 워크스페이스에 **.vscode** 폴더를 생성하고 **launch.json** (debug 모드의 설정이 담기는 파일) 파일을 생성한다.

![image](https://user-images.githubusercontent.com/35516239/65383166-2769aa00-dd4c-11e9-9811-f03aba7425c6.png)

**launch.json** 파일의 내용을 아래와 같이 바꾼다.

```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "JS-Algo Program",
      "program": "${file}",
      // node 런타임에 인자로 전달된 내용
      // node -r esm app.js 이런식으로 실행된다.
      "runtimeArgs": ["-r", "esm"],
      // 디버그 모드 중 타 모듈이나, 노드 내장 모듈 내부로 들어가지 않도록 한 세팅
      "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}

```

### 디버깅 실행 

디버깅 시 활용활 옵션으로 위에서 설정한 **JS-Algo Program** 을 선택했다.  잘 작동한다. 

![vscode-debug-es-module](https://user-images.githubusercontent.com/35516239/65383208-c5f60b00-dd4c-11e9-8ba3-7ba88e294002.png)