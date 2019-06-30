import React from 'react';
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@dinify/common/dist/components/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServiceCallGraphic from 'web/components/ServiceCallGraphic';
import { callServiceInit } from 'ducks/service/actions';
import { Motion, spring } from 'react-motion';
import filter from 'ramda/src/filter';

import * as FN from '@dinify/common/dist/lib/FN';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  render() {
    const { restaurant, call, services, t } = this.props;
    const { selectedTab } = this.state;

    let servicesList = restaurant ? FN.MapToList(restaurant.services) : [];
    servicesList = filter((s) => {
      if (selectedTab === 0) return s.type === 'TABLEWARE';
      if (selectedTab === 1) return s.type === 'CONDIMENT';
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
                {t('service.title')}
              </Typography>
              <Typography variant="caption">
                {t('service.subtitle')}
              </Typography>
            </div>
        </div>
        <Typography style={{margin: 16}}>
          {t('service.instruction')}
        </Typography>
      </div>
    )

    return (
      <div>
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
              value={selectedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, val) => this.setState({ selectedTab: val })}
            >
              <Tab label={t('service.types.tableware')} />
              <Tab label={t('service.types.condiments')} />
            </Tabs>
          </div>
        </div>
        <div style={{marginTop: 16,
        width: '100%',}}>
          <Grid container spacing={16}>
            {servicesList.map((service) => {
              const status = services[service.id] ? services[service.id].status : 'READY';
              return (
                <Grid key={service.id} item xs={4} md={3} lg={3} style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <ButtonBase
                    disabled={status === 'SENT'}
                    style={{
                      borderRadius: 4,
                      display: 'flex',
                      padding: 8,
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      if (status === 'READY') call({ serviceId: service.id })
                    }}
                  >
                    <div style={{
                      width: 64,
                      height: 64,
                      color: 'rgba(255, 255, 255, 0.87)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Avatar style={{position: 'absolute', width: 64, height: 64}} src={service.image.url}></Avatar>
                      <Motion
                        defaultStyle={{x: 0}}
                        style={{x: spring(status === 'SENT' ? 1 : 0, { stiffness: 260, damping: 24 })}}>
                        {style =>
                          <div style={{
                            position: 'absolute',
                            backgroundColor: '#c13939',
                            borderRadius: '50%',
                            minHeight: 64,
                            minWidth: 64,
                            opacity: Math.min(1, style.x * 2),
                            transform: `scale(${Math.max(style.x, 1/64)}, ${Math.max(style.x, 1/64)})`,
                          }}/>
                        }
                      </Motion>
                      {status === 'SENT' && <CircularProgress style={{position: 'absolute'}} color="inherit"/>}
                    </div>
                    <Typography style={{marginTop: 8}}>
                      {service.name}
                    </Typography>
                  </ButtonBase>
                </Grid>
              );
            })}
          </Grid>
        </div>
        { /* <div style={{padding: 16, width: '100%', marginBottom: 56}}>
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
        </div> */ }
      </div>
    )
  }
}

export default connect(
  state => ({
    restaurant: state.restaurant.all[state.restaurant.checkedInRestaurant],
    services: state.seat.services,
  }),
  {
    call: callServiceInit
  }
)(withTranslation()(Services));
