import cuid from 'cuid';

export const fetchServicesInit = () => ({
  type: 'GET_SERVICES_INIT'
});

export const createServiceInit = payload => ({
  type: 'POST_SERVICE_INIT',
  payload: {
    id: cuid(),
    translations: [{
      name: payload.name,
      locale: payload.locale
    }],
    imageId: payload.imageId,
    type: payload.type,
    name: payload.name,
    restaurantId: payload.restaurantId
  },
});

export const removeServiceInit = payload => ({
  type: 'REMOVE_SERVICE_INIT',
  payload,
});
