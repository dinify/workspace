// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import { updateRestaurantAsync } from 'features/restaurant/actions';

let NameForm = ({ handleSubmit, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Text}
        componentProps={{ fullWidth: true, margin: 'normal' }}
      />
      <Button type="submit" variant="outlined" fullWidth>
        {t('save')}
      </Button>
    </form>
  );
};
NameForm = reduxForm({
  form: 'settings/name',
  enableReinitialize: true,
  destroyOnUnmount: false
})(NameForm);

const Name = ({ updateRestaurant, name }) => {
  const { t } = useTranslation();
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('nameOfRestaurant')}</span>
        <Progress type={'UPDATE_NAME'} />
      </FormBoxHead>
      <FormBoxBody material>
        <NameForm onSubmit={updateRestaurant} initialValues={{ name }} t={t} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(null, {
  updateRestaurant: updateRestaurantAsync.request,
})(Name);
