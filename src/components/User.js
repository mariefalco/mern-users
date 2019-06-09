import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/userService";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friends: []
    };
  }

  recieveData = () => {
    const { userId } = this.props.match.params;
    userService
      .getUser(userId)
      .then(res => {
        this.setState({ user: res.data, friends: res.data.friends });
        console.log(this.state.user);
        console.log(this.state.friends);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.recieveData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.recieveData();
    }
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{this.state.user.name}</h3>
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
            <div class="row">
              <div class="col">Friends</div>
            </div>
            <div class="row border-bottom font-weight-bold">
              <div class="col">Name</div>
              <div class="col">Email</div>
              <div class="col">Hobby</div>
            </div>
            {this.state.friends.map(user => (
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

export default User;
