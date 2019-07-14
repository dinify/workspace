import * as types from './types';

export const fetchServicesInit = ({ restaurantId }) => ({
  type: types.FETCH_SERVICES_INIT,
  payload: { restaurantId }
})

export const callServiceInit = ({ serviceId }) => ({
  type: types.CALL_SERVICE_INIT,
  payload: { serviceId }
});

export const callServiceDone = (res) => ({
  type: types.CALL_SERVICE_DONE,
  payload: res
});
