import React from 'react';
import { connect } from 'react-redux';
import { confirmCallInit } from 'ducks/call/actions';
import { relevantServices } from 'ducks/service/selectors';
import { ActionBox, Header, TableId, Text, CheckButton, Photo } from '../styled/Events';
import User from './user';
import { colorsByStages } from '../../colors';

const color = colorsByStages.s4;

const Call = ({ call, confirmCall, removed, services }) => {

	let service = null;

	console.log(services);

	if (call.service_id && services && services[call.service_id]) {
		service = services[call.service_id];
	}

	if (!service) return <div />;

	return (
		<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
	    <Header>

	      <TableId bg={color}>
	        {call.table && call.table.number}
	      </TableId>

				<User userId={call.user_id} />

				{service &&
					<Text color={color} style={{top: 16}}>
		        <span>{service.name}</span>
						<Photo url={service.image.url}/>
		      </Text>
				}

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
