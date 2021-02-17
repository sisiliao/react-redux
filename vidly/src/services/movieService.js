import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = `${apiUrl}/movies`

const getMovies = () => {
  return http.get(apiEndpoint)
}

const deleteMovie = (movieId) => {
  return http.delete(`${apiEndpoint}/${movieId}`)
}

const getMovieById = (movieId) => {
  return http.get(`${apiEndpoint}/${movieId}`)
}

const saveMovie = (movie) => {
  //update a movie
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return http.put(`${apiEndpoint}/${movie._id}`, body)
  }
  //create a movie
  return http.post(apiEndpoint, movie)
}

export { getMovies, deleteMovie, getMovieById, saveMovie }
