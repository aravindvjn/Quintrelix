import React, { useState } from 'react'

const Messages = ({message,who}) => {
  return (
    <div className={`messages ${who===true ? "send ": "recieve" }`}>
      <p>{message}</p>
    </div>
  )
}

export default Messages
