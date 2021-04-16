import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import GoogleMap from '../map/GoogleMap';
import Spinner from '../layout/Spinner';
import { deleteSpace } from '../../actions/listings';

const MyListings = ({ userSpaces, allSpaces, loadingSpace, deleteSpace }) => {

  const deleteLocation = (id) => {
    deleteSpace(id);
  }
  const spaces = userSpaces.map((space, index) =>
    <div key={space._id} className="wrapper_space_item" id={`image${index}`}>
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
        <span className="wp_renttype">{space.renttype}</span>
        <button onClick={() => deleteLocation(space._id)}>Delete</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      {loadingSpace === false ? <Spinner /> :
        <div className="main_content" >
          <div className="content_listings" id="Test">
            {spaces}
            <Link to="/my-listings/new" className="btn btn-primary">Add a new listings</Link>
          </div>
          <div style={{ height: "500px" }}>
            <GoogleMap spaces={userSpaces} />
          </div>
        </div>
      }
    </Fragment>
  )
}

MyListings.propTypes = {
  userSpaces: PropTypes.array,
  allSpaces: PropTypes.array,
  loadingSpace: PropTypes.bool,
  deleteSpace: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userSpaces: state.listings.userSpaces,
  allSpaces: state.listings.allSpaces,
  loadingSpace: state.listings.loadingSpace
})

export default connect(mapStateToProps, { deleteSpace })(MyListings);