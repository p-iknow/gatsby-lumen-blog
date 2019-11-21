## TODO

### Front

#### Components/PostCard 리트윗 버튼

- [ ] onRetweet 함수 
  - [ ] 로그인 한 사람만 할 수 있도록 분기 처리
  - [ ] dipatch 요청
- [ ] 리트윗한 게시물을 보여주는 컴포넌트 

#### Saga

- [ ] Retweet

#### Reduce

- [ ] Retweet
  - [ ] post 내용의 앞에 데이터 추가

### Backend

- [ ] POST api/post/:id/retweet

  - [ ] 먼저 해당 게시글이 있는지 분기 처리 
  - [ ] 게시글의 작성자가 자신의 아이디인 경우 리트윗 할 수 없도록 함 
  - [ ] 리트윗을 이미 한 게시물을 다시 리트윗 할 때는 리트윗을 다시 할 수 없도록 함 
  - [ ] 리트윗 게시물 만들기(Sequelize.create)
  - [ ] 

- [ ] POST 게시글이 있는지 확인하는 미들웨어로 중복 제거 

  

  