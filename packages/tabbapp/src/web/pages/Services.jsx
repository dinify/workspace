import React from 'react';
import AppBar from 'web/components/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';

import * as FN from 'lib/FN';

const Services = () => {
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

  return (
    <div>
      {!iosInstalled && <AppBar position="static"/>}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 16
      }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          onChange={() => {}}
        >
          <Tab label="Tableware" />
          <Tab label="Condiments" />
        </Tabs>
      </div>
      <Grid container spacing={16} justify="center" style={{
        marginTop: 16,
        width: '100%',
      }}>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i =>
          <Grid key={i} item sm={6} md={4} lg={3}>
            <ButtonBase style={{
              borderRadius: 4,
              display: 'flex',
              padding: 8,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Avatar>AB</Avatar>
              <Typography style={{marginTop: 8}}>
                Service name
              </Typography>
            </ButtonBase>
          </Grid>
        )}
      </Grid>
      <div style={{padding: 16, width: '100%', marginBottom: 56}}>
        <Typography variant="caption" style={{marginTop: 8}}>
          {"Can't find what you need?"}
        </Typography>

        <div style={{display: 'flex'}}>
          <TextField
            style={{flex: 1}}
            id="name"
            label="Request a service"
            value=""
            onChange={() => {}}
            margin="none"
          />
          <IconButton>
            <Send />
          </IconButton>
        </div>
      </div>
    </div>
  )
};

export default Services;
