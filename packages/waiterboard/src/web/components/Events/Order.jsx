import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import N from 'numeral';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { confirmOrderInit } from 'ducks/order/actions';
import User from './user';
import { colorsByStages } from '../../colors';
import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem } from '../styled/Events';

const styles = () => ({
  progress: {
    color: 'white'
  },
});

const color = colorsByStages['s2'];

const ListOfCustomizations = ({ list }) => {
	if (list) {
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
	return null;
}

const Order = ({ classes, order, confirmOrder, removed, confirming, noconfirm, raw, datetime }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse Order' : 'Order'}>
		{!raw ?
			<Header>
				<TableId bg={color}>
	        {order.table ? order.table.number : 1}
	      </TableId>

	      <User userId={order.initiator} />

				<Text color={color}>
					{datetime ? moment(order.processed).format('DD/MM/YYYY HH:mm') : ''}
				</Text>

				{!noconfirm ?
					<CheckButton
						bg={color}
						disabled={confirming[order.id]}
						onClick={() => confirmOrder({ orderId: order.id })}
					>
		        {confirming[order.id] ?
							<CircularProgress className={classes.progress} />
							:
							<i className="ion-checkmark" />
						}
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
					{order.items ? MapToList(order.items).map((item) => {
						return (<Tr key={item.id}>
	            <Td>{item.menu_item ? item.menu_item.name : item.menuItem.translations[0].name}</Td>

							{item.orderChoices && <Td items>
								{item.orderChoices.map((orderChoice) => {
									if (!orderChoice.choice) return null;
									return <FoodItem bgIndex={0} key={orderChoice.choice.id}>
										<span style={{ whiteSpace: 'nowrap' }}>{orderChoice.choice.translations[0].name}</span>
									</FoodItem>
								})}
							</Td>}

							{item.orderExcludes && <Td items>
								{item.orderExcludes.map((orderExclude) => {
									if (!orderExclude.ingredient) return null;
									return <FoodItem bgIndex={0} key={orderExclude.ingredient.id}>
										<span style={{ whiteSpace: 'nowrap' }}>{orderExclude.ingredient.translations[0].name}</span>
									</FoodItem>;
								})}
							</Td>}

							{item.orderAddons && <Td items>
								{item.orderAddons.map((orderAddon) => {
									if (!orderAddon.addon) return null;
									return <FoodItem bgIndex={0} key={orderAddon.addon.id}>
										<span style={{ whiteSpace: 'nowrap' }}>
											<strong>{orderAddon.amount}× </strong>
											{orderAddon.addon.translations[0].name}
										</span>
									</FoodItem>;
								})}
							</Td>}

							<Td>{N(item.subtotal.amount).format('0.00')}Kč</Td>
	          </Tr>)
					}): ''}
					{order.subtotal &&
						<Tr>
						<Td>TOTAL</Td>
						<Td></Td>
						<Td></Td>
						<Td></Td>
						<Td>{N(order.subtotal.amount).format('0.00')}{order.subtotal.currency === 'CZK' ? 'Kč' : order.subtotal.currency}</Td>
					</Tr>
					}

        </tbody>
      </TableTag>

	</ActionBox>
)


export default compose(
  withStyles(styles),
  connect(
		state => ({
			confirming: state.order.confirming,
		}),
		{
			confirmOrder: confirmOrderInit
		},
	)
)(Order);
