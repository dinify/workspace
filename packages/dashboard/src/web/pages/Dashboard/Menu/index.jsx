import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import ControlSection from './Control';
import CustomizationsSection from './Customizations';
import TranslationsSection from './Translations';

const Menucontrol = () => (
  <div>
    <Switch>
      <Redirect exact from="/menu" to="/menu/control" />
      <Route path="/menu/control" component={ControlSection} />
      <Route path="/menu/customizations" component={CustomizationsSection} />
      <Route path="/menu/translations" component={TranslationsSection} />
    </Switch>
  </div>
);

export default Menucontrol;
