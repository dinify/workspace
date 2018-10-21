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
import ServiceCallGraphic from 'web/components/ServiceCallGraphic';
import { callServiceInit } from 'ducks/service/actions';
import R from 'ramda';

import * as FN from 'tabb-front/dist/lib/FN';

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

    if (restaurant == null) return (
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 56px)',
        flexDirection: 'column',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
            <div style={{maxWidth: 220}}>
              <div style={{marginBottom: 32}}>
                <ServiceCallGraphic/>
              </div>
              <Typography gutterBottom variant="subtitle1">
                Call a service
              </Typography>
              <Typography variant="caption">
                With this feature, you can request a any kind of condiment or tableware to your table.
              </Typography>
            </div>
        </div>
        <Typography style={{margin: 16}}>
          To get started using feature, scan the QR code in a restaurant near you to check in.
        </Typography>
      </div>
    )

    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <div style={{
          width: '100%',
          marginTop: 16
        }}>
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
        </div>
        <Grid container spacing={16} style={{
          marginTop: 16,
          width: '100%',
        }}>
          {servicesList.map((service) =>
            <Grid key={service.id} item xs={4} md={3} lg={3} style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
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
                <Avatar style={{width: 60, height: 60}} src={service.image.url}></Avatar>
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
