// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './styled/FormBox'
import { HorizontalLine } from './styled/HorizontalLine'
import Input from 'react-enhanced-form'
import { logoutInitAction } from '../../ducks/restaurant'
import SettingsSection from './Settings'
import MenucontrolSection from './Menucontrol'
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
  @media print {
    display: none;
  }
`

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
`

const Content = styled.div`
  position: absolute;
  left: 240px;
  top: 0;
  min-height: 100vh;
  width: calc(100% - 240px);
  background: #EFF3F6;
  color: #354052;
  padding: 70px 20px 0 20px;
`


const MenuItem = styled.li`
  list-style: none;
  margin: 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  vertical-align: middle;
  a {
    text-decoration: none;
    color: ${({active}) => active ? 'white': 'rgba(255,255,255,0.6)'};
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      color: white;
    }
  }
  i {
    font-size: 24px;
    vertical-align: middle;
    margin-right: 10px;
    width: 26px;
    display: inline-block;
  }
`

const Dashboard = ({ location, logout }) =>
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
        <MenuLink l={location} iconName="settings" title="Settings" to="/dashboard/settings" />
        <MenuLink l={location} iconName="restaurant_menu" title="Menu" to="/dashboard/menucontrol" />
        <MenuLink l={location} iconName="attach_money" title="Billing" to="/dashboard/billing" />
        <MenuLink l={location} iconName="group" title="Guests" to="/dashboard/guests" />
        <MenuLink l={location} iconName="assessment" title="Sales" to="/dashboard/sales" />
        <MenuLink l={location} iconName="show_chart" title="Engagement" to="/dashboard/engagement" />
        <HorizontalLine />
        <MenuItem onClick={logout}>
          <a>
            <i className="material-icons">exit_to_app</i>
            <span>LOG OUT</span>
          </a>
        </MenuItem>
      </Menu>

    </Sidebar>
    <Content>
      <Switch>
        <Redirect exact from="/dashboard" to="/dashboard/settings" />
        <Route path="/dashboard/settings" component={SettingsSection} />
        <Route path="/dashboard/menucontrol" component={MenucontrolSection} />
        <Route path="/dashboard/billing" component={BillingSection} />
        <Route path="/dashboard/guests" component={GuestsSection} />
        <Route path="/dashboard/sales" component={SalesSection} />
        <Route path="/dashboard/engagement" component={EngagementSection} />
      </Switch>
    </Content>
  </div>)

export default connect(
  state => ({}),
  {
    logout: logoutInitAction
  },
)(Dashboard)
