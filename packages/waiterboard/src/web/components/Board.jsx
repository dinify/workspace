// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import { MapToList } from 'lib/FN'

import Header from './Header'
import FrameOfTables from './FrameOfTables'
import Modal from './Modal'
import ModalUser from './ModalUser'
import ModalListOfOrders from './ModalListOfOrders'
import ModalListOfBookings from './ModalListOfBookings'
import ModalTable from './ModalTable'

import { toggleFrames, toggleModal } from 'ducks/ui'
import { setOHEnabled } from 'ducks/restaurant/actions'
import { getGroupedBills } from 'ducks/bill/selectors';
import { getTableList } from 'ducks/table/selectors';

import Container from './Container'
import Booking from './Events/Booking'
import Call from './Events/Call'
import Order from './Events/Order'
import Bill from './Events/Bill'
import { getBookingList } from 'ducks/booking/selectors';
import { getOrderList } from 'ducks/order/selectors';
import { getCallList } from 'ducks/call/selectors';
import { getSeatList } from 'ducks/seat/selectors';

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
const OneBoard = styled.div`
  position: fixed;
  top: 50px;
  width: 100%;
  height: 100%;
  left: ${props => props.n*100-100}%;
  transition: left 300ms ease-in-out;
`

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.n*100}%;
  width: 100%;
  padding-top: 10px;
`

const Board = ({
  bookingList,
  orderList,
  callList,
  billsGroupedLists,
  tableList,
  seatList,
  frameIndex,
  modalOpen,
  modalType,
  modalPayload,
  toggleFrames,
  toggleModal,
}) => {

  const closeModal = (e) => {
    if (e.target.className.indexOf('modal-area') > -1) toggleModal({ open: false });
  }

  // const billsProcessed = billsGroupedLists.PROCESSED || [];
  const billsInitiated = billsGroupedLists.INITIATED || [];

  const anyAction = (
    orderList.length > 0 ||
    bookingList.length > 0 ||
    callList.length > 0 ||
    billsInitiated.length > 0
  );

  return (<div>

    <Header
      tablesCount={tableList.length}
      anyAction={anyAction}
      guestCount={seatList.length}
    />

    <Swipeable
      onSwipedRight={() => toggleFrames(1)}
      onSwipedLeft={() => toggleFrames(2)}
    >
      <OneBoard n={frameIndex}>
        <Frame n={0}>
          <Container>
            {anyAction ?
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
        </Frame>
        <Frame n={1}>
          <FrameOfTables tableList={tableList} seatList={seatList} toggleModal={toggleModal} />
        </Frame>
      </OneBoard>
    </Swipeable>

    <Modal shown={modalOpen} closeModal={closeModal}>
      <ModalUser shown={modalType === 'User'} payload={modalPayload} />
      <ModalListOfOrders shown={modalType === 'ListOfOrders'} payload={modalPayload} />
      <ModalListOfBookings shown={modalType === 'ListOfBookings'} payload={modalPayload} />
      <ModalTable shown={modalType === 'Table'} payload={modalPayload} seatList={seatList} />
    </Modal>

  </div>)
}


export default connect(
  state => ({
    bookingList: getBookingList(state),
    orderList: getOrderList(state),
    callList: getCallList(state),
    billsGroupedLists: getGroupedBills(state),
    tableList: getTableList(state),
    seatList: getSeatList(state),
    frameIndex: state.ui.frameIndex,
    modalOpen: state.ui.modalOpen,
    modalType: state.ui.modalType,
    modalPayload: state.ui.modalPayload,
  }),
  {
    toggleFrames,
    toggleModal,
    setOHEnabled
  },
)(Board);
