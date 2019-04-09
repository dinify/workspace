// @flow
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';

import Addons from './Addons';
import Ingredients from './Ingredients';
import Options from './Options';


const SolidContainer = styled.div`
  min-width: 800px;
  padding-bottom: 50px;
  margin: 14px 10px;
`;
const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 0px;
`;
const H = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-right: 20px;
`;

const styles = {
  ListItem: {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: '1px solid rgba(0,0,0,.05)',
  },
};

const Menucontrol = () => {
  return (
    <div>
      <Typography style={{marginLeft: 10}} gutterBottom variant="h6">Customizations</Typography>
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
            <Addons styles={styles} />
          </Grid>
          <Grid item xs={4}>
            <Ingredients styles={styles} />
          </Grid>
          <Grid item xs={4}>
            <Options styles={styles} />
          </Grid>
        </Grid>
      </SolidContainer>
    </div>
  );
};

export default Menucontrol;
