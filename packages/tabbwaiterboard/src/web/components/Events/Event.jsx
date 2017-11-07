// @flow
import React from 'react'
import Booking from './Booking'
import Order from './Order'
import OrderAhead from './OrderAhead'
import Service from './Service'
import Bill from './Bill'

const Event = ({ event: { type, content, removed } }) => {
  switch (type) {
    case 'BOOKING':
      return (
        content ? <Booking booking={content} removed={removed} /> : <span />
      )
    case 'ORDER':
      return (
        content ? <Order order={content} removed={removed} /> : <span />
      )
    case 'ORDERAHEAD':
      return (
        content ? <OrderAhead order={content} removed={removed} /> : <span />
      )
    case 'SERVICE':
      return (
        content ? <Service service={content} removed={removed} /> : <span />
      )
    case 'BILL':
      return (
        content ? <Bill bill={content} removed={removed} /> : <span />
      )
    default:
      return (<span />)
  }
}

export default Event;
