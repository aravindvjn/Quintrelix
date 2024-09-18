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
        {/* <button
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
                    ProfilePicture: foundPerson[0].ProfilePicture || '',
                    username: user.displayName,
                    yourId: user.uid,
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
        </button> */}
      </div>

      <hr />
      {/* {fetchFreindsData &&
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
        })} */}
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
          {fetchFreindsData.length<=0 && <p style={{ textAlign:'center'}}>No Friends</p>}
    </div>
  );
};

export default Chat;
