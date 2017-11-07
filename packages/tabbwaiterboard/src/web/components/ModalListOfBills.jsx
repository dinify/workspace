// @flow
import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTodayBillsOfTable } from '../../ducks/restaurant';
import Bill from './Events/Bill'

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 180px;
  padding: 30px;
`;
const Photo = styled.div`
  background-color: white;
  background-image: url(${props => props.url});
  width: 80px;
  height: 80px;
  background-size: 84px;
  border-radius: 50%;
  background-position: center;
  display: inline-block;
`;

const SmallTable = styled.table`
  width: width;
  border-spacing: 0;
  display: inline-block;
  margin: 0 0 0 30px;
`;
const TdLabel = styled.td`
  color: #999;
  font-weight: 300;
  padding: 0 25px 5px 0;
  padding-left: left;
  font-size: 14px;
  text-align: left;
`;
const TdValue = styled.td`
  color: black;
  font-weight: 300;
  padding: 5px 0;
  font-size: 16px;
  color: #666;
  text-align: left;
`;

const Label = styled.div`
  color: blue;
  background: white;
  display: inline-block;
  font-weight: 300;
  padding: 5px 15px;
  margin: 0 5px 5px 0;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
`;

const NumHighlight = styled.span`
  color: rgb(246,157,0);
`;

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

const TableTag = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-bottom: 30px;
`;

const Th = styled.th`
  color: ${props => props.color};
  font-weight: 300;
  border-bottom: 1px solid ${props => props.color};
  padding-bottom: 5px;
  &:first-child {
    text-align: left
  }
`;
const Td = styled.td`
  color: ${props => props.color};
  font-weight: 300;
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #666;
  &:first-child {
    text-align: left
  }
`;

class ModalListOfBills extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    console.log('//////////');
    const { payload: { tableId }, getTodayBillsOfTable, billsOfTable } = this.props;

  }

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
