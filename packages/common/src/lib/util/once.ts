import { LRU } from "@phensley/cldr-utils";

const cache = new LRU(8);
const promises: { [key: string]: PromiseLike<any> } = {};

export default (key: string, promiseCreator: () => PromiseLike<any>) => {  
  const cachedVal = cache.get(key);
  if (cachedVal) {
    return new Promise(resolve => resolve(cachedVal));
  }
  if (promises[key]) return promises[key];
  promises[key] = promiseCreator().then(result => {
    cache.set(key, result);
    return result;
  });
  return promises[key];
}