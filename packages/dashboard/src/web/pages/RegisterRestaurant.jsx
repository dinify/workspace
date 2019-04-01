// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { registerRestaurant, prefillEmail, prefillRestaurantName, setOngoingRegistration } from 'ducks/restaurant/actions';

const styles = {
  card: {
    maxWidth: '500px',
    margin: '50px auto'
  },
  title: {
    fontSize: 18,
  }
};

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
        component={Text}
        componentProps={{
          label: 'Restaurant ID',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Button type="submit" fullWidth={true}>
        REGISTER
      </Button>
    </form>
  );
};

RegistrationForm = reduxForm({
  form: 'RegisterRestaurant',
  enableReinitialize: true,
  destroyOnUnmount: false
})(RegistrationForm);


class RegisterRestaurant extends React.Component {
  constructor(props) {
    super(props);
    const { location, prefillEmail, prefillRestaurantName, prefill, auth, setOngoingRegistration } = props;
    const params = queryString.parse(location.search) || {};
    const initialValues = params;
    if (auth.isEmpty) setOngoingRegistration(true);
    else setOngoingRegistration(false);
    if (params.email) prefillEmail({ email: params.email })
    if (params.restaurantName) prefillRestaurantName({ restaurantName: params.restaurantName })
    if (prefill.restaurantName) {
      initialValues.restaurantName = prefill.restaurantName;
    }
    if (initialValues.restaurantName) {
      initialValues.subdomain = initialValues.restaurantName.replace(/\W/g, '').toLowerCase();
    }
    this.state = {
      initialValues
    };
  }

  render() {
    const { classes, registerRestaurant } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h1" gutterBottom>
            Register new restaurant
          </Typography>
          <RegistrationForm
            initialValues={this.state.initialValues}
            onSubmit={(fields) => registerRestaurant(fields)}
          />
        </CardContent>
      </Card>
    );
  }
}


const enhance = compose(
  withStyles(styles),
  connect(state => ({
    prefill: state.restaurant.prefill,
    auth: state.firebase.auth
  }), {
    registerRestaurant,
    prefillEmail,
    prefillRestaurantName,
    setOngoingRegistration
  })
)

export default enhance(RegisterRestaurant);
