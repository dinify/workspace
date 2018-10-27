// @flow
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import userTypes from 'ducks/user/types';
import types from './types';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Socket.io connected');
  if (window.loggedUserId) socket.emit('init', window.loggedUserId);
});

const socketEpic = (action$: Observable, { getState }) =>
  action$.ofType(userTypes.FETCH_ME_DONE)
    .do(() => {
      const loggedUserId = getState().user.loggedUserId;
      if (loggedUserId) {
        window.loggedUserId = loggedUserId;
        socket.emit('init', loggedUserId);
      }
    })
    .mergeMap(() =>
      Observable.race(
        Observable.fromEvent(socket, 'payment-confirmed')
          .map((payload) => ({ type: types.CONFIRMED_PAYMENT_DONE, payload }))
      )
    );

const progressEpic = (action$: Observable) =>
  action$
    .filter(({ type }) => {
      if (type === types.ACTIVE_ACTION || type === types.UNACTIVE_ACTION) return false;
      if (type.includes('DONE')) return true;
      return false;
    })
    .mergeMap(({ type }) => {
      const unactive = Observable.of({
        type: types.UNACTIVE_ACTION,
        payload: type
      }).delay(6000);
      const active = Observable.of({
        type: types.ACTIVE_ACTION,
        payload: type
      })
      return Observable.merge(active, unactive);
    });

export default [
  socketEpic,
  progressEpic,
];
