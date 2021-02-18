import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Like from './common/Like'
import Table from './common/Table'
import authService from '../services/authService'

class MovieTable extends Component {
  constructor() {
    super()
    const user = authService.getCurrentUser()
    if (user && user.isAdmin) this.columns.push(this.deleteColumn)
  }

  deleteColumn = {
    key: 'Delete',
    content: (m) => (
      <button className='btn btn-danger' onClick={() => this.props.onDelete(m)}>
        Delete
      </button>
    ),
  }

  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (m) => <Link to={`/movies/${m._id}`}>{m.title}</Link>,
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'Like',
      content: (m) => (
        <Like liked={m.liked} onClick={() => this.props.onLike(m)} />
      ),
    },
    // {
    //   key: 'Delete',
    //   content: (m) => (
    //     <button
    //       className='btn btn-danger'
    //       onClick={() => this.props.onDelete(m)}
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ]

  render() {
    const { movies, onSort, sortColumn } = this.props

    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      ></Table>
    )
  }
}

export default MovieTable
