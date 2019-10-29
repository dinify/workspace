import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { Router } from "react-router";
import App from './web/app';
import { ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps, ReactReduxFirebaseConfig } from 'react-redux-firebase';
import { localeMatcher, IntlConfig, IntlProvider } from '@dinify/common/src/lib/i18n';
import { getCookie } from '@dinify/common/src/lib/FN';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { store, persistor} from './store';
import { SocketReduxProvider, SocketConfig } from './lib/socket';
import CheckinExecutor from './ducks/restaurant/checkin-executor';
import history from './services/history';
import syncHistoryWithStore from './ducks/routing/sync';

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

const syncedHistory = syncHistoryWithStore(history, store);


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider {...intlConfig}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SocketReduxProvider {...socketConfig}>
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
