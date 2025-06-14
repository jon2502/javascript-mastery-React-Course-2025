import React from 'react'

const MovieCard = ({movie: {
    title, vote_average, poster_path, release_date, original_language, id
},setisMovieID, }) =>{
  return (
    <div className='movie-card'>
        <img src={poster_path ?
            `https://image.tmdb.org/t/p/w500/${poster_path}`: './no-movie.png'}
            alt={title}
            onClick={()=>setisMovieID(id)}
        />
        <div className='mt-4 block'>
            <h3 onClick={()=>setisMovieID(id)}>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="./star.svg" alt="star icon"/>
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>&#x2022;</span>
                <p className='lang'>{original_language}</p>
                <span>&#x2022;</span>
                <p className='year'>
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard