
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import moment from 'moment';


import { confirmBookingInit, cancelBookingInit } from 'ducks/booking/actions'

import { ActionBox, Header, TableId, Text, CheckButton } from '../styled/Events'

import User from './user'

const color = colorsByStages['booking']

const Booking = ({ booking, confirmBooking, cancelBooking, removed, noconfirm, users }) => {
	const user = users[booking.initiator]
	return (
		<ActionBox className={removed ? 'vhs-zoom vhs-reverse Booking' : 'Booking'}>
	    <Header>

	      <TableId bg={color}>
	        <i className="ion-ios-calendar" />
	      </TableId>

	      <User userId={booking.initiator} />

	      <Text color={color}>
	        {moment(booking.appointment).format('DD/MM/YYYY HH:mm')}
	        <span title="Person count" style={{margin: '0 20px'}}>[{booking.party_size}]</span>
	        {booking.message ? booking.message : ''}
	      </Text>

	      <CheckButton bg={color} onClick={() => cancelBooking({id: booking.id})} invisible={noconfirm}>
	        <i className="ion-close" />
	      </CheckButton>

				<CheckButton bg={color} onClick={() => confirmBooking({id: booking.id})} invisible={noconfirm}>
	        <i className="ion-checkmark" />
	      </CheckButton>

	    </Header>
		</ActionBox>
	)
}

export default connect(
  null,
  {
    confirmBooking: confirmBookingInit,
		cancelBooking: cancelBookingInit
  }
)(Booking);
