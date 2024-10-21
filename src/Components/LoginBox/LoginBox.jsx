import React, { useState, useContext, useEffect } from "react";
import "./LoginBox.css";
import axiosInstance from "../../axiosConfig";
import loginimg from "../Assets/loginimg.png";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      setMessage(response.data.message);
      toast.success(
        <p>
          reset password link sent, <br />
          please check your email
        </p>
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("USER NOT FOUND !");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export const LoginBox = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, setIsLoggedIn, setUserName, setAccessKey } =
    useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);
  const [ForgotPasswordState, setForgotPasswordState] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", loginData);

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
      <img src={loginimg} alt="" />
      {!ForgotPasswordState ? (
        <form onSubmit={handleLogin}>
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
          <br />
          <button onClick={() => setForgotPasswordState(true)}>
            forgot password?
          </button>
        </form>
      ) : (
        <div>
          <ForgotPassword />
          <br />
          <button onClick={() => setForgotPasswordState(false)}>back</button>
        </div>
      )}
      <ToastContainer
        position={"top-center"}
        closeOnClick={true}
        pauseOnHover={false}
        autoClose={false}
      />
    </div>
  );
};
