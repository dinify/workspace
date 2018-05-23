import R from 'ramda'

export const MapToList = (items) =>
  R.toPairs(items)
  .map((pair) => ({ id: pair[0], ...pair[1] }))
  .sort((a, b) => b.id.localeCompare(a.id, 'en'))

export const ListToMap = (items) => {
  const obj = {}
  items.forEach((item) => {
    obj[item.id] = item
  })
  return obj
}


export const Identity = (val, cb) => cb(val)


export const MapPath = R.curry((path, f, obj) =>
  R.assocPath(path, f(R.path(path, obj)), obj)
)

export const UpdateOriginal = (originalMap, actual) => { // always keep original keys
  let actualMap = actual
  MapToList(originalMap).forEach((o) => {
    if (actualMap[o.id]) {
      R.keys(o).forEach((originalKey) => {
        if (actualMap[o.id][originalKey] === undefined) {
          actualMap[o.id][originalKey] = o[originalKey]
        }
      })
    }
  })
  return actualMap
}
