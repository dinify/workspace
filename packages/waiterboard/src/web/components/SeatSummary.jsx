import React from 'react';
import { connect } from 'react-redux';
import { ActionBox, Header, Text } from 'web/components/styled/Events';
import User from 'web/components/Events/user';
import Order from 'web/components/Events/Order';
import { MapToList } from '@dinify/common/src/lib/FN';

const SeatSummary = ({
  seat
}) => {

  if (!seat) return (<div />)

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
          {subtotal}€
        </Text>
        :
        ''
      }

    </Header>
    {MapToList(orders).map((order) =>
      <Order order={order} noconfirm raw />
    )}
  </ActionBox>);

}

export default connect(
  state => ({
    orders: state.order.all
  })
)(SeatSummary);
