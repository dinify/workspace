// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//  import registerServiceWorker from './registerServiceWorker'
import App from 'web/App';
import { SnackbarProvider } from 'material-ui-snackbar-redux';
import i18n from '@dinify/common/dist/i18n'
import { getCookie } from '@dinify/common/dist/lib/FN';
import store from './configureStore';
import websockets from './websockets';

//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

websockets(store);

const language = JSON.parse(getCookie('language'));
i18n({
  namespace: 'app',
  lang: language.primary,
  fallback: language.other
});

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
