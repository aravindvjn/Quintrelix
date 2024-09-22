import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import Warning from "./Warning";

const Signup = ({ setLogin, setWarning, setServerLoading }) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { app, auth, firestore, storage } = useContext(FirebaseContext);
  const [existUser, setExistUser] = useState();

  useEffect(() => {
    async function fetchExistingData() {
      const usersCollection = collection(firestore, "users");
      const snapshot = await getDocs(usersCollection);
      const existingUser = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExistUser(existingUser);
      // console.log("existing user at login", existingUser);
    }
    fetchExistingData();
  }, []);
  return (
    <>
      <input
        value={inputs.username}
        onChange={(e) => {
          const { value } = e.target;
          const regex = /^[a-zA-Z0-9]*$/;
          if (regex.test(value)) {
            setInputs(() => {
              return { ...inputs, username: value };
            });
          }
        }}
        style={{ color: "black" }}
        type="text"
        placeholder="username"
        required
      />
      <input
        value={inputs.email}
        onChange={(e) => {
          setInputs(() => {
            return { ...inputs, email: e.target.value };
          });
        }}
        style={{ color: "black" }}
        type="email"
        placeholder="email"
        required
      />
      <input
        value={inputs.password}
        onChange={(e) => {
          setInputs(() => {
            return { ...inputs, password: e.target.value };
          });
        }}
        style={{ color: "black" }}
        type="password"
        placeholder="password"
        required
      />
      <button
        id="loginBtn"
        onClick={async () => {
          setServerLoading(true);
          if (!inputs.username || !inputs.email || !inputs.password) {
            setWarning(<Warning warning={"Don't leave blank spaces"} />);
            setServerLoading(false);
            return;
          }
          if (!inputs.email.includes("@")) {
            setWarning(<Warning warning={"Invalid E-mail address"} />);
          } else if (inputs.password.length < 6) {
            setWarning(
              <Warning warning={"Password must have more than 5 characters"} />
            );
          } else {
            try {
              const doesExist = existUser.filter((user) => {
                return user.username === inputs.username;
              });
              if (doesExist.length > 0) {
                setWarning(<Warning warning={"Username already taken"} />);
              } else {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  inputs.email,
                  inputs.password
                );
                await updateProfile(userCredential.user, {
                  displayName: inputs.username,
                });

                // console.log("Logged in successfully!");
                const user = userCredential.user;
                await setDoc(doc(firestore, "users", user.uid), {
                  username: inputs.username,
                  email: inputs.email,
                  createdAt: new Date(),
                  followersCount: 0,
                  followingCount: 0,
                });
                setLogin(true);
                setWarning("");
              }
            } catch (error) {
              setWarning(
                <Warning warning={"Invalid or account may already exists."} />
              );
            }
          }
          setServerLoading(false);
        }}
      >
        Sign Up
      </button>
    </>
  );
};

export default Signup;
