// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmOrder } from '../../../ducks/restaurant'
import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem, Color } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'

const color = colorsByStages['s2']

const ListOfCustomizations = ({ list }) => {
	if (list && list.length > 0) {
		return (
			<div>
				{list.map((option, i) =>
					<FoodItem bgIndex={i} key={i}>
						<span style={{whiteSpace: 'nowrap'}}>{option.name}</span>
					</FoodItem>
				)}
			</div>
		)
	}
	return null
}

const Order = ({ order, confirmOrder, removed, timer }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
    <Header>

      <TableId bg={color}>
        {order.TableObject ? order.TableObject.position : ''}
      </TableId>

      <User user={order.UserObject} />

      <CheckButton bg={color} onClick={() => confirmOrder({orderId: order.id})} flash={isItOutdated(order.requested, timer.o)}>
        <i className="ion-checkmark" />
      </CheckButton>

    </Header>

      <TableTag>
        <thead>
          <tr>
            <Th color={color}>DESCRIPTION</Th>
            <Th color={color}>OPTION</Th>
            <Th color={color}>DELETE</Th>
            <Th color={color}>ADD-ON</Th>
						<Th color={color}>Q'TY</Th>
          </tr>
        </thead>
        <tbody>
					{order.CartItems ? order.CartItems.map((item, i) =>
						<Tr key={i}>
	            <Td>{item.FoodObject.name}</Td>
	            <Td items>
								<ListOfCustomizations list={item.Options}></ListOfCustomizations>
							</Td>
							<Td items>
								<ListOfCustomizations list={item.Excludes}></ListOfCustomizations>
							</Td>
							<Td items>
								<ListOfCustomizations list={item.Toppings}></ListOfCustomizations>
							</Td>
							<Td>
								{item.quantity}
							</Td>
	          </Tr>
					): ''}
        </tbody>
      </TableTag>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer
	}),
  {
    confirmOrder
  },
)(Order);
