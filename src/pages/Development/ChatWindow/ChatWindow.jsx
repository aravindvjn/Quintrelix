import React, { useContext, useEffect, useState } from "react";
import "./ChatWindow.css";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { AuthContext, FirebaseContext } from "../../../firebase/context";
import { firestore } from "../../../firebase/firebase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
const ChatWindow = ({ chatWith }) => {
  // console.log("chat with", chatWith);
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatId = [user.uid, chatWith.id].sort().join("_");

  useEffect(() => {
    const q = query(
      collection(firestore, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setNewMessage("");

    await addDoc(collection(firestore, "chats", chatId, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      senderId: user.uid,
      recipientId:chatWith.id,
    });
  };

  return (
    <div className="chat-window-parent">
      <ChatHeader chatWith={chatWith} />
      <ChatBody messages={messages} user={user}/>
      <div className="chat-window-footer">
        <form className="flex" onSubmit={sendMessage}>
          <textarea
            type="text" placeholder="Type..."
            value={newMessage}
            className="chat-window-input"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button className="chat-window-send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
