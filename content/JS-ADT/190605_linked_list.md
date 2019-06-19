---
title: Linked List JS
date: '2019-06-05T23:46:37.121Z'
template: 'post'
draft: True
slug: 'data-structure/linked-list/'
category: 'Data Structure'
tags:
  - '자료구조'
  - 'ADT'
description: '자바스크립트로 linked list 를 구현해보자'
---



## Linked List란?

- 일련의 원소를 배열처럼 차례대로 저장하지만, 원소들이 메모리상에 연속적으로 위치하지 않는다는 점이 다름

  - 각 원소는 자신과 다음 원소를 가리키는 참조 정보(pointer or link)가 포함된, node 로 구성됨 

  ![Image result for linked list](assets/474px-CPT-LinkedLists-addingnode.svg.png)

- element 추가/삭제 시 다른 원소들을 이동하지 않아도 된다는 점에서 배열에 비해 장점을 가짐
- 배열이 특정 원소에 바로 접근할 수 있는 반면 링크드 리스트의 경우 원소를 찾을 때까지 처음(Head) 부터 루프를 반복해서 찾아야 한다. 
- 결과적으로 수정 및 삭제의 경우 linked list 가 유리하지만, 조회에서는 배열이 유리하다. 

## Linked List 만들기 

우선 구현에 필요한 핵심코드를 간단히 살펴보자

```js
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
  
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }
  
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }
  
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  
  isEmpty() {
    return this.size() === 0;
  }
  
  size() {
    return this.count;
  }
  
  getHead() {
    return this.head;
  }
  
  clear() {
    this.head = undefined;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```

- 링크드 리스트는 우선적으로 Node 라는 헬퍼 클래스가 필요하다. 
- 노드 클래스 내부에 선언된 변수 element property에 값이 담기고 , next 프로퍼티는 현재 노드의 다음을 가리키는 포인터가 담기게 된다. 
- length 변수는 내부의 private property로, 링크드 리스트가 가진 원소의 갯수를 표현한다. 
- head 또한 private property 로, 연결이 시작되는 지점을 참조하고 있다(시작점의 노드를 가르키는 포인터). 
- 다음은 LinkedList 클래스에서 필요한 메소드에 대한 설명이다.
  - `append (원소)` :  리스트의 맨 끝에 원소를 추가한다.
  - `insert (위치, 원소)` : 해당 위치에 원소를 삽입한다.
  - `remove(원소)` : 원소를 삭제한다.
  - `indexOF(원소)` : 해당 원소의 인덱스를 반환한다. 존재하지 않을 경우 결과 값은 `-1` 이다.    
  - `removeAt()` 원소가 하나도 없다면 `true` 를, 그 외엔 `false` 를 반환한다.
  - `size()` : 원소 개수를 반환한다. 배열의 length 프로퍼티와 비슷하다.
  - `toString()` : 연결 리스트는 원소를 Node에 담아두기 때문에 원소의 값만을 출력하려면 자바스크립트 기본 객체로 부터 상속한 `toString` 메소드를 재정의 해야한다.

