// @flow
import * as R from 'ramda';

type State = {
  appRun: boolean,
  loggedRestaurant: ?Object,
  selectedCategoryId: ?String,
  selectedFoodId: ?String,
};

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
  ongoingRegistration: false,
  selectedRestaurant: null,
  managedRestaurants: []
};

export default function reducer(state: State = initialState, action) {
  switch (action.type) {
    case 'BOOTSTRAP':
      return R.assoc('appRun', true)(state);
    case 'PREFILL_EMAIL':
      return R.assocPath(['prefill', 'email'], action.payload.email)(
        state,
      );
    case 'SELECT_RESTAURANT':
      return R.assoc('selectedRestaurant', action.payload.id)(state);
    case 'FETCH_MANAGEDRESTAURANTS_DONE':
      return R.assoc('managedRestaurants', action.payload.res)(state);
    case 'PREFILL_RESTAURANTNAME':
      return R.assocPath(['prefill', 'restaurantName'], action.payload.restaurantName)(
        state,
      );
    case 'SET_ONGOINGREGISTRATION':
      return R.assoc('ongoingRegistration', !!action.payload)(state);
    case 'FETCH_LOGGEDRESTAURANT_DONE': {
      return R.assoc('loggedRestaurant', action.payload)(state);
    }
    case 'FETCH_LOGGEDRESTAURANT_FAIL': {
      return R.dissoc('loggedRestaurant')(state);
    }
    case 'UPDATE_NAME_INIT':
      return R.assocPath(['loggedRestaurant', 'name'], action.payload.name)(
        state,
      );
    case 'UPDATE_IMAGE_DONE':
      return R.assocPath(
        ['loggedRestaurant', 'uploadedImage'],
        action.payload.res.url,
      )(state);
    case 'UPDATE_CATEGORY_INIT':
      return R.assocPath(
        ['loggedRestaurant', 'category'],
        action.payload.category,
      )(state);
    case 'UPDATE_LOCATION_INIT': {
      state = R.assocPath(
        ['loggedRestaurant', 'longitude'],
        Number(action.payload.longitude),
      )(state);
      return R.assocPath(
        ['loggedRestaurant', 'latitude'],
        Number(action.payload.latitude),
      )(state);
    }
    case 'UPDATE_BANK_INIT': {
      return R.assocPath(['loggedRestaurant', 'bank'], action.payload)(state);
    }
    case 'GET_BILLS_DONE':
      return R.assoc('bills', action.payload)(state);
    case 'SELECT_CATEGORY':
      return R.assoc('selectedCategoryId', action.payload.categoryId)(state);
    case 'SELECT_FOOD':
      return R.assoc('selectedFoodId', action.payload.foodId)(state);
    case 'CREATE_WAITERBOARD_DONE': {
      const newWaiterboard = action.payload.res;
      return R.assocPath(
        ['loggedRestaurant', 'waiterboards', newWaiterboard.id],
        newWaiterboard,
      )(state);
    }
    case 'REMOVE_WAITERBOARD_DONE': {
      return R.dissocPath([
        'loggedRestaurant',
        'waiterboards',
        action.payload.id,
      ])(state);
    }
    case 'CREATE_TABLE_DONE': {
      const newTable = action.payload.res;
      const waiterboardId = action.payload.prePayload.waiterboardId;
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
        action.payload.waiterboardId,
        'tables',
        action.payload.id,
      ])(state);
    }
    case 'UPDATE_TABLE_INIT': {
      const prePayload = action.payload;
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
        R.assoc(action.payload.dayName, [['10:00', '22:00']])(
          state.loggedRestaurant.open_hours,
        ),
      )(state);
    }
    case 'ADD_RANGE_TO_BUSINESSHOURS': {
      return R.assocPath(
        ['loggedRestaurant', 'open_hours', action.payload.dayName],
        [
          ...state.loggedRestaurant.open_hours[action.payload.dayName],
          [action.payload.from, '23:59'],
        ],
      )(state);
    }

    default:
      return state;
  }
}
