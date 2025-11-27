const express = require('express');
const conn = require('../config/database')

// const mysql = require('mysql2')
// //mysql2 : mysql DataBase 와 연결해서 쿼리문을 실행시킬 수 있는 모듈

// const db_info = {
//     //mysql 주소
//     host : "localhost",
//     user : "root",
//     password : "12345",
//     port : "3306",
//     database : "node_study"
// }
// //mysql DataBase 연결 통로 생성
// const conn = mysql.createConnection(db_info)

const router = express.Router(); //라우터 객체 생성

router.get('/', (req,res)=>{
    //'Hello World'문자열 응답
    res.send('Hello World');
});

router.get('/login', (req,res)=>{
    //request (req)
    console.log(req.query);
    res.send('아이디 : '+req.query.id +', 비밀번호 : '+ req.query.pw);
});

router.post('/login', (req,res)=>{
    console.log(req.body);
    //let inputId = req.body.inputId
    //let inputPw = req.body.inputPw
    let { inputId, inputPw } = req.body;

    //로그인한 회원(조건절 where)의 전체 정보 가져오기(select)
    //let sql = 'select id,nick from member where id=? and pw=?';
    let sql = 'select * from member where id=? and pw=?';

    //                                  err : 오류 정보 / rows : sql문 실행 결과
    conn.query(sql, [inputId, inputPw], (err, rows)=>{

        if(!err){ //조회 성공
            console.log
            console.log(rows); //배열
            if(rows.length > 0){ //로그인 성공
                res.send({
                    result : 1, 
                    nick:rows[0].nick,
                    id : rows[0].id
                });
            }else{ //로그인 실패(없는 회원)
                res.send({result: 0})
            }

        }else{ //조회 실패 (SQL문 실행 실패)
            console.err(err);
            res.status(500).send('로그인 실패');
        }
    });
});

router.post('/join' , (req,res)=>{
    console.log("통신 Test ")
    console.log(req.body)
    let inputId = req.body.inputId
    let inputPw = req.body.inputPw
    let inputNick = req.body.inputNick

    //쿼리문 작성
    let sql = 'insert into member values (?,?,?)';
    
    //쿼리문 실행(연결 통로로 옮겨서 실행)
    conn.query(sql, [inputId, inputPw, inputNick], (err, rows)=>{
        if(!err){
            //성공
            console.log(rows);
            if(rows.affectedRows>0){
                console.log('성공');
                res.send('회원가입 성공') //HTTP 상태코드 : 200(OK)
            }            
        }
        else{
            //실패
            console.error(err)    
            console.log('실패')     
            res.status(500).send('회원가입 실패');   
        }
    })
})

// 회원 전체 리스트 불러오기 (member)
router.get('/list', (req,res)=>{
    let sql = 'select * from member';

    // ? 가 없을 때는 두번째인자[] 를 생략
    conn.query(sql, (err,rows)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.error(err);
            res.status(500).send('회원 목록 조회 실패');
        }
    });
});

//회원 정보 수정
//비밀번호, 닉네임 수정 / 아이디로 식별(조건)
router.patch('/update', (req,res)=>{

    let { id, newPw, newNick } = req.body;

    let sql = 'update member set pw = ?, nick = ? where id = ?';

    conn.query(sql, [newPw, newNick, id], (err, rows)=>{

        if(!err){
            console.log(rows);
            if(rows.affectedRows > 0){
                res.send('회원정보 수정 성공');
            }else{
                res.send('해당 아이디가 없음');
            }

        }else{
            console.error(err);
            res.status(500).send('회원정보 수정 실패');
        }

    });
})

router.post('/update', (req,res)=>{

    let { id, newPw, newNick } = req.body;

    let sql = 'update member set pw = ?, nick = ? where id = ?';

    conn.query(sql, [newPw, newNick, id], (err, rows)=>{

        if(!err){
            console.log(rows);
            if(rows.affectedRows > 0){
                res.send('회원정보 수정 성공');
            }else{
                res.send('해당 아이디가 없음');
            }

        }else{
            console.error(err);
            res.status(500).send('회원정보 수정 실패');
        }

    });
})

//회원 삭제
//누구를 삭제해야하는지 정보(식별자 -> id)만 받으면 됨
router.delete('/delete/:id', (req,res)=>{

    //let {id} = req.params;
    let id = req.params.id;
    let sql = 'delete from member where id = ?';

    conn.query(sql, [id], (err, rows)=>{
        if(!err){
            console.log(rows);
            if(rows.affectedRows > 0){
                res.send('회원 삭제 성공');
            }else{
                res.send('해당 아이디 없음');
            }
        }else{
            console.error(err);
            res.status(500).send('회원 삭제 실패');
        }
    });
}); 

module.exports = router; //라우터 모듈 export (외부(app)에서 사용 가능)