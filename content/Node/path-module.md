---
title: Nodejs, path module, __dirname, __filename 에 대해 톺아보기
date: '2020-03-22T23:46:37.121Z'
template: 'post'
draft: false
slug: 'node-js/path-moudle/'
category: 'Nodejs'
tags:
  - 'Nodejs'
  - 'path'
  - 'webpack'
description: '웹펙을 입문하려 할 때 처음 마주하게 되는게 entry 옵션이고, entry 옵션을 설정할 때 path.resolve("...") 처럼, node.js 의 path 모듈이 쓰이는 것을 볼 수 있다. 나를 포함한 입문자들이 대충 경로를 설정하는 구나 하고 넘어가는데, 나중에 가면 이를 자세하게 알아야 하는 순간이 올 것이고, 그 때를 위해 미리 path 모듈과 __dirname 변수에 대해 정리했다.'
---
![Nodejs](https://imgur.com/0Q4eayO.png)
## 들어가며 

웹펙을 입문하려 할 때 처음 마주하게 되는게 entry, output 옵션이고, entry, output 옵션을 설정할 때 `path.resolve('...')` 나 `__dirname` 이 쓰이는 것을 볼 수 있다. 필자를 포함한 입문자들은 대충 경로를 설정하는 구나 하고 넘어가는데(필자만 그런것인가?), 나중에 웹펙을 직접 설정해가며 커스텀 해야할 순간이 오면 해당 내용을 제대로 알아야 자유 자제로 활용이 가능하다. 그래서 해당 내용을 정리했다. (필자는 단순히 궁금해서 해서  `__dirname`, `__filename` 변수와 path 모듈과 에 대해 정리했다.)

## __dirname, __filenaem

노드에서는 모듈 관계가 있는 경우가 많아 현재 파일의 경로나 파일명을 알아야 하는 경우가 많다. 노드는 `__filename`, `__dirname` 이라는 키워드로 경로에 대한 정보롤 제공한다. 파일에 `__filename`, `__dirname` 변수를 넣어두면 실행시 현재 파일명과 파일 경로로 바뀐다. 아래 예제를 살펴보자. 아래 에제의 js 파일의 위치는 `/Users/ano/temp/directory.js` 이다. 
```js
// file 명을 포함한 절대경로 
console.log(__filename); // /Users/ano/temp/directory.js

// file 명을 제외한 절대 경로 
console.log(__dirname); // /Users/ano/temp
```

해당 변수의 결과는 어떤 운영체제를 사용하냐에 따라 달라질 수 있는데, Window 의 경우 구분자로 `/` 를 써서 `C:\User\ano\directory.js` 라는 결과가 나올 수 있다. POSIX(mac, linux) 운영체제의 경우 구분자로 '/'를 쓰고 예제와 같은 결과가 나온다. 

## path 모듈

모든 기술은 특정 문제를 해결하기 위해 탄생한다. path 모듈은 운영체제별로 경로 구분자가 달라 생기는 문제를 쉽게 해결하기 위해 등장했다. 문제는 운영체제 별로 달라지는 구분자에 대한 이슈는 다음과 같다.
크게 Windows, POSIX 로 갈리는데, POSIX는 유닉스 기반의 운영체제를 말하고, macOS 와 Linux 가 이에 속해있다. 
- Windows: `C:\Users\ano` 처럼 `\` 를 사용해 폴더를 구분한다. 
- POSIX: `/Users/ano` 처럼 `/` 를 사용해 폴더를 구분한다. 

path 모듈을 사용하면 폴더와 파일의 경로를 쉽게 조작할 수 있어 위와 같은 경로 구분자 이슈를 쉽게 해결하고, 이외에 파일명에서 파일명, 확장자를 별도로 때어서 활용할 수 있 수 있다. 

## path 모듈의 사용
path 모듈은 내장 모듈이므로 별도 npm 설치없이 아래 처럼 불러와 사용할 수 있다. 
```js
const path = require('path');
```

## path.resolve([...paths])
- `...paths <string>` : A sequence of paths or path segments
- `Returns` : `<string>`

여러 인자를 넣으면 경로를 묶어 root 경로를 고려한 새로운 경로를 반환한다. `path.join()`과 비슷한데 resolve는 다음과 같은 특징이 있다.

오른쪽 인자 부터 읽어가며 절대경로를 만든다. (앞으로의 예제에서 `/a` 를 root 폴더라고 가정하지만 `/a'` 가 root 폴더가 아닌 경우 working directory를 기준으로 root 폴더까지의 경로를 붙여서 절대경로를 만들어 반환한다.)

```js
// 인자 c 부터 읽어 들인다.
path.resolve('/a', 'b', 'c');   
// Returns: /a/b/c

// /a 루트 폴더가 아닌 경우 root folder 까지의 경로를 붙여서 반환함 
// 현재 해당 파일을 실행시키는 경로가 User/ano/temp/directory.js 라면
path.resolve('/a', 'b', 'c');   
// Returns: User/ano/temp/a 를 반환
```

오른쪽 인자 부터 읽다가 `/folder_nmae` 형태의 경로(path)가 등장하면 절대 경로로 인식해서 그 경로(path)를 바로 반환한다. 따라서 절대 경로가 아닌 경우 상대경로 형태의 표기(`./folder_name`) 를 해서 젇대 경로가 아님을 확실하게 구분해야 한다.


```js
// /b가 절대경로 이므로 /b/c가 반환되고 '/a'는 무시된다.
path.resolve('/a', '/b', 'c');    
// Returns: /b/c

// /c 가 절대경로 이므로 '/a', '/b' 는 무시된다
path.resolve('/a', '/b', '/c');   
// Returns: /c
```

전달된 인자의 조합으로 절대경로가 생성되지 않으면 working directory를 추가하여 절대경로를 만든다. 

```js
// 전달된 인자에 '/folder_name' 형태의 인자가 없으므로, working directory를 추가하여 절대경로 생성
path.resolve('a', 'b', 'c');  //  {current_working_directory}/a/b/c
```
리턴하는 과정에서 경로 구분자(sperator) 를 운영체제에 맞게 nomalize 한다. 

```js
path.resolve('a, b, c');
// Returns:
// WINDOW: 'C:a\b\c' 
// POSIX(mac, linux): '/a/b/c'

// /a 를 WINDOW에서 사용하면 경로구분자를 바꿔서 반환해준다. 
path.resolve('/a');  
// Returns: C:\a

// \a를 POSIX(mac, linux) 에서 사용하면 경로 구분자를 바꿔서 반환해준다.
path.resolve('\a') 
// Returns: /a 
```

어떤 인자도 전달하지 않는다면 현재 working directory 를 반환한다. 현재 작업 중인 파일이 `/Users/ano/directory.js` 라면 `Users/ano` 를 반환한다.  


```js
//  User/ano/directory.js 에서 실행된다면 working directory 를 반환
console.log(path.resolve(''));  
// Returns: `/User/ano`
```
결론적으로 `path.resolve` 는 전달된 인자를 오른쪽에서 왼쪽으로 읽으며 **상대로와 절대 경로를 구분하고 절대경로를 만들어 반환한다.**

## path.join([...paths])
- `...paths <string>` : A sequence of path segments
- `Returns` : `<string>`

여러 인자를 넣으면 하나의 경로를 합쳐 반환하다. 상대경로를 표시하는 `..` 와  현 위치를 표시하는 `.` 도 반영한 결과를 리턴한다. 

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux');
// Returns: '/foo/bar/baz/asdf/quux'

// 마지막 인자의 .. 가 현재 위치보다 한단계 위 상위 폴더를 의미하므로 
// '/foo/bar/baz/asdf/quux' 보다 한 단계가 위 폴더의 경로가 반환됨
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

// __dirname : User/ano/temp/direcotory 
// 상대경로와 절대경로를 인자로 전달한 경우 이를 반영한 결과를 리턴함
// 두 단계 올라간 User/ano 에서 /workspace 폴더로 내려가 다시 /ano 폴더를 찾음
path.join(__dirname, '..', '..','workspace', '.', '/ano');
// Returns: User/ano/workspace/ano 
```
## path.sep
경로의 구분자(seperator) 이다. Windows는 `\` , POSIX 는 `/` 값을 담고 있다.

## path.delimiter
환경 변수의 구분자이다. 필자의 로컬환경에서 process.env.PATH 를 조회하면 `/Users/ano/.nvm/versions/node/v10.10.0/bin:/usr/local/opt/node@8/bin:/usr/local/opt/php@7.2/sbin:/usr/local/opt/php@7.2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/opt/fzf/bin` 라는 결과를 얻을 수 있는데 여기에 환경 변수를 구분하는 구분자로 `:`, colon 이 쓰이고 있다. 

Windows 는 세미콜론(`;`)을 사용하고, POSIX 는 콜론(`:`)을 사용한다. 

## path.dirname(paths)
- `path`: `<string>`
- `Returns`: `<string>`


현재 파일이 위치한 폴더 경로를 보여준다. 
```js
// __filename : '/Users/ano/temp/directory.js'
path.dirname(__filename);
// Returns: '/Users/ano/temp'
```
## path.extname(paths)
- `path`: `<string>`
- `Returns`: `<string>`


파일의 확장자를 보여준다. 
```js
// __filename : '/Users/ano/temp/directory.js'
path.extname(__filename);
// Returns: '.js'
```

## path.basenaem(path[, ext])
- `path`: `<string>`
- `ext`: `<string>` An optional file extension
- `Returns`: `<string>`


파일의 이름(확장자 포함)을 보여준다. 파일의 이름만 표시하고 싶다면 basnme 의 두 번째 인자로 파일의 확장자(ext)를 넣어주면 된다. 
```js
// __filename : '/Users/ano/temp/directory.js'
path.basename(__filename);
// Returns: 'directory.js'

// path.extname(__filename): '.js'
path.basename(__filename, path.extname(__filename));
// Returns: 'directory'

{root: "/", dir: "/Users/ano/temp", base: "directory.js", ext: ".js", name: "directory"}
```
## path.parse()
- `path`: `<string>`
- `Returns`: `<Object>`
  
The returned object will have the following properties:

- `dir`: `<string>`
- `root`: `<string>`
- `base`: `<string>`
- `name`: `<string>`
- `ext`: `<string>`

파일 경로를 인자로 받아, root, dir, base, ext, name으로 분리한 후 해당 내용을 담은 객체값을 리턴한다. 


```js
// on POSIX:
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```


```js
// On Windows:
path.parse('C:\\path\\dir\\file.txt');
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴──────────────┴──────┴─────┘
("" 안에 있는 모든 공백은 무시된다.)
```

 `path` 가 문자열이 아닌 경우 [`TypeError`](https://nodejs.org/api/errors.html#errors_class_typeerror) 에러를 뱉는다. 

## path.format(pathObject)
- pathObject: `<Object>`
  - dir: `<string>`
  - root: `<string>`
  - base: `<string>`
  - name: `<string>`
  - ext: `<string>`
- Returns: `<string>`

`path.parse()` 한 객체를 인자로 받아 합쳐서 경로 문자열(string)을 리턴한다. .
```js
// __filename : '/Users/ano/temp/directory.js'
// path.prase(__filename) Returns: 
/*
{
  root: "/", 
  dir: "/Users/ano/temp", 
  base: "directory.js", 
  ext: ".js", 
  name: "directory"
}
*/
path.format(path.parse(__filename));
// Returns: '/Users/ano/temp/directory.js'
```

## path.normalize(path)
- `path`: `<string>`
- `Returns`: `<string>`
  
`/` 나 `\` 를 실수로 여러번 사용했거나 혼용한 경우 정상적인 경로로 변환해준다. 
```js
path.nomalize('\\Users///ano\\\temp/directory.js');
// Returns: '/Users/ano/temp/directory.js'
```

## path.isAbsolute(path)
- `path`: `<string>`
- `Returns`: `<boolean>`

파일의 경로가 절대경로인지, 상대경로인지 `true` or `false` 로 반환해준다. 
```js
// '/Users/ano/temp/directory.js'
path.isAbsolute('/Users');  //Returns: true 
path.isAbsolute('./ano');   //Returns: false 
```

## path.relative(from, to)
- from: `<string>`
- to: `<string>`
- Returns: `<string>`

두 경로를 인자로 전달하면, 첫번째 경로에서 두번째 경로로 가는 방법을 결과로 리턴한다. 
```js
// '/Users/ano/temp/directory.js'
path.relative('/Users/ano/temp/directory.js', '/Users');  
// Returns: '../../..'
```
## path.posix, path.win32
종종 Windows 에서 POSIX 스타일을, POSIX 에서 Windows 스타일을 사용할 때가 있다. 그런 경우에 Windows 에서는 `path.posix.sep`, `path.posix.join()` 같이 사용하면 되고, POSIX 에서는 `path.win32.sep`, `path.win32.join()` 를 활용하면 된다. 

## 특이사항

### Windows 환경에서 `\\` 와 `\`를 같이 사용하는 경우
Windows 환경에서 기본적으로 `\` 하나를 써서 경로를 표현한다. 하지만 자바스크립트 문자열에서 `\` 가 특수문자이기 때문에 `\`를 하나 더 붙여 `\\` 특수문자가 아닌 경로로 쓰인다는 것을 표기해야 한다. 예를 들어 `\n`은 자바스크립트에서 줄바꿈이라는 뜻이다. 따라서 `C:\node` 와 같은 경로에서 의도치 않은 오류가 발생할 수 있으므로 `C:\\node`로 표시한다.

### 상대경로와 절대 경로 
절대경로는 루트 폴더(Windows의 `C:\` 나 POSIX 의 `/`)나 노드 프로세스가 실행되는 위치가 기준이 된다. 상대경로는 현재 파일이 기준이 된다. 현재 파일과 같은 경로면 점 하나(`.`) 를 현재 파일보다 한 단계 상위 경로먄 점 두개 (`..`) 를 사용해 표현한다. 

`/Users/ano/temp/directory` 에서 `/Users` 로 가고 싶다면 절대경로에서는 그냥 `/Users` 를 입력하면 된다. 상대 경로에서는 `../../..` 를 해야 3 디렉토리 위로 올라가 `/Users` 가 된다. 

