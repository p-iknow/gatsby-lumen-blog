---
title: Node JS path module, __dirname 에 대해 알아보기
date: '2020-03-21T23:46:37.121Z'
template: 'post'
draft: T
slug: 'node-js/path-moudle/'
category: 'Nodejs'
tags:
  - 'Nodejs'
  - 'path'
  - 'webpack'
description: '웹펙을 입문하려 할 때 처음 마주하게 되는게 entry 옵션이고, entry 옵션을 설정할 때 path.resolve('...') 처럼, node.js 의 path 모듈이 쓰이는 것을 볼 수 있다. 나를 포함한 입문자들이 대충 경로를 설정하는 구나 하고 넘어가는데, 나중에 가면 이를 자세하게 알아야 하는 순간이 올 것이고, 그 때를 위해 미리 path 모듈과 __dirname 변수에 대해 정리했다.'
---

## 들어가며 

웹펙을 입문하려 할 때 처음 마주하게 되는게 entry 옵션이고, entry 옵션을 설정할 때 `path.resolve('...')` 처럼, node.js 의 path 모듈이 쓰이는 것을 볼 수 있다. 나를 포함한 입문자들이 대충 경로를 설정하는 구나 하고 넘어가는데, 나중에 가면 이를 자세하게 알아야 하는 순간이 올 것이고, 그 때를 위해 미리 `__dirname`, `__filename` 변수와 path 모듈과 에 대해 정리했다. 

## `__dirname`, `__filenaem`

노드에서는 모듈 관계가 있는 경우가 많아 현재 파일의 경로나 파일명을 알아야 하는 경우가 많다. 노드는 `__filename`, `__dirname` 이라는 키워드로 경로에 대한 정보롤 제공한다. 파일에 `__filename`, `__dirname` 변수를 넣어두면 실행시 현재 파일명과 파일 경로로 바뀐다. 아래 예제를 살펴보자. 아래 에제의 js 파일의 위치는 `/Users/ano/temp/directory.js` 이다. 
```js
// file 명을 포함한 절대경로 
console.log(__filename); // /Users/ano/temp/directory.js

// file 명을 제외한 절대 경로 
console.log(__dirname); // /Users/ano/temp
```

해당 변수의 결과는 어떤 운영체제를 사용하냐에 따라 달라질 수 있는데, Window 의 경우 구분자로 `/` 를 써서 `C:\User\ano\directory.js` 라는 결과가 나올 수 있다. POSIX(mac, linux) 운영체제의 경우 구분자로 '/'를 쓰고 예제와 같은 결과가 나온다. 

## path 모듈

모든 기술은 특정 문제를 해결하기 위해 탄생한다. path 모듈은 운영체제별로 경로 구분자가 달라 생기는 문제를 쉽게 해결하기 위해 등장했다. 문제는 운영체제 별로 달라지는 구분자에 대한 이슈는 다음과 같다.
크게 Windows, POSIX 로 갈리는데, POSIX는 유닉스 기반의 운영체제를 말하고, macOS 와 Linux 가 이에 속해있다. 
- Windows: `C:\Users\Ano` 처럼 `\` 를 사용해 폴더를 구분한다. 
- POSIX: `/ano/workspace` 처럼 `/` 를 사용해 폴더를 구분한다. 

path 모듈을 사용하면 폴더와 파일의 경로를 쉽게 조작할 수 있어 위와 같은 경로 구분자 이슈나를 쉽게 해결하고, 이외에 파일명에서 파일명, 확장자를 별도로 때어서 활용할 수 있 수 있다. 

## path 모듈 톺아보기
path 모듈은 내장 모듈이므로 별도 npm 설치없이 아래 처럼 불러와 사용할 수 있다. 
```js
const path = require('path);
```