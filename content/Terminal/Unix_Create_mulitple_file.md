---
title: touch, mkdir 명령어로 특정 하위 폴더 아래 다수의 파일, 폴더 생성하기 in Unix 
date: '2020-03-15T23:46:37.121Z'
template: 'post'
draft: True
slug: '/unix/command/create-mulitple-file-using-touch-and-mkdir'
category: 'Unix Command'
tags:
  - 'Unix'
  - 'Linux'
  - 'Command'

description: '리엑트로 서비스를 운영할 때 api 에서 전달되는 텍스트가 길어서 특정 부분에 개행을 해야하는 경우가 있다. api 로 전달되는 텍스트 이기에 텍스트 중간에 `<br/>` 태그 등의 강제 개행 태그를 추가할 수도 없다. 이럴때 어떻게 해야할까? html-react-parser를 활용하면 이를 해결할 수 있다.'
---

![command-line-image](https://imgur.com/TpovwV8.png)


Here is how you create multiple sub directories:
```bash
$ mkdir -p project/{images,pages}
```
The p option is to also create the "public" directory.
Using a similar syntax as the above you can also create files under directories:
```bash
$ touch project/{index.html,pages/pages.html,pages/new.html}
```
This is the structure of your folder project now:
```bash
project/
    - index.html
    images/
    pages/
        - index.html
        - new.html
```
Happy Hacking!