---
title: vscode에서 eslint global 적용시 eslint-plugin load fail 이슈
date: '2019-09-13T23:46:37.121Z'
template: 'post'
draft: false
slug: 'editor/vscode/eslint-global-plugin-load-fail'
category: 'vscode'
tags:
  - 'editor'
  - 'vscode'
  - 'eslint'
description: 'vscode에서 eslint를 사용하기 위해 eslint 와 관련 플러그인을 글로벌 모드로 설치했으나 vscode에 들어와보니 오류가 발생한다. eslint v6의 이슈로 eslint plugin의 전역사용이 안된다. 최상위 폴더에 관련 플러그인을 설치하고 vscode 내부에서 플러그인을 로드하는 폴더를 설정해서 이슈를 해결했다. '
---
![vscode logo](https://imgur.com/iOTX11h.png)
## 들어가며

vscode에서 **eslint**를 사용하기 위해 eslint 와 관련 플러그인을 글로벌 모드로 설치했으나 vscode에 들어와보니 오류가 발생한다. eslint v6의 이슈로 eslint plugin의 전역사용이 안된다. 최상위 폴더에 관련 플러그인을 설치하고 vscode 내부에서 플러그인을 로드할 폴더를 설정해서 이슈를 해결했다.

## 이슈 

- vscode에서 eslint를 사용하기 위해 eslint 와 관련 플러그인을 글로벌 모드로 설치했으나 vscode에 들어와보니 오류가 발생한다. 
![image](https://user-images.githubusercontent.com/35516239/64865270-e8fd2c80-d673-11e9-8fcf-c5e492651d64.png)

## 관련 문제
### [eslint v6 의 이슈](https://eslint.org/docs/user-guide/migrating-to-6.0.0#-plugins-and-shareable-configs-are-no-longer-affected-by-eslints-location)
eslint 가 버전을 올리면서 eslint 는 전역설치를 허용하되 플러그인(ex. eslint-plugin-xx)은 전역으로 쓰지 못하도록 업데이트를 진행했다. 위 제목의 링크를 통해 확인할 수 있다. 

## 해결 
- 상위 폴더(`Users/godot -> Users/${username}`) npm init(`npm init -y`) 하고,  `eslint` 플러그인을 설치한다.

```bash
# 현재 폴더 확인
pwd  # /Users/godot

# 패키지 관리 시작 
npm i -y 

# eslint 관련 패키지 설치 (필자의 경우 eslint-config가 필요했음)
npx install-peerdeps --dev eslint-config-airbnb
```

- 해당폴더의 node_moudles 를 vscode eslint.nodePath 로 설정한다.  
![image](https://user-images.githubusercontent.com/35516239/64866062-b0f6e900-d675-11e9-9e89-957838ea6af1.png)
