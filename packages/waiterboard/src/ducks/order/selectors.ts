import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';
import pipe from 'ramda/es/pipe';
import { selectedRestaurantId } from '../restaurant/selectors';
import moment from 'moment';

type getOrderListParams = {
  confirmed: boolean;
  today?: boolean;
}

export const getOrderList = ({ confirmed, today = false }: getOrderListParams) => createSelector(
  [
    (state) => state.order.all,
    selectedRestaurantId
  ],
  (all, rId) => {
    const todayCondition = (date: string) => {
      if (today) {
        const startTime = moment(date);
        return startTime.isSame(new Date(), "day");
      }
      return true;
    }
    const statusCondition = (status: string) => {
      if (confirmed) return status === 'CONFIRMED';
      else return status !== 'CONFIRMED';
    }
    return pipe(
      (m: any) => MapToList(m),
      filter((o: any) => todayCondition(o.createdAt)),
      filter((o: any) => statusCondition(o.status) && o.restaurantId === rId)
    )(all);
  }
);

