import R from 'ramda'

const initialState = {
  progressMap: {},
  errorsMap: {}
}

export default function reducer(state = initialState, action) {
  if(action.type === 'persist/REHYDRATE') {
    return R.assoc('errorsMap', {})(R.assoc('progressMap', {})(state))
  }
  if(action.type.includes('CREATE')
  || action.type.includes('FETCH')
  || action.type.includes('UPDATE')
  || action.type.includes('REMOVE')
  || action.type.includes('LOGIN')
  || action.type.includes('SIGNUP')
  ) {
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
      if (action.payload && action.payload.message) {
        state = R.assocPath(['errorsMap', key], action.payload.message)(state)
      }
      if (action.payload instanceof Array && action.payload[0].message) {
        state = R.assocPath(['errorsMap', key], action.payload[0].message)(state)
      }
    }
    state = R.assocPath(['progressMap', key], stage)(state)
  }
  return state
}
