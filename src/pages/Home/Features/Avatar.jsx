import React from 'react'
import defaultAvatar from '../../../assets/defaultProfile.jpg'
const Avatar = ({avatar}) => {
  return (
    <div >
      <img src={avatar || defaultAvatar} alt="" id="avatar" style={{objectFit:'cover'}} />
    </div>
  )
}

export default Avatar
