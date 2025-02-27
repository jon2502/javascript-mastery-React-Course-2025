import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  return (
  <div className="card">
    <h2>{title}</h2>
  </div>
  )
}

const App = () => {
  return (
    <div className='card-container'>
      <Card title="Godzilla"/>
      <Card title="Pacific rim"/>
      <Card title="Gamera"/>
    </div>

  )
}

export default App
