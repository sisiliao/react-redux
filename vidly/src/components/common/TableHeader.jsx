import React, { Component } from 'react'

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn }
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.setState({
      sortColumn,
    })
    this.props.onSort(sortColumn)
  }

  renderIcon = (column) => {
    if (column.content || column.path !== this.props.sortColumn.path) {
      return null
    }
    if (this.props.sortColumn.order === 'asc') {
      return <i className='fas fa-sort-up'></i>
    }

    return <i className='fas fa-sort-down'></i>
  }

  render() {
    const { columns, onSort } = this.props
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className='clickable'
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
