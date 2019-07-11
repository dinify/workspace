
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';

import moment from 'moment';

import * as FN from '@dinify/common/dist/lib/FN'
import { confirmOrderAhead } from 'ducks/restaurant/actions'

import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem, Color } from '../styled/Events'

import User from './user'
import { isItOutdated } from '../../../common/helpers/time'


const color = colorsByStages['oh']

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

const OrderAhead = ({ order, confirmOrderAhead, removed, timer }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
    <Header>

      <TableId bg={color}>
        OH
      </TableId>

      <User userId={order.initiator} />

			<Text color={'#999'}>
				<Color color={color}>{order.is_take_away ? 'TAKE AWAY' : 'DINE-IN'}</Color> | {moment(order.status_updated).add(order.meta.eta,'s').format('hh:mm')} {order.note ? <span>| {order.note}</span> : ''}
			</Text>


      <CheckButton bg={color} onClick={() => confirmOrderAhead({orderId: order.id})} flash={isItOutdated(order.meta.status_updated, timer.oh)}>
        <i className="ion-checkmark" />
      </CheckButton>

    </Header>

      <TableTag>
        <thead>
          <tr>
            <Th color={color}>DESCRIPTION</Th>
            <Th color={color}>OPTION</Th>
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
								{item.option ?
									<FoodItem bgIndex={0}>
										<span style={{whiteSpace: 'nowrap'}}>{item.option.name}</span>
									</FoodItem>
								: ''}
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
						<Td>{order.subtotal.amount} {order.subtotal.currency}</Td>
					</Tr>
        </tbody>
      </TableTag>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer
	}),
  {
    confirmOrderAhead
  },
)(OrderAhead);
