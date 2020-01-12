## 관련 Codepen 정리 

<p class="codepen" data-height="1000" data-theme-id="default" data-default-tab="html,result" data-user="godotwait" data-slug-hash="NWPMJKE" style="height: 1000px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Speech Bubble">
  <span>See the Pen <a href="https://codepen.io/godotwait/pen/NWPMJKE">
  Speech Bubble</a> by godotwait (<a href="https://codepen.io/godotwait">@godotwait</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

- https://codepen.io/godotwait/pen/NWPMJKE

## Speech Bubble 에서 꼭지(triangle) 그리는 법 

- speech bubble 의 div 의 position을 relative 로 설정한다. (`:after`,  `:before`  영역의 기준점을 speech bubble 박스로 하기 위함이다.)
- `:before` 선택자에 `position: absolute` 속성을 설정한다. 이때 기준은 `div.speech-bubble` 이다. 
- `:before` 선택자에 `border: <pixel> solid ` , `border-color: color(top), transperent(right) transparent(bottom) transparent(left)` 로 triangle을 그린다. 
- 삼각형이 그려지는 원리를 이해하기 위해서는 widht, height 가 0 인 상태에서 boder값이 있는 경우 어떤 모양을 취하는지 알아야 한다. 어떤 형태를 띄는지는 위 codepen에서 확인할 수 있다.
- `top, left  ` 속성을 활용해 꼭지(triangle)의 위치를 정한다.

## :after, :before 선택자 내부에서 %

- `div:after`, `div:before`​ 의 경우 div의 width(left, right), height(top, bottom)가 %의 기준이 됨

## Speech Bubble Box에 border 가 있는 경우 

- `:before` 선택자를 통해 `triangle` 을 그린 뒤 `:after` 선택자로 더 작은 triangle 을 그려서 `:before` triangle을 덮어써서 구현할 수 있다. 이때 `:after` triangle 의 높이는 `:before` triangle 크기 보다 작아야 border보다 작아햐 한다.  