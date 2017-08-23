// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { Form, Text } from 'react-form';

import { Header } from './styled/Header';
import { Sidebar } from './styled/Sidebar';
import { HorMenu, HorMenuLink } from './Menu'

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
} from '../../ducks/restaurant';

import MainSection from './SettingsSection/Main.jsx';
import AddonsSection from './SettingsSection/AddOns.jsx';
import OptionsSection from './SettingsSection/Options.jsx';
import TabletsSection from './SettingsSection/Tablets.jsx';


type SettingsProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
};

const Settings = ({ lastError, loggedRestaurant, update, updateCategory, updateSocial, updateContact, location }: SettingsProps) =>
  (<div>
      <Header>

        <HorMenu>
          <HorMenuLink l={location} title="Main Information" to="/dashboard/settings/main" />
          <HorMenuLink l={location} title="Options" to="/dashboard/settings/options" />
          <HorMenuLink l={location} title="Add-Ons" to="/dashboard/settings/addons" />
          <HorMenuLink l={location} title="Tablets" to="/dashboard/settings/tablets" />
        </HorMenu>
      </Header>

      <Switch>
        <Redirect exact from="/dashboard/settings" to="/dashboard/settings/main" />
        <Route path="/dashboard/settings/main" component={MainSection} />
        <Route path="/dashboard/settings/options" component={OptionsSection} />
        <Route path="/dashboard/settings/addons" component={AddonsSection} />
        <Route path="/dashboard/settings/tablets" component={TabletsSection} />
      </Switch>

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
