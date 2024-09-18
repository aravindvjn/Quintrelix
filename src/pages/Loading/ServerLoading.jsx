import React from "react";
import "./Loading.css";
const ServerLoading = () => {
  return (
    <div className="server-loading-parent">
        <div className="loader-blue">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
      </div>
    </div>
  );
};

export default ServerLoading;
