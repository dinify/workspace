// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BusinessHours from './BusinessHours'
import Banking from './Banking'
import Social from './Social'
import Location from './Location'
import Contact from './Contact'
import Image from './Image'
import Type from './Type'
import Name from './Name'
import ServiceCalls from './ServiceCalls'
import Address from './Address'


const Column = styled.div`
  width: 290px;
  display: inline-block;
  vertical-align: top;
`

const Main = ({
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  return (
    <div>
      <Column>
        <Name name={loggedRestaurant.name} />
        <Type type={loggedRestaurant.type} />
        <Image loggedRestaurant={loggedRestaurant} />
      </Column>

      <Column>
        <Location loggedRestaurant={loggedRestaurant} />
        <Social social={loggedRestaurant.social} />
      </Column>

      <Column>
        <Contact contact={loggedRestaurant.contact} />
        <Banking payout={loggedRestaurant.payout} />
        <Address address={loggedRestaurant.address.business} />
      </Column>

      <Column>
        <BusinessHours openHours={loggedRestaurant.open_hours} />
        <ServiceCalls calls={loggedRestaurant.services}/>
      </Column>

    </div>
  );
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  })
)(Main);
