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
    const saved = sessionStorage.getItem("isLoggedIn");
    return saved === "true";
  });

  const [userName, setUserName] = useState(() => {
    const saved = sessionStorage.getItem("userName");
    return saved;
  });

  const [accessKey, setAccessKey] = useState(() => {
    const saved = sessionStorage.getItem("accessKey");
    return saved;
  });

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    sessionStorage.setItem("accessKey", accessKey);
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
