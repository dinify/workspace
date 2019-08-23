import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { openDialog, closeDialog } from 'ducks/ui/actions';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import { Motion } from 'react-motion';
import { cartExists } from 'ducks/cart/selectors';

import * as routes from 'web/routes';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import MenuItemView from 'web/pages/MenuItemView';
import SignIn from '@dinify/common/dist/components/SignIn';
import Account from 'web/pages/Account';
import DineIn from 'web/pages/DineIn';
import Cart from 'web/pages/Cart';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';

import AccountSignIn from 'web/components/AccountSignIn';
import AppBar from 'web/components/AppBar';
import Navigation from 'web/components/Navigation';
import { Bar as CartBar } from 'web/components/cart';

import * as FN from '@dinify/common/dist/lib/FN';

import withRoot from 'withRoot.js';

class App extends React.Component {
  componentDidUpdate() {
    const { history } = this.props;
    if (history.action === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }

  onNavigate = (evt, val) => {
    const { history } = this.props;
    if (val === 0) history.push(routes.HOMEPAGE);
    else if (val === 1) history.push(routes.DINEIN);
    else if (val === 2) history.push(routes.ACCOUNT);
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
      cartExists,
      checkedInRestaurant,
      dialogs,
      closeDialog,
      history,
      user
    } = this.props;

    return (
      <div style={{position: 'relative'}}>
        <AppBar history={history}>
          <AccountSignIn visible={!this.match([routes.SIGNIN, routes.ACCOUNT])} history={history}/>
        </AppBar>
        <div style={{ marginBottom: 56 }}>
          <Switch>
            <Route exact path={routes.HOMEPAGE} render={() => (
              <Main/>
            )}/>
            <Route path={routes.SIGNIN} component={() => {
              return user.isEmpty ? <SignIn user={user}/> :
              <Redirect to={routes.HOMEPAGE}/>
            }} />
            <Route path={routes.ACCOUNT} component={() => {
              return (!user.isEmpty || !user.isLoaded) ? <Account history={history}/> :
              <Redirect to={routes.SIGNIN}/>
            }} />

            <Route path={routes.CHECKIN} component={Checkin} />
            <Route path={routes.SERVICES} component={Services} />

            <Route path={routes.RESTAURANT} component={RestaurantView} />
            <Route path={routes.MENUITEM} component={MenuItemView} />

            <Route path={routes.DINEIN}  component={DineIn} />
            <Route path={routes.CART}  component={Cart} />
            <Route path={routes.RECEIPT} component={Receipt} />
          </Switch>
        </div>
        <Motion
          key="bottom-navigation-wrapper"
          defaultStyle={{x: 0}}
          style={{x: 0}}>
          {style =>
            <Navigation
              key="bottom-navigation"
              style={{
                transform: `translate3d(0, ${style.x * 56}px, 0)`
              }}
              handleChange={this.onNavigate}
              checkedInRestaurant={checkedInRestaurant}
              value={(() => {
                if (this.match(routes.DINEIN)) return 1;
                if (this.match(routes.ACCOUNT) || this.match(routes.SIGNIN)) return 2;
                return 0;
              })()}/>
          }
        </Motion>
        <Motion
          key="cart-bar-wrapper"
          defaultStyle={{x: 0}}
          style={{x: cartExists ? 0 : 1}}>
          {style =>
            <CartBar
              key="cart-bar"
              style={{
                bottom: 56,
                transform: `translate3d(0, ${style.x * 56}px, 0)`
              }}/>
          }
        </Motion>
        {FN.MapToList(dialogs).map(dialog =>
          dialog.component({
            key: dialog.id,
            id: dialog.id,
            open: dialog.open,
            onClose: () => { closeDialog(dialog.id) }
          })
        )}
      </div>
    );
  }
}

App = connect(
  (state) => ({
    user: state.firebase.auth,
    cartExists: cartExists(state),
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    dialogs: state.ui.dialogs,
    location: state.router.location
  }),
  {
    openDialog,
    closeDialog,
  }
)(App);

export default withRoot(App);
