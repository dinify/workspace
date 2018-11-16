// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import R from 'ramda'
import Swipeable from 'react-swipeable'
import Masonry from 'react-masonry-component'
import { colorsByStages } from '../colors'
import { MapToList } from 'lib/FN'

import Table from './Table'
import Header from './Header'
import Container from './Container'
import Modal from './/Modal'
import ModalUser from './ModalUser'
import ModalListOfBills from './ModalListOfBills'
import ModalListOfBookings from './ModalListOfBookings'
import Event from './Events'
import Booking from './Events/Booking'
import Call from './Events/Call'
import Order from './Events/Order'
import Bill from './Events/Bill'

import { toggleFrames, toggleModal } from 'ducks/ui'
import { setOHEnabled, logoutInitAction } from 'ducks/restaurant'

import { PermContactCalendar } from '@material-ui/icons'
import { IconButton, Badge } from '@material-ui/core'

import * as FN from 'lib/FN'

import { Typography, Button, Grid } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

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

const Menu = styled.ul`
  list-style-type: none;
  float: left;
  margin: 0 20px;
`

const MenuItem = styled.li`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 50%;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    border-color: white;
  }
`
const MenuItemSign = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 14px;
  height: 14px;
  font-size: 12px;
  border-radius: 50%;
  line-height: 14px;
  text-align: center;
  background: ${p => p.bg ? p.bg : 'red'};
`

type BoardProps = {
  tables: Object,
  guests: Object,
};

const masonryOptions = {
  isAnimated: true,
  animationOptions: {
    duration: 750,
    easing: 'linear',
    queue: false
  }
}

const Board = ({
  sales,
  tables,
  guestList,
  frameIndex,
  modalOpen,
  modalType,
  modalPayload,
  toggleFrames,
  toggleModal,
  events,
  guestsCount,
  setOHEnabled,
  order_ahead_enabled,
  bookings,
  calls,
  logout,
  selectedWBId,
  loggedUser,
  orders,
  bills
}: BoardProps) => {

  const frames = ['actions','tables']

  const openModal = (userId) => {
    toggleModal({ open: true, userId });
  }

  const closeModal = (e) => {
    if (e.target.className.indexOf('modal-area') > -1) toggleModal({ open: false });
  }

  const swiped = (i) => {
    toggleFrames(i)
  }

  let waiterboardName = null

  if (loggedUser.waiterboards && loggedUser.waiterboards[selectedWBId]) {
    waiterboardName = loggedUser.waiterboards[selectedWBId].name
  }

  const bookingsList = MapToList(bookings)
  const acceptedBookings = bookingsList.filter((b) => b.status === 'CONFIRMED')
  const pendingBookings = bookingsList.filter((b) => b.status === 'PENDING')

  const pendingCalls = calls.filter((b) => b.status === 'PENDING')
  console.log(pendingCalls);

  const newOrders = R.filter((o) => o.status !== 'CONFIRMED')(orders)
//
  return (<div>

    <Header
      tablesCount={R.values(tables).length}
      guestsCount={guestList.length}
      salesVolume={sales}
    />

    <Swipeable
      onSwipedRight={() => swiped(1)}
      onSwipedLeft={() => swiped(0)}
    >
      <OneBoard n={frameIndex}>
        <Frame n={0}>
          <Container>
            <Container>
              {newOrders.length > 0 || pendingBookings.length > 0 || pendingCalls.length > 0 || bills.length > 0 ?
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                  {pendingBookings.map((booking) =>
                    <Booking key={booking.id} booking={booking} />
                  )}
                  {pendingCalls.map((call) =>
                    <Call key={call.id} call={call} />
                  )}
                  {newOrders.map((order) =>
                    <Order key={order.id} order={order} />
                  )}
                  {bills.map((bill) =>
                    <Bill key={bill.id} bill={bill} />
                  )}
                  {/*R.values(events).sort((a,b) => a.content.id - b.content.id).map((event, i) =>
                    <Event key={i} event={event} />
                  )*/}
                </Masonry>
                :
                <EventsPlaceholder>Everything is done.</EventsPlaceholder>
              }
            </Container>
          </Container>
        </Frame>
        <Frame n={1}>
          <Container>
            <Grid container spacing={8} justify="flex-start" alignItems="flex-start">
              {FN.MapToList(tables).sort((a,b) => a.number - b.number).map((table) =>
                <Grid item key={table.id}>
                  <Table openModal={openModal} table={table} key={table.id} />
                </Grid>
              )}
            </Grid>
          </Container>
        </Frame>
      </OneBoard>
    </Swipeable>


    <Modal shown={modalOpen} closeModal={closeModal}>
      {modalType === 'User' ? <ModalUser payload={modalPayload} /> : '' }
      {modalType === 'ListOfBills' ? <ModalListOfBills payload={modalPayload} /> : '' }
      {modalType === 'ListOfBookings' ? <ModalListOfBookings payload={modalPayload} /> : '' }
    </Modal>

  </div>)
}


export default connect(
  state => ({
    bookings: state.booking.all,
    orders: state.order.list,
    bills: state.bill.list,
    calls: state.call.list,
    tables: state.table.all,
    guestList: state.guests.list,
    events: state.restaurant.events,
    guestsCount: state.table.guestsCount,
    sales: state.restaurant.sales,
    order_ahead_enabled: state.restaurant.order_ahead_enabled,
    selectedWBId: state.restaurant.selectedWBId,
    loggedUser: state.restaurant.loggedUser,
    ...state.ui, // frameIndex, modalOpen, modalUserId
  }),
  {
    toggleFrames,
    toggleModal,
    setOHEnabled
  },
)(Board)
