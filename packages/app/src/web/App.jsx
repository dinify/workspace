// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { openDialog, closeDialog } from 'ducks/ui/actions';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import MenuItemView from 'web/pages/MenuItemView';
import SignIn from '@dinify/common/dist/components/SignIn';
import Account from 'web/pages/Account';
import Eat from 'web/pages/Eat';
import Cart from 'web/pages/Cart';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';

import AccountSignIn from 'web/components/AccountSignIn';
import AppBar from 'web/components/AppBar';
import Navigation from 'web/components/Navigation';

import * as FN from '@dinify/common/dist/lib/FN';

import withRoot from 'withRoot.js';

const HOMEPAGE = '/';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { history } = this.props;
    if (history.action === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }

  onNavigate = (evt, val) => {
    const { history, checkedInRestaurant } = this.props;
    if (val === 0) history.push('/');
    else if (val === 1) history.push('/eat');
    else if (val === 2) {
      if (checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false') history.push('/services');
      else history.push('/checkin');
    }
  }

  match = (...paths) => {
    const { location } = this.props;
    let matched = false;
    paths.forEach(path => {
      matched = matched || matchPath(location.pathname, { path }) != null;
    });
    return matched;
  }

  back = e => {
    const { history } = this.props;
    e.stopPropagation();
    history.goBack();
  }

  render() {
    const {
      location,
      checkedInRestaurant,
      dialogs,
      closeDialog,
      history,
      user
    } = this.props;

    return (
      <div>
        <AppBar>
          <AccountSignIn visible={!this.match(['/signin', '/account'])} history={history}/>
        </AppBar>
        <div style={{marginBottom: 56}}>
          <Switch location={location}>
            <Route exact path="/" render={() => (
              HOMEPAGE !== '/' ? (
                <Redirect to={HOMEPAGE}/>
              ) : (
                <Main/>
              )
            )}/>
            <Route path="/signin" component={() => {
              return user.isEmpty ? <SignIn user={user}/> :
              <Redirect to={HOMEPAGE}/>
            }} />
            <Route path="/account" component={() => {
              return (!user.isEmpty || !user.isLoaded) ? <Account history={history}/> :
              <Redirect to="/signin"/>
            }} />

            <Route path="/checkin" component={Checkin} />
            <Route path="/restaurant/:subdomain" component={RestaurantView} />
            <Route path="/menu/item/:id" component={MenuItemView} />

            <Route path="/eat" component={Eat} />
            <Route path="/cart" component={Cart} />
            <Route path="/receipt" component={Receipt} />
            <Route path="/services" component={Services} />
          </Switch>
        </div>
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(this.match(['/signin', '/account']) ? 1 : 0)}}>
          {style =>
            <Navigation
              style={{
                transform: `translate3d(0, ${style.x * 56}px, 0)`
              }}
              handleChange={this.onNavigate}
              checkedInRestaurant={checkedInRestaurant}
              value={(() => {
                if (this.match('/eat')) return 1;
                if (this.match('/checkin') || this.match('/services')) return 2;
                return 0;
              })()}/>
          }
        </Motion>
        {FN.MapToList(dialogs).map(dialog => {
          return dialog.component({
            key: dialog.id,
            id: dialog.id,
            open: dialog.open,
            onClose: () => { closeDialog(dialog.id) }
          });
        })}
      </div>
    );
  }
}

App = connect(
  (state) => ({
    user: state.firebase.auth,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    dialogs: state.ui.dialogs
  }),
  {
    openDialog,
    closeDialog,
  }
)(App);

const AppWrapper = () => (
  <div>
    <Router>
      <Route component={App} />
    </Router>
  </div>
);

export default withRoot(AppWrapper);
