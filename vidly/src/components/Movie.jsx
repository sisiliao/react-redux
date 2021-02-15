import React, { Component } from 'react'
import { getMovies, saveMovie } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../util/paginate'
import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import MovieTable from './MovieTable'
import _ from 'lodash'

export default class Movie extends Component {
  constructor() {
    super()
    this.state = {
      pageSize: 4,
      currentPage: 0,
      movies: [],
      genres: [],
      sortColumn: { path: 'title', order: 'asc' },
    }
  }

  componentDidMount = () => {
    const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()]
    this.setState({ genres, movies: getMovies() })
  }

  deleteHandler = (id) => {
    this.setState({
      ...this.state,
      movies: this.state.movies.filter((m) => m._id !== id),
    })
  }

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn })
  }

  likeHandler = (movie) => {
    let movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index].liked = !movies[index].liked
    this.setState({
      ...this.state,
      movies,
    })
  }

  pageHandler = (pageId) => {
    this.setState({
      currentPage: pageId,
    })
  }

  changeGenreHandler = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 0,
    })
  }

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state

    const filteredMovie =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies

    const sorted = _.orderBy(
      filteredMovie,
      [sortColumn.path],
      [sortColumn.order]
    )

    const movies = paginate(sorted, currentPage, pageSize)

    return { data: movies, totalCount: filteredMovie.length }
  }

  addNewMovieHandler = () => {
    this.props.history.push(`/movies/new`)
  }
  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state
    const { length } = allMovies

    if (length === 0) {
      return <p>There is no movie.</p>
    }

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.changeGenreHandler}
          ></ListGroup>
        </div>
        <div className='col'>
          <p>Showing {totalCount} movies</p>
          <button className='btn btn-primary' onClick={this.addNewMovieHandler}>
            Add New Movie
          </button>
          <MovieTable
            movies={movies}
            onLike={this.likeHandler}
            onDelete={this.deleteHandler}
            onSort={this.sortHandler}
            sortColumn={sortColumn}
          ></MovieTable>

          <Pagination
            currentPage={currentPage}
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.pageHandler}
          ></Pagination>
        </div>
      </div>
    )
  }
}
