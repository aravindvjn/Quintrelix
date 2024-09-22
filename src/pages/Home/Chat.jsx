import React, { useContext, useEffect, useState } from "react";
import IndividualChat from "./Features/IndividualChat";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const Chat = ({
  setCurrentPage,
  setChatWith,
  fetchUsersData,
  fetchFreindsData,
}) => {
  // const { auth } = useContext(FirebaseContext);
  console.log("your friends", fetchFreindsData);
  const [yourFriends, setYourFriends] = useState();

  return (
    <div className="chat-parent">
      <div className="flex">
        {" "}
        <p style={{ marginBottom: "0", marginLeft: "20px" }}>Friends</p>
      </div>

      <hr />

      {fetchFreindsData &&
        fetchFreindsData
          .map((friend) => {
            return fetchUsersData.filter((userF) => {
              return friend.id === userF.id && <p>hai</p>;
            });
          })
          .map((person) => {
            console.log("friends", person);
            return (
              <IndividualChat
                key={person.id}
                person={person[0]}
                setCurrentPage={setCurrentPage}
                setChatWith={setChatWith}
              />
            );
          })}
      {fetchFreindsData.length <= 0 && (
        <p style={{ textAlign: "center" }}>No Friends</p>
      )}
    </div>
  );
};

export default Chat;
