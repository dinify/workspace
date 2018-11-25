import assocPath from 'ramda/src/assocPath'
import keys from 'ramda/src/keys'
import curry from 'ramda/src/curry'
import toPairs from 'ramda/src/toPairs'
import path from 'ramda/src/path'

export const MapToList = (items) =>
  toPairs(items)
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


export const MapPath = curry((pth, f, obj) =>
  assocPath(pth, f(path(pth, obj)), obj)
)

export const UpdateOriginal = (originalMap, actual) => { // always keep original keys
  const actualMap = actual
  MapToList(originalMap).forEach((o) => {
    if (actualMap[o.id]) {
      keys(o).forEach((originalKey) => {
        if (actualMap[o.id][originalKey] === undefined) {
          actualMap[o.id][originalKey] = o[originalKey]
        }
      })
    }
  })
  return actualMap
}
