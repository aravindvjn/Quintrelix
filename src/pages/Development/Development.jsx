import React from "react";
import "./Development.css";
const Development = ({maintenance}) => {
  return (
    <div className="maintenance-flex">
      <div class="maintenance-warning">
        <span class="icon">⚠️</span>
        <p>{maintenance} feature is currently under maintenance. Please check back later.</p>
      </div>
    </div>
  );
};

export default Development;
