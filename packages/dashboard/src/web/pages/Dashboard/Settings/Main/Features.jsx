import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import { updateRestaurantAsync } from 'features/restaurant/actions';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useTranslation } from '@dinify/common/src/lib/i18n';

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={!!input.value}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

let FeaturesForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>

      <Field name="orders" component={renderCheckbox} label="Orders" />
      <Field name="serviceCalls" component={renderCheckbox} label="Service calls" />

      <Button type="submit" variant="outlined" fullWidth>
        {t('save')}
      </Button>
    </form>
  );
};
FeaturesForm = reduxForm({
  form: 'settings/features',
  enableReinitialize: true,
})(FeaturesForm);

const Features = ({ updateRestaurant, restaurant }) => {
  if (!restaurant) return <div />;
  return (
    <FormBox>
      <FormBoxHead>
        <span>Features control</span>
        <Progress type={'UPDATE_CONTACT'} />
      </FormBoxHead>
      <FormBoxBody material>
        <FeaturesForm
          onSubmit={(settings) => updateRestaurant({ settings })}
          initialValues={restaurant.settings}
        />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(null, {
  updateRestaurant: updateRestaurantAsync.request,
})(Features);
