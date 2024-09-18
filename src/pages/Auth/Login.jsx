import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../firebase/context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Warning from "./Warning";

const Login = ({ setLogin, setWarning, setServerLoading }) => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { app, auth, firestore, storage } = useContext(FirebaseContext);
  return (
    <>
      <input
        value={inputs.email}
        onChange={(e) => {
          setInputs(() => {
            return { ...inputs, email: e.target.value };
          });
        }}
        style={{ color: "black" }}
        type="text"
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
          if (!inputs.email.includes("@")) {
            setWarning(<Warning warning={"Invalid E-mail address"} />);
          } else if (!inputs.password || !inputs.email) {
            setWarning(<Warning warning={"Don't leave blank spaces"} />);
          } else {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                inputs.email,
                inputs.password
              );
              const user = userCredential.user;

              const docRef = doc(firestore, "users", user.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                history("/");
              } else {
                setWarning(<Warning warning={"No user found!"} />);
              }
            } catch (error) {
              setWarning(<Warning warning={"Something is wrong!!!"} />);
            }
          }

          setServerLoading(false);
        }}
      >
        Log In
      </button>
    </>
  );
};

export default Login;
