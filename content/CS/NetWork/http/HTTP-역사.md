---
title: HTTP 역사 알아보기
date: '2019-04-30T23:46:37.121Z'
template: 'post'
draft: false
slug: 'network/history-of-http'
category: 'http'
tags:
  - 'http'
description: 'http 1.0 부터 최근 http2.0 까지의 거슬러 오기까지의 과정을 함께 살펴본다.'
---

## HTTP의 업데이트에 대한 역사

- 초기 http 규격이 만들어질 무렵 html 문서를 전송하기 위한 프로토콜로 기획
- 추후 웹의 용도가 다양화됨(쇼핑몰, SNS, 동영상 서비스, 구글 문서)에 따라 http 의 한계 발생
- http를 버리고 새로운 프로토콜을 만들 수 있지만 이미 많은 사람들이 http를 쓰고 있어 쉽게 버리기 어려움
- 프로토콜의 업데이트의 필요성 생김

## 기존 HTTP의 한계

- 1개의 connection 으로 1개의 request 만 보낼 수 있다
- request는 client에서만 시작할 수 있다. response만 받는 것은 불가능하다.
  - facebook 은 사용자의 글 작성을 실시간으로 업데이트 하는데, 업데이트를 알려 주려면 서버에서 변경을 통지해야 함
  - 서버에서 request를 시작할 수 없음
- request/response header 를 compress(압축) 하지 않은 체로 보낸다. header 의 정보가 많을 수록 지연(처리, 연산 증가)이 심해진다.
- header 의 정보가 많은데 매번 동일한 header를 보내는 것은 컴퓨터 자원의 낭비를 초래한다.
- data compression 을 임으로 선택할 수 있다. compression을 해야하는 것이 의무가 아니다.
  - 압축을 하지 않고 보내도 무관하다. → 컴퓨터 자원이 낭비된다
- 갱신이 있든 없든 data를 전부 송신

## 한계를 해결하기 위한 노력

### Ajax에 의한 해결 방법

- Ajax(Asynchronous Javascript + XML) 은 Javascript 나 DOM(Document Object Model) 조작 등을 활용하는 방식으로, 웹페이지의 **일부분만** 고쳐쓸 수 있는 비동기 통신 방법
- Ajax 핵심 기술은 XMLHttpRequest 라는 API 로 Javascript 등의 스크립트 언어로 서버와 HTTP 통신을 할 수 있음
- 일부분만 수정하기 때문에 response 로 transfer 하는 data quantity(양)이 줄어든다.

### Ajax 해결의 단점

- 일부분 수정을 위한 request가 대량으로 발생하게 됨
  - 계속 무언가 변하는 실시간 환경을 생각해보면
  - 변할 때 마다 지속적으로 변경을 위한 request 발생
  - 해당 request 는 모두 컴퓨터 자원을 활용
- 여전히 동일한 header 를 보냄
- 여전히 데이터 압축을 강요하지 않음

### Comet 에 의한 해결 방법

- sever side의 content(resource)에 renewal이 있었을 경우 client request를 기다리지 않고 client에 보내기 위한 방법
- response를 연장시킴으로 server 에서 통신을 개시하는 sever push 기능을 유사하게 따름
- 보통 request 가 오면 response를 바로 반환하지만 Comet 에서는 response 를 보류 상태로 해두고, 서버의 콘텐츠가 renewal 됬을 때 reponse 를 반환한다는 것
- 이 방법으로 renewal 된 content 가 있을 때 바로 client 에 반영 가능함
- content 를 실시간으로 renewal 할 수 있지만 response 를 hold(보류) 하기 위해 connection 을 유지하는 시간이 길어짐 → 커넥션을 유지한다는 것은 컴퓨터 자원을 소비한다는 뜻

### Comet 의 단점

- 여전히 http 프로토콜의 한계를 해결할 수 없음

## SPDY 의 등장과 목표

- ajax, comet등 사용성을 쾌적하게 하는 여러가지 기술이 등장해서 어느정도 개선 됬지만, protocol의 근본적인 제약은 protocol 자체의 개선으로 해결할 수 밖에 없어서 등장
- 참고로 HTTP 2.0 은 SPDY를 표준으로 지정한 프로토콜 버젼이다.

### SPDY 설계와 기능

- SPDY 는 HTTP 를 완전히 바꾼것이 아니라 TCP/IP 의 어플리케이션 계층과 트랜스 포트 계층 사이에 새로운 세션 계층을 추가하는 형태로 동작
- SPDY 는 보안을 위해 SSL(secure soket layer) 을 표준으로 사용

![image](https://user-images.githubusercontent.com/35516239/58229113-c1542280-7d6b-11e9-89df-f58be7d02274.png)

![image](https://user-images.githubusercontent.com/35516239/58229434-b51c9500-7d6c-11e9-8f5d-45d63dddc384.png)

## SPDY 의 새로운 기능

### 다중화 스트림

- 단일 TCP 접속을 통해서 복수의 HTTP request를 무제한으로 처리 가능
- 한 번의 TCP 접속으로 request 를 주고 받는 것이 가능하기 때문에 TCP의 효율 증가

### Request 의 우선순위 부여

- SPDY는 무제한으로 request를 병렬 처리할 수 있지만, 각 request에 우선순위를 할당할 수 있음
- 복수의 requst를 보낼 때 대역폭이 좁으면 처리가 늦어지는 현상을 해결하기 위함
- 대역폭은 마치 차선 같은 것
- 두꺼운 버스를 후순위로 미뤄두고 얇은 새단을 먼저보내면 처리에 효율이 생김

### HTTP 헤더 압축

- 리퀘스트와 리스폰스의 HTTP 헤더를 압축함
- 이로 인해 적은 패킷수와 송신 바이트 수로 통신 가능

### Server Push 가능

- sever 에서 client 로 데이터를 푸쉬하는 server push 기능을 지원
- server side 는 client 사이드의 request 를 기다리지 않고 renewal 이 있을 때 sever 에서 먼저 data 전송이 가능

### Sever hint 기능

- server 가 client 에게 request 해야 할 resource 를 제안할 수 있음
- client 가 resource를 발견하기 전에 resource 의 존재를 알 수 있기 때문에 이미 cache 를 가지고 있는 상태라면 불필요한 request 를 보내지 않아도 됨

## HTTP 2.0

- 몇 년에 걸쳐, 웹 페이지는 매우 복잡해지면서, 애플리케이션의 역할을 하게됨

- 디스플레이되는 콘텐츠의 양에 더불어 웹이 동적으로 작용하기 위한 스크립트의 양과 크기가 점점 더 많이 증가 -> 더 많은 데이터들이 더 많은 요청 너머로 전송되고 있습니다.
- HTTP/1.1 에서 파이프라인등의 기술이 있었지만 여전히 HTTP 프로토콜의 문제를 해결하지 못했음
- 2010년 전반기에, Google은 실험적인 SPDY 프로토콜을 구현하여, 클라이언트와 서버 간의 데이터 교환을 대체할 수단을 마련
- SPDY는 HTTP/2 프로토콜의 기초로써 기여했습니다.

### 새롭게 변한 HTTP2.0

- 텍스트 프로토콜이라기 보다는 이진 프로토콜입니다. 더 이상 수동으로 조작하기 힘듬; 이런 결점에 대한 보상으로, 새로운 최적화 기술을 구현
- 병렬 요청이 동일한 커넥션 상에서 다루어질 수 있는 다중화 프로토콜로, 순서를 제거해주고 HTTP/1.x 프로토콜의 제약사항을 막아줍니다.
- 전송된 데이터의 분명한 중복과 그런 데이터로부터 유발된 불필요한 오버헤드를 제거하면서, 연속된 요청 사이의 매우 유사한 내용으로 존재하는 헤더들을 압축
- 서버로 하여금 사전에 클라이언트 캐시를 서버 푸쉬라고 불리는 메커니즘에 의해, 필요하게 될 데이터로 채워넣도록 허용

## 출저

- [그림으로 배우는 HTTP NETWORK](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788931447897&orderClick=LAG&Kc=)
