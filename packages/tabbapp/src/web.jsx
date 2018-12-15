// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//  import registerServiceWorker from './registerServiceWorker'
import App from 'web/App';
import store from './configureStore';
import websockets from './websockets';
import { SnackbarProvider } from 'material-ui-snackbar-redux'

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

websockets(store);


ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider SnackbarProps={{
      autoHideDuration: 5000,
      style: {
        bottom: 56,
        zIndex: 1200
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      }
    }}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
