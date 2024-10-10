import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { HomeComponent } from "../Components/HomeComponent/HomeComponent";

export const Homepage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      <Navbar />
      <HomeComponent />
    </div>
  );
};
