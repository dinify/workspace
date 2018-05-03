// @flow
import React from 'react'
import styled from 'styled-components'
import type { Error } from '../../flow'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Form, Text } from 'react-form'

import { Header } from './styled/Header'
import { HorMenu, HorMenuLink } from './Menu'

import ControlSection from './MenuSection/Control.jsx';
//import OptionsSection from './MenuSection/Options.jsx';
import AddonsSection from './MenuSection/Addons.jsx';

const Menucontrol = ({ location }) =>
  (<div>
      <Header>
        <HorMenu>
          <HorMenuLink l={location} title="Menu Control" to="/menu/control" />
          <HorMenuLink l={location} title="Addons" to="/menu/addons" />
        </HorMenu>
      </Header>

      <Switch>
        <Redirect exact from="/menu" to="/menu/control" />
        <Route path="/menu/control" component={ControlSection} />
        <Route path="/menu/addons" component={AddonsSection} />
      </Switch>

  </div>);

export default Menucontrol
