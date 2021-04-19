import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

const BuyInformation = ({ allUsers, buySpaces }) => {

  const space = buySpaces.find(space => space._id);
  if (!space) {
    return (
      <Fragment>
        <h3>There is not sell information about this sell.</h3>
      </Fragment>
    )
  }
  const uId = space.userid;
  const seller = allUsers.find(u => uId === u._id);
  const host = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://utterspace.herokuapp.com/';
  const images = space.images.map(file => {
    const url = `${host}${file}`;
    return {
      original: `${url}`,
      thumbnail: `${url}`
    }
  });

  return (
    <Fragment>
      <div className="gallery-section">
        <ImageGallery items={images} />
      </div>

      <div className="vendor_detail">
        <h3>Vendor Name: {seller.name}</h3>
      </div>
      <div className="space_available"><span>Available</span></div>
      <div className="vendor_detail">
        <h3>Description: {space.description}</h3>
      </div>

      <Link className="btn btn-primary" to="/messages">Contact</Link>
      <Link className="btn btn-primary" to="/booking">Book</Link>
    </Fragment>
  )
}

BuyInformation.propTypes = {
  buySpaces: PropTypes.array
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces,
  allUsers: state.auth.allUsers
})

export default connect(mapStateToProps, {})(BuyInformation);