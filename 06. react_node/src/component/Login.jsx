import React from 'react'
import { useRef } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const inputIdRef = useRef();
  const inputPwRef = useRef();

  const nav = useNavigate();

  const tryLogin = () =>{
    let id = inputIdRef.current.value
    let pw = inputPwRef.current.value

    axios.post('http://localhost:3000/login',
      {
        inputId : id,
        inputPw : pw
      })
      .then((res)=>{
        console.log(res)
        if(res.data.result==1){
          //성공
         //storage : 브라우저 저장공간
         window.localStorage.setItem("nick", res.data.nick)
         window.localStorage.setItem("user_id", res.data.id)
         nav('/')
        }
        else{
          //실패
        }

      })


  }
  return (
    <div>
      <h1>Login</h1>
      ID : <input ref={inputIdRef}></input>
      <br></br>
      PW : <input ref={inputPwRef}></input>
      <button onClick={tryLogin}>로그인</button>
    </div>
  )
}

export default Login