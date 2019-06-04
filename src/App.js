import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Sign_in from "./components/Sign_in";
import Registration from "./components/Registration";
import Users from "./components/Users";
import User from "./components/User";

import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/sign_in" component={Sign_in} />
          <Route path="/auth/registration" component={Registration} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/:userId" component={User} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
