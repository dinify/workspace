
import React from 'react'
import { connect } from 'react-redux'
import Booking from './Events/Booking'
import { colorsByStages } from '../colors'
import { MapToList } from '@dinify/common/dist/lib/FN'

import { Head, Body, BodyPlaceholder } from './styled/Modal'

const ModalListOfBookings = ({ orders }) => {

  const accepted = MapToList(orders).filter((b) => b.status === 'CONFIRMED')

  return (
  	<div>
      <Head bg={colorsByStages['booking']}>
        Accepted Orders Ahead
      </Head>
      <Body>
        {accepted.length < 1 ? <BodyPlaceholder>No upcoming orders</BodyPlaceholder> : ''}
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
