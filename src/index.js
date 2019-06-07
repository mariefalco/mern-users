import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker();
