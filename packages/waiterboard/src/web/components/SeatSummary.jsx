// @flow
import React from 'react'
import { connect } from 'react-redux';
import { colorsByStages } from '../colors'
import { ActionBox, Header, Text } from 'web/components/styled/Events'
import User from 'web/components/Events/user'
import filter from 'ramda/src/filter'
import Order from 'web/components/Events/Order'
import { MapToList } from 'lib/FN'

class SeatSummary extends React.Component {

  render(){
    const { seat } = this.props;
    if (!seat) return (<div />)

    console.log(seat.bill,'dd');
    let orders = {};
    let subtotal = null;
    if (seat.bill && seat.bill.orders) {
      orders = seat.bill.orders;
      subtotal = seat.bill.subtotal.amount;
    }

    return (<ActionBox className='FullWidth'>
      <Header>

	      <User seat={seat} />

        {subtotal ?
          <Text>
  					{subtotal}KD
  				</Text>
          :
          ''
        }

	    </Header>
      {MapToList(orders).map((order) =>
        <Order order={order} noconfirm raw />
      )}
    </ActionBox>)
  }
}

export default connect(
  state => ({
    orders: state.order.all
  })
)(SeatSummary);
