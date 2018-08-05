// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Close from 'icons/Close';

import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import MenuItemView from 'web/pages/MenuItemView';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';
import AppBar from 'web/components/AppBar';
import cartTypes from 'ducks/cart/types';
import * as FN from 'lib/FN';

import OnboardingDialog from 'web/components/OnboardingDialog';

import withRoot from 'withRoot.js';

class ModalSwitch extends React.Component {

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

  previousLocation = this.props.location;

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
    const { location, addToCartDone, history } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        {iosInstalled && <AppBar />}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Main} />

          { /* Renders if user opens a link in a new tab */ }
          <Route path="/login" component={Main} />
          <Route path="/signup" component={Main} />

          <Route path="/checkin" component={Checkin} />
          <Route path="/restaurant/:subdomain" component={RestaurantView} />
          <Route path="/category/:id" component={CategoryView} />
          <Route path="/menu/item/:id" component={MenuItemView} />

          <Route path="/cart" component={Cart} />
          <Route path="/bill" component={Bill} />
          <Route path="/receipt" component={Receipt} />
          <Route path="/services" component={Services} />
        </Switch>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={addToCartDone}
            autoHideDuration={6000}
            onClose={() => {}}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Added to cart</span>}
            action={[
              <Button key="cart" color="inherit" size="small" onClick={() => history.push('/cart')}>
                Go to cart
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => {}}>
                <Close />
              </IconButton>,
            ]}
          />
        <OnboardingDialog
          open={this.match('/login', '/signup')}
          isSignup={this.match('/signup')}
          onClose={this.back}
        />
      </div>
    );
  }
}

ModalSwitch = connect(
  (state) => ({
    addToCartDone: state.ui.progressMap[cartTypes.ADD_TO_CART_DONE]
  }),
  {

  }
)(ModalSwitch);

const App = () => (
  <div>
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  </div>
);

export default withRoot(App);
