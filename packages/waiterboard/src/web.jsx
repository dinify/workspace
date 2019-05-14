// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import App from './web/components/App';
import configureStore from './configureStore';
import './index.css';
import websockets from './websockets';

const { store, persistor } = configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const AppWithTheme = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
)

websockets(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWithTheme />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
// service worker register function was here
