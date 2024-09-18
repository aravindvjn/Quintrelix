import React, { useEffect, useRef } from "react";
import Messages from "./Messages";

const ChatBody = ({ messages, user }) => {
  const lastMessageRef = useRef();
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="chat-window-body">
      {messages.length>0? messages.map((message, index) => {
        console.log("message",message.text,"USER",message.senderId)
        return (
          <Messages
            key={index}
            message={message.text}
            who={message.senderId === user.uid ? true : false}
          />
        );
      }) : <p style={{textAlign:'center',marginTop:'50%'}}>No messages here yet...</p>}
      <span ref={lastMessageRef}></span>
    </div>
  );
};

export default ChatBody;
