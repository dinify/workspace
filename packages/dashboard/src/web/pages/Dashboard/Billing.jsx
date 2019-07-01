import 'react-dates/initialize';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import pluck from 'ramda/src/pluck';

import ReactTable from 'react-table';
import { DateRangePicker } from 'react-dates';

import 'react-table/react-table.css';
import 'react-dates/lib/css/_datepicker.css';

import { getBillsInitAction } from 'ducks/restaurant/actions';

// const Header = styled.div`
//   position: fixed;
//   left: 240px;
//   z-index: 1000000;
//   top: 0;
//   height: 60px;
//   width: calc(100% - 240px);
//   background: #fff;
//   padding-left: 30px;
// `;
// 
// const Title = styled.span`
//   margin-right: 50px;
//   line-height: 60px;
// `;
// 
// const BillingPage = styled.div`
//   font-family: sans-serif;
//   .rt-td {
//     font-size: 12px;
//     strong {
//       color: black;
//     }
//   }
//   .rt-thead {
//     font-size: 12px;
//   }
// `;

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: moment().subtract(30, 'days'),
      endDate: moment(),
    };
  }
  componentDidMount() {
    const { getBills } = this.props;
    const { startDate, endDate } = this.state;
    getBills({ from: startDate, to: endDate });
  }
  render() {
    let { bills, getBills } = this.props;

    return (
      <BillingPage>
        <Header>
          <Title>Billing</Title>
          <div style={{ float: 'right', padding: '6px 20px 7px 0' }}>
            <DateRangePicker
              isOutsideRange={() => false}
              anchorDirection="right"
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate, endDate });
                getBills({ from: startDate, to: endDate });
              }} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </div>
        </Header>

        <ReactTable
          data={bills}
          columns={[
            {
              Header: 'Year/Month/Date',
              accessor: bill => moment(bill.check_in).format('YYYY/MM/DD'),
              id: 'check_in_date',
              Footer: 'TOTAL',
            },
            {
              Header: 'Transaction No.',
              accessor: bill => numeral(bill.id).format('00000000'),
              id: 'id',
            },
            {
              Header: 'Guest E-Mail',
              minWidth: 200,
              accessor: bill => (
                <span>
                  <strong>{bill.UserObject.email.split('@')[0]}</strong>
                  <span>@</span>
                  <span>{bill.UserObject.email.split('@')[1]}</span>
                </span>
              ),
              id: 'user',
            },
            {
              Header: 'Order Type',
              accessor: bill =>
                Number(bill.TableObject.position) === 0
                  ? 'Order Ahead'
                  : 'Dine-in',
              id: 'orderType',
            },
            {
              Header: 'Check-in',
              accessor: bill =>
                moment(bill.check_in)
                  .subtract(3, 'h')
                  .format('HH:mm'),
              id: 'check_in',
            },
            {
              Header: 'Check-out',
              accessor: bill =>
                moment(bill.check_out)
                  .subtract(3, 'h')
                  .format('HH:mm'),
              id: 'check_out',
            },
            {
              Header: 'Sales',
              accessor: bill => `${bill.sub_total} KD`,
              id: 'sales',
              style: {
                textAlign: 'right',
              },
              Footer: `${numeral(
                pluck('sub_total')(bills).reduce(
                  (a, b) => Number(a) + Number(b),
                  0,
                ),
              ).format('0.000')} KD`,
            },
            {
              Header: 'Payment',
              accessor: bill =>
                bill.payment_method
                  .replace('K_NET', 'ONLINE')
                  .replace('_', ' '),
              id: 'payment',
            },
            {
              Header: 'Transaction Fee',
              accessor: bill =>
                `${numeral(bill.sub_total * 0.025).format('0.000')} KD`,
              id: 'fee',
              Footer: (
                <span>
                  <span>
                    {numeral(
                      pluck('sub_total')(bills).reduce(
                        (a, b) => Number(a) + Number(b) * 0.025,
                        0,
                      ),
                    ).format('0.000')}KD
                  </span>
                </span>
              ),
            },
            {
              Header: 'Gratitude',
              accessor: bill => `${bill.gratitude} KD`,
              id: 'gratitude',
              style: {
                textAlign: 'right',
              },
              Footer: `${numeral(
                pluck('gratitude')(bills).reduce(
                  (a, b) => Number(a) + Number(b),
                  0,
                ),
              ).format('0.000')} KD`,
            },
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
      </BillingPage>
    );
  }
}

export default connect(
  state => ({
    bills: state.restaurant.bills,
  }),
  {
    getBills: getBillsInitAction,
  },
)(Billing);
