---
title: Section 요소 + Main 요소
date: '2019-05-24T23:46:37.121Z'
template: 'post'
draft: false
slug: 'html/section-tag/'
category: 'html'
tags:
  - 'html'
  - 'section tag'
  - '웹표준'
  - '웹접근성'
description: 'html 태그 중 가장 헷갈리는 section 요소를 다룬다.'
---

## 루트 섹션(Root Section) 요소

### `<body>`

- 문서에서 단 1번만 사용 가능

## 섹션(Sections) 요소들

섹션 요소는 일반적인 컨테이너 요소가 아니며, 문서 개요에 명시적으로 나열되는 경우에만 섹션 요소가 적합하다는 규칙이 있다. 일반적인 컨테이너 요소로는 `<div>`,`<span>` 등이 있다.

#### `<article>`

- 문서, 페이지, 애플리케이션, 사이트 등에 포함된 독립적인 섹션을 말한다.

- 잡지, 신문, 논문, 에세이, 보고서, 블로그, 기타 소설 미디어 일 수 있음.
- **일반적인 규칙은 article 요소의 내용이 문서 개요에 명시적으로 나열되는 경우에만 적합하다.**
- 각 article 요소는 일반적으로 요소의 하위 항목으로
- `<article>` 내부에 `<section>` 태그를 포함할 수 있고, 반대로 `<section>` 내부에 `<article>`를 포함할 수 있다.
- **반드시 제목(h1~h6 요소)을 포함시켜 요소를 식별해야 한다.(웹 접근성 측면에서)**

```html
<aticle>
  <h2>기사 제목</h2>
  //반드시 제목을 포함시켜야 ...
</aticle>
```

### `<section>`

- section 요소는 문서, 애플리케이션의 **일반적인 섹션**을 말한다.
- 이 컨텍스트의 섹션은 주제별로 그룹화 된 콘텐츠이다.
- 웹 사이트의 섹션은 소개(introduction), 뉴스 항목(news item), 연락처 정보(contact information)를 위한 섹션으로 나눌 수 있다.

#### [참고]

- **콘텐츠가 사이트에 포함된 독립적인 섹션의 성향이 크다면 section 요소 대신 article 요소를 사용하는 것이 좋다.**

### `<aside>`

- 웹 사이트의 사이드바에 해당되는 부 콘텐츠(메인 콘텐츠와 분리된) 섹션을 말한다.

### `<nav>`

- 다른 페이지로 이동하는 링크 또는 사이트 내 탐색 링크를 포함하는 섹션 요소이다.

#### [참고]

- 내용을 쉽게 이해할 수 있도록 nav 요소 내부에는 비순차 목록(ul)을 사용한다.

- 사이트의 모든 링크를 nav에 포함하는 것은 아니며, 주로 사이트를 탐색하는 링크를 포함한다.

- 사이트 하단에 위치한 링크는 footer 요소로도 충분하다.(굳이 nav를 쓰지 않아도 된다)

### 질문 (섹션 요소의 title을 꼭 포함해야한다고 했는데,

Section과 Article 요소에는 꼭 h2-h6에 해당하는 타이틀이 붙어야한다고 하는데, 그러면 디자인 적으로 타이틀을 따로 쓰지않은 섹션의 경우는타이틀을 따로 display:none 이런 식으로 숨겨도 상관이 없는건가?

### 답변

- 디자인 상 섹션에 타이틀이 없다할지라도, 섹션 제목이 없는 것은 아니다
- 보이지 않을 뿐, 모든 섹션은 제목을 가져야 한다.
- 정치, 경제, 스포츠 뉴스 섹션 처럼 구분 짓는 이름이 필요하다. 질문처럼 디자이너가 섹션 제목을 디자인 시안에 반영하지 않았을 경우충분히 납득 가능한 합리적 이유가 필요하다. 합리적이지 않은 디자인은좋은 디자인이 아니다.
- 그럼에도 불구하고 섹션 제목을 감춰야 하는 상황이라면 섹션 제목에 [hidden 속성을 사용한 후 섹션에 레이블로서 연결하면 시각적으로 화면에 보이지 않지만, 스크린 리더를 통해 정보 접근을 허용할 수 있습니다.](http://fast-frontend.hashcode.co.kr/questions/6223/접근성에-관해-질문-있습니다-hidden-displaynone#answer-5284)

```html
<section aria-labeledby="a11y-markup-headline">
  <h2 hidden id="a11y-markup-headline">정보 접근성과 HTML 마크업</h2>
  ...
</section>
```

- **display: none 속성은 접근성이 없는 방법으로 상관이 없지 않다. 섹션의 제목을 스크린 리더가 읽을 수 없기 때때문이다**
-

### 오해를 불러일으킬만한 내용 정리

- 섹션을 포함할 수 있는 **루트(root) 섹션 요소는 body 뿐**이다.
- **main 요소는 body에 포함되지만, 섹션 요소가 아니다.**
- main 요소는 2개 이상 존재는 가능하지만, 문서에서 단 1개만 시각적으로 보여야 한다.(나머지 main은 hidden 속성으로 감춰야 한다)
- **섹션 요소인 section, article, asdie, nav 요소는** **main 요소를 자식으로 포함할 수 없다.**
- **반대로 main 요소 내부에 섹션 요소는 포함될 수 있다.**
- **하지만 header, footer 요소는 main 요소 내부에 직접 포함하면 안니다.**

- **정리한 내용에서 오해를 불러 일으킨 부분이 첫 문장 이다.** 핵심은 **루트(root) 섹션 요소는 body 뿐** 이라는 거다.
- **섹션 요소는 섹션 요소에 포함되는 구조이고,** **루트 섹션은 문서에서 하나 존재하며 그것은 body 이다.**
- **main 요소는 섹션은 아니며, body에 직접 포함되어야 합니다.** **body를 제외한 섹션 요소는 main을 포함할 수 없습니다.**

## 섹션 내부에 사용되는 요소들

- 하기 header 와 footer 는 섹션요소가 아니다.
- 섹션 요소 내부에 넣어도 되고 넣지 않아도 된다.
- 묶어서 분리해야 할 때 넣으면 된다.

### `<heaader>`

- header 요소는 일반적으로 섹션의 제목, 목차, 검색, 로고 등을 포함하는데 사용한다.

### `<footer>`

- footer 요소는 일반적으로 섹션의 저자, 링크, 저작권 정보 등을 포함하는데 사용한다.

### 섹션과 헤딩

- 섹션 요소 `<section>`, `<article>`, `<nav>` , `<aside>`

  - 위에서 말했듯이 section 태그 내부에 article 태그가 존재할 수 있고
  - article 내부에 section태그가 존재할 수 있다.

- 헤딩(h1 ~ h6) 요소는 섹션의 제목에 해당된다.

## 메인(Main) 요소 `<main>`

- 문서 또는 애플리케이션 body 요소의 메인 콘텐츠에 해당한다.

- **main 요소는 섹션 요소가 아니며, 보이는 요소가 2개 이상이면 안된다.**

- **사용되지 않는 main 요소는 화면에서 감춤(hidden) 처리해야 한다.**

- **article, section, aside, nav 요소는 main 요소를 자식으로 포함할 수 없다.**

- **반대로 main 요소는 섹션 요소들을 포함할 수 있다.**

- **main 내부에는 header, footer 요소를 직접적으로 포함하지 않는다.**

  ```html
  [예시] > > >
  <section>
    <header></header>
    <footer></footer>
  </section>
  >

  <main>...</main>

  <main hidden>...</main>
  <!--감춤처리-->

  <main hidden>...</main>
  <!--감춤처리-->
  ```

## 예시 이미지

### Body, header, main, footer

![image](https://user-images.githubusercontent.com/35516239/58403892-c3392100-809e-11e9-9b2c-e37b2ac4b639.png)

![image](https://user-images.githubusercontent.com/35516239/58404126-5bcfa100-809f-11e9-9025-33b625ef4d0c.png)

### Section 내부

![image](https://user-images.githubusercontent.com/35516239/58404243-a8b37780-809f-11e9-9d13-ef6339073469.png)

### Main 내부

![image](https://user-images.githubusercontent.com/35516239/58404370-ef08d680-809f-11e9-8ec2-7ad81eb895b5.png)

## 예시 마크업

```html
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8" />
    <title>섹션(Sections) 요소들과 메인(Main) 요소</title>
  </head>

  <body>
    <header>
      <h1><a href="/">JTBC</a></h1>

      <nav id="global-navigation">
        <h2>글로벌 내비게이션</h2>
      </nav>

      <aside id="review-banner">
        <h3>리뷰 배너</h3>
      </aside>
    </header>

    <main>
      <article id="on-air-banner">
        <h2>온에어 배너 섹션</h2>
        <!-- ... -->
      </article>
      <section id="realtime-vod">
        <header>
          <h2>리얼타임 VOD 섹션</h2>
        </header>
        <!-- ... -->
      </section>
      <article id="daily-programs">
        <h2>데일리 프로그램 섹션</h2>
        <!-- ... -->
      </article>
      <section id="news">
        <h2>뉴스 섹션</h2>
        <!-- ... -->
      </section>

      <section id="program">
        <h2>JTBC 프로그램</h2>
        <!-- ... -->
        <article id="jtbc-news-room">
          <h3>JTBC 뉴스룸</h3>
          <!-- <section>섹션 추가 가능</section> -->
        </article>
      </section>
      <aside id="advertising">
        <h4>광고</h4>
        <!-- ... -->
      </aside>
      <section id="trailer">
        <h2>트레일러(예고편)</h2>
        <!-- ... -->
      </section>

      <section id="notice">
        <h2>공지사항</h2>
        <!-- ... -->
      </section>
    </main>
    <footer>
      <nav id="footer-navigation">
        <h3>푸터 내비게이션</h3>
      </nav>
    </footer>
  </body>
</html>
```

## 참고자료

- 페스트캠퍼스 프론트 엔드 개발 시작하기 camp

- `<section>` [일반 섹션 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/section)
- `<article>` [독립 섹션 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/article)
- `<aside>` [보조 섹션 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/aside)
- `<nav>` [내비게이션 섹션 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/nav)
- `<main>` [메인 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/main)
- HTML 5.2 기술 표준 사양 [Sections](https://www.w3.org/TR/html5/sections.html#sections)
- HTML 5.2 기술 표준 사양 [the main element](https://www.w3.org/TR/html5/grouping-content.html#the-main-element)
- [HTML 5 문서의 섹션과 아웃라인](https://developer.mozilla.org/ko/docs/Web/HTML/HTML5_문서의_섹션과_윤곽)
