// import { of } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { ofType } from 'redux-observable';
// import pluck from 'ramda/es/pluck';
// import { fetchAllUsersAsync } from '../user/actions';
// 
// const loadBookingEpic = (action$) =>
//   action$.pipe(
//     ofType(FETCH_BOOKINGS_DONE),
//     mergeMap(({ payload }) => {
//       const bookings = payload.res;
//       const userIds = pluck('initiator', bookings);
//       return of(fetchAllUsersAsync.request({ ids: userIds, cache: true }));
//     })
//   )

export default [
  // loadBookingEpic
]
