declare module 'CommonModels' {
  export interface ModelMap<T> {
    [id: string]: T
  }

  export interface ErrorAction<T = any> {
    initPayload: T,
    errorType: string
  }
}