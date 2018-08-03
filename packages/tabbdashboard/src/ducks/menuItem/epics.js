// @flow
import { Observable } from 'rxjs';
import R from 'ramda';
import * as FN from 'lib/FN';
import * as API from 'api/restaurant';

const updateCusomizationsEpic = (action$: Observable, { getState }) =>
  action$
    .ofType('UPDATECUSOMIZATIONS_INIT')
    .switchMap(({ payload: { menuItemId, actionKind, custKey, custId, cust, updateObj } }) => {

      const menuItem = getState().menuItem.all[menuItemId];
      if (!menuItem) return { type: 'UPDATECUSOMIZATIONS_FAIL' };

      const custs = menuItem[custKey]; // ingredietns, addons or options

      const updKeys = R.keys(updateObj);

      let updatedCusts;
      let updatedCustsForStore;
      if (actionKind === 'ADD') {
        updatedCusts = R.assocPath([custId], cust)(custs);
        updatedCustsForStore = updatedCusts;
      }
      if (actionKind === 'UPDATE') {
        updatedCusts = R.assocPath([custId, updKeys[0]], updateObj[updKeys[0]])(custs);
        updatedCustsForStore = R.assocPath([custId, 'pivot', updKeys[0]], updateObj[updKeys[0]])(custs);
      }
      if (actionKind === 'REMOVE') {
        updatedCusts = R.dissocPath([custId])(custs);
        updatedCustsForStore = updatedCusts;
      }
      const updatePayload = {};
      updatePayload.id = menuItemId;
      updatePayload[custKey] = FN.MapToList(updatedCusts);

      return Observable.of(
        {
          type: `UPDATECUSOMIZATIONS_UPDATING`,
          payload: {
            id: menuItemId,
            custKey,
            updatedCusts: updatedCustsForStore,
          },
        },
        {
          type: `UPDATE_MENUITEM_INIT`,
          payload: updatePayload,
        }
      );
    });

export default [
  updateCusomizationsEpic
];
