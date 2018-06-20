// @flow
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Header } from 'web/components/styled/Header';
import { HorMenu, HorMenuLink } from 'web/components/styled/Menu';

import MainSection from './Main';
import WaiterboardsSection from './Waiterboards';
import QRsSection from './QRs';

import LocalizationSection from './Localization';
import RolesSection from './Roles';

const Settings = ({ location }) => (
  <div>
    <Header>
      <HorMenu>
        <HorMenuLink
          l={location}
          title="Main Information"
          to="/settings/main"
        />
        <HorMenuLink
          l={location}
          title="Waiterboards"
          to="/settings/waiterboards"
        />
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
  </div>
);

export default Settings;
