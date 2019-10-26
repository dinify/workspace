import { createSelector } from 'reselect'
import { MapToList } from '@dinify/common/dist/lib/FN';

export const getTableList = createSelector(
  [
    (state: any) => state.table.all,
    (state: any) => state.app.selectedWBId
  ],
  (all, selectedWBId) => {
    return MapToList(all)
      .filter((t: any) => t.waiterboardId === selectedWBId)
      .sort((a: any, b: any) => a.number - b.number);
  }
)
