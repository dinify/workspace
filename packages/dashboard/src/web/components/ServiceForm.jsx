import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Text from 'web/components/MaterialInputs/Text';

const formStyles = () => ({
  input: {
    padding: 10
  }
})

const validateName = (val) => {
  if (!val || val.length < 1) return 'Too short';
  if (val.length > 24) return 'Too long';
  return undefined;
}

const TextComponent = ({ meta: { touched, error, warning }, ...props }) => (
  <>
    <Text {...props} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </>
)

const formName = 'settings/service';

const ServiceForm = ({ handleSubmit, classes, t }) => {
  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
        <Grid item xs={9}>
        <Field
          name="name"
          component={TextComponent}
          validate={validateName}
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

const afterSubmit = (result, dispatch) => dispatch(reset(formName));

export default reduxForm({
  form: formName,
  onSubmitSuccess: afterSubmit
})(withStyles(formStyles)(ServiceForm));
