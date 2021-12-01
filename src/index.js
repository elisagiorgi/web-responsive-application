import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeContext } from "./context/ThemeContext";

const theme = {
  palette: ["#8c7386", "#AA959F"],
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
