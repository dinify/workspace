import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'material-ui-snackbar-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import i18n from '@dinify/common/dist/i18n';
import { getCookie, setCookie } from '@dinify/common/dist/lib/FN';
import App from 'web/App';
import configureStore from './configureStore';
import './index.css';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

let language = navigator.language;
const langCookie = getCookie('language');

if (langCookie) {
  language = langCookie;
} else {
  setCookie('language', language, 30);
}

if (language.includes('cs')) language = 'cs';
if (language.includes('en')) language = 'en';

window.i18nInstance = i18n({
  namespace: 'dashboard',
  lang: language,
});

const snackbarProps = {
  autoHideDuration: 3500,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  }
}

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


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SnackbarProvider SnackbarProps={snackbarProps}>
          <DragDropContextProvider backend={HTML5Backend}>
            <ConnectedRouter history={history}>
              <App history={history} />
            </ConnectedRouter>
          </DragDropContextProvider>
        </SnackbarProvider>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
