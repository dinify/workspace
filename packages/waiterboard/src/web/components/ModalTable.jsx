import React from 'react';
import { connect } from 'react-redux';
import { colorsByStages } from '../colors';
import { Head, Body, BodyPlaceholder } from './styled/Modal';
import Seat from './SeatSummary';

class ModalTable extends React.Component {

  render(){
    const { shown, payload: { tableId }, tableMap, seatList } = this.props;
    if (!shown) return (<div />)

    const table = tableMap[tableId] || {};
    const seats = seatList.filter((seat) => seat.table_id === tableId)

    return (
    	<div>
        <Head bg='rgba(0,0,0,0.3)'>
          Table no. {table.number}
        </Head>
        <Body>
          {seats.length < 1 ?
            <BodyPlaceholder>No guests at this table</BodyPlaceholder>
            :
            <div>
              {seats.map((seat) =>
                <Seat seat={seat} key={seat.id} />
              )}
            </div>
          }
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    waiterboardId: state.app.selectedWBId,
    tableMap: state.table.all
  })
)(ModalTable);
