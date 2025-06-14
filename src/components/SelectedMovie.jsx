import React from 'react'

const SelectedMovie =({isMovieID, setisMovieID, Movie}) => {
    console.log(Movie)
    return (
        <div className='wrapper'>
            <h1 className='text-white'>SelectedMovie</h1>
            <button className='text-white' onClick={()=>setisMovieID(false)}>back</button>
            <p className='text-white'>{isMovieID}</p>
            <div>
                <img src={Movie.poster_path ?
                `https://image.tmdb.org/t/p/w500/${Movie.poster_path}`: './no-movie.png'}
                alt={Movie.title}/>
                <div>
                    <h2>{Movie.title}</h2>
                </div>
            </div>
            
        </div>
    )
}

export default SelectedMovie