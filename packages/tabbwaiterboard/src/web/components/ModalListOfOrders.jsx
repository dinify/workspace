// @flow
import React from 'react'
import { connect } from 'react-redux';
import Order from './Events/Order'
import { colorsByStages } from '../colors'
import { MapToList } from 'lib/FN'

import { Head, Body, BodyPlaceholder } from './styled/Modal'


class ModalListOfOrders extends React.Component {


  render(){


    const { orders, shown } = this.props;
    if (!shown) return (<div />)

    return (
    	<div>
        <Head bg={colorsByStages.s2}>
          Orders of today
        </Head>
        <Body>
          {orders.length < 1 ? <BodyPlaceholder>No confirmed orders</BodyPlaceholder> : ''}
          {MapToList(orders).filter((o) => o.status === 'CONFIRMED').map((order) =>
            <Order key={order.id} order={order} noconfirm />
          )}
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    orders: state.order.all
  })
)(ModalListOfOrders);
