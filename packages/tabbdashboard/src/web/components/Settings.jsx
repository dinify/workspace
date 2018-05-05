// @flow
import React from 'react'
import styled from 'styled-components'
import type { Error } from '../../flow'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Form, Text } from 'react-form'

import { Header } from './styled/Header'
import { HorMenu, HorMenuLink } from './Menu'


import MainSection from './SettingsSection/Main.jsx';
import WaiterboardsSection from './SettingsSection/Waiterboards.jsx';
import QRsSection from './SettingsSection/QRs.jsx';
import LocalizationSection from './SettingsSection/Localization.jsx';
import RolesSection from './SettingsSection/Roles.jsx'

const Settings = ({ location }) =>
  (<div>
    <Header>
      <HorMenu>
        <HorMenuLink l={location} title="Main Information" to="/settings/main" />
        <HorMenuLink l={location} title="Waiterboards" to="/settings/waiterboards" />
        <HorMenuLink l={location} title="QR Codes" to="/settings/qrcodes" />
        <HorMenuLink l={location} title="" to="/settings/roles" />
        <HorMenuLink l={location} title="" to="/settings/localization" />
      </HorMenu>
    </Header>
    <Switch>
      <Redirect exact from="/settings" to="/settings/main" />
      <Route path="/settings/main" component={MainSection} />
      <Route path="/settings/waiterboards" component={WaiterboardsSection} />
      <Route path="/settings/qrcodes" component={QRsSection} />
      <Route path="/settings/roles" component={RolesSection} />
      <Route path="/settings/localization" component={LocalizationSection} />
    </Switch>
  </div>);

export default Settings
