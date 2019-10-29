import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MapToList } from '@dinify/common/src/lib/FN';
import { withFirebase } from 'react-redux-firebase';

import sum from 'ramda/es/sum';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';

import ExitToApp from '@material-ui/icons/ExitToApp';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Event from '@material-ui/icons/Event';

import { toggleFrames, toggleModal } from 'ducks/ui/actions';
import { getConfirmedOrderList } from 'ducks/order/selectors';
import { colorsByStages } from '../colors';

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
  color: white;
  font-weight: 300;
  cursor: pointer;
  outline: none;
  @keyframes color {
    0% {
      background-color: rgb(231,76,60);
    }
    25% {
      background-color: rgb(255,143,0);
    }
    50% {
      background-color: rgb(144,19,254);
    }
    75% {
      background-color: rgb(33,150,243);
    }
    0% {
      background-color: rgb(231,76,60);
    }
  }
  &.warn {
    background-color: rgb(231,76,60);
    animation-name: color;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
`

const BookingBadge = styled.span`
  span span {
    background-color: ${colorsByStages.booking};
  }
`
const BillsBadge = styled.span`
  span span {
    background-color: ${colorsByStages.s2};
  }
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
  restaurant,
  firebase,
  toggleFrames,
  toggleModal,
  frameIndex,
  bookings,
  anyAction,
  orders,
  confirmedOrders
}) => {
  const frames = ['actions','tables']
  let restaurantName = '';
  if (restaurant) restaurantName = restaurant.name;
  const bookingsList = MapToList(bookings)
  const acceptedBookings = bookingsList.filter((b) => b.status === 'CONFIRMED')

  const ordersList = MapToList(orders)
  const confirmedOrdersCount = ordersList.filter((o) => o.status === 'CONFIRMED').length

  const amounts = confirmedOrders.map((o) => {
    const itemSubtotals = o.items.map((item) => Number(item.subtotal.amount));
    return sum(itemSubtotals);
  });

  const salesVolume = sum(amounts);

  return (
    <AppBar position="static" style={styles.appbar}>
      <Container>
        <Toolbar style={styles.toolbar}>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={2}>
              <SwipeButton
                onClick={() => toggleFrames(frameIndex ? 0 : 1)}
                className={frameIndex === 0 && anyAction ? 'warn' : ''}
              >
                Slide to {frames[frameIndex]}
              </SwipeButton>
            </Grid>
            <Grid item xs={2}>

              <IconButton onClick={() => toggleModal({ open: true, type: 'ListOfBookings' })}>
                <BookingBadge>
                  <Badge badgeContent={acceptedBookings.length}>
                    <Event />
                  </Badge>
                </BookingBadge>
              </IconButton>

              <IconButton onClick={() => toggleModal({ open: true, type: 'ListOfOrders' })}>
                <BillsBadge>
                  <Badge badgeContent={confirmedOrdersCount}>
                    <RestaurantMenu />
                  </Badge>
                </BillsBadge>
              </IconButton>

            </Grid>
            <Grid item xs={8} style={{textAlign: 'right'}}>
            
              <Link to="/select">
                <Value>{restaurantName}</Value>
              </Link>

              <Label>Tables</Label><Value>{tablesCount}</Value>
              <Label>Orders</Label><Value>{ordersList.length}</Value>
              <Label>Sales</Label><Value>{numeral(salesVolume).format('0')}Kč</Value>

              <IconButton onClick={() => firebase.logout()}>
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
    selectedWBId: state.app.selectedWBId,
    frameIndex: state.ui.frameIndex,
    bookings: state.booking.all,
    orders: state.order.all,
    confirmedOrders: getConfirmedOrderList(state)
  }),
  {
    toggleFrames,
    toggleModal
  }
)(withFirebase(Header))
