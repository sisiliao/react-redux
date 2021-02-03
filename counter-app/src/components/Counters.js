import React, { Component } from 'react'
import Counter from './Counter'

class Counters extends Component {
  state = {
    counters: [
      { id: 1, val: 0 },
      { id: 2, val: 0 },
      { id: 3, val: 0 },
      { id: 4, val: 0 },
    ],
  }

  handleDelete = (id) => {
    let counters = [...this.state.counters]
    counters = counters.filter((c) => c.id !== id)
    this.setState({ ...this.state, counters })
    // setTimeout(() => console.log(this.state.counters), 3000)
  }

  handleIncrement = (counter) => {
    const counters = [...this.state.counters]
    const index = this.state.counters.indexOf(counter)
    counters[index] = { ...counter }
    counters[index].val++
    this.setState({ ...this.state, counters })
  }

  handleDecrement = (counter) => {
    const counters = [...this.state.counters]
    const index = this.state.counters.indexOf(counter)
    counters[index] = { ...counter }
    counters[index].val--
    this.setState({ ...this.state, counters })
  }

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.val = 0
      return c
    })
    this.setState({ ...this.state, counters })
  }

  render() {
    return (
      <div>
        <button className='btn btn-info btn-md m-3' onClick={this.handleReset}>
          {' '}
          RESET{' '}
        </button>
        <ul>
          {this.state.counters.map((c) => (
            <Counter
              key={c.id}
              counter={c}
              onDelete={this.handleDelete}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onReset={this.handleReset}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Counters
