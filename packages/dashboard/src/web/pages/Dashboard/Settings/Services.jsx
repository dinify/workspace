/* eslint-disable react/no-multi-comp */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Label } from 'web/components/styled/FormBox';
import { updateNameInitAction } from 'ducks/restaurant/actions';
import { createServiceInit, removeServiceInit } from 'ducks/service/actions';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import * as FN from 'lib/FN';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as R from 'ramda';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@dinify/common/dist/components/Typography';
import Paper from '@material-ui/core/Paper';
import { switchTab } from 'ducks/ui/actions';

const formStyles = () => ({
  input: {
    padding: 10
  }
})

let ServiceForm = ({ handleSubmit, classes, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8} direction="row" justify="center" alignItems="center">
        <Grid item xs={9}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              style: {marginTop: 10},
              variant: 'outlined',
              label: t('serviceName'),
              fullWidth: true,
              margin: 'normal',
              InputProps: { classes: { input: classes.input } },
              InputLabelProps: {shrink: 'true'}
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button type="submit" fullWidth={true} variant="contained" color="primary">
            {t('add')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
ServiceForm = reduxForm({
  form: 'settings/service',
  //  enableReinitialize: true
})(withStyles(formStyles)(ServiceForm));

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
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

class AddServiceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  render() {
    const { images, createService, serviceType, t } = this.props;

    const filteredImages = R.filter((img) => {
      if (serviceType === 'TABLEWARE') return img.item_type === `Internal\\Service\\Tableware`;
      return img.item_type === 'Internal\\Service\\Condiments';
    }, images);

    return (<div>
      <Label className="center">{t('selectServiceIcon')}</Label>
      <div style={{marginTop: 8}}>
        {filteredImages.map((image) =>
          <Avatar
            style={{
              display: 'inline-block',
              margin: '5px',
              height: 60,
              width: 60,
              cursor: 'pointer',
              border: this.state.selectedImage === image.id ? '3px solid red' : 'none'
            }}
            onClick={() => this.setState({ selectedImage: image.id })}
            src={image.url}
          />
        )}
      </div>
      <ServiceForm
        t={t}
        onSubmit={({ name }) =>
          createService({
            name,
            imageId: this.state.selectedImage || '587334ad-91f4-4179-8bd8-39b0abb1390c',
            type: serviceType
          })
        }
      />
    </div>
    );
  }
}

AddServiceComponent = connect(
  (state) => ({
    images: state.service.images
  }), {
    createService: createServiceInit,
  }
)(AddServiceComponent)

const ServiceCalls = ({ removeService, services, images, classes, tabIndex, switchTab }) => {
  const { t } = useTranslation();
  const servicesList = FN.MapToList(services).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const getImageUrl = (service) => {
    const img = R.find(R.propEq('id', service.image_id))(images);
    if (img) return img.url;
    return service.image.url;
  }
  const selectedType = tabIndex === 0 ? 'TABLEWARE' : 'CONDIMENT';
  const selectedServicesList = R.filter((s) => s.type === selectedType, servicesList);
  return (
    <div>
      <Typography style={{marginLeft: 10}} gutterBottom variant="h6">{t('nav.services')}</Typography>
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
