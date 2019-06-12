// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import Select from 'web/components/MaterialInputs/Select';
import Card from '@material-ui/core/Card';
import Typography from '@dinify/common/dist/components/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { MapToList, getInitials } from '@dinify/common/dist/lib/FN';

import {
  registerRestaurant,
  prefillEmail,
  prefillRestaurantName,
  setOngoingRegistration,
  selectRestaurant,
  setOnboardingToken
} from 'ducks/restaurant/actions';

const styles = {
  card: {
    maxWidth: '500px',
    margin: '50px auto',
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '2px'
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

const renderSubdomainField = (props) => {
  let subdomain = <span style={{color: '#888'}}> please fill the field above</span>;
  const value = createSubdomain(props.input.value);
  if (value !== '') subdomain = value;
  return (
    <div>
      <Text {...props} />
      <div>m.dinify.app/restaurant/{subdomain}</div>
    </div>
  )
}

let RegistrationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="restaurantName"
        component={Text}
        componentProps={{ label: 'Restaurant name', fullWidth: true, margin: 'normal' }}
      />
      <Field
        name="subdomain"
        component={renderSubdomainField}
        componentProps={{
          label: 'Restaurant URL',
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
          label: 'We will translate your menu from this language', 
          fullWidth: true,
          margin: 'normal'
        }}
      />
      <Typography variant="caption">
        If you can create your menu in English, we recommend to keep English here to ensure more accurate translations
      </Typography>   
      <Button type="submit" color="primary" variant="outlined" fullWidth={true} style={{marginTop: 20}}>
        REGISTER
      </Button>
    </form>
  );
};

RegistrationForm = reduxForm({
  form: 'RegisterRestaurantForm',
  enableReinitialize: true,
  destroyOnUnmount: false
})(RegistrationForm);


class RegisterRestaurant extends React.Component {
  constructor(props) {
    super(props);
    const { location, prefillEmail, prefillRestaurantName, prefill, auth, setOngoingRegistration } = props;
    const params = queryString.parse(location.search) || {};
    const initialValues = {
      restaurantName: params.restaurantName || '',
      subdomain: params.name || '',
      language: 'en'
    };
    if (auth.isEmpty) setOngoingRegistration(true);
    else setOngoingRegistration(false);
    if (params.t) setOnboardingToken({ token: params.t });
    if (params.email) prefillEmail({ email: params.email });
    if (params.restaurantName) prefillRestaurantName({ restaurantName: params.restaurantName });
    if (prefill.restaurantName) {
      initialValues.restaurantName = prefill.restaurantName;
    }
    if (initialValues.restaurantName) {
      initialValues.subdomain = createSubdomain(initialValues.restaurantName);
    }
    this.state = {
      initialValues
    };
  }

  render() {
    const {
      classes,
      registerRestaurant,
      managedRestaurants,
      selectRestaurant
    } = this.props;    

    return (
      <div>
        {managedRestaurants.length > 0 &&
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="h1" gutterBottom>
                You can manage these restaurants
              </Typography>
              <List className={classes.root}>
                {managedRestaurants.map((restaurant) => 
                  <ListItem className={classes.listItem} key={`r-item-${restaurant.id}`}>
                    <Avatar
                      src={Object.keys(restaurant.images).length  ? MapToList(restaurant.images)[0].url : ''}
                    >
                      {getInitials(restaurant.name)}
                    </Avatar>
                    <ListItemText primary={restaurant.name} />
                    <Button color="primary" variant="contained" onClick={() => selectRestaurant({id: restaurant.id})}>
                      ENTER
                    </Button>
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>      
        }
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h1" gutterBottom>
              Register new restaurant
            </Typography>
            <RegistrationForm
              initialValues={this.state.initialValues}
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
}


const enhance = compose(
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
)

export default enhance(RegisterRestaurant);
