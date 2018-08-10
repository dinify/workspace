// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmOrder } from 'ducks/restaurant'
import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'
import moment from 'moment'
import * as FN from '../../../lib/FN'
const color = colorsByStages['s2']

const ListOfCustomizations = ({ list }) => {
	if (list) {
		return (
			<div>
				{FN.MapToList(list).map((option, i) =>
					<FoodItem bgIndex={i} key={i}>
						<span style={{whiteSpace: 'nowrap'}}>{option.name}</span>
					</FoodItem>
				)}
			</div>
		)
	}
	return null
}

const Order = ({ order, confirmOrder, removed, timer, noconfirm, datetime, users }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse Order' : 'Order'}>
    <Header>

      <TableId bg={color}>
        1
      </TableId>

      <User user={users[order.initiator]} />

			<Text color={color}>
				{datetime ? moment(order.processed).format('DD/MM/YYYY HH:mm') : ''}
			</Text>

			{!noconfirm ?
				<CheckButton bg={color} onClick={() => confirmOrder({orderId: order.id})} flash={isItOutdated(order.requested, timer.o)}>
	        <i className="ion-checkmark" />
	      </CheckButton>
			: ''}

    </Header>

      <TableTag>
        <thead>
          <tr>
            <Th color={color}>NAME</Th>
            <Th color={color}>CHOICES</Th>
            <Th color={color}>EXCLUDE</Th>
            <Th color={color}>ADD-ON</Th>
						<Th color={color}>PRICE</Th>
          </tr>
        </thead>
        <tbody>
					{order.items ? FN.MapToList(order.items).map((item, i) =>
						<Tr key={i}>
	            <Td>{item.menu_item.name}</Td>
							<Td items>
								{item.choices ? FN.MapToList(item.choices).map((choice) =>
									<FoodItem bgIndex={0}>
										<span style={{whiteSpace: 'nowrap'}}>{choice.name}</span>
									</FoodItem>
								) : ''}
							</Td>
							<Td items>
								<ListOfCustomizations list={item.excludes}></ListOfCustomizations>
							</Td>
							<Td items>
								<ListOfCustomizations list={item.addons}></ListOfCustomizations>
							</Td>
							<Td>{item.subtotal.amount}</Td>
	          </Tr>
					): ''}
					<Tr>
						<Td>TOTAL</Td>
						<Td></Td>
						<Td></Td>
						<Td></Td>
						<Td>{order.subtotal.amount} {order.subtotal.currency === 'KWD' ? 'KD' : order.subtotal.currency}</Td>
					</Tr>
        </tbody>
      </TableTag>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer,
		users: state.user.all,
	}),
  {
    confirmOrder
  },
)(Order);
