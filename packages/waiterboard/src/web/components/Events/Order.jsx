// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmOrder } from 'ducks/restaurant/actions'
import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'
import moment from 'moment'
import * as FN from '../../../lib/FN'
import N from 'numeral';

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

const Order = ({ order, confirmOrder, removed, timer, noconfirm, raw, datetime }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse Order' : 'Order'}>
		{!raw ?
			<Header>
				<TableId bg={color}>
	        {order.table.number}
	      </TableId>

	      <User userId={order.initiator} />

				<Text color={color}>
					{datetime ? moment(order.processed).format('DD/MM/YYYY HH:mm') : ''}
				</Text>

				{!noconfirm ?
					<CheckButton bg={color} onClick={() => confirmOrder({orderId: order.id, initiator: order.initiator})}>
		        <i className="ion-checkmark" />
		      </CheckButton>
				: ''}
	    </Header>
			:
			''
		}

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
					{order.items ? FN.MapToList(order.items).map((item) =>
						<Tr key={item.id}>
	            <Td>{item.menu_item.name}</Td>
							<Td items>
								{item.choices ? FN.MapToList(item.choices).map((choice) =>
									<FoodItem bgIndex={0} key={choice.id}>
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
							<Td>{N(item.subtotal.amount).format('0.000')}KD</Td>
	          </Tr>
					): ''}
					<Tr>
						<Td>TOTAL</Td>
						<Td></Td>
						<Td></Td>
						<Td></Td>
						<Td>{N(order.subtotal.amount).format('0.000')}{order.subtotal.currency === 'KWD' ? 'KD' : order.subtotal.currency}</Td>
					</Tr>
        </tbody>
      </TableTag>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer,
	}),
  {
    confirmOrder
  },
)(Order);
