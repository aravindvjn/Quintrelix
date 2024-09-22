import React from "react";
import Avatar from './Avatar'
import avatar from '../../../assets/defaultProfile.jpg'
const IndividualChat = ({setChatWith,person,setCurrentPage}) => {
  // console.log("the person1",person)
  return (
    <div className="chat-profile-block" onClick={()=>{
      setCurrentPage("ChatWindow");
      // console.log("the person",person)
      setChatWith(person)
    }} >
      <Avatar avatar={person.ProfilePicture ||avatar} />
      <p>{person.username}</p>
    </div>
  );
};

export default IndividualChat;
