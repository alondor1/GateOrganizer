import "./Navbar.css";
import logo from "../Assets/logo.png";
import menuicon from "../Assets/menu-icon.png";
import { useContext, useState } from "react";
import close from "../Assets/close.png";
import { Link } from "react-router-dom";
import addicon from "../Assets/addicon.png";
import bookicon from "../Assets/bookicon.png";
import phoneicon from "../Assets/phoneicon.png";
import homepageicon from "../Assets/homepageicon.png";
import { Clock } from "../Clock/Clock";
import { AuthContext } from "../../Context/AuthContext";
import signout from "../Assets/signout.png";

export const Navbar = () => {
  const [isOpen, SetIsOpen] = useState(true);

  const { setIsLoggedIn, accessKey, userName } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("accessKey");
  };

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={() => SetIsOpen((prev) => !prev)}>
        <img src={menuicon} alt="" />
      </div>
      {!isOpen ? (
        <div className="down-menu">
          <ul>
            <li>
              <Link to="/homepage">
                <img src={homepageicon} alt="" />
                Homepage
              </Link>
            </li>

            {accessKey === "security" || accessKey === "admin" ? (
              <li>
                <Link to="/EnterLog">
                  <img src={bookicon} alt="" />
                  Gate Log
                </Link>
              </li>
            ) : (
              ""
            )}
            {accessKey === "user" || accessKey === "admin" ? (
              <li>
                <Link to="/EnterForm">
                  <img src={addicon} alt="" />
                  Add new entry
                </Link>
              </li>
            ) : (
              ""
            )}
            <li>
              <Link to="/contact us">
                <img src={phoneicon} alt="" />
                contact us
              </Link>
            </li>
          </ul>
          <img src={close} alt="" onClick={() => SetIsOpen((prev) => !prev)} />
        </div>
      ) : (
        <div></div>
      )}
      <img src={logo} alt="" className="logo" />
      {accessKey === "admin" ? (
        <Link to="/SiteManager">
          <button>user mangement</button>
        </Link>
      ) : (
        ""
      )}
      <Clock />
      <div className="role-holder">
        <h4>{userName}</h4>
        <p>{accessKey}</p>
      </div>
      <button className="sign-out" onClick={() => handleLogout()}>
        <img src={signout} alt="" />
      </button>
    </div>
  );
};
