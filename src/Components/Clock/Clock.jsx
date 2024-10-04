import React, { useState, useEffect } from "react";
import "./Clock.css";
export const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="clock">
      <div className="date">{currentDateTime.toLocaleDateString()}</div>
      <div className="time">{currentDateTime.toLocaleTimeString()}</div>
    </div>
  );
};
