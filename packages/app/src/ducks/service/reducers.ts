import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { ServiceMap } from 'ServiceModels';

import { ListToMap } from '@dinify/common/src/lib/FN';

export const all = createReducer({} as ServiceMap)
  .handleAction(actions.fetchServicesAsync.success, (state, action) => {
    const services = ListToMap(action.payload);
    return { ...services };
  });

export const status = createReducer<any, any>({})
  .handleAction(actions.callServiceAsync.request, (state, action) => {
    const service = action.payload;
    return { ...state, [service.serviceId]: 'SENDING' };
  })
  .handleAction(actions.callServiceAsync.success, (state, action) => {
    const service = action.payload;
    return { ...state, [service.serviceId]: 'SENT' };
  })
  .handleAction('dinify/ws/CONFIRMED_CALL', (state, action) => {
    const call = action.payload.call;
    return { ...state, [call.serviceId]: 'READY' };
  });

const serviceReducer = combineReducers({
  all,
  status
});

export default serviceReducer;
export type ServiceState = ReturnType<typeof serviceReducer>;
