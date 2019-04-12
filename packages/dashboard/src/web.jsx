// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import i18n from '@dinify/common/dist/i18n';
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
    <DragDropContextProvider backend={HTML5Backend}>
      <AppComponent />
    </DragDropContextProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
