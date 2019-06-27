import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Text from 'web/components/MaterialInputs/Text';

const formStyles = () => ({
  input: {
    padding: 10
  }
})

const ServiceForm = ({ handleSubmit, classes, t }) => {
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
            InputLabelProps: {shrink: true}
          }}
        />
        </Grid>
        <Grid item xs={3}>
        <Button type="submit" fullWidth variant="contained" color="primary">
            {t('add')}
        </Button>
        </Grid>
    </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'settings/service',
})(withStyles(formStyles)(ServiceForm));
