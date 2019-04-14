// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import i18n from '@dinify/common/dist/i18n';
import { SnackbarProvider } from 'material-ui-snackbar-redux'
import { getCookie } from '@dinify/common/dist/lib/FN';
import AppComponent from 'web/App';
import store from './configureStore';
import './index.css';

let language = { primary: navigator.language, other: [] };
const langCookie = getCookie('language');
if (langCookie) language = JSON.parse(langCookie);

i18n({
  namespace: 'dashboard',
  lang: language.primary,
  fallback: language.other
});

const App = () => (
  <SnackbarProvider
    SnackbarProps={{
      autoHideDuration: 3500,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      }
    }}  
  >
    <DragDropContextProvider backend={HTML5Backend}>
      <AppComponent />
    </DragDropContextProvider>
  </SnackbarProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
