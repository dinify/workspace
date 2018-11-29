// @flow
import React from 'react'
import Table from './Table'
import Container from './Container'
import { Grid } from '@material-ui/core';

const FrameOfTables = ({
  tableList,
  toggleModal
}) => {
  return (
    <Container>
      <Grid container spacing={8} justify="flex-start" alignItems="flex-start">
        {tableList.map((table) =>
          <Grid item key={table.id}>
            <Table openModal={(userId) => toggleModal({ open: true, userId })} table={table} key={table.id} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default FrameOfTables;
