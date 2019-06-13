import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import UnauthorizedRoute from "./components/UnauthorizedRoute";

import Home from "./components/Home";
import Sign_in from "./components/Sign_in";
import Registration from "./components/Registration";
import Users from "./components/Users";
import User from "./components/User";
import FriendRequests from "./components/FriendRequests";
import Friends from "./components/Friends";

import Chat from "./components/Chat";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <UnauthorizedRoute path="/auth/sign_in" component={Sign_in} />
          <UnauthorizedRoute
            path="/auth/registration"
            component={Registration}
          />

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute path="/users/:userId" component={User} />

          <PrivateRoute
            exact
            path="/friend_requests"
            component={FriendRequests}
          />
          <PrivateRoute exact path="/friends" component={Friends} />

          <PrivateRoute exact path="/chat" component={Chat} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
