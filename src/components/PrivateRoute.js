import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authService } from "../services/authService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isLogged() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/auth/sign_in", state: { from: props.location } }}
        />
      )      
    }
  />
);

export default PrivateRoute;
