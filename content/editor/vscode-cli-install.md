---
title: vscode, cli를 이용하여 extension 설치하기
date: '2019-07-10T23:46:37.121Z'
template: 'post'
draft: false
slug: 'editor/vscode/install-extension-using-cli'
category: 'vscode'
tags:
  - 'editor'
  - 'vscode'
  - 'terminal'
description: '이번 글에서는 CLI(command line interface)를 통해 vscode의 extension 을 설치하는 법을 배운다. 해당 내용을 통해 새로운 컴퓨터에서 개발환경 세팅을 빠르게 완료할 수 있다.'
---

## 들어가며

이번 글에서는 CLI(command line interface)를 통해 vscode의 extension 을 설치하는 법을 배운다. 해당 내용을 통해 새로운 컴퓨터에서 개발환경 세팅을 빠르게 완료할 수 있다.

## 설치방법

vscode 공식 문서에 나온 내용은 다음과 같다.

```bash
code --install-extension (<extension-id> | <extension-vsix-path>)
    Installs an extension.
 
```

여기서 extension id가 무엇인지 궁금할 수 있다. `<extension-id> `는 다음과 같다.

![Imgur](https://i.imgur.com/HHB8475.png)

위 extension 을 설치한다고 했을 때 아래와 같이 명령어를 입력할 수 있다.

```bash
code --install-extension ms-vscode.azurecli 
```

> [참고 링크](https://code.visualstudio.com/docs/editor/extension-gallery#_command-line-extension-management)

## 활용방법

그런데 위 예시처럼 하나의 extension을 설치하기 위해 매번 cli 명령어를 입력해야 한다면 자동화가 아니다. 자동화를 위해 리눅스의 명령어 조합을 활용하자.

``` bash
cat vscode-extensions.txt | xargs -L1 code --install-extension
```

일단 vscode-extension.txt 에는 아래와 같은 내용이 들어있다고 가정하자

```html
ms-vscode.azurecli
formulahendry.auto-close-tag
naumovs.color-highlight
Name: Color Highlight
```

### cat

특정 파일을 인자로 받아 해당 콘텐츠를 출력한다

```bash
cat vscode-extensions.txt

# 출력될 내용
ms-vscode.azurecli
formulahendry.auto-close-tag
naumovs.color-highlight
Name: Color Highlight

```

### xargs

표준 출력의 내용을 다음 명령어의 인자로 전달한다. 여러가지 옵션이 있지만 여기서는 L(line) 옵션을 사용했다. 출력 내용이 여러줄이면 1줄씩 인자로 전달하겠다는 내용이다. 

```bash
cat vscode-extensions.txt | xargs -L1 code --install-extension

# 실제 실행될때
code --install-extension ms-vscode.azurecli;
code --install-extension formulahendry.auto-close-tag;
# .... 생략  

```

## extension.txt 만들기

현재 내가 설치하고 있는 extension id를 일일히 찾아서 기입하는 일은 번거롭다. 깔려있는 모든 extension id는 어떻게 추출할 수 있을까? 필자의 경우 아래 명령어를 통해 vscode 폴더를 찾았다.

**.vscode/extensions 폴더 찾기** 

```bash
find ~ -name ".vscode" -type d | grep -i godot/.vscode

# 출력 결과
/Users/godot/.vscode
/Users/godot/.vscode/extensions/steoates.autoimport-1.5.3/.vscode
/Users/godot/.vscode/extensions/ritwickdey.liveserver-5.6.1/node_modules/bcryptjs/.vscode
/Users/godot/.vscode/extensions/tht13.python-0.2.3/.vscode
/Users/godot/.vscode/extensions/tht13.python-0.2.3/src/server/.vscode
/Users/godot/.vscode/extensions/msjsdiag.debugger-for-chrome-4.12.3/node_modules/vscode-uri/.vscode
/Users/godot/.vscode/extensions/ms-vscode.vscode-typescript-tslint-plugin-1.2.3/node_modules/vscode-uri/.vscode
```

.vsocde 내부에 extensions 폴더에 현재 깔려있는 extension 폴더들이 존재한다. 때문에 그 폴더로 이동했다.

**.vscode/extensions 폴더로 이동하기** 

```bash
cd /Users/godot/.vscode/extensions
```

**깔려있는 extension 확인하기** 

```bash
ls -l 
# 출력 결과
drwxr-xr-x   7 godot  staff   224 Jun 30 15:56 2gua.rainbow-brackets-0.0.6
drwxr-xr-x   8 godot  staff   256 Jul  1 17:33 akamud.vscode-javascript-snippet-pack-0.1.5
drwxr-xr-x   9 godot  staff   288 Aug 13 16:20 alduncanson.react-hooks-snippets-1.1.6
drwxr-xr-x   9 godot  staff   288 Nov 19 17:45 andys8.jest-snippets-1.7.0
drwxr-xr-x  11 godot  staff   352 Aug  3 14:22 blanu.vscode-styled-jsx-1.5.0
drwxr-xr-x  11 godot  staff   352 Aug 20 20:50 dbaeumer.vscode-eslint-1.9.1
drwxr-xr-x  16 godot  staff   512 Nov 29 17:36 esbenp.prettier-vscode-3.11.0
-rw-r--r--   1 godot  staff  1905 Dec 10 16:41 example.txt
drwxr-xr-x   9 godot  staff   288 Jun 11 19:09 formulahendry.auto-close-tag-0.5.6
drwxr-xr-x  10 godot  staff   320 Oct 28 15:25 formulahendry.auto-rename-tag-0.1.1
drwxr-xr-x  13 godot  staff   416 Nov 10 22:05 jpoissonnier.vscode-styled-components-0.0.27
drwxr-xr-x  11 godot  staff   352 Sep  9 12:29 monokai.theme-monokai-pro-vscode-1.1.14
drwxr-xr-x  35 godot  staff  1120 Nov 22 20:15 ms-python.python-2019.11.50794
drwxr-xr-x  12 godot  staff   384 Dec  6 16:24 ms-vscode.vscode-typescript-tslint-plugin-1.2.3
drwxr-xr-x  37 godot  staff  1184 Nov 20 13:12 ms-vsliveshare.vsliveshare-1.0.1293
drwxr-xr-x  33 godot  staff  1056 Dec  6 11:21 msjsdiag.debugger-for-chrome-4.12.3
drwxr-xr-x  14 godot  staff   448 Oct  8 20:23 naumovs.color-highlight-2.3.0
drwxr-xr-x  11 godot  staff   352 Nov 19 17:46 orta.vscode-jest-3.0.2
drwxr-xr-x  21 godot  staff   672 Nov 25 10:51 pkief.material-icon-theme-3.9.2
drwxr-xr-x  10 godot  staff   320 May 24  2019 ritwickdey.liveserver-5.6.1
drwxr-xr-x  15 godot  staff   480 Jun 19 14:34 robinbentley.sass-indented-1.5.1
drwxr-xr-x  14 godot  staff   448 Nov  7 10:43 steoates.autoimport-1.5.3
drwxr-xr-x  19 godot  staff   608 Apr 28  2019 tht13.python-0.2.3
drwxr-xr-x  11 godot  staff   352 Dec  4 16:52 wallabyjs.quokka-vscode-1.0.262
```

**출력결과 저장**

아래 명령어를 통해 extension.txt를 만들 수 있다. 해당 extensions 폴더에서 필요한 네이밍만 추출하면 extensions.txt 가 완성된다. 

(리눅스 명령어를 통해 불필요한 정보를 제외하고 필요한 네이밍 ex) `steoates.autoimport`  만 추출이 가능할 것이다. 다만 현재의 필자는 에디터를 통해 불필요한 권한, 유저정보, 시간 등의 데이터를 삭제하기로 했다. )

```bash
ls -l > extensions.txt
```

