import React, { Component } from 'react'

//Input: liked: boolean
//Output: onClick

export default class Like extends Component {
  render() {
    console.log(this.props)
    return (
      <div onClick={this.props.onLike}>
        {this.props.liked ? (
          <i className='fas fa-heart'></i>
        ) : (
          <i className='far fa-heart'></i>
        )}
      </div>
    )
  }
}
