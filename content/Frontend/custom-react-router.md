

## 개발환경 설정

### Using CRA 

```bash
create-react-app custom-react-router
cd custom-react-router
```

### 의존성 설치

```bash
yarn add history querystringfy path-to-regexp
```

#### [history](https://github.com/ReactTraining/history) 

 다양한 브라우저 환경에서 브라우저의 history api 를 쉽게 관리할 수 있게 도와주는 api 이다. 자세한 사항은 위 링크를 통해 확인하자.

####  [querystringfy](https://www.npmjs.com/package/querystringify)

쿼리 문자열과 js 객체간의 변환을 돕는모듈이다. 간단한 사용예는 아래와 같다.

```js
cons qs = require('querystringify');

// qs.parse 
qs.parse('?foo=bar');         // { foo: 'bar' }
qs.parse('foo=bar');          // { foo: 'bar' }
qs.parse('foo=bar&bar=foo');  // { foo: 'bar', bar: 'foo' }
qs.parse('foo&bar=foo');      // { foo: '', bar: 'foo' }

// qs.stringify 
qs.stringify({ foo: bar });       // foo=bar
qs.stringify({ foo: bar }, true); // ?foo=bar
qs.stringify({ foo: bar }, '&');  // &foo=bar
qs.stringify({ foo: '' }, '&');   // &foo=
```

### exact 

 `location.pathname` 과 정확하게 일치하는지에 대한 옵션

```jsx
<Route exact path="/one" component={About} />
```

|  path  | location.pathname |  exact  | matches? |
| :----: | :---------------: | :-----: | :------: |
| `/one` |    `/one/two`     | `true`  |    no    |
| `/one` |    `/one/two`     | `false` |   yes    |

### Strict : bool

끝에 나오는 구분자(delimiter, 주로 "/"  )에 대한 옵션

```jsx
<Route exact strict path="/one" component={About}
```

|  path   | location.pathname | matches? |
| :-----: | :---------------: | :------: |
| `/one/` |      `/one`       |    no    |
| `/one/` |      `/one/`      |   yes    |
| `/one/` |    `/one/two`     |   yes    |

### sensitive: bool

대소문자 구분에 관한 옵션 

```jsx
<Route sensitive path="/one" component={About} />
```

|  path  | location.pathname | sensitive | matches? |
| :----: | :---------------: | :-------: | :------: |
| `/one` |      `/one`       |  `true`   |   yes    |
| `/One` |      `/one`       |  `true`   |    no    |
| `/One` |      `/one`       |  `false`  |   yes    |

### multiple path 

```jsx
<Router>
    <Route path={["/home", "/users", "/widgets"]} component={Home} />
</Router>
```