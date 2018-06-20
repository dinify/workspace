import React from 'react';
import { connect } from 'react-redux';

const Checkin = ({
  query
}) => {
  if (query && query.qr) {
    // perform checkin action
    console.log(query.qr);
  }
  return <div />;
};


export default connect(
  state => ({
    query: state.routing.locationBeforeTransitions.query
  })
)(Checkin);
