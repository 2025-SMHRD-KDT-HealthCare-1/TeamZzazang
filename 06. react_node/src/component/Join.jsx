import React from 'react'
import axios from 'axios'
import { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
const Join = () => {
    const inputId = useRef();
    const inputPw = useRef();
    const inputNick = useRef();

    const nav = useNavigate();
    const tryJoin = () => {
        //1. 사용자가 입력한 ID, PW, Nick 가지고 오기
        //2. 가지고온 값을 Node로 넘기기
        // http://localhost:3000/join --> 비동기 통신방법(axios , fetch)
        axios.post('http://localhost:3000/join',{
            inputId : inputId.current.value,
            inputPw : inputPw.current.value,
            inputNick : inputNick.current.value
        })
        .then((res)=>{
            console.log(res)
            alert(res.data)
            window.localStorage.setItem("test",res.data)
            nav('/login')
            //Login 컴포넌트로 이동!
            //
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
        <h1>Join</h1>
        ID : <input ref={inputId}></input>
        <br></br>
        PW : <input ref={inputPw}></input>
        <br></br>
        Nick : <input ref={inputNick}></input>
        <br></br>
        <button onClick={tryJoin}>회원가입</button>
    </div>
  )
}

export default Join