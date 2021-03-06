import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap, setCookie } from '@dinify/common/src/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';
import { getType } from 'typesafe-actions';
import {
  fetchManagedAsync, updateRestaurantAsync, fetchRestaurantAsync, fetchWaiterboardsAsync,
  uploadMainImageAsync
} from './actions';

const preferredLanguagesInitial = [
  "ar", "az", "bg", "cs", "da", "de",
  "el", "en", "es", "fa", "fi", "fil",
  "fr", "he", "hi", "hu", "id", "it",
  "ja", "ka", "ko", "lo", "ms", "nl",
  "no", "pl", "pt", "ro", "ru", "sk",
  "sl", "sq", "sv", "th", "tr", "uk",
  "ur", "vi", "zh-Hans", "zh-Hant"
];

const initialState = {
  all: {},
  appRun: false,
  bills: [],
  selectedCategoryId: null,
  selectedFoodId: null,
  prefill: {
    email: null,
    restaurantName: null
  },
  onboardingToken: null,
  ongoingRegistration: false,
  selectedRestaurant: null,
  managedRestaurants: [],
  languages: ['en', 'cs'],
  menuLanguages: [],
  preferredLanguagesInitial,
  preferredLanguages: preferredLanguagesInitial,
  waiterboards: [],
  waiterboardsLoaded: false,
  wifi: {},
  uploading: false
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getType(fetchRestaurantAsync.success): {
      const restaurant = payload;
      return pipe(
        assocPath(['all', restaurant.id], restaurant),
      )(state);
    }
    case getType(updateRestaurantAsync.success): {
      const restaurant = assoc('published', state.all[payload.id].published)(payload);
      return assocPath(['all', restaurant.id], { ...state.all[restaurant.id], ...restaurant })(state);
    }
    case 'BOOTSTRAP':
      return assoc('appRun', true)(state);
    case 'SET_ONBOARDINGTOKEN':
      return assoc('onboardingToken', payload.token)(state);
    case 'SELECT_LANGUAGE': {
      const l = payload.language;
      if (state.preferredLanguages.includes(l)) {
        return assoc(
          'preferredLanguages',
          state.preferredLanguages.filter((x) => x !== l)
        )(state);
      }
      return assoc('preferredLanguages', [...state.preferredLanguages, l])(state);
    }
    case 'PREFILL_EMAIL':
      return assocPath(['prefill', 'email'], payload.email)(
        state,
      );
    case 'SELECT_RESTAURANT':
      return assoc('selectedRestaurant', payload.id)(state);

    case 'FETCH_LANGUAGES_DONE':
      return assoc('languages', payload.res)(state);

    case getType(fetchManagedAsync.success): {
      return assoc('managedRestaurants', payload)(state);
    }

    case 'PREFILL_RESTAURANTNAME':
      return assocPath(['prefill', 'restaurantName'], payload.restaurantName)(state);
    
    case 'SET_ONGOINGREGISTRATION':
      return assoc('ongoingRegistration', !!payload)(state);

    case 'FETCH_MENULANGUAGES_DONE': {
      const menuLanguages = payload.res;
      return pipe(
        assoc('menuLanguages', menuLanguages),
      )(state);
    }
    case 'CREATE_MENULANGUAGE_DONE': {
      const language = payload.initPayload.language;
      const menuLanguage = { language };
      return assoc('menuLanguages', [...state.menuLanguages, menuLanguage])(state);
    }

    case 'UPDATE_NAME_INIT': {
      const { restaurantId, name } = payload;
      return assocPath(['all', restaurantId, 'name'], name)(state);
    }

    case getType(uploadMainImageAsync.request): {
      return assoc('uploading', true)(state);
    }

    case getType(uploadMainImageAsync.success): {
      return pipe(
        assocPath(['all', action.meta.restaurantId, 'uploadedImage'], payload.url),
        assoc('uploading', false)
      )(state);
    }

    case getType(uploadMainImageAsync.failure): {
      return assoc('uploading', false)(state);
    }

    case 'UPDATE_LOCATION_INIT': {
      const { longitude, latitude } = payload;
      const restaurantId = state.selectedRestaurant;
      return pipe(
        assocPath(['all', restaurantId, 'longitude'], Number(longitude)),
        assocPath(['all', restaurantId, 'latitude'], Number(latitude),)        
      )(state);
    }

    case 'UPD_WIFI_INIT': {
      const restaurantId = state.selectedRestaurant;
      return assocPath(['wifi', restaurantId], payload)(state);
    }

    case 'GET_BILLS_DONE':
      return assoc('bills', payload)(state);
    case 'SELECT_CATEGORY':
      return assoc('selectedCategoryId', payload.categoryId)(state);
    case 'SELECT_FOOD':
      return assoc('selectedFoodId', payload.foodId)(state);

    case getType(fetchWaiterboardsAsync.success): {
      return pipe(
        assoc('waiterboards', ListToMap(payload)),
        assoc('waiterboardsLoaded', true),
      )(state);
    }
    case 'CREATE_WAITERBOARD_DONE': {
      const newWaiterboard = payload.res;
      return assocPath(
        ['waiterboards', newWaiterboard.id],
        newWaiterboard,
      )(state);
    }
    case 'REMOVE_WAITERBOARD_DONE': {
      return dissocPath([
        'waiterboards',
        payload.id,
      ])(state);
    }
    case 'CREATE_TABLE_DONE': {
      const newTable = payload.res;
      const waiterboardId = payload.initPayload.waiterboardId;
      return assocPath(
        [
          'waiterboards',
          waiterboardId,
          'tables',
          newTable.id,
        ],
        {
          ...newTable,
        },
      )(state);
    }
    case 'REMOVE_TABLE_INIT': {
      return dissocPath([
        'waiterboards',
        payload.waiterboardId,
        'tables',
        payload.id,
      ])(state);
    }
    case 'UPDATE_TABLE_INIT': {
      const initPayload = payload;
      return pipe(
        assocPath(
          [
            'waiterboards', initPayload.waiterboardId,
            'tables', initPayload.id, 'x',
          ],
          initPayload.x,
        ),
        assocPath(
          [
            'waiterboards', initPayload.waiterboardId,
            'tables', initPayload.id, 'y',
          ],
          initPayload.y,
        )
      )(state);
    }
    case 'ADD_DAY_TO_BUSINESSHOURS': {
      const { restaurantId } = payload;
      const restaurant = state.all[restaurantId];
      return assocPath(
        ['all', restaurantId, 'open_hours'],
        assoc(payload.dayName, [['10:00', '22:00']])(
          restaurant.open_hours,
        ),
      )(state);
    }
    case 'ADD_RANGE_TO_BUSINESSHOURS': {
      const { restaurantId } = payload;
      const restaurant = state.all[restaurantId];
      return assocPath(
        ['all', restaurantId, 'open_hours', payload.dayName],
        [
          ...restaurant.open_hours[payload.dayName],
          [payload.from, '23:59'],
        ],
      )(state);
    }

    case types.SEND_PUBLISHREQUEST_DONE: {
      const restaurantId = payload.restaurant_id;
      return assocPath(['all', restaurantId, 'publishRequestPending'], true)(state);
    }

    case firebaseTypes.LOGOUT: {
      setCookie('access_token', '', 1);
      // reset everything
      return {...initialState, appRun: true };
    }

    default:
      return state;
  }
}
