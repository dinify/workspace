// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmService } from '../../../ducks/restaurant'
import { ActionBox, Header, TableId, Text, CheckButton } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'

const color = colorsByStages['s4']

const Service = ({ service, confirmService, removed, timer }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
    <Header>

      <TableId bg={color}>
        {service.TableObject.position}
      </TableId>

			{service.UserObject ? <User user={service.UserObject} /> : ''}

      <Text color={color}>
        {service.service_call_name}
      </Text>

      <CheckButton bg={color} onClick={() => confirmService({serviceId: service.id})}  flash={isItOutdated(service.requested, timer.sc)}>
        <i className="ion-checkmark" />
      </CheckButton>

    </Header>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer
	}),
  {
    confirmService
  },
)(Service);
