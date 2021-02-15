import React from 'react'

const Input = ({ name, label, error, ...rest }) => {
  console.log(rest)
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input {...rest} name={name} className='form-control'></input>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default Input
