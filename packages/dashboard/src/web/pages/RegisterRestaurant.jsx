import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { MapToList } from '@dinify/common/src/lib/FN';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Text from 'web/components/MaterialInputs/Text';
import Select from 'web/components/MaterialInputs/Select';

import {
  registerRestaurant,
  prefillEmail,
  prefillRestaurantName,
  setOngoingRegistration,
  selectRestaurant,
  setOnboardingToken
} from 'ducks/restaurant/actions';

const styles = {
  wrapperCard: {
    maxWidth: '500px',
    background: 'rgba(255,255,255,0.07)',
    margin: '50px auto'
  },
  card: {
    width: '146px',
    margin: '5px',
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '2px',
    display: 'inline-block'
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 18,
  },
  listItem: {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '2px'
  }
};

const createSubdomain = (subdomain) => {
  return subdomain.replace(/\W/g, '').toLowerCase();
}

const renderSubdomainField = (t) => (props) => {
  const { input } = props;
  let subdomain = <span style={{color: '#888'}}> {t('fillFieldAbove')}</span>;
  const value = createSubdomain(input.value);
  if (value !== '') subdomain = value;
  return (
    <div>
      <Text {...props} />
      <div>web.dinify.app/restaurant/{subdomain}</div>
    </div>
  )
}

let RegistrationForm = ({ t, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="restaurantName"
        component={Text}
        componentProps={{ label: t('nameOfRestaurant'), fullWidth: true, margin: 'normal' }}
      />
      <Field
        name="subdomain"
        component={renderSubdomainField(t)}
        componentProps={{
          label: t('restaurantURL'),
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <div style={{height: 20}}></div> 
      <Field
        name="language"
        component={Select}
        options={ [
          {label: 'English', value: 'en'},
          {label: 'Čeština', value: 'cs'},
        ]}
        componentProps={{
          label: t('defaultLanguageLabel'), 
          fullWidth: true,
          margin: 'normal'
        }}
      />
      <Typography variant="caption">
        {t('defaultLanguageRecom')}
      </Typography>   
      <Button type="submit" color="primary" variant="outlined" fullWidth style={{marginTop: 20}}>
        {t('register')}
      </Button>
    </form>
  );
};

RegistrationForm = reduxForm({
  form: 'RegisterRestaurantForm',
  enableReinitialize: true,
  destroyOnUnmount: false
})(RegistrationForm);


const RegisterRestaurant = (props) => {
  const {
    classes,
    registerRestaurant,
    managedRestaurants,
    selectRestaurant,
    location, prefillEmail, prefillRestaurantName,
    prefill, auth, setOngoingRegistration
  } = props;
  const params = queryString.parse(location.search) || {};
  const { t } = useTranslation();
  useEffect(() => {
    if (auth.isEmpty) setOngoingRegistration(true);
    else setOngoingRegistration(false);
    if (params.t) setOnboardingToken({ token: params.t });
    if (params.email) prefillEmail({ email: params.email });
    if (params.restaurantName) prefillRestaurantName({ restaurantName: params.restaurantName });
  }, []);  
  const initialValues = {
    restaurantName: params.restaurantName || '',
    subdomain: params.name || '',
    language: 'en'
  };
  if (prefill.restaurantName) {
    initialValues.restaurantName = prefill.restaurantName;
  }
  if (initialValues.restaurantName) {
    initialValues.subdomain = createSubdomain(initialValues.restaurantName);
  }

  return (
    <div>
      {managedRestaurants.length > 0 &&
        <Card className={classes.wrapperCard}>
          <CardContent>
            <Typography className={classes.title} variant="h1" align="center" gutterBottom>
              {t('manageTheseRestaurants')}
            </Typography>
              {managedRestaurants.map((restaurant) => 
                <Card className={classes.card} key={`r-item-${restaurant.id}`}>
                  <CardActionArea onClick={() => selectRestaurant({id: restaurant.id})}>
                    <CardMedia
                      className={classes.media}
                      image={Object.keys(restaurant.images).length  ? MapToList(restaurant.images)[0].url : ''}
                      title={restaurant.name}
                    />
                    <CardContent>
                      <Typography variant="h6" style={{ whiteSpace: 'nowrap', fontSize: 14 }}>
                        {restaurant.name || 'noname'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )}
          </CardContent>
        </Card>
      }
      <Card className={classes.wrapperCard}>
        <CardContent>
          <Typography className={classes.title} variant="h1" gutterBottom>
            {t('registerNewRestaurant')}
          </Typography>
          <RegistrationForm
            t={t}
            initialValues={initialValues}
            onSubmit={(fields) => registerRestaurant({
              restaurantName: fields.restaurantName,
              subdomain: createSubdomain(fields.subdomain),
              language: fields.language
            })}
          />
        </CardContent>
      </Card>
    </div>
  );
}


export default compose(
  withStyles(styles),
  connect(state => ({
    prefill: state.restaurant.prefill,
    auth: state.firebase.auth,
    managedRestaurants: state.restaurant.managedRestaurants,
  }), {
    registerRestaurant,
    prefillEmail,
    prefillRestaurantName,
    setOngoingRegistration,
    selectRestaurant,
    setOnboardingToken
  })
)(RegisterRestaurant);
