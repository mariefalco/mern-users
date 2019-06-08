import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/userService";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    userService
      .getUsers()
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
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
    );
  }
}

export default Users;
