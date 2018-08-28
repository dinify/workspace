// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';

import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import MenuItemView from 'web/pages/MenuItemView';
import Onboarding from 'web/pages/Onboarding';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';
import AppBar from 'web/components/AppBar';
import Navigation from 'web/components/Navigation';
import SnackbarDispatcher from 'web/components/SnackbarDispatcher';

import * as FN from 'lib/FN';

import withRoot from 'withRoot.js';

class ModalSwitch extends React.Component {
  onNavigate = (evt, val) => {
    if (val === 0) this.props.history.push('/');
    else if (val === 1) this.props.history.push('/cart');
    else if (val === 2) this.props.history.push('/bill');
    else if (val === 3) {
      if (this.props.checkedInRestaurant) this.props.history.push('/services');
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
      loggedUserId,
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

            <Route path="/cart" component={Cart} />
            <Route path="/bill" component={Bill} />
            <Route path="/receipt" component={Receipt} />
            <Route path="/services" component={Services} />
          </Switch>
        </div>
        <Navigation handleChange={this.onNavigate} checkedInRestaurant={checkedInRestaurant} value={(() => {
          if (this.match('/cart')) return 1;
          if (this.match('/bill')) return 2;
          if (this.match('/checkin') || this.match('/services')) return 3;
          return 0;
        })()}/>

        <SnackbarDispatcher historyPush={history.push} />
      </div>
    );
  }
}

ModalSwitch = connect(
  (state) => ({
    loggedUserId: state.user.loggedUserId,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
  })
)(ModalSwitch);

const App = () => (
  <div>
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  </div>
);

export default withRoot(App);
