import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    axios
      .post("/api/home/auth/register", { name, email, password })
      .then(result => {
        this.props.history.push("/auth/sign_in");
      });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Register</h2>
          <label for="inputName" class="sr-only">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.onChange}
            required
          />
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
            Register
          </button>
          <p>
            Already a member?{" "}
            <Link to="/auth/sign_in">
              <span class="glyphicon glyphicon-plus-sign" aria-hidden="true" />{" "}
              Sing in here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Create;
