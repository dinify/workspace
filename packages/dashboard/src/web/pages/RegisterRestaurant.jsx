import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import {
  registerRestaurant,
  prefillEmail,
  prefillRestaurantName,
  setOngoingRegistration,
  selectRestaurant,
  setOnboardingToken
} from 'features/restaurant/actions';
import { useFirebase } from 'react-redux-firebase';

const styles = theme => ({
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
});

const createSubdomain = (subdomain) => {
  return subdomain.replace(/\W/g, '').toLowerCase();
}

const renderSubdomainHelper = (value, t) => {
  let subdomain = <span style={{ color: '#888' }}> {t('fillFieldAbove')}</span>;
  const val = createSubdomain(value);
  if (val !== '') subdomain = val;
  return (
    <div>web.dinify.app/restaurant/{subdomain}</div>
  )
}
const validateRegForm = (values) => {
  const errors = {};
  if (!values.restaurantName) errors.restaurantName = 'Required';
  if (!values.subdomain) errors.subdomain = 'Required';
  return errors;
}
const RegForm = ({ initialValues, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      validate={validateRegForm}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field
            type="text"
            name="restaurantName"
            component={TextField}
            label={t('nameOfRestaurant')}
            fullWidth
            margin="normal"
          />

          <Field
            type="text"
            name="subdomain"
            component={TextField}
            label={t('restaurantURL')}
            fullWidth
            margin="normal"
          />
          {renderSubdomainHelper(values.subdomain, t)}

          <div style={{ height: 20 }}></div>
          <Field
            name="language"
            component={Select}
            fullWidth
            style={{ margin: '20px 0' }}
            label={t('defaultLanguageLabel')}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="cs">Čeština</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Field>
          <Typography variant="caption">
            {t('defaultLanguageRecom')}
          </Typography>

          <Field
            name="currency"
            component={Select}
            fullWidth
            style={{ margin: '20px 0' }}
            label="Currency"
          >
            <MenuItem value="EUR">Euro €</MenuItem>
            <MenuItem value="CZK">Koruna česká Kč</MenuItem>
          </Field>

          <Button type="submit" color="primary" variant="outlined" fullWidth style={{ marginTop: 20 }} disabled={isSubmitting}>
            {t('register')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

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
  const firebase = useFirebase();
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
    language: 'en',
    currency: 'EUR'
  };
  if (prefill.restaurantName) {
    initialValues.restaurantName = prefill.restaurantName;
  }
  if (initialValues.restaurantName) {
    initialValues.subdomain = createSubdomain(initialValues.restaurantName);
  }
  return (
    <div>
      {(managedRestaurants && managedRestaurants.length > 0) &&
        <Card className={classes.wrapperCard}>
          <CardContent>
            <Typography className={classes.title} variant="h1" align="center" gutterBottom>
              {t('manageTheseRestaurants')}
            </Typography>
            {managedRestaurants.map((restaurant) =>
              <Card className={classes.card} key={`r-item-${restaurant.id}`}>
                <CardActionArea onClick={() => selectRestaurant({ id: restaurant.id })}>
                  <CardMedia
                    className={classes.media}
                    image={Object.keys(restaurant.images).length ? MapToList(restaurant.images)[0].url : ''}
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
          <RegForm
            initialValues={initialValues}
            onSubmit={(fields) => registerRestaurant({
              restaurantName: fields.restaurantName,
              subdomain: createSubdomain(fields.subdomain),
              language: fields.language,
              currency: fields.currency
            })}
          />
          <Button
            onClick={() => firebase.logout()}
            color="default"
            variant="outlined"
            fullWidth
            style={{ marginTop: 20 }}
          >
            {t('user.logOut')}
          </Button>
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
