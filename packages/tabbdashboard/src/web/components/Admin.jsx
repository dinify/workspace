// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './FormBox';

import Input from 'react-enhanced-form'

import MainSection from './Main'
import BillingSection from './Billing'
import GuestsSection from './Guests'
import SalesSection from './Sales'
import EngagementSection from './Engagement'

import { Menu, MenuLink } from './Menu'

const Sidebar = styled.div`
  position: absolute;
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
    font-size: 16px;
    font-weight: 100;
    vertical-align: middle;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 240px;
  top: 0;
  height: 100vh;
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
          Administration
        </span>
      </Logo>

      <Menu>
        <MenuLink l={location} title="Main" to="/admin" />
        <MenuLink l={location} title="Analytics" to="/admin/analytics" />
        <MenuLink l={location} title="Billing" to="/admin/billing" />
      </Menu>
    </Sidebar>
    <Content>

      <Route exact path="/admin" component={MainSection} />
      <Route path="/admin/analytics" component={GuestsSection} />
      <Route path="/admin/billing" component={BillingSection} />

    </Content>
  </div>);

export default connect(
  state => ({}),
  {},
)(Dashboard);
