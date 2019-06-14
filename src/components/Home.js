import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/userService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    userService
      .getMe()
      .then(res => {
        this.setState({ user: res.data });
        console.log(this.state.user);
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
            <div class="row">
              <div class="col">
                <Link to={`/friend_requests`}>Friend requests</Link>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Link to={`/friends`}>Friends</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
