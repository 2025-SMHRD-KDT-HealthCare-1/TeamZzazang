import React from 'react'
import {useSearchParams} from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Home {window.localStorage.getItem('nick')}님 환영합니다</h1>

    </div>
  )
}

export default Home