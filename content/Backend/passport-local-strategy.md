---
title: passport, localStrategy의 동작에 대해 이해하기
date: '2019-11-07T23:46:37.121Z'
template: 'post'
draft: false
slug: 'backend/node/passport-local-strategy'
category: 'node'
tags:
  - 'node'
  - 'passport'

description: 'passport는 한마디로 인증을 편하게 관리하기 위한 패키지이다.  passport 가 실제로  하는 일은 session 객체 내부에 passport 프로퍼티를 만들고, 값으로 쿠키와 식별자를 매칭해서 저장한다(serialize). 이후 매 요청시에 세션에 저장된 식별자를 이용해 유저의 데이터를 찾아 express 라우터 콜백함수의 request.user 에 해당 데이터를 저장한다(deserialize).'
---

## 들어가며

프론트 개발을 공부하다 처음으로 백엔드 코드를 작성하기 시작했다. 로그인을 구현하기 위해 passport 를 사용하는데 코드가 어렵고 이해되지 않는 부분이 많았다. 필자 처럼 혼돈을 겪을 사람들을 위해 아래에 passport local 전략에 대해 정리했다. 

## pssport 의 역할 

passport는 한마디로 인증을 편하게 관리하기 위한 패키지이다.  passport 가 실제로  하는 일은 `session` 객체 내부에 `passport` 프로퍼티를 만들고, 값으로 쿠키와 식별자를 매칭해서 저장한다(serialize). 이후 매 요청시에 세션에 저장된 식별자를 이용해 유저의 데이터를 찾아 express 라우터 콜백함수의 request.user 에 해당 데이터를 저장한다(deserialize).    

https://velog.io/@ground4ekd/nodejs-passport 참고 

## passport localStrategy 실행순서 

![image](https://user-images.githubusercontent.com/35516239/68285677-0f16da00-00c3-11ea-93ae-2fbf735296fa.png)

실행순서를 정리하면 다음과 같다.  login 을 담당하는 라우터의 콜백함수에 의해 `passport.authenticate()` 메소드가 실행된다. 해당 메소드를 통해 `LocalStrategy`  생성자에 전달된 callback 함수가 실행되고, 그 후에  `passport.serializeUser()`  가 실행된다. 해당 메소드 실행시 `session` 객체 내부` passport` 프로퍼티에 cookie 와 식별자를 매칭시켜 보관하고, 추후 매 요청시 마다 `passport.deserializeUser()` 가 실행되어 session 객체에 저장된 식별자를 통해 user에 대한 데이터를 찾아 req.user에 넣어준다.

자세한 로직은 아래 코드로 설명한다.([예제코드 깃헙](https://github.com/P-iknow/sns/tree/passport-study-log/back))

router 에서 `passport.authenticate(local, callback)` 실행된다.

```js
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

router.post('/login', (req, res, next) => {

  // 이 부분 실행
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      console.dir(fillteredUser);
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});
```
strategy callback 실행되고 `done(err, user, info)` 함수에 전달된 인자들이  `passpor.authenticate('local' (err, user, info) => {...})` 의 인자로 전달됨, 단  [passport.authenticate 의 인자로 custom callback](http://www.passportjs.org/docs/authenticate/)을 사용할 경우에만 이를 확인 가능하고, 나머지의 경우 passport.authenticate 함수가 실행될 때 자동으로 `req.login(user, callback)`[req.login 공식문서](http://www.passportjs.org/docs/login/) 을 실행시켜 `serealizeUser(user, done) => {...}` 의 인자로 전달된다  )

```js
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      /*  
      { 
        userId: ...,
        password: ... 
      }
      */
      {
        usernameField: 'userId',
        passwordField: 'passowrd'
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userId }
          });
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 사용자입니다!' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀립니다.' });
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );
};

```
- `pssport.authenticate` 의 콜백 `(err, user, info) => {...}` 이 실행되며, callback 내부의 `req.login(user, loginErr => {...})` 실행, 현재는 위에서 언급했던 authenticate의 custom callback을 활용하기 때문에 
```js
router.post('/login', (req, res, next) => {
  // POST /api/user/login
  passport.authenticate('local', (err, user, info) => {  // 이 부분 실행
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
   // req.login 실행
    return req.login(user, loginErr => {  
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      console.dir(fillteredUser);
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});
```
- req.login 의 실행으로  sequalizeUser((user, done )=> {...}) 의 인자로 전달된 callback 이 실행되며  
```js
const passport = require('passport');
const db = require('../models');
const local = require('./local');

passport.serializeUser((user, done) => { // 이 부분 실행 
    return done(null, user.id);
  });
```
- `done(null, user.id)` 의 결과로 아래의 세션 객체가 생성된다. 
```json
{
  "cookie": {
    "originalMaxAge": null,
    "expires": null,
    "secure": false,
    "httpOnly": true,
    "path": "/"
  },
  "passport": { "user": 2 },
  "__lastAccess": 1573025918607
}

```
`passport.serializeUser` 의 callback 함수의 done 이 실행되고 난 뒤에는 `req.login( user, (loginErr) => {..}) `에 인자로 전달된 callback 함수가 실행되고 해당 함수 내부에서 res.json(fillteredUser) 을 통해  프론트에 필요한 정보를 전달하고 서버의 로직이 종료된다. 

```js
router.post('/login', (req, res, next) => {
  console.log('라우터 시작 ');
  // POST /api/user/login
  passport.authenticate('local', (err, user, info) => {
    console.log('passport.authenticalte callback ');
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => { // 이 부분 callback 실행 
      console.log('req.login callback');
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});
```
- 이후 매 요청시에 `passport.deserializeUser` 메소드가 실행되는데 이 때 callback 함수의 첫번째 인자로 전달되는 id 값은 `passport.serializeUser` 의 callback 함수의 내부에서 실행된 `done(null, userId)` 의 두번째로 전달된 userId 값이다. (내부적으로는 session 객체 내부의 passport 프로퍼티에서 읽어온 것이다.) , deserializeUser 의 callback 함수는 전달된 식별자 값인 id 를 통해 user 정보를 조회하고 이를 req.user(request 객체의 user property) 에 저장해 준다.

```js
const passport = require('passport');
const db = require('../models');
const local = require('./local');

passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id }
      });
      return done(null, user); // 이 때 req.user에 유저 정보 저장
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
```