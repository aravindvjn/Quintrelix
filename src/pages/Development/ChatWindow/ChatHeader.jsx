import React from 'react'
import Avatar from '../../Home/Features/Avatar'
import IndividualChat from '../../Home/Features/IndividualChat'

const ChatHeader = ({chatWith}) => {
  return (
    <div className="chat-window-header">
        <IndividualChat person={chatWith} />
    </div>

  )
}

export default ChatHeader
