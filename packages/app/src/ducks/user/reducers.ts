import { getType } from 'typesafe-actions';
import { getGeolocationAsync } from './actions';
import { AnyAction } from 'redux';
import { Geolocation } from 'UserModels';

export type UserState = {
  geolocation: Geolocation | null;
};

const initialState: UserState = {
  geolocation: null,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case getType(getGeolocationAsync.success): {
      return { ...state, geolocation: action.payload };
    }

    default:
      return state;
  }
}
