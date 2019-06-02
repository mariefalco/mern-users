import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import serviceWorker from "./serviceWorker";
import App from "./App";
import Sign_in from "./components/Sign_in";
import Register from "./components/Register";
import Users from "./components/Users";
import User from "./components/User";

import NotFound from "./components/NotFound";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/auth/sign_in" component={Sign_in} />
        <Route path="/auth/register" component={Register} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:userId" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
serviceWorker();
