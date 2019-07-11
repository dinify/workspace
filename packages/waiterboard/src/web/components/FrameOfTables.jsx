
import React from 'react'
import Table from './Table'
import Container from './Container'
import Grid from '@material-ui/core/Grid';
import groupBy from 'ramda/src/groupBy'

const FrameOfTables = ({
  tableList,
  seatList,
  toggleModal
}) => {
  const seatsByTable = groupBy((seat) => seat.table_id)(seatList);
  return (
    <Container>
      <Grid container spacing={8} justify="flex-start" alignItems="flex-start">
        {tableList.map((table) =>
          <Grid item key={table.id}>
            <Table
              seats={seatsByTable[table.id]}
              openModal={(userId) => toggleModal({ open: true, userId })}
              table={table}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default FrameOfTables;
