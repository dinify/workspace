import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from 'react-redux-firebase';
import { ConnectedRouter } from 'connected-react-router';
import {
  localeMatcher,
  IntlProvider,
  IntlConfig,
} from '@dinify/common/src/lib/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './web/components/App';
import configureStore from './configureStore';
import './index.css';
import websockets from './websockets';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const intlConfig: IntlConfig = {
  namespace: 'waiterboard',
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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

websockets(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <App history={history} />
            </MuiThemeProvider>
          </ConnectedRouter>
        </ReactReduxFirebaseProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
// service worker register function was here
