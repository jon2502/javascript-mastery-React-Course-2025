import React from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react'

const App = () =>{
  const [searchTerm, setsearchTerm] = useState('')


  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy Without the Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
      </div>
    </main>
  )
}

export default App
