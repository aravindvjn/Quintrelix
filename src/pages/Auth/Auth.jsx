import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/LogoWhite.png";
import Login from "./Login";
import Signup from "./Signup";
import ServerLoading from "../Loading/ServerLoading";

const auth = () => {
  const [login, setLogin] = useState(false);
  const [warning, setWarning] = useState("");
  const [serverLoading,setServerLoading]=useState(false)
  return (
    <div className="auth">
      {serverLoading&& <ServerLoading />}
      <div className="container-sm">
        <div className="auth-logo">
          <img src={logo} alt="" />
        </div>
        <div style={{ margin: "0", textAlign: "center" }}>{warning}</div>
        <div className="input-div">
          {login ? (
            <Login setLogin={setLogin} setWarning={setWarning} setServerLoading={setServerLoading}/>
          ) : (
            <Signup setLogin={setLogin} setWarning={setWarning} setServerLoading={setServerLoading} />
          )}
          <div className="auth-switch">
            <p>
              <strong>
                {login
                  ? "Don't have an account? "
                  : "Already have an Account? "}
              </strong>{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLogin(!login);
                  setWarning("");
                }}
              >
                {login ? " Sign Up" : "Log In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;
