// @flow
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';


const SolidContainer = styled.div`
  min-width: 800px;
  padding-bottom: 50px;
`;
const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
`;
const H = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-right: 20px;
`;

const Translations = () => {
  return (
    <div>
      <SolidContainer>
        <HeadLine>
          <Grid container spacing={8} alignItems="flex-start" justify="center">
            <Grid item xs={4}>
              <H>Addons</H>
            </Grid>
            <Grid item xs={4}>
              <H>Ingredients</H>
            </Grid>
            <Grid item xs={4}>
              <H>Option groups</H>
            </Grid>
          </Grid>
        </HeadLine>

        <Grid container spacing={8} alignItems="flex-start" justify="center">
          <Grid item xs={4}>
            da
          </Grid>
          <Grid item xs={4}>
            da
          </Grid>
          <Grid item xs={4}>
            da
          </Grid>
        </Grid>
      </SolidContainer>
    </div>
  );
};

export default Translations;
