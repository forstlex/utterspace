import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

const BuyInformation = (props) => {

  const space = props.buySpaces.find(space => space._id === props.match.params.id);
  if (!space) {
    return (
      <Fragment>
        <h3>There is not sell information about this sell.</h3>
      </Fragment>
    );
  }

  const uId = space.userid;
  const seller = props.allUsers.find(u => uId === u._id);
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
      <div className="seller-information">
        <div className="vendor-name">
          <h3>Vendor Name: {seller.name}</h3>
        </div>
        <div className="space-available">
          <span>Availability: Available</span>
        </div>
        <div className="vendor-detail">
          <h3>Description: {space.description}</h3>
        </div>
        <div className="action-buttons">
          <Link className="btn btn-primary" to={`/message/${space.userid}`}>Contact</Link>
          <Link className="btn btn-primary" to={`/booking/${space._id}`} style={{ float: 'right' }}>Book</Link>
        </div>
      </div>

    </Fragment>
  )
}

BuyInformation.propTypes = {
  buySpaces: PropTypes.array,
  allUsers: PropTypes.array,
  props: PropTypes.object
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces,
  allUsers: state.auth.allUsers
})

export default connect(mapStateToProps, {})(BuyInformation);