import React from 'react'

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input {...rest} name={name} id={name} className='form-control'></input>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default Input
