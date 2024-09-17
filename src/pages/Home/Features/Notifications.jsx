import React, { useState } from "react";
import "./Features.css";
import Avatar from "./Avatar";
import logo from '../../../assets/Qlogo.png'
const Notifications = () => {
  const [notification, setNotification] = useState(1);
  return (
    <>
      {notification > 0 && (
        <div className="notification-parent">
          <p>Notifications</p>
          <div className="notifications">
           <div className="flex" style={{alignItems:'start',transform:'translateX(-30px)'}}>
            <Avatar avatar={logo}/>
           <div className="notification">
            <p>Hey! Welcome to Quintrelix!. Stay connected with friends and family, share your moments, and explore new updates. Have a great time!"</p>
            </div>
           </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
