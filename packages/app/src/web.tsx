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
import { init as initi18n, localeMatcher } from '@dinify/common/src/lib/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import configureStore from './store';
import websockets from './websockets';
import { RootState } from 'typesafe-actions';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

let locale;
const langCookie = getCookie('language');
if (langCookie) {
  try {
    const content = JSON.parse(langCookie);
    locale = localeMatcher.match(content.primary).locale;
  } catch (e) {
    console.error('JSON parse error', e);
  }
}

const { 
  context, 
  I18nProvider 
} = initi18n({
  locale,
  namespace: 'app'
});

export const i18nContext = context;

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

websockets(store);

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
      <I18nProvider>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SnackbarProviderWrapper>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </SnackbarProviderWrapper>
        </ReactReduxFirebaseProvider>
      </I18nProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
