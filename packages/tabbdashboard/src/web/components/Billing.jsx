// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import numeral from 'numeral'

import ReactTable from "react-table";
import "react-table/react-table.css";

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

const BillingPage = styled.div`
  .rt-td {
    font-size: 12px;
  }
  .rt-thead {
    font-size: 12px;
  }
`

class Billing extends React.Component {
  componentDidMount() {
    const { getBills } = this.props
    getBills()
  }
  render() {
    let { bills } = this.props

    return (
      <BillingPage>
        <Header>
          Billing
        </Header>

        <ReactTable
          data={bills}
          columns={[
            {
              Header: "Date/Month/Year",
              accessor: bill => moment(bill.check_in).format('DD/MM/YYYY'),
              id: 'check_in_date'
            },
            {
              Header: "Transaction No.",
              accessor: bill => numeral(bill.id).format('00000000'),
              id: 'id'
            },
            {
              Header: "Guest E-Mail",
              accessor: bill => (
                <span>
                  <strong>{bill.UserObject.email.split('@')[0]}</strong>
                  <span>@</span>
                  <span>{bill.UserObject.email.split('@')[1]}</span>
                </span>
              ),
              id: 'user'
            },
            {
              Header: "Order Type",
              accessor: bill => Number(bill.TableObject.position) === 0 ? 'Order Ahead' : 'Dine-in',
              id: 'orderType'
            },
            {
              Header: "Check-in",
              accessor: bill => moment(bill.check_in).subtract(3, 'h').format('HH:mm'),
              id: 'check_in'
            },
            {
              Header: "Check-out",
              accessor: bill => moment(bill.check_out).subtract(3, 'h').format('HH:mm'),
              id: 'check_out'
            },
            {
              Header: "Sales",
              accessor: bill => `${bill.sub_total} KD`,
              id: 'sales'
            },
            {
              Header: "Payment",
              accessor: bill => bill.payment_method.replace('K_NET','ONLINE').replace('_',' '),
              id: 'payment'
            },
            {
              Header: "Fee Transaction/Payment",
              accessor: bill =>  `${bill.total}KD / ${bill.sub_total}`,
              id: 'fee'
            },
            {
              Header: "Gratitude",
              accessor: bill => `${bill.gratitude} KD`,
              id: 'gratitude'
            },
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
      </BillingPage>
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
