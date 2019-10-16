import { App } from 'firebase';

declare module 'react-redux-firebase' {
  declare export const useFirebase: () => App;
}
