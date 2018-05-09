// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'

import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  FieldWrapper,
  Label
} from '../styled/FormBox';
import {
  updateInitAction,
} from 'ducks/restaurantLegacy'

import BusinessHours from './Forms/BusinessHours'
import Banking from './Forms/Banking'
import Social from './Forms/Social'
import Location from './Forms/Location'
import Contact from './Forms/Contact'
import Image from './Forms/Image'
import Type from './Forms/Type'
import Name from './Forms/Name'

const MainContrainer = styled.div `

`

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
    <MainContrainer>
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
      </Column>

      <Column>
        <BusinessHours openHours={loggedRestaurant.open_hours} />
      </Column>

    </MainContrainer>
  );
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  })
)(Main);
