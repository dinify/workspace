import React from 'react';
import { connect } from 'react-redux';
import { updateNameInitAction } from 'ducks/restaurant/actions';
import { removeServiceInit } from 'ducks/service/actions';
import { useTranslation } from 'react-i18next';
import { MapToList } from '@dinify/common/dist/lib/FN';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import filter from 'ramda/src/filter';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@dinify/common/dist/components/Typography';
import Paper from '@material-ui/core/Paper';
import { switchServicesTab as switchTab } from 'ducks/ui/actions';
import AddServiceComponent from 'web/components/AddService';

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = () => ({
  card: {
    width: 100,
    height: 150,
    display: 'inline-block',
    margin: '7px',
    textAlign: 'center',
  },
  cardContent: {
    padding: '8px'
  },
  avatar: {
    width: 60,
    height: 60,
    margin: '5px auto',
  },
  label: {
    whiteSpace: 'nowrap'
  }
});

const ServiceCalls = ({ removeService, services, images, classes, tabIndex, switchTab }) => {
  const { t } = useTranslation();
  const servicesList = MapToList(services).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const getImageUrl = (service) => {
    const img = find(propEq('id', service.image_id))(images);
    if (img) return img.url;
    return service.image.url;
  }
  const selectedType = tabIndex === 0 ? 'TABLEWARE' : 'CONDIMENT';
  const selectedServicesList = filter((s) => s.type === selectedType, servicesList);
  return (
    <div>
      <Paper style={{borderRadius: '2px', margin: '14px 10px'}}>
        <Tabs value={tabIndex} onChange={(e, i) => switchTab(i)} style={{ background: 'rgba(0,0,0,0.04)'}}>
          <Tab label={t('tableware')} />
          <Tab label={t('condiments')} />
        </Tabs>

        <TabContainer>
          {selectedServicesList.length > 0 ? selectedServicesList.map(service => (
            <Card key={service.id} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Avatar src={getImageUrl(service)} className={classes.avatar} />
                <div className={classes.label}>{service.name}</div>
                <IconButton aria-label="Remove" onClick={() => removeService({ id: service.id })}>
                  <DeleteForeverIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))
          :
          <div style={{textAlign: 'center', margin: '40px 0 100px 0'}}>
            <Typography component="h2" variant="display1" gutterBottom>
              {tabIndex === 0 ? t('services.noTableware') : t('services.noCondiments')}
            </Typography>
            <div style={{width: 400, margin: '0 auto'}}>
              <Typography variant="caption" gutterBottom align="left">
                <div>{t('services.step1')}</div>
                <div>{t('services.step2')}</div>
                <div>{t('services.step3')}</div>
              </Typography>
            </div>
          </div>
          }
          <Divider style={{ margin: 8 }} />
          <AddServiceComponent serviceType={selectedType} t={t} />
        </TabContainer>
      </Paper>
    </div>
  );
}

export default connect(
  state => ({
    services: state.service.all,
    images: state.service.images,
    tabIndex: state.ui.servicesTabIndex
  }),
  {
    updateName: updateNameInitAction,
    removeService: removeServiceInit,
    switchTab
  },
)(withStyles(styles)(ServiceCalls));
