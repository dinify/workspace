import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { openDialog, closeDialog } from 'ducks/ui/actions';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import { Motion } from 'react-motion';

import Dialog from '@material-ui/core/Dialog';

import * as routes from 'web/routes';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import MenuItemView from 'web/pages/MenuItemView';
import SignIn from '@dinify/common/dist/components/SignIn';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';

import Navigation from 'web/components/Navigation';
import { ServicesScreen, AccountScreen } from 'web/screens';
import { ServicesButtonContainer } from 'web/components/services-button';
import { BottomBar } from 'web/components/bottom-bar';
import { CartPage } from 'web/components/cart';
import { BillPage } from 'web/components/bill';

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
    else if (val === 1) history.push(routes.ACCOUNT);
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

  onBottomBarSelect = (type) => {
    const { openDialog } = this.props;
    if (type === 'cart') {
      openDialog({
        id: 'cart-page',
        component: (props) => (
          <Dialog fullScreen {...props}>
            <CartPage onClose={props.onClose}/>
          </Dialog>
        )
      });
    }
    if (type === 'bill') {
      openDialog({
        id: 'bill-page',
        component: (props) => (
          <Dialog fullScreen {...props}>
            <BillPage onClose={props.onClose}/>
          </Dialog>
        )
      });
    }
  }

  handleServicesClick = () => {
    const { openDialog } = this.props;
    openDialog({
      id: 'services',
      component: (props) => (
        <Dialog fullScreen {...props}>
          <ServicesScreen onClose={props.onClose}/>
        </Dialog>
      )
    });
  }

  render() {
    const {
      checkedInRestaurant,
      dialogs,
      closeDialog,
      history,
      user
    } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <div style={{ marginBottom: this.match(routes.CHECKIN) ? 0 : 56 }}>
          <Switch>
            <Route exact path={routes.HOMEPAGE} render={() => (
              <Main/>
            )}/>
            <Route path={routes.SIGNIN} component={() => <SignIn user={user}/>} />
            <Route path={routes.ACCOUNT} component={() => {
              return (!user.isEmpty || !user.isLoaded) ? <AccountScreen history={history}/> :
              <Redirect to={routes.SIGNIN}/>
            }} />

            <Route path={routes.CHECKIN} component={Checkin} />
            <Route path={routes.SERVICES} component={Services} />

            <Route path={routes.RESTAURANT} component={RestaurantView} />
            <Route path={routes.MENUITEM} component={MenuItemView} />
            
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
                if (this.match(routes.ACCOUNT) || this.match(routes.SIGNIN)) return 1;
                return 0;
              })()}/>
          }
        </Motion>
        <ServicesButtonContainer anchor={56} onClick={this.handleServicesClick} />
        <BottomBar style={{bottom: 56}} onSelect={this.onBottomBarSelect} />
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
