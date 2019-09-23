import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { ServiceMap } from 'ServiceModels';

import { ListToMap } from '@dinify/common/src/lib/FN';

export const all = createReducer({} as ServiceMap)
  .handleAction(actions.fetchServicesAsync.success, (state, action) => {
    const services = ListToMap(action.payload);
    return { ...state, ...services };
  });

const serviceReducer = combineReducers({
  all
});

export default serviceReducer;
export type ServiceState = ReturnType<typeof serviceReducer>;
