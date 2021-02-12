import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import Like from './Like'
import Pagination from './Pagination'
import { paginate } from '../util/paginate'

export default class Movie extends Component {
  constructor() {
    super()
    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 0,
    }
  }

  deleteHandler = (id) => {
    this.setState({
      ...this.state,
      movies: this.state.movies.filter((m) => m._id !== id),
    })
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

  render() {
    const { movies: allMovies, pageSize, currentPage } = this.state
    const { length } = allMovies

    const movies = paginate(allMovies, currentPage, pageSize)

    if (length === 0) {
      return <p>There is no movie.</p>
    }
    return (
      <React.Fragment>
        <p>Showing {length} movies</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m, i) => (
              <tr key={m._id}>
                <td>{m.title}</td>
                <td>{m.genre.name}</td>
                <td>{m.numberInStock}</td>
                <td>{m.dailyRentalRate}</td>
                <td>
                  <Like liked={m.liked} onLike={() => this.likeHandler(m)} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => this.deleteHandler(m._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemsCount={length}
          pageSize={pageSize}
          onPageChange={this.pageHandler}
        ></Pagination>
      </React.Fragment>
    )
  }
}
