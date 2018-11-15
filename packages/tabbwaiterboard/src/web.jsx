// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './web/components/App'
import store from './configureStore'
import './index.css'
import websockets from './websockets';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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
    <AppWithTheme />
  </Provider>,
  document.getElementById('root'),
)
// service worker register function was here
