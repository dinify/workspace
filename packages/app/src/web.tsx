import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { getOrderItemCount as getCartCount } from './ducks/cart/selectors';
import App from './web/app';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import { ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps, ReactReduxFirebaseConfig } from 'react-redux-firebase';
import { localeMatcher, IntlConfig, IntlProvider } from '@dinify/common/src/lib/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import configureStore from './store';
import { SocketReduxProvider, SocketConfig } from './lib/socket';
import { RootState } from 'typesafe-actions';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

// TODO: move these to environment variables

const intlConfig: IntlConfig = {
  namespace: 'app'
  // bundleUri: 'https://cdn.jsdelivr.net/npm/@phensley/cldr@0.19.3/packs', // TODO: move this to static.dinify.app
  // translationsUri: 'https://static.dinify.app/i18n/translations'
};
const langCookie = getCookie('language');
if (langCookie) {
  try {
    const content = JSON.parse(langCookie);
    intlConfig.locale = localeMatcher.match(content.primary).locale;
  } catch (e) {
    console.error('JSON parse error', e);
  }
}

const socketConfig: SocketConfig = {
  uri: 'https://ws.dinify.app'
};

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

// react-redux-firebase config
const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'profiles',
  updateProfileOnLogin: true,
  useFirestoreForProfile: true
};

const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

const SnackbarProviderWrapper = connect(
  (state: RootState) => ({
    cartItemCount: getCartCount(state.cart),
    billItemCount: state.transaction.orderItemsCount
  })
)(({
  cartItemCount,
  billItemCount,
  children, 
  ...props
}: any) => {
  const bottomBarVisible = cartItemCount > 0 || billItemCount > 0;
  const snackbarProps = {
    autoHideDuration: 5000,
    style: {
      bottom: bottomBarVisible ? (56 + 56) : 56,
      zIndex: 1200
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    }
  };
  return (
    <SnackbarProvider SnackbarProps={snackbarProps} {...props}>
      {children}
    </SnackbarProvider>
  );
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SocketReduxProvider {...socketConfig}>
            <SnackbarProviderWrapper>
              <ConnectedRouter history={history}>
                <App />
              </ConnectedRouter>
            </SnackbarProviderWrapper>
          </SocketReduxProvider>
        </ReactReduxFirebaseProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
