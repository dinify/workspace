// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmService } from '../../../ducks/restaurant'
import { ActionBox, Header, TableId, Text, CheckButton } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'
import { Photo, Name } from '../styled/Events'

import { confirmCallInit } from 'ducks/call/actions'

const color = colorsByStages['s4']

const Call = ({ call, confirmCall, removed, services }) => {
	let service = null;
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

	      <CheckButton bg={color} onClick={() => confirmCall({callId: call.id})}>
	        <i className="ion-checkmark" />
	      </CheckButton>

	    </Header>

		</ActionBox>
	)
}

export default connect(
  state => ({
		timer: state.restaurant.timer,
		services: state.restaurant.loggedUser.services
	}),
  {
    confirmCall: confirmCallInit
  },
)(Call);
