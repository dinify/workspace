// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { Form, Text as FormText } from 'react-form'
import styled from 'styled-components'
import { confirmBill } from '../../../ducks/restaurant'
import { ActionBox, Header, TableId, CheckButton, TableTag, Th, Tr, Td, Text } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'
import moment from 'moment';

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

const color = colorsByStages['s5']

const Bill = ({ bill, confirmBill, removed, noconfirm, timer, datetime, users }) => {
  if (!bill) return null
  return (
    <ActionBox className={removed ? 'vhs-zoom vhs-reverse Bill' : 'Bill'}>
      <Header>
        <TableId bg={color}>
          1
        </TableId>
        <User user={users[bill.initiator]} />
  			{bill.BillObject === 'DEBIT_CARD' && !noconfirm ?
  				<Form
  					className="ssss"
  					onSubmit={({ approvalNumber }) => {
  						console.log('Success!', approvalNumber);
  						confirmBill({ billId: bill.id, approvalNumber })
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
  			{/*<Text color={color}>
          {datetime ? moment(bill.paid).subtract(3, 'h').format('DD/MM/YYYY HH:mm') : ''} {bill.BillObject.payment_method ? bill.BillObject.payment_method.replace('_',' ').replace('K NET','ONLINE') : ''}
  			</Text>*/}
        <CheckButton bg={color} onClick={() => confirmBill({billId: bill.id})} flash={!noconfirm && isItOutdated(bill.requested, timer.p)} invisible={noconfirm}>
          <i className="ion-checkmark" />
        </CheckButton>
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
  					{bill.bill && bill.bill.items ? bill.bill.items.map((item, i) =>
  						<Tr key={i}>
  	            <Td>{item.order_item.menu_item.name}</Td>
  	            <Td>1</Td>
  	            <Td>{item.subtotal.amount}KD</Td>
  	          </Tr>
  					) : ''}
  					<Tr>
  	          <Td>Gratitude</Td>
  	          <Td>{bill.gratuity}%</Td>
  	          <Td>{Math.round((bill.total.amount - (bill.total.amount / (1 + bill.gratuity/100 )))*1000)/1000}KD</Td>
  	        </Tr>
  					<Tr>
  	          <Td bold color={color}>TOTAL</Td>
  	          <Td></Td>
  	          <Td bold color={color}>{bill.total.amount}KD</Td>
  	        </Tr>
          </tbody>
        </TableTag>

  	</ActionBox>
  )
}


export default connect(
  state => ({
    timer: state.restaurant.timer,
    users: state.user.all,
  }),
  {
    confirmBill
  },
)(Bill);
