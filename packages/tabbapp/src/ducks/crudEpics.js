// @flow
import { Observable } from 'rxjs'
import API from 'api'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
const camel = str => capitalize(str.toLowerCase())
const withoutPath = type => type.match(/\w+(?:\.\w+)*$/g)[0]
const getSubjectAndPath = (type, kind, stage) => {
  const typeWithoutPath = withoutPath(type)
  return {
    subject: typeWithoutPath.replace(`${kind}_`, '').replace(`_${stage}`, ''),
    path: type.replace(typeWithoutPath, ''),
  }
}
const filterAction = (type, kind, stage) => {
  const typeOnly = withoutPath(type)
  return typeOnly.startsWith(`${kind}_`) && typeOnly.endsWith(`_${stage}`)
}

const createEpic = (action$: Observable) =>
  action$
    .filter(action => filterAction(action.type, 'CREATE', 'INIT'))
    .switchMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'CREATE', 'INIT')
      const apiFnName = `Create${camel(subject)}`
      return Observable.fromPromise(
        API[apiFnName]({
          ...payload,
        }),
      )
        .map(res => ({
          type: `${path}CREATE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        }))
        .catch(error =>
          Observable.of({
            type: `${path}CREATE_${subject}_FAIL`,
            payload: error,
          }),
        )
    })

const fetchEpic = (action$: Observable) =>
  action$
    .filter(action => filterAction(action.type, 'FETCH', 'INIT'))
    .switchMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'FETCH', 'INIT')
      const apiFnName = `Get${camel(subject)}`
      return Observable.fromPromise(
        API[apiFnName]({
          ...payload,
        }),
      )
        .map(res => ({
          type: `${path}FETCH_${subject}_DONE`,
          payload: { res, prePayload: payload },
        }))
        .catch(error =>
          Observable.of({
            type: `${path}FETCH_${subject}_FAIL`,
            payload: error,
          }),
        )
    })

const updateEpic = (action$: Observable) =>
  action$
    .filter(action => filterAction(action.type, 'UPDATE', 'INIT'))
    .switchMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'UPDATE', 'INIT')
      const apiFnName = `Change${camel(subject)}`
      return Observable.fromPromise(
        API[apiFnName]({
          ...payload,
        }),
      )
        .map(res => ({
          type: `${path}UPDATE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        }))
        .catch(error =>
          Observable.of({
            type: `${path}UPDATE_${subject}_FAIL`,
            payload: error,
          }),
        )
    })

const removeEpic = (action$: Observable) =>
  action$
    .filter(action => filterAction(action.type, 'REMOVE', 'INIT'))
    .switchMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'REMOVE', 'INIT')
      const apiFnName = `Delete${camel(subject)}`
      return Observable.fromPromise(
        API[apiFnName]({
          ...payload,
        }),
      )
        .map(() => ({ type: `${path}REMOVE_${subject}_DONE`, payload }))
        .catch(error =>
          Observable.of({
            type: `${path}REMOVE_${subject}_FAIL`,
            payload: {
              prePayload: payload,
              error,
            },
          }),
        )
    })

export const epics = [createEpic, fetchEpic, updateEpic, removeEpic]
