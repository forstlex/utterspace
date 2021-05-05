import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RespondBooking = ({ allBookings, currentUser, allUsers, allSpaces }) => {
  console.log('All Bookings:', allBookings, currentUser._id);
  const bksResponds = allBookings.filter(b => b.sellerid === currentUser._id && b.state === 'waiting');
  console.log('MyBookings:', bksResponds);

  const acceptBooking = (bookingId) => {

  }

  const rejectBooking = (bookingId) => {

  }

  const responds = bksResponds.map((order, index) => {
    const seller = allUsers.find(u => u._id === order.sellerid);
    const bookedSpace = allSpaces.find(s => s._id === order.sid);
    return (
      <div key={order._id} style={{ maxWidth: 900, margin: '15px auto' }} className="wrapper_space_item" id={index}>
        <div className="wp_image" style={{ width: 220, height: 220 }}>
          <img className="wp_image_frame"
            src={bookedSpace.images[0]}
            alt="Space"
          />
        </div>
        <div className="wp_content">
          <h5 className="wp_location">{bookedSpace.location}</h5>
          <h5 className="wp_order_description">{bookedSpace.description}</h5>
          <h5 className="wp_location">${bookedSpace.price} per hour. &emsp; From {order.startdate} &emsp; To {order.enddate}</h5>
          <h5 className="wp_location">Buyer Name: {seller.name} &emsp;</h5>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => acceptBooking(order._id)}>Accept</button>
            <button className="btn btn-primary" onClick={() => rejectBooking(order._id)}>Reject</button>
          </div>
        </div>

      </div>
    );
  });
  return (
    <Fragment>
      {responds.length === 0 && <h1>There are not any spaces booked</h1>}
      {responds}
    </Fragment>
  );

}

RespondBooking.propTypes = {
  allBookings: PropTypes.array,
  allUsers: PropTypes.array,
  allSpaces: PropTypes.array,
  currentUser: PropTypes.object
}

const mapStateToProps = state => ({
  allBookings: state.bookings.all,
  allUsers: state.auth.allUsers,
  allSpaces: state.listings.allSpaces,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, {})(RespondBooking);