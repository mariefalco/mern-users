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
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  sendMessage = e => {
    e.preventDefault();
    socket.emit("NEW_MESSAGE", {
      body: this.state.message,
      authorId: localStorage.getItem("id")
    });
    this.setState({ message: "" });
  };

  render() {
    const { message } = this.state;
    socket.on("CHAT_MESSAGES", messages =>
      this.setState({ messages: messages })
    );
    return (
      <div class="container">
        <div class="panel panel-primary">
          <div class="panel panel-default">
            <div class="panel-body chat-page">
              <ul class="chat">
                {this.state.messages.map(message => (
                  <li
                    class={`text-${
                      message.author._id === localStorage.getItem("id")
                        ? "right"
                        : "left"
                    } clearfix`}
                  >
                    <div class="chat-body clearfix">
                      <div class="header">
                        <strong class="primary-font">
                          <Link to={`/users/${message.author._id}`}>
                            {message.author.name}
                          </Link>
                        </strong>
                      </div>

                      <p>{message.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </div>
            <div class="panel-footer">
              <form onSubmit={this.sendMessage}>
                <div class="input-group">
                  <input
                    autoFocus
                    type="text"
                    class="form-control"
                    placeholder="Type your message here..."
                    name="message"
                    value={message}
                    onChange={this.onChange}
                    required
                  />
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-success">
                      Send
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
