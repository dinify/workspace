// @flow
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Header } from 'web/components/styled/Header';
import { HorMenu, HorMenuLink } from 'web/components/styled/Menu';

import ControlSection from './Control';
import CustomizationsSection from './Customizations';
import TranslationsSection from './Translations';

const Menucontrol = ({ location }) => (
  <div>
    <Header>
      <HorMenu>
        <HorMenuLink l={location} title="Menu Control" to="/menu/control" />
        <HorMenuLink
          l={location}
          title="Customizations"
          to="/menu/customizations"
        />
        <HorMenuLink l={location} title="Translations" to="/menu/translations" />
      </HorMenu>
    </Header>

    <Switch>
      <Redirect exact from="/menu" to="/menu/control" />
      <Route path="/menu/control" component={ControlSection} />
      <Route path="/menu/customizations" component={CustomizationsSection} />
      <Route path="/menu/translations" component={TranslationsSection} />
    </Switch>
  </div>
);

export default Menucontrol;
