import React, { useState, useContext, useEffect } from "react";
import "./LoginBox.css";
import axiosInstance from "../../axiosConfig";
import loginimg from "../Assets/loginimg.png";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginBox = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, setIsLoggedIn, setUserName, setAccessKey } =
    useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", loginData);

      // If successful, set user data

      const user = response.data;
      setIsLoggedIn(true);
      setUserName(`${user.firstname} ${user.lastname}`);
      setAccessKey(user.accesskey);
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful!");
      const timer = setTimeout(() => {
        setRedirect(true); // Set redirect to true after 2 seconds
      }, 1000); // Adjust the duration as needed

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isLoggedIn]);

  if (redirect) {
    return <Navigate to="/homepage" />; // Change to your desired route
  }

  return (
    <div className="LoginBox">
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
      <button>forgot password? click here</button>
      <ToastContainer
        position={"top-center"}
        closeOnClick={true}
        pauseOnHover={false}
        autoClose={false}
      />
    </div>
  );
};
