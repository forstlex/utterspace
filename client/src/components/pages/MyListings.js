import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MyListings = ({ userSpaces, allSpaces }) => {
  return (
    <Fragment>
      <Link to="/my-listings/new" className="btn btn-primary">Add a new listings</Link>
    </Fragment>
  )
}

MyListings.propTypes = {
  userSpaces: PropTypes.array,
  allSpaces: PropTypes.array
}

const mapStateToProps = state => ({
  userSpaces: state.listings.userSpaces,
  allSpaces: state.listings.allSpaces
})

export default connect(mapStateToProps, {})(MyListings);