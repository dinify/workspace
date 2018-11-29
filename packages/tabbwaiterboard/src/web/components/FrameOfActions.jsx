// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Container from './Container'
import Booking from './Events/Booking'
import Call from './Events/Call'
import Order from './Events/Order'
import Bill from './Events/Bill'
import { getBookingList } from 'ducks/booking/selectors';
import { getOrderList } from 'ducks/order/selectors';
import { getCallList } from 'ducks/call/selectors';

const EventsPlaceholder = styled.div`
  font-size: 32px;
  text-align: center;
  color: rgba(255,255,255,0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 120px);
`

const FrameOfActions = ({
  bookingList,
  orderList,
  callList,
  billsInitiated
}) => {

  return (
    <Container>
        {orderList.length > 0 || bookingList.length > 0 || callList.length > 0 || billsInitiated.length > 0 ?
          <div>
            {bookingList.map((booking) =>
              <Booking key={booking.id} booking={booking} />
            )}
            {callList.map((call) =>
              <Call key={call.id} call={call} />
            )}
            {orderList.map((order) =>
              <Order key={order.id} order={order} />
            )}
            {billsInitiated.map((bill) =>
              <Bill key={bill.id} bill={bill} />
            )}
          </div>
          :
          <EventsPlaceholder>Everything is done.</EventsPlaceholder>
        }
    </Container>
  );
}

export default connect(
  state => ({
    bookingList: getBookingList(state),
    orderList: getOrderList(state),
    callList: getCallList(state),
  })
)(FrameOfActions);
