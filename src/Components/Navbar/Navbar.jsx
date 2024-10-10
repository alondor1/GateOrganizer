import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import menuicon from "../Assets/menu-icon.png";
import close from "../Assets/close.png";
import { Link } from "react-router-dom";
import addicon from "../Assets/addicon.png";
import bookicon from "../Assets/bookicon.png";
import phoneicon from "../Assets/phoneicon.png";
import homepageicon from "../Assets/homepageicon.png";
import { AuthContext } from "../../Context/AuthContext";
import signout from "../Assets/signout.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoggedIn, accessKey, userName } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    toast.success("Logout successful!");
    setTimeout(() => {
      setIsLoggedIn(false);
      sessionStorage.clear();
    }, 2000);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={() => setIsOpen((prev) => !prev)}>
        <img src={menuicon} alt="Menu" />
      </div>

      <img src={logo} alt="Logo" className="logo" />

      {isOpen && (
        <div className="down-menu" ref={dropdownRef}>
          <ul>
            <li>
              <Link to="/homepage">
                <img src={homepageicon} alt="Homepage" />
                Homepage
              </Link>
            </li>
            {(accessKey === "security" || accessKey === "admin") && (
              <li>
                <Link to="/EnterLog">
                  <img src={bookicon} alt="Gate Log" />
                  Gate Log
                </Link>
              </li>
            )}
            {(accessKey === "user" || accessKey === "admin") && (
              <li>
                <Link to="/EnterForm">
                  <img src={addicon} alt="Add Entry" />
                  Add New Entry
                </Link>
              </li>
            )}
            <li>
              <Link to="/contact us">
                <img src={phoneicon} alt="Contact Us" />
                Contact Us
              </Link>
            </li>
          </ul>
          <img
            src={close}
            alt="Close"
            className="close-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}

      {accessKey === "admin" && (
        <Link to="/SiteManager">
          <button className="user-management-button">Site management</button>
        </Link>
      )}

      <div className="role-holder">
        <h4>{userName}</h4>
        <p>{accessKey}</p>
      </div>

      <button className="sign-out" onClick={handleLogout}>
        <img src={signout} alt="Sign Out" />
      </button>

      <ToastContainer autoClose={1000} />
    </div>
  );
};
