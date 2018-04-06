import R from 'ramda'

export const MapToList = (items) =>
  R.toPairs(items)
  .map((pair) => ({ id: pair[0], ...pair[1] }))
