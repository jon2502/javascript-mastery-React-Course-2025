import React from 'react'

function SelectedMovie(isSelectedMovie) {
    return (
        <div className='wrapper'>
            <h1 className='text-white'>SelectedMovie</h1>
            <p>{isSelectedMovie.isSelectedMovie}</p>
        </div>
    )
}

export default SelectedMovie