import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import keys from 'ramda/src/keys';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { MapToList } from '@dinify/common/dist/lib/FN';
import * as types from './types';


const updateCusomizationsEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.UPDATECUSOMIZATIONS_INIT),
    mergeMap(({ payload: { menuItemId, actionKind, custKey, custId, cust, updateObj } }) => {

      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!menuItem) return { type: types.UPDATECUSOMIZATIONS_FAIL };

      const custs = menuItem[custKey]; // ingredietns, addons or options

      const updKeys = keys(updateObj);

      let updatedCusts;
      let updatedCustsForStore;
      if (actionKind === 'ADD') {
        updatedCusts = assocPath([custId], cust)(custs);
        updatedCustsForStore = updatedCusts;
      }
      if (actionKind === 'UPDATE') {
        updatedCusts = assocPath([custId, updKeys[0]], updateObj[updKeys[0]])(custs);
        updatedCustsForStore = assocPath([custId, 'pivot', updKeys[0]], updateObj[updKeys[0]])(custs);
      }
      if (actionKind === 'REMOVE') {
        updatedCusts = dissocPath([custId])(custs);
        updatedCustsForStore = updatedCusts;
      }
      const updatePayload = {};
      updatePayload.id = menuItemId;
      updatePayload[custKey] = MapToList(updatedCusts);

      return of(
        {
          type: types.UPDATECUSOMIZATIONS_UPDATING,
          payload: {
            id: menuItemId,
            custKey,
            updatedCusts: updatedCustsForStore,
          },
        },
        {
          type: types.UPDATE_MENUITEM_INIT,
          payload: updatePayload,
        }
      );
    })
  );

export default [
  updateCusomizationsEpic
];
