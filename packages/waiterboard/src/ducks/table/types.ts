const p = 'dinify/table';

export interface ClearTable {
  table: object;
}
export const CLEAR_TABLE_INIT = `${p}/CLEAR_TABLE_INIT`;
export const CLEAR_TABLE_DONE = `${p}/CLEAR_TABLE_DONE`;
export const CLEAR_TABLE_FAIL = `${p}/CLEAR_TABLE_FAIL`;
export const CLEAR_TABLE_CANCELED = `${p}/CLEAR_TABLE_CANCELED`;

export interface ClearUser {
  userId: string;
}
export const CLEAR_USER_INIT = `${p}/CLEAR_USER_INIT`;
export const CLEAR_USER_DONE = `${p}/CLEAR_USER_DONE`;
export const CLEAR_USER_FAIL = `${p}/CLEAR_USER_FAIL`;
export const CLEAR_USER_CANCELED = `${p}/CLEAR_USER_CANCELED`;


export interface UpdateTable {
  id: string;
  offline: boolean;
}
export const UPDATE_TABLE_INIT = `${p}/UPDATE_TABLE_INIT`;
