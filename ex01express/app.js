const express = require('express'); //express 코어
const userRouter = require('./router/users'); //users 라우터
const boardRouter = require('./router/boards'); //boards 라우터
//cors : 서로 다른 출처끼리 통할 수 있게 도와줌
const cors = require('cors')
const app = express(); //app 객체 생성 (핵심!)

app.use(cors())

//미들웨어(middleware) : 사용자의 요청(시작)에서 부터 응답(끝) 사이에서 사용되는 도구들
//POST 요청 데이터 -> BODY 데이터 파싱 (extended:true -> Object)
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//기본주소 : http://localhost:3000
//('요청경로', (request,response)=>{요청처리(request),응답처리(response)})
// [GET]http://localhost:3000/
app.use('/', userRouter);
app.use('/boards', boardRouter);

app.listen(3000, ()=>{
    console.log('3000번 포트에서 서버 열림!!')
});