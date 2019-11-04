import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';
import pipe from 'ramda/es/pipe';
import { selectedRestaurantId } from '../restaurant/selectors';

type getOrderListParams = {
  confirmed: boolean
}

export const getOrderList = ({ confirmed }: getOrderListParams) => createSelector(
  [
    (state) => state.order.all,
    selectedRestaurantId
  ],
  (all, rId) => {
    const cond = (status: string) => {
      if (confirmed) return status === 'CONFIRMED';
      else return status !== 'CONFIRMED';
    }
    return pipe(
      (m: any) => MapToList(m),
      filter((o: any) => cond(o.status) && o.restaurantId === rId)
    )(all);
  }
);

