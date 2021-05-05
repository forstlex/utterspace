import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import GoogleMap from '../map/GoogleMap';
import Spinner from '../layout/Spinner';
import { loadGuestSpaces } from '../../actions/listings';

const GuestListings = ({ allSpaces, loadGuestSpaces, loading }) => {

  useEffect(() => {
    if (!loading) {
      loadGuestSpaces();
    }
  }, []);

  const spaces = allSpaces.map((space, index) =>
    <div key={space._id} style={{ maxWidth: 600 }}  className="wrapper_space_item" id={`image${index}`}>
      <div className="wp_image">
        <img className="wp_image_frame"
          src={space.images[0]}
          alt="Space"
        />
      </div>
      <div className="wp_content">
        <h5 className="wp_location">{space.location}</h5>
        <h5 className="wp_description">{space.description}</h5>
        <h5 className="wp_price">${space.price} per hour</h5>
        <span className="wp_renttype">{space.renttype}</span>
        <span className={space.available ? 'wp_space_free' : 'wp_space_rent'}>{space.available ? "Available" : `This space will expire at ${space.expiredate}`}</span>
        {space.available ? <Link to="/login" style={{ float: 'right'}} className="btn btn-primary">Book</Link> : null}
      </div>
    </div>
  );

  return (
    <Fragment>
      {loading === false ? <Spinner /> :
        <div className="main_content" >
          <div className="content_listings">
            {spaces}
          </div>
          {spaces.length ?
            <div className="content_map">
              <GoogleMap spaces={allSpaces} />
            </div> : null
          }
        </div>
      }
    </Fragment>
  )
}

GuestListings.propTypes = {
  allSpaces: PropTypes.array,
  loading: PropTypes.bool,
  loadGuestSpaces: PropTypes.func
}

const mapStateToProps = state => ({
  userSpaces: state.listings.userSpaces,
  allSpaces: state.listings.allSpaces,
  loading: state.listings.loadingGuestSpaces
});

export default connect(mapStateToProps, { loadGuestSpaces })(GuestListings);