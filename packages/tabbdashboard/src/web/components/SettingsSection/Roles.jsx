// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import numeral from 'numeral'
import {
  FormBox,
  FormBoxHead
} from '../styled/FormBox';

import {
  createWaiterboardInitAction,
} from '../../../ducks/restaurant'


const Roles = () =>
  (<div>
    roles
  </div>);

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,

  }), {

  },
)(Roles);
