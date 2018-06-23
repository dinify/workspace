// @flow
import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';

import Login from 'web/pages/Login';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import FoodView from 'web/pages/FoodView';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Main from 'web/pages/Main';

import OnboardingDialog from 'web/components/OnboardingDialog';

import withRoot from 'withRoot.js';

import { logoutInit } from 'ducks/auth/actions';
import { getLoggedUser } from 'ducks/user/selectors';

class ModalSwitch extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
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
    const { history, location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Main} />

          { /* Renders if user opens a link in a new tab */ }
          <Route path="/login" component={Main} />
          <Route path="/signup" component={Main} />

          <Route path="/checkin" component={Checkin} />
          <Route path="/restaurant/:subdomain" component={RestaurantView} />
          <Route path="/category/:id" component={FoodView} />
          <Route path="/food/:id" component={FoodView} />

          <Route path="/cart" component={Cart} />
          <Route path="/bill" component={Bill} />
          <Route path="/receipt" component={Receipt} />
        </Switch>
        <OnboardingDialog
          open={this.match('/login', '/signup')}
          isSignup={this.match('/signup')}
          onClose={this.back}
        />
      </div>
    );
  }
}

const App = () => (
  <div>
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  </div>
);

export default withRoot(App);
