import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { getOrderItemCount as getCartCount } from './ducks/cart/selectors';
import App from './web/App';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import i18n from '@dinify/common/src/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import { ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps, ReactReduxFirebaseConfig } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { setNamespace as setTranslationsNamespace } from '@dinify/common/src/lib/i18n';

import configureStore from './store';
import websockets from './websockets';
import { RootState } from 'typesafe-actions';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

setTranslationsNamespace('app');

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

let language = { primary: navigator.language, other: [] };
const langCookie = getCookie('language');
if (langCookie) {
  try {
    language = JSON.parse(langCookie);
  } catch (e) {
    console.error('JSON parse error');
  }
}

export const i18nInstance = i18n({
  namespace: 'app',
  lang: language.primary,
  fallback: language.other
});

websockets(store, i18nInstance);

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
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SnackbarProviderWrapper>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </SnackbarProviderWrapper>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
