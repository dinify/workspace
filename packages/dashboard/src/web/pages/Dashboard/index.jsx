// @flow
import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'

import SettingsSection from './Settings';
import MenuSection from './Menu';
import BillingSection from './Billing';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import AttachMoney from '@material-ui/icons/AttachMoney';

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  @media print {
    display: none;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 240px;
  top: 0;
  min-height: 100vh;
  width: calc(100% - 240px);
  background: #eff3f6;
  color: #354052;
  padding: 70px 20px 0 20px;
`;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Montserrat',
    subheading: {
      fontWeight: 100
    }
  }
});

const Dashboard = ({ firebase }) => (
  <div>
    <Sidebar>

      <MuiThemeProvider theme={theme}>
        <List
          component="nav"
        >
          <Link to="/">
            <ListItem button divider>
              <ListItemIcon>
                <img src={require('assets/img/logo.svg')} width={26} height={28} alt="" />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to="/settings">
            <ListItem button>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText inset primary="Settings" />
            </ListItem>
          </Link>

          <Link to="/menu">
            <ListItem button>
              <ListItemIcon>
                <RestaurantMenu />
              </ListItemIcon>
              <ListItemText inset primary="Menu" />
            </ListItem>
          </Link>

          <Link to="/billing">
            <ListItem button divider>
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText inset primary="Billing" />
            </ListItem>
          </Link>

          <ListItem button onClick={() => firebase.logout()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText inset primary="Log out" />
          </ListItem>
        </List>
      </MuiThemeProvider>


    </Sidebar>
    <Content>
      <Switch>
        <Redirect exact from="/" to="/settings" />
        <Route path="/settings" component={SettingsSection} />
        <Route path="/menu" component={MenuSection} />
        <Route path="/billing" component={BillingSection} />
        {
          //  <Route path="/guests" component={GuestsSection} />
          //  <Route path="/sales" component={SalesSection} />
          //  <Route path="/engagement" component={EngagementSection} />
        }
      </Switch>
    </Content>
  </div>
);

export default withFirebase(Dashboard);
