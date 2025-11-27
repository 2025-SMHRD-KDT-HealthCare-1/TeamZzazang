import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home'
import Login from './component/Login'
import Join from './component/Join'

import { Route,Routes, BrowserRouter } from 'react-router-dom'
import Board from './component/Board'
import BoardEdit from './component/BoardEdit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/join' element={<Join></Join>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/board' element={<Board></Board>}></Route>
          <Route path='/boardedit' element={<BoardEdit></BoardEdit>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
