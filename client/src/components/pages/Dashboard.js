import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUserSpaces } from '../../actions/listings';

const Dashboard = ({ user, loadUserSpaces }) => {

  return (
    <Fragment>
      Dashboard Page
    </Fragment>
  )
}

Dashboard.propTypes = {
  loadUserSpaces: PropTypes.func.isRequired,  
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUserSpaces })(Dashboard);