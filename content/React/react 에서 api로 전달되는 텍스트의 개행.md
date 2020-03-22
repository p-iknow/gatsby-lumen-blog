---
title: React에서 api 로 전달되는 텍스트의 개행 처리하기
date: '2020-03-15T23:46:37.121Z'
template: 'post'
draft: false
slug: 'react/how-to-handle-newline-text-from-api'
category: 'React'
tags:
  - 'React'
  - 'Front End'

description: '리엑트로 서비스를 운영할 때 api 에서 전달되는 텍스트가 길어서 특정 부분에 개행을 해야하는 경우가 있다. api 로 전달되는 텍스트 이기에 텍스트 중간에 `<br/>` 태그 등의 강제 개행 태그를 추가할 수도 없다. 이럴때 어떻게 해야할까? html-react-parser를 활용하면 이를 해결할 수 있다.'
---

![react-logo](https://imgur.com/ayndzLx.png)
## 이슈 

리엑트로 서비스를 운영할 때 api 에서 전달되는 텍스트가 길어서 특정 부분에 개행을 해야하는 경우가 있다. api 로 전달되는 텍스트 이기에 텍스트 중간에 `<br/>` 태그 등의 강제 개행 태그를 추가할 수도 없다. 이럴때 어떻게 해야할까? 

```js
// props로 api로 전달받은 텍스가 전달된다.
// apiText = "이 부분에서 개행이 필요한데 개행이 안됩니다."
const textExam = ({ apiText }) => {
	<span>
		{apiText}
	</span>
}
```

## 해결 

[html-react-parser](https://www.npmjs.com/package/html-react-parser) 를 활용하면 이런 문제를 해결할 수 있다. api로 전달되는 값에 개행을 할 수 있는 `<br/>` 태그를 포함시키고 `Parser` 함수에 해당 텍스트를 인자로 전달하면 이를 html 형태로 parsing 이 되어 개행을 할 수 있게 된다.

```js
import Parser from 'html-react-parser';
// apitText = "이 부분에서 개행이 <br/> 필요한데 개행이 안됩니다."
const textExam = ({ apiText }) => {
	<span>
		{Parser(apiText)}
	</span>
}
```

> ##  추가

전달되는 텍스트 값에 개행 문자를 추가하고 공백에 대한 css 속성인 `white-space` 값을 `pre-wrap` 으로 설정하면 개행이 완성된다. `white-space` 의 default 값은 `normal` 로 기존의 줄바꿈 값을 하나의 공백으로 병합(치환) 한다. `pre-wrap` 속성은 줄바꿈을 병합하지 않고 보존한다. `pre, pre-line` 값 으로도 줄바꿈이 가능하다. 자세한 내용은 [CSS / white-space / 공백 처리 방법 정하는 속성](https://www.codingfactory.net/10597) 을 확인하자

```js
// apitText = "이 부분에서 개행이 \n 필요한데 개행이 안됩니다."
const textExam = ({ apiText }) => {
	<span style={white-space: "pre-wrap"}>
		{apiText}
	</span>
}
```



> ## 참고 
>
> - https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
> - https://www.codingfactory.net/10597