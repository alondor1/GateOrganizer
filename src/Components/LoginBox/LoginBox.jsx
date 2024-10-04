import React, { useState, useContext } from "react";
import "./LoginBox.css";
import axios from "axios";
import loginimg from "../Assets/loginimg.png";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const LoginBox = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, setIsLoggedIn, setUserName, setAccessKey } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3004/login",
        loginData
      );

      // If successful, set user data
      const user = response.data;
      setIsLoggedIn(true);
      setUserName(`${user.firstname} ${user.lastname}`);
      setAccessKey(user.accesskey);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="LoginBox">
      {isLoggedIn ? <Navigate to="/homepage" /> : ""}
      <form onSubmit={handleLogin}>
        <img src={loginimg} alt="" />
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email....."
          required
          className="logintext"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password...."
          required
          className="logintext"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <br />
        <input type="submit" value="Log In" className="login" />
      </form>
      <span>{error}</span>
    </div>
  );
};
