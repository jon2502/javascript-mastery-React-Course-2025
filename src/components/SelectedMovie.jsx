import React from 'react'

//<span>{Movie.genres.map((genre)=>(<a>{genre.name}</a>))}</span> 
const SelectedMovie =({isMovieID, setisMovieID, Movie, setselectedMovie}) => {
    console.log(Movie)
    return (
        <div className='wrapper'>
            <h1 className='text-white'>SelectedMovie</h1>
            <button className='text-white' onClick={()=>{
                setisMovieID(false) 
                setselectedMovie(false)
                }}>back</button>
            <p className='text-white'>{isMovieID}</p>
            <div className="bg-cover bg-no-repeat"
            style={
                {backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${Movie.backdrop_path})`}
            }>
                <img src={Movie.poster_path ?
                `https://image.tmdb.org/t/p/w500/${Movie.poster_path}`: './no-movie.png'}
                alt={Movie.title}/>
                <div>
                    <h2>{Movie.title} ({Movie.release_date ? Movie.release_date.split('-')[0] : 'N/A'})</h2>
                    <p>{Movie.release_date} ({Movie.origin_country[0]})</p>
                </div>
            </div>
        </div>
    )
}

export default SelectedMovie