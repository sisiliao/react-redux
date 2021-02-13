import React from 'react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

const Table = ({ data, onSort, sortColumn, columns }) => {
  return (
    <table className='table'>
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>

      <TableBody columns={columns} data={data}></TableBody>
    </table>
  )
}

export default Table
