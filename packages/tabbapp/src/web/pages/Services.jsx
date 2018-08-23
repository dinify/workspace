import React from 'react';
import { connect } from 'react-redux';
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
import { callServiceInit } from 'ducks/service/actions';
import R from 'ramda';

import * as FN from 'lib/FN';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }
  render() {
    const { restaurant, call } = this.props;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

    let servicesList = restaurant ? FN.MapToList(restaurant.services) : [];
    servicesList = R.filter((s) => {
      if (this.state.selectedTab === 0) return s.type === 'TABLEWARE';
      if (this.state.selectedTab === 1) return s.type === 'CONDIMENT';
      return false;
    }, servicesList);

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
            value={this.state.selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, val) => this.setState({ selectedTab: val })}
          >
            <Tab label="Tableware" />
            <Tab label="Condiments" />
          </Tabs>
        </div>
        <Grid container spacing={16} justify="center" style={{
          marginTop: 16,
          width: '100%',
        }}>
          {servicesList.map((service) =>
            <Grid key={service.id} item sm={6} md={4} lg={3}>
              <ButtonBase
                style={{
                  borderRadius: 4,
                  display: 'flex',
                  padding: 8,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                onClick={() => call({ serviceId: service.id })}
              >
                <Avatar src={service.image.url}></Avatar>
                <Typography style={{marginTop: 8}}>
                  {service.name}
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
  }
}

export default connect(
  state => ({
    restaurant: state.restaurant.all[state.restaurant.checkedInRestaurant]
  }),
  {
    call: callServiceInit
  }
)(Services);
