// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Swipeable from 'react-swipeable'
import { MapToList } from 'lib/FN'

import Table from './Table'
import Header from './Header'
import Container from './Container'
import Modal from './/Modal'
import ModalUser from './ModalUser'
import ModalListOfBills from './ModalListOfBills'
import ModalListOfBookings from './ModalListOfBookings'
import Booking from './Events/Booking'
import Call from './Events/Call'
import Order from './Events/Order'
import Bill from './Events/Bill'

import { toggleFrames, toggleModal } from 'ducks/ui'
import { setOHEnabled } from 'ducks/restaurant'

import { Grid } from '@material-ui/core';

import { getBookingList } from 'ducks/booking/selectors';
import { getGroupedBills } from 'ducks/bill/selectors';
import { getOrderList } from 'ducks/order/selectors';
import { getCallList } from 'ducks/call/selectors';
import { getTableList } from 'ducks/table/selectors';

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

const Board = ({
  bookingList,
  callList,
  orderList,
  billsGroupedLists,
  tableList,
  frameIndex,
  modalOpen,
  modalType,
  modalPayload,
  toggleFrames,
  toggleModal
}) => {

  const closeModal = (e) => {
    if (e.target.className.indexOf('modal-area') > -1) toggleModal({ open: false });
  }

  const billsInitiated = billsGroupedLists.INITIATED || [];
  const billsProcessed = billsGroupedLists.PROCESSED || [];

  return (<div>

    <Header
      tablesCount={tableList.length}
      processedBillsCount={billsProcessed.length}
    />

    <Swipeable
      onSwipedRight={() => toggleFrames(1)}
      onSwipedLeft={() => toggleFrames(2)}
    >
      <OneBoard n={frameIndex}>
        <Frame n={0}>
          <Container>
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
          </Container>
        </Frame>
        <Frame n={1}>
          <Container>
            <Grid container spacing={8} justify="flex-start" alignItems="flex-start">
              {tableList.map((table) =>
                <Grid item key={table.id}>
                  <Table openModal={(userId) => toggleModal({ open: true, userId })} table={table} key={table.id} />
                </Grid>
              )}
            </Grid>
          </Container>
        </Frame>
      </OneBoard>
    </Swipeable>

    <Modal shown={modalOpen} closeModal={closeModal}>
      <ModalUser shown={modalType === 'User'} payload={modalPayload} />
      <ModalListOfBills shown={modalType === 'ListOfBills'} payload={modalPayload} bills={billsProcessed} />
      <ModalListOfBookings shown={modalType === 'ListOfBookings'} payload={modalPayload} />
    </Modal>

  </div>)
}


export default connect(
  state => ({
    bookingList: getBookingList(state),
    billsGroupedLists: getGroupedBills(state),
    orderList: getOrderList(state),
    callList: getCallList(state),
    tableList: getTableList(state),
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
)(Board)
