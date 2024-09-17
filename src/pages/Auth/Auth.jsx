import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/LogoWhite.png";
import Login from "./Login";
import Signup from "./Signup";

const auth = () => {
  const [login, setLogin] = useState(false);
  const [warning, setWarning] = useState("");
  return (
    <div className="auth">
      <div className="container-sm">
        <div className="auth-logo">
          <img src={logo} alt="" />
        </div>
        <p style={{ margin: "0", textAlign: "center" }}>{warning}</p>
        <div className="input-div">
          {login ? (
            <Login setLogin={setLogin} setWarning={setWarning} />
          ) : (
            <Signup setLogin={setLogin} setWarning={setWarning} />
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
