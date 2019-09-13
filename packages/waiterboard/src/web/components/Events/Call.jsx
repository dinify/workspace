import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { confirmCallInit } from 'ducks/call/actions';
import { relevantServices } from 'ducks/service/selectors';
import { ActionBox, Header, TableId, Text, CheckButton, Photo } from '../styled/Events';
import User from './user';
import { colorsByStages } from '../../colors';

const color = colorsByStages.s4;

const styles = () => ({
  progress: {
    color: 'white'
  },
});

const Call = ({ services, call, confirmCall, removed, confirming, classes }) => {

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

	      <CheckButton
					bg={color}
					disabled={confirming[call.id]}
					onClick={() => confirmCall({ callId: call.id })}
				>
					{confirming[call.id] ?
						<CircularProgress className={classes.progress} />
						:
						<i className="ion-checkmark" />
					}
	      </CheckButton>

	    </Header>

		</ActionBox>
	)
}


export default compose(
  withStyles(styles),
  connect(
		state => ({
			services: relevantServices(state),
			confirming: state.order.confirming
		}),
		{
			confirmCall: confirmCallInit
		}
	)
)(Call);
