// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unregister } from './registerServiceWorker';
import AppComponent from 'web/App';
import configureStore from './configureStore';
import './index.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

const store = configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});

let App = () => (
  <MuiThemeProvider>
    <DragDropContextProvider backend={HTML5Backend}>
      <AppComponent />
    </DragDropContextProvider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
unregister();
