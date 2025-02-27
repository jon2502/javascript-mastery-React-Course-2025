import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const Card = ({title}) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  

  useEffect(()=>{
    console.log(`${title} has been liked: ${hasLiked}`)
  }, [hasLiked]);



  return (
  <div className="card" onClick={() => setCount(count + 1)}>
    <h2>{title} <br/> {count || null}</h2>

    <button onClick={()=> setHasLiked(!hasLiked)}>
     {hasLiked ? "Liked" : "Like"}
    </button>
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
