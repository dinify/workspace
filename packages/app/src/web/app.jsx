import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { openDialogAction } from 'features/ui/actions';
import { matchPath, Redirect } from 'react-router';
import { connect } from 'react-redux';
// import { getOrderItemCount as getCartCount } from 'features/cart/selectors';
import * as routes from 'web/routes';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import SignIn from '@dinify/common/src/components/SignIn';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';

import Navigation from 'web/components/Navigation';
import { ServicesButtonContainer } from 'web/components/services-button';
import { BottomBar } from 'web/components/bottom-bar';
import { fetchStatusAsync } from 'features/restaurant/actions.ts';
import { fetchBillAsync } from 'features/transaction/actions.ts';
import { fetchCartAsync } from 'features/cart/actions.ts';

import { withRoot } from 'withRoot';
import Dialogs from './dialogs.tsx';
import Snackbars from './snackbars.tsx';
import findLast from 'ramda/es/findLast';
import {
  MenuItemScreen,
  AccountScreen,
  OrderScreen,
  SelectLanguageScreen,
  RestaurantViewScreen,
  RestaurantInfoScreen
} from './screens';
import { useFirebase } from 'react-redux-firebase';

const App = props => {
  const {
    checkedInRestaurant,
    user,
    openDialog,
    fetchStatus,
    fetchCart,
    fetchBill,
    restaurant
  } = props;

  useEffect(() => {
    if (!user.isEmpty) {
      fetchStatus();
      fetchCart();
      fetchBill();
    }
  }, [user]);

  const { action, push, location } = useHistory();

  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }

  const match = (...paths) => {
    let matched = false;
    const get = path => {
      const m = matchPath(location.pathname, { path });
      return m === null ? false : m.isExact;
    };
    paths.forEach(path => {
      matched = matched || get(path);
    });
    return matched;
  };

  const isAccountTab = match(routes.ACCOUNT) || match(routes.SIGNIN) || match(routes.LANGUAGE);
  const isLanguageSelect = match(routes.LANGUAGE);
  const isOrderScreen = match(routes.TAKEORDER);

  const onNavigate = (evt, val) => {
    if (val === 0 && !match(routes.HOMEPAGE)) {
      push(routes.HOMEPAGE);
    }
    if (val === 1 && !match(routes.ACCOUNT)) {
      push(routes.ACCOUNT);
    }
    if (val === 0 || val === 1) {
      // TODO: current screen content scroll to top
    }
  };

  // const back = e => {
  //   e.stopPropagation();
  //   history.goBack();
  // }

  const firebase = useFirebase();

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: match(routes.CHECKIN) ? 0 : 56 }}>
        <Switch>
          <Route exact path={routes.HOMEPAGE} render={() => <Main />} />

          <Route
            path={routes.SIGNIN}
            component={(props) =>
              !user.isEmpty && !user.isAnonymous ? (
                <Redirect to={routes.ACCOUNT} />
              ) : (
                  <SignIn {...props} user={user} firebase={firebase} />
                )
            }
          />

          <Route path={routes.LANGUAGE} component={SelectLanguageScreen} />
          <Route path={routes.ACCOUNT} component={AccountScreen} />

          <Route path={routes.CHECKIN} component={Checkin} />
          <Route path={routes.SERVICES} component={Services} />

          <Route path={routes.INFO} component={RestaurantInfoScreen} />
          <Route path={routes.RESTAURANT} component={RestaurantViewScreen} />
          <Route path={routes.MENUITEM} component={MenuItemScreen} />

          <Route path={routes.RECEIPT} component={Receipt} />
          <Route path={routes.TAKEORDER} component={OrderScreen} />
        </Switch>
      </div>

      {!isOrderScreen && !isLanguageSelect && <>
        <Navigation
          key="bottom-navigation"
          // borderVisible={!bottomBarOpen || isAccountTab}
          handleChange={onNavigate}
          checkedInRestaurant={checkedInRestaurant}
          value={(() => {
            if (isAccountTab) return 1;
            return 0;
          })()}
        />
        {checkedInRestaurant && restaurant && restaurant.settings.serviceCalls &&
          <ServicesButtonContainer
            anchor={56}
            onClick={() => openDialog('services')}
          />
        }
      </>}
      {!isAccountTab && !isOrderScreen && !isLanguageSelect && (
        <BottomBar style={{ bottom: 56 }} onSelect={type => openDialog(type)} />
      )}

      <Dialogs />

      <Snackbars style={{ bottom: 56 + 56 / 2 }} />
    </div>
  );
};

export default connect(
  state => ({
    user: state.firebase.auth,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    restaurant: state.restaurant.checkedInRestaurant ?
      state.restaurant.all[state.restaurant.checkedInRestaurant]
      :
      null,
    // bottomBarOpen: getCartCount(state.cart) > 0 || state.transaction.orderItemsCount > 0,
    pathnames: state.router.pathnames,
  }),
  {
    openDialog: openDialogAction,
    fetchStatus: fetchStatusAsync.request,
    fetchCart: fetchCartAsync.request,
    fetchBill: fetchBillAsync.request,
  },
)(withRoot(App));
