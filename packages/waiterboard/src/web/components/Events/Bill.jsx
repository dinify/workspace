import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import N from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as FN from '@dinify/common/src/lib/FN';
import { confirmBillAsync } from 'features/bill/actions';
import { ActionBox, Header, TableId, CheckButton, TableTag, Th, Tr, Td, Text } from '../styled/Events';
import { colorsByStages } from '../../colors';
import User from './user';
import Elapsed from './Elapsed';
import { useFormatters } from "@dinify/common/src/lib/i18n/formatter";

const styles = () => ({
  progress: {
    color: 'white'
  },
});

const color = colorsByStages.s5;

const Bill = ({ bill, confirmBill, removed, noconfirm, confirming, classes }) => {
  if (!bill || !bill.subtotal) return null;

  const currencyFormatter = useFormatters().currency;

  const currency = bill.subtotal.currency;

  const subtotal = Number(bill.subtotal.amount);
  const gratuityPercentage = Number(bill.gratuity/100);
  const gratuityAmount = gratuityPercentage * subtotal;

  const total = subtotal + gratuityAmount;
  let orderItems = [];
  orderItems = FN.MapToList(bill.orders).map((order) => {
    const newOrder = order;
    newOrder.items = FN.MapToList(order.items)
    return newOrder;
  })
  let updatedAtDate = false;
  if (noconfirm) {
    updatedAtDate = moment.utc(bill.updatedAt).local().format('DD/MM/YYYY h:mm A');
  }

  return (
    <ActionBox className={removed ? 'vhs-zoom vhs-reverse Bill' : 'Bill'}>
      <Header>
        <TableId bg={color}>
          {bill.seat.table ? bill.seat.table.number : '-'}
        </TableId>
        <User userId={bill.initiator} />
  			<Text color={color}>
          {updatedAtDate ?
            <span>{updatedAtDate}</span>
            :
            <Elapsed startAt={bill.updatedAt} />
          } by {bill.type}
  			</Text>
        {!noconfirm ?
          <CheckButton 
            bg={color}
            disabled={confirming[bill.id]}
            onClick={() => confirmBill({
              billId: bill.id,
              type: bill.type,
              initiator: bill.initiator
            })} invisible={noconfirm}
          >
		        {confirming[bill.id] ?
							<CircularProgress className={classes.progress} />
							:
							<i className="ion-checkmark" />
						}          </CheckButton>
        : ''}
      </Header>

        <TableTag>
          <thead>
            <tr>
              <Th color={color}>DESCRIPTION</Th>
              <Th color={color}>Q'TY</Th>
              <Th color={color}>AMOUNT</Th>
            </tr>
          </thead>
          <tbody>
  					{orderItems.map((order) =>
              [/*
                  <Tr key={order.id} className="headline">
                  <Td>{orderTypes[order.type]} order</Td>
                  <Td>{order.items.length}</Td>
                  <Td>{N(order.subtotal.amount).format('0.000')}€</Td>
                </Tr>, 
                */
              order.items.map((item) =>
                <Tr key={item.id}>
    	            <Td>{item.menuItem.translations[0].name}</Td>
    	            <Td>1</Td>
    	            <Td style={{textAlign: 'right'}}>
                    {currencyFormatter([{ amount: item.subtotal.amount, currency }], ["short"])}
                  </Td>
    	          </Tr>
              )]
  					)}
  					<Tr className="boldline">
  	          <Td>Gratuity</Td>
  	          <Td>{bill.gratuity}%</Td>
  	          <Td style={{textAlign: 'right'}}>
                {currencyFormatter([{ amount: gratuityAmount, currency }], ["short"])}
              </Td>
  	        </Tr>
  					<Tr>
  	          <Td bold color={color}>TOTAL</Td>
  	          <Td></Td>
  	          <Td bold color={color} style={{textAlign: 'right'}}>
                {currencyFormatter([{ amount: total, currency }], ["short"])}
              </Td>
  	        </Tr>
          </tbody>
        </TableTag>

  	</ActionBox>
  )
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      confirming: state.bill.confirming,
    }),
    {
      confirmBill: confirmBillAsync.request
    },
  )
)(Bill);
