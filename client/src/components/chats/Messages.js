import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this)
  }

  scrollDown() {
    const { messages } = this.refs
    messages.scrollTop = messages.scrollHeight
  }

  componentDidMount() {
    this.scrollDown()
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown()
  }

  getTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US");
  }

  renderTypingUsers() {
    // We cannot interate through object using es6 map function like we do in array
    // Instead here we use lodash map function
    return _.map(this.props.typingUsers, user => {
      return (
        <li className="user-typing text-muted" key={user}>
          <i>{`${user} is typing...`}</i>
        </li>
      );
    });
  }

  renderChat(chats, myUsername) {
    if (chats.length > 0) {
      const userUnRead = this.props.unReads.find(u => u.uId === this.props.contactUId)
      return chats.map((chat, index) => {
        const msgAlign = chat.username === myUsername ? 'right' : ''
        return (
          <li key={index} className={msgAlign}>
            <div>
              <div className={`m-box d-flex ${msgAlign}`}>
                <span className="m">{chat.message}</span>
                <small>{this.getTime(chat.timestamp)}</small>
              </div>
              {chat.username !== myUsername && <span className="text-muted sender">{chat.username}</span>}
            </div>
            {userUnRead && (index + userUnRead.count) === chats.length - 1 && <hr style={{ borderTop: '2px solid red' }} />}
          </li>
        )
      })
    } else {
      return <li className="no-msg text-muted">Send a message to start a conversation.</li>
    }
  }

  render() {
    const { chats, myUsername } = this.props;
    return (
      <ul ref="messages" className="messages neutralize">
        {
          this.renderChat(chats, myUsername)
        }
        {
          // this.renderTypingUsers()
        }
      </ul>
    );
  }

}

Messages.propTypes = {
  unReads: PropTypes.array
}

const mapStateToProps = state => ({
  unReads: state.messages.unReads
});

export default connect(mapStateToProps, {})(Messages);