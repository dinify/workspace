import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router';
import App from './app';
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from 'react-redux-firebase';
import {
  localeMatcher,
  IntlConfig,
  IntlProvider,
} from '@dinify/common/src/lib/i18n';
import {
  NavigationProvider,
} from '@dinify/common/src/lib/navigation';
import { getCookie } from '@dinify/common/src/lib/FN';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { store, persistor } from 'store';
import { SocketReduxProvider } from 'lib/socket';
import CheckinExecutor from 'features/restaurant/checkin-executor';
import history from 'services/history';
import syncHistoryWithStore from 'features/router/sync';
import { ThemeProvider } from 'lib/theme';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://5b5ebbbbdbcd4c8cac74a6b6115afcc8@sentry.io/1808340',
  });
}

const langCookie = getCookie('language');
let locale;
if (langCookie) {
  try {
    const content = JSON.parse(langCookie);
    locale = localeMatcher.match(content.primary).locale;
  } catch (e) {
    console.error('JSON parse error', e);
  }
}

const intlConfig: IntlConfig = {
  locale,
  namespace: 'core.app',
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
};

const syncedHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SocketReduxProvider>
            <NavigationProvider>
              <Router history={syncedHistory}>
                <CheckinExecutor />
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </Router>
            </NavigationProvider>
          </SocketReduxProvider>
        </ReactReduxFirebaseProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
