import React from 'react';
import { connect } from 'react-redux';
import { MapToList } from '@dinify/common/dist/lib/FN';
import Booking from './Events/Booking';
import { colorsByStages } from '../colors';

import { Head, Body, BodyPlaceholder } from './styled/Modal'

const ModalListOfBookings = ({ bookings, shown }) => {
  if (!shown) return (<div />)
  const accepted = MapToList(bookings).filter((b) => b.status === 'CONFIRMED')

  return (
  	<div>
      <Head bg={colorsByStages.booking}>
        Accepted Reservations
      </Head>
      <Body>
        {accepted.length < 1 ? <BodyPlaceholder>No upcoming reservations</BodyPlaceholder> : ''}
        {accepted.map((booking, i) =>
          <Booking key={i} booking={booking} noconfirm />
        )}
      </Body>
    </div>
  )

}

export default connect(
  state => ({
    bookings: state.booking.all
  })
)(ModalListOfBookings);
