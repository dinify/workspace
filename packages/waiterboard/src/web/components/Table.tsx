import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import S from 'string';
import { clearTable, updateTableInit } from '../../ducks/table/actions';
import { toggleModal } from '../../ducks/ui/actions';
import Block from '@material-ui/icons/Block';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { colorsByStages } from '../colors';
import { getUserName } from '../../lib/utils';

const TableBox = styled.div`
  display: inline-block;
  position: relative;
  background: rgba(0,0,0,0.3);
  width: 290px;
  height: 180px;
  font-family: sans-serif;
  color: white;
`;
const Thumbnail = styled.div<{ bg?: string, color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.05);
  background: ${(props: any) => props.bg};
  color: ${(props: any) => props.color};
  width: 50px;
  height: 180px;
  text-align: center;
  transition: all 150ms ease-in-out;
`;
const Id = styled.div`
  font-size: 22px;
  background: rgba(0,0,0,0.13);
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
const Photo = styled.div<{ url: string }>`
  background-color: white;
  background-image: url(${(props: any) => props.url});
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
const Rectangle = styled.div<{ bg: string }>`
  width: 9px;
  height: 18px;
  display: inline-block;
  background-color: ${(props: any) => props.bg};
`

// TODO click to table: half screen: bills of the day, half screen: enlarged table

interface Guest {
  status: string;
}

const Sign = ({ guest }: { guest: Guest }) => {
  if (guest.status === 's2') {
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s1']} />
        <Rectangle bg={colorsByStages['s2']} />
      </Circle>
    )
  }
  if (guest.status === 's5') {
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s3']} />
        <Rectangle bg={colorsByStages['s5']} />
      </Circle>
    )
  }
  if (guest.status === 's4') {
    return (
      <Circle>
        <Rectangle bg={colorsByStages['s4']} />
        <Rectangle bg={colorsByStages['s4']} />
      </Circle>
    )
  }
  return (
    <Circle>
      <Rectangle bg={(colorsByStages as any)[guest.status]} />
      <Rectangle bg={(colorsByStages as any)[guest.status]} />
    </Circle>
    )
}


const Table: React.FC<{
  table: any;
  clearTable: typeof clearTable;
  toggleModal: typeof toggleModal;
  seats: any;
  users: object;
  updateTable: typeof updateTableInit;
}> = (props) => {
  const {
    table,
    clearTable,
    toggleModal,
    seats = [],
    users,
    updateTable,
  } = props;

  const presentGuests = seats.map((s: any) => {
    s.user = (users as any)[s.userId];
    return s;
  });

  return (
  	<TableBox>
      <Thumbnail>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Id onClick={() => toggleModal({ open: true, type: 'Table', tableId: table.id })}>
              {table.number}
            </Id>
          </Grid>
          <Grid item>
            <Tooltip placement="right" title="Mark as occupied">
              <IconButton
                aria-label="Mark as occupied"
                disabled={presentGuests.length > 0 || table.offline}
                onClick={() => updateTable({ id: table.id, offline: true })}
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

        {presentGuests.map((guest: any, i: number) =>
          <Guest key={i} onClick={() => guest.user ? toggleModal({ open: true, type: 'User', userId: guest.userId }) : ''}>
            <Photo url={guest.user ? guest.user.photoURL : ''} />
            {guest.user ?
              <Name title={getUserName(guest.user)}>{S(getUserName(guest.user)).truncate(16).s}</Name>
            : ''}
            <Sign guest={guest} />
          </Guest>
        )}


      </Seats>
  	</TableBox>
  )
}

export default connect(
  (state: any) => ({
    users: state.user.all,
  }),
  {
    clearTable,
    toggleModal,
    updateTable: updateTableInit
  },
)(Table)
