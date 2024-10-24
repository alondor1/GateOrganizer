import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { EnterForm } from "./Pages/EnterForm";
import { EnterLog } from "./Pages/EnterLog";
import { Homepage } from "./Pages/homepage";
import { ContactUs } from "./Pages/ContactUs";
import { SiteManager } from "./Pages/SiteManager";
import { PWDpage } from "./Pages/PWDpage";
import { AuthProvider } from "./Context/AuthContext";
import { ContructorsPage } from "./Pages/ContructorsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/EnterForm",
    element: (
      <AuthProvider>
        <EnterForm />
      </AuthProvider>
    ),
  },
  {
    path: "/EnterLog",
    element: (
      <AuthProvider>
        <EnterLog />
      </AuthProvider>
    ),
  },
  {
    path: "/Contact us",
    element: (
      <AuthProvider>
        <ContactUs />
      </AuthProvider>
    ),
  },
  {
    path: "/Homepage",
    element: (
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    ),
  },
  {
    path: "/SiteManager",
    element: (
      <AuthProvider>
        <SiteManager />
      </AuthProvider>
    ),
  },
  {
    path: "/password-reset/:token",
    element: <PWDpage />,
  },
  {
    path: "/contructors-page/:token",
    element: <ContructorsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
