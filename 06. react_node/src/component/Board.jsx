import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Board = () => {
  const [boardList, setBoardList] = useState([])
  const delInputRef = useRef()
  //맨처음(사용자에게 보여졌을때)
  //state 값이 바뀔때
  useEffect(()=>{
    //게시물 데이터를 가지고오기
    //http://localhost:3000/boards/board
    axios.get('http://localhost:3000/boards/board')
    .then((res)=>{
      console.log(res)
      setBoardList(res.data)
    })

  },[])


  const delList = () =>{
   
    axios.get('http://localhost:3000/boards/delete?delNum='
      +delInputRef.current.value)
    .then((res)=>{
      if(res.data==1){
        alert('삭제성공')
        //주소값에 따른 새로고침
        window.location.href='/board'
      }
      else{
        alert('삭제실패')
      }
    })
  }
  return (
    <div>
        <h1>Board Blog</h1>

        <table border={1}>
          <tr>
            <td>게시물 번호</td>
            <td>제목</td>
            <td>작성자</td>
          </tr>
          {boardList.map((item)=>
             <tr>
                <td>{item.board_num}</td>
                <td>{item.title}</td>
                <td>{item.user_id}</td>
             </tr>
          )}
        </table>
        <hr></hr>
        삭제할 번호 입력 : <input ref={delInputRef}></input>
        <button onClick={delList}>삭제</button>
    </div>
  )
}

export default Board;
