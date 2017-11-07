// @flow
import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colorsByStages } from '../colors'
import { clearTable } from '../../ducks/tables';
import R from 'ramda'
import S from 'string'
import { toggleModal } from '../../ducks/ui';
import { isItOutdated } from '../../common/helpers/time'

const TableBox = styled.div`
  display: inline-block;
  position: relative;
  background: rgba(0,0,0,0.3);
  width: 290px;
  height: 180px;
  margin-right: 10px;
  margin-bottom: 6px;
  margin-top: 0;
  font-family: sans-serif;
  color: white;
`;
const Thumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.05);
  background: ${props => props.bg};
  color: ${props => props.color};
  width: 50px;
  height: 180px;
  text-align: center;
  transition: all 150ms ease-in-out;
  i {
    color: ${props => props.color};
  }
`;
const Id = styled.div`
  font-size: 22px;
  font-weight: 700;
  height: 50px;
  line-height: 50px;
  width: 50px;
  cursor: pointer;
`;
const ExitIcon = styled.i`
  font-size: 26px;
`;
const ExitButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 16px;
  font-size: 26px;
  padding: 0;
  outline: none;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
`;
const Seats = styled.div`
  position: absolute;
  top: 0;
  left: 50px;
  width: 220px;
  padding-left: 20px;
  height: 180px;
  border-radius: 0 10px 10px 0;
  text-align: left;
`;
const Guest = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 80px;
  margin-top: 10px;
  margin-right: 20px;
  border-radius: 0 10px 10px 0;
  text-align: left;
  cursor: pointer;
  vertical-align: top;
`;
const Photo = styled.div`
  background-color: white;
  background-image: url(${props => props.url});
  width: 50px;
  height: 50px;
  background-size: 54px;
  border-radius: 50%;
  background-position: center;
`;
const Name = styled.div`
  font-size: 12px;
  text-align: center;
  margin: 5px 0;
`;
const Circle = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
`
const Rectangle = styled.div`
  width: 9px;
  height: 18px;
  display: inline-block;
  background-color: ${p => p.bg};
  ${p => p.flash ? 'animation: vhs-flash 0.5s infinite;' : ''}
`

// TODO click to table: half screen: bills of the day, half screen: enlarged table

const okTime = 10
const Sign = ({ guest, timer }) => {
  let flash = false
  if (guest.status === 's2') {
    //flash = isItOutdated(guest.orderStartTime, timer.o)
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s1']} flash={flash} />
        <Rectangle bg={colorsByStages['s2']} flash={flash} />
      </Circle>
    )
  }
  if (guest.status === 's5') {
    //flash = isItOutdated(guest.paymentStartTime, timer.p)
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s3']} flash={flash} />
        <Rectangle bg={colorsByStages['s5']} flash={flash} />
      </Circle>
    )
  }
  if (guest.status === 's4') {
    //flash = isItOutdated(guest.serviceCallStartTime, timer.sc)
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s4']} flash={flash} />
        <Rectangle bg={colorsByStages['s4']} flash={flash} />
      </Circle>
    )
  }
  return (
    <Circle>
      <Rectangle bg={colorsByStages[guest.status]} />
      <Rectangle bg={colorsByStages[guest.status]} />
    </Circle>
    )
}


class Table extends React.Component {

  render(){
    const { table, clearTable, toggleModal, guests, timer } = this.props;

    const presentGuests = R.values(guests).filter((g) => g.tables === table.id).sort((a,b) => a.id - b.id);

    const guestsStatuses = R.sort((a,b) => b.localeCompare(a), R.pluck('status')(presentGuests))

    const tableStatus = guestsStatuses[0]

    return (
    	<TableBox>
        <Thumbnail color={tableStatus === 's1' ? 'black' : 'white'} bg={presentGuests && presentGuests.length > 0 ? colorsByStages[tableStatus] : ''}>
          <Id onClick={() => toggleModal({ open: true, type: 'ListOfBills', tableId: table.id })}>
            {table.position}
          </Id>
          <ExitButton onClick={() => clearTable({ table })}>
            <ExitIcon className="ion-android-exit" />
          </ExitButton>
        </Thumbnail>
        <Seats>

          {presentGuests.map((guest, i) =>
            <Guest key={i} onClick={() => toggleModal({ open: true, type: 'User', userId: guest.UserObject.id })}>
              <Photo url={`https://s3.eu-central-1.amazonaws.com/tabb/tabb-user-image/${guest.UserObject.id}_PROFILE`} />
              <Name title={guest.UserObject.name}>{S(guest.UserObject.name).truncate(11).s}</Name>
              <Sign guest={guest} timer={timer} />
            </Guest>
          )}


        </Seats>
    	</TableBox>
    )
  }
}

export default connect(
  state => ({
    guests: state.guests.all,
    loggedRestaurant: state.restaurant.loggedRestaurant,
    timer: state.restaurant.timer
  }),
  {
    clearTable,
    toggleModal
  },
)(Table)
