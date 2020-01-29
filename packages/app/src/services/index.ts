import * as api from '@dinify/common/src/api/v2/restaurant';
import firebase from './firebase';
import history from './history';
import { store } from '../store';

const services: any = {
  api,
  firebase,
  history,
  store
};

export default services;
