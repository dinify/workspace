import React from 'react';
import { connect } from 'react-redux';
import { colorsByStages } from '../colors';
import { Head, Body, BodyPlaceholder } from './styled/Modal';
import Seat from './SeatSummary';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const ModalTable = ({
  shown,
  payload: { tableId },
  tableMap,
  seatList
})  => {

  if (!shown) return (<div />);

  const { t } = useTranslation();

  const table = tableMap[tableId] || {};
  const seats = seatList.filter((seat) => seat.tableId === tableId);

  return (
    <div>
      <Head bg='rgba(0,0,0,0.3)'>
        {t('table-number')} {table.number}
      </Head>
      <Body>
        {seats.length < 1 ?
          <BodyPlaceholder>{t('no-guests-at-this-table')}</BodyPlaceholder>
          :
          <div>
            {seats.map((seat) =>
              <Seat seat={seat} key={seat.id} />
            )}
          </div>
        }
      </Body>
    </div>
  );
}

export default connect(
  state => ({
    tableMap: state.table.all
  })
)(ModalTable);
