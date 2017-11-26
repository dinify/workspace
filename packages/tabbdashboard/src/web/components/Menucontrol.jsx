// @flow
import React from 'react'
import styled from 'styled-components'
import type { Error } from '../../flow'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Form, Text } from 'react-form'

import { Header } from './styled/Header'
import { HorMenu, HorMenuLink } from './Menu'

import ControlSection from './MenuSection/Control.jsx';
import OptionsSection from './MenuSection/Options.jsx';
import AddonsSection from './MenuSection/Addons.jsx';

const Menucontrol = ({ location }) =>
  (<div>
      <Header>
        <HorMenu>
          <HorMenuLink l={location} title="Menu Control" to="/dashboard/menu/control" />
          <HorMenuLink l={location} title="" to="/dashboard/menu/options" />
          <HorMenuLink l={location} title="" to="/dashboard/menu/addons" />
        </HorMenu>
      </Header>

      <Switch>
        <Redirect exact from="/dashboard/menu" to="/dashboard/menu/control" />
        <Route path="/dashboard/menu/control" component={ControlSection} />
        <Route path="/dashboard/menu/options" component={OptionsSection} />
        <Route path="/dashboard/menu/addons" component={AddonsSection} />
      </Switch>

  </div>);

export default Menucontrol
