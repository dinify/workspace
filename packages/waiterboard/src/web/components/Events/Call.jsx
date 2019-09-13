import React from 'react';
import { connect } from 'react-redux';
import { confirmCallInit } from 'ducks/call/actions';
import { relevantServices } from 'ducks/service/selectors';
import { ActionBox, Header, TableId, Text, CheckButton, Photo } from '../styled/Events';
import User from './user';
import { colorsByStages } from '../../colors';

const color = colorsByStages.s4;

const Call = ({ services, call, confirmCall, removed }) => {

	let tableNumber = 0;
	if (call.seat && call.seat.table) {
		tableNumber = call.seat.table.number;
	}

	if (call.table) {
		tableNumber = call.table.number;
	}

	const service = call.service || services[call.serviceId];

	let serviceName = '';
	if (service.translations && service.translations[0]) {
		serviceName = service.translations[0].name;
	}
	
	return (
		<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
	    <Header>

	      <TableId bg={color}>
	        {tableNumber}
	      </TableId>

				<User userId={call.userId} />


				<Text color={color} style={{top: 16}}>
					<span>{serviceName}</span>
					<Photo url={service && service.image.url}/>
				</Text>

	      <CheckButton bg={color} onClick={() => confirmCall({ callId: call.id })}>
	        <i className="ion-checkmark" />
	      </CheckButton>

	    </Header>

		</ActionBox>
	)
}

export default connect(
  state => ({
		timer: state.restaurant.timer,
		services: relevantServices(state)
	}),
  {
    confirmCall: confirmCallInit
  },
)(Call);
