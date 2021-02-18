import React from 'react'
import Form from './common/Form'
import { getMovieById, saveMovie } from '../services/movieService'
import Joi from 'joi'
import { getGenres } from '../services/genreService'

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    errors: {},
    genres: [],
  }

  validationKeys = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  }

  schema = Joi.object(this.validationKeys)

  populateGenre = async () => {
    const { data: genres } = await getGenres()
    this.setState({ genres })
  }

  populateMovies = async () => {
    const movieId = this.props.match.params.id
    if (movieId === 'new') {
      return
    }

    try {
      const { data: movie } = await getMovieById(this.props.match.params.id)
      this.setState({ data: this.mapToViewModel(movie) })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found')
      }
    }
  }

  componentDidMount = async () => {
    await this.populateGenre()
    await this.populateMovies()
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data)
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log('!!Error: ' + ex.response.data)
      }
    }

    this.props.history.push('/movies')
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}

          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default MovieForm
