import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import N from 'numeral';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MapToList } from '@dinify/common/src/lib/FN';
import User from './user';
import { colorsByStages } from '../../colors';
import { ActionBox, Header, TableId, Text, CheckButton, TableTag, Th, Tr, Td, FoodItem } from '../styled/Events';
import { confirmOrderAsync } from 'features/order/actions';
import Price from '@dinify/common/src/components/price';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const styles = () => ({
  progress: {
    color: 'white'
  },
});

const color = colorsByStages.s2;

const Order = ({ classes, order, confirmOrder, removed, confirming, noconfirm, raw, datetime }) => {
	const { t } = useTranslation();

	return (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse Order' : 'Order'}>
		{!raw ?
			<Header>
				<TableId bg={color}>
	        {order.seat ? order.seat.table.number : '-'}
	      </TableId>

	      <User userId={order.initiator} />

				<Text color={color}>
					{datetime ? moment(order.createdAt).format('DD/MM/YYYY HH:mm') : ''}
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
            <Th color={color}>{t('menu-item-name')}</Th>
            <Th color={color}>{t('choices')}</Th>
            <Th color={color}>{t('exclude')}</Th>
            <Th color={color}>{t('addon')}</Th>
						<Th color={color}>{t('price')}</Th>
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
											<strong>{orderAddon.amount}?? </strong>
											{orderAddon.addon.translations[0].name}
										</span>
									</FoodItem>;
								})}
							</Td>}

							<Td style={{textAlign: 'right'}}>
								<Price original price={item.subtotal} />
							</Td>
	          </Tr>)
					}): ''}
					{order.subtotal &&
						<Tr>
						<Td>{t('total')}</Td>
						<Td></Td>
						<Td></Td>
						<Td></Td>
						<Td><Price original price={order.subtotal} /></Td>
					</Tr>
					}

        </tbody>
      </TableTag>

	</ActionBox>
)
}


export default compose(
  withStyles(styles),
  connect(
		state => ({
			confirming: state.order.confirming,
		}),
		{
			confirmOrder: confirmOrderAsync.request
		},
	)
)(Order);
