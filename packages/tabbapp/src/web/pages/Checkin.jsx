import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';

const Checkin = ({
  query,
  checkin,
}) => {
  if (query && query.qr) {
    // perform checkin action
    checkin({ qr: query.qr });
  }
  return <div />;
};


export default connect(
  state => ({
    query: state.routing.locationBeforeTransitions.query,
  }),
  {
    checkin: checkinInit,
  }
)(Checkin);
