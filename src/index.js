import { Common } from "matter-js";
import { decomp } from "poly-decomp";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

Common.setDecomp(require("poly-decomp"));
window.decomp = decomp;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
