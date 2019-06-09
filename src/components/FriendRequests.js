import React, { Component } from "react";
import { Link } from "react-router-dom";
import { friendService } from "../services/friendService";

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend_requests: []
    };
  }

  componentDidMount() {
    friendService
      .getMyFriendRequests()
      .then(res => {
        this.setState({ friend_requests: res.data });
        console.log(this.state.friend_requests);
      })
      .catch(error => {
        console.log(error);
      });
  }

  acceptFriendRequest = e => {
    friendService
      .acceptFriendRequest(e.target.name)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  rejectFriendRequest = e => {
    friendService
      .rejectFriendRequest(e.target.name)
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
            <h3 class="panel-title">FRIEND REQUESTS LIST</h3>
          </div>
          <div class="panel-body">
            <div class="row border-bottom font-weight-bold">
              <div class="col">Name</div>
              <div class="col">Email</div>
              <div class="col" />
            </div>
            {this.state.friend_requests.map(user => (
              <div class="row border-top">
                <div class="col">
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </div>
                <div class="col">{user.email}</div>
                <div class="col">
                  <form
                    name={user._id}
                    class="form-signin"
                    onSubmit={this.acceptFriendRequest}
                  >
                    <button type="submit" class="btn btn-success btn-sm">
                      Accept
                    </button>
                  </form>
                </div>
                <div class="col">
                  <form
                    name={user._id}
                    class="form-signin"
                    onSubmit={this.rejectFriendRequest}
                  >
                    <button type="submit" class="btn btn-danger btn-sm">
                      Reject
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

export default FriendRequests;
