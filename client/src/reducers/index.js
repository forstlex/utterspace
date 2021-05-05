import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import listings from './listings';
import bookings from './bookings';
import messages from './messages';
import contacts from './contacts';

export default combineReducers({
  alert,
  auth,
  listings,
  bookings,
  messages,
  contacts
});
