import React, { useContext, useEffect } from "react";
import IndividualChat from "./Features/IndividualChat";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { AuthContext } from "../../firebase/context";

const Chat = ({
  setCurrentPage,
  setChatWith,
  fetchUsersData,
  fetchFreindsData,
}) => {
  const { user, setUser, setTheData } = useContext(AuthContext);
  // const { auth } = useContext(FirebaseContext);
  console.log("your friends", fetchFreindsData);

  useEffect(() => {});
  return (
    <div className="chat-parent">
      <div className="flex">
        {" "}
        <p style={{ marginBottom: "0", marginLeft: "20px" }}>Messages</p>
        <button
          className="chat-add-button"
          onClick={async () => {
            const findPerson = window.prompt("Enter the username");
            if (fetchUsersData) {
              let foundPerson = fetchUsersData.filter((person) => {
                return person.username === findPerson;
              });
              console.log(foundPerson.length > 0);
              if (foundPerson.length > 0) {
                try {
                  await setDoc(doc(firestore, user.uid, foundPerson[0].id), {
                    friendId: foundPerson[0].id,
                    yourId: user.uid,
                    username: foundPerson[0].username,
                    createdAt: new Date(),
                  });
                  await setDoc(doc(firestore, foundPerson[0].id, user.uid), {
                    friendsId: user.uid,
                    username: user.displayName,
                    yourId: foundPerson[0].id,
                    createdAt: new Date(),
                  });
                  // window.location.reload(true);
                  console.log("Friend added");
                } catch (e) {
                  console.error("Error adding friend to Firestore:", e);
                }
              } else {
                alert("Usernot found");
              }
            }
          }}
        >
          Add chats
        </button>
      </div>

      <hr />
      {fetchFreindsData &&
        fetchFreindsData.map((person) => {
          console.log("person", person);
          return (
            <IndividualChat
              key={person.id}
              person={person}
              setCurrentPage={setCurrentPage}
              setChatWith={setChatWith}
            />
          );
        })}
    </div>
  );
};

export default Chat;
