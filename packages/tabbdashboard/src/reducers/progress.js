import R from 'ramda'
import type { EpicDependencies, Error, Action } from '../flow'

const initialState = {
  all: {}
}

export default function reducer(state: State = initialState, action: Action) {
  if(action.type.includes('UPDATE') || action.type.includes('CREATE') || action.type.includes('REMOVE')) {
    let stage = ''
    let key = action.type
    if (action.type.includes('_INIT')) {
      stage = 'PENDING'
      key = key.replace('_INIT', '')
    }
    if (action.type.includes('_DONE')) {
      stage = 'SUCCESS'
      key = key.replace('_DONE', '')
    }
    if (action.type.includes('_FAIL')) {
      stage = 'ERROR'
      key = key.replace('_FAIL', '')
    }
    state = R.assocPath(['all', key], stage)(state)
  }
  return state
}
