import React, { Fragment, useState } from 'react';

import PlacesAutocomplete from '../autoComplete/index';
const Home = () => {

  const [location, setLocation] = useState('');

  const onChangeLocation = (value) => {
    setLocation(value)
  }

  return (
    <Fragment>
      <h3>Rent a driveway or garage space</h3>
      <h2 className="home-title">Welcome to Utterspace!</h2>
      <h2 className="home-title">We provide rental solutions for unused space.</h2>
      <h2 className="home-title">Think of us like the AirBnBfor cars, trailers, storage and much more</h2>

      <PlacesAutocomplete changeLocation={onChangeLocation} />
    </Fragment>
  )
}

export default Home;