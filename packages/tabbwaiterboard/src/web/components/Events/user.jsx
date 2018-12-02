// @flow
import React from 'react'
import { connect } from 'react-redux';
import { Photo, Name } from '../styled/Events'
import { toggleModal } from '../../../ducks/ui';

const User = ({ user, toggleModal}) => {
	if (!user) return (<span />)
	return (
		<div
			onClick={() => toggleModal({ open: true, type: 'User', userId: user.id })}
			style={{
				display: 'inline-block',
				margin: '16px 0'
			}}
		>
	    <Photo url={`https://picsum.photos/50/50/?image=12`}/>
	    <Name>{user.name}</Name>
		</div>
	)
}

export default connect(null, { toggleModal })(User);
