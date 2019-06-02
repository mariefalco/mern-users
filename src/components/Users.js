import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    authService.getToken();
    userService
      .getUsers()
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
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
                  <Link to="/" className="nav-item nav-link">
                    Home
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
              <h3 class="panel-title">USERS LIST</h3>
            </div>
            <div class="panel-body">
              <div class="row border-bottom font-weight-bold">
                <div class="col">Name</div>
                <div class="col">Email</div>
                <div class="col">Hobby</div>
              </div>
              {this.state.users.map(user => (
                <div class="row border-top">
                  <div class="col">
                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                  </div>
                  <div class="col">{user.email}</div>
                  <div class="col">{user.hobby}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
