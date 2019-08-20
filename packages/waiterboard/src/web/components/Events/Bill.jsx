import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import N from 'numeral';
import { Form, Text as FormText } from 'react-form';
import styled from 'styled-components';
import * as FN from '@dinify/common/dist/lib/FN';
import { confirmBillInit } from 'ducks/bill/actions';
import { ActionBox, Header, TableId, CheckButton, TableTag, Th, Tr, Td, Text } from '../styled/Events';
import { colorsByStages } from '../../colors';
import User from './user';
import Elapsed from './Elapsed';

const TextInput = styled(FormText)`
  background-color: rgba(0,0,0,0.06);
  margin: 10px 0 0 10px;
  outline: none;
  padding: 5px 10px;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 5px;
  color: #666;
  width: 145px;
  &:focus {
    border-color: rgba(255,255,255,0.4);
  }
`;

const color = colorsByStages.s5;

const Bill = ({ bill, confirmBill, removed, noconfirm }) => {
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
    updatedAtDate = moment.utc(bill.updated_at).local().format('DD/MM/YYYY h:mm A');
  }
  return (
    <ActionBox className={removed ? 'vhs-zoom vhs-reverse Bill' : 'Bill'}>
      <Header>
        <TableId bg={color}>
          {bill.table.number}
        </TableId>
        <User userId={bill.initiator} />
  			{bill.BillObject === 'DEBIT_CARD' && !noconfirm ?
  				<Form
  					className="ssss"
  					onSubmit={({ approvalNumber }) => {
  						console.log('Success!', approvalNumber);
  						confirmBill({ billId: bill.id, approvalNumber, initiator: bill.initiator })
  					}}
  					validate={({ approvalNumber }) => {
  						return {
  							approvalNumber: !approvalNumber ? 'Approval Number is required' : undefined
  						}
  					}}
  				>
  					{({submitForm}) => {
  						return (
  							<form onSubmit={submitForm}>
  								<TextInput field="approvalNumber" placeholder="Card Approval Number" />
  							</form>
  						)
  					}}
  				</Form>
  			: ''}
  			<Text color={color}>
          {updatedAtDate ?
            <span>{updatedAtDate}</span>
            :
            <Elapsed startAt={bill.updated_at} />
          } by {bill.type}
  			</Text>
        {!noconfirm ?
          <CheckButton bg={color} onClick={() => confirmBill({billId: bill.id, initiator: bill.initiator})} invisible={noconfirm}>
            <i className="ion-checkmark" />
          </CheckButton>
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
    	            <Td>{item.menu_item.name}</Td>
    	            <Td>1</Td>
    	            <Td>{N(item.subtotal.amount).format('0.000')}Kč</Td>
    	          </Tr>
              )]
  					)}
  					<Tr className="boldline">
  	          <Td>Gratuity</Td>
  	          <Td>{bill.gratuity}%</Td>
  	          <Td>{N(gratuityAmount).format('0.000')}Kč</Td>
  	        </Tr>
  					<Tr>
  	          <Td bold color={color}>TOTAL</Td>
  	          <Td></Td>
  	          <Td bold color={color}>{N(total).format('0.000')}Kč</Td>
  	        </Tr>
          </tbody>
        </TableTag>

  	</ActionBox>
  )
}


export default connect(
  state => ({
    timer: state.restaurant.timer,
  }),
  {
    confirmBill: confirmBillInit
  },
)(Bill);
