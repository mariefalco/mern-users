import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";

class Sign_in extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    authService
      .login(email, password)
      .then(result => {
        authService.setToken(result);
        this.setState({ message: "" });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          message: error.response.data.message
        });
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          {message !== "" && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <h2 class="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" class="sr-only">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={this.onChange}
            required
          />
          <label for="inputPassword" class="sr-only">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p>
            Not a member?{" "}
            <Link to="/auth/register">
              <span class="glyphicon glyphicon-plus-sign" aria-hidden="true" />{" "}
              Register here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Sign_in;
