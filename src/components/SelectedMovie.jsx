import React from 'react'

const SelectedMovie =({isMovieID, setisMovieID, Movie, setselectedMovie}) => {
    console.log(Movie)

     const HouresandMinutes = (runtime) =>{
        var hours = Math.floor(runtime / 60);
        var minutes = runtime % 60;
        return `${hours}h ${minutes}m`
    }
    
    return (
        <section className="absolute h-full z-1 bg-cover bg-no-repeat flex justify-center items-center"
        style={
        {backgroundImage: `linear-gradient(rgba(220.5, 241.5, 241.5, 0.7), rgba(220.5, 241.5, 241.5, 0.8)), url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${Movie.backdrop_path})`}
        }>
            <div className='flex flex-col'>
                <button className='inline-flex items-center justify-center w-20 h-auto text-white bg-dark-100 p-1.5 rounded-xl shadow-inner shadow-light-100/10 mb-2.5' 
                onClick={()=>{setisMovieID(false), setselectedMovie(false)}}>
                    back
                </button>
                <img className="rounded-2xl" src={Movie.poster_path ?
                `https://image.tmdb.org/t/p/w500/${Movie.poster_path}`: './no-movie.png'}
                alt={Movie.title}/>
            </div>
            <div className='w-[50%] pl-[40px] flex flex-col justify-start items-start h-[75%]'>
                <h2 className='text-black'>{Movie.title} ({Movie.release_date ? Movie.release_date.split('-')[0] : 'N/A'})</h2>
                <div className=''>
                    <p>{Movie.release_date} ({Movie.origin_country[0]})</p>
                    <span>{Movie.genres.map((genre)=>(<a key={genre.name}>{genre.name}, </a>))}</span> 
                    <p>{HouresandMinutes(Movie.runtime)}</p>
                </div>
                <div>
                    <h2 className='text-black'>overview</h2>
                    <p>{Movie.overview}</p> 
                </div>
            </div>
        </section>
    )
}

export default SelectedMovie