import { LOCATION_CHANGE } from './reducer';

const defaultSelectLocationState = (state: any) => state.router;

export default function syncHistoryWithStore(
  history: any,
  store: any, 
  { selectLocationState = defaultSelectLocationState } = {}
) {
  // Ensure that the reducer is mounted on the store and functioning properly.
  if (typeof selectLocationState(store.getState()) === 'undefined') {
    throw new Error(
      'Could not find relevant router reducer'
    );
  }

  // Whenever location changes, dispatch an action to get it in the store
  const handleLocationChange = (location: any) => {
    // Tell the store to update by dispatching an action
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: location
    });
  };

  history.listen(handleLocationChange);

  return history;
}
