## 요구 사항

- [x] 새로운 할일을 등록하고, 새로운 할일이 리스트에 추가된다.

- [x]  **'X'** 버튼을 클릭하면 해당영역의 할일이 삭제된다.
- [x]  할일내용을 클릭하면 **취소선이 표시**되면서 **완료된 상태**로 변경된다.
- [x]  todolist 항목이 **접기 / 펼치기**로 노출이 됐다 안됐다 한다.
- [x]  초기데이터는 fetch로 가져오는 동안 '**loading중…**' 이라는 메시지를 노출한다.
- Hooks API로 모두 변경한다.
  - [x] 모든 Classes 컴포넌트를 Hooks를 사용해서 함수형 컴포넌트로 변경한다.
  - [x]  **useFetch** 라는 **custom hook** 을 만들어서, 다른 컴포넌트에서도 데이터 통신작업에서 **재사용**할 수 있도록 해보자.
- Express를 사용해서 API 서버환경을 만든다.
  - [ ]  API서버에서는 todolist 초기 데이터를 JSON으로 반환한다.
  - [ ]  클라이언트에서는 이 데이터를 기본으로 렌더링한다.
- 추가UI구성
  - [ ]  우측상단에 **할일과 완료된일의 갯수**를 보여주는 UI를 추가로 만든다. (우측상단 동그라미 영역)
  - [ ]  이 부분을 개발할때 **useContext API, useReducer**를 사용해서 state를 관리 한다.

## 실행 계획 

### Form 기능 구현 하기

- [x] 텍스트 내용 바뀌면 state 업데이트
- [x] 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
- [x] 인풋에서 Enter 누르면 버튼을 클릭한것과 동일한 작업진행하기

### todo item 컴포넌트 기능

- [x] onToggle 함수 구현 : todoitem 영역 클릭시 done, todo 상태 변경 토글
- [x] chekbox design 적용 
- [x] remove 함수 구현: 클릭시 todoitem 삭제 

### Fold 구현 

- [x] fold 버튼이 들어갈 subtitle 컴포넌트 생성 
- [x] fold button design(rotate)  
- [x] fold 버튼 눌렀을 시 todowrap 태그의 height 조정으로 기능 구현
- [ ] Acordian UI 처럼 fold 버튼 클릭시 에니메이션을 구현(ref 적용 필요)
  - 복잡도가 높아 나중으로 연기 

### 초기데이터는 fetch로 가져오는 동안 '**loading중…**'  구현

- [x] Loader 컴포넌트 생성 및 디자인
- [x] componentDidmount 내부의 상태변경 로직 추가 및 TodoListItem 내부에서 loding 상태에 따른 분기처리 
- [x] sleep 함수 만들어서(2초간 sleep) 초기 렌더링 2초 지연해서 loading 구현 살피기
- [ ] suspense Reactjs.org

#### 참고 

- https://codesandbox.io/s/o5yw60jwlq?from-embed

### State Refactoring

todos 와 loading 두 개의 상태 관리가 필요할까? 더 깔끔하게 적용하는 법은 없을까?

```js
// todos 와 loading 을 같이쓰고 있다
const [todos, setTodos] = useState([]);
const [folded, setFolded] = useState(false);
const [loading, setLoading] = useState(true);
const [value, setValue] = useState('');

// useEffect에서는 아래와 같이 두개의 상태변경이 있다.
useEffect(() => {
  (async () => {
    const errorMsg = ERROR_MSG.FETCh;
    await sleep();
    try {
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);
      // 두개의 상태변경
      setTodos(data.body);
      setLoading(false);
    } catch (err) {
      console.warn(err);
    }
  })();
}, []);
```

하나의 상태로 만든다면?

```js
const [todos, setTodos] = useState({
  loading: true,
  data: null,
  error: null
})

useEffect(() => {
  (async () => {
    const errorMsg = ERROR_MSG.FETCh;
    await sleep();
    try {
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);
      // 두개의 상태변경
      setTodos({
        loading: false,
        data: data.body,
        error: null
      });
    } catch (err) {
      console.warn(err);
      setTodos({
        loading: false,
        data: null,
        error: err
      });
    }
  })();
}, []);
```

이렇게 고민하다가 위 처럼 코드를 바꿧는데, `onCreate` , `onRemove` 함수에서 `todos` 를 변경하는 로직이 복잡해서 위 설계에 문제가 있다는 점을 발견

 todos 데이터의 상태와, loading 상태를 같이두는 것은 로딩한 데이터가 더 이상 수정이 없다는 가정하에만 괜찮은 로직인 것 같다 라고 판단함 

커스텀 Hooks 에서 loading 상태와 error 상태를 리듀서로 관리 하도록 변경 

### 위 익명함수를 함수로 빼서 설계 

```js
const fetchTodos = async () => {
    const errorMsg = ERROR_MSG.FETCh;
    // 2초간 loading 화면을 보여주기 위한 세팅
    await sleep();
    try {
      const response = await fetch(FetchUrl);
      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();

      if (!data.statusCode === 200) throw new Error(errorMsg);
      setTodos(data.body);
      setLoading(false);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
```

 ### `useFetch` 라는 **custom hook** 만들기(다른 데서도 재사용) 

#### checkStatus 에러처리, 및 useFectch 수정 

 `fetch` 데이터 parsing 영역이 api 마다 다를 것이라 생각해서 callback 함수에 parsing을 정의할 까 고민했다. 그러나 callback을 외부에 작성하면 매 fetch API 요청 마다 parsing 로직을
재작성 해야하는데 이렇게 하면 hooks 를 재사용하는 의미가 없어진다. 

보통은 api가 
동일한 스키마를 가지고 있는게 일반적이며 api 구조가 달라질 useFetch 를
 수정하도록 하면 된다.

```js
function useFetch({ fetchUrl, deps = [] }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      // 데이터 파싱 부분 useFetch 내부에 작성하도록 결정
      const response = await fetch(FetchUrl);
    	const data = await response.json();
      dispatch({ type: 'SUCCESS', data: data.body });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}
```

### APP js 가 비대해졌다. 

**뭐가 문제일까?**

거의 대다수의 상태를 최상위 컴포넌트인 app 에서 관리하고 있다. TodoListTemplate 컴포넌트에 주입을 위해 app에 전부를 선언하다가 커져버렸다. 상태 변수를 쓰는 이벤트 콜백함수들도 모두 app 에서 선언되어 사용한다. 

**왜 이런 Template 컴포넌트를 썻는가?**

만약에 이걸 안한다면.. TodoListWrapper 란 컴포넌트를 만들게되어 children 내부에 모든걸 다 넣어줘야 한다. 이런식으로 말이다: `<TodoListWrapper><Form/><TodoList/></TodoListWrapper>` 물론 이런 방식, 전혀 문제되지 않는다.

그런데 예를 들어서 Form 과 TodoList 사이에 테두리를 설정한다고 했을 때 만약에 Template 컴포넌트를 사용하는 경우에 이런 스타일은 Template 내에서 주면 되겠지만, Wrapper 같은 컴포넌트를 사용하게 되면 해당 스타일을 Form 혹은 TodoList 쪽에 넣어줘야 한다.

이 부분을 개선할 수 없을지 고민해보자 

```js
const App = () => {
  const [todos, setTodos] = useState([]);
  const [folded, setFolded] = useState(false);
  const [value, setValue] = useState('');
  const [todosFetchState, refetch] = useFetch({ fetchUrl: FetchUrl });
  const { data, loading, error } = todosFetchState;
  useEffect(() => {
    setTodos(data);
    // eslint-disable-next-line
  }, [data]);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const onCreate = () => {
			...
  };

  const onKeyPress = ({ key }) => {
			...
  };

  const onToggle = id => {
			...
  };

  const onRemove = id => {
			...
  };

  const onFold = () => {
   		...
  };

  return (
    <TodoListTemplate
      form={
        <Form
          value={value}
          onCreate={onCreate}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      }
      status={<Status todos={todos} />}
      folded={folded}
      subtitle={<Subtitle folded={folded} onFold={onFold} />}
    >
      <TodoItemList
        onToggle={onToggle}
        onRemove={onRemove}
        todos={todos}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </TodoListTemplate>
  );
};
export default hot(App);

```

#### todos 와 setTodos 만 전달하자

todos 와 setTodos 만 props 전달하고 create, toggle, remove, keyPress 등의 메소드 들은 각 컴포넌트 내부에서 props 로 todos 와 setTodos를  전달받아 생성하도록 바꾸자. 결과적으로 app.js 의 비대해짐이 한결 나아졌다. 



## 미션 진행중 기록 

### Hooks API 로 변경하며 느낀점 

state를 하나의 변수에 모아서 관리하지 않아도 된다. state의 value 가 객체안에 객체가 있는 구조일 경우 hooks 를 쓰면 depth를 줄이게 될 수 있다. 

```js
// 기존 스테이트 관리
state = { input: '', todos: [], folded: false, loading: true };

// Hooks
const [todos, setTodos] = useState([]);
const [folded, setFolded] = useState(false);
const [loading, setLoading] = useState(true);
const [value, setValue] = useState('');


// 기존 클래스의 render method 내부에서 this로 부터 destructuring 해서 썻던 코드가 더 이상 필요없어졌다.  
const { input, todos, folded, loading } = this.state;
const { onChange, onCreate, onKeyPress, onToggle, onRemove, onFold } = this;

```

`componentDidMount ` 보다는 `useEffect` 가 더 직관적이다. 해당 함수는 sideEffect를 일으켜야 하는 함수로서, 더 명확한 것 같다. 

## Fold(Arcodian UI) Animation 이슈

### Displany : None 

- display: none 형태로 구현시에는 transition을 적용할 수 없다. 
- height를 변경해야 한다

### Height : auto

- height 0 &rarr; auto,  auto &rarr; height 0 사이에는 transition 적용이 안되는 이슈가 있다.

### ref 사용하여 height 값을 구한뒤에 적용해줘야 한다.

- 그러나 이렇게 해도, 초기값에 `${folded? ref.scrollHeigh : 0px}` 조건으로 초기에 folded false 인데도 animation이 펼쳐지지 않는 이슈
- todo 추가시에 이미 height 값이 고정되어 늘어나지 않는 이슈 
- 현재 미해결 상태  &rarr; snapshop 으로 commit 후 branch 생성 

### 참고 

- [poimaweb Acordian UI](https://poiemaweb.com/fastcampus-exercise/accordion-ui)
- [react ref API](https://reactjs.org/docs/refs-and-the-dom.html)
- [React Acordian UI](https://medium.com/skillthrive/build-a-react-accordion-component-from-scratch-using-react-hooks-a71d3d91324b) 

### Domcontentloaded 상황시에 CSS 미적용으로 인한 깜빡임

-  현재 어떤 키워드로 검색해야 할지 몰라 이슈 해결 유보중 

- style을 가져왔는지 확인하자(네트워크 탭) 

- style을 하나씩 import 하고 있는 것 발견 - 이것이 이슈가 될 수 있음 

  ![깜빡임 이슈](https://user-images.githubusercontent.com/35516239/63646773-1df02080-c753-11e9-9510-8cea1a563724.gif)

![image](https://user-images.githubusercontent.com/35516239/63646722-4deaf400-c752-11e9-83b8-a509a7295de3.png)



