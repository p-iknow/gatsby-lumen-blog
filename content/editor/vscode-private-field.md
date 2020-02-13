---
title: vscode, private-field(#)를 오류로 인식하지 않게 만들기 
date: '2020-02-12T23:46:37.121Z'
template: 'post'
draft: false
slug: 'editor/vscode/use-private-field'
category: 'vscode'
tags:
  - 'editor'
  - 'vscode'
	- 'private-field'
	- 'JS'
description: 'es-next에서 제공되는 class 내부의 private-field를 사용해 js 를 작성하고 있다. 에디터로 vs-code를 사용하는데 "#" 키워드에 invalid charater 라는 오류가 표기 된다. 어떻게 하면 vscode 가 해당 키워드를 오류로 인식하지 않을까?'
---

## 이슈
![vscode-private-field-error](https://imgur.com/qeyhpWx.png)
`es-next`에서 제공되는 `class` 내부의 `private-field`를 사용해 `js` 를 작성하고 있다. 에디터로 `vs-code`를 사용하는데 `#` 키워드에 `invalid charater` 라는 오류가 표기 된다. 어떻게 하면 vscode 가 해당 키워드를 오류로 인식하지 않을까? 

## 원인
해당 오류의 원인은 vscode 가 내부적으로 지원하는 타입스크립트 parser가 esnext 기능인 private field 를 지원하지 않기 때문이다.

## 해결 
![JavsScript and TypeScript Nightly](https://imgur.com/KMdybDA.png)
JavsScript and TypeScript Nightly 플러그인을 설치하면 오류가 말끔하게 해결 된다. 해당 플러그인을 설치하면 vscode가 내부적으로 최신 버전의 타입스크립트를 사용할 수 있고, 최신 버전의 타입스크립트는 private field 를 인식할 수 있다. 
