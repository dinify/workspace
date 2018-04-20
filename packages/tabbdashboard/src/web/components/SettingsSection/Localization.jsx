// @flow
import React from 'react';
import {
  connect
} from 'react-redux';
import styled from 'styled-components';
import type {
  Error
} from '../../../flow';
import {
  Link
} from 'react-router-dom';
import {
  Form,
  Text
} from 'react-form';

import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';

import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit
} from '../styled/FormBox';


const Localization = ({
    loggedRestaurant,
  }: MainProps) =>
  (<div>
  Work in progress
</div>);

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  }),
)(Localization);
