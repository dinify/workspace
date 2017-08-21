// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../../flow';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';

import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from '../styled/FormBox';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
} from '../../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
};

const Main = ({ lastError, loggedRestaurant, update, updateCategory, updateSocial, updateContact }: MainProps) =>
(<div>
  <FormBox>
    <FormBoxHead>Set Tablet(s)</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Tablet ID" type="text" />
      <input placeholder="Password" type="text" />
      <FormBoxSubmit>SAVE</FormBoxSubmit>
    </FormBoxBody>
  </FormBox>
</div>);

export default connect(
state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant
}),
{
  update: updateInitAction,
  updateCategory: updateCategoryInitAction,
  updateSocial: updateSocialInitAction,
  updateContact: updateContactInitAction,
},
)(Main);
