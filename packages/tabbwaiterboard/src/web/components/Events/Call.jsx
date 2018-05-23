// @flow
import React from 'react'
import { colorsByStages } from '../../colors'
import { connect } from 'react-redux';
import { confirmService } from '../../../ducks/restaurant'
import { ActionBox, Header, TableId, Text, CheckButton } from '../styled/Events'
import User from './user'
import { isItOutdated } from '../../../common/helpers/time'

import { confirmCallInit } from 'ducks/call/actions'

const color = colorsByStages['s4']

const Call = ({ call, confirmCall, removed, timer }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
    <Header>

      <TableId bg={color}>
        {call.TableObject.position}
      </TableId>

			{call.UserObject ? <User user={call.UserObject} /> : ''}

      <Text color={color}>
        {call.call_call_name}
      </Text>

      <CheckButton bg={color} onClick={() => confirmCall({id: call.id})}  flash={isItOutdated(call.requested, timer.sc)}>
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
    confirmCall: confirmCallInit
  },
)(Call);
