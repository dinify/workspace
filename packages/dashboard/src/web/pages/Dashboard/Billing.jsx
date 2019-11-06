import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import pluck from 'ramda/es/pluck';

import ReactTable from 'react-table';
import { DateRangePicker } from 'react-dates';

import 'react-table/react-table.css';
import 'react-dates/lib/css/_datepicker.css';

import { fetchTransactionsAsync } from 'features/transaction/actions';
import { getTransactionsList } from 'features/transaction/selectors';

const Billing = ({
  transactions,
  getTransactions
}) => {

  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState(null);

  console.log(transactions);

  useEffect(() => {
    getTransactions({ from: startDate, to: endDate });
  }, []);

  return (
    <>
      <div>
        <div style={{ padding: '2px 0 12px 0' }}>
          <DateRangePicker
            isOutsideRange={() => false}
            anchorDirection="right"
            startDate={startDate} // momentPropTypes.momentObj or null,
            endDate={endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
              getTransactions({ from: startDate, to: endDate });
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
          />
        </div>
      </div>

      <ReactTable
        data={transactions}
        columns={[
          {
            Header: 'Created at',
            accessor: bill => moment(bill.createdAt).format('YYYY/MM/DD'),
            id: 'check_in_date',
            Footer: 'TOTAL',
          },
          {
            Header: 'Transaction No.',
            accessor: bill => bill.id,
            id: 'id',
          },
          {
            Header: 'Guest ID',
            minWidth: 200,
            accessor: bill => (
              <span>
                <strong>{bill.initiator}</strong>
              </span>
            ),
            id: 'user',
          },
          {
            Header: 'Order Type',
            accessor: () => 'Dine-in',
            id: 'orderType',
          },
          {
            Header: 'Sales',
            accessor: bill => `${numeral(bill.subtotal.amount).format('0.00')} €`,
            id: 'sales',
            style: {
              textAlign: 'right',
            },
            Footer: `${numeral(
              transactions.map(b => b.subtotal.amount).reduce(
                (a, b) => Number(a) + Number(b),
                0,
              ),
            ).format('0.00')} €`,
          },
          {
            Header: 'Payment type',
            accessor: bill => bill.type,
            id: 'payment',
          },
          {
            Header: 'Gratuity',
            accessor: bill => `${numeral(bill.total.amount - bill.subtotal.amount).format('0.00')} €`,
            id: 'gratitude',
            style: {
              textAlign: 'right',
            },
            Footer: `${numeral(
              transactions
              .map((bill) => bill.total.amount - bill.subtotal.amount)
              .reduce((a, b) => Number(a) + Number(b), 0),
            ).format('0.00')} €`,
          },
        ]}
        defaultPageSize={25}
        className="-striped -highlight"
      />
    </>
  );

}

export default connect(
  state => ({
    transactions: getTransactionsList(state),
  }),
  {
    getTransactions: fetchTransactionsAsync.request,
  },
)(Billing);
