import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import N from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as FN from '@dinify/common/dist/lib/FN';
import { confirmBillInit } from 'ducks/bill/actions';
import { ActionBox, Header, TableId, CheckButton, TableTag, Th, Tr, Td, Text } from '../styled/Events';
import { colorsByStages } from '../../colors';
import User from './user';
import Elapsed from './Elapsed';

const styles = () => ({
  progress: {
    color: 'white'
  },
});

const color = colorsByStages.s5;

const Bill = ({ bill, confirmBill, removed, noconfirm, confirming, classes }) => {
  if (!bill || !bill.subtotal) return null
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
          {bill.table ? bill.table.number : 1}
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
                  <Td>{N(order.subtotal.amount).format('0.000')}Kč</Td>
                </Tr>, 
                */
              order.items.map((item) =>
                <Tr key={item.id}>
    	            <Td>{item.menuItem.translations[0].name}</Td>
    	            <Td>1</Td>
    	            <Td>{N(item.subtotal.amount).format('0.00')}Kč</Td>
    	          </Tr>
              )]
  					)}
  					<Tr className="boldline">
  	          <Td>Gratuity</Td>
  	          <Td>{bill.gratuity}%</Td>
  	          <Td>{N(gratuityAmount).format('0.00')}Kč</Td>
  	        </Tr>
  					<Tr>
  	          <Td bold color={color}>TOTAL</Td>
  	          <Td></Td>
  	          <Td bold color={color}>{N(total).format('0.00')}Kč</Td>
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
      confirmBill: confirmBillInit
    },
  )
)(Bill);
