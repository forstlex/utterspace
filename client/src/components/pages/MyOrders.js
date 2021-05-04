import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyOrders = ({ myOrders, allUsers, allSpaces }) => {
  const orderlist = myOrders.map((order, index) => {
    const seller = allUsers.find(u => u._id === order.sellerid);
    const bookedSpace = allSpaces.find(s => s._id === order.sid);
    return (
      <div key={order._id} className="wrapper_space_item wrapper_order_item" id={index}>
        <div className="wp_image">
          <img className="wp_image_frame"
            src={bookedSpace.images[0]}
            alt="Space"
          />
        </div>
        <div className="wp_content">
          <h5 className="wp_location">{bookedSpace.location}</h5>
          <h5 className="wp_order_description">{bookedSpace.description}</h5>
          <h5 className="wp_price">${bookedSpace.price} per hour</h5>
        </div>
        <div>
          From {order.startdate}
          To {order.enddate}
        </div>
        <div>
          {seller && seller.name}
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
