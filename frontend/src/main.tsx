// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContextProvider } from "@context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // disable react strict mode to prevent receiving the same message twice
  // <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  // </React.StrictMode>
);
