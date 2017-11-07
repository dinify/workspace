// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import moment from 'moment';


import { confirmBooking } from '../../../ducks/restaurant'

import { ActionBox, Header, TableId, Text, CheckButton } from '../styled/Events'

import User from './user'

const color = colorsByStages['booking']

const Booking = ({ booking, confirmBooking, removed, noconfirm }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse Booking' : 'Booking'}>
    <Header>

      <TableId bg={color}>
        <i className="ion-ios-calendar" />
      </TableId>

      <User user={booking.UserObject} />

      <Text color={color}>
        {moment(booking.reservation_date).format('DD/MM/YYYY HH:mm')}
        <span title="Person count" style={{margin: '0 20px'}}>[{booking.person_count}]</span>
        {booking.message ? booking.message : ''}
      </Text>

      <CheckButton bg={color} onClick={() => confirmBooking({bookingId: booking.id})} invisible={noconfirm}>
        <i className="ion-checkmark" />
      </CheckButton>

    </Header>
	</ActionBox>
)

export default connect(
  state => ({}),
  {
    confirmBooking
  },
)(Booking);
