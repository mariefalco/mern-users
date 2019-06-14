import React, { Component } from "react";
import { Link } from "react-router-dom";
import { chatService } from "../services/chatService";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }

  componentDidMount() {
    chatService
      .getMessages()
      .then(res => {
        this.setState({ messages: res.data });
        console.log(this.state.messages);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  sendMessage = e => {
    e.preventDefault();
    socket.emit("new message", {
      body: this.state.message,
      authorId: localStorage.getItem("id")
    });
    this.setState({ message: "" });
  };

  render() {
    const { message } = this.state;
    socket.on("chat messages", mess => this.setState({ messages: mess }));
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <form onSubmit={this.sendMessage}>
              <div class="form-group row">
                <div class="col-sm-10">
                  <input
                    autoFocus
                    type="text"
                    class="form-control"
                    placeholder="Write a message"
                    name="message"
                    value={message}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div class="col-sm-2">
                  <button type="submit" class="btn btn-success">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="panel-body" id="messages">
            {this.state.messages.map(message => (
              <div class="row border-top">
                <div class="col-sm-2">
                  <Link to={`/users/${message.author._id}`}>
                    {message.author.name}
                  </Link>
                </div>
                <div class="col-sm-10">
                  <p>{message.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
