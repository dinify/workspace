// @flow
import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MapToList } from 'lib/FN'

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Badge,
  Grid
} from '@material-ui/core'

import { ExitToApp } from '@material-ui/icons'

import { logoutInitAction } from 'ducks/restaurant'
import { toggleFrames, toggleModal } from 'ducks/ui'

const Label = styled.span`
  color: rgb(180, 185, 190);
  line-height: 50px;
  text-align: center;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 14px;
  @media (max-width: 960px) {
    margin-left: 7px;
    margin-right: 3px;
    font-size: 12px;
  }
`;

const Value = styled.span`
  color: white;
  line-height: 50px;
  text-align: center;
  font-size: 22px;
  font-weight: 300;
  margin-right: 10px;
  @media (max-width: 960px) {
    font-size: 16px;
    margin-right: 7px;
  }
`;


const Container = styled.div`
  margin: 0 auto;
  width: 1200px;
  min-width: 630px;
  @media (max-width: 1200px) {
    width: 100%;
  }
  a {
    text-decoration: none;
  }
`;

const SwipeButton = styled.button`
  height: 50px;
  min-width: 130px;
  width: 100%;
  border: none;
  background: rgba(255,255,255,0.2);
  font-size: 12px;
  font-family: 'Montserrat';
  color: white;
  font-weight: 300;
  cursor: pointer;
  outline: none;
`

const styles = {
  appbar: {
    background: 'rgba(255,255,255,0.1)'
  },
  toolbar: {
    height: 50,
    minHeight: 50,
    padding: 0
  }
}

const Header = ({
  tablesCount = 0,
  guestsCount = 0,
  salesVolume = 0,
  loggedUser,
  selectedWBId,
  logout,
  toggleFrames,
  toggleModal,
  frameIndex,
  bookings
}) => {
  const frames = ['actions','tables']
  let waiterboardName = ''
  if (loggedUser.waiterboards && loggedUser.waiterboards[selectedWBId]) {
    waiterboardName = loggedUser.waiterboards[selectedWBId].name
  }
  const bookingsList = MapToList(bookings)
  const acceptedBookings = bookingsList.filter((b) => b.status === 'CONFIRMED')
  return (
    <AppBar position="static" style={styles.appbar}>
      <Container>
        <Toolbar style={styles.toolbar}>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={2}>
              <SwipeButton onClick={() => toggleFrames(frameIndex ? 0 : 1)}>Slide to {frames[frameIndex]}</SwipeButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => toggleModal({ open: true, type: 'ListOfBookings' })}>
                <Badge badgeContent={acceptedBookings.length} color="primary">
                  <i className="ion-ios-calendar" />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item xs={9} style={{textAlign: 'right'}}>
              <Link to="/board/">
                <Label>Section</Label><Value>{waiterboardName}</Value>
              </Link>
              <Label>Tables</Label><Value>{tablesCount}</Value>
              <Label>Guests</Label><Value>{guestsCount}</Value>
              <Label>Sales</Label><Value>{numeral(salesVolume).format('0.000')}KD</Value>

              <IconButton onClick={logout}>
                <ExitToApp />
              </IconButton>
            </Grid>
          </Grid>

        </Toolbar>
    </Container>
    </AppBar>
  )
}

export default connect(
  state => ({
    loggedUser: state.restaurant.loggedUser,
    selectedWBId: state.restaurant.selectedWBId,
    frameIndex: state.ui.frameIndex,
    bookings: state.booking.all
  }),
  {
    logout: logoutInitAction,
    toggleFrames,
    toggleModal
  }
)(Header)
