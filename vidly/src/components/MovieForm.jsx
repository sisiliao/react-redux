import React from 'react'
import Form from './common/Form'
import { getMovieById, saveMovie } from '../services/fakeMovieService'
import Joi from 'joi'
import { getGenres } from '../services/fakeGenreService'

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

  componentDidMount = () => {
    let data = { ...this.state.data }

    if (this.props.match.params.id !== 'new') {
      const movie = getMovieById(this.props.match.params.id)
      if (!movie) return this.props.history.replace('/not-found')

      data = this.mapToViewModel(movie)
    }

    const genres = getGenres()
    this.setState({ data, genres })
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

  doSubmit = () => {
    saveMovie(this.state.data)

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
        {/* <button
          className='btn btn-primary'
          onClick={() => history.push('/movies')}
        >
          Save
        </button> */}
      </div>
    )
  }
}

export default MovieForm
