import React, { Component } from 'react'
import { getMovies, deleteMovie } from '../services/movieService'
import { getGenres } from '../services/genreService'
import { paginate } from '../util/paginate'
import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import MovieTable from './MovieTable'
import _ from 'lodash'
import SearchBar from './common/SearchBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class Movie extends Component {
  constructor() {
    super()
    this.state = {
      pageSize: 4,
      currentPage: 0,
      movies: [],
      genres: [],
      sortColumn: { path: 'title', order: 'asc' },
      selectedGenre: null,
      searchQuery: '',
    }
  }

  componentDidMount = async () => {
    let { data: genres } = await getGenres()
    genres = [{ name: 'All Genres', _id: '' }, ...genres]
    const { data: movies } = await getMovies()
    this.setState({ genres, movies })
  }

  deleteHandler = async (movie) => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter((m) => m._id !== movie._id)
    this.setState({
      movies,
    })

    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Movie has been deleted.')
      }
      this.setState({
        movies: originalMovies,
      })
    }
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

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state

    let filteredMovie = allMovies

    if (searchQuery) {
      filteredMovie = filteredMovie.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovie = allMovies.filter((m) => m.genre._id === selectedGenre._id)
    }

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

  changeGenreHandler = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 0,
      searchQuery: '',
    })
  }

  searchChangeHandler = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 0,
    })
  }

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state
    const { length } = allMovies

    if (length === 0) {
      return <p>There is no movie.</p>
    }

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <div className='row'>
        <div className='col-3'>
          <ToastContainer />
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

          <SearchBar
            value={searchQuery}
            onChange={this.searchChangeHandler}
          ></SearchBar>

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
