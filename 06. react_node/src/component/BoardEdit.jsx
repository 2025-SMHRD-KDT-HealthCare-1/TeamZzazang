import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BoardEdit = () => {
    const titleRef = useRef();
    const contentRef=useRef();
    const nav = useNavigate();

    const btnEdit = ()=>{
            
        axios.post('http://localhost:3000/boards/boardedit',
            {
                title : titleRef.current.value,
                content : contentRef.current.value,
                user_id : window.localStorage.getItem('user_id')
            })
        .then((res)=>{
            if(res.data==1){
                alert('작성 성공')
                nav('/board')
            }
            else{
                alert('작성 실패')
            }
        })

    }
  return (
    <div>
        <h1>블로그 게시물 작성페이지</h1>
        제목 : <input ref={titleRef}></input>
        <br></br>
        <br></br>
        <textarea ref={contentRef} cols={30} rows={5}></textarea>
        <br></br>
        <button onClick={btnEdit}>작성완료</button>
    </div>
  )
}

export default BoardEdit