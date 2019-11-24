import * as actions from './actions';
import * as wsActions from '../socket/actions'
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { ServiceMap } from 'ServiceModels';
import { ListToMap } from '@dinify/common/src/lib/FN';
import values from 'ramda/es/values';

export const all = createReducer({} as ServiceMap)
  .handleAction(actions.fetchServicesAsync.success, (state, action) => {
    const services = ListToMap(action.payload);
    return { ...services };
  });

export const status = createReducer({} as any)
  .handleAction(actions.callServiceAsync.request, (state, action) => {
    const service = action.payload;
    if (values(state).includes('SENDING')) return state;
    return { ...state, [service.serviceId]: 'SENDING' };
  })
  .handleAction(actions.callServiceAsync.success, (state, action) => {
    const service = action.payload;
    return { ...state, [service.serviceId]: 'SENT' };
  })
  .handleAction(actions.callServiceAsync.failure, (state, action) => {
    const { initPayload } = (action as any);
    const service = initPayload;
    return { ...state, [service.serviceId]: 'FAILED' };
  })
  .handleAction(wsActions.confirmedCallAction, (state, action) => {
    const call = action.payload.call;
    return { ...state, [call.serviceId]: 'READY' };
  });

const serviceReducer = combineReducers({
  all,
  status
});

export default serviceReducer;
export type ServiceState = ReturnType<typeof serviceReducer>;
