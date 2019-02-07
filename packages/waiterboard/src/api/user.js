import { Get } from './Network'


export function GetUser({ id }) {
  return Get({ v3: true, path: `user/${id}` })
}
