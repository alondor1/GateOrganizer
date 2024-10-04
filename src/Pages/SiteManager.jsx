import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { ManageBox } from "../Components/ManageBox/ManageBox";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const SiteManager = () => {
  const { isLoggedIn, accessKey } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      {accessKey === "admin" ? "" : <Navigate to="/homepage" />}
      <Navbar />
      <ManageBox />
    </div>
  );
};
