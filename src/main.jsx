import React from "react";
import ReactDOM from "react-dom/client";
import Web5Provider from "./store/web5-context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web5Provider>
    <App />
  </Web5Provider>
);
