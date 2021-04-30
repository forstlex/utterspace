import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import { removeUnreadMessage } from '../../actions/messages';

const colors = ['#00BCD4', '#FFB300', '#E91E63', '#8BC34A', '#00cfb6', '#795548']

const SideBar = ({ conUsers, contactUId, unReads, removeUnreadMessage }) => {
  let history = useHistory();
  const _renderUser = (user, index) => {
    /*
    input   0 1 2 3 4 5 6 7 8 9 10 11 12
    output  0 1 2 3 4 5 0 1 2 3  4  5  0
    */
    const i = index % colors.length;
    const unRead = unReads.find(u => u.uId === user._id);
    const userName = user.name

    return (
      <div className="d-flex">
        <div className="u-pp" style={{ background: colors[i] }}>
          {/* {user.charAt(0)} */}
        </div>
        <span style={{ lineHeight: 40 + 'px', fontSize: 13 + 'px' }}>{userName}</span>
        {unRead && <span className="message-unread">{unRead.count}</span>}
      </div>
    )
  }

  const clickUserInSideBar = (uId) => {
    // Checking the new message in selected user
    const unMsg = unReads.find(u => u.uId === uId);
    if (unMsg) {
      setTimeout(() => {
        removeUnreadMessage(uId);
      }, 1000);      
    }
    history.push(`/message/${uId}`);
  }

  return (
    <div>
      <h2>People ({conUsers.length})</h2>
      <ul className="user-list neutralize">
        {
          conUsers.map((user, index) => (
            <li key={index} onClick={() => clickUserInSideBar(user._id)} style={user._id === contactUId ? { background: '#c7edfc' } : { background: 'white' }}>
              {_renderUser(user, index)}
            </li>
          ))
        }
      </ul>
    </div>
  );

}

SideBar.propTypes = {
  allUsers: PropTypes.array,
  unReads: PropTypes.array,
  removeUnreadMessage: PropTypes.func
}

const mapStateToProps = state => ({
  allUsers: state.auth.allUsers,
  unReads: state.messages.unReads
})

export default connect(mapStateToProps, { removeUnreadMessage })(SideBar);

