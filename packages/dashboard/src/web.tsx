import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from 'react-redux-firebase';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import {
  localeMatcher,
  IntlProvider,
  IntlConfig,
} from '@dinify/common/src/lib/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './web/App';
import configureStore from './configureStore';
import './index.css';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({dsn: "https://fe2fe060b40240a38b19bf4a1416bc83@sentry.io/1808391"});
}

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const intlConfig: IntlConfig = {
  namespace: 'dashboard',
};
const langCookie = getCookie('language');
if (langCookie) {
  try {
    // const content = JSON.parse(langCookie);
    intlConfig.locale = localeMatcher.match(langCookie).locale;
  } catch (e) {
    console.error('JSON parse error', e);
  }
}

const snackbarProps = {
  autoHideDuration: 3500,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

// react-redux-firebase config
const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'profiles',
  updateProfileOnLogin: true,
  useFirestoreForProfile: true,
};

const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SnackbarProvider SnackbarProps={snackbarProps}>
            <DragDropContextProvider backend={HTML5Backend}>
              <ConnectedRouter history={history}>
                <App history={history} />
              </ConnectedRouter>
            </DragDropContextProvider>
          </SnackbarProvider>
        </ReactReduxFirebaseProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
