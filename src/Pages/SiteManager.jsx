import React, { useContext, useState } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { ManageBox } from "../Components/ManageBox/ManageBox";
import { HistoryBox } from "../Components/HistoryBox/HistoryBox";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const SiteManager = () => {
  const { isLoggedIn, accessKey } = useContext(AuthContext);
  const [box, setBox] = useState("");
  return (
    <div>
      {isLoggedIn ? "" : <Navigate to="/" />}
      {accessKey === "admin" ? "" : <Navigate to="/homepage" />}
      <Navbar />
      <br />
      <div>
        <button onClick={() => setBox("ManageBox")}> user management</button>
        <button onClick={() => setBox("HistoryBox")}>history management</button>
      </div>
      {box === "ManageBox" ? <ManageBox /> : ""}
      {box === "HistoryBox" ? <HistoryBox /> : ""}
    </div>
  );
};
