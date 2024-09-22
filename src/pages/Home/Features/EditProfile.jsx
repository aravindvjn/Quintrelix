import React, { useContext, useState } from "react";
import { AuthContext } from "../../../firebase/context";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const EditProfile = ({ setShowEdit,fetchUsersData }) => {
  const [editDp, setEditDp] = useState();
  const { user, setUser, setTheData } = useContext(AuthContext);
  const [editUsername, setEditUsername] = useState(user.displayName);

  return (
    <div className="edit-fixed-parent">
      <div className="edit">
        <p style={{ textAlign: "center" }}>Edit Profile</p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (editUsername) {

              const doesExist = fetchUsersData.filter((user) => {
                return user.username === editUsername;
              }).filter((userMe)=>{
                return userMe.username !== user.displayName;
              })
              if (doesExist.length > 0) {
                // console.log("user already exists")
                alert("Username already taken")
              } else {


                if (editDp) {
                  const storage = getStorage();
                  const storageRef = ref(storage, `profilePicture/${user.uid}`);
                  const uploadTask = uploadBytesResumable(storageRef, editDp);
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      // console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                      // console.error("Error during upload:", error);
                    },
                    () => {
                      getDownloadURL(uploadTask.snapshot.ref).then(
                        async (url) => {
                          // console.log("File available at", url);

                          const user = getAuth().currentUser;

                          if (user) {
                            try {
                              await updateProfile(user, {
                                photoURL: url,
                              });

                              // console.log(
                              //   "Profile picture updated successfully!"
                              // );
                              // console.log("profile url", user.photoURL);
                            } catch (error) {
                              // console.error(
                              //   "Error updating profile picture :",
                              //   error
                              // );
                            }
                          } else {
                            // console.log("No user is logged in.");
                          }

                          try {
                            await updateDoc(doc(firestore, "users", user.uid), {
                              ProfilePicture: url,
                            });
                            // console.log("Profile Picture updated successfully");
                          } catch (error) {
                            // console.error(
                            //   "Error updating Profile Picture : ",
                            //   error
                            // );
                          }
                        }
                      );
                    }
                  );

                  // const updateProfilePic = async (url) => {
                  //     const user = getAuth().currentUser;

                  //     if (user) {
                  //       try {
                  //         await updateProfile(user, {
                  //             photoURL:url,
                  //         });

                  //         console.log("Profile picture updated successfully!");
                  //         console.log("profile url", user.photoURL);
                  //       } catch (error) {
                  //         console.error("Error updating profile picture :", error);
                  //       }
                  //     } else {
                  //       console.log("No user is logged in.");
                  //     }
                  //   };
                }

                const updateUser = async (userId, newUsername) => {
                  const userRef = doc(firestore, "users", userId);

                  try {
                    await updateDoc(userRef, {
                      username: newUsername,
                    });
                    // console.log("Username updated successfully");
                  } catch (error) {
                    // console.error("Error updating username: ", error);
                  }
                };
                updateUser(user.uid, editUsername);

                const updateUserDisplayName = async (newDisplayName) => {
                  const user = getAuth().currentUser;

                  if (user) {
                    try {
                      await updateProfile(user, {
                        displayName: newDisplayName,
                      });

                      // console.log("Display name updated successfully!");
                      // console.log("New display name:", user.displayName);
                    } catch (error) {
                      // console.error("Error updating display name:", error);
                    }
                  } else {
                    // console.log("No user is logged in.");
                  }
                };
                updateUserDisplayName(editUsername);
                setShowEdit(false);
                setEditUsername(user.displayName);
              }
            }
          }}
        >
          <button
            className="edit-close"
            onClick={() => {
              setShowEdit(false);
            }}
          >
            close
          </button>
          <label htmlFor="profile">Profile picture</label>
          <input
            type="file"
            className="edit-photo"
            name="profile"
            accept=".jpg,.png"
            onChange={(e) => {
              setEditDp(e.target.files[0]);
            }}
          />
          <label htmlFor="username">username</label>
          <input
            value={editUsername || ""}
            onChange={(e) => {
              const { value } = e.target;
              const regex = /^[a-zA-Z0-9]*$/;

              if (regex.test(value)) {
                setEditUsername(value);
              }
            }}
            type="text"
            name="username"
            className="edit-username"
          />
          <button className="edit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
