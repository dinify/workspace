// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './styled/FormBox';

import Input from 'react-enhanced-form'

import SettingsSection from './Settings'
import BillingSection from './Billing'
import GuestsSection from './Guests'
import SalesSection from './Sales'
import EngagementSection from './Engagement'

import { Menu, MenuLink } from './Menu'

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  display: flex;
  align-items: top;
  justify-content: center;
`;

const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  width: 240px;
  text-align: center;
  background: rgba(0,0,0,0.15);
  img {
    width: 40px;
    vertical-align: middle;
    margin-right: 10px;
  }
  span {
    font-size: 22px;
    font-weight: 100;
    vertical-align: middle;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 240px;
  top: 0;
  min-height: 100vh;
  width: calc(100% - 240px);
  background: #EFF3F6;
  color: #354052;
  padding: 70px 20px 0 20px;
`;

const Dashboard = ({ location }) =>
  (<div>
    <Sidebar>
      <Logo>
        <img
          src={require('./logo.svg')}
        />
        <span>
          Dashboard
        </span>
      </Logo>

      <Menu>
        <MenuLink l={location} title="Settings" to="/dashboard/settings" />
        <MenuLink l={location} title="Billing" to="/dashboard/billing" />
        <MenuLink l={location} title="Guests" to="/dashboard/guests" />
        <MenuLink l={location} title="Sales" to="/dashboard/sales" />
        <MenuLink l={location} title="Engagement" to="/dashboard/engagement" />
      </Menu>
    </Sidebar>
    <Content>

      <Redirect from="/dashboard/" to="/dashboard/settings" />
      <Route path="/dashboard/settings" component={SettingsSection} />
      <Route path="/dashboard/billing" component={BillingSection} />
      <Route path="/dashboard/guests" component={GuestsSection} />
      <Route path="/dashboard/sales" component={SalesSection} />
      <Route path="/dashboard/engagement" component={EngagementSection} />

    </Content>
  </div>);

export default connect(
  state => ({}),
  {},
)(Dashboard);
