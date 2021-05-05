import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import { sendMessage } from '../../actions/messages';
import { sendContactRequest } from '../../actions/contacts';
import { sendMessageEmail } from '../../actions/email';

const BuyInformation = (props) => {

  let history = useHistory();
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

  const sendRequest = props.contactRequests.find(c => c.seller_id === seller._id && c.buyer_id === props.currentUser._id)

  const clickContactButton = () => {
    if (!sendRequest) {
      const msgTime = Date.now();
      const data = {
        text: 'Hi, I am interested in your space, we can chat',
        sender_id: props.currentUser._id,
        receiver_id: seller._id,
        timestamp: msgTime,
      };

      props.sendMessage(data);
      props.sendContactRequest(seller._id, props.currentUser._id);
      const host = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://utterspace.herokuapp.com/';
      props.sendMessageEmail(`${host}message/${space.userid}`);
    }

    history.push(`/message/${space.userid}`);
  }

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
          <button className="btn btn-primary" onClick={clickContactButton}>{sendRequest ? 'Message' : 'Contact'}</button>
          <Link className="btn btn-primary" to={`/booking/${space._id}`} style={{ float: 'right' }}>Book</Link>
        </div>
      </div>

    </Fragment>
  )
}

BuyInformation.propTypes = {
  buySpaces: PropTypes.array,
  allUsers: PropTypes.array,
  contactRequests: PropTypes.array,
  props: PropTypes.object,
  currentUser: PropTypes.object,
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces,
  allUsers: state.auth.allUsers,
  contactRequests: state.contacts,
  currentUser: state.auth.user
})

export default connect(mapStateToProps, { sendMessage, sendContactRequest, sendMessageEmail })(BuyInformation);