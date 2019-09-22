import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { getOrderItemCount as getCartCount } from './ducks/cart/selectors';
import App from 'web/App';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import i18n from '@dinify/common/dist/i18n'
import { getCookie } from '@dinify/common/dist/lib/FN';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

import configureStore from './store/index.ts';
import websockets from './websockets';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

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
const rrfConfig = {
  userProfile: 'profiles',
  updateProfileOnLogin: true,
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData) => {
    // make sure default profile values are populated
    return {
      ...profileData,
      language: {
        primary: navigator.language,
        other: [],
        ...profileData.language
      }
    };
  }
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

const SnackbarProviderWrapper = connect(
  (state) => ({
    cartItemCount: getCartCount(state.cart),
    billItemCount: state.transaction.orderItemsCount
  })
)(({
  cartItemCount,
  billItemCount,
  children, 
  ...props
}) => {
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
            <App history={history} />
          </ConnectedRouter>
        </SnackbarProviderWrapper>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
