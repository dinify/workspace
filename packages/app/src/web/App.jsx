import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { openDialog } from 'ducks/ui/actions';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import { getOrderItemCount as getCartCount } from 'ducks/cart/selectors';

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
import { fetchStatusAsync } from 'ducks/restaurant/actions.ts';
import { fetchBillAsync } from 'ducks/transaction/actions.ts';
import { fetchCartAsync } from 'ducks/cart/actions.ts';


import withRoot from 'withRoot.js';
import Dialogs from './Dialogs.tsx';

const onBottomBarSelect = (type, openDialog) => {
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

const handleServicesClick = (openDialog) => {
  openDialog({
    id: 'services',
    component: (props) => (
      <Dialog fullScreen {...props}>
        <ServicesScreen onClose={props.onClose}/>
      </Dialog>
    )
  });
}

const App = (props) => {
  const { 
    checkedInRestaurant,
    history,
    location,
    user,
    openDialog,
    fetchStatus,
    fetchCart,
    fetchBill
  } = props;

  useEffect(() => {
    if (!user.isEmpty) {
      fetchStatus();
      fetchCart();
      fetchBill();
    }
  }, [user]);

  if (history.action === 'PUSH') {
    window.scrollTo(0, 0);
  }

  const onNavigate = (evt, val) => {
    if (val === 0) history.push(routes.HOMEPAGE);
    else if (val === 1) history.push(routes.ACCOUNT);
  }

  const match = (...paths) => {
    let matched = false;
    paths.forEach(path => {
      matched = matched || matchPath(location.pathname, { path }) != null;
    });
    return matched;
  }
  // const back = e => {
  //   e.stopPropagation();
  //   history.goBack();
  // }
  const isAccountTab = match(routes.ACCOUNT) || match(routes.SIGNIN);

  return (
    <div style={{position: 'relative'}}>
      <div style={{ marginBottom: match(routes.CHECKIN) ? 0 : 56 }}>
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
      <Navigation
        key="bottom-navigation"
        // borderVisible={!bottomBarOpen || isAccountTab}
        handleChange={onNavigate}
        checkedInRestaurant={checkedInRestaurant}
        value={(() => {
          if (isAccountTab) return 1;
          return 0;
        })()}/>
      <ServicesButtonContainer anchor={56} onClick={() => handleServicesClick(openDialog)} />
      {!isAccountTab && <BottomBar style={{bottom: 56}} onSelect={(type) => onBottomBarSelect(type, openDialog)} />}
      <Dialogs />
    </div>
  );
}

export default connect(
  (state) => ({
    user: state.firebase.auth,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    bottomBarOpen: getCartCount(state.cart) > 0 || state.transaction.orderItemsCount > 0,
    location: state.router.location
  }),
  {
    openDialog,
    fetchStatus: fetchStatusAsync.request,
    fetchCart: fetchCartAsync.request,
    fetchBill: fetchBillAsync.request
  }
)(withRoot(App));

