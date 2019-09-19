import React from 'react';
import { connect } from 'react-redux';
import { OrderStatus } from 'TransactionModels';
import { RootState } from 'typesafe-actions';
import { getOrderItemIdsByStatus } from '../../../ducks/transaction/selectors';

import Typography from '@material-ui/core/Typography';
import BillItem from './bill-item';

export interface BillSectionProps {
  type: OrderStatus,
  orderItemIds: string[]
}

const BillSectionComponent: React.FC<BillSectionProps> = (props) => {
  const {
    type,
    orderItemIds
  } = props;
  const emptySection = orderItemIds.length === 0;
  let sectionLabel;

  const t = (k: string) => ({
    'bill.section.waiting': 'Waiting orders', 
    'bill.section.confirmed': 'Confirmed orders',
    'bill.section.empty': 'Once your orders are confirmed, they get added to your bill total',
  } as any)[k];

  if (type === 'DISPATCHED') sectionLabel = t('bill.section.waiting');
  else if (type === 'CONFIRMED') sectionLabel = t('bill.section.confirmed');

  return (
    <>
      <Typography style={{marginTop: 16, marginBottom: 16}} variant="overline">
        {sectionLabel}
      </Typography>
      {orderItemIds.map(itemId => (
        <BillItem orderItemId={itemId}/>
      ))}
      {emptySection && (
        <Typography color="textSecondary" variant="caption">
          {t('bill.section.empty')}
        </Typography>
      )}
    </>
  );
};

export const BillSection = connect(
  (state: RootState, { type }: { type: OrderStatus }) => ({
    orderItemIds: getOrderItemIdsByStatus(state.transaction)(type)
  })
)(BillSectionComponent);