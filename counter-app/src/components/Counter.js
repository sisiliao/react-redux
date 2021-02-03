import React, { Component } from 'react'

class Counter extends Component {
  render() {
    const { counter } = this.props
    return (
      <div>
        {counter.val === 0 ? (
          <span className='btn-info m-2 btn-sm'>Zero</span>
        ) : (
          <span className='badge badge-info ml-4 mr-4'>{counter.val} </span>
        )}

        <button
          className='btn btn-primary btn-sm m-2'
          onClick={() => this.props.onIncrement(counter)}
        >
          Increment
        </button>
        <button
          className='btn btn-secondary btn-sm m-2'
          onClick={() => this.props.onDecrement(counter)}
        >
          Decrement
        </button>
        <button
          className='btn btn-danger btn-sm m-2'
          onClick={() => this.props.onDelete(counter.id)}
        >
          Delete
        </button>
      </div>
    )
  }
}

export default Counter
