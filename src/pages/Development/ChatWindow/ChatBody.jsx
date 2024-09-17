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
      {messages.map((message, index) => {
        return (
          <Messages
            key={index}
            message={message.text}
            who={message.senderId === user.uid ? true : false}
          />
        );
      })}
      <span ref={lastMessageRef}></span>
    </div>
  );
};

export default ChatBody;
