import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authService } from "../services/authService";

const UnauthorizedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isLogged() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default UnauthorizedRoute;
