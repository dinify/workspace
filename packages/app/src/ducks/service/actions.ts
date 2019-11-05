import { createAsyncAction } from 'typesafe-actions';
import { ServicesRequest, CallServiceRequest } from 'ServiceModels';

const p = 'dinify/service';

export const fetchServicesAsync = createAsyncAction(
  `${p}/GET_SERVICES_INIT`, // { restaurantId }
  `${p}/GET_SERVICES_DONE`,
  `${p}/GET_SERVICES_FAIL`
)<ServicesRequest, any, string>();

export const callServiceAsync = createAsyncAction(
  `${p}/CALL_SERVICE_INIT`, // { serviceId }
  `${p}/CALL_SERVICE_DONE`,
  `${p}/CALL_SERVICE_FAIL`,
)<CallServiceRequest, any, string>();
