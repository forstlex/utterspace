import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyOrders = ({ myOrders, allUsers, allSpaces }) => {
  const orderlist = myOrders.map((order, index) => {
    const seller = allUsers.find(u => u._id === order.sellerid);
    const bookedSpace = allSpaces.find(s => s._id === order.sid);
    return (
      <div key={order._id} style={{ maxWidth: 900, margin: '15px auto' }} className="wrapper_space_item" id={index}>
        <div className="wp_image">
          <img className="wp_image_frame"
            src={bookedSpace.images[0]}
            alt="Space"
          />
        </div>
        <div className="wp_content">
          <h5 className="wp_location">{bookedSpace.location}</h5>
          <h5 className="wp_order_description">{bookedSpace.description}</h5>
          <h5 className="wp_location">${bookedSpace.price} per hour. &emsp; From {order.startdate} &emsp; To {order.enddate}</h5>
          <h5 className="wp_location">{seller && seller.name}</h5>
        </div>
      </div>
    );
  });
  return (
    <Fragment>
      {orderlist}
    </Fragment>
  )
}

MyOrders.propTypes = {
  myOrders: PropTypes.array,
  allUsers: PropTypes.array,
  allSpaces: PropTypes.array,
}

const mapStateToProps = state => ({
  myOrders: state.bookings.myOrders,
  allUsers: state.auth.allUsers,
  allSpaces: state.listings.allSpaces,
});

export default connect(mapStateToProps, {})(MyOrders);
