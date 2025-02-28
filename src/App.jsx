import React from 'react'
import { useDebounce } from 'react-use';
import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { updateSearchCount, getTrendingMovies } from './appwrite.js';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () =>{
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [movieList, setmovieList] = useState([]);
  const [trendingMovies, settrendingMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedsearchTerm, setdebouncedsearchTerm] = useState('');

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
      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
      
    }catch(error) {
      console.error(`Error fetching movies: ${error}`)
      seterrorMessage('Error fetching movies. please try again later')
    } finally {
      setisLoading(false)
    }
  }

  const loadTrendingMovies = async () =>{
    try{
      const movies = await getTrendingMovies();
      settrendingMovies(movies)
    }catch(error){
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  useEffect(() =>{
    fetchmovies(debouncedsearchTerm);
  }, [debouncedsearchTerm])

  useEffect(()=>{
    loadTrendingMovies()
  },[])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </header>
        {trendingMovies.length > 0 && (
          <sectio className='trending'>
              <h2>Trending movies</h2>
              <ul>
                {trendingMovies.map((movie, index)=>(
                  <li key ={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
          </sectio>
        )}
        <section className='all-movies'>
          <h2>All Movies</h2>
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
