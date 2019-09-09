import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { toggleModal } from 'ducks/ui/actions';
import { Photo, Name, Time, UserDetails } from '../styled/Events';

const User = ({
	seat,
	userId,
	toggleModal,
	users
}) => {
	if (!seat && !userId) return (<span />);
	let user = null;
	if (seat) user = users[seat.userId];
	else if (userId) user = users[userId];
	if (!user) return (<span />);
	let checkinTime = null;
	if (seat && seat.checkin) {
		checkinTime = moment.utc(seat.checkin).local().format('DD/MM/YYYY h:mm A');
	}
	return (
		<div
			onClick={() => toggleModal({ open: true, type: 'User', userId: userId })}
			style={{
				display: 'inline-block',
				margin: '16px 0'
			}}
		>
	    <Photo url={user.photoURL}/>
			<UserDetails>
		    <Name>{user.displayName}</Name>
				{checkinTime ? <Time>{checkinTime}</Time> : ''}
			</UserDetails>
		</div>
	)
}

export default connect(
	state => ({
    users: state.user.all
  }),
	{ toggleModal }
)(User);
