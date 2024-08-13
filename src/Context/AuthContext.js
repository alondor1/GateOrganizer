import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: "",
  setUserName: () => {},
  accessKey: "",
  setAccessKey: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true";
  });

  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem("userName");
    return saved;
  });

  const [accessKey, setAccessKey] = useState(() => {
    const saved = localStorage.getItem("accessKey");
    return saved;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("accessKey", accessKey);
  }, [accessKey]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        accessKey,
        setAccessKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
