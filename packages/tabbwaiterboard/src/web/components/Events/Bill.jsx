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

const Bill = ({ bill, confirmBill, removed, noconfirm, timer, datetime }) => {
  if (!bill) return null
  return (
    <ActionBox className={removed ? 'vhs-zoom vhs-reverse Bill' : 'Bill'}>
      <Header>
        <TableId bg={color}>
          {Number(bill.TableObject.position) === 0 ? 'OH' : bill.TableObject.position}
        </TableId>
        {bill.UserObject ? <User user={bill.UserObject} /> : ''}
  			{bill.BillObject.payment_method === 'DEBIT_CARD' && !noconfirm ?
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
  			<Text color={color}>
          {datetime ? moment(bill.paid).subtract(3, 'h').format('DD/MM/YYYY HH:mm') : ''} {bill.BillObject.payment_method ? bill.BillObject.payment_method.replace('_',' ').replace('K NET','ONLINE') : ''}
  			</Text>
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
  					{bill.BillItems ? bill.BillItems.map((item, i) =>
  						<Tr key={i}>
  	            <Td>{item.food_name}</Td>
  	            <Td>{item.quantity}</Td>
  	            <Td>{item.amount}KD</Td>
  	          </Tr>
  					) : ''}
  					<Tr>
  	          <Td>Gratitude</Td>
  	          <Td>{bill.BillObject.gratitude_ratio}%</Td>
  	          <Td>{bill.BillObject.gratitude}KD</Td>
  	        </Tr>
  					<Tr>
  	          <Td bold color={color}>TOTAL</Td>
  	          <Td></Td>
  	          <Td bold color={color}>{bill.BillObject.total}KD</Td>
  	        </Tr>
          </tbody>
        </TableTag>

  	</ActionBox>
  )
}


export default connect(
  state => ({
    timer: state.restaurant.timer
  }),
  {
    confirmBill
  },
)(Bill);
