import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import cyber from "../Components/Assets/cyber-security.jpg";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const Homepage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      <Navbar />
      <img src={cyber} alt="" />
    </div>
  );
};
