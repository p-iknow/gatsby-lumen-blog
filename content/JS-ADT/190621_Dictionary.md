---
title: JS Dictionary 직접 구현하기 
date: '2019-06-19T23:46:37.121Z'
template: 'post'
draft: false
slug: 'data-structure/hash-and-dictionary'
category: 'Data Structure'
tags:
  - '자료구조'
  - 'ADT'
description: '자바스크립트 Dictionary 자료형을 직접 구현했다'
---

## 들어가며 

- Dictionary 와 Hash 자료구조는 유일한 값(반복되지 않는 값)을 저장하기 위한 자료 구조다.
- Dictionary(or Map)은 값을 `{key: value}` 형태로 저장한다. 

## Dictionary(Map)

- Dictionary(or Map)은 값을 `{key: value}` 형태로 저장하는 자료구조로`key` 는 원소를 찾기 위한 식별자(identifier)
- `Set`이 `[key, key]` , `Dictionary` 가 `[key, value]` 형태의 원소를 모아놓은 공간이라는 점에서 두 자료 구조는 비슷함 

## Dictionary(Map) 만들기 

```js
const defaultToString = item => {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  
  keyValues() {
    return Object.values(this.table);
  }
  
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
```

### Dictionary Class 구현에 필요한 메소드

- `set(key, value)` : Dictionary에 원소를 추가한다
- `remove(key)`:  `key` 에 해당하는 원소를 삭제한다.
- `has(key)`: `key`에 해당하는 원소가 딕셔너리에 존재하면 `ture`를, 그렇지 않으면 `fasle`를 반환한다. 
- `get(key)`: `key`에 해당하는 원소의 값을 반환한다.
- `clear()`: 모든 원소를 삭제 한다. 

- `size()`: 원소 개수를 반환한다. 배열의 lenght 프로퍼티와 비슷하다.
- `keys()`: `dictionary`의 모든 `key`를 `Array`로 반환한다.
- `values()`: `dictionary`의 모든 값을 `Array` 로 반환한다. 

### Dictionary Class Test

```js
onst dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf')); // true
console.log(dictionary.size()); // 3

console.log(dictionary.keys()); // ["Gandalf", "John", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get('Tyrion')); // tyrion@email.com

dictionary.remove('John');

console.log(dictionary.keys()); // ["Gandalf", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "tyrion@email.com"]

console.log(dictionary.keyValues()); // [{key: "Gandalf", value: "gandalf@email.com"}, {key: "Tyrion", value: "tyrion@email.com"}]
console.log(dictionary.toString()); // [#Gandalf: gandalf@email.com],[#Tyrion: tyrion@email.com]

dictionary.forEach((k, v) => {
  console.log('forEach: ', `key: ${k}, value: ${v}`);
});
// forEach:  key: Gandalf, value: gandalf@email.com
// forEach:  key: Tyrion, value: tyrion@email.com
```

