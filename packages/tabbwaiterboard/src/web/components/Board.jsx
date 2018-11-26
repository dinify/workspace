// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import filter from 'ramda/src/filter'
import groupBy from 'ramda/src/groupBy'

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

const masonryOptions = {
  isAnimated: true,
  animationOptions: {
    duration: 750,
    easing: 'linear',
    queue: false
  }
}

const Board = ({
  bookingsList,
  calls,
  orders,
  bills,
  tablesList,
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

  const billsInitiated = bills.INITIATED || [];
  const billsProcessed = bills.PROCESSED || [];
  return (<div>

    <Header
      tablesCount={tablesList.length}
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
              {orders.length > 0 || bookingsList.length > 0 || calls.length > 0 || billsInitiated.length > 0 ?
                <div>
                  {bookingsList.map((booking) =>
                    <Booking key={booking.id} booking={booking} />
                  )}
                  {calls.map((call) =>
                    <Call key={call.id} call={call} />
                  )}
                  {orders.map((order) =>
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
              {tablesList.map((table) =>
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
      {modalType === 'User' ? <ModalUser payload={modalPayload} /> : '' }
      {modalType === 'ListOfBills' ? <ModalListOfBills payload={modalPayload} bills={billsProcessed} /> : '' }
      {modalType === 'ListOfBookings' ? <ModalListOfBookings payload={modalPayload} /> : '' }
    </Modal>

  </div>)
}


export default connect(
  state => ({
    bookingsList: MapToList(state.booking.all).filter((b) => b.status === 'PENDING'),
    orders: filter((o) => o.status !== 'CONFIRMED')(state.order.list),
    bills: groupBy((b) => b.status === 'PROCESSED' ? 'PROCESSED' : 'INITIATED')(MapToList(state.bill.all)),
    calls: state.call.list.filter((b) => b.status === 'PENDING'),

    tablesList: MapToList(state.table.all).sort((a,b) => a.number - b.number),

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
