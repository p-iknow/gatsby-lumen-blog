# ESLint, Prettier 및 EditorConfig를 함께 사용해야하는 이유

![썸네일](https://blog.theodo.com/static/158d5fd11dce2db35cf7885c3c59bb41/4f4bd/Untitled-Diagram.png)

이 게시물은 **[ESLint](http://eslint.org/)** , [**Prettier**](https://prettier.io/) 및 [**EditorConfig**](https://editorconfig.org/) 를 사용하여 개발 환경을 개선하는 방법에 관한 글 입니다 . ESLint, Prettier, EditorConfig 및 이들을 **함께** 사용하여 얻는 이점을 이미 알고 있다면  [이 시리즈의 다음 글](https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/) 앞에 나열된 기술을 함께 세팅하는 하는 방법을 참고하세요.

## Context

진행중인 TypeScript-React 프로젝트에서 ESLint와 Prettier를 사용하여 코드를 코드 컨벤션을 정리(Lint and Format) 하기로 결정했습니다 . ESLint와 Prettier `Formatting(형식)` 의 충돌로 대해 며칠 동안 고민이 많았는데. 우리의 코드는 다음과 같았습니다.

![img](https://blog.theodo.com/1b3534309d72ef5f466a977754477909/conflict-1.gif)

ESLint와 Prettier 간의 `Formatting` 충돌

많은 연구 끝에 formatting 충돌 없이 ESLint와 Prettier를 함께 사용할 수 있게 되었습니다. 또한 EditorConfig를 추가하여 사용하기로 했습니다! 이후 이번 세팅을 통해 알게 됬던 내용을 정리해 블로그 게시물로 업로드 하게되었습니다. 

포맷 문제를 해결하는 데 꽤 많은 시간이 걸렸지만 ESLint, Prettier 및 EditorConfig를 함께 사용해야 한다는 생각은 여전합니다. 언뜻 보면 3가지 기술이 **모두 비슷한 목적을 가지고 있는 것 처럼 보이지만, 각자의 기술은 특정 분야에서 더 뛰어 나기 때문입니다**.그래서 우리는 3가지(Eslint, Prettier, EditorConfig) 를 함께 사용 하려 합니다.

## ESLint, Prettier 및 EditorConfig

### 3가지 기술은 각긱 어떤 역할을 하는가?

우리의 세 가지 도구는 모두 **비슷한 목표를** 가지고 있습니다 .

- 코드 자체와 팀 구성원 간 코드 **일관성 유지**
- 잠재적 인 버그로 이어질 수 있는 **문제가 있는 코드 패턴 탐지**

[**ESLint**](http://eslint.org/) 는 지금까지 가장 많이 사용되는 JavaScript **Linter** 입니다. 코드를 정적(static)으로 분석하여 formatting 문제를 감지하고 코드 불일치를 찾는 데 도움이됩니다.

[**Prettier**](https://prettier.io/) 는 code를 **formatting**  한다는 점에서 ESLint와 유사 하지만 코드 품질을 확인하지 않습니다. 단순히 코드 formatter 역할을 합니다. 또한 JavaScript뿐만 아니라 JSX, Flow, TypeScript, HTML, JSON, CSS 및 더 많은 언어를 기본적으로 지원합니다.

반면[ **EditorConfig**](https://editorconfig.org/) 는 코드를 Lint  하거나 formatting 하지 않습니다.  단지 **표준 코드 스타일 가이드 (standard code formatting style guide)**  정의하고 이를 팀 내 개발자가 사용 IDE에 무관하게 적용될 수 있게 합니다. 예를 들어 팀에서 Sublime Text 및 Visual Studio Code와 같은 두 가지 다른 IDE를 사용하더라도 EditorConfig를 사용하면  IDE에 무관하게 공통 들여 쓰기 패턴 (공백 또는 탭)을 적용할 수 있습니다.

## Customize the rules

사용자가 지정한 ESLint, Prettier 및 EditorConfig 설정에 따라 linting 그리고 formatting 환경이 달라집니다.

ESLint의 환경 설정(configuration)은 **.eslintrc(.eslintrc.json 또는 .eslint.yaml… 일 수 있음) ** 파일에서 합니다. 이 설정 파일을 통해  통해 여러가지 formatting rule을 설정할 수 있고, 해당 설정을 통해 여러 다른 프레임 웍(React, Vue, Typescript)에서 사용되는 플러그인을 사용할 수 있습니다. 예를 들면 다음과 같은 설정입니다. 

```json
// eslintrc
{
	"extends": [
    	"eslint:recommended",
    	"plugin:react/recommended"
  	]  
}

```

 해당 파일에 대한 구체적인 설정 방법은 다음 글에서 다룹니다.

configuration 파일이 필요한 ESLint와 달리 Prettier는 별도 설정 파일 없이도 작동 합니다. 개발자들이 별도의 설정 없이 더 중요한 일에 집중하도록 한 것이 목적입니다. 그러나 여전히 커스텀 세팅이 필요할 때가 있습니다. 그때는 **.prettierrc ** 파일을 활용해 세팅하면 됩니다. 

마지막으로 **.editorconfig** 파일은 편집 옵션(탭, 스페이스, line feed, charset 등) 을 정의하고 IDE 또는 Editor가 해당 파일에 정의된 세팅을 적용하도록 합니다. 이를 통해  팀 구성원이 각자 다른 IDE를 쓰더라도 동일한 코드 결과물을 얻을 수 있습니다.

## Auto Fixing ability

ESLint와 Prettier는 **자동 수정 기능** 을 제공 하여 오류에 대한 수정 사항을 발견 할 때마다 코드를 자동으로 수정 할 수 있습니다. 이 기능은 IDE 또는 editor에 통합되어 파일을 저장하거나 코드를 붙여 넣을 때마다 코드를 수정하고 형식을 지정할 수 있습니다. 반면 EditorConfig는 편집기의 설정을 직접 덮어씁니다.

## 잠깐만! 왜 세 가지를 모두 사용합니까?

좋은 질문입니다! **ESLint는** 이미 **code-auto-formatting** 기능이 있는데 왜 **Prettier** 를 사용하나요? 그리고 **Prettier는** 이미 편집기의 특정 설정 없이 **code formatting** 을합니다. 그런데 왜 **EditorConfig를** 사용해야 하나요?

첫 번째 질문에 답하기 위해, **Linter**는 궁극적으로 두 가지 역할을 하고 있음을 기억해야 합니다.

- **Formatting rules** : 일관성이 없고 보기 흉한 코드를 방지하는 규칙 (eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…)
- **Code-quality rules** : 쓸모 없는 코드, 잠재적으로 오류를 발생  시킬 수 잇는 코드를 방지하는 규칙(eg: no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…)

**ESLint** 는 **두 역할** 을 를 **모두** 수행 하고 있는데, 가능한 경우에만 코드를 자동 수정 합니다.(Prettier 없이는 불가능한 수정이 있다는 말입니다.)  반면 **Prettier** **는** 코드 내에서  **formatting errors** 만을 검사 하지만 **ESLint보다이 작업을 훨씬 잘 수행** 합니다.

## Example

이를 설명하기 위해 간단한 JavaScript `main.js`파일을 만듭니다 . 그런 다음 데모 목적으로 CLI를 사용하여 **ESLint** 및 **Prettier** 를 실행 합니다.

![Imgur](https://i.imgur.com/IAk9fjX.png)

```js
// main.js
function printUser(firstName, lastName, number, street, code, city, country) {
	console.log(`${firstName} ${lastName} lives at ${number}, ${street}, ${code} in ${city}, ${country}`);
}
printUser('John', 'Doe', 48, '998 Primrose Lane', 53718, 'Madison', 'United States of America');
```

우리는 4 크기의 탭 들여 쓰기를 사용하고 있음을 기억하세요!

아래와 같이  프로젝트에 dev-dependency 로 **ESLint** 와 **Prettier** 추가 하여 사용 합니다.

`npm install eslint prettier --save-dev` 

또한 `ESLint recommended rules` 을 추가하기 위해 .eslintrc.json 에 특정 설정을 추가합니다. 또한 ES6 표현식 (예 : 백틱)과 노드 변수 (console.log)를 허용합니다.
이 설정에 몇 가지 custom rule을 추가합니다.

- 두 칸 들여 쓰기(Two spaces indentation)
- 줄은 80자를 초과 할 수 없습니다(max-len: 80)

```text
{
  "extends": ["eslint:recommended"],
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "max-len": ["error", {"code": 80}],
    "indent": ["error", 2]
  } 
}
```

이제 터미널에서 ESLint를 실행합니다.

`npx eslint main.js`

[![에스 린트](https://blog.theodo.com/static/9692405bea9cba760627c64b0e1fefa0/6b427/eslint.png)](https://blog.theodo.com/static/9692405bea9cba760627c64b0e1fefa0/6b427/eslint.png)

ESLint는 `console.log`을 허용하지 않으며 탭 들여 쓰기를 감지합니다. `tab` 대신에 2개의 `space` 를 권장하고  80자를 초과하는 두 줄을 알려줍니다.

이제 ESLint를 `--fix` 옵션과 함께 실행한 뒤 어떻게 되는지 봅시다.

`npx eslint main.js --fix` 

[![엘리트 수정](https://blog.theodo.com/static/f651201843936ab433fd70203a774a6f/5b815/eslint_fix.png)](https://blog.theodo.com/static/f651201843936ab433fd70203a774a6f/5b815/eslint_fix.png)

ESLint는 들여 쓰기 문제를 해결했지만  `max-len` 과 관련된 문제는 해결 하지 못했습니다 .

이제 **prettier**를  실행합시다.  prettier는 기본적으로 `2 space`  들여 쓰기와 `max-lang: 80`  자 길이로 설정 되어 있습니다. ESLint와 동일한 설정 입니다.

`npx prettier main.js --write`

이제 main.js 파일을 살펴 봅니다.

![Imgur](https://i.imgur.com/Xz7r8ch.png)

```js
function printUser(firstName, lastName, number, street, code, city, country) {
	console.log(`${firstName} ${lastName} lives at ${number}, ${street}, ${code} in ${city}, ${country}`);
}
printUser('John', 'Doe', 48, '998 Primrose Lane', 53718, 'Madison', 'United States of America');

```

**Prettier** 는 **ESLint가** 할 수 없었던 max-len rule 을 수정했습니다.  그러나 Prettier는 `code quality` 과 관련된 `console.log`  문에 대해 경고하지 않았습니다 .ESLinst, Prettier 둘은 잘하는 분야가 서로 다릅니다.  `code quality`와 `code formatting`, 모두를 잘 수행하기 위해서는 두 도구를 함깨 사용해야합니다.

EditorConfig와 Prettier에 관한 두 번째 질문에 대해 답하겠습니다. Prettier는  EditorConfig 를 대체 할 수 없습니다. **EditorConfig의 역할은 당신이 사용할 IDE 혹은 에디터의 설정을 덮어써서  당신이 앞으로 쓰게 될 코드가 정해진 형식(Editorconfig 세팅)에 맞게 Formatting 되도록 하는 것 입니다.  Prettier는 이미 작성된 코드를 형식화하도록 편집기를 구성하는 것입니다** .

EditorConfig를 사용하면 Editor 혹은 IDE는 이미 EditorConfig의 Rule에 따라 서식에 관한 세팅이 고정되므로  파일 저장시 파일을 쓸모없이 포맷하는 것을 방지 할 수 있습니다. 그러나 유의해야 할 부분은 Prettier와 EditorConfig가 두 개의 개별 설정 파일에서 설정 반복하지 않고 동일한 규칙을 갖도록하는 것입니다.

## 결론

세 가지 도구를 모두 사용하면 개발 경험이 확실히 향상됩니다. 문제는 도구가 서로 잘 작동하도록 도구를 구성하는 방법입니다.

그러나 우리가 더 깊이 들어가기 전에 당신이 알아 두어야할 점이 있습니다. 저는Prettier를 사용하기 위해 ESLint를 포기한 팀을 보았습니다. 프로젝트를 위해 세 가지 도구를 모두 사용하지 않고 하나만 선택 해야하는 경우 선택은 당신의 몫 입니다. 하지만 명심 하십시요. **Prettier 는 어떤 linting(코드 품질을 위한) 기능을 제공하지 않습니다.** 단지 코드를 Formatting 할 뿐 입니다. 따라서 **Prettier** 사용을 고려하기 전에 **ESLint를 사용을 먼저 고려하는 것이 좋습니다** .

두 가지를 모두 사용하려면 **형식 충돌(Formatting Conflict)** 이 나타날 수 있습니다. ESLint 와 Prettier를 함께 사용할 때, 서로 다르게 코드를 Fortmatting 하도록 설정할 수도 있고, EditorConfig와 Prettier를 함께 사용했을 때, 중복 설정을  할 수도 있습니다. 그렇다면 이러한 도구들을 함께 사용하려면  어떻게 설정해야 할까요? 답은 **[다음 블로그 글](https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/)** 에 작성했습니다.