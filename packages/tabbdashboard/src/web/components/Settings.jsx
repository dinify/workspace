// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link, Route, Redirect } from 'react-router-dom';
import { Form, Text } from 'react-form';

import { Header } from './styled/Header';
import { Sidebar } from './styled/Sidebar';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
} from '../../ducks/restaurant'

import MainSection from './SettingsSection/Main.jsx';
import AddonsSection from './SettingsSection/AddOns.jsx';
import OptionsSection from './SettingsSection/Options.jsx';
import TabletsSection from './SettingsSection/Tablets.jsx';

const SecondaryMenu = styled.ul`
  list-style-type: none;
  li {
    display: inline-block;
    margin-right: 10px;
  }
`;

type SettingsProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
};

const Settings = ({ lastError, loggedRestaurant, update, updateCategory, updateSocial, updateContact }: SettingsProps) =>
  (<div>
      <Header>
        <SecondaryMenu>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/">Options</Link></li>
          <li><Link to="/">Add-Ons</Link></li>
          <li><Link to="/">Tablets</Link></li>
        </SecondaryMenu>
      </Header>

      <Redirect from="/dashboard/settings" to="/dashboard/settings/main" />
      <Route path="/dashboard/settings/main" component={MainSection} />
      <Route path="/dashboard/settings/options" component={OptionsSection} />
      <Route path="/dashboard/settings/addons" component={AddonsSection} />
      <Route path="/dashboard/settings/tablets" component={TabletsSection} />

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
)(Settings);
