//input: total pages number, current page
//output: onClick, page
import React from 'react'
import Proptypes from 'prop-types'

const Pagination = (props) => {
  const { currentPage, itemsCount, pageSize, onPageChange } = props
  const pageNumbers = Math.ceil(itemsCount / pageSize)

  if (pageNumbers === 1) return null
  return (
    <div>
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {[...Array(pageNumbers)].map((_, i) => (
            <li
              key={i}
              className={currentPage === i ? 'page-item active' : 'page-item'}
            >
              <a className='page-link' onClick={() => onPageChange(i)}>
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

//注意这里的var 名字 propTypes vs Proptypes
Pagination.propTypes = {
  currentPage: Proptypes.number.isRequired,
  itemsCount: Proptypes.number.isRequired,
  pageSize: Proptypes.number.isRequired,
  onPageChange: Proptypes.func.isRequired,
}

export default Pagination
