// @flow
import React from 'react'
import { connect } from 'react-redux'
import Booking from './Events/Booking'
import { colorsByStages } from '../colors'

import { Head, Body, BodyPlaceholder } from './styled/Modal'

class ModalListOfBookings extends React.Component {
  render(){
    const { bookings } = this.props;
    console.log(bookings)

    return (
    	<div>
        <Head bg={colorsByStages['booking']}>
          Reservations
        </Head>
        <Body>
          {bookings.length < 1 ? <BodyPlaceholder>No upcoming reservations</BodyPlaceholder> : ''}
          {bookings.map((booking, i) =>
            <Booking key={i} booking={booking} noconfirm />
          )}
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    bookings: state.restaurant.acceptedBookings
  })
)(ModalListOfBookings);
