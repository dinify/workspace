// @flow
import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchTodayBills as fetchTodayBillsAction } from 'ducks/bill/actions';
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

  componentDidMount() {
    const { fetchTodayBills, waiterboardId } = this.props;
    fetchTodayBills({ waiterboardId });
  }

  render(){

    const { bills } = this.props;

    return (
    	<div>
        <Body>
          {bills.map((bill) =>
            <Bill key={bill.id} bill={bill} noconfirm />
          )}
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    waiterboardId: state.restaurant.selectedWBId
  }),
  {
    fetchTodayBills: fetchTodayBillsAction
  },
)(ModalListOfBills);
