// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { ConnectedRouter } from 'connected-react-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './web/components/App';
import configureStore from './configureStore';
import './index.css';
import websockets from './websockets';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

websockets(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </ConnectedRouter>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
// service worker register function was here
