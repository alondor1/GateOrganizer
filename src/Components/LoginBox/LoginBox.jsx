import React, { useState, useContext } from "react";
import "./LoginBox.css";
import axios from "axios";
import loginimg from "../Assets/loginimg.png";

import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const LoginBox = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, setIsLoggedIn, setUserName, setAccessKey } =
    useContext(AuthContext);

  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios.get("http://localhost:3004/users").then((res) => {
      res.data.map((user) => {
        if (user.email === LoginData.email) {
          console.log("ok");
          if (user.password === LoginData.password) {
            setIsLoggedIn(true);
            setUserName(user.firstname + " " + user.lastname);
            setAccessKey(user.accesskey);
            console.log("very ok");
          } else {
            setError("Login Error ");
          }
        } else {
          setError("Login Error");
        }

        return console.log(isLoggedIn);
      });
    });
  };
  return (
    <div className="LoginBox">
      {isLoggedIn ? <Navigate to="/homepage" /> : ""}
      <form onSubmit={handleLogin}>
        <img src={loginimg} alt="" />
        <h2>login</h2>
        <input
          type="text"
          placeholder="Email....."
          required
          className="logintext"
          onChange={(e) =>
            setLoginData({ ...LoginData, email: e.target.value })
          }
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password...."
          required
          className="logintext"
          onChange={(e) =>
            setLoginData({ ...LoginData, password: e.target.value })
          }
        />
        <br />
        <input type="submit" value="log in" className="login" />
      </form>
      <span>{error}</span>
    </div>
  );
};
