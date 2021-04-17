import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BuyListings = ({ buySpaces }) => {
  return (
    <Fragment>
      <h3>Buy List spaces</h3>      
    </Fragment>
  )
}

BuyListings.propTypes = {
  buySpaces: PropTypes.array
}

const mapStateToProps = state => ({
  buySpaces: state.listings.buySpaces
})

export default connect(mapStateToProps, {})(BuyListings);