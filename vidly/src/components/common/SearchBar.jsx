import React from 'react'
import Input from './Input'

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type='text'
      name='query'
      className='form-control my-3'
      placeholder='Search...'
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  )
}

export default SearchBar
