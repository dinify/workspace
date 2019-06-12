// @flow
import * as R from 'ramda';
import { MapToList, setCookie } from '@dinify/common/dist/lib/FN';

type State = {
  appRun: boolean,
  loggedRestaurant: ?Object,
  selectedCategoryId: ?String,
  selectedFoodId: ?String,
};

const preferredLanguagesInitial = [
  'cs', 'en', 'de', 'it',
  'fr', 'ru', 'es', 'pl', 'pt',
  'ja', 'ko', 'zh-Hans', 'zh-Hant'
];

const initialState = {
  appRun: false,
  loggedRestaurant: null,
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
  defaultLanguage: 'en'
};

export default function reducer(state: State = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'BOOTSTRAP':
      return R.assoc('appRun', true)(state);
    case 'SET_ONBOARDINGTOKEN':
      return R.assoc('onboardingToken', payload.token)(state);
    case 'SELECT_LANGUAGE': {
      const l = payload.language;
      if (state.preferredLanguages.includes(l)) {
        return R.assoc(
          'preferredLanguages',
          state.preferredLanguages.filter((x) => x !== l)
        )(state);
      }
      return R.assoc('preferredLanguages', [...state.preferredLanguages, l])(state);
    }
    case 'PREFILL_EMAIL':
      return R.assocPath(['prefill', 'email'], payload.email)(
        state,
      );
    case 'SELECT_RESTAURANT':
      return R.assoc('selectedRestaurant', payload.id)(state);
    case 'FETCH_LANGUAGES_DONE':
      return R.assoc('languages', payload.res)(state);
    case 'FETCH_MANAGEDRESTAURANTS_DONE':
      return R.assoc('managedRestaurants', payload.res)(state);
    case 'PREFILL_RESTAURANTNAME':
      return R.assocPath(['prefill', 'restaurantName'], payload.restaurantName)(
        state,
      );
    case 'SET_ONGOINGREGISTRATION':
      return R.assoc('ongoingRegistration', !!payload)(state);
    case 'FETCH_MENULANGUAGES_DONE': {
      return R.assoc('menuLanguages', payload.res)(state);
    }
    case 'CREATE_MENULANGUAGE_DONE': {
      const language = payload.prePayload.language;
      const menuLanguage = { language };
      return R.assoc('menuLanguages', [...state.menuLanguages, menuLanguage])(state);
    }
    case 'FETCH_LOGGEDRESTAURANT_DONE': {
      const restaurant = payload.res;
      let defaultLanguage = 'en';
      const menuLanguages = restaurant.menu_languages || {};
      const defaultMenuLanguages = MapToList(menuLanguages).filter(lang => lang.default);
      if (defaultMenuLanguages.length > 0) defaultLanguage = defaultMenuLanguages[0].language;
      const newState = R.assoc('defaultLanguage', defaultLanguage)(state);
      setCookie('lang', defaultLanguage, 30);
      return R.assoc('loggedRestaurant', restaurant)(newState);
    }
    case 'FETCH_LOGGEDRESTAURANT_FAIL': {
      return R.dissoc('loggedRestaurant')(state);
    }
    case 'UPDATE_NAME_INIT':
      return R.assocPath(['loggedRestaurant', 'name'], payload.name)(
        state,
      );
    case 'UPDATE_IMAGE_DONE':
      return R.assocPath(
        ['loggedRestaurant', 'uploadedImage'],
        payload.res.url,
      )(state);
    case 'UPDATE_CATEGORY_INIT':
      return R.assocPath(
        ['loggedRestaurant', 'category'],
        payload.category,
      )(state);
    case 'UPDATE_LOCATION_INIT': {
      state = R.assocPath(
        ['loggedRestaurant', 'longitude'],
        Number(payload.longitude),
      )(state);
      return R.assocPath(
        ['loggedRestaurant', 'latitude'],
        Number(payload.latitude),
      )(state);
    }
    case 'UPDATE_BANK_INIT': {
      return R.assocPath(['loggedRestaurant', 'bank'], payload)(state);
    }
    case 'GET_BILLS_DONE':
      return R.assoc('bills', payload)(state);
    case 'SELECT_CATEGORY':
      return R.assoc('selectedCategoryId', payload.categoryId)(state);
    case 'SELECT_FOOD':
      return R.assoc('selectedFoodId', payload.foodId)(state);
    case 'CREATE_WAITERBOARD_DONE': {
      const newWaiterboard = payload.res;
      return R.assocPath(
        ['loggedRestaurant', 'waiterboards', newWaiterboard.id],
        newWaiterboard,
      )(state);
    }
    case 'REMOVE_WAITERBOARD_DONE': {
      return R.dissocPath([
        'loggedRestaurant',
        'waiterboards',
        payload.id,
      ])(state);
    }
    case 'CREATE_TABLE_DONE': {
      const newTable = payload.res;
      const waiterboardId = payload.prePayload.waiterboardId;
      return R.assocPath(
        [
          'loggedRestaurant',
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
      return R.dissocPath([
        'loggedRestaurant',
        'waiterboards',
        payload.waiterboardId,
        'tables',
        payload.id,
      ])(state);
    }
    case 'UPDATE_TABLE_INIT': {
      const prePayload = payload;
      state = R.assocPath(
        [
          'loggedRestaurant',
          'waiterboards',
          prePayload.waiterboardId,
          'tables',
          prePayload.id,
          'x',
        ],
        prePayload.x,
      )(state);
      return R.assocPath(
        [
          'loggedRestaurant',
          'waiterboards',
          prePayload.waiterboardId,
          'tables',
          prePayload.id,
          'y',
        ],
        prePayload.y,
      )(state);
    }
    case 'ADD_DAY_TO_BUSINESSHOURS': {
      return R.assocPath(
        ['loggedRestaurant', 'open_hours'],
        R.assoc(payload.dayName, [['10:00', '22:00']])(
          state.loggedRestaurant.open_hours,
        ),
      )(state);
    }
    case 'ADD_RANGE_TO_BUSINESSHOURS': {
      return R.assocPath(
        ['loggedRestaurant', 'open_hours', payload.dayName],
        [
          ...state.loggedRestaurant.open_hours[payload.dayName],
          [payload.from, '23:59'],
        ],
      )(state);
    }

    default:
      return state;
  }
}
