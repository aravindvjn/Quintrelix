import React, { useContext, useEffect, useState } from "react";
import IndividualChat from "../Features/IndividualChat";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { AuthContext } from "../../../firebase/context";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ person, fetchFreindsData }) => {
  const [addFriend, setAddFriend] = useState(false);
  const { user, setUser, setTheData } = useContext(AuthContext);
  useEffect(() => {
    if (fetchFreindsData) {
      fetchFreindsData.map((friend) => {
        if (friend.id === person.id) {
          setAddFriend(true);
        }
      });
    }
  }, []);
  return (
    <div className="search-result-parent">
      <button
        style={{ backgroundColor: `${addFriend ? "red" : ""}` }}
        className="search-result-add-friend"
        onClick={async () => {
          if (addFriend) {
            deleteDoc(doc(firestore, user.uid, person.id))
              .then(() => {
                // console.log("Document successfully deleted!");
                setAddFriend(false);
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
          } else {
            try {
              await setDoc(doc(firestore, user.uid, person.id), {
                friendId: person.id,
                ProfilePicture: person.ProfilePicture || "",
                username: user.displayName,
                yourId: user.uid,
                createdAt: new Date(),
              });
              // console.log("Friend added");
              setAddFriend(true)
            } catch (e) {
              // console.error("Error adding friend to Firestore:", e);
            }
          }
        }}
      >
        {addFriend ? "Remove Friend" : "Add Friend"}
      </button>
      <IndividualChat person={person} />
    </div>
  );
};

export default SearchResult;
