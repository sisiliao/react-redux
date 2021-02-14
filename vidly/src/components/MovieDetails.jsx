import React from 'react'

const MovieDetails = ({ match, history }) => {
  console.log(match)
  return (
    <div>
      <p> {match.params.id} </p>
      <button
        className='btn btn-primary'
        onClick={() => history.push('/movies')}
      >
        Save
      </button>
    </div>
  )
}

export default MovieDetails
