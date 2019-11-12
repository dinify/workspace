import { createAsyncAction, createStandardAction } from 'typesafe-actions';

const p = 'dinify/call';

export const callReceivedAction = createStandardAction(`${p}/CALL_RECEIVED`)<any>();

export const fetchCallsAsync = createAsyncAction(
  `${p}/GET_CALLS_INIT`,
  `${p}/GET_CALLS_DONE`,
  `${p}/GET_CALLS_FAIL`,
)<undefined, any, any>();

export const confirmCallAsync = createAsyncAction(
  `${p}/CONFIRM_CALL_INIT`,
  `${p}/CONFIRM_CALL_DONE`,
  `${p}/CONFIRM_CALL_FAIL`,
)<any, any, any>();
