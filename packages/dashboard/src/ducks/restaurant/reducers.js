import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap, setCookie } from '@dinify/common/dist/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';

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
  defaultLanguage: 'en',
  waiterboards: [],
  waiterboardsLoaded: false,
  wifi: {}
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_RESTAURANT_DONE: {
      const restaurant = payload.res;
      return pipe(
        assocPath(['all', restaurant.id], restaurant),
      )(state);
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
    case 'FETCH_MANAGEDRESTAURANTS_DONE': {
      return assoc('managedRestaurants', payload.res)(state);
    }
    case 'PREFILL_RESTAURANTNAME':
      return assocPath(['prefill', 'restaurantName'], payload.restaurantName)(
        state,
      );
    case 'SET_ONGOINGREGISTRATION':
      return assoc('ongoingRegistration', !!payload)(state);

    case 'FETCH_MENULANGUAGES_DONE': {
      let defaultLanguage = 'en';
      const menuLanguages = payload.res;
      const defaultMenuLanguages = menuLanguages.filter(lang => lang.default);
      if (defaultMenuLanguages.length > 0) defaultLanguage = defaultMenuLanguages[0].language;
      setCookie('lang', defaultLanguage, 30);
      return pipe(
        assoc('menuLanguages', menuLanguages),
        assoc('defaultLanguage', defaultLanguage)
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

    case 'UPDATE_IMAGE_DONE': {
      const { restaurantId, res } = payload;
      return assocPath(['all', restaurantId, 'uploadedImage'], res.url)(state);
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

    case types.FETCH_RESTAURANTWAITERBOARDS_DONE: {
      return pipe(
        assoc('waiterboards', ListToMap(payload.res)),
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
