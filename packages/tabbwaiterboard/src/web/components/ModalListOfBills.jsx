// @flow
import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTodayBillsOfTable } from '../../ducks/restaurant';
import Bill from './Events/Bill'

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .Bill {
    width: 100%
  }
`;

class ModalListOfBills extends React.Component {

  //componentWillReceiveProps() {
  //  console.log('//////////');
  //  const { payload: { tableId }, getTodayBillsOfTable, billsOfTable } = this.props;
  //}

  render(){

    const { payload: { tableId }, billsOfTable, getTodayBillsOfTable } = this.props;

    if (billsOfTable.length < 1 ) getTodayBillsOfTable({ tableId });

    return (
    	<div>
        <Body>
          {billsOfTable.map((bill, i) =>
            <Bill key={i} bill={bill} noconfirm />
          )}
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    billsOfTable: state.ui.billsOfTable
  }),
  {
    getTodayBillsOfTable
  },
)(ModalListOfBills);
