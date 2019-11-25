import React from 'react';
import { connect } from 'react-redux';
import { getOrderList } from 'features/order/selectors';
import Order from './Events/Order';
import { colorsByStages } from '../colors';

import { Head, Body, BodyPlaceholder } from './styled/Modal';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const ModalListOfOrders = ({
  orders, shown
}) => {

  if (!shown) return (<div />)
  const { t } = useTranslation();

  return (
    <div>
      <Head bg={colorsByStages.s2}>
        {t('orders-of-today')}
      </Head>
      <Body>
        {orders.length < 1 ? <BodyPlaceholder>{t('no-confirmed-orders')}</BodyPlaceholder> : ''}
        {orders.map((order) =>
          <Order key={order.id} order={order} noconfirm datetime />
        )}
      </Body>
    </div>
  );
}

export default connect(
  state => ({
    orders: getOrderList({ confirmed: true, today: true })(state)
  })
)(ModalListOfOrders);
