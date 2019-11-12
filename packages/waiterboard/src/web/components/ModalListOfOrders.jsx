import React from 'react';
import { connect } from 'react-redux';
import { getOrderList } from 'ducks/order/selectors';
import Order from './Events/Order';
import { colorsByStages } from '../colors';

import { Head, Body, BodyPlaceholder } from './styled/Modal';

const ModalListOfOrders = ({
  orders, shown
}) => {

  if (!shown) return (<div />)

  return (
    <div>
      <Head bg={colorsByStages.s2}>
        Orders of today
      </Head>
      <Body>
        {orders.length < 1 ? <BodyPlaceholder>No confirmed orders</BodyPlaceholder> : ''}
        {orders.map((order) =>
          <Order key={order.id} order={order} noconfirm datetime />
        )}
      </Body>
    </div>
  );
}

export default connect(
  state => ({
    orders: getOrderList({ confirmed: true, today: true })(state)
  })
)(ModalListOfOrders);
