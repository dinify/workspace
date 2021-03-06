import React from 'react';
import Grid from '@material-ui/core/Grid';
import groupBy from 'ramda/es/groupBy'
import Table from './Table.tsx';
import Container from './Container';

const FrameOfTables = ({
  tableList,
  seatList,
  toggleModal
}) => {
  const seatsByTable = groupBy((seat) => seat.tableId)(seatList);
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
