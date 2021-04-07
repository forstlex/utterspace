import React, { Fragment, useState } from 'react';


const Home = () => {

  const [location, setLocation] = useState('')
  const onChange = (e) =>
    setLocation(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocation(e.target.value)
  };

  return (
    <Fragment>
      <h3>Rent a driveway or garage space</h3>
      <h2 className="home-title">Welcome to Utterspace!</h2>
      <h2 className="home-title">We provide rental solutions for unused space.</h2>
      <h2 className="home-title">Think of us like the AirBnBfor cars, trailers, storage and much more</h2>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Location"
            name="location"
            value={location}
            onChange={onChange}            
          />
        </div>
      </form>
    </Fragment>
  )
}

export default Home;