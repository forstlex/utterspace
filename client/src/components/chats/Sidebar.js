import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const colors = ['#00BCD4','#FFB300','#E91E63', '#8BC34A', '#00cfb6', '#795548']

class SideBar extends Component {
  _renderUser(user, index){
    /*
    input   0 1 2 3 4 5 6 7 8 9 10 11 12
    output  0 1 2 3 4 5 0 1 2 3  4  5  0
    */
    const i = index%colors.length;

    const userName = user.name

    return (
      <div className="d-flex">
        <div className="u-pp" style={{ background:colors[i] }}>
          {/* {user.charAt(0)} */}
        </div>
        <span style={{lineHeight:40+'px',fontSize: 13+'px'}}>{userName}</span>
      </div>
    )
  }

  clickUserInSideBar = (uId) => {
  }

  render() {
    const { conUsers, contactUId } = this.props
    
    return (
      <div>
        <h2>People ({conUsers.length})</h2>
        <ul className="user-list neutralize">
          {
            conUsers.map((user, index) => (
              <li key={index} onClick={() => this.clickUserInSideBar(user._id)} style={ user._id === contactUId ? { background: '#c7edfc'} : { background: 'white'}}>
                {this._renderUser(user, index)}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}

SideBar.propTypes = {
  allUsers: PropTypes.array
}

const mapStateToProps = state => ({
  allUsers: state.auth.allUsers
})

export default connect(mapStateToProps, {})(SideBar);

