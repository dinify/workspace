// @flow
import React from 'react'
import styled from 'styled-components'
import type { Error } from '../../flow'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Form, Text } from 'react-form'

import { Header } from './styled/Header'
import { HorMenu, HorMenuLink } from './Menu'


import MainSection from './SettingsSection/Main.jsx';
import TablesSection from './SettingsSection/Tables.jsx';
import LocalizationSection from './SettingsSection/Localization.jsx';

const Settings = ({ location }) =>
  (<div>
    <Header>
      <HorMenu>
        <HorMenuLink l={location} title="Main Information" to="/dashboard/settings/main" />
        <HorMenuLink l={location} title="Tables" to="/dashboard/settings/tables" />
        <HorMenuLink l={location} title="Localization" to="/dashboard/settings/localization" />
      </HorMenu>
    </Header>
    <Switch>
      <Redirect exact from="/dashboard/settings" to="/dashboard/settings/main" />
      <Route path="/dashboard/settings/main" component={MainSection} />
      <Route path="/dashboard/settings/tables" component={TablesSection} />
      <Route path="/dashboard/settings/localization" component={LocalizationSection} />
    </Switch>
  </div>);

export default Settings
