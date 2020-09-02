---
title: codecov, Patch Stauts 알아보기(feat. 오프슨소 pull request 상황)
date: '2020-03-15T23:46:37.121Z'
template: 'post'
draft: True
slug: '/unix/command/create-mulitple-file-using-touch-and-mkdir'
category: 'Unix Command'
tags:
  - 'Unix'
  - 'Linux'
  - 'Command'
****
description: '리엑트로 서비스를 운영할 때 api 에서 전달되는 텍스트가 길어서 특정 부분에 개행을 해야하는 경우가 있다. api 로 전달되는 텍스트 이기에 텍스트 중간에 `<br/>` 태그 등의 강제 개행 태그를 추가할 수도 없다. 이럴때 어떻게 해야할까? html-react-parser를 활용하면 이를 해결할 수 있다.'
---

![codecov](https://imgur.com/5qg9kD5.png)


## 들어가며 
현재 오픈소스 컨트리뷰톤 프로젝트 중 [dooboo-ui](https://github.com/dooboolab/dooboo-ui)에 참여 하고 있다. 오픈소스 어린양인 나는 열심히 PR 주제를 찾아 헤멨다. 버그를 찾았고, 고생 끝에 버그를 해결했다. 컨트리뷰션 가이드에 따라 테스트를 돌렸다. 문제 없이 테스트를 통과했다. 이제 드디어 [첫 bug-fix PR!!](https://github.com/dooboolab/dooboo-ui/pull/303) 두근.. 두근.. 뿌듯한 마음으로 PR을 날렸다. 그런데 결과는 삐빅.. Some checks were not successful!!
![codecov](https://imgur.com/amjx79F.png)
당황스러웠지만 정신을 차리고, 무엇이 문제인지 생각해보았다. codecov 는 테스트 커러리지를 측정하는 도구일꺼고 50% 는 내 코드의 커버리지를 뜻하는 것이지 않을까? 생각을 해보니 나름의 추론이 생겼다. 그러나 왜 저런 수치가 나왔고, 그래서 나는 어떤 액션을 취해야 하는 알 수가 없었다. [codecov 문서](https://docs.codecov.io/docs/commit-status#branches)를 참고했고, 문제를 해결해 나가는 과정을 정리했다. 

## project vs patch ??
일단 codecov/project는 80.43% 로 통과인데, codecov/patch 는 50% 로 target 80.18% 에 못 미쳐서 실패했다. project 는 뭐고, patch 는 뭘까? 무슨 차이일까?  

### codecov/project
> The codecov/project status measures overall project coverage and compares it against the base of the pull request or parent commit.

문서에 따르면 codecov/project는 전체 프로젝트 커버리지를 측정하여 pull request 또는 내가 작성한 커밋의 부모커밋(베이스 커밋)과 비교한다. 그러니까 전체 프로젝트에 대한 테스트 커버리지를 뜻하는 거다.

### codecov/patch
> The codecov/patch status only measures lines adjusted in the pull request or single commit, if the commit is not in a pull request. This status provides an indication on how well the pull request is tested.

pull request 에서 수정된(adjusted) 라인, pull request 가 아닌 경우에는 단일 커밋에서 수정된(adjusted) 라인의 커버리지를 평가한다. 즉 해당 pull request 혹은 단일 커밋에서 수정된 부분만을 가지고 coverage 를 측정한다는 뜻이다. 

예시를 들어보면 다음과 같다. (아래는 파이썬 코드 예시다.)
```py
def divide(x, y):
+     if y <= 0:
+         raise ValueError("y must be greater than 0")
      return x / y
```
만약 pull request 혹은 단일 commit 에서 위와 같이 `divide` 함수를 추가한다면, codecov/patch state 를 평가할 때 추가된 라인에 대해서만 커버리지를 측정한다. 위 코드를 추가하며 어떠한 테스트도 작성하지 않았다. 그러므로 위 pull request or commit 에 대한 커버리지는 0% 이다. 

자 이제 위 `divide` 함수의 테스트 코드를 작성해서 pull request를 날렸다고 가정해보자. 
```py
+ def test_divide_by_1(self):
+     assert divide(10, 1) == 10
```
`codecov/patch` state의 결과는 50% 일 것이다. 왜 그럴까? 해당 코드 안에서 0을 기준으로 분기처리(`if y <= 0:`)를 하는데 우리가 작성한 테스트 코드는 `y > 0` 인 케이스(y는 1이다, `1 > 0` 이다)만 테스트 하고 있기 때문이다.  정리하면 이렇다. `if` 로직은 2가지 case를 가지고, 2가지 case 중 1가지 case에 대한 테스트 코드만 작성했기 때문에 해당 pull request 의 커버리지는 50%가 된다. 

자 이제 나머지 50% 를 채우기 위해 나머지 케이스에 대한 테스트 코드를 추가해보자. 
```py
def test_divide_by_1(self):
     assert divide(10, 1) == 10

+ def test_divide_by_zero(self):
+     with self.assertRaises(ValueError)
+         divide(1, 0)
+
```
2가지 case 에 대한 테스트 코드가 작성됬고, 해당 pull request 에 대한 codecov/patch status 는 100% 가 될 것이다. 이제야 `codecov/project`, `codecov/patch` 에 대한 이해가 됐다. 이것을 바탕으로 내 pull request 를 분석해보자. 

## 내 pull request 에 위에서 배운 개념 적용해보기 
codecov 가 제공하는 리포트에서 git diff 내역을 살펴보면 아래와 같다.
![dooboo-ui-pull-request](https://imgur.com/MsF4fQm.png)

`onLayout` 콜백에서 `sliderRef`의 사이즈를 측정하고, `state`를 세팅하는 코드를 지우고, 매 렌더링 마다 `sliderRef.current` 값의 여부를 검사한 뒤 해당 값이 falsy(null, undefined, etc)한 값이 아니면 사이즈를 측정(`sliderRef.current.measure`) 하고, state를 세팅(`setSliderPositionX(pageX);`, `setSliderWidth(width);`) 하는 코드다. 

현재 내 코드의 `codecov/patch` state는 50% 이다. **띠옹!?** 나는 내 코드에 대한 테스트코드를 하나도 작성하지 않았는데 왜 50% 커버리지가 됬을까? 차근 차근 생각해보자. 일단 내 코드 변경은 위에서 처럼 다룬 예제처럼 새로운 함수를 추가한 코드가 아니다. 나는 이미 존재하고 있는 함수  내부에 `if 문`을 추가했을 뿐이다. (위 이미지에서 보이지 않지만 해당 if문은 아래 작성한 코드에서 볼 수 있듯이 Slider 컴포넌트 함수 내부에 작성되었다)
```js
const Slider: FC<Props> = ({}) => {
	...
	if (sliderRef.current) {
    sliderRef.current.measure((x, y, width, height, pageX) => {
      setSliderPositionX(pageX);
      setSliderWidth(width);
    });
  }
	return ...
}
```
만약 Slider 함수에 대한 테스트가 사전에 작성되어 있다면  `sliderRef.current` 가 `falsy` 한 경우(`sliderRef.current == false`)에 대한 테스트가 작성되었음을 의미한다. 왜냐하면 `sliderRef.current` 는 default 로는 `falsy` 일 것이기 때문이다. 그래서 위 이미지에서도 내가 테스트하지 않은 부분(`sliderRef.current == true`) 만 붉은 색으로 처리하고 나머지 부분을 초록색으로 처리했을 것이다.

![test-code](https://imgur.com/LSgLXre.png)

위 코드를 보면 실제로 Slider 함수의 렌더에 대한 테스트 코드가 사전에 작성되어 있었다. 그렇다면 이제 내가 테스트 하지 않는 부분 (`sliderRef.current == true`)에 대한 테스트를 작성하면 테스트 커버리지가 100%가 될 것이다. 해당 부분의 테스트를 작성해보자. 

## 코드커버리지를 50%를 추가하기 위한 테스트 작성하기 
어랏, 근데 나는 리엑트 테스트를 한번도 작성해본 적이 없다. 어떻게 해야하나? 생각 생각 생각을 해보자. 일단 내가 테스트 해야하는 것을 정리해보자. 
- Slider 컴포넌트가 실행되었을 때 `sliderRef.current` 를 `truty` 하게 만든다 
- `sliderRef.current == true` 일때 `setSliderPositionX` 와 `setSliderWidth` 함수가 실행됬는지 확인한다. 
