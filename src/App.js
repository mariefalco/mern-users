import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "./services/authService";
import { userService } from "./services/userService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    authService.getToken();
    userService
      .getMe()
      .then(res => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/auth/sign_in");
        }
      });
  }

  logout = () => authService.logout();

  render() {
    return (
      <div>
        {localStorage.getItem("jwtToken") && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link to="/users" className="nav-item nav-link">
                    Users
                  </Link>
                </li>
              </ul>
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <button
                    class="nav-item btn btn-primary"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )}
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Welcome, {this.state.user.name}!</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col">Email</div>
                <div class="col">{this.state.user.email}</div>
              </div>
              <div class="row">
                <div class="col">Created date</div>
                <div class="col">{this.state.user.created_date}</div>
              </div>
              <div class="row">
                <div class="col">Hobby</div>
                <div class="col">{this.state.user.hobby}</div>
              </div>
              <div class="row">
                <div class="col">Responsibility</div>
                <div class="col">{this.state.user.responsibility}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
