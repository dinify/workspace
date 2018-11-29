// @flow
import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchTodayBills as fetchTodayBillsAction } from 'ducks/bill/actions';
import Bill from './Events/Bill'
import { colorsByStages } from '../colors'

import { Head, Body, BodyPlaceholder } from './styled/Modal'


class ModalListOfBills extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.shown && !prevProps.shown) {
      const { fetchTodayBills, waiterboardId } = this.props;
      fetchTodayBills({ waiterboardId });
    }
  }

  render(){


    const { bills, shown } = this.props;
    if (!shown) return (<div />)

    return (
    	<div>
        <Head bg={colorsByStages['s5']}>
          Accepted Reservations
        </Head>
        <Body>
          {bills.length < 1 ? <BodyPlaceholder>No confirmed payments</BodyPlaceholder> : ''}
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
