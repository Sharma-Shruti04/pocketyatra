import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Add this
import App from "./App";
import "./index.css";

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "660248739509-s1eg4n3ncoa0agr4k7u16c056lihcank.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>   {/* ✅ Wrap here */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
