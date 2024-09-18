import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="timer-parent">
      <div className="timer-container">
        <span id="countdown">
          {timeLeft > 0 ? timeLeft : "Welcome To Quintrelix"}
        </span>
      </div>
    </div>
  );
};

export default Timer;
