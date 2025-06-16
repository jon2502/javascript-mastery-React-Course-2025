import React from 'react'

//<span>{Movie.genres.map((genre)=>(<a>{genre.name}</a>))}</span> 
const SelectedMovie =({isMovieID, setisMovieID, Movie, setselectedMovie}) => {
    console.log(Movie)

     const HouresandMinutes = (runtime) =>{
        var hours = Math.floor(runtime / 60);
        var minutes = runtime % 60;
        return `${hours}h ${minutes}m`
    }
    
    return (
        <div className='absolute z-1'>
            <h1 className='text-white'>SelectedMovie</h1>
            <button className='text-white' onClick={()=>{
                setisMovieID(false) 
                setselectedMovie(false)
                }}>back</button>
            <div className="bg-cover bg-no-repeat"
            style={
                {backgroundImage: `linear-gradient(to right, rgba(220.5, 241.5, 241.5, 1) calc((50vw - 170px) - 340px), rgba(220.5, 241.5, 241.5, 0.84) 50%, rgba(220.5, 241.5, 241.5, 0.84) 100%), url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${Movie.backdrop_path})`}
            }>
                <img src={Movie.poster_path ?
                `https://image.tmdb.org/t/p/w500/${Movie.poster_path}`: './no-movie.png'}
                alt={Movie.title}/>
                <div className=''>
                    <h2>{Movie.title} ({Movie.release_date ? Movie.release_date.split('-')[0] : 'N/A'})</h2>
                    <p>{Movie.release_date} ({Movie.origin_country[0]})</p>
                    <span>{Movie.genres.map((genre)=>(<a>{genre.name}, </a>))}</span> 
                    <p>{HouresandMinutes(Movie.runtime)}</p>
                </div>
                <p>{Movie.overview}</p>
            </div>
        </div>
    )
}

export default SelectedMovie