import React, { Component } from "react";
import { Link } from "react-router-dom";
import { friendService } from "../services/friendService";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    friendService
      .getMyFriends()
      .then(res => {
        this.setState({ friends: res.data });
        console.log(this.state.friends);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteFriend = e => {
    friendService
      .deleteFriend(e.target.id)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">FRIENDS LIST</h3>
          </div>
          <div class="panel-body">
            <div class="row border-bottom font-weight-bold">
              <div class="col">Name</div>
              <div class="col">Email</div>
              <div class="col" />
            </div>
            {this.state.friends.map(user => (
              <div class="row border-top">
                <div class="col">
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </div>
                <div class="col">{user.email}</div>
                <div class="col">
                  <form
                    id={user._id}
                    class="form-signin"
                    onSubmit={this.deleteFriend}
                  >
                    <button type="submit" class="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
