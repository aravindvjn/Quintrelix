import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/LogoWhite.png";
import {Link} from 'react-router-dom'

const auth = () => {
  const [login, setLogin] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    cpassword: "",
  });
  return (
    <div className="auth">
      <div className="container-sm">
        <div className="auth-logo">
          <img src={logo} alt="" />
        </div>
        <div className="input-div">
          <input
            onChange={(e) => {
              setInputs((prev) => {
                return { ...inputs, username: e.target.value };
              });
            }}
            type="text"
            value={inputs.username}
            placeholder="username"
            required
          />
          <input
            onChange={(e) => {
              setInputs(() => {
                return { ...inputs, password: e.target.value };
              });
            }}
            type="password"
            placeholder="password"
            required
          />
          {!login && (
            <input
              onChange={(e) => {
                setInputs(() => {
                  return { ...inputs, cpassword: e.target.value };
                });
              }}
              type="password"
              placeholder="confirm password"
              required
            />
          )}
          <Link to="/" ><button id="loginBtn" onClick={()=>{
            console.log(inputs)
          }}>{login ? "Log In" : "Sign Up"}</button></Link>
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
