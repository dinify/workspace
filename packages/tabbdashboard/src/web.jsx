// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AppComponent from './web/components/App';
import configureStore from './configureStore';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const store = configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});

const App = () => (
  <MuiThemeProvider>
    <AppComponent />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
