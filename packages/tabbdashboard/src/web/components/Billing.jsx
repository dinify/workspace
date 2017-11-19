// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import numeral from 'numeral'

import {
  getBillsInitAction,
} from '../../ducks/restaurant'

const Header = styled.div`
  position: fixed;
  left: 240px;
  top: 0;
  height: 60px;
  width: calc(100% - 240px);
  background: #FFF;
  line-height: 60px;
  padding-left: 30px;
`
const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  margin: 20px 0;
`
const TableHead = styled.thead`
  background: #F2F4F7;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  font-size: 14px;
  text-align: left;
`
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0,0,0,0.07);
  }
`
const TH = styled.th`
  border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 10px;
`
const TD = styled.td`
  font-size: 12px;
  padding: 10px;
`

class Billing extends React.Component {
  componentDidMount() {
    const { getBills } = this.props
    getBills()
  }
  render() {
    const { bills } = this.props
    return (
      <div>
        <Header>
          Billing
        </Header>

        <Table>
          <TableHead>
            <TableRow>
              <TH>Date/Month/Year</TH>
              <TH>Transaction No.</TH>
              <TH>Guest ID</TH>
              <TH>Order Type</TH>
              <TH>Check-in</TH>
              <TH>Check-out</TH>
              <TH>Sales</TH>
              <TH>Payment</TH>
              <TH>Fee Transaction/Payment</TH>
              <TH>Gratitude</TH>
            </TableRow>
          </TableHead>
          <tbody>
            {bills.map((bill, i) =>
              <TableRow key={i}>
                <TD>{moment(bill.check_in).get('date')}/{moment(bill.check_in).get('month')}/{moment(bill.check_in).get('year')}</TD>
                <TD>{numeral(bill.id).format('00000000')}</TD>
                <TD>{bill.UserObject.email}</TD>
                <TD>{Number(bill.TableObject.position) === 0 ? 'Order Ahead' : 'Dine-in'}</TD>
                <TD>{moment(bill.check_in).subtract(3, 'h').format('HH:mm')}</TD>
                <TD>{moment(bill.check_out).subtract(3, 'h').format('HH:mm')}</TD>
                <TD>{bill.sub_total}KD</TD>
                <TD>{bill.payment_method}</TD>
                <TD>{bill.total}KD/{bill.sub_total}KD</TD>
                <TD>{bill.gratitude}</TD>
              </TableRow>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  state => ({
    bills: state.restaurant.bills
  }),
  {
    getBills: getBillsInitAction
  },
)(Billing)
