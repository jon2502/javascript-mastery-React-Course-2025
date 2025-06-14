import React from 'react'
import { useDebounce } from 'react-use';
import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import SelectedMovie from './components/SelectedMovie.jsx';

const App = () =>{
  //useState hook allows for the tracking of states in a function component.
  // it includes a the curent state a function for changing the state and a base state that it starts out with
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [movieList, setmovieList] = useState([]);
  const [trendingMovies, settrendingMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isMovieID, setisMovieID] = useState(false)
  const [selectedMovie, setselectedMovie] = useState(false)
  const [debouncedsearchTerm, setdebouncedsearchTerm] = useState('');
 

  useDebounce(() => setdebouncedsearchTerm(searchTerm), 500, [searchTerm])

  const fetchmovies = async (query = "") =>{
    setisLoading(true)
    seterrorMessage('')
    try{
      const endpoint = query
      ? `https://javascript-mastery-react-course-2025.onrender.com/TMDB/Search/${encodeURIComponent(query)}`
      :`https://javascript-mastery-react-course-2025.onrender.com/TMDB`;

      const response = await fetch(endpoint);
      if(!response.ok){
        throw new Error('failed to fetch movies');
      }
      const data = await response.json()
      if(data.Response == 'false'){
        seterrorMessage(data.Error || 'failed to fetch movies')
        setmovieList([])
        return;
      }
      setmovieList(data.results || [])
      /*if(query && data.results.length > 0){
        fetch("https://javascript-mastery-react-course-2025.onrender.com/Appwrite/postSearch",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Title: data.results[0].title,
            MovieID: data.results[0].id,
            Poster: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
          })
        })
        
      }*/
      
    }catch(error) {
      console.error(`Error fetching movies: ${error}`)
      seterrorMessage('Error fetching movies. please try again later')
    } finally {
      setisLoading(false)
    }
  }

  const fetchSpecificMovie = async (isMovieID) =>{
    console.log(isMovieID)
    if(isMovieID){
      try{
        const movie = await fetch(`https://javascript-mastery-react-course-2025.onrender.com/TMDB/Select/${isMovieID}`)
        const data = await movie.json()
        console.log(data)
        setselectedMovie(data)
      }catch(error){
        console.error(`Error fetching movies: ${error}`)
        seterrorMessage('Error fetching movies. please try again later')
      }
    }
  }

  const loadTrendingMovies = async () =>{
    try{
      const movies = await fetch("https://javascript-mastery-react-course-2025.onrender.com/Appwrite/popularMovies")
      const data = await movies.json()
      settrendingMovies(data.results)
    }catch(error){
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  useEffect(() =>{
    fetchmovies(debouncedsearchTerm);
  }, [debouncedsearchTerm])

  useEffect(()=>{
    fetchSpecificMovie(isMovieID);
  },[isMovieID])

  useEffect(()=>{
    loadTrendingMovies()
  },[])

  return (
    <main>
      <div className='pattern'/>
      {isMovieID ? (
        <SelectedMovie isMovieID={isMovieID} setisMovieID={setisMovieID} Movie={selectedMovie}/>
      ):
        <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </header>
        {trendingMovies.length > 0 && (
          <section className='trending'>
              <h2>Trending movies</h2>
              <ul>
                {trendingMovies.map((movie, index)=>(
                  <li key ={movie.movie_ID}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_URL} alt={movie.Title} />
                  </li>
                ))}
              </ul>
          </section>
        )}
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ): errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) =>(
                <MovieCard key={movie.id} movie={movie} setisMovieID={setisMovieID}/>
              ))}
            </ul>
          )}
        </section>
      </div>}
    </main>
  )
}

export default App
