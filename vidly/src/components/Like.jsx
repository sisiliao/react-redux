import React from 'react'

//Input: liked: boolean
//Output: onClick

const Like = (props) => {
  return (
    <div onClick={props.onLike}>
      {props.liked ? (
        <i className='fas fa-heart'></i>
      ) : (
        <i className='far fa-heart'></i>
      )}
    </div>
  )
}

export default Like
