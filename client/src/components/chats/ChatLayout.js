import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from "socket.io-client";

import ChatContainer from "./ChatContainer";
import { VERIFY_USER, ADD_USER } from "../../events";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket || null
    };
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {});
    if (!this.state.socket) {
      this.initSocket();
    }
  }

  componentUnWillMount() {
    this.unlisten();
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

  render() {
    const { socket } = this.state;
    return (
      <div className="chat-container">
        <ChatContainer contactUId={this.props.match.params.uid} socket={socket} />
      </div>
    );
  }
}

Layout.propTypes = {
  currentUser: PropTypes.object,
  socket: PropTypes.object
}

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  socket: state.messages.socket
})
export default connect(mapStateToProps, {})(Layout);
