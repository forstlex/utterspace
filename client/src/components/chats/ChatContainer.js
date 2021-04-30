import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaRegPaperPlane } from "react-icons/fa";

import Messages from "./Messages";
import Sidebar from "./Sidebar";
import { sendMessage, addUnreadMessage, receiveMessage } from '../../actions/messages';

import {
  LOGIN,
  USER_JOINED,
  NEW_MESSAGE,
  TYPING,
  STOP_TYPING,
  USER_LEFT
} from "../../events";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    const contactedUsers = this.props.allUsers.filter(u => u._id === this.props.contactUId);
    const chats = this.props.allMessages.filter(msg => {
      return this.props.contactUId === msg.sender_id || this.props.contactUId === msg.receiver_id
    }).map(msg => {
      const sender = this.props.allUsers.find(u => u._id === msg.sender_id);
      return {
        username: sender.name,
        message: msg.text,
        timestamp: msg.timestamp
      }
    });
    this.state = {
      socket: null,
      message: "",
      typing: false,
      chats,
      users: contactedUsers,
      typingUsers: {},
    };
  }

  componentWillMount() {
    const { socket } = this.props;

    // Whenever the server emits 'login', log the login message
    socket.on(LOGIN, data => {
      this.setState({ users: data.users });
      // console.log("On login", data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on(USER_JOINED, data => {
      this.setState({ users: data.users });
      // console.log("User joined", data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on(NEW_MESSAGE, data => {
      const { currentUser, addUnreadMessage } = this.props;
      if (data.receiver_id === currentUser._id && this.props.contactUId === data.sender_id) {
        this.addChatMessage({ username: data.username, message: data.text, timestamp: data.timestamp });
      } else if (data.receiver_id === currentUser._id) {
        addUnreadMessage({
          text: data.text,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          timestamp: data.timestamp,
        });
      }
    });

    // Whenever the server emits 'typing', show the typing message
    socket.on(TYPING, data => {
      this.addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    socket.on(STOP_TYPING, data => {
      this.removeChatTyping(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on(USER_LEFT, data => {
      this.setState({ users: data.users });
      // console.log(data.username + ' left');
      this.removeChatTyping(data);
    });

    this.setState({ socket });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contactUId !== this.props.contactUId) {
      const chats = this.props.allMessages.filter(msg => {
        return this.props.contactUId === msg.sender_id || this.props.contactUId === msg.receiver_id
      }).map(msg => {
        const sender = this.props.allUsers.find(u => u._id === msg.sender_id);
        return {
          username: sender.name,
          message: msg.text,
          timestamp: msg.timestamp
        }
      });
      this.setState({ chats })
    }
  }

  addChatMessage = ({ username, message, timestamp }) => {
    const chat = { username, message, timestamp };
    this.setState({ chats: this.state.chats.concat(chat) });
  };

  addChatTyping = data => {
    const { username } = data;
    const typingUsers = Object.assign({}, this.state.typingUsers);
    typingUsers[username] = username;
    this.setState({ typingUsers });
  };

  removeChatTyping = data => {
    let typingUsers = Object.assign({}, this.state.typingUsers);
    delete typingUsers[data.username];
    this.setState({ typingUsers });
  };

  // Sends a chat message
  handleSubmit = e => {
    e.preventDefault();
    const { message } = this.state;
    const { currentUser } = this.props;

    // if there is a non-empty message and a socket connection
    if (message) {
      const msgTime = Date.now();

      this.addChatMessage({
        username: currentUser.name,
        message: message,
        timestamp: msgTime
      });

      const data = {
        text: message,
        sender_id: currentUser._id,
        receiver_id: this.props.contactUId,
        timestamp: msgTime,
        username: currentUser.name
      };

      this.props.sendMessage({
        text: message,
        sender_id: currentUser._id,
        receiver_id: this.props.contactUId,
        timestamp: msgTime,
      });
      // tell server to execute 'new message' and send along one parameter
      this.state.socket.emit(NEW_MESSAGE, data);
    }
    this.setState({ message: "" });
  };

  onChange = e => {
    if (!this.state.typing) {
      this.setState({ typing: true });
      this.state.socket.emit(TYPING);
    }

    if (this.stopTyping) clearInterval(this.stopTyping);

    this.stopTyping = setTimeout(() => {
      if (this.state.typing) {
        this.state.socket.emit(STOP_TYPING);
        this.setState({ typing: false });
      }
    }, 400);

    this.setState({ message: e.target.value });
  };

  render() {
    const { message, typingUsers, chats, users } = this.state;
    const { currentUser, allUsers, contactUId } = this.props;
    const connectedUsers = allUsers.filter(u => u._id !== currentUser._id);

    const disabled = this.state.message ? false : true;

    return (
      <Fragment>
        <div className="fw">
          <div className="d-flex main-wrapper">
            <div id="sidebar">
              <Sidebar onlineUsers={users} conUsers={connectedUsers} contactUId={contactUId} />
            </div>
            <div style={{ width: 15 + "px" }} className="spacer"></div>
            <div id="chatbox" className="d-flex">
              <Messages
                typingUsers={typingUsers}
                chats={chats}
                contactUId={contactUId}
                myUsername={currentUser.name}
              />
              <form className="d-flex" onSubmit={this.handleSubmit}>
                <input
                  value={message}
                  onChange={this.onChange}
                  placeholder="Type a message here..."
                />
                <button type="submit" disabled={disabled}>
                  <FaRegPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ChatContainer.propTypes = {
  allUsers: PropTypes.array,
  allMessages: PropTypes.array,
  currentUser: PropTypes.object
}

const mapStateToProps = state => ({
  allUsers: state.auth.allUsers,
  allMessages: state.messages.all,
  currentUser: state.auth.user
})

export default connect(mapStateToProps, { sendMessage, addUnreadMessage, receiveMessage })(ChatContainer);
