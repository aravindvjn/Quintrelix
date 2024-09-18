import React, { useContext, useEffect, useState } from "react";
import defalutProfile from "../../assets/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext, FirebaseContext } from "../../firebase/context";
import Posts from "./Posts";
import Loading from "../Loading/Loading";
import { deleteDoc, doc, Firestore } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import ServerLoading from "../Loading/ServerLoading";
import EditProfile from "./Features/EditProfile";

const Profile = ({
  postsFromFireBase,
  setCurrentPage,
  fetchUsersData,
  fetchFreindsData,
}) => {
  const { user, theData } = useContext(AuthContext);
  const [showPost, setShowPost] = useState(false);
  const [showPosts, setShowPosts] = useState();
  const [noPost, setNoPost] = useState(0);
  const history = useNavigate();
  const [serverLoading, setServerLoading] = useState(false);
  const { auth } = useContext(FirebaseContext);
  const [showEdit, setShowEdit] = useState(false);
  const showPostHandler = (url) => {
    setShowPosts(
      <div className="profile-click-post">
        <button
          className="profile-click-button"
          onClick={() => {
            setShowPost(false);
          }}
        >
          x
        </button>
        <button
          className="profile-edit-post"
          onClick={() => {
            const userResponse = confirm("Do you want to proceed?");
            if (userResponse) {
              setServerLoading(true);
              async function deleteDocument(collectionName, documentId) {
                try {
                  await deleteDoc(doc(firestore, collectionName, documentId));
                  console.log("Document successfully deleted!");
                  setCurrentPage("Home");
                  history("/");
                } catch (error) {
                  console.error("Error deleting document: ", error);
                }
              }

              deleteDocument("images", url.id);
              console.log("User clicked Yes (OK)");
              setServerLoading(false);
            } else {
              console.log("User clicked No (Cancel)");
            }
          }}
        >
          delete
        </button>
        <Posts urlData={url.urlData} username={user.displayName} />
      </div>
    );
  };
  useEffect(() => {
    setNoPost(document.getElementsByClassName("profile-post").length);
  }, []);
  return (
    <div className="profile-div mt-3">
      {showEdit && (
        <EditProfile
          setShowEdit={setShowEdit}
          fetchUsersData={fetchUsersData}
        />
      )}
      {serverLoading && <ServerLoading />}
      <div className="flex">
        <img
          src={user.photoURL || defalutProfile}
          alt="profile picture"
          className="profile-pic"
        />
        <div className="profile-details">
          <p id="profile-username">{user.displayName}</p>
          <div>
            <button
              className="logout"
              onClick={() => {
                setShowEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="logout"
              onClick={async () => {
                try {
                  await signOut(auth).then(() => {
                    history("/auth");
                  });
                } catch (error) {
                  console.error("Error logging out:", error);
                }
              }}
            >
              Logout
            </button>
          </div>
          <div>
            <p>
              <strong>{noPost}</strong> posts
            </p>

            <p>
              <strong>{fetchFreindsData.length}</strong> Friends
            </p>
            {/* <p>
              <strong>{theData.followersCount}</strong> Followers
            </p>
            <p>
              <strong>{theData.followingCount}</strong> Following
            </p> */}
          </div>
        </div>
      </div>
      <hr />
      {!showPost ? (
        <div className="profile-posts">
          <p
            style={{
              position: "absolute",
              top: "-30px",
              margin: "auto",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Posts
          </p>
          {postsFromFireBase.length > 0 ? (
            postsFromFireBase
              .filter((post) => {
                return post.userId === user.uid;
              })
              .map((profilePost, index) => {
                return (
                  <img
                    key={index}
                    src={profilePost.urlData}
                    alt=""
                    className="profile-post"
                    onClick={() => {
                      showPostHandler(profilePost);
                      setShowPost(true);
                    }}
                  />
                );
              })
          ) : (
            <p>No Post</p>
          )}
        </div>
      ) : (
        showPosts
      )}
      {noPost===0&&<p style={{textAlign:'center'}}>No posts</p>}
    </div>
  );
};

export default Profile;
