import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import GoogleMap from '../map/GoogleMap';

const BuyListings = ({ buySpaces }) => {

  let history = useHistory();
  const clickImage = (id) => {
    history.push(`/vendor-info/${id}`)
  }
  const listItems = buySpaces.map((space, index) =>
    <div key={space._id} className="wrapper_space_item" id={`image${index}`}>
      <div className="wp_image" onClick={()=> clickImage(space._id)}>
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
      </div>
    </div>
  );
  return (
    <Fragment>
      <div className="main_content" >
        <div className="content_listings">
          {listItems}
        </div>
        {listItems.length ?
          <div className="content_map">
            <GoogleMap spaces={buySpaces} />
          </div> : null
        }

      </div>
    </Fragment>
  )
}

BuyListings.propTypes = {
  buySpaces: PropTypes.array
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces
})

export default connect(mapStateToProps, {})(BuyListings);