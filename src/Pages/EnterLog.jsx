import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { EnterTable } from "../Components/EnterTable/EnterTable";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const EnterLog = () => {
  const { isLoggedIn, accessKey } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      {accessKey === "admin" || accessKey === "security" ? (
        ""
      ) : (
        <Navigate to="/homepage" />
      )}
      <Navbar />
      <EnterTable />
    </div>
  );
};
