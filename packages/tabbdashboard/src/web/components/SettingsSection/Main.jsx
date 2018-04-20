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
} from '../../../ducks/restaurant'

import BusinessHours from './Forms/BusinessHours'
import Banking from './Forms/Banking'
import Social from './Forms/Social'
import Location from './Forms/Location'
import Contact from './Forms/Contact'
import Image from './Forms/Image'
import Type from './Forms/Type'
import Name from './Forms/Name'

const MainContrainer = styled.div `
  column-count: 3;
  column-gap: 0;
  @media (max-width: 1150px) {
    column-count: 2;
  }
  @media (max-width: 860px) {
    column-count: 1;
  }
`

const Main = ({
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  return (
    <MainContrainer>

      <Name name={loggedRestaurant.name} />

      <Type type={loggedRestaurant.type} />

      <Image loggedRestaurant={loggedRestaurant} />

      <Contact contact={loggedRestaurant.contact} />

      <Location loggedRestaurant={loggedRestaurant} />

      <Social social={loggedRestaurant.social} />

      <BusinessHours openHours={loggedRestaurant.open_hours} />

      <Banking payout={loggedRestaurant.payout} />

    </MainContrainer>
  );
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  })
)(Main);
