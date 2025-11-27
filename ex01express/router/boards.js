const express = require('express');

const router = express.Router();

const conn = require('../config/database')

// router.get('/:idx', (req,res)=>{
//     console.log(req.params);
//     res.send(req.params.idx + '번 게시물 조회 페이지')
// });

router.get('/delete', (req,res)=>{
    
    console.log(req.query)
    
    let sql = 'delete from board where board_num=?'

    conn.query(sql,[req.query.delNum],(err,rows)=>{
        if(!err){
            if(rows.affectedRows>0){
                res.send(1)
            }
        }
        else{
             res.send(0)
        }
    })
})

//http://localhost:3000/boards/board
router.get('/board',(req,res)=>{

    let sql = "select * from board";

    conn.query(sql, (err,rows)=>{
        if(!err){
            //쿼리문 정상실행--> 데이터를 가지고 왔다
            console.log(rows.length>0)
            if(rows.length>0){
                res.send(rows)
            }
        }
        else{
            //쿼리문 실행x
        }
    })
})


//
router.post('/boardedit', (req,res)=>{
    const {title, content, user_id} = req.body

    let sql = "insert into board(title,content,user_id) values(?, ?, ?)";

    conn.query(sql, [title, content,user_id], (err, rows)=>{
        if(!err){
            if(rows.affectedRows>0){
                res.send(1)
            }
            else{
                res.send(0)
            }
        }
        else{
            res.send(0)
        }
    })



})


module.exports = router;