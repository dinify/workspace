// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { registerRestaurant } from 'ducks/restaurant/actions';

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
          label: 'Restaurant subdomain',
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

const RegisterRestaurant = ({ classes, registerRestaurant }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h1" gutterBottom>
          Register new restaurant
        </Typography>
        <RegistrationForm onSubmit={(fields) => registerRestaurant(fields)} />
      </CardContent>
    </Card>
  );
};

const enhance = compose(
  withStyles(styles),
  connect(state => ({
    
  }), {
    registerRestaurant
  })
)

export default enhance(RegisterRestaurant);
