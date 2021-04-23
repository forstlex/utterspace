import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from "socket.io-client";

import ChatContainer from "./ChatContainer";
import { VERIFY_USER, ADD_USER } from "../../events";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      username: "Kirill",
      socket: null
    };
  }

  componentWillMount() {
    console.log('Current User:', this.props.currentUser);
    this.initSocket();
  }

  /*
   * Connect to and initialize the socket.
   */
  initSocket = () => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://utterspace.herokuapp.com/';
    const socket = io.connect(host);
    socket.on("connect", () => {
      if (this.props.currentUser) {
        socket.emit(VERIFY_USER, this.props.currentUser.name, this.reconnet);
      }
    });
    this.setState({ socket });
  };

  /*
   * To reconnect user if connection is lost
   */
  reconnet = ({ username, isUser }) => {
    const { socket } = this.state;
    if (isUser) {
      this.setState({ username: "" });
    } else {
      socket.emit(ADD_USER, username);
    }
  };

  setUsername = username => {
    this.setState({ username });
  };

  render() {
    const { socket, username } = this.state;
    return (
      <div className="chat-container">
        <ChatContainer username={username} socket={socket} />
      </div>
    );
  }
}

Layout.propTypes = {
  currentUser: PropTypes.object
}

const mapStateToProps = state => ({
  currentUser: state.auth.user
})
export default connect(mapStateToProps, {})(Layout);
