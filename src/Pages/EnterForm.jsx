import React, { useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { QuickForm } from "../Components/Form/QuickForm";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const EnterForm = () => {
  const { isLoggedIn, accessKey } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      {accessKey === "user" || accessKey === "admin" ? (
        ""
      ) : (
        <Navigate to="/homepage" />
      )}
      <Navbar />
      <button>schedule manually</button>
      <QuickForm />
    </div>
  );
};
