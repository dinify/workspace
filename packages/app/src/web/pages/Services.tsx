import React, { useState, useEffect } from 'react';
import { useTranslation, useIntl } from '@dinify/common/src/lib/i18n';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { closeDialogAction } from 'features/ui/actions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Done from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServiceCallGraphic from 'web/components/ServiceCallGraphic';
import { callServiceAsync, fetchServicesAsync } from 'features/service/actions';
import { relevantServicesList } from 'features/service/selectors';
import { Motion, spring } from 'react-motion';
import filter from 'ramda/es/filter';
import { selectTranslation } from 'features/menuItem/selectors';
import { Service } from 'ServiceModels';
import { RootState } from 'typesafe-actions';

const Services = ({
  fetchServices,
  checkedInRestaurant,
  servicesList,
  restaurant,
  call,
  serviceStatuses,
  style,
  closeDialog
}: any) => {

  const { t } = useTranslation();
  const history = useHistory();
  const [selectedTab, selectTab] = useState(0);
  const locale = useIntl(ctx => ctx.state.locale);

  useEffect(() => {
    fetchServices({
      restaurantId: checkedInRestaurant,
    });
  }, [fetchServices, checkedInRestaurant]);


  const selectedServicesList = filter((s: Service) => {
    if (selectedTab === 0) return s.type === 'TABLEWARE';
    if (selectedTab === 1) return s.type === 'CONDIMENT';
    return false;
  }, servicesList);

  if (!restaurant)
    return (
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 56px)',
          flexDirection: 'column',
          ...style,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 220 }}>
            <div style={{ marginBottom: 32 }}>
              <ServiceCallGraphic />
            </div>
            <Typography gutterBottom variant="subtitle1">
              {t('service.title')}
            </Typography>
            <Typography variant="caption">
              {t('service.subtitle') + ' '}
              {t('service.instruction')}
            </Typography>
            <Button
              style={{
                marginTop: 16,
                height: 40,
                boxShadow: 'none',
              }}
              variant="contained"
              color="primary"
              onClick={() => {
                closeDialog('services');
                history.push('/camera');
              }}
            >
              {t('checkIn')}
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div style={style}>
      <div
        style={{
          width: '100%',
          marginTop: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 16,
          }}
        >
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, val) => selectTab(val)}
          >
            <Tab label={t('service.types.tableware')} />
            <Tab label={t('service.types.condiments')} />
          </Tabs>
        </div>
      </div>
      <div style={{ marginTop: 16, width: '100%' }}>
        <Grid container spacing={2}>
          {selectedServicesList.map(service => {
            const status = serviceStatuses[service.id]
              ? serviceStatuses[service.id]
              : 'READY';
            return (
              <Grid
                key={service.id}
                item
                xs={4}
                md={3}
                lg={3}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
                    if (['READY', 'FAILED'].includes(status)) call({ serviceId: service.id });
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      color: 'rgba(255, 255, 255, 0.87)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      style={{ position: 'absolute', width: 64, height: 64 }}
                      src={service.image && service.image.url}
                    ></Avatar>
                    <Motion
                      defaultStyle={{ x: 0 }}
                      style={{
                        x: spring(
                          ['SENT', 'SENDING'].includes(status) ? 1 : 0,
                          { stiffness: 260, damping: 24 },
                        ),
                      }}
                    >
                      {style => (
                        <div
                          style={{
                            position: 'absolute',
                            backgroundColor: '#c13939',
                            borderRadius: '50%',
                            minHeight: 64,
                            minWidth: 64,
                            opacity: Math.min(1, style.x * 2),
                            transform: `scale(${Math.max(
                              style.x,
                              1 / 64,
                            )}, ${Math.max(style.x, 1 / 64)})`,
                          }}
                        />
                      )}
                    </Motion>
                    {status === 'SENDING' && (
                      <CircularProgress
                        style={{ position: 'absolute' }}
                        color="inherit"
                      />
                    )}
                    {status === 'SENT' && (
                      <Done
                        style={{ position: 'absolute' }}
                        color="inherit"
                      />
                    )}
                  </div>
                  <Typography style={{ marginTop: 8 }}>
                    {selectTranslation(locale, service.translations)}
                  </Typography>
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* <div style={{padding: 16, width: '100%', marginBottom: 56}}>
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
      </div> */}
    </div>
  );
}

export default connect(
  (state: RootState) => ({
    restaurant: state.restaurant.all[state.restaurant.checkedInRestaurant || ''],
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    serviceStatuses: state.service.status,
    servicesList: relevantServicesList(state)
  }),
  {
    call: callServiceAsync.request,
    fetchServices: fetchServicesAsync.request,
    closeDialog: closeDialogAction,
  },
)(Services) as React.FC<any>;
