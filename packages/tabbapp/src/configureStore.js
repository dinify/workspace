import { createEpicMiddleware } from 'redux-observable'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import configureEpics from './configureEpics'
import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux'

import ui from 'ducks/ui'


import { reducer as formReducer } from 'redux-form'
Raven.config('https://b34f069a5b2d40f2ac5b07a96353591e@sentry.io/1227775', {
  // options
}).install()

const commonReducers = {
  ui
}

const configureStore = (options, storage) => {
  const { initialState, platformDeps = {}, platformEpics = [], platformReducers = {} } = options

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics)

  const reducers = combineReducers({
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
  })

  const middlewares = [
    createEpicMiddleware(rootEpic),
    createRavenMiddleware(Raven, {
      // Optionally pass some options here.
    })
  ]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }))
  }

  const enhancers = compose(applyMiddleware(...middlewares), autoRehydrate()) // , autoRehydrate()

  const store = createStore(reducers, initialState, enhancers)

  // let the magic happen :–)
  persistStore(store, { blacklist: ['progress'], storage }) // .purge() // in case you want to purge the store

  return store;
}

export default configureStore
