---
title: JS 자료구조, 링크드리스트(Linked List)
date: '2019-06-05T11:46:37.121Z'
template: 'post'
draft: True
slug: 'adt/linked-list/'
category: 'ADT'
tags:
	- 'js'
  	- 'ADT'
  	- '자료구조'
description: 'linked list를 자바스크립트로 구현해 보자'
---



## Linked List란?

- 일련의 원소를 배열처럼 차례대로 저장하지만, 원소들이 메모리상에 연속적으로 위치하지 않는다는 점이 다름

  - 각 원소는 자신과 다음 원소를 가리키는 참조 정보(pointer or link)가 포함된, node 로 구성됨 

  ![Image result for linked list](assets/474px-CPT-LinkedLists-addingnode.svg.png)

- element 추가/삭제 시 다른 원소들을 이동하지 않아도 된다는 점에서 배열에 비해 장점을 가짐
- 배열이 특정 원소에 바로 접근할 수 있는 반면 링크드 리스트의 경우 원소를 찾을 때까지 처음(Head) 부터 루프를 반복해서 찾아야 한다. 
- 결과적으로 수정 및 삭제의 경우 linked list 가 유리하지만, 조회에서는 배열이 유리하다. 

## Linked List 만들기 

우선 구현에 필요한 핵심코드를 간단히 살펴보자

```js
class Node {         // [1]
  constructor(element) { 
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;   // [2]
    this.head = null;  // [3]
  }

  append(element){}
  insert(postion, element){}
  removeAt(postion){}
  remove(element){}
  indexOf(elemnt){}
  isEmpty(){}
  size(){}
  toString(){}
  print(){} 
}
```

링크드 리스트는 우선적으로 Node 라는 헬퍼 클래스가 필요하다([1]). 노드 클래스 내부에 선언된 변수 element property에 값이 담기고 , next 프로퍼티는 현재 노드의 다음을 가리키는 포인터가 담기게 된다. length 변수는 내부의 private property로, 링크드 리스트가 가진 원소의 갯수를 표현한다. head 또한 private property 로, 연결이 시작되는 지점을 참조하고 있다(시작점의 노드를 가르키는 포인터). 다음은 LinkedList 클래스에서 필요한 메소드에 대한 설명이다.

- `append (원소)` :  리스트의 맨 끝에 원소를 추가한다.

- `insert (위치, 원소)` : 해당 위치에 원소를 삽입한다.
- `remove(원소)` : 원소를 삭제한다.
- `index(원소)` : 해당 원소의 인덱스를 반환한다. 존재하지 않을 경우 결과 값은 `null` 이다.    
  - 

