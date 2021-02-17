import React from 'react'

//Input: liked: boolean
//Output: onClick

const Like = ({ liked, onClick }) => {
  return (
    <div onClick={onClick}>
      {liked ? (
        <i className='fas fa-heart clickable'></i>
      ) : (
        <i className='far fa-heart clickable'></i>
      )}
    </div>
  )
}

export default Like
