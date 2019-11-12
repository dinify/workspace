import React from 'react';
import { connect } from 'react-redux';
import { OrderStatus } from 'TransactionModels';
import { RootState } from 'typesafe-actions';
import { getOrderItemIdsByStatus } from '../../../features/transaction/selectors';

import Typography from '@material-ui/core/Typography';
import BillItem from './bill-item';
import { useTranslation } from '@dinify/common/src/lib/i18n';

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
  const { t } = useTranslation();

  if (type === 'DISPATCHED') sectionLabel = t('bill.section.waiting');
  else if (type === 'CONFIRMED') sectionLabel = t('bill.section.confirmed');

  if (emptySection) return null;
  return (
    <>
      <Typography style={{marginTop: 16, marginBottom: 16}} variant="overline">
        {sectionLabel}
      </Typography>
      {orderItemIds.map(itemId => (
        <BillItem key={itemId} orderItemId={itemId}/>
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