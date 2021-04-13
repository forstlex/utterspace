import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const MyListings = ({ userSpaces, allSpaces, loadingSpace }) => {
  const spaces = userSpaces.map(space => 
    <div key={space._id} className="wrapper_space_item">
      <div className="wp_image">
        <img
          src={space.images[0]}
          alt="Space"
        />
      </div>
      <div className="wp_content">
        <h5 className="wp_location">{space.location}</h5>
        <h5 className="wp_description">{space.description}</h5>
        <h5 className="wp_price">${space.price} per hour</h5>
        <h5 className="wp_renttype">{space.renttype}</h5>
      </div>
    </div>
  );

  return (
    <Fragment>
      {loadingSpace === false ? <Spinner /> : 
        <div>
          {spaces}
          <Link to="/my-listings/new" className="btn btn-primary">Add a new listings</Link>
        </div>
      }
    </Fragment>
  )
}

MyListings.propTypes = {
  userSpaces: PropTypes.array,
  allSpaces: PropTypes.array,
  loadingSpace: PropTypes.bool
}

const mapStateToProps = state => ({
  userSpaces: state.listings.userSpaces,
  allSpaces: state.listings.allSpaces,
  loadingSpace: state.listings.loadingSpace
})

export default connect(mapStateToProps, {})(MyListings);