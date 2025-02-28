import React from 'react'
import { useDebounce } from 'react-use';
import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_ACCESS_TOKEN;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () =>{
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null)
  const [movieList, setmovieList] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [debouncedsearchTerm, setdebouncedsearchTerm] = useState('')

  useDebounce(() => setdebouncedsearchTerm(searchTerm), 500, [searchTerm])

  const fetchmovies = async (query = "") =>{
    setisLoading(true)
    seterrorMessage('')
    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error('failed to fetch movies');
      }
      const data = await response.json()
      console.log(data)
      if(data.Response == 'false'){
        seterrorMessage(data.Error || 'failed to fetch movies')
        setmovieList([])
        return;
      }
      setmovieList(data.results || [])
    }catch(error) {
      console.error(`Error fetching movies: ${error}`)
      seterrorMessage('Error fetching movies. please try again later')
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() =>{
    fetchmovies(debouncedsearchTerm);
  }, [debouncedsearchTerm])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ): errorMessage ? (
            <p className='text-red500'>{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) =>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App
