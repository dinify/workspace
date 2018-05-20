// @flow
import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'

import Addons from './Addons'
import Ingredients from './Ingredients'
import Options from './Options'

const SolidContainer = styled.div `
  min-width: 1000px;
`
const HeadLine = styled.div `
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
`
const H = styled.div `
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-right: 20px;
`

const Menucontrol = () => {
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
              <H>Options</H>
            </Grid>
          </Grid>

        </HeadLine>

        <Grid container spacing={8} alignItems="flex-start" justify="center">
          <Grid item xs={4}>
            <Addons />
          </Grid>
          <Grid item xs={4}>
            <Ingredients />
          </Grid>
          <Grid item xs={4}>
            <Options />
          </Grid>
        </Grid>
        
      </SolidContainer>
    </div>
  );
}

export default Menucontrol;
