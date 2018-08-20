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

const Call = ({ call, confirmCall, removed, timer, users }) => (
	<ActionBox className={removed ? 'vhs-zoom vhs-reverse' : ''}>
    <Header>

      <TableId bg={color}>
        1
      </TableId>

			<User user={users[call.user_id]} />

      <Text color={color}>
        name
      </Text>

      <CheckButton bg={color} onClick={() => confirmCall({callId: call.id})}>
        <i className="ion-checkmark" />
      </CheckButton>

    </Header>

	</ActionBox>
)

export default connect(
  state => ({
		timer: state.restaurant.timer,
    users: state.user.all,
	}),
  {
    confirmCall: confirmCallInit
  },
)(Call);
