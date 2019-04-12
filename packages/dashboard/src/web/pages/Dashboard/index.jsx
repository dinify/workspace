// @flow
import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import SettingsSection from './Settings';
import MenuSection from './Menu';
import BillingSection from './Billing';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import AttachMoney from '@material-ui/icons/AttachMoney';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { toggleSection } from 'ducks/ui/actions';

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
  padding: 10px 20px 0 20px;
`;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Lato',
    subheading: {
      fontWeight: 300
    }
  }
});
const contentTheme = createMuiTheme({
  typography: {
    fontFamily: 'Lato',
    subheading: {
      fontWeight: 300
    }
  }
});

const styles = theme => ({
  nested: {
    paddingLeft: 40,
    background: 'rgba(0,0,0,0.3)',
  },
  navIcon: {
    margin: 0,
    paddingLeft: theme.spacing.unit * 2
  },
  navText: {
    color: 'white',
    fontSize: '14px',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  nestedText: {
    color: 'white',
    fontSize: '12px',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }
});

const listTextStyle = {
  textTransform: 'uppercase',
  fontSize: '12px',
  letterSpacing: '1.5px',
  color: 'white'
}

const shouldOpen = (openedIndex, index, location, section) => {
  if (openedIndex === -1) {
    return location.pathname.includes(section.path)
  }
  return openedIndex === index;
}

const Dashboard = ({ firebase, classes, location, openedIndex, toggleSection }) => {
  const { t } = useTranslation();
  const sections = [
    {
      name: t('nav.settings'),
      icon: <Settings />,
      path: '/settings',
      subsections: [
        {
          name: t('nav.mainInfo'),
          path: '/settings/main'
        },
        {
          name: t('nav.services'),
          path: '/settings/services'
        },
        {
          name: t('nav.waiterboards'),
          path: '/settings/waiterboards'
        },
        {
          name: t('nav.tableCodes'),
          path: '/settings/tablecodes'
        },
      ]
    },
    {
      name: t('nav.menu'),
      icon: <RestaurantMenu />,
      path: '/menu',
      subsections: [
        {
          name: t('nav.menuEditor'),
          path: '/menu/control'
        },
        {
          name: t('nav.customizations'),
          path: '/menu/customizations'
        },
        {
          name: t('nav.translations'),
          path: '/menu/translations'
        },
      ]
    },
    // {
    //   name: 'Billing',
    //   icon: <AttachMoney />,
    //   path: '/billing'
    // },
  ]
  return (
    <div>
      <Sidebar>

        <MuiThemeProvider theme={theme}>
          <List
            component="nav"
            style={{paddingTop: 0}}
          >
            <Link to="/">
              <ListItem button divider>
                <ListItemIcon className={classes.navIcon}>
                  <img src={require('assets/img/logo.svg')} width={26} height={36} alt="" />
                </ListItemIcon>
                <ListItemText inset primary="Dashboard" disableTypography className={classes.navText} />
              </ListItem>
            </Link>

            {sections.map((section, index) =>
              <div key={`nav-section-${index}`}>
                <ListItem button onClick={() => toggleSection(index)}>
                  <ListItemIcon className={classes.navIcon}>
                    {!!section.icon && section.icon}
                  </ListItemIcon>
                  <ListItemText inset primary={section.name} disableTypography className={classes.navText} />
                  {section.subsections && (shouldOpen(openedIndex, index, location, section) ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                {section.subsections &&
                  <Collapse in={shouldOpen(openedIndex, index, location, section)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {section.subsections.map((subsection, subIndex) =>
                        <Link to={subsection.path}>
                          <ListItem
                            selected={location.pathname === subsection.path}
                            button
                            key={`nav-section-${index}-${subIndex}`}
                            className={classes.nested}
                          >
                            <ListItemIcon>
                              {!!subsection.icon && subsection.icon}
                            </ListItemIcon>
                            <ListItemText
                              inset
                              primary={subsection.name}
                              disableTypography
                              className={classes.nestedText}
                            />
                          </ListItem>  
                        </Link>                      
                      )}
                    </List>
                  </Collapse>
                }
              </div>
            )}
            <ListItem button onClick={() => firebase.logout()}>
              <ListItemIcon className={classes.navIcon}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText inset primary={t('user.logOut')} />
            </ListItem>
          </List>
        </MuiThemeProvider>
      </Sidebar>
      <Content>
        <MuiThemeProvider theme={contentTheme}>
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
        </MuiThemeProvider>
      </Content>
    </div>
  )
}

export default compose(
  withFirebase,
  withStyles(styles),
  connect((state) => ({
    openedIndex: state.ui.navOpenedIndex
  }), {
    toggleSection
  })
)(Dashboard);

