import assoc from 'ramda/es/assoc';
import pipe from 'ramda/es/pipe';
import * as appTypes from 'ducks/app/types';

const initialState = {
  selectedWBId: null,
  appRun: false,
  selectedRestaurant: null,
};

export default function reducer(state = initialState, action) {

  const { payload, type } = action;

  switch (type) {

    case appTypes.BOOTSTRAP: {
      return assoc('appRun', true)(state);
    }

    case appTypes.SELECT_WAITERBOARD: {
      const { id, restaurantId } = payload;
      return pipe(
        assoc('selectedWBId', id),
        assoc('selectedRestaurant', restaurantId)
      )(state);
    }

    default:
      return state;
  }

}
