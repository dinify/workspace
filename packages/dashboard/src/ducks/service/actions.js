export const fetchServicesInit = () => ({
  type: 'GET_SERVICES_INIT'
});

export const createServiceInit = payload => ({
  type: 'CREATE_SERVICE_INIT',
  payload,
});

export const removeServiceInit = payload => ({
  type: 'REMOVE_SERVICE_INIT',
  payload,
});
