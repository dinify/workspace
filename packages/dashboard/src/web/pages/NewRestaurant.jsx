// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: '500px',
    margin: '50px auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

let RegistrationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
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
  form: 'newrestaurant',
  enableReinitialize: true,
  destroyOnUnmount: false
})(RegistrationForm);

const NewRestaurant = ({ classes }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h1" gutterBottom>
          Register new restaurant
        </Typography>
        <RegistrationForm onSubmit={() => {}} />
      </CardContent>
    </Card>
  );
};

export default connect(state => ({
}))(withStyles(styles)(NewRestaurant));
