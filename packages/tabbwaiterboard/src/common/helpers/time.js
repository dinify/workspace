import moment from 'moment'

export const isItOutdated = (date, bySeconds) => {
  //console.log(bySeconds);
  //console.log(moment.utc(date).subtract(3, 'h').subtract(1, 'm').add(bySeconds-40, 'seconds').toDate());
  //console.log(moment.utc().toDate());
  if (moment.utc(date).subtract(3, 'h').subtract(1, 'm').add(bySeconds-40, 'seconds').toDate() < moment.utc().toDate()) {
    return true
  }
  return false
}
