닉네임 수정하기 기능

# TODO

## Front 

### Component

닉네임 Form 의 경우 input 의 state 가 빈번하게 변경되기 때문에 분리하는게 좋다

- [ ] onEditNickname 함수 

### Saga

- [ ] EDIT_NICKNAME_REQUEST 

### Reducer 

- [ ] EDIT_NICKNAME_REQUEST
  - [ ] isEditing 상태를 통해 로딩 표시 

## Back

전체를 다 수정해야 하는 경우는 put 부분적으로 수정이면 patch 를 사용 

- [ ] PATCH /user/nickname
- [ ] 