---
title: JS split 적용시 구분자도 결과에 포함시키기 
date: '2019-11-10T23:46:37.121Z'
template: 'post'
draft: false
slug: 'js/split-regexp'
category: 'JS'
tags:
  - 'JS'
description: 'SNS 서비스를 만드는 중, 게시글 콘텐츠에 #(해쉬태그)가 있을 경우 해당 해쉬태그를 링크로 만들어야 했다. 그렇게  문자열에서 해쉬태그를 추출해야 하는 미션을 얻게 되어 해당 블로그를 작성하게 되었다. 이 글에서는 String.prototype.split() 메소드를 사용할 때 인자로 전달되는 구분자를 결과에 포함시키는 방법에 대해 다룬다.'
---

## 들어가며

SNS 서비스를 만드는 중, 게시글 콘텐츠에 `#(해쉬태그)`가 있을 경우 해당 해쉬태그를 링크로 만들어야 했다. 그렇게  문자열에서 해쉬태그를 추출해야 하는 미션을 얻게 되어 해당 블로그를 작성하게 되었다. 이 글에서는 `String.prototype.split()` 메소드를 사용할 때 인자로 전달되는 구분자를 결과에 포함시키는 방법에 대해 다룬다.

## 미션 

- 문자열에서 `#{..}` 로 된 해쉬태그를 추출하여 링크로 변환해야 한다.  

```js
'#좋아요 #구독 부탁드립니다.' 
```

- 위 문자열에서  #좋아요, #구독을 분리한 뒤 링크로 처리해야 한다. 
- String 객체의 split 메소드를 사용하면 문제를 해결할 수 있다.  

## `RegExp`를 사용해 구분자도 결과에 포함하기

`separator`가 포획 괄호 `()`를 포함하는 정규표현식일 경우, 포획된 결과도 배열에 포함된다.

```js
var myString = 'Hello 1 word. Sentence number 2.';
var splits = myString.split(/(\d)/);

console.log(splits);
```

위 예제의 로그 출력은 다음과 같다.

```html
[ "Hello ", "1", " word. Sentence number ", "2", "." ]
```

> [MDN String.prototype.split()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)

## 해결 

- 참고로 `<Link></Link>` 는 `next.js` 에서 사용되는 링크 이다. 

```jsx
const postContent = post.content.split(/(#[^\s]+)/g).map(v => {
    if (v.match(/#[^\s]+/)) {
      return (
        <Link href="/hashtag" key={v}>
          <a>{v}</a>
        </Link>
      );
    }
    return v;
  });
```

### 