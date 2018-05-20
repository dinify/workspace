// @flow
import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {},
  backup: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOGGED_FETCHED_DONE': {

      const actualOptions = action.payload.options


      return R.assoc('all', UpdateOriginal(state.all, actualOptions))(state)
    }

    case 'COLLAPSE_OPTION_INIT': {
      const { id } = action.payload
      return R.over(
        R.lensProp('all'),
        R.map(o =>
          R.assoc('collapsed', o.id === id ? !o.collapsed : false, o)
        )
      )(state)
    }

    case 'CREATE_OPTION_DONE': {
      const newOption = action.payload.res
      return R.assocPath(['all', newOption.id], newOption)(state)
    }

    case 'REMOVE_OPTION_INIT': {
      const { id } = action.payload
      const optionObj = state.all[id]
      return R.pipe(
        R.assocPath(['backup', id], optionObj),
        R.dissocPath(['all', id])
      )(state)
    }

    case 'REMOVE_OPTION_FAIL': {
      const { id } = action.payload.prePayload
      return R.assocPath(['all', id], state.backup[id])(state)
    }

    case 'CREATE_CHOICE_DONE': {
      const { optionId } = action.payload.prePayload
      const newChoice = action.payload.res
      return R.assocPath(['all', optionId, 'choices', newChoice.id], newChoice)(state)
    }

    case 'REMOVE_CHOICE_INIT': {
      const { id, optionId } = action.payload
      const choiceObj = state.all[optionId].choices[id]
      return R.pipe(
        R.assocPath(['backup', id], choiceObj),
        R.dissocPath(['all', optionId, 'choices', id])
      )(state)
    }

    case 'REMOVE_CHOICE_FAIL': {
      const { id, optionId } = action.payload.prePayload
      return R.assocPath(['all', optionId, 'choices', id], state.backup[id])(state)
    }

    default:
      return state
  }
}
