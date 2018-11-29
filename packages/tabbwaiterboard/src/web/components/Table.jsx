// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { colorsByStages } from '../colors'
import { clearTable, updateTableInit } from 'ducks/table/actions'
import pluck from 'ramda/src/pluck'
import sort from 'ramda/src/sort'

import S from 'string'
import { toggleModal } from 'ducks/ui'

import Block from '@material-ui/icons/Block'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'

const TableBox = styled.div`
  display: inline-block;
  position: relative;
  background: rgba(0,0,0,0.3);
  width: 290px;
  height: 180px;
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
`;
const Id = styled.div`
  font-size: 22px;
  font-weight: 700;
  height: 50px;
  line-height: 50px;
  width: 50px;
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
  width: 40px;
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
  width: 40px;
  height: 40px;
  background-size: 44px;
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


const Table = ({
  table, clearTable, toggleModal, guestList, users, timer, updateTable
}) => {

  const presentGuests = guestList.filter((g) => {
    return g.table_id === table.id
  })
  .sort((a,b) => b.id.localeCompare(a.id))
  .map((g) => {
    g.user = users[g.user_id]
    return g
  })

  const guestsStatuses = sort((a,b) => b.localeCompare(a), pluck('status')(presentGuests))

  const tableStatus = guestsStatuses[0]

  return (
  	<TableBox>
      <Thumbnail color={tableStatus === 's1' ? 'black' : 'white'} bg={presentGuests && presentGuests.length > 0 ? colorsByStages[tableStatus] : ''}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Id onClick={() => toggleModal({ open: true, type: 'ListOfBills', tableId: table.id })}>
              {table.number}
            </Id>
          </Grid>
          <Grid item>
            <Tooltip placement="right" title="Mark as occupied">
              <IconButton
                aria-label="Mark as occupied"
                disabled={presentGuests.length > 0 || table.offline}
                onClick={() => updateTable({id: table.id, offline: true})}
              >
                <Block />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip placement="right" title="Clear table">
              <IconButton onClick={() => clearTable({ table })}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Thumbnail>
      <Seats>

        {table.offline ?
          <Grid container direction="column" justify="center" alignItems="center" style={{height: 180}}>
            <Grid item>
              <Chip
                label="OCCUPIED"
                onDelete={() => updateTable({id: table.id, offline: false})}
              />
            </Grid>
          </Grid>
        : ''}

        {presentGuests.map((guest, i) =>
          <Guest key={i} onClick={() => guest.user ? toggleModal({ open: true, type: 'User', userId: guest.user.id }) : ''}>
            <Photo url={`https://picsum.photos/50/50/?image=${i*3+20}`} />
            {guest.user ?
              <Name title={guest.user.name}>{S(guest.user.name).truncate(16).s}</Name>
            : ''}
            <Sign guest={guest} timer={timer} />
          </Guest>
        )}


      </Seats>
  	</TableBox>
  )
}

export default connect(
  state => ({
    guestList: state.seat.list,
    users: state.user.all,
    loggedRestaurant: state.restaurant.loggedRestaurant,
    timer: state.restaurant.timer
  }),
  {
    clearTable,
    toggleModal,
    updateTable: updateTableInit
  },
)(Table)
