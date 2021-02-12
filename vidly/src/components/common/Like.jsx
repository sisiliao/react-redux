import React from 'react'

//Input: liked: boolean
//Output: onClick

const Like = (props) => {
  return (
    <div onClick={props.onLike}>
      {props.liked ? (
        <i style={{ cursor: 'Pointer' }} className='fas fa-heart'></i>
      ) : (
        <i style={{ cursor: 'Pointer' }} className='far fa-heart'></i>
      )}
    </div>
  )
}

export default Like
