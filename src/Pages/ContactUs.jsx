import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import israelflag from "../Components/Assets/israelflag.png";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ContactUs = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      <Navbar />

      <img src={israelflag} alt="" />
    </div>
  );
};
