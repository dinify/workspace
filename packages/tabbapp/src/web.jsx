// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//  import registerServiceWorker from './registerServiceWorker'
import App from 'web/App';
import store from './configureStore';
import websockets from './websockets';
//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'

websockets(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
//  registerServiceWorker()
