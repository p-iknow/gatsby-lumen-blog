---
title: gatsby blog
date: '2019-05-31T23:46:37.121Z'
template: 'post'
draft: false
slug: 'post/how-to-install-gatsby/'
category: 'gatsby'
tags:
  - 'gatsby'
description: 'gatsby 블로그 도입하기'
---

## TL:DR

- gatsby를 이용하여 블로그 만드는 법을 보다 상세하게 다룬다.
- 이제까지 찾아본 블로그 자료들이 있지만 나같은 초보는 따라하기 힘들어 작성한다.
  - 겁나 그냥 해보는 거다
- lumen theme을 사용한다.

> ## 참고
>
> - [gatsby starter lumen으로 블로그 생성하기](https://kujyp.github.io/posts/gatsby-starter-lumen%EC%9C%BC%EB%A1%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0/)
> - [Gatsby로 블로그 만들기](https://wonism.github.io/create-blog-with-gatsby/)
> - [GatsbyJS 로 멋진 Blog를 Get하기](https://sosolog.netlify.com/posts/gatsbyJS-blog/)
> - [참고 블로그](https://blog.chann.kr/)
> - [마크다운 형식 참고](https://blog.shik.kr/celery-konlpy/)
> - [마크다운 깔끔](https://heechan.me/posts/how-to-use-docker-compose/)
> - [gatsby 이용한 블로그 재구성

```js
//sdfsdf
const Callback = (line, h, board) => {
  return line.map((cell, w, line) => {
    const top = board[h - 1] ? board[h - 1][w] : undefined;
    const bottom = board[h + 1] ? board[h + 1][w] : undefined;
    const left = line[w - 1];
    const right = line[w + 1];
    const topLeft = board[h - 1] ? board[h - 1][w - 1] : undefined;
    const topRight = board[h - 1] ? board[h - 1][w + 1] : undefined;
    const bottomLeft = board[h + 1] ? board[h + 1][w - 1] : undefined;
    const bottomRight = board[h + 1] ? board[h + 1][w + 1] : undefined;

    let num = 0;
    if (top === true) num += 1;
    if (bottom === true) num += 1;
    if (left === true) num += 1;
    if (right === true) num += 1;
    if (topLeft === true) num += 1;
    if (topRight === true) num += 1;
    if (bottomLeft === true) num += 1;
    if (bottomRight === true) num += 1;
    return num;
  });
};

const minesweeper = matrix => {
  return matrix.map(Callback);
};
```

`KoNLPy`를 좀 많이, `오래 돌려야 하는 일이 있어서 처음에 람다를 생각해보다가`, 이 패키지가 래핑해놓은 형태소 분석기들이 자바 기반이라서 패키징하기가 까다로워서 패스를 했다. 아예 자바로 람다 함수를 만드는 방법도 있지만 링크 자바랑 친하지 않아서 다른 방법을 찾기로 했다. Pool 같은 것을 쓸까 하다가 조금 더 쉽게 갈 수 있는 방법이 있을 것 같아서 Celery를 써보기로 했다.
