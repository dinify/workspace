// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//  import registerServiceWorker from './registerServiceWorker'
import AppComponent from 'web/App'
import configureStore from './configureStore'
//  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//  import HTML5Backend from 'react-dnd-html5-backend'
//  import { DragDropContextProvider } from 'react-dnd'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
})

const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
//  <MuiThemeProvider>
//    <DragDropContextProvider backend={HTML5Backend}>
  <AppComponent history={history} />
//    </DragDropContextProvider>
//  </MuiThemeProvider>
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
//  registerServiceWorker()
