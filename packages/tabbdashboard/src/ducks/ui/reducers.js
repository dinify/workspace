import R from 'ramda'

const initialState = {
  progressMap: {},
  errorsMap: {}
}

export default function reducer(state = initialState, action) {
  if(action.type.includes('CREATE')
  || action.type.includes('FETCH')
  || action.type.includes('UPDATE')
  || action.type.includes('REMOVE')) {
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
      if (action.payload.message) {
        state = R.assocPath(['errorsMap', key], action.payload.message)(state)
      }
    }
    state = R.assocPath(['progressMap', key], stage)(state)
  }
  return state
}
