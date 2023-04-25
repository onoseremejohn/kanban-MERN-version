import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./AppContext";
import "./index.css";
import { UserProvider } from "./UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <UserProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </UserProvider>
  // </React.StrictMode>
);
