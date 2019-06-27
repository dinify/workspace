import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissoc from 'ramda/src/dissoc';
import dissocPath from 'ramda/src/dissocPath';
import { MapToList, setCookie } from '@dinify/common/dist/lib/FN';

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

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
    case 'FETCH_MANAGEDRESTAURANTS_DONE':
      return assoc('managedRestaurants', payload.res)(state);
    case 'PREFILL_RESTAURANTNAME':
      return assocPath(['prefill', 'restaurantName'], payload.restaurantName)(
        state,
      );
    case 'SET_ONGOINGREGISTRATION':
      return assoc('ongoingRegistration', !!payload)(state);
    case 'FETCH_MENULANGUAGES_DONE': {
      return assoc('menuLanguages', payload.res)(state);
    }
    case 'CREATE_MENULANGUAGE_DONE': {
      const language = payload.prePayload.language;
      const menuLanguage = { language };
      return assoc('menuLanguages', [...state.menuLanguages, menuLanguage])(state);
    }
    case 'FETCH_LOGGEDRESTAURANT_DONE': {
      const restaurant = payload.res;
      let defaultLanguage = 'en';
      const menuLanguages = restaurant.menu_languages || {};
      const defaultMenuLanguages = MapToList(menuLanguages).filter(lang => lang.default);
      if (defaultMenuLanguages.length > 0) defaultLanguage = defaultMenuLanguages[0].language;
      const newState = assoc('defaultLanguage', defaultLanguage)(state);
      setCookie('lang', defaultLanguage, 30);
      return assoc('loggedRestaurant', restaurant)(newState);
    }
    case 'FETCH_LOGGEDRESTAURANT_FAIL': {
      return dissoc('loggedRestaurant')(state);
    }
    case 'UPDATE_NAME_INIT':
      return assocPath(['loggedRestaurant', 'name'], payload.name)(
        state,
      );
    case 'UPDATE_IMAGE_DONE':
      return assocPath(
        ['loggedRestaurant', 'uploadedImage'],
        payload.res.url,
      )(state);
    case 'UPDATE_CATEGORY_INIT':
      return assocPath(
        ['loggedRestaurant', 'category'],
        payload.category,
      )(state);
    case 'UPDATE_LOCATION_INIT': {
      return pipe(
        assocPath(
          ['loggedRestaurant', 'longitude'],
          Number(payload.longitude),
        ),
        assocPath(
          ['loggedRestaurant', 'latitude'],
          Number(payload.latitude),
        )        
      )(state);
    }
    case 'UPDATE_BANK_INIT': {
      return assocPath(['loggedRestaurant', 'bank'], payload)(state);
    }
    case 'GET_BILLS_DONE':
      return assoc('bills', payload)(state);
    case 'SELECT_CATEGORY':
      return assoc('selectedCategoryId', payload.categoryId)(state);
    case 'SELECT_FOOD':
      return assoc('selectedFoodId', payload.foodId)(state);
    case 'CREATE_WAITERBOARD_DONE': {
      const newWaiterboard = payload.res;
      return assocPath(
        ['loggedRestaurant', 'waiterboards', newWaiterboard.id],
        newWaiterboard,
      )(state);
    }
    case 'REMOVE_WAITERBOARD_DONE': {
      return dissocPath([
        'loggedRestaurant',
        'waiterboards',
        payload.id,
      ])(state);
    }
    case 'CREATE_TABLE_DONE': {
      const newTable = payload.res;
      const waiterboardId = payload.prePayload.waiterboardId;
      return assocPath(
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
      return dissocPath([
        'loggedRestaurant',
        'waiterboards',
        payload.waiterboardId,
        'tables',
        payload.id,
      ])(state);
    }
    case 'UPDATE_TABLE_INIT': {
      const prePayload = payload;
      return pipe(
        assocPath(
          [
            'loggedRestaurant',
            'waiterboards',
            prePayload.waiterboardId,
            'tables',
            prePayload.id,
            'x',
          ],
          prePayload.x,
        ),
        assocPath(
          [
            'loggedRestaurant',
            'waiterboards',
            prePayload.waiterboardId,
            'tables',
            prePayload.id,
            'y',
          ],
          prePayload.y,
        )
      )(state);
    }
    case 'ADD_DAY_TO_BUSINESSHOURS': {
      return assocPath(
        ['loggedRestaurant', 'open_hours'],
        assoc(payload.dayName, [['10:00', '22:00']])(
          state.loggedRestaurant.open_hours,
        ),
      )(state);
    }
    case 'ADD_RANGE_TO_BUSINESSHOURS': {
      return assocPath(
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
