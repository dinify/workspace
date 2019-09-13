import assocPath from 'ramda/es/assocPath'
import keys from 'ramda/es/keys'
import curry from 'ramda/es/curry'
import toPairs from 'ramda/es/toPairs'
import path from 'ramda/es/path'

// export const MapToList = (items, _options) => {
//   let { sortBy, sortType } = { sortBy: 'id', sortType: String };
//   if (_options) {
//     sortBy = _options.sortBy;
//     sortType = _options.sortType;
//   }
//   const list = toPairs(items).map((pair) => ({ id: pair[0], ...pair[1] }));
//   if (sortType === String) {
//     return list.sort((a, b) => b[sortBy].localeCompare(a[sortBy], 'en'));
//   }
//   if (sortType === Number) {
//     return list.sort((a, b) => a[sortBy] - b[sortBy]);
//   }
//   return list;
// }
// 
// export const ListToMap = (items) => {
//   const obj = {}
//   items.forEach((item) => {
//     obj[item.id] = item
//   })
//   return obj
// }
// 
// 
// export const Identity = (val, cb) => cb(val)
// 
// 
// export const MapPath = curry((pth, f, obj) =>
//   assocPath(pth, f(path(pth, obj)), obj)
// )
// 
// export const UpdateOriginal = (originalMap, actual) => { // always keep original keys
//   const actualMap = actual
//   MapToList(originalMap).forEach((o) => {
//     if (actualMap[o.id]) {
//       keys(o).forEach((originalKey) => {
//         if (actualMap[o.id][originalKey] === undefined) {
//           actualMap[o.id][originalKey] = o[originalKey]
//         }
//       })
//     }
//   })
//   return actualMap
// }
