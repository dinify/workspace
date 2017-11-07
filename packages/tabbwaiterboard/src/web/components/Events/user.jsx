// @flow
import React from 'react'
import { connect } from 'react-redux';
import { Photo, Name } from '../styled/Events'
import { toggleModal } from '../../../ducks/ui';

const User = ({ user, toggleModal}) => (
	<span onClick={() => toggleModal({ open: true, type: 'User', userId: user.id })}>
    <Photo url={`https://s3.eu-central-1.amazonaws.com/tabb/tabb-user-image/${user.id}_PROFILE`}/>
    <Name>{user.name}</Name>
	</span>
)

export default connect(null, { toggleModal })(User);
