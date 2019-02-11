// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from 'web/App';
import store from './configureStore';
import './index.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';


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
