// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';

import Messaging from 'web/firebase/Messaging';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import MenuItemView from 'web/pages/MenuItemView';
import Onboarding from 'web/pages/Onboarding';
import Eat from 'web/pages/Eat';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';
import AppBar from 'web/components/AppBar';
import Navigation from 'web/components/Navigation';
import SnackbarDispatcher from 'web/components/SnackbarDispatcher';

import * as FN from 'tabb-front/dist/lib/FN';

import withRoot from 'withRoot.js';

class App extends React.Component {

  constructor() {
    super();

    const success = Messaging.initialize();
    if (!success) {
      // TODO: initialize socket.io
    }
  }

  onNavigate = (evt, val) => {
    if (val === 0) this.props.history.push('/');
    else if (val === 1) this.props.history.push('/eat');
    else if (val === 2) {
      if (this.props.checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false') this.props.history.push('/services');
      else this.props.history.push('/checkin');
    }
  }

  match = (...paths) => {
    let matched = false;
    paths.forEach(path => {
      matched = matched || matchPath(this.props.location.pathname, { path }) != null;
    });
    return matched;
  }

  back = e => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  render() {
    const {
      location,
      checkedInRestaurant,
      history
    } = this.props;

    const TEMP_HOMEPAGE = true;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        {iosInstalled && <AppBar />}
        <div style={{marginBottom: 56}}>
          <Switch location={location}>
            <Route exact path="/" render={() => (
              TEMP_HOMEPAGE ? (
                <Redirect to="/restaurant/koreagrill"/>
              ) : (
                <Main/>
              )
            )}/>
            <Route path="/login" component={Onboarding} />
            <Route path="/signup" component={Onboarding} />

            <Route path="/checkin" component={Checkin} />
            <Route path="/restaurant/:subdomain" component={RestaurantView} />
            <Route path="/category/:id" component={CategoryView} />
            <Route path="/menu/item/:id" component={MenuItemView} />

            <Route path="/eat" component={Eat} />
            <Route path="/cart" component={Cart} />
            <Route path="/Bill" component={Bill} />
            <Route path="/receipt" component={Receipt} />
            <Route path="/services" component={Services} />
          </Switch>
        </div>
        <Navigation handleChange={this.onNavigate} checkedInRestaurant={checkedInRestaurant} value={(() => {
          if (this.match('/eat')) return 1;
          if (this.match('/checkin') || this.match('/services')) return 2;
          return 0;
        })()}/>

        <SnackbarDispatcher historyPush={history.push} />
      </div>
    );
  }
}

App = connect(
  (state) => ({
    loggedUserId: state.user.loggedUserId,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
  })
)(App);

const AppWrapper = () => (
  <div>
    <Router>
      <Route component={App} />
    </Router>
  </div>
);

export default withRoot(AppWrapper);
