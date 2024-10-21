import React from "react";
import { Link } from "react-router-dom";
import "./HomeComponent.css"; // Import the CSS file
import logo from "../Assets/logo.png";
export const HomeComponent = () => {
  return (
    <div className="container">
      <br />
      <br />
      <h1 className="title">
        Welcome to <br />
        <img src={logo} alt="" />
        <br />
      </h1>
      <Link to="/EnterForm" className="link">
        Quick scedule new entry
      </Link>
    </div>
  );
};
