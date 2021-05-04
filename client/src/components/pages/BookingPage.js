import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { setAlert } from '../../actions/alert';
import { createBooking } from '../../actions/booking';
import PaypalButtons from "../payment/PaypalButtons";

const BookingPage = ({ match, setAlert, buySpaces, allUsers, loggedinUser, createBooking, bookingRequest }) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [daysRent, setDaysRent] = useState(1);
  const [selectDayError, setSelectDayError] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

  let history = useHistory();

  const sId = match.params.id;
  const space = buySpaces.find(s => s._id === sId);

  if (!space) {
    return (
      <Fragment>
        We can't find space with this id
      </Fragment>
    );
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

  const selectStartDate = (date) => {
    setStartDate(date);
    if (date > endDate) {
      setAlert('Start date should be before than end date.', 'danger');
      setSelectDayError(true);
      return;
    }
    const days = Math.floor((Date.parse(endDate) - Date.parse(date)) / 86400000);
    setDaysRent(days + 1);
    setSelectDayError(false);
  }

  const selectEndDate = (date) => {
    setEndDate(date);
    if (startDate > date) {
      setAlert('Start date should be before than end date.', 'danger');
      setSelectDayError(true);
      return;
    }
    const days = Math.floor((Date.parse(date) - Date.parse(startDate)) / 86400000);
    setDaysRent(days + 1);
    setSelectDayError(false);
  }

  const finishPayment = () => {
    setShowPaypal(false);
    const booking = {
      sid: space._id,
      sellerid: seller._id,
      buyerid: loggedinUser._id,
      location: space.location,
      images: space.images,
      startdate: startDate.toDateString(),
      enddate: endDate.toDateString(),
      price: space.price * daysRent
    }
    createBooking(booking, history);
  }

  const onSubmit = e => {
    e.preventDefault();
    if (startDate > endDate) {
      setAlert('Start date should be before than end date.', 'danger');
      return;
    }
    // setShowPaypal(true);
    const booking = {
      sid: space._id,
      sellerid: seller._id,
      buyerid: loggedinUser._id,
      location: space.location,
      images: space.images,
      startdate: startDate.toDateString(),
      enddate: endDate.toDateString(),
      price: space.price * daysRent
    }
    createBooking(booking, history);
  }

  if (showPaypal) {
    return (
      <PaypalButtons finishPayment={finishPayment} price={space.price * daysRent} />
    );
  }

  return (
    <Fragment>
      <div className="image-gallery">
        <ImageGallery items={images} />
      </div>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <div className="booking-info"><span className="booking-info-title">Vendor Name:</span> {seller.name}</div>
          <div className="booking-info"><span className="booking-info-title">Description:</span> {space.description}</div>
        </div>
        <div className="calendar-section">
          <span className="date-label">State Date</span><DatePicker selected={startDate} onChange={date => selectStartDate(date)} />
        </div>

        <div className="calendar-section">
          <span className="date-label">End Date</span><DatePicker selected={endDate} onChange={date => selectEndDate(date)} />
        </div>
        <div>
          <div className="booking-info"><span className="booking-info-title">Price per day:</span> {space.price}</div>
          <div className="booking-info"><span className="booking-info-title">Total Price: {!selectDayError && space.price * daysRent}</span> </div>
        </div>

        <button className="btn btn-primary" type="submit">Book {bookingRequest && <i className="fas fa-spinner fa-spin" />}</button>
      </form>
    </Fragment>
  )
}

BookingPage.propTypes = {
  buySpaces: PropTypes.array,
  allUsers: PropTypes.array,
  loggedinUser: PropTypes.object,
  setAlert: PropTypes.func,
  createBooking: PropTypes.func
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces,
  allUsers: state.auth.allUsers,
  loggedinUser: state.auth.user,
  bookingRequest: state.bookings.bookingRequest
});

export default connect(mapStateToProps, { setAlert, createBooking })(BookingPage);