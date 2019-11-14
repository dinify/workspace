import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { Router } from 'react-router';
import App from './web/app';
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
import { getCookie } from '@dinify/common/src/lib/FN';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { store, persistor } from './store';
import { SocketReduxProvider } from './lib/socket';
import CheckinExecutor from './features/restaurant/checkin-executor';
import history from './services/history';
import syncHistoryWithStore from './features/router/sync';
import { schema } from './lib/messages';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://5b5ebbbbdbcd4c8cac74a6b6115afcc8@sentry.io/1808340',
  });
}
//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

// TODO: move these to environment variables
const staticRoot =
  process.env.NODE_ENV === 'production'
    ? 'static.dinify.app'
    : 'storage.googleapis.com/static.dinify.dev';

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
  messages: {
    getUri: locale => {
      let id = locale.tag.language();
      // Traditional and simplified chinese
      // have the script tag in their bundle identifier
      if (id === 'zh') {
        id = `zh-${locale.tag.script()}`;
      }
      return `https://${staticRoot}/i18n/messages/${id}/core.app`;
    },
    schema,
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

const syncedHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SocketReduxProvider>
            <Router history={syncedHistory}>
              <CheckinExecutor />
              <App />
            </Router>
          </SocketReduxProvider>
        </ReactReduxFirebaseProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
