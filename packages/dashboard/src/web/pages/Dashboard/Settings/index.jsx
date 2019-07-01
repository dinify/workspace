import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainSection from './Main';
import WaiterboardsSection from './Waiterboards';
import QRsSection from './QRs';

import RolesSection from './Roles';
import ServicesSection from './Services'

const Settings = () => (
  <div>
    <Switch>
      <Redirect exact from="/settings" to="/settings/main" />
      <Route path="/settings/main" component={MainSection} />
      <Route path="/settings/tables" component={WaiterboardsSection} />
      <Route path="/settings/services" component={ServicesSection} />
      <Route path="/settings/tablecodes" component={QRsSection} />
      <Route path="/settings/roles" component={RolesSection} />
    </Switch>
  </div>
);

export default Settings;
