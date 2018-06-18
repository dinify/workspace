import types from './types'

export const loginInit = ({ email, password }) => ({
  type: types.LOGIN_INIT,
  payload: { email, password }
})

export const loginDone = () => ({
  type: types.LOGIN_DONE
})

export const loginFail = () => ({
  type: types.LOGIN_FAIL
})