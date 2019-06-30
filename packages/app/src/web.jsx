import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//  import registerServiceWorker from './registerServiceWorker'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import App from 'web/App';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import i18n from '@dinify/common/dist/i18n'
import { getCookie } from '@dinify/common/dist/lib/FN';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

import configureStore from './configureStore';
import websockets from './websockets';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

websockets(store);

let language = { primary: navigator.language, other: [] };
const langCookie = getCookie('language');
if (langCookie) {
  try {
    language = JSON.parse(langCookie);
  } catch (e) {
    console.error('JSON parse error');
  }
}

i18n({
  namespace: 'app',
  lang: language.primary,
  fallback: language.other
});

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

const snackbarProps = {
  autoHideDuration: 5000,
  style: {
    bottom: 56,
    zIndex: 1200
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  }
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SnackbarProvider SnackbarProps={snackbarProps}>
          <ConnectedRouter history={history}>
            <App history={history} />
          </ConnectedRouter>
        </SnackbarProvider>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
