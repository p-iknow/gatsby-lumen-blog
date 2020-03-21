---
title: "Error: getaddrinfo ENOTFOUND localhost"
date: '2019-09-02T23:46:37.121Z'
template: 'post'
draft: false
slug: 'issue-log/node-js/getaddrinfo-entfound-localhost'
category: 'ISSUE'
tags:
  - 'JS'
  - 'NodeJS'
  - 'ISSUE'
description: '`yarn gatsby develop` 으로 블로그 dev server를 실행시켰는데, 계속적으로 Error: getaddrinfo ENOTFOUND localhost 라는 오류가 발생한다. 이를 해결하는 방법을 다룬다.'
---

## 이슈

`yarn gatsby develop` 으로 블로그 dev server를 실행시켰는데, 계속적으로 `Error: getaddrinfo ENOTFOUND localhost` 라는 오류가 발생한다. 

![Error: getaddrinfo ENOTFOUND localhost error-log image](https://imgur.com/gOR3jfN.png)

## 해결

`Error: getaddrinfo ENOTFOUND [localhost](http://localhost)` 라는 키워드로 구글링을 해보니 `/env/host` 파일의 내용에 문제가 있을 거라는 이야기를 찾았다. 

`code /env/host` 명령으로 host 파일을 열어보았다

![/env/host image](https://imgur.com/lvtfJsc.png)

원래는 2번째 붉은 박스처리(원본을 변경해서 캡쳐를 햇다) 된 부분이 자리하고 있었는데, 회사의 dev server 설정 때문에 이전에 host 파일을 설정한 적이 있었고, 그것이 문제가 되어 에러가 발생한 것이다. 정상 작동을 위해 첫번째 붉은 박스 처리된 부분을 수정해서 추가 했더니 문제 없이 잘 작동한다. 

## 결론

 `Error: getaddrinfo ENOTFOUND [localhost](http://localhost)`  오류가 있을시  루트 `/env/host` 파일을 점검하자. 127.0.0.1 에 해당하는 부분이 loacalhost 가 아니라 다른 부분으로 변형되어 있거나, 비어있을 것이다. 올바르게 수정하자. 

## 참고

- [깃헙 이슈](https://github.com/gatsbyjs/gatsby/issues/11666)
- [미디엄](https://medium.com/andrewmmc-io/node-js-error-getaddrinfo-enotfound-localhost-b7ee35e1bb60)