// @flow
import { Observable } from 'rxjs'
import API from 'api'
import R from 'ramda'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const camel = (str) => capitalize(str.toLowerCase())

const createEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('CREATE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('CREATE_','').replace('_INIT','')
    const apiFnName = `Create${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map((res) => ({ type: `CREATE_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `CREATE_${subject}_FAIL`, payload: error }))
  })

const fetchEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('FETCH_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('FETCH_','').replace('_INIT','')
    const apiFnName = `Get${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map((res) => ({ type: `FETCH_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `FETCH_${subject}_FAIL`, payload: error }))
  })

const fetchAllEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('FETCHALL_') && action.type.endsWith('_INIT'))
  .mergeMap(({ payload, type }) => {

    const middle = type.split('_')[1] // 'USER'

    let ids = payload.ids

    if (payload.cache) {
      const storeKey = middle.toLowerCase()
      const all = getState()[storeKey].all
      ids = R.filter((id) => !all[id], ids)
    }

    return ids.map((id) => ({
      type: `FETCH_${middle}_INIT`,
      payload: {
        id
      }
    })).concat({
      type: `FETCHALL_${middle}_DONE`
    })
  })

const updateEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('UPDATE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('UPDATE_','').replace('_INIT','')
    const apiFnName = `Change${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map((res) => ({ type: `UPDATE_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `UPDATE_${subject}_FAIL`, payload: error }))
  })

const removeEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('REMOVE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('REMOVE_','').replace('_INIT','')
    const apiFnName = `Delete${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map(() => ({ type: `REMOVE_${subject}_DONE`, payload }))
    .catch(error => Observable.of({ type: `REMOVE_${subject}_FAIL`, payload: {
      prePayload: payload,
      error
    }}))
  })


const confirmEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('CONFIRM_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('CONFIRM_','').replace('_INIT','')
    const apiFnName = `Confirm${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map((res) => ({ type: `CONFIRM_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `CONFIRM_${subject}_FAIL`, payload: error }))
  })

const cancelEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('CANCEL_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('CANCEL_','').replace('_INIT','')
    const apiFnName = `Cancel${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      ...payload
    }))
    .map((res) => ({ type: `CANCEL_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `CANCEL_${subject}_FAIL`, payload: error }))
  })


  export const epics = [
    createEpic,
    fetchEpic,
    updateEpic,
    removeEpic,
    fetchAllEpic,
    confirmEpic,
    cancelEpic
  ]
