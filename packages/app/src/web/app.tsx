import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { openDialogAction } from 'features/ui/actions';
import { matchPath, Redirect } from 'react-router';
import { connect } from 'react-redux';
// import { getOrderItemCount as getCartCount } from 'features/cart/selectors';
import * as routes from './routes';
import Checkin from './pages/Checkin';
import SignIn from '@dinify/common/src/components/SignIn';
import Services from './pages/Services';

import Navigation from './components/Navigation';
import { ServicesButtonContainer } from './components/services-button';
import { BottomBar } from './components/bottom-bar';
import { fetchStatusAsync } from 'features/restaurant/actions';
import { fetchBillAsync } from 'features/transaction/actions';
import { fetchCartAsync } from 'features/cart/actions';
import { useBottomBarVisible } from 'features/ui/selectors';

import Dialogs from './dialogs';
import Snackbars from './snackbars';
import {
  MenuItemScreen,
  AccountScreen,
  OrderScreen,
  SelectLanguageScreen,
  RestaurantViewScreen,
  RestaurantInfoScreen,
  MainScreen
} from './screens';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';

const App: React.FC<any> = props => {
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
  }, [user, fetchStatus, fetchCart, fetchBill]);

  const { action, push, location } = useHistory();

  // reset scroll position for new routes
  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }

  const match = (...paths: string[]) => {
    let matched = false;
    const get = (path: string) => {
      const m = matchPath(location.pathname, { path });
      return m === null ? false : m.isExact;
    };
    paths.forEach(path => {
      matched = matched || get(path);
    });
    return matched;
  };

  const isBottomBarVisible = useBottomBarVisible();
  const isAccountTab = match(routes.ACCOUNT) || match(routes.SIGNIN) || match(routes.LANGUAGE);
  const isLanguageSelect = match(routes.LANGUAGE);
  const isOrderScreen = match(routes.TAKEORDER);
  const isBottomBarRendered = !isAccountTab && !isOrderScreen && !isLanguageSelect;

  const onNavigate = (_: Event, val: number) => {
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

  const getMarginBottom = () => {
    let base = match(routes.CHECKIN) ? 0 : 56;
    if (isBottomBarVisible && isBottomBarRendered) return base + 56;
    return base;
  }

  // const back = e => {
  //   e.stopPropagation();
  //   history.goBack();
  // }

  const firebase = useFirebase();

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ paddingBottom: getMarginBottom() }}>
        <Switch>
          <Route exact path={routes.HOMEPAGE} component={MainScreen} />

          <Route
            path={routes.SIGNIN}
            component={(props: any) =>
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
      {isBottomBarRendered && (
        <BottomBar style={{ bottom: 56 }} onSelect={(type: any) => openDialog(type)} />
      )}

      <Dialogs />

      <Snackbars style={{ bottom: 56 + 56 / 2 }} />
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    user: state.firebase.auth,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    restaurant: state.restaurant.checkedInRestaurant ?
      state.restaurant.all[state.restaurant.checkedInRestaurant || '']
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
)(App);
